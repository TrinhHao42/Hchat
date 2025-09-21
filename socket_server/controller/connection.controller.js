const axios = require('axios')

const DATA_SERVER = process.env.DATA_SERVER

const login = async (email) => {
    try {
        await axios.post(
          `${DATA_SERVER}/bitmap/bitmapAppend`,
          {
            key: 'userIsLogin',
            value: email,
            status: 1,
          },
          { headers: { "x-service-token": process.env.INTERNAL_SERVICE_TOKEN } }
        );

        console.log(`User kết nối: ${email}`);
        return { success: true, email };
    } catch (error) {
        console.error(`Lỗi khi cập nhật bitmap cho ${email}:`, error);
        throw error;
    }
}

const logout = async(email) => {
    try {
        await axios.post(
          `${DATA_SERVER}/bitmap/bitmapAppend`,
          {
            key: 'userIsLogin',
            value: email,
            status: 0,
          },
          { headers: { "x-service-token": process.env.INTERNAL_SERVICE_TOKEN } }
        );

        console.log(`User ngắt kết nối: ${email}`);
        return { success: true, email };
    } catch (error) {
        console.error(`Lỗi khi cập nhật bitmap logout cho ${email}:`, error);
        throw error;
    }
}

module.exports = {
    login,
    logout,
}