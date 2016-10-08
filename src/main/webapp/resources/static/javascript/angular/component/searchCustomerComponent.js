var searchCustomerComponent = {
	controller:
		function searchCustomerCtrl(customerService, navigationService) {
			var ctrl = this;
	
			ctrl.title = 'Search';
			ctrl.actionName = 'Search';
			ctrl.idSelected = 0;
			ctrl.inputObjs = customerService.getSearchCustomerInput();
	
			ctrl.action = 
				function() {
					customerService.search( ctrl.inputObjs[0].value,
											function(res) {
												ctrl.results = res.data;
												ctrl.results.map(function(customer) {
													customer.displayValue = formatString(customer);
												});
									}, function(res) {
	
									});
				};
	
			ctrl.rowClickAction = 
				function(customer) {
					// this.idSelected = customer.id;
					customerService.setCurrentCustomer(customer);
					navigationService.back();
				};
	
			function formatString(customer) {
				var displayValue = [];
				displayValue.push(customer.lastName);
	
				if (customer.firstName) {
					displayValue.push(customer.firstName);
				}
	
				if (customer.number) {
					displayValue.push(customer.number);
				}
	
				return displayValue;
			};
	
			function reset() {
				ctrl.inputObjs = customerService.getSearchCustomerInput();
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