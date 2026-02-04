// routers/questions.mjs
import { Router } from "express";
import connectionPool from "../utils/db.mjs";// Import จากไฟล์ db.mjs ของคุณ

const questionsRouter = Router();

// 1. สร้างคำถาม (Create)
questionsRouter.post("/", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    
    // Validate ข้อมูล
    if (!title || !description || !category) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const result = await connectionPool.query(
      `INSERT INTO questions (title, description, category, created_at)
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [title, description, category]
    );

    return res.status(201).json({
      message: "Created successfully",
      data: result.rows[0] // ส่งข้อมูลที่เพิ่งสร้างกลับไป
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 2. ดูคำถามทั้งหมด + ค้นหา (Read All + Search)
questionsRouter.get("/", async (req, res) => {
  try {
    const { keywords } = req.query; // รับค่า ?keywords=... มาจาก URL
    let query = "SELECT * FROM questions";
    let values = [];

    // ถ้ามีการส่ง keywords มา ให้เพิ่มเงื่อนไข WHERE
    if (keywords) {
      query += " WHERE title ILIKE $1 OR category ILIKE $1";
      values = [`%${keywords}%`];
    }

    const result = await connectionPool.query(query, values);
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 3. ดูคำถามรายอัน (Read One)
questionsRouter.get("/:id", async (req, res) => {
  try {
    const questionId = req.params.id;
    const result = await connectionPool.query(
      "SELECT * FROM questions WHERE id = $1",
      [questionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 4. แก้ไขคำถาม (Update)
questionsRouter.put("/:id", async (req, res) => {
  try {
    const questionId = req.params.id;
    const { title, description } = req.body;

    const result = await connectionPool.query(
      `UPDATE questions
       SET title = $1, description = $2
       WHERE id = $3 RETURNING *`,
      [title, description, questionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({
      message: "Updated successfully",
      data: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 5. ลบคำถาม (Delete)
questionsRouter.delete("/:id", async (req, res) => {
  try {
    const questionId = req.params.id;

    // ต้องลบคำตอบ (Answers) ของคำถามนี้ก่อน (ถ้า DB ไม่ได้ตั้ง Cascade ไว้)
    await connectionPool.query("DELETE FROM answers WHERE question_id = $1", [questionId]);
    
    // ลบคำถาม
    const result = await connectionPool.query("DELETE FROM questions WHERE id = $1", [questionId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default questionsRouter;