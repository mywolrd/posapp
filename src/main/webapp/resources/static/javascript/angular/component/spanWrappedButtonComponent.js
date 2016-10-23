let spanWrappedButtonComponent = {
	controller:
		function(utilsService) {
			var ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.span_class = [];
				ctrl.span_class.push(utilsService.getCSScolxs() + ctrl.spanWidth);
			}
		},
	bindings: {
		spanWidth:'@',
		buttonName:'@',
		doClick:'&'
	},
	template:
			'<span class="no-padding" data-ng-class="$ctrl.span_class">'
		+		'<button class="btn btn-primary btn-block form-control" data-ng-click="$ctrl.doClick()">{{$ctrl.buttonName}}</button>'
		+	'</span>'
}