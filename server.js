
// Require necessary modules
const express = require('express');
const getUserInfo = require('./zaloRequest');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from a .env file into process.env
dotenv.config();
const postgresql_db = require('./postgresql');
const uploadNotionDatabase = require('./notion.api');

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
    const { body } = req;
    if (!body) res.json({ status: false, message: 'Feedback not save!' });
    const { userId, fullName, userPhone, feedbackDate, content, bizName, serviceType } = body;

    try {
        const db_res = await postgresql_db.none('INSERT INTO feedback(id, user_id, full_name, phone, datetime, "content", biz_name, service_type) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [generateRandomId(50), userId, fullName, userPhone, feedbackDate, content, bizName, serviceType])
        console.log(JSON.stringify({ status: true, message: 'Feedback saved successfully', data: db_res }))

        const notion_data = await uploadNotionDatabase({ fullName, userPhone, content, userId, feedbackDate, bizName, serviceType })
        return res.json({ status: true, message: 'Feedback saved successfully', data: db_res, notion_data: notion_data })

    } catch (err) {
        console.log(JSON.stringify({ status: false, error: err.toString(), errorObj: err }))
        return res.json({ status: false, error: err.toString() });
    }
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Your app is listening on port ${PORT}`);
});


function generateRandomId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}