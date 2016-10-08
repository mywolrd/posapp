/**
 * String Service
 */
function stringService() {
	var _NBSP = '\xa0';

	function _repeatChar(str, len, char) {
		var pad = angular.isDefined(char) ? char : _NBSP;
		var padlen = len - str.length;
		return pad.repeat(padlen);
	}
	
	return {
		isLetterOnly : function(str) {
			if (str.search(/[^A-Za-z\s]/) != -1)
				return false;

			return true;
		},
		isNumberOnly : function(str) {
			if (str.search(/[^0-9]/) != -1)
				return false;

			return true;
		},
		getEmptyString : function(len) {
			var char = _NBSP;
			return char.repeat(len);
		},
		lpad : function(s, len, char) {
			var str = s.toString();

			return _repeatChar(str, len, char) + str;
		},
		rpad : function(s, len, char) {
			var str = s.toString();

			return str + _repeatChar(str, len, char);
		}
	};
}
