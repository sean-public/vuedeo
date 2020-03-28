/* Path: <base_url>/api/metrics
  Zeit Now will execute this with a Node runtime as a Lambda (serverless)
  function.

  Accepts GET to retrieve metrics from a given room_id or POST to save
  call metrics from an active call participant. Returns JSON object with
  ordered time series metrics grouped by room and participants.
*/

// Use Postgres client to connect to Timescale DB. The connection config
// is taken from environment variables (host, port, user ...).
const { Pool } = require('pg')
const pool = new Pool({ ssl: true })
const insert_query = `
  INSERT INTO
  call_metrics(room_name, participant, time, send_bps, recv_bps, send_packet_loss, recv_packet_loss)
  VALUES ($1, $2, TO_TIMESTAMP($3::double precision / 1000), $4, $5, $6, $7)
`
const select_query = `
  SELECT
    room_name AS "roomName",
    participant,
    time,
    MAX(send_bps) AS "videoSendBitsPerSecond",
    MAX(recv_bps) AS "videoRecvBitsPerSecond",
    MAX(send_packet_loss) AS "videoSendPacketLoss",
    MAX(recv_packet_loss) AS "videoRecvPacketLoss"
  FROM call_metrics
  GROUP BY room_name, participant, time
  ORDER BY time ASC;
`

// Helper function for organizing the JSON results by room and participant,
// not worth importing Lodash or similar for this small project
function groupBy(list, props) {
  return list.reduce((a, b) => {
     (a[b[props]] = a[b[props]] || []).push(b);
     return a;
  }, {});
}

module.exports = async function(req, res) {
  if (req.method == 'POST') {
    const values = [
      req.body.roomName,
      req.body.participant,
      req.body.timestamp,
      Math.round(req.body.videoSendBitsPerSecond),
      Math.round(req.body.videoRecvBitsPerSecond),
      Math.round(req.body.videoSendPacketLoss),
      Math.round(req.body.videoRecvPacketLoss)
    ]
    try {
      const result = await pool.query(insert_query, values);
      res.status(201);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  else if (req.method == 'GET') {
    try {
      const result = await pool.query(select_query);

      // Group the flat results into the room->participant structure we want
      // (prefer doing this over making many SQL queries until it becomes
      // a resource issue)
      let groupedResults = {};
      for (const [room, values] of Object.entries(groupBy(result.rows, 'roomName'))) {
        groupedResults[room] = groupBy(values, 'participant')
      }
      res.status(200).json(groupedResults);
    } catch (error) {
      console.error('Error SELECTING metrics:', error); 
      res.status(500).send(error);
    }
  }
  else {
    res.status(405).send('Method not allowed.');
  }
  res.end();
};
