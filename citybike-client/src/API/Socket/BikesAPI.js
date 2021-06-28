import socketIOClient from "socket.io-client";

export const getAvailableBikes = socketIOClient(process.env.REACT_APP_API_URL);
