let searchCustomerComponent = {
	controller:
		function (customerService, navigationService, keyboardService) {
			let ctrl = this;
	
			ctrl.$onInit = function() {
				ctrl.search_customer_input = [
					{label: 'Last Name', id: "lastName", value: null, required: true, keyboardConfig: keyboardService.getKeyboard()}];
						
				ctrl.title = 'Search Customer';
			}
			
			ctrl.update = function(name, value, index) {
				ctrl.search_customer_input[index].value = value;
			};
			
			ctrl.search = function() {
				customerService.search(ctrl.search_customer_input[0].value, function(res) {
					ctrl.results = res.data;
					ctrl.results.map(function(customer) {
						customer.name = customer.lastName + ', ' + customer.firstName; 
						customer.displayValue = formatString(customer);
					});
					_reset();
				}, function(res) {

				});
			}
			
			ctrl.select = function(selected) {
				customerService.setCurrentCustomer(selected);
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
		
		+	'<select-list list="$ctrl.results" col="3" do-click="$ctrl.select(selected)"/>'
}