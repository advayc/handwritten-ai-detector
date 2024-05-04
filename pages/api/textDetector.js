// pages/api/textDetector.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { text } = req.body;
    const apiUrl = "https://www.freedetector.ai/api/content_detector/";
    const token = process.env.TOKEN;

    const response = await axios.post(apiUrl, { text }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
