import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// const zoomService = () => {
//     const meetingId = uuidv4();
//     return `https://zoom.us/j/${meetingId}`;
// };
//
// export default zoomService;
//
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;

const generateAccessToken = async () => {
    // const tokenUrl = "https://zoom.us/oauth/token";
    // const params = new URLSearchParams({
    //     grant_type: 'client_credentials',
    // });

    const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`;

    const authHeader = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString("base64");

    try {
        const response = await axios.post(tokenUrl,null, {
            headers: {
                Authorization: `Basic ${authHeader}`,
                // "Content-Type": "application/json"
            },
        });

        return response.data.access_token;
    } catch (err) {
        console.error("Error generating Zoom access token:", err.response?.data || err.message);
        throw new Error("Failed to generate Zoom access token");
    }
};

export const createZoomMeeting = async (topic, startTime, duration) => {
    const token = await generateAccessToken();

    const payload = {
        topic,
        type: 2,
        start_time: startTime,
        duration,
        timeZone: "UTC",
        settings: {
            host_video: true,
            participant_video: true,
            approval_type: 0,
            registration_type: 1,
            // alternative_hosts: studentEmail,
        },
    };

    try {
        const response = await axios.post("https://api.zoom.us/v2/users/me/meetings", payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (err) {
        console.error("Error creating Zoom meeting:", err.response?.data || err.message);
        throw new Error("Failed to create Zoom meeting");
    }
};

try {
    const zoom = await createZoomMeeting("Maths", "2024-12-17T10:30:00Z", 60, "bhn62812@gmail.com");
    console.log("Zoom Meeting Details:", zoom);
} catch (error) {
    console.error("Error creating Zoom meeting:", error.message);
}
