let spanWrappedInputComponent = {
	controller:
		function(utilsService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.span_class = [];
				ctrl.span_class.push(utilsService.getCSScolxs() + ctrl.spanWidth);
				
				ctrl.input_class = [];
				ctrl.input_class.push(utilsService.getCSStextFontSize() + ctrl.fontSize);
			}
		},
	bindings: {
		//TODO
		//Per AngularJS Documentation, Two-way binding is a no-no.
		//Not sure how to reverse one-way binding without a service(complexity).
		inputModel: '=',
		keyboardConfig: '<',
		spanWidth: '@',
		fontSize: '@',
		placeHolder: '@',
		isRequired: '<'
	},
	template:
			'<span class="no-left-padding" data-ng-class="$ctrl.span_class">'
		+		'<input class="form-control" data-ng-class="$ctrl.input_class" data-ng-required="$ctrl.isRequired" placeholder="{{$ctrl.placeHolder}}"' 
		+			'type="text" data-ng-model="$ctrl.inputModel" data-ng-virtual-keyboard="$ctrl.keyboardConfig"/>'
		+	'</span>'
}