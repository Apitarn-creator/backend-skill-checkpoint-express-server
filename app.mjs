// app.mjs
import express from "express";
import cors from "cors";
import questionsRouter from "./routers/questions.mjs";
import answersRouter from "./routers/answers.mjs";

const app = express();
const port = 4000;

app.use(cors()); // อนุญาตให้ Browser เรียก API ได้
app.use(express.json()); // ให้อ่าน req.body เป็น JSON ได้


// เชื่อม Router
app.use("/questions", questionsRouter);
app.use("/questions", answersRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});