import supertest from "supertest";
import { connectToDatabase } from "../startup/database";
import { pool } from "../utils/db";
import { app } from "../..";

describe("user", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });
  afterAll(async () => {
    await pool.end();
  });
  it("login user", async () => {
    const email = "abbasaliaboubakar@gmail.com";
    const password = "password123";
    const resp = await supertest(app).post("/users/login").send({
      email,
      password,
    });
    expect(resp.statusCode).toBe(200);
  });
  it("get all users", async () => {
    const resp = await supertest(app).get("/users/");
    expect(resp.statusCode).toBe(200);
  });
  it("get one user", async () => {
    const userId = "0194697b-b580-77cb-b047-62a56594af1c";
    const resp = await supertest(app).get(`/users/${userId}`);
    expect(resp.statusCode).toBe(200);
  });
});
