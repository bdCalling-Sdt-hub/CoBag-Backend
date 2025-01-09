import colors from 'colors';
import { Server, Socket } from 'socket.io';

declare module 'socket.io' {
    interface Socket {
        userId?: string;
    }
}

const socket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(colors.blue('🔌🟢 A user connected'));
        socket.on('user-connected', (userId: string) => {
            socket.userId = userId;
            socket.join(userId); // Join the room for the specific user
            console.log(
                colors.green(`User ${userId} joined their notification room`)
            );
        });

        socket.on('disconnect', () => {
            console.log(colors.red('🔌🔴 A user disconnected'));
        });
    });
};

export const socketHelper = { socket };
