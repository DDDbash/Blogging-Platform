import "reflect-metadata";
import express from "express";
import dataSource from "./datasource/dataSource";
import authRoutes from "./routes/auth";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Blogging Platform");
});

dataSource
  .initialize()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
