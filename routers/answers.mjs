import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const answersRouter = Router();

// 1. สร้างคำตอบ (Create Answer)
// URL: POST /questions/:id/answers
answersRouter.post("/:id/answers", async (req, res) => {
  try {
    const questionId = req.params.id;
    const { content } = req.body;

    // Validation: เช็คว่ามีข้อมูลไหม
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    // Validation: ตามโจทย์ ห้ามเกิน 300 ตัวอักษร
    if (content.length > 300) {
      return res.status(400).json({ message: "Content must not exceed 300 characters" });
    }

    const result = await connectionPool.query(
      `INSERT INTO answers (question_id, content, created_at)
       VALUES ($1, $2, NOW()) RETURNING *`,
      [questionId, content]
    );

    return res.status(201).json({
      message: "Answer created successfully",
      data: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 2. ดูคำตอบทั้งหมดของคำถามนั้น (Get Answers by Question Id)
// URL: GET /questions/:id/answers
answersRouter.get("/:id/answers", async (req, res) => {
  try {
    const questionId = req.params.id;

    const result = await connectionPool.query(
      "SELECT * FROM answers WHERE question_id = $1",
      [questionId]
    );

    return res.status(200).json({
      data: result.rows
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default answersRouter;