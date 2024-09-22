const ghpages = require("gh-pages");

ghpages.publish(
  "out",
  require("./src/data/config").gh_pages_config,
  function (err) {
    if (err) {
      console.error(err);
    }
  }
);
