const express = require('express');

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
  const {clientId, clientSecret} = config;

  const app = express();
  app.get('/', renderIndex());
  app.listen(port, hostname, () => {
    console.log(`OK - browse ${host}`);
  });
}

// start the application
main();
