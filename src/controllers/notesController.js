const Note = require("../models/notesSchema");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
	console.log("id", req.params.id);
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

const editNote = asyncHandler(async (req, res) => {
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
	getContacts,
	createNewNote,
	getNotes,
	editNote,
	deleteNote,
};
