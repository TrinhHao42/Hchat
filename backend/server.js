const express = require("express");
const { createServer } = require("https");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {});

httpServer.listen(3000);