import express from 'express';
import path from 'path';
import url from 'url';

const publicDir = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../public');

const session = express.Router();

session.get('/login', (req, res) => {
  res.sendFile('index.html', { root: publicDir });
});

session.post('/connect', (req, res) => {
  const { name, password } = req.body;
  if (name === 'Jorge' && password === '12345') {
    req.session.isConnected = true;
    res.redirect('/session/admin');
  } else {
    res.redirect('/session/login');
  }
});

session.get('/admin', (req, res) => {
  if (req.session.isConnected) {
    res.sendFile('admin.html', { root: publicDir });
  } else {
    res.redirect('/session/login');
  }
});

session.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/session/login'));
});

export default session;
