const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/claim", async (req, res) => {
  try {
    const { address, currency } = req.body;

    const response = await axios.post("https://faucetpay.io/api/v1/send", null, {
      params: {
        api_key: process.env.FAUCETPAY_API_KEY,
        to: address,
        amount: 0.000001, // sesuaikan
        currency: currency
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
