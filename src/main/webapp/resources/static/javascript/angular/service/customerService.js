/**
 * Customer Service
 */
function customerService(APP_CONFIG, $http, urlService, stringService, rx) {
	let current,
		previous,
		subject = new rx.Subject();

	function _getSearchCustomerInputFields() {
		return angular.copy(APP_CONFIG.SEARCH_CUSTOMER_INPUT);
	}
	
	function _save(info, success, fail) {
		$http.post(urlService.customer + '/save', info).then(success, fail);
	}
	
	function _update(info, success, fail) {
		$http.post(urlService.customer + '/update', info).then(success, fail);
	}
	
	function _search(querystr, success, fail) {
		if (querystr)
			$http.get(urlService.customer + '/search/'+ querystr.toLowerCase()).then(success, fail);
	}
	
	function _setCurrentCustomer(customer) {
		if (customer) {
			previous = current;
			current = customer;
			subject.onNext(current);
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
