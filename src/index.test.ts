import fetch from "node-fetch";

describe.skip("fetch", () => {
  it("should fetch", async () => {
    // crude testcase for the initial setup
    fetch("http://localhost:3000/healthcheck")
      .then(() => console.log("Success"))
      .catch(() => console.log("Failure"));
    fetch("http://localhost:3000/healthcheck2")
      .then(async (res) => console.log("Success", await res.json()))
      .catch(() => console.log("Failure"));
  });
});
