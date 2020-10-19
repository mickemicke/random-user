import callApi from "./callApi";

const fakeFetch = jest.fn((url, options) => {
  if (url !== "someurl") {
    return new Error("e");
  }
  return Promise.resolve({
    json: () => Promise.resolve({ results }),
  });
});

const globalRef: any = global;
globalRef.fetch = fakeFetch;

beforeEach(() => {
  return jest.clearAllMocks;
});

afterAll(() => {
  return jest.resetAllMocks;
});

const results = [
  {
    name: {
      first: "Eduardo",
      last: "Bryant",
      title: "Mr",
    },
    cell: "123456",
  },
];

test("get user with callApi", async () => {
  const options = {
    headers: {
      "Content-type": "application/json",
    },
    method: "GET",
  };
  const response = await callApi("someurl", options);
  const argsUrl = (global.fetch as jest.Mock).mock.calls[0][0];
  const argsOptions = (global.fetch as jest.Mock).mock.calls[0][1];
  expect(argsUrl).toBe("someurl");
  expect(argsOptions).toBe(options);
  expect(response).toEqual({ results });
});

test("fail and return error with callApi", async () => {
  const response = await callApi<{ message: string }>("wrongurl");
  expect(response.message).toMatch("e");

  // denna känns väl snyggare, men är ju inte en bra representation av vad
  // callApi gör, eftersom den inte kastar ett fel utan bara returnerar ett fel
  // men då kanske man skulle överväga att skriva om callApi istället
  // try {
  //   await callApi("wrongurl");
  // } catch(e) {
  //   expect(e.message).toMatch('e')
  // }
});
