import {v2 as cloudinary} from "cloudinary";
import http from "http";
// import connectDB from "./utils/db";
 import { initSocketServer } from "./socketServer";
import { app } from "./app";
import connectDB from "./utils/db";
require("dotenv").config();

const server = http.createServer(app);



cloudinary.config({
 cloud_name: process.env.CLOUD_NAME,
 api_key: process.env.CLOUD_API_KEY,
 api_secret: process.env.CLOUD_SECRET_KEY,
});

initSocketServer(server);

// create server
// Ensure the PORT is set correctly
const PORT = process.env.PORT || 3001;

// create server
app.listen(PORT, () => {
    console.log(`Server is connected with port ${PORT}`);
    connectDB();
});
