var app = angular.module('posapp', ['angular-virtual-keyboard', 'ui.router']);
app.config(['VKI_CONFIG', function(VKI_CONFIG) {
	VKI_CONFIG.layout['POS Keyboard'] = {
			'name': "POS Application Keyboard", 
			'keys': [
			         [["0"],["1"],["2"],["3"],["4"],["5"],["6"],["7"],["8"], ["9"]],
			         [["A"],["B"],["C"],["D"],["E"],["F"],["G"],["H"],["I"], ["J"]],
			         [["K"],["L"],["M"],["N"],["O"],["P"],["Q"],["R"],["S"], ["T"]],
			         [["U"],["V"],["W"],["X"],["Y"],["Z"],["",""],["",""],["",""],["",""]],
			         [[" ", " "],["Bksp", "Bksp"],["Enter", "Enter"]]
			         ], 
			'lang': ["en-US"] };
}]);

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode({enabled:true,   requireBase: false});
    
    $urlRouterProvider.otherwise('/app');
    
    $stateProvider        
        .state('app', {
            url: '/app',
        })
        .state('app.newCustomer', {
            // we'll get to this in a bit       
        });
        
}]);

app.factory('urlService', function() {
	
	var service = {};
	var protocol = location.protocol;
	var host = location.host;
	var root = 'app';
	var base = protocol + '//' + host + '/' + root;
	
	service.main = base + '/main';
	service.menu = base + '/menu';
	service.order = base + '/order';
	service.customer = base + '/customer';
	
	return service;
});

app.factory('menuService', ['$http', 'urlService', function($http, urlService) {
	
	var _data = {};
	
	return {
		menuItems: _data,
		ajaxListMenuItem: function(success, fail) {
			$http.get(urlService.menu + '/list').then(success, fail);
		},
		setMenuItems: function(menuItems) {
			_data['menu'] = menuItems;
		},
		getMenuItems: function() {
			return _data['menu'];
		}
	}
}]);

app.factory('customerService', function() {
	var _data = {};
	return {
		saveOrUpdate: function() {
			
		},
		search: function() {
			
		},
		carryOverToNewCustomer() {
			
		},
	};
});

app.component('keyboardInput', {
	templateUrl: 'keyboardInputComponent.html',
	bindings: {
		inputObjs: '<'
	}
});

app.component('newCustomer', {
	controller : function($scope, $attrs, customerService) {
		this.inputObjs = [	{'label': 'Last Name', 'value': ''},
                     		{'label': 'First Name', 'value': ''},
                     		{'label': 'Phone Number', 'value': ''}
                     	];
	},
	templateUrl: 'newCustomer.html' 	
});

app.run(function($templateCache) {
	$templateCache.put('keyboardInputComponent.html', 
				'<div class="row form-horizontal" data-ng-repeat="inputObj in $ctrl.inputObjs">'
			+		'<div class="form-group form-group-lg">'
			+			'<label class="col-xs-4 control-label" for="formGroupInputLarge{{$index}}">{{inputObj.label}}</label>'
			+			'<div class="col-xs-8">'
			+				'<input class="form-control" data-ng-virtual-keyboard="{kt:' + "'POS Keyboard'" + ', relative: false, size: 5}" type="text" data-ng-model="inputObj.value" id="formGroupInputLarge{{$index}}" placeholder="{{inputObj.label}}">'
			+			'</div>'
			+		'</div>'
			+	'</div>'
	);
	$templateCache.put('newCustomer.html',
				'<div id="newCustomer">'
			+		'<div class="col-xs-1"></div>'
			+		'<div class="col-xs-4">'
			+		'<h1>New Customer</h1><br/>'
			+			'<keyboard-input input-objs="$ctrl.inputObjs"></keyboard-input>'
			+		'</div>'
			+		'<div class="col-xs-6">'
			+		'</div>'
			+		'<div class="col-xs-1"></div>'
			+	'</div>'
	);
	
});

app.controller('mainController', ['$scope', 'menuService', function($scope, menuService) {
	menuService.ajaxListMenuItem(
		function (res) {
			menuService.setMenuItems(res.data);
		}, function (res) {		
	});
}]);

