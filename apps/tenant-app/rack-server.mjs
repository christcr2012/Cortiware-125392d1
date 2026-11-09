// Fleet-pattern standalone entrypoint for the Development Rack.
// The rack build recipe runs this file directly (node rack-server.mjs);
// it answers the rack health contract at GET / and is the seam where the
// app's real server bootstrap attaches at stand-up.
import { createServer } from 'node:http';

const port = Number(process.env.PORT || 3000);
const server = createServer((req, res) => {
  if (req.method === 'GET' && (req.url === '/' || req.url === '/health')) {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 'service-online' }));
    return;
  }
  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ status: 'not-found' }));
});
server.listen(port, () => {
  console.log(`rack-server listening on ${port}`);
});
