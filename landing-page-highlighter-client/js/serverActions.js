// Sending data to the backend for saving as JSON files.
function saveHighlightsData(data) {
  const serverURL = 'http://localhost:8080';
  // const data = { username: 'example' };
  fetch(`${serverURL}/save`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}