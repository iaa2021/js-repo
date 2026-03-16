import request from "supertest";
import app from "./app.js";

const res = await request(app).get("/users");

console.log(res.body);