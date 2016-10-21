function keyboardService() {
	let options = {};
	options.number = {kt:'Number_Pad', relative: false, size: 5}
	
	return {
		getNumberKeyboard: function() {
			return options.number;
		}
	};
}