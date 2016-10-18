var prevNextButtonsComponent = {
	controller:
		function prevNextButtonsCtrl() {
			var ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.curPage = 0;
			}
			
			ctrl.prevPage = function() {
				if (0 !== ctrl.curPage) {
					ctrl.curPage--;
					ctrl.updateCurrentPage({curPage: ctrl.curPage})
				}
			}
			
			ctrl.nextPage = function() {
				if (ctrl.curPage !== ctrl.maxPage) {
					ctrl.curPage++;
					ctrl.updateCurrentPage({curPage: ctrl.curPage})
				}
			}
		},
	bindings: {
		updateCurrentPage: '&',
		maxPage: '<'
	},
	template:'<div class="col-xs-12" data-ng-show="$ctrl.maxPage > 0">'
		+		'<div class="col-xs-3"></div>'
		+		'<div class="col-xs-2 no-padding">'
		+			'<button type="button" class="btn btn-primary btn-block" data-ng-click="$ctrl.prevPage()"> < </button>'
		+		'</div>'
		+		'<div class="col-xs-2"></div>'
		+		'<div class="col-xs-2 no-padding">'
		+			'<button type="button" class="btn btn-primary btn-block" data-ng-click="$ctrl.nextPage()"> > </button>'
		+		'</div>'
		+		'<div class="col-xs-3"></div>'
		+	'</div>'
};