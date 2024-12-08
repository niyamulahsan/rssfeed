const { Router } = require("express");

const rss = require("../modules/rss/rss.route");

const route = Router().use(rss);

module.exports = route;