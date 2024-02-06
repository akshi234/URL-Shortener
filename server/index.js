const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const urlRoute = require("./routes/url");
const authRoute = require("./routes/user");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const URL = require("./models/url");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use("/", authRoute);
app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visits: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (!entry) {
      console.error(`Error: No entry found for shortId: ${shortId}`);
      return res.status(404).json({ error: "URL not found" });
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error updating URL document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(process.env.PORT || 8001, () => {
  mongoose
    .connect(process.env.MONGODB_URL, { dbName: "UrlShortner" })
    .then(() =>
      console.log(`Server is running on http://localhost:${process.env.PORT}`)
    )
    .catch((error) => console.log(error));
});
