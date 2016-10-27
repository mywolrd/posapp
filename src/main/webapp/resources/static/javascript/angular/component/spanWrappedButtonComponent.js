let spanWrappedButtonComponent = {
	controller:
		function(utilsService) {
			var ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.span_class = [];
				ctrl.span_class.push(utilsService.getCSScolxs() + ctrl.spanWidth);
			
				ctrl.button_class = [];
				ctrl.button_class.push(ctrl.buttonClass);
			}
		},
	bindings: {
		spanWidth:'@',
		buttonName:'@',
		buttonClass:'@',
		doClick:'&'
	},
	template:
			'<span class="no-padding" data-ng-class="$ctrl.span_class">'
		+		'<button data-ng-class="$ctrl.button_class" class="btn btn-block form-control" data-ng-click="$ctrl.doClick()">{{$ctrl.buttonName}}</button>'
		+	'</span>'
}