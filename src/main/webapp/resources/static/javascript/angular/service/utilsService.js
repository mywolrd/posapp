function utilsService() {
	
	return {
		getMaxPageNum: function(array, pageSize) {
			if (angular.isDefined(array) && angular.isObject(array)) {
				var len = array.length;
				var div = Math.floor(len / pageSize);
				var rem = len % pageSize;
				if (rem > 0) div++;
				div--;
				return div;
			}
			return 0;
		}
	};
}