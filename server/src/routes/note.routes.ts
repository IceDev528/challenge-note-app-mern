import { Router } from "express";
import {
  getNoteByID,
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller";

const router = Router();

router.get("/", getNotes);
router.get("/:id", getNoteByID);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export { router as noteRoutes };
