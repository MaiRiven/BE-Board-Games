const apiRouter = require('./routes/api-router');
const express = require("express");
const cors = require('cors');
const {
  handle500Statuses,
  handleCustomErrors,
  handlePsqlErrors,
  handle404Errors,
} = require("./controllers/error-handling");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.use(handle404Errors);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500Statuses);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Path not found! >:(" });
});

module.exports = app;
