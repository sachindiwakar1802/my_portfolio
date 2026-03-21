const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Models
const AchievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: String, default: () => new Date().toLocaleDateString() },
  image: String
});

const PhotoSchema = new mongoose.Schema({
  url: String,
  caption: String,
  date: { type: Date, default: Date.now }
});

const JournalSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  date: { type: String, default: () => new Date().toLocaleDateString() }
});

const ProjectSchema = new mongoose.Schema({
  name: String,
  date: String,
  size: String, // technologies used
  icon: String, // icon name from lucide
  url: String,
  description: String
});

const Achievement = mongoose.model('Achievement', AchievementSchema);
const Photo = mongoose.model('Photo', PhotoSchema);
const Journal = mongoose.model('Journal', JournalSchema);
const Project = mongoose.model('Project', ProjectSchema);

// Routes
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find().sort({ _id: -1 });
  res.json(projects);
});

app.post('/api/projects', async (req, res) => {
  const { name, date, size, icon, url, description } = req.body;
  const newProject = new Project({ name, date, size, icon, url, description });
  await newProject.save();
  res.json(newProject);
});

app.delete('/api/projects/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
});

app.get('/api/achievements', async (req, res) => {
  const achievements = await Achievement.find().sort({ _id: -1 });
  res.json(achievements);
});

app.post('/api/achievements', async (req, res) => {
  const { title, description, image } = req.body;
  const newAchievement = new Achievement({ title, description, image });
  await newAchievement.save();
  res.json(newAchievement);
});

app.delete('/api/achievements/:id', async (req, res) => {
  await Achievement.findByIdAndDelete(req.params.id);
  res.json({ message: 'Achievement deleted' });
});

app.get('/api/photos', async (req, res) => {
  const photos = await Photo.find().sort({ date: -1 });
  res.json(photos);
});

app.post('/api/photos', async (req, res) => {
  const { url, caption } = req.body;
  const newPhoto = new Photo({ url, caption });
  await newPhoto.save();
  res.json(newPhoto);
});

app.delete('/api/photos/:id', async (req, res) => {
  await Photo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Photo deleted' });
});

app.get('/api/journals', async (req, res) => {
  const journals = await Journal.find().sort({ _id: -1 });
  res.json(journals);
});

app.post('/api/journals', async (req, res) => {
  const { title, content, image } = req.body;
  const newJournal = new Journal({ title, content, image });
  await newJournal.save();
  res.json(newJournal);
});

app.delete('/api/journals/:id', async (req, res) => {
  await Journal.findByIdAndDelete(req.params.id);
  res.json({ message: 'Journal entry deleted' });
});

// Admin Auth (Simplified for now - can be expanded)
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === (process.env.ADMIN_PASSWORD || 'admin123')) {
    res.json({ success: true, token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
