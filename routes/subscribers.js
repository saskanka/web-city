const express = require("express");
const Subscriber = require("../models/subscribers");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
    // res.send("Hello");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getSubscriber, async (req, res) => {
  res.send(res.subscriber);
});

router.post("/", async (req, res) => {
  const newSubscriber = new Subscriber({
    name: req.body.name,
    channel: req.body.channel,
  });
  try {
    const response = await newSubscriber.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.status(200).json({ message: "Date removed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSubscriber(req, res, next) {
  let response;
  try {
    response = await Subscriber.findById(req.params.id);
    if (!response) {
      return res.status(404).json({ message: "Cannot find data" });
    }
    res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  res.subscriber = response;
  next();
}

module.exports = router;
