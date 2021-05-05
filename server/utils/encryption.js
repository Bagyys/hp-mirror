const crypto = require("crypto");

module.exports.encrypt = (email) => {
  console.log("encrypt");
  // console.log("email");
  // console.log(email);
  try {
    // const secret = process.env.SECRET;
    // console.log("secret");
    // console.log(secret);
    // const key = crypto
    //   .createHash("sha256")
    //   .update(String(secret))
    //   .digest("base64");
    const key = process.env.SPARE_EMAIL_ENCRYPTION_KEY;
    // const key = crypto.createHash("sha256").update(String(secret));
    // const key = crypto
    //   .createHash("sha256")
    //   .update(String(secret))
    //   .digest("base64");
    // console.log("key");
    // console.log(key);
    // const key_in_bytes = Buffer.from(key, "hex");
    // console.log("key_in_bytes");
    // console.log(key_in_bytes);
    const iv = process.env.SPARE_EMAIL_ENCRYPTION_IV;
    // console.log("iv");
    // console.log(iv);
    // const iv_in_bytes = Buffer.from(iv, "hex");
    // const bufferToEncrypt = Buffer.from(email, "utf8");
    const cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
    // console.log("cipher");
    // console.log(cipher);
    // const cipher = crypto.createCipheriv("aes-256-cbc", password, iv);
    // console.log("cipher");
    // console.log(cipher);
    // const encryptedEmail = Buffer.concat([
    //   cipher.update(String(email), "utf8", "hex"),
    //   cipher.final("hex"),
    // ]);
    // console.log("encrypted");
    // console.log(encrypted);
    // const encryptedEmail =
    //   cipher.update(email, "utf-8", "hex") + cipher.final("hex");

    let encryptedEmail = cipher.update(email, "utf-8", "hex");
    encryptedEmail += cipher.final("hex");
    // console.log("encryptedEmail");
    // console.log(encryptedEmail);
    // encryptedEmail += cipher.final("hex");
    // console.log("encryptedEmail");
    // console.log(encryptedEmail);
    return encryptedEmail;
  } catch (err) {
    console.log("encrypt error");
    console.log(err);
    console.log(err.message);
  }
};

module.exports.decrypt = (email) => {
  console.log("decrypt");
  console.log("email");
  console.log(email);
  try {
    const key = process.env.SPARE_EMAIL_ENCRYPTION_KEY;
    console.log("key");
    console.log(key);
    // const key_in_bytes = Buffer.from(key, "base64");
    // console.log("key_in_bytes");
    // console.log(key_in_bytes);
    const iv = process.env.SPARE_EMAIL_ENCRYPTION_IV; // what is this and why do we need it?
    console.log("iv");
    console.log(iv);
    // const iv_in_bytes = Buffer.from(iv, "hex");
    // const encryptedData = Buffer.from(email, "hex");

    // const cipher = crypto.createCipheriv("aes-256-ctr", key_in_bytes, iv);
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    console.log("decipher");
    console.log(decipher);
    // const password = process.env.EMAIL_ENCRYPTION_KEY;
    // const iv = process.env.EMAIL_ENCRYPTION_IV;

    // const decipher = crypto.createDecipheriv("aes-256-cbc", password, iv);

    // const decryptedEmail =
    //   decipher.update(email, "hex", "utf-8") + decipher.final("utf-8");

    let decryptedEmail = decipher.update(email, "hex", "utf-8");

    decryptedEmail += decipher.final("utf-8");

    // console.log("decryptedEmail before final");
    // console.log(decryptedEmail);
    // decryptedEmail += decipher.final("utf-8");
    console.log("decryptedEmail");
    console.log(decryptedEmail);
    return decryptedEmail;
  } catch (err) {
    console.log("decrypt error");

    console.log(err);
  }
};
