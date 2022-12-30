import { requestHandler } from "backend/lib/request";
import {
  createAuthenticatedMocks,
  createAuthenticatedViewerMocks,
} from "__tests__/api/_test-utils";

const handler = requestHandler(
  {
    POST: async () => {
      return { foo: "bar" };
    },
  },
  [
    {
      _type: "withPassword",
    },
  ]
);

describe("Request Validations => withPasswordValidationImpl", () => {
  it("should return data when correct password is sent", async () => {
    const { req, res } = createAuthenticatedMocks({
      method: "POST",
      body: {
        password: "password",
      },
    });

    await handler(req, res);

    expect(res._getJSONData()).toMatchInlineSnapshot(`
      {
        "foo": "bar",
      }
    `);
  });

  it("should throw error when invalid password is sent", async () => {
    const { req, res } = createAuthenticatedViewerMocks({
      method: "POST",
      body: {
        password: "invalid-password",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toMatchInlineSnapshot(`
      {
        "message": "Invalid Password",
        "method": "POST",
        "name": "BadRequestError",
        "path": "",
        "statusCode": 400,
      }
    `);
  });
});
