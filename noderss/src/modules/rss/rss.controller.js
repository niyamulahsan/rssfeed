const { Rss } = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const rssfeed = {};

rssfeed.index = async (req, res, next) => {
  try {
    // setup for pagination
    let size = Number(req.query.size) || 12;
    let offset = 0;
    let search = req.query.search;
    let page = Number(req.query.page) || 1;
    offset = size * (page - 1);

    // search methodology
    let whereSearch;
    if (search) {
      whereSearch = {
        [Op.or]: [
          Sequelize.where(
            Sequelize.literal("DATE_FORMAT(pubdate, '%Y-%m-%d')"),
            { [Op.like]: `%${search.trim()}%` }
          ),
        ],
      };
    }

    // count all data
    const rss = await Rss.findAndCountAll({ where: whereSearch, limit: size * page, offset: offset });
    // total page count
    let pages = Math.ceil(rss.count / size);

    // find all query
    const rssQuery = await Rss.findAll({
      include: [],
      attributes: { include: [], exclude: [] },
      limit: size,
      offset: offset,
      order: [["pubdate", "DESC"]],
      where: whereSearch,
    });

    // return data
    return res.status(200).json({
      rss: {
        current_page: Number(page),
        per_page: Number(size),
        total: Number(rss.count),
        from: rssQuery.length > 0 ? Number(offset + 1) : null,
        to: rssQuery.length > 0 ? Number(offset + rssQuery.length) : null,
        last_page: Number(pages),
        search: search || "",
        result: rssQuery,
      }
    });
  } catch (err) {
    next(err);
  }
};

rssfeed.distinctPubDate = async (req, res, next) => {
  try {
    // setup for pagination
    let size = Number(req.query.size) || 12;
    let offset = 0;
    let search = req.query.search;
    let page = Number(req.query.page) || 1;
    offset = size * (page - 1);

    // search methodology
    let whereSearch;
    if (search) {
      whereSearch = {
        [Op.or]: [
          Sequelize.where(
            Sequelize.literal("DATE_FORMAT(pubdate, '%Y-%m-%d')"),
            { [Op.like]: `%${search.trim()}%` }
          ),
        ],
      };
    }

    // count all data
    const rss = await Rss.findAndCountAll({ where: whereSearch, limit: size * page, offset: offset });
    // total page count
    let pages = Math.ceil(rss.count / size);

    // for filter data with publiish date and it will be group
    const rssQuery = await Rss.findAll({
      attributes: [[Sequelize.literal('DISTINCT DATE_FORMAT(pubdate, "%Y-%m-%d")'), 'pubdate']],
      group: ['pubdate'],
      limit: size,
      offset: offset,
      order: [["pubdate", "DESC"]],
      where: whereSearch,
    });

    // return data for dropdown
    return res.status(200).json({
      rss: {
        current_page: Number(page),
        per_page: Number(size),
        total: Number(rss.count),
        from: rssQuery.length > 0 ? Number(offset + 1) : null,
        to: rssQuery.length > 0 ? Number(offset + rssQuery.length) : null,
        last_page: Number(pages),
        search: search || "",
        result: rssQuery,
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = rssfeed;
