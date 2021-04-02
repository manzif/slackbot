import app from "./../app";
import supertest from "supertest";

const request = supertest(app);

describe("testing-server-routes", () => {
  it("GET /states - success", async () => {
    const response = await request.get("/slack");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Users information retrieved successfully"
    );
  });
});
