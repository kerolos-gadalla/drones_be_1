import app from "./app.js";
import initScheduledJobs from "./src/jobs/index.js";
// loading environment variables from.env file

const port = process.env.PORT || 3000;

initScheduledJobs();
app
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
  .on("error", (err) => {
    console.log(`Error: ${err}`);
  });
