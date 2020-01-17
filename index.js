
const express = require('express');
const morgan = require('morgan');

// Routers

const projectRouter = require('./data/routers/projectRouter');
const actionRouter = require('./data/routers/actionsRouter');

const server = express()

server.use(express.json());
server.use(morgan('short'));

// server.use routers

server.use('/api/project', projectRouter);
server.use('/api/project/:id/actions', actionRouter);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});