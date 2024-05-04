import axios from 'axios';

// Function to get the status of the process from Copyleaks API
const getProcessStatus = async (processId, token) => {
  const response = await fetch(`https://api.copyleaks.com/v1/businesses/${processId}/status`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  const data = await response.json();

  return data;
};

// Function to get the scan results from Copyleaks API
const getScanResults = async (processId, token) => {
  const response = await fetch(`https://api.copyleaks.com/v1/businesses/${processId}/result`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  const data = await response.json();

  return data;
};

export default async function handler(req, res) {
  try {
    const { text } = req.body;
    const apiUrl = "https://www.freedetector.ai/api/content_detector/";
    const token = process.env.TOKEN;

    // Call the initial API to start the process
    const response = await axios.post(apiUrl, { text }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    // Extract the process ID from the response
    const processId = response.data.processId;

    // Check the status of the process periodically until it's completed
    let status = await getProcessStatus(processId, token);
    while (status.Status !== 'completed') {
      // Add a delay before checking again
      await new Promise(resolve => setTimeout(resolve, 5000)); // 5 seconds delay
      status = await getProcessStatus(processId, token);
    }

    // Once completed, get the scan results
    const results = await getScanResults(processId, token);

    // Respond with the scan results
    res.status(200).json(results);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
