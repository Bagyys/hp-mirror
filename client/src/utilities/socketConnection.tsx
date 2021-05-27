import io from "socket.io-client";
// const socket = io("http://localhost:9000", { transports: ["websocket"] });
const socket = io("http://18.195.50.192:9000", { transports: ["websocket"] });

// export const testAction = () => {
//   socket.on("messageFromServer", (data) => {
//     console.log("messageFromServer data received on client");
//     console.log(data);
//   });
//   socket.emit("messageToServer", "are you seeing this?");
// };

export default socket;
