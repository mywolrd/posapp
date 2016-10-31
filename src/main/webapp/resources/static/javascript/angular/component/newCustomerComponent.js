let newCustomerComponent = {
	controller:
		function newCustomerCtrl(customerService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.new_customer_info = [
					{label: 'Last Name', id: "lastName", value: null, required: true}, 
					{label: 'First Name', id: "firstName", value: null, required: false}, 
					{label: 'Phone Number',id: "phoneNumber", value: null, required: false}];
						
				ctrl.title = 'New Customer';
			}

			ctrl.save = function() {
				let new_customer = ctrl.new_customer_info.reduce(function(map, currentItem) {
					map[currentItem.id] = currentItem.value;
					return map;
				}, {});

				customerService.save(new_customer, function(res) {
					customerService.setCurrentCustomer(res.data);
					_reset();
				}, function(res) {
				});
			};
			
			ctrl.update = function(name, value, index) {
				ctrl.new_customer_info[index].value = value;
			};
			
			function _reset() {				
				for (info of ctrl.new_customer_info) {
					info.value = null;
				}				
			};
		},
	template:
			'<form id="search-customer" class="input-form col-xs-6" data-ng-submit="$ctrl.save()">'
		+		'<h2>{{$ctrl.title}}</h2>'
		+ 		'<div class="col-xs-12 labeled-input-row" data-ng-repeat="info in $ctrl.new_customer_info">'
		+			'<sw-labeled-input label-for="{{info.id}}" input-value="info.value" span-width="6" input-label="{{info.label}}"'
		+				'input-type="text" item-index="$index" input-name="{{info.id}}" is-required="info.required" place-holder="{{info.label}}"'
		+				'font-size="20" on-update="$ctrl.update(name, value, index)"/>'
		+ 		'</div>'
		+		'<span class="col-xs-3" />'
		+		'<sw-button type="submit" button-class="btn-primary" span-width="9" font-size="20" button-name="Save" />'
		+	'</form>'
}