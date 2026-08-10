import fs from "fs/promises";

async function deleteFile() {
  try {
    await fs.unlink("myFile.txt");
    console.log("File deleted successfully!");
  } catch (err) {
    console.error("Error deleting file:", err);
  }
}

deleteFile();