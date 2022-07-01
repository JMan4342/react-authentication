import { sendEmail } from "../../util/sendEmail";

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      await sendEmail({
        to: "manning.joseph.4342+test1@gmail.com",
        from: "manning.joseph.4342@gmail.com",
        subject: "Does this work?",
        text: "If you're reading this, then yes it works",
      });
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },
};
