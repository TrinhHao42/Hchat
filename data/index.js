const express = require("express");
const cors = require("cors");
const user = require('./routes/user.route')
require('./configs/connectDB')

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/api', user)

app.listen(port, () => {
  console.log(`Data server đang chạy tại http://localhost:${port}`);
});