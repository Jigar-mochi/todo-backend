const Note = require("../models/notesSchema");
const asyncHandler = require("express-async-handler");

const getAllNotes = asyncHandler(async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);
		console.log("note", note);
		if (note.user_id.toString() !== req.user.id) {
			res.status(403).json({ success: false, message: 'User not found.' });
		}
	} catch (error) {
		res.status(403).json({ success: false, message: 'User not found.' });
	}
	if (!note) {
		console.log("test error", note);
		res.status(404).json({ success: false, message: 'Required data is missing.' });
	}
	res.status(200).json({ success: false, message: 'Required data is missing.', data: note });
});
const getNote = asyncHandler(async (req, res) => {
	const note = await Note.findById(req.params.id);
	if (note.user_id.toString() !== req.user.id) {
		res.status(403).json({ success: false, message: 'User not found.' });
	}
	console.log("note", note);
	if (!note) {
		console.log("test error", note);
		res.status(404).json({ success: false, message: 'Required data is missing.' });
	}
	res.status(200).json({ success: false, message: 'Required data is missing.', data: note });
});

const createNewNote = asyncHandler(async (req, res) => {
	console.log(req.body);
	const { note } = req.body;
	if (!note) {
		res.status(400).json({ success: false, message: 'Required data is missing.' });
	}
	console.log("req.user.id", req.user.id);
	const noteResults = await Note.create({
		note,
		user_id: req.user.id,
	});
	res.status(201).json({ success: false, message: 'Note created successfully', data: noteResults });
});

const updateNote = asyncHandler(async (req, res) => {
	const note = await Note.findById(req.params.id);
	if (!note) {
		res.status(404).json({ success: false, message: 'Contact not found' });
	}
	if (note.user_id.toString() !== req.user.id) {
		res.status(403).json({ success: false, message: 'User not allowed to edit note' });
	}
	const noteResults = await Note.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	);
	res.status(200).json({ success: true, message: 'Note updated successfully', data: noteResults });
});

const deleteNote = asyncHandler(async (req, res) => {
	const note = await Note.findById(req.params.id);
	if (!note) {
		res.status(404).json({ success: false, message: 'Contact not found' });
	}
	if (note.user_id.toString() !== req.user.id) {
		res.status(403).json({ success: false, message: 'User not found' });
	}
	await Note.deleteOne({ _id: req.params.id });
	res.status(200).json({ success: true, message: 'Note deleted successfully' });
});

module.exports = {
	getAllNotes,
	createNewNote,
	getNote,
	updateNote,
	deleteNote,
};
