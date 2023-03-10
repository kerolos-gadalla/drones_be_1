describe.skip("fetch", () => {
  it("should fetch", async () => {
    const fetch = await import("node-fetch");
    // crude testcase for the initial setup
    fetch("http://localhost:3000/healthcheck")
      .then(() => console.log("Success"))
      .catch(() => console.log("Failure"));
    fetch("http://localhost:3000/healthcheck2")
      .then(async (res) => console.log("Success", await res.json()))
      .catch(() => console.log("Failure"));
  });
});
