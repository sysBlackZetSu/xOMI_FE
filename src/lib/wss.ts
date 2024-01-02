import { io, Socket } from "socket.io-client";
const WS = "ws://localhost:9001";

let socket: Socket | undefined;
const u_Socket = (): Socket | undefined => {
    try {
        if (!socket) {
            socket = io(WS, {
                forceNew: true,
            });
            // Add any event listeners or additional configurations if needed
        }
        
        return socket;
    } catch (error) {
        console.error('[Socket error]', error);
        throw new Error('Failed to create socket');
    }
};

export default u_Socket;