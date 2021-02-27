const withImages = require("next-images");

module.exports = withImages({
  env: {
    NEXT_PUBLIC_API: "https://sayem-node-server.herokuapp.com"
  },
});
