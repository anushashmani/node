const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "wm174627@gmail.com",
    pass: "sscu qvmj wljf jmcl",
  },
});

const sendEmail = async (data) => {
  try {
    const response = await transporter.sendMail({
      from: "wm174627@gmail.com",
      ...data,
    });
    console.log("response mail id", response.messageId);

    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

module.exports = {
  sendEmail,
};
