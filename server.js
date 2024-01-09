
// Require necessary modules
const express = require('express');
const getUserInfo = require('./zaloRequest');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from a .env file into process.env
dotenv.config();

// Create an Express application
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'Server is running!'
    })
})

// Route to handle POST request for getUserInfo
app.post('/getUserInfo', async (req, res) => {
    console.log('User Info:');
    const { code, accessToken } = req.body;
    console.log('get user info from: ', code);

    const data = await getUserInfo(code, accessToken);
    console.log(data);
    return res.send(data);
});

app.post('/sendFeedback', async (req, res) => {
    console.log('Feedback:');
    console.log(req.body);
    return res.json({ status: true, message: 'Feedback saved successfully' });
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Your app is listening on port ${PORT}`);
});