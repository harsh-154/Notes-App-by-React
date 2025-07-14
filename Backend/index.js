const connectToMongo = require('./db');
const express = require('express');
const authenticateRouter = require('./routes/authenticate');
const notebookRouter = require('./routes/notes');
const bookmarksRouter = require('./routes/bookmarks');
var cors = require('cors');

connectToMongo();
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(authenticateRouter);
app.use(notebookRouter);
app.use(bookmarksRouter);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});