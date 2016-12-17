function keyboardService(APP_CONFIG) {
	let options = {};

	options.number = {kt:'Number_Pad', relative: false, size: 5}
	options.letter = {kt:'POS_Keyboard', relative: false, size: 5}
	
	function _switchControl(control) {
		_control = control;
	}
	
	return {
		getNumberPad: function() {
			if (APP_CONFIG.ENABLE_ONSCREEN_KEYBOARD)
				return options.number;
			return null;
		},
		getKeyboard: function() {
			if (APP_CONFIG.ENABLE_ONSCREEN_KEYBOARD)
				return options.letter;
			return null;
		},
		switchControl: _switchControl,
		isOnScreenKeyboardInControl: function() {
			return _control;
		}
	};
}