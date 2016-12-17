let spanWrappedInputComponent = {
	controller:
		function(utilsService) {
			let ctrl = this;
			let _text = 'text';
			
			ctrl.$onInit = function() {
				ctrl.span_class = [];
				if (ctrl.spanWidth)
					ctrl.span_class.push(utilsService.getCSScolxs() + ctrl.spanWidth);
				
				ctrl.input_class = [];
				if (ctrl.fontSize);
					ctrl.input_class.push(utilsService.getCSStextFontSize() + ctrl.fontSize);
				
				ctrl.updateOn = {};
				if (_text === ctrl.inputType)
					ctrl.updateOn = {updateOn: 'blur'};				
			}

			ctrl.update = function() {
				ctrl.onUpdate({	name: ctrl.inputName, value: ctrl.inputValue, index: ctrl.itemIndex});
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
		onUpdate:'&'
	},
	template:
			'<span class="no-left-padding" data-ng-class="$ctrl.span_class">'
		+		'<input class="form-control" data-ng-class="$ctrl.input_class" data-ng-required="$ctrl.isRequired" placeholder="{{$ctrl.placeHolder}}"' 
		+			'data-ng-model="$ctrl.inputValue" ng-change="$ctrl.update()" data-ng-model-options="$ctrl.updateOn"' 
		+			'ng-change="$ctrl.update()" type="{{$ctrl.inputType}}" data-ng-virtual-keyboard="$ctrl.keyboardConfig"/>'
		+	'</span>'
}