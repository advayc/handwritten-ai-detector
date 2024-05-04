const axios = require('axios'); // Import Axios for making HTTP requests

const sendTextToDetectorAPI = async (convertedText) => {
  try {
    // API endpoint URL
    const apiUrl = 'https://www.freedetector.ai/api/content_detector/';

    const token = key;

    const requestBody = {
      text: convertedText,
      token: token
    };

    // Making POST request to the API
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    if (response.data.success) {
      console.log('Content analysis score:', response.data.score);
      // You can further process the respo
    } else {
      console.error('API call failed:', response.data.message);
    }
  } catch (error) {
    console.error('Error sending text to AI Detector API:', error);
  }
};
const handleConvertText = async () => {
    if (imgUrl !== "") {
      await recognizeText(imgUrl);
      sendTextToDetectorAPI(convertedText);
    }
  };

// Call the function to send convertedText to the API
sendTextToDetectorAPI(convertedText);
