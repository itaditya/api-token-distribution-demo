require('dotenv').config();
const polka = require('polka');
const { json } = require('body-parser');

const { createToken, getJobs } = require('./routeHandlers');

const jsonSend = (req, res, next) => {
  res.json = ({ message = 'success', data = {} } = {}) => {
    res.setHeader('Content-Type', 'application/json');
    const jsonResponse = JSON.stringify({ message, data });
    res.end(jsonResponse);
  }

  next()
}

const requestLogger = (req, res, next) => {
  console.log(`-> ${req.method} ${req.url}`)
  next()
}

polka()
  .use(json())
  .use(jsonSend)
  .use(requestLogger)
  .get('/', (req, res) => {
    res.end('Server running')
  })
  .post('/api/token', createToken)
  .get('/api/jobs', getJobs)
  .listen(3000).then(_ => {
    console.log(`> Running on http://localhost:3000`);
  });
