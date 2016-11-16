function utilsService() {
	let BOOTSTRAP_CSS_COL_XS = "col-xs-",
		TEXT_FONT_SIZE = 'font-';
	
	return {
		getCSScolxs: function() {
			return BOOTSTRAP_CSS_COL_XS;
		},
		
		getCSStextFontSize: function() {
			return TEXT_FONT_SIZE;
		}
	};
}