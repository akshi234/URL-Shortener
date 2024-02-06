const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteShortURL,
  handleEditShortURL,
} = require("../controllers/url");
const authorization = require("../middleware/authorization");

const router = express.Router();

router.post("/", authorization, handleGenerateNewShortURL);

router.get("/visits", authorization, handleGetAnalytics);

router.delete("/delete/:shortId", authorization, handleDeleteShortURL);

router.put("/edit/:shortId", handleEditShortURL);

module.exports = router;
