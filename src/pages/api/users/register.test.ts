import { createMocks } from "node-mocks-http";
import register from "./register";

function getRandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

describe("Register", () => {
  test("register success", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: `${getRandomString(8)}@gmail.com`,
        password: "1",
      },
    });

    await register(req, res);

    expect(res._getStatusCode()).toBe(200);

    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        success: "Your account has been created successful.",
      })
    );
  });
});

describe("Register", () => {
  test("register false", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "trang@gmail.com",
        password: "1",
      },
    });

    await register(req, res);

    expect(res._getStatusCode()).toBe(200);

    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        error: "This email has been used.",
      })
    );
  });
});
