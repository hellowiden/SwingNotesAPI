const express = require('express');
const router = express.Router();
const cors = require('cors');
const { listAllNotes, listNote, addNote, changeNote, deleteNote } = require('./controllers/notesController');
const { signUp, logIn } = require('./controllers/authController');
const Note = require('./models/notes'); 
const { authenticateToken } = require('./token')

// Middleware for CORS
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:5173'
};
router.use(cors(corsOptions));

// Routes
router.get('/', (req, res) => res.json({ message: 'Test is working!' }));
router.get('/api/notes',  authenticateToken, listAllNotes);
router.post('/api/notes', authenticateToken, addNote);
router.get('/api/notes/:id', authenticateToken, listNote);
router.put('/api/notes/:id',authenticateToken, changeNote);
router.delete('/api/notes/:id', authenticateToken, deleteNote);
router.post('/api/user/signup', signUp);
router.post('/api/user/login', logIn);

module.exports = router;