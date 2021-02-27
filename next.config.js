const withImages = require("next-images");

module.exports = withImages({
  env: {
    NEXT_PUBLIC_API: "http://localhost:8080",  //process.env.NEXT_PUBLIC_API
  },
});
