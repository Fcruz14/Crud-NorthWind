const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())
puerto= process.env.port || 90 ;
app.listen(puerto,"localhost");

const routes=require("./routes/routes");
app.use(routes);


console.log(`servidor ejecutandose en http://localhost:${puerto}`);




