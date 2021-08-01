import express from "express";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());

app.post("./send-email", (req, res) => {
  res.send({ status: "ok" });
});

app.listen(5000, () => console.log("App running on port 5000 "));
