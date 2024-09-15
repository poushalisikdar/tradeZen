require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");


const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const bodyParser = require("body-parser");
const cors = require("cors");

// app.get("/saveposition", async (req, res) => {
//    let tempPosition = [
//     {
//         product: "CNC",
//         name: "EVEREADY",
//         qty: 2,
//         avg: 316.27,
//         price: 312.35,
//         net: "+0.58%",
//         day: "-1.24%",
//         isLoss: true,
//       },
//       {
//         product: "CNC",
//         name: "JUBLFOOD",
//         qty: 1,
//         avg: 3124.75,
//         price: 3082.65,
//         net: "+10.04%",
//         day: "-1.35%",
//         isLoss: true,
//       },
//     ]

//   tempPosition.forEach((item) => {
//     let newPosition = new PositionsModel({
//         product: item.product,
//         name: item.name,
//         qty: item.qty,
//         avg: item.avg,
//         price: item.price,
//         net: item.net,
//         day: item.day,
//         isLoss: item.isLoss,
//     });
//     newPosition.save();
//   });
//   res.send("done");
// });
 app.use(cors());
 app.use(bodyParser.json())

app.get("/addHoldings",async(req,res)=>{
  let holding = await HoldingsModel.find({});
  res.json(holding);
})
app.get("/addPositions",async(req,res)=>{
  let position = await PositionsModel.find({});
  res.json(position);
})

app.post("/newOrder",async(req,res)=>{
let newOrder= new OrdersModel({
  name:req.body.name,
  qty:req.body.qty,
  price:req.body.price,
  mode:req.body.mode
})

newOrder.save();
res.send("order send");
})

app.listen(PORT, () => {
  console.log("App started!.. ");
  mongoose.connect(uri);
  console.log("DB connected");
});
