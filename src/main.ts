import http from "http";
import express from "express";
import { Server as IO_Server } from "socket.io"
import { Verify } from "./verify.js";
import { APP_ENV } from "./env.js";




const app = express();
app.use(express.json());


export type SocketEventMap = {
    data(data: SocketData): void,
    verified(): void
}

export type SocketData = {
    type: "update-order",
    data: {
        id?: string
    }
}



const server = http.createServer(app);
const ws = new IO_Server<SocketEventMap>(server, {
    cors: {
        origin: APP_ENV.MAIN_SERVER,
        methods: ["GET", "POST"],
        credentials: true
    }
});

ws.on("connect", async (socket) => {
    const { key} = socket.handshake.query;
    if (typeof key !== "string") return socket.disconnect();

    const ok = await Verify.service(key);
    if (ok) {
        socket.join("service");
        socket.emit("verified");

    } else {
        socket.disconnect();

    }
})


app.post("/send", async (req, res) => {
    const { key } = req.query;
    if (typeof key !== "string") return res.status(400).end();

    const verify = await Verify.service(key);
    if (verify) {
        ws.in("service").emit("data", req.body);

    } else {
        res.status(401);

    }

    res.end();
})



server.listen(APP_ENV.PORT);