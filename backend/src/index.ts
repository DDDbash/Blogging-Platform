import "reflect-metadata";
import express from "express";
import dataSource from "./datasource/dataSource";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import commentRoutes from "./routes/comment";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));

app.use(cors());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

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
