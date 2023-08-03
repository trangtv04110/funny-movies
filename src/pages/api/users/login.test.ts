import { createMocks } from "node-mocks-http";
import login from "./login";

describe("Login", () => {
  test("login success", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "trang@gmail.com",
        password: "1",
      },
    });

    await login(req, res);

    expect(res._getStatusCode()).toBe(200);

    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        success: true,
      })
    );
  });
});

describe("Login", () => {
  test("login false", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "trang123abc@gmail.com",
        password: "1",
      },
    });

    await login(req, res);

    expect(res._getStatusCode()).toBe(200);

    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        error: "Email or password is not correct",
      })
    );
  });
});
