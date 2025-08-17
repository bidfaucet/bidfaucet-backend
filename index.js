const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🚀 BidFaucet Backend Running!");
});

app.get("/faucet", async (req, res) => {
  try {
    const response = await axios.post("https://faucetpay.io/api/v1/send", {
      api_key: process.env.FAUCETPAY_API_KEY,
      to: "user_wallet_address", // ganti alamat dompet user
      amount: "0.000001",
      currency: "BTC"
    });
    res.json(response.data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
