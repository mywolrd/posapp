/**
 * Customer Service
 */
function customerService(APP_CONFIG, $http, urlService, stringService) {
	let current = null,
		previous = null;
	
	function _getSearchCustomerInputFields() {
		return angular.copy(APP_CONFIG.SEARCH_CUSTOMER_INPUT);
	}
	
	function _save(info, success, fail) {
		$http.post(urlService.customer + '/save', info).then(success, fail);
	}
	
	function _update(info, success, fail) {
		$http.post(urlService.customer + '/update', info).then(success, fail);
	}
	
	function _formatString(customer) {
		let displayValue = [];
		displayValue.push(customer.lastName);

		if (customer.firstName) {
			displayValue.push(customer.firstName);
		}

		if (customer.number) {
			displayValue.push(customer.number);
		}

		return displayValue;
	}
	
	function _search(querystr, success, fail) {
		if (querystr)
			$http.get(urlService.customer + '/search/'+ querystr.toLowerCase())
				.then(function (res) {
					let customers = res.data;
					customers.map(function(customer) {
						customer.name = customer.lastName + ', ' + customer.firstName; 
						customer.displayValue = _formatString(customer);
					});
					success(customers);
				}, fail);
	}
	
	function _setCurrentCustomer(customer) {
		if (customer) {
			previous = current;
			current = customer;
		}
	}
	
	function _getCurrentCustomer() {
		if (current)
			return current;
		return null;
	}
	
	function _clearCurrentCustomer() {
		if (current)
			previous = current;
		current = null;
	}
	
	function _subscribe(o) {
		return subject.subscribe(o);
	}
	
	return {
		getSearchCustomerInput: _getSearchCustomerInputFields,
		save: _save,
		update: _update,
		search: _search,
		setCurrentCustomer: _setCurrentCustomer,
		getCurrentCustomer: _getCurrentCustomer,
		clearCurrentCustomer: _clearCurrentCustomer,
		subscribe: _subscribe
	};
}
