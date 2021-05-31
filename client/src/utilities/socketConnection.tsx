import io from "socket.io-client";

let url = process.env.REACT_APP_SERVER_URL;
if (!url) {
  url = "http://localhost:9000";
}

const socket = io(url, { transports: ["websocket"] });

export default socket;
