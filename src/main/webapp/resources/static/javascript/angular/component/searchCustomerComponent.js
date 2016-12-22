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
				customerService.search(ctrl.search_customer_input[0].value, 
					function(customers) {
					ctrl.results = customers;
					_reset();
				}, function(res) {

				});
			}
			
			ctrl.select = function(selected) {
				customerService.setCurrentCustomer(selected);
				navigationService.back();
			};
			
			function _reset() {
				ctrl.search_customer_input[0].value = null;
			};
		},
	template:
			'<div class="col-xs-6">'
		+		'<p-form form-input="$ctrl.search_customer_input" title="{{$ctrl.title}}" button-name="Find"'
		+		'on-update="$ctrl.update(name, value, index)" submit="$ctrl.search()" />'
		+	'</div>'
		+	'<select-list list="$ctrl.results" col="3" do-click="$ctrl.select(selected)"/>'
}