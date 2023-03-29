const pluginWebc = require("@11ty/eleventy-plugin-webc");
const postcss = require("postcss");
const atImport = require("postcss-import");
const minifyCss = require("postcss-minify");


module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(pluginWebc, {
    components: "site/_includes/components/**/*.webc"
  });

	eleventyConfig.addTemplateFormats("css");
	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		compile: async function(inputContent) {
			const result = await postcss([atImport,minifyCss]).process(inputContent);
			return async () => result.css;
		},
	});

  eleventyConfig.addPassthroughCopy({
    "site/_public/": ".",
  });

  return {
    dir: {
      input: "site",
      output: "dist"
    }
  }
  
};
