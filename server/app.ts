// require("dotenv").config();
// import express, { NextFunction, Request, Response } from "express";
// export const app = express();
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { ErrorMiddleware } from "./middleware/error";
// import userRouter from "./routes/user.route";

// app.use(express.json({ limit: "50mb" }));
// app.use(cookieParser());

// // cors => cross origin resource sharing
// app.use(
//   cors({
//     origin: process.env.ORIGIN,
//   })
// );

// // api requests limit
// // const limiter = rateLimit({
// //   windowMs: 15 * 60 * 1000,
// //   max: 100,
// //   standardHeaders: "draft-7",
// //   legacyHeaders: false,
// // });
// app.use(
//   cors({
//     origin: process.env.ORIGIN || "*", // Allows all origins if ORIGIN is not defined
//     credentials: true,
//   })
// );

// app.use("/api/v1",userRouter);

// app.get("/test", (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).json({
//     succcess: true,
//     message: "API is working",
//   });
// });

// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//   const err = new Error(`Route ${req.originalUrl} not found`) as any;
//   err.statusCode = 404;
//   next(err);
// });

// // middleware calls
// // app.use(limiter);
// app.use(ErrorMiddleware);
require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
 import orderRouter from "./routes/order.route";
 import notificationRouter from "./routes/notification.route";
 import analyticsRouter from "./routes/analytics.route";
 import layoutRouter from "./routes/layout.route";
// import { rateLimit } from "express-rate-limit";

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// Configure CORS to use environment variable ORIGIN
app.use(
  cors({
    origin: process.env.ORIGIN || "*",
    credentials: true,
  })
);

// Mount userRouter at /api/v1
app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter,orderRouter,notificationRouter,  analyticsRouter,layoutRouter); // Make sure this is above the catch-all route

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  console.log("GET /test route hit");
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// Catch-all route for 404 errors
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  console.log(`Route ${req.originalUrl} not found`);
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Error handling middleware
app.use(ErrorMiddleware);
