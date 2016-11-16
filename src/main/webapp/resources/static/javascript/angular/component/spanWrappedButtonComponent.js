let spanWrappedButtonComponent = {
	controller:
		function(utilsService) {
			var ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.span_class = [];
				if (ctrl.spanWidth)
					ctrl.span_class.push(utilsService.getCSScolxs() + ctrl.spanWidth);
			
				ctrl.button_class = [];
				if (ctrl.buttonClass)
					ctrl.button_class.push(ctrl.buttonClass);
				
				if (! ctrl.type)
					ctrl.type = 'button';
			}
		},
	bindings: {
		spanWidth:'@',
		buttonName:'@',
		buttonClass:'@',
		type:'@',
		doClick:'&'
	},
	template:
			'<span class="no-padding" data-ng-class="$ctrl.span_class">'
		+		'<button type="$ctrl.type" data-ng-class="$ctrl.button_class" class="btn form-control" data-ng-click="$ctrl.doClick()">{{$ctrl.buttonName}}</button>'
		+	'</span>'
}