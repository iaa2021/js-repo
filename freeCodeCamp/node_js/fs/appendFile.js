import fs from "fs/promises";

async function appendToFile() {
  try {
    await fs.appendFile(
      "article.md",
      "\nIn this article, you will learn all there is to know about the Node fs module...",
      "utf8",
    );
    console.log("File appended to!");
  } catch (err) {
    console.log("Error appending to file:", err);
  }
}

appendToFile(); // File appended to!