const axios = require('axios');
const getData = ({ fullName, userPhone, content, userId, feedbackDate, bizName, serviceType }) => JSON.stringify({
    "parent": {
        "database_id": process.env.NOTION_DB_ID
    },
    "icon": {
        "emoji": "✔️"
    },
    "properties": {
        "Full Name": {
            "title": [
                {
                    "text": {
                        "content": fullName || ''
                    }
                }
            ]
        },
        "User ID": {
            "rich_text": [
                {
                    "text": {
                        "content": userId || ''
                    }
                }
            ]
        },
        "Phone Number": {
            "rich_text": [
                {
                    "text": {
                        "content": userPhone || ''
                    }
                }
            ]
        },
        "Content": {
            "rich_text": [
                {
                    "text": {
                        "content": content || ''
                    }
                }
            ]
        },
        "Business Name": {
            "rich_text": [
                {
                    "text": {
                        "content": bizName || ''
                    }
                }
            ]
        },
        "Service Type": {
            "rich_text": [
                {
                    "text": {
                        "content": serviceType || ''
                    }
                }
            ]
        },
        "DateTime": {
            "date":
            {
                "start": feedbackDate ? new Date(feedbackDate).toISOString() : new Date().toISOString()
            }

        }
    }
});


const uploadNotionDatabase = async ({ fullName, userPhone, content, userId, feedbackDate, bizName, serviceType }) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.notion.com/v1/pages',
        headers: {
            'Authorization': `Bearer ${process.env.NOTION_INTERGRATE_SECRET_KEY}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28',
        },
        data: getData({ fullName, userPhone, content, userId, feedbackDate, bizName, serviceType })
    };

    try {
        const res = await axios.request(config)
        console.log(JSON.stringify(res.data));
        return res.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = uploadNotionDatabase