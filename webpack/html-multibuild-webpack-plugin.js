const { concat, merge, uniq } = require('lodash');

/**
 * Tweaked from https://gist.github.com/robatwilliams/36a95119ae5adcd734a73f642f749cc3
 * that was tweaked from original by Mike Engel
 * https://github.com/jantimon/html-webpack-plugin/issues/782#issuecomment-331229728
 */
function HtmlMultibuildWebpackPlugin(options) {
  this.options = options;
  this.sharedAssets = { js: [], chunks: {}, css: [] };
}

HtmlMultibuildWebpackPlugin.prototype = {
  apply: function (compiler) {
    compiler.hooks.compilation.tap('HtmlMultibuildWebpackPlugin', compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
        'HtmlMultibuildWebpackPlugin',
        (data, callback) => {
          this.beforeHtmlProcessing(data, callback);
        }
      );
    });
  },

  beforeHtmlProcessing: function (htmlPluginData, callback) {
    this.sharedAssets = {
      js: uniq(concat(this.sharedAssets.js, htmlPluginData.assets.js)),
      chunks: merge(this.sharedAssets.chunks, htmlPluginData.assets.chunks),
      css: uniq(concat(this.sharedAssets.css, htmlPluginData.assets.css))
    }

    htmlPluginData.assets = {
      ...htmlPluginData.assets,
      ...this.sharedAssets
    };

    if (this.options.jsOrder && htmlPluginData.assets.js.length >= this.options.jsOrder.length) {
      this.options.jsOrder.forEach((p, idx) => {
        let cIdx = htmlPluginData.assets.js.findIndex(jsFilename => {
          return jsFilename.split('?', 1)[0] === p;
        });

        if (cIdx !== -1 && cIdx !== idx) {
          let t = htmlPluginData.assets.js[idx];
          htmlPluginData.assets.js[idx] = htmlPluginData.assets.js[cIdx];
          htmlPluginData.assets.js[cIdx] = t;
        }
      });
    }

    console.log('HtmlMultibuildWebpackPlugin ', htmlPluginData.assets.js);

    callback(null, htmlPluginData);
  }
};

module.exports = HtmlMultibuildWebpackPlugin;
