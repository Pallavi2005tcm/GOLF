const Parser = require("rss-parser");
const parser = new Parser();

const RSS_FEEDS = [
  "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
  "https://feeds.feedburner.com/ndtvnews-top-stories",
  "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml",
  "http://feeds.bbci.co.uk/news/world/asia/india/rss.xml"
];

const KEYWORDS = ["flood", "flash flood", "river overflow", "submerged", "dam breach", "evacuation"];

const getFloodNews = async (req, res) => {
  let articles = [];

  for (const url of RSS_FEEDS) {
    try {
        console.log("Ap hit")
      const feed = await parser.parseURL(url);
      feed.items.forEach((item) => {
        console.log(item)
        const text = (item.title + " " + (item.contentSnippet || "")).toLowerCase();
        if (KEYWORDS.some((kw) => text.includes(kw))) {
            console.log(item.pubDate);
          articles.push({
            title: item.title,
            link: item.link,
            summary: item.contentSnippet,
            source: url,
            pubdate:item.pubDate
          });
        }
      });
    } catch (err) {
      console.error("Error parsing:", url, err.message);
    }
  }
  console.log("Backend news called")
console.log("Called");
  res.json({ articles });
};

module.exports = { getFloodNews };
