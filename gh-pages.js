const ghpages = require("gh-pages");

ghpages.publish(
  "out",
  {
    branch: "gh-pages",
    repo: "git@github.com:veehz/mcchub.git",
    message: 'Auto-generated commit',
    dotfiles: true
  },
  function (err) {
    if (err) {
      console.error(err);
    }
  }
);
