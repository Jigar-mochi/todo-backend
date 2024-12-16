const express = require("express");
const validateTokenHandler = require("../middleWare/ValidateTokenHandler");
const { createNewNote, getAllNotes, updateNote, getNote, deleteNote } = require("../controllers/notesController");

const router = express.Router();

router.get("/", validateTokenHandler, getAllNotes);
router.post("/", validateTokenHandler, createNewNote);
router.put("/:id", validateTokenHandler, updateNote);
router.get("/:id", validateTokenHandler, getNote);
router.delete("/:id", validateTokenHandler, deleteNote);

module.exports = router;
