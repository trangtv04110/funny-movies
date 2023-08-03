import { createMocks } from "node-mocks-http";
import getMovies from "./get";

describe("Get list movies", () => {
  test("returns movies", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await getMovies(req, res);

    expect(res._getStatusCode()).toBe(200);
    // expect(JSON.parse(res._getData())).toEqual(
    //   expect.objectContaining({
    //     message: "Your favorite animal is dog",
    //   })
    // );
  });
});
