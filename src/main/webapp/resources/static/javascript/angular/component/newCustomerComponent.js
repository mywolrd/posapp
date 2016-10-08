var newCustomerComponent = {
	controller:
		function newCustomerCtrl(customerService) {
			var ctrl = this;
	
			ctrl.title = 'New Customer';
			ctrl.actionName = 'Save';
			ctrl.inputObjs = customerService.getNewCustomerInput();
	
			ctrl.action = function() {
				var param = {
					'lastName' : this.inputObjs[0].value,
					'firstName' : this.inputObjs[1].value,
					'phoneNumber' : this.inputObjs[2].value
				};
				
				customerService.save(param, function(res) {
					customerService.setCurrentCustomer(res.data);
					reset();
				}, function(res) {
				});
			};
	
			function reset() {
				ctrl.inputObjs = customerService.getNewCustomerInput();
			};
		},
	template:'<form class="input-form">'
		+		'<div class="row">'
		+ 			'<div class="col-xs-1"></div>'
		+ 			'<div class="col-xs-4">'
		+ 				'<h1>{{title}}</h1><br/>'
		+ 				'<keyboard-input input-objs="$ctrl.inputObjs"></keyboard-input><br/>'
		+ 				'<div class="row">'
		+ 					'<button class="btn btn-primary btn-lg btn-block" data-ng-click="$ctrl.action()">{{$ctrl.actionName}}</button>'
		+ 				'</div>'
		+ 			'</div>'
		+ 			'<div class="col-xs-6">'
		+ 				'<br/><br/>'
		+ 				'<table class="table">'
		+ 					'<tbody>'
		+ 						'<tr class="cursor-pointer" data-ng-click="$ctrl.rowClickAction(row)" data-ng-repeat="row in $ctrl.results" data-ng-class="row.id === $ctrl.idSelected ?' + "'selected' : ''" + '">'
		+ 							'<td>{{$index+1}}</td>'
		+ 							'<td data-ng-repeat="str in ::row.displayValue">{{::str}}</td>'
		+ 						'</tr>'
		+ 					'</tbody>' 
		+ 				'</table>'
		+ 			'</div>'
		+ 			'<div class="col-xs-1"></div>'
		+ 		'</div>'
		+	'</form>'
}