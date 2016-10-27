function spinnerModalProvider() {
	this.$get = ['$injector', '$timeout', function($injector, $timeout) {
		let completeTimeout,
	        started = false;
		let modalInstance = null;
		let $uibModal;
		
		function _start() {
	        $timeout.cancel(completeTimeout);

	        if (started) {
	          return;
	        }

	        started = true;

	        $uibModal = $uibModal || $injector.get('$uibModal');
	        
	        modalInstance = $uibModal.open({
	            animation: false,
	            backdrop: 'static',
	            component: 'spinner'
	        });
		}

	    function _complete() {
	        $timeout.cancel(completeTimeout);

	        started = false;
	        
	        if (modalInstance)
	        	modalInstance.close(null);
	        
	        modalInstance = null;
	    }

	    return {
	        start            : _start,
	        complete         : _complete
	    };
	}];
}