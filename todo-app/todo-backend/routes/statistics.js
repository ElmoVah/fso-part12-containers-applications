const express = require('express');
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  console.log("testi1");
  const count = await redis.getAsync("added_todos");
  console.log("count: " + count)
  res.json({
    "added_todos": count
  });
});

module.exports = router;