import fs from "fs/promises";

async function writeToFile() {
  try {
    await fs.writeFile(
      "article.md",
      "## Node `fs` Module: The Complete Guide",
      "utf8",
    );
    console.log("File written to!");
  } catch (err) {
    console.error("Error writing to file:", err);
  }
}

writeToFile(); // File written to!