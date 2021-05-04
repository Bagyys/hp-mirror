const crypto = require("crypto");

module.exports.encrypt = (email) => {
  console.log("encrypt");
  console.log("email");
  console.log(email);
  try {
    const password = process.env.EMAIL_ENCRYPTION_KEY;
    const iv = process.env.EMAIL_ENCRYPTION_IV; // what is this and why do we need it?
    console.log("password");
    console.log(password);
    console.log("iv");
    console.log(iv);
    const cipher = crypto.createCipheriv("aes-256-cbc", password, iv);
    console.log("cipher");
    console.log(cipher);
    const encryptedEmail = cipher.update(email, "utf-8", "hex");
    console.log("encryptedEmail");
    console.log(encryptedEmail);
    encryptedEmail += cipher.final("hex");
    console.log("encryptedEmail");
    console.log(encryptedEmail);
    return encryptedEmail;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.decrypt = (email) => {
  try {
    const password = process.env.EMAIL_ENCRYPTION_KEY;
    const iv = process.env.EMAIL_ENCRYPTION_IV;

    const decipher = crypto.createDecipheriv("aes-256-cbc", password, iv);

    const decryptedEmail = decipher.update(email, "hex", "utf-8");

    decryptedEmail += decipher.final("utf-8");

    return decryptedEmail;
  } catch (err) {
    console.log(err.message);
  }
};
