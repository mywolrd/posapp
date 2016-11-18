let prevNextButtonsComponent = {
	controller:
		function prevNextButtonsCtrl() {
			let ctrl = this;
			
			ctrl.prevPage = function() {
				if (0 !== ctrl.curPage) {
					ctrl.updateCurrentPage({curPage: ctrl.curPage - 1})
				}
			}
			
			ctrl.nextPage = function() {
				if (ctrl.curPage !== ctrl.maxPage) {
					ctrl.updateCurrentPage({curPage: ctrl.curPage + 1})
				}
			}
		},
	bindings: {
		updateCurrentPage: '&',
		maxPage: '<',
		curPage: '<'
	},
	template:
			'<div class="col-xs-12 pn-buttons-container" data-ng-show="$ctrl.maxPage > 0">'
		+		'<span class="col-xs-3"/>'
		+		'<sw-button  button-class="btn-primary" span-width="2" button-name="<" do-click="$ctrl.prevPage()"/>'
		+		'<span class="col-xs-2" />'
		+		'<sw-button  button-class="btn-primary" span-width="2" button-name=">" do-click="$ctrl.nextPage()"/>'
		+		'<span class="col-xs-3" />'
		+	'</div>'
};