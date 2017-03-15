'use strict';
module.exports = function (ret, file, settings) {

	let reg = /\<script\s.*src\=(.*)\>/g;
	let srcOrigin = settings.srcOrigin || '';

	function isMatch(target, str) {
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

	fis.util.map(ret.src, function (subpath, file, i) {
		if (file.isHtmlLike) {
			let content = file.getContent();

			content = content.replace(reg, function (a, b) {
				if (isMatch(b, srcOrigin) && a.indexOf("crossorigin") === -1) {
					return a.substr(0, 8) + 'crossorigin="anonymous" ' + a.substr(8);
				} else {
					return a;
				}
			});
			file.setContent(content);
		}
	});
};