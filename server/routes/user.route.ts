import express from "express";
import {
  activateUser,
   deleteUser,
   getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  updateAccessToken,
  socialAuth,
   updatePassword,
   updateProfilePicture,
   updateUserInfo,
   updateUserRole,
} from "../controllers/user.controller";
// import { isAutheticated } from "../middleware/auth";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
// const userRouter = express.Router();

// userRouter.post("/registration", registrationUser);

// userRouter.post("/activate-user", activateUser);

// export default userRouter;
// import express from "express";
// import { activateUser, loginUser, registrationUser } from "../controllers/user.controller";
const userRouter = express.Router();

userRouter.post("/registration", (req, res, next) => {
  console.log("POST /registration route hit");
  registrationUser(req, res, next);
});

userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAutheticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAutheticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user-info", isAutheticated, updateUserInfo);
userRouter.put("/update-user-password", isAutheticated, updatePassword);
userRouter.put("/update-user-avatar", isAutheticated, updateProfilePicture);
userRouter.get(
  "/get-users",
  isAutheticated,
  authorizeRoles("admin"),
  getAllUsers
);
userRouter.put(
  "/update-user",
  isAutheticated,
  authorizeRoles("admin"),
  updateUserRole
);
userRouter.delete(
  "/delete-user/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteUser
);
export default userRouter;
