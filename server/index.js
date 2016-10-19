const express = require('express');

/**
 * Gets client credentials JWT token from matcherino.
 */
function getClientCredentialsToken(clientId, clientSecret) {
  return (req, res) => {
    // TODO return empty token for now
    res.json({});
  }
}

function renderIndex() {
  return (req, res) => { 
    const page = `
<html>
  <head></head>
  <body>SERVER code</body>
</html>
    `;

    res.send(page);
  };
}

// The ENTRY point.
function main() {
  const hostname = 'localhost';
  const port = 1337;
  const host = `${hostname}:${port}`;

  const app = express();
  app.get('/', renderIndex());
  app.get('/token', getClientCredentialsToken('CLIENT', 'SECRET'));
  app.listen(port, hostname, () => {
    console.log(`OK - browse ${host}`);
  });
}

// start the application
main();
