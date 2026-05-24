import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Cloudinary signing endpoint for client-side signed uploads
app.post('/cloudinary/sign', (req, res) => {
  try {
    const apiSecret = process.env.CLOUDINARY_API_SECRET || process.env.VITE_CLOUDINARY_API_SECRET;
    const apiKey = process.env.CLOUDINARY_API_KEY || process.env.VITE_CLOUDINARY_API_KEY;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME;

    if (!apiSecret || !apiKey || !cloudName) {
      return res.status(500).json({ error: 'Cloudinary not configured on server.' });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    // Optional folder from client
    const folder = req.body?.folder;

    let paramsToSign = `timestamp=${timestamp}`;
    if (folder) paramsToSign += `&folder=${folder}`;

    const signature = crypto.createHash('sha1').update(paramsToSign + apiSecret).digest('hex');

    res.json({
      signature,
      api_key: apiKey,
      timestamp,
      cloud_name: cloudName
    });
  } catch (err) {
    console.error('Signing error:', err);
    res.status(500).json({ error: 'Failed to create signature' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
