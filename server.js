const express = require('express');
const app = express();

const proxy = require('http-proxy-middleware');

app.use(express.static(__dirname));

app.use(
  '/movie/server/:number',
  proxy({
    target: 'http://localhost:9002'
  })
);

app.use(
  '/',
  proxy({
    target: 'http://localhost:9002'
  })
);
app.get('/', (req, res) => {});

let port = process.env.PORT || 3005;
app.listen(port, () => console.log('Server listening on port ' + port));
