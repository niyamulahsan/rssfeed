const { check } = require("express-validator");
const { Rss } = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const rss = {};

rss.schema = [
  // check("link").notEmpty().withMessage("Link required"),
  // check("title").notEmpty().withMessage("Title required"),
  // check("summary").optional({ nullable: true }),
  // check("author").optional({ nullable: true }),
  // check("pubdate").notEmpty().withMessage("Publish date required"),
];

module.exports = rss;
