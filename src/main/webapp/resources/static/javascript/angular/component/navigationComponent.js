var navigationComponent = {
	controller: 
		function navigationCtrl(navigationService) {
			var ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.ready = false;
				if (!navigationService.getNavigation())
					navigationService.buildNavigation();

				ctrl.navigations = navigationService.getNavigation();
			}

			ctrl.$doCheck = function() {
				var isReady = navigationService.isReady();
				if (isReady)	ctrl.ready = isReady;
			}	
		},
	template:'<nav class="navbar navbar-inverse" role="navigation" data-ng-show="$ctrl.ready">'
		+		'<div class="navbar-header">'
		+ 			'<a class="navbar-brand" data-ui-sref="app">POS App</a>'
		+ 		'</div>'
		+ 		'<ul class="nav navbar-nav">'
		+ 			'<li class="dropdown" data-ng-repeat="navigation in $ctrl.navigations">'
		+ 				'<a class="dropdown-toggle" data-toggle="dropdown" href="">{{navigation.name}}'
		+ 					'<span class="caret"></span>'
		+ 				'</a>'
		+ 				'<ul class="dropdown-menu">'
		+ 					'<li data-ng-repeat="route in navigation.menu">'
		+ 						'<a ui-sref="{{route.link}}">{{route.name}}</a>'
		+ 					'</li>'
		+ 				'</ul>'
		+ 			'</li>'
		+ 		'</ul>' 
		+	'</nav>'
}