const express = require('express');
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const count = await redis.getAsync("added_todos");
  console.log("count: " + count)
  res.json({
    "added_todos": count
  });
});

module.exports = router;