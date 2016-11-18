let editListComponentCtrl = function(utilsService) {
	let ctrl = this,
		currentIndex = -1;
				
	ctrl.$onInit = function() {
		if (!ctrl.prefPageSize)
			ctrl.prefPageSize = 10;
		
		ctrl.pageSize = ctrl.prefPageSize;
		ctrl.curPage = 0;
				
		ctrl.maxPageNum = getMaxPageNum(ctrl.list, ctrl.pageSize);
	}
				
	ctrl.$onChanges = function(changesObj) {
		let newMaxPageNum = getMaxPageNum(ctrl.list, ctrl.pageSize);
		
		if (newMaxPageNum !== ctrl.maxPageNum) {
			ctrl.maxPageNum = newMaxPageNum;
			ctrl.curPage = ctrl.maxPageNum;
		}
	}
				
	ctrl.changePageNum = function(curPage) {
		ctrl.curPage = curPage;
	}
			
	ctrl.update = function(name, value, index) {
		ctrl.onUpdate({name: name, value: value, index: getTrueIndex(index)});
	}
			
	ctrl.select = function(index) {
		let _index = getTrueIndex(index);
		if (currentIndex == _index)
			currentIndex = -1;
		else
			currentIndex = _index;
	
		ctrl.doClick({index: currentIndex});
	}
	
	function getMaxPageNum(array, pageSize) {
		if (angular.isDefined(array) && angular.isObject(array)) {
			let len = array.length,
				div = Math.floor(len / pageSize),
				rem = len % pageSize;
			if (rem > 0) div++;
			div--;
			return div;
		}
		return 0;
	}
	
	function getTrueIndex(index) {
		return (ctrl.pageSize * ctrl.curPage) + index;
	}
}