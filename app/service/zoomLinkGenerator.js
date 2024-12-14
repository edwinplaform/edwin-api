import {v4 as uuidv4} from "uuid";

const zoomLinkGenerator = () => {
    const meetingId = uuidv4();
    return `https://zoom.us/j/${meetingId}`;
};

export default zoomLinkGenerator;