/**
 * Customer Service
 */
function customerService(APP_CONFIG, $http, urlService, stringService) {
	var _data = {};
	return {
		getNewCustomerInput : function() {
			return angular.copy(APP_CONFIG.NEW_CUSTOMER_INPUT);
		},
		getSearchCustomerInput : function() {
			return angular.copy(APP_CONFIG.SEARCH_CUSTOMER_INPUT);
		},
		save : function(info, success, fail) {
			$http.post(urlService.customer + '/save', info).then(success, fail);
		},

		update : function(info, success, fail) {
			$http.post(urlService.customer + '/update', info).then(success,
					fail);
		},

		search : function(querystr, success, fail) {
			if (querystr)
				$http.get(
						urlService.customer + '/search/'
								+ querystr.toLowerCase()).then(success, fail);
		},

		setCurrentCustomer : function(customer) {
			if (customer) {
				_data.previous = _data.current;
				_data.current = customer;
			}
		},

		getCurrentCustomer : function() {
			if (_data.current)
				return _data.current;

			return null;
		},

		clearCurrentCustomer : function() {
			if (_data.current)
				_data.previous = _data.current;

			_data.current = null;
		}
	};
}
