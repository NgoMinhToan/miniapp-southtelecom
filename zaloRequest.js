const axios = require("axios");

const endpoint = "https://graph.zalo.me/v2.0/me/info";
const secretKey = process.env.ZALO_APP_SECRET_KEY;


const getUserInfo = async (token, accessToken) => {
    const options = {
        access_token: accessToken,
        code: token,
        secret_key: secretKey,
    };

    const res = await axios.get(endpoint, {
        headers: options
    })
    return res.data

}
module.exports = getUserInfo
