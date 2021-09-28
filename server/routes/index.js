const express = require('express');
const Mysql = require('../mysql')

const router = express.Router();

const db = new Mysql();

/* GET home page. */
router.get('/stays', async (req, res, next) => {
  const { ne_lat, ne_lng, sw_lat, sw_lng } = req.query
  const data = await db.selectInMapBounds('stays', ne_lat, ne_lng, sw_lat, sw_lng);
  console.log(data.length, ne_lat, ne_lng, sw_lat, sw_lng)
  res.json(data.splice(0, 30));
});

module.exports = router;
