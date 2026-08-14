import crypto from "crypto";

const hashedPassword = crypto
  .createHash("sha256")
  .update("myStrongPassword")
  .digest("hex");
console.log("createHash result:", hashedPassword);
const hashedMessage = crypto
  .createHmac("sha256", "secretkey")
  .update("important-secret-message")
  .digest("hex");

console.log("createHmac result:", hashedMessage);
