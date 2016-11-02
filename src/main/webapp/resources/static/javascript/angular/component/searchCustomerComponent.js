let searchCustomerComponent = {
	controller:
		function (customerService, navigationService) {
			let ctrl = this;
	
			ctrl.$onInit = function() {
				ctrl.search_customer_input = [
					{label: 'Last Name', id: "lastName", value: null, required: true}];
						
				ctrl.title = 'Search Customer';
			}
			
			ctrl.update = function(name, value, index) {
				ctrl.search_customer_input[index].value = value;
			};
			
			ctrl.search = function() {
				customerService.search(ctrl.search_customer_input[0].value, function(res) {
					ctrl.results = res.data;
					ctrl.results.map(function(customer) {
						customer.displayValue = formatString(customer);
					});
					_reset();
				}, function(res) {

				});
			}
			
			ctrl.rowClickAction = 
				function(customer) {
					// this.idSelected = customer.id;
					customerService.setCurrentCustomer(customer);
					navigationService.back();
				};
	
			function formatString(customer) {
				let displayValue = [];
				displayValue.push(customer.lastName);
	
				if (customer.firstName) {
					displayValue.push(customer.firstName);
				}
	
				if (customer.number) {
					displayValue.push(customer.number);
				}
	
				return displayValue;
			};
	
			function _reset() {
				ctrl.search_customer_input[0].value = null;
			};
		},
	template:
			'<p-form form-input="$ctrl.search_customer_input" title="{{$ctrl.title}}" button-name="Find"'
		+		'on-update="$ctrl.update(name, value, index)" submit="$ctrl.search()" />'
		
		
		+	'<form class="input-form">'
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