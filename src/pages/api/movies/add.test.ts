import { createMocks } from "node-mocks-http";
import addMovies from "./add";

describe("Add movie", () => {
  test("add movies", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        title: "Title - Test",
        description: "Description",
        createdBy: "trang@gmail.com",
        isTest: true,
      },
    });

    await addMovies(req, res);

    expect(res._getStatusCode()).toBe(200);

    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        success: "Your movie has been shared successful.",
      })
    );
  });
});
