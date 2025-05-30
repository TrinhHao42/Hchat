const express = require("express");
const cors = require("cors");
const route = require('./routes/route')
require('./configs/connectDB')

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(route)

app.listen(port, () => {
  console.log(`Data server đang chạy tại http://localhost:${port}`);
});