'use strict';

//target中是否有str
function isMatch(target, str) {
    if(!str){
        return true;
    }

    if (typeof str === "string") {
        return target.indexOf(str) !== -1;

    } else if (Array.isArray(str)) {
        for (let i = 0; i < str.length; i++) {
            if (target.indexOf(str[i]) !== -1) {
                return true;
            }
        }
    }

}

//匹配不包含crossorigin="anonymous"的script标签里的src
//如果src中有匹配srcOrigin的，就加上匹配不包含crossorigin
//如果srcOrigin为空或者undefined，所有的script都会加crossorigin
function addCrossoriginToScripts(htmlPluginData, srcOrigin, callback) {
    let html = htmlPluginData.html;

    htmlPluginData.html = html.replace(/\<script[^>]*src\=([^>]*)\>/gi, (a, b) => {

        if (isMatch(b, srcOrigin) && a.indexOf("crossorigin") === -1) {
            return a.substr(0, 8) + 'crossorigin="anonymous" ' + a.substr(8);
        } else {
            return a;
        }
    });


    callback(null, htmlPluginData);
}

function HtmlWebpackScriptCrossoriginPlugin(options) {
    this.options = options;
}

HtmlWebpackScriptCrossoriginPlugin.prototype.apply = function (compiler) {
    let self = this,
        srcOrigin = this.options.srcOrigin;

    // Hook into the html-webpack-plugin processing
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-html-processing', function (htmlPluginData, callback) {

            addCrossoriginToScripts(htmlPluginData, srcOrigin, callback);
        });
    });
};

module.exports = HtmlWebpackScriptCrossoriginPlugin;
