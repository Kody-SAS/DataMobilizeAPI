import axios from "axios";

const API_URL = "https://exp.host/--/api/v2/push/send";

export const sendNotification = async (
  expoPushToken: string,
  title?: string,
  body?: string,
  data?: any
) => {
  if (!expoPushToken) throw new Error("Expo push token required.");
  const payload = {
    to: expoPushToken,
    title: title || null,
    body: body || null,
    data: data || null,
  };
  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        host: "expo.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      console.log(`Notification sent successfully: ${response.data}`);
    } else {
      console.log(`Failed sent notification: ${response.data}`);
    }
  } catch (error) {
    throw new Error(`Error while sending notification: ${error}`);
  }
};
