const axios = require("axios");
const token = process.env.LINE_TOKEN;
const url = "https://notify-api.line.me/api/notify";
const FormData = require("form-data");

exports.SendToLineNotify = async (message, sender = "ระบบ") => {
  try {
    const header = {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ` + token,
    };
    const messageData = `${sender} -> ${message}`;
    const requestDataData = new FormData();
    requestDataData.append("message", messageData);
    const { data } = axios.post(url, requestDataData, { headers: header });
    return data;
  } catch (error) {
    console.log("error :>> ", error);
    return error;
  }
};
