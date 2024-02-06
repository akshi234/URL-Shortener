const shortid = require("shortid");
const URL = require("../models/url");
const mongoose = require("mongoose");

async function handleGenerateNewShortURL(req, res) {
  try {
    const { _id } = req.user;
    const body = req.body;

    if (!body.url) {
      console.error("Error: 'url' is required in the request body");
      return res.status(400).json({ error: "url is required" });
    }

    const shortID = shortid();

    const newUrl = await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visits: [],
      userId: _id,
    });

    console.log("URL document created:", newUrl);

    return res.json({ id: shortID });
  } catch (error) {
    console.error("Error generating short URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGetAnalytics(req, res) {
  try {
    console.log("User from Middleware:", req.user);
    const { _id } = req.user;

    const userShortUrls = await URL.find({ userId: _id });

    const simplifiedUrls = userShortUrls.map((url) => ({
      shortId: url.shortId,
      totalVisits: url.visits.length,
    }));

    return res.json({
      totalShortenedUrls: simplifiedUrls,
    });
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleDeleteShortURL(req, res) {
  try {
    const { shortId } = req.params;

    const deletedURL = await URL.findOneAndDelete({ shortId });

    if (!deletedURL) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.json({ message: "URL deleted successfully" });
  } catch (error) {
    console.error("Error deleting URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleEditShortURL(req, res) {
  try {
    // // const { _id } = req.user;
    const { shortId } = req.params;
    const { url, newShortId } = req.body;

    const Url = await URL.findOne({ url });

    if (!Url) {
      return res.status(404).json({ error: "URL not found" });
    }

    Url.shortId = newShortId;

    await Url.save();

    return res.json({ message: "Short URL updated successfully" });
  } catch (error) {
    console.error("Error updating short URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteShortURL,
  handleEditShortURL,
};
