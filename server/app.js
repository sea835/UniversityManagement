const express = require('express');
const router = require('./routers/routes');
const cors = require('cors');
const session = require('express-session');

const app = express();

app.use(cors());

app.use(express.json());

// app.use(session({
//     secret: 'ngohoanghai',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: true, // Use HTTPS
//         httpOnly: true, // Prevent XSS attacks
//         sameSite: 'strict', // Prevent CSRF attacks
//         maxAge: 24 * 60 * 60 * 1000 // Set session expiration (e.g., 24 hours)
//     }
// }));

app.use('/api', router);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});