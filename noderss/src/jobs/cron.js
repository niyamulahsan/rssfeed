const cron = require("node-cron");
const RssParser = require("rss-parser");
const moment = require("moment-timezone");

const { Rss } = require("../models");

const newsfeed = async () => {
  const parser = new RssParser();
  const feed = await parser.parseURL("https://www.prothomalo.com/feed/");
  feed.items.forEach((news) => {
    Rss.findOne({ where: { link: news.link } })
      .then(res => {
        const data = { link: news.link, title: news.title, summary: news.summary, author: news.author, pubdate: moment(news.pubDate).format("YYYY-MM-DD h:mm:ss") };
        if (!res) {
          Rss.create(data);
          // console.log('data added');
        }
      });
  });
  // console.log('run in a minute');
}

// schedule run every 30 minutes
cron.schedule('*/30 * * * *', newsfeed);