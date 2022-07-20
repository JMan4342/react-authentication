// import bcrypt from "bcrypt";
// import { getDbConnection } from "../db.js";
import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool.js";

export const resetPasswordRoute = {
  path: "/api/users/:passwordResetCode/reset-password",
  method: "put",
  handler: async (req, res) => {
    const { passwordResetCode } = req.params;
    const { email, newPassword } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool }).confirmPassword(
      passwordResetCode,
      newPassword,
      {
        onSuccess: () => {
          res.sendStatus(200);
        },
        onFailure: () => {
          res.sendStatus(401);
        },
      }
    );

    // const db = getDbConnection("react-auth-db");

    // const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // const result = await db.collection("users").findOneAndUpdate(
    //   { passwordResetCode },
    //   {
    //     $set: { passwordHash: newPasswordHash },
    //     $unset: { passwordResetCode: "" },
    //   }
    // );

    // if (result.lastErrorObject.n === 0) return res.sendStatus(404);

    // res.sendStatus(200);
  },
};
