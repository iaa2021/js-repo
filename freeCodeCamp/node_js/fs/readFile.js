import fs from "fs/promises";

async function readFileContent() {
  try {
    const fileContent = await fs.readFile("article.md", "utf8");
    console.log("File content:", fileContent);
  } catch (err) {
    console.log("File read successfully");
  }
}

readFileContent();

/*
File content: ## Node `fs` Module: The Complete Guide

In this article, you will learn all there is to know about the Node fs module...
*/