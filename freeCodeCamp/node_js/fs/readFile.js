import fs from "fs/promises";
const articlePath = new URL("./article.md", import.meta.url);
console.log('Absolute path to the article:', articlePath);
async function readFileContent() {
  try {
    const fileContent = await fs.readFile(articlePath, "utf8");
    console.log("File content:", fileContent);
  } catch (err) {
    console.log("Failed to read file:", err.message);
  }
}

readFileContent();

/*
File content: ## Node `fs` Module: The Complete Guide

In this article, you will learn all there is to know about the Node fs module...
*/