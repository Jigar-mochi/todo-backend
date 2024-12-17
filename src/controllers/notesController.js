const Note = require("../models/notesSchema");
const asyncHandler = require("express-async-handler");
const { notesValidationSchema } = require("../utils/validations");

const getAllNotes = asyncHandler(async (req, res) => {
	try {
		const notes = await Note.find({ user_id: req.user.id });
		if (!notes || notes.length === 0) {
			return res.status(404).json({ success: false, message: 'No notes found for this user.' });
		}
		res.status(200).json({ success: true, message: 'Notes retrieved successfully.', data: notes });
	} catch (error) {
		console.error("Error fetching notes:", error);
		res.status(500).json({ success: false, message: 'An error occurred while fetching notes.' });
	}
});

const getNote = asyncHandler(async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);

		if (!note) {
			return res.status(404).json({ success: false, message: 'Note not found.' });
		}
		if (note.user_id.toString() !== req.user.id) {
			return res.status(403).json({ success: false, message: 'Access denied: Not your note.' });
		}
		res.status(200).json({ success: true, message: 'Note retrieved successfully.', data: note });
	} catch (error) {
		console.error("Error fetching note:", error);
		res.status(500).json({ success: false, message: 'An error occurred while retrieving the note.' });
	}
});


const createNewNote = asyncHandler(async (req, res) => {
	const { title, description } = req.body;
	try {
		await notesValidationSchema.validate(req.body, { abortEarly: false });
	} catch (err) {
		return res.status(400).json({ success: false, errors: err.errors });
	}
	try {
		const noteResults = await Note.create({
			title, description,
			user_id: req.user.id,
		});
		res.status(201).json({ success: true, message: 'Note created successfully', data: noteResults });
	} catch (error) {
		res.status(404).json({ success: false, message: error.message });
	}
});

const updateNote = asyncHandler(async (req, res) => {
	const { title, description } = req.body;
	try {
		await notesValidationSchema.validate(req.body, { abortEarly: false });
	} catch (err) {
		return res.status(400).json({ success: false, errors: err.errors });
	}
	try {
		const note = await Note.findById(req.params.id);
		if (!note) {
			return res.status(404).json({ success: false, message: 'Note not found.' });
		}
		if (note.user_id.toString() !== req.user.id) {
			return res.status(403).json({ success: false, message: 'Access denied: Not allowed to edit this note.' });
		}
		const updatedNote = await Note.findByIdAndUpdate(
			req.params.id,
			{ title, description },
			{ new: true, runValidators: true }
		);
		res.status(200).json({ success: true, message: 'Note updated successfully.', data: updatedNote });
	} catch (error) {
		console.error("Error updating note:", error);
		res.status(500).json({ success: false, message: 'An error occurred while updating the note.' });
	}
});


const deleteNote = asyncHandler(async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found.' });
        }
        if (note.user_id.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Access denied: Not allowed to delete this note.' });
        }
        await note.deleteOne();
        res.status(200).json({ success: true, message: 'Note deleted successfully.' });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the note.' });
    }
});


module.exports = {
	getAllNotes,
	createNewNote,
	getNote,
	updateNote,
	deleteNote,
};
