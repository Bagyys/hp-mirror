const crypto = require("crypto");

module.exports.encrypt = (email) => {
    // console.log("encrypt");
    try {
        const key = process.env.EMAIL_ENCRYPTION_KEY;
        const iv = process.env.EMAIL_ENCRYPTION_IV;

        let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);

        let encrypted = cipher.update(email);

        encrypted = Buffer.concat([encrypted, cipher.final()]);
        const encryptedEmail = encrypted.toString("hex");

        return encryptedEmail;
    } catch (err) {
        console.log("encrypt error");
        // console.log(err);
        console.log(err.message);
    }
};

module.exports.decrypt = (email) => {
    // console.log("decrypt");
    try {
        const key = process.env.EMAIL_ENCRYPTION_KEY;

        const iv = process.env.EMAIL_ENCRYPTION_IV;

        let encryptedText = Buffer.from(email, "hex");

        let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

        let decryptedEmail = decipher.update(encryptedText);
        decryptedEmail = Buffer.concat([decryptedEmail, decipher.final()]);

        decryptedEmail.toString();

        return decryptedEmail;
    } catch (err) {
        console.log("decrypt error");
        // console.log(err);
        console.log(err.message);
    }
};