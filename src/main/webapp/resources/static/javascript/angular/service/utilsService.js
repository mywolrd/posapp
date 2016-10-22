function utilsService() {
	let BOOTSTRAP_CSS_COL_XS = "col-xs-",
		TEXT_FONT_SIZE = 'font-';
	
	return {
		getMaxPageNum: function(array, pageSize) {
			if (angular.isDefined(array) && angular.isObject(array)) {
				let len = array.length,
					div = Math.floor(len / pageSize),
					rem = len % pageSize;
				if (rem > 0) div++;
				div--;
				return div;
			}
			return 0;
		},
		
		getCSScolxs: function() {
			return BOOTSTRAP_CSS_COL_XS;
		},
		
		getCSStextFontSize: function() {
			return TEXT_FONT_SIZE;
		}
	};
}