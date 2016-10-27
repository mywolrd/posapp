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
	template:
			'<div class="col-xs-12 pn-buttons-container" data-ng-show="$ctrl.maxPage > 0">'
		+		'<span class="col-xs-3"/>'
		+		'<sw-button  button-class="btn-primary" span-width="2" button-name="<" do-click="$ctrl.prevPage()"/>'
		+		'<span class="col-xs-2" />'
		+		'<sw-button  button-class="btn-primary" span-width="2" button-name=">" do-click="$ctrl.nextPage()"/>'
		+		'<span class="col-xs-3" />'
		+	'</div>'
};