function utilsService($filter) {
	let BOOTSTRAP_CSS_COL_XS = "col-xs-",
		TEXT_FONT_SIZE = 'font-';
	
	return {
		getCSScolxs: function() {
			return BOOTSTRAP_CSS_COL_XS;
		},
		
		getCSStextFontSize: function() {
			return TEXT_FONT_SIZE;
		},
		
		formatDateTime: function(datetime) {
			let epoch;
			
			if (angular.isNumber(datetime)) {
				epoch = datetime;
			} else if (Object.prototype.toString.call(datetime) === '[object Date]') {
				epoch = datetime.getTime();
			}
			
			// Otherwise, jackson2 complains.
			return $filter('date')(epoch, 'yyyy-MM-ddThh:mm:ss');
		}
	};
}