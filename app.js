import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


app.get('healthcheck', (_, res) => res.send('OK'));

export default app;
