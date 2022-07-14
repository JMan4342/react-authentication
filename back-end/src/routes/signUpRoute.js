import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db.js";
import { awsUserPool } from "../util/awsUserPool.js";
// import bcrypt from "bcrypt";
// import { v4 as uuid } from "uuid";
// import { sendEmail } from "../util/sendEmail";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const attributes = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];

    awsUserPool.signUp(
      email,
      password,
      attributes,
      null,
      async (err, awsResult) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Unable to sign up user" });
        }

        const db = getDbConnection("react-auth-db");

        const startingInfo = {
          hairColor: "",
          favoriteFood: "",
          bio: "",
        };

        const result = await db.collection("users").insertOne({
          email,
          info: startingInfo,
        });
        const { insertedId } = result;

        jwt.sign(
          {
            id: insertedId,
            isVerified: false,
            email,
            info: startingInfo,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          },
          (err, token) => {
            if (err) return res.sendStatus(500);
            res.status(200).json({ token });
          }
        );
      }
    );

    // **** This gets email and password from front end **** //
    // **** This gets email and password from front end **** //
    // const { email, password } = req.body;
    // const db = getDbConnection("react-auth-db");
    // const user = await db.collection("users").findOne({ email });
    // if (user) {
    //   res.sendStatus(409);
    // }
    // const passwordHash = await bcrypt.hash(password, 10);
    // const verificationString = uuid();
    // const startingInfo = {
    //   hairColor: "",
    //   favoriteFood: "",
    //   bio: "",
    // };
    // const result = await db.collection("users").insertOne({
    //   email,
    //   passwordHash,
    //   info: startingInfo,
    //   isVerified: false,
    //   verificationString,
    // });
    // const { insertedId } = result;
    // try {
    //   await sendEmail({
    //     to: email,
    //     from: "manning.joseph.4342@gmail.com",
    //     subject: "Please verify your email",
    //     text: `
    //       Thanks for signing up! To verify your email, click here:
    //       http://localhost:3000/verify-email/${verificationString}
    //     `,
    //   });
    // } catch (e) {
    //   console.log(e);
    //   res.sendStatus(500);
    // }
    // jwt.sign(
    //   {
    //     id: insertedId,
    //     email,
    //     info: startingInfo,
    //     isVerified: false,
    //   },
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: "2d",
    //   },
    //   (err, token) => {
    //     if (err) {
    //       return res.status(500).send(err);
    //     }
    //     res.status(200).json({ token });
    //   }
    // );
  },
};
