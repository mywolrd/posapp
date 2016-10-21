function keyboardService() {
	let options = {};
	options.number = {kt:'Number_Pad', relative: false, size: 5}
	options.letter = {kt:'POS_Keyboard', relative: false, size: 5}
	
	return {
		getNumberPad: function() {
			return options.number;
		},
		getKeyboard: function() {
			return options.letter;
		}
	};
}