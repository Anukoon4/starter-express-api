const express = require("express");
const app = express();
const port = 3000;
const lineService = require("./line-service");
const aelandKey = "hctr77hdQWE";
const AE = "👨 พี่เอ้ ";
const MUT = "💓 น้องมัท";

app.use(express.json());
app.use((req, res, next) => {
  const { body } = req;
  if (body.key && body.key !== aelandKey) {
    return res.sendStatus(401);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/ae", (req, res) => {
  const { body } = req;
  const { message = "" } = body;
  let resMessage = "success";
  if (message) {
    lineService.SendToLineNotify(message, AE);
  } else {
    resMessage = "not found Message";
  }
  return res.send({
    status: 200,
    message: resMessage,
  });
});

app.post("/mut", (req, res) => {
    const { body } = req;
    const { message = "" } = body;
    let resMessage = "success";
    if (message) {
      lineService.SendToLineNotify(message, MUT);
    } else {
      resMessage = "not found Message";
    }
    return res.send({
      status: 200,
      message: resMessage,
    });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
