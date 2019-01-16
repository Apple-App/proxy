const express = require('express');
const request = require('request');
const app = express();

app.use(express.static(__dirname));

app.use((req, res, next) => {
  let url = req.url.split('/');
  let path = url.slice(2).join('/');
  let endpoint = url[1];
  if (endpoint === 'main') {
    let proxy = process.env.MAIN_URL + path;
    request(proxy)
      .on('error', err => console.log(err))
      .pipe(res);
  } else if (endpoint === 'details') {
    let proxy = process.env.DETAILS_URL + path;
    request(proxy)
      .on('error', err => console.log(err))
      .pipe(res);
  } else if (endpoint === 'critics') {
    let proxy = process.env.CRITICS_URL + path;
    request(proxy)
      .on('error', err => console.log(err))
      .pipe(res);
  } else if (endpoint === 'sidebar') {
    if (path.includes('images')) {
      path = 'sidebar/' + path;
    }
    let proxy = process.env.SIDEBAR_URL + path;
    request(proxy)
      .on('error', err => console.log(err))
      .pipe(res);
  }
});

app.get('/', (req, res) => {});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server listening on port ' + port));
