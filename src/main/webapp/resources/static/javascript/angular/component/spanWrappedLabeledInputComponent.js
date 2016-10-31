let spanWrappedLabeledInputComponent = {
	controller:
		function(utilsService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.label_class = [];
				
				ctrl.label_class.push(utilsService.getCSScolxs() + (12 - ctrl.spanWidth));
				ctrl.label_class.push(utilsService.getCSStextFontSize() + ctrl.fontSize);
			}
			
			ctrl.update = function(name, value, index) {
				ctrl.onUpdate({name: name, value: value, index: index});
			}
		},
	bindings: {
		inputValue: '<',
		keyboardConfig: '<',
		isRequired: '<',
		itemIndex: '<',
		inputType: '@',
		inputName: '@',
		spanWidth: '@',
		fontSize: '@',
		placeHolder: '@',
		inputLabel: '@',
		labelFor: '@',
		onUpdate:'&'
	},

	template: 
			'<label for="{{$ctrl.labelFor}}" class="control-label" data-ng-class="$ctrl.label_class">{{$ctrl.inputLabel}}</label>'
		+	'<sw-input id="{{$ctrl.labelFor}}" input-type="{{$ctrl.inputType}}" input-value="$ctrl.inputValue" input-name="{{$ctrl.inputName}}"'
		+		'span-width="{{$ctrl.spanWidth}}" font-size="{{$ctrl.fontSize}}" is-required="$ctrl.isRequired"'
		+		'item-index="$ctrl.itemIndex" on-update="$ctrl.update(name, value, index)" place-holder="{{$ctrl.placeHolder}}" keyboard-config="$ctrl.keyboardConfig"/>'
}