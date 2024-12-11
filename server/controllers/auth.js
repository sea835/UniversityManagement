const database = require('../database/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

let refreshTokens = [];

const loginLecturer = async(username, password) => {
    const [rows] = await database.query('SELECT * FROM lecturer WHERE username = ? AND password = ?', [username, password]);
    return rows[0];
}

const loginStudent = async(username, password) => {
    const [rows] = await database.query('SELECT * FROM student WHERE username = ? AND password = ?', [username, password]);
    return rows[0];
}

const loginAdministrator = async(username, password) => {
    const [rows] = await database.query('SELECT * FROM administrator WHERE username = ? AND password = ?', [username, password]);
    return rows[0];
}

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '40m' });
}

exports.refreshToken = (req, res, next) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ username: user.username });
        res.json({ accessToken: accessToken });
    });
}

exports.login = async(req, res, next) => {

    console.log(req.session);

    const { username, password } = req.body;

    let hashedPassword = null;

    try {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);

    } catch {
        res.status(500).send();
    }

    const lecturer = await loginLecturer(username, password);
    const student = await loginStudent(username, password);
    const administrator = await loginAdministrator(username, password);

    let user = null;
    if (lecturer) {
        user = {...lecturer, role: 'lecturer' };
    } else if (student) {
        user = {...student, role: 'student' };
    } else if (administrator) {
        user = {...administrator, role: 'administrator' };
    }

    if (user) {
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.json({
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user,
            hashedPassword: hashedPassword
        });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
}

exports.authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

exports.authRole = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            res.status(401).json({ message: 'Not Allowed' });
        }
    }
}

exports.logout = async(req, res, next) => {
    // req.session.destroy();
    res.json({ message: 'Logout successfully' });
}