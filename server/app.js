const express = require('express');
const router = require('./routers/routes');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', router);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});