const express = require('express');
const app = express();

const proxy = require('http-proxy-middleware');

app.use(express.static(__dirname));

app.use(
  '/movie/server/:number',
  proxy({
    target: 'http://ec2-18-235-34-167.compute-1.amazonaws.com'
  })
);

// app.use(
//   '/',
//   proxy({
//     target: 'http://ec2-18-235-34-167.compute-1.amazonaws.com/'
//   })
// );

app.get('/', (req, res) => {});

let port = process.env.PORT || 3005;
app.listen(port, () => console.log('Server listening on port ' + port));
