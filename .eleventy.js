const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy({ "_input/_redirects": "_redirects" });
  eleventyConfig.addPassthroughCopy({ "_input/_images": "images" });
  return {
    dir: {
      input: "_input",
      output: "_output",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
  };
};
