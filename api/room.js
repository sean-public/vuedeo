/* Path: <base_url>/api/room
  Zeit Now will execute this with a Node runtime as a Lambda (serverless)
  function.

   Accepts POST to create a new room. Doesn't bother vetting users at all
   and creates a random room name. Returns the Daily.co video room info
   so the client can connect.
*/

const axios = require('axios')

// Set up the POST to daily.co to create a new room
const daily_room_url = 'https://api.daily.co/v1/rooms/'
const post_options = {
  timeout: 10000, // 10 seconds
  headers: {'Authorization': `Bearer ${process.env.DAILY_API_KEY}`}
}

module.exports = async function(req, res) {
  if (req.method != 'POST') {
    return res.status(405).send('Method not allowed.');
  }
  try {
    const response = await axios.post(daily_room_url, {}, post_options)
    res.status(200).send(response.data);
  } catch (error) {
    console.log('ERROR creating room:', error);
    res.status(response.status);
  }
  res.end();
};
