const axios = require('axios');
const getData = ({ fullName, phone, desc }) => JSON.stringify({
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
                        "content": fullName
                    }
                }
            ]
        },
        "Phone Number": {
            "rich_text": [
                {
                    "text": {
                        "content": phone
                    }
                }
            ]
        },
        "Description": {
            "rich_text": [
                {
                    "text": {
                        "content": desc
                    }
                }
            ]
        }
    }
});


export const uploadNotionDatabase = async (data) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.notion.com/v1/pages',
        headers: {
            'Authorization': `Bearer ${process.env.NOTION_INTERGRATE_SECRET_KEY}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28',
        },
        data: getData(data)
    };

    try {
        const res = await axios.request(config)
        console.log(JSON.stringify(response.data));
        return res.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}
