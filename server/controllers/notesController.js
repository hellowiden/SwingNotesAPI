const Note = require('../models/notes');

const MAX_TITLE_LENGTH = 50;
const MAX_TEXT_LENGTH = 300;

// Controller function to list a specific note by ID
const listNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found.' });
        }
        return res.json(note);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve note.', details: error.message });
    }
};

// Controller function to list all notes
async function listAllNotes(req, res) {
    try {
        const notes = await Note.find();
        return res.json(notes);
    } catch (error) {
        console.error('Error retrieving notes:', error);
        return res.status(500).json({ error: 'Failed to retrieve notes.', details: error.message });
    }
}

// Controller function to add a new note
const addNote = async (req, res) => {
    const { title, text } = req.body;

    // Validate input
    if (typeof title !== 'string' || typeof text !== 'string' || title.length > MAX_TITLE_LENGTH || text.length > MAX_TEXT_LENGTH) {
        return res.status(400).json({ error: 'Invalid note data. Title or text exceeds maximum length.' });
    }

    // Create a new note instance
    const now = Date.now();
    const note = new Note({
        title,
        text,
        createdAt: now,
        modifiedAt: now
    });

    try {
        // Save the new note to the database
        await note.save();
        return res.status(201).json(note);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to add note.', details: error.message });
    }
};

// Controller function to update an existing note
const changeNote = async (req, res) => {
    const { id } = req.params;
    const { title, text } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { title, text }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found.' });
        }
        return res.json(updatedNote);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update note.', details: error.message });
    }
};

// Controller function to delete a note
const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found.' });
        }
        return res.status(204).json({ message: 'Note successfully deleted.', id: deletedNote._id });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete note.', details: error.message });
    }
};

module.exports = {
    listAllNotes,
    listNote,
    addNote,
    changeNote,
    deleteNote
};
