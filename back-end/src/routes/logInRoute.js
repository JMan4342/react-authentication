import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import {
//   AuthenticationDetails,
//   CognitoUserPool,
//   CognitoUserAttribute,
//   CognitoUser,
// } from "amazon-cognito-identity-js";
import { getDbConnection } from "../db.js";
// import { awsUserPool } from "../util/awsUserPool.js";

export const logInRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    // ***** AUTHENTICATION CODE ***** //
    // ***** AUTHENTICATION CODE ***** //
    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });

    if (!user) return res.sendStatus(401);

    const { _id: id, isVerified, passwordHash, salt, info } = user;
    const pepper = process.env.PEPPER_STRING;

    const isCorrect = await bcrypt.compare(salt + password + pepper, passwordHash);

    if (isCorrect) {
      jwt.sign(
        { id, isVerified, email, info },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            res.sendStatus(500);
          }

          res.status(200).json({ token });
        }
      );
    } else {
      res.sendStatus(401);
    }

    // ***** CONGITO AUTHENTICATION ***** //
    // ***** CONGITO AUTHENTICATION ***** //

    // new CognitoUser({ Username: email, Pool: awsUserPool }).authenticateUser(
    //   new AuthenticationDetails({ Username: email, Password: password }),
    //   {
    //     onSuccess: async (result) => {
    //       const db = getDbConnection("react-auth-db");
    //       const user = await db.collection("users").findOne({ email });

    //       const { _id: id, isVerified, info } = user;

    //       jwt.sign(
    //         { id, isVerified, email, info },
    //         process.env.JWT_SECRET,
    //         { expiresIn: "2d" },
    //         (err, token) => {
    //           if (err) {
    //             res.sendStatus(500);
    //           }

    //           res.status(200).json({ token });
    //         }
    //       );
    //     },
    //     onFailure: (err) => {
    //       res.sendStatus(401);
    //     },
    //   }
    // );
  },
};
