let formComponent = {
	controller:
		function() {
			let ctrl = this;
			
			ctrl.update = function(name, value, index) {
				ctrl.onUpdate({name: name, value: value, index: index});
			};
		
	},
	bindings: {
		formInput: '<',
		title: '@',
		buttonName: '@',
		submit: '&',
		onUpdate: '&'
	},
	template:
			'<form id="search-customer" class="input-form col-xs-6" data-ng-submit="$ctrl.submit()">'
		+		'<span class="col-xs-1" /><h2 class="col-xs-6">{{$ctrl.title}}</h2>'
		+		'<span class="col-xs-12"/>'
		+ 		'<div class="col-xs-12 labeled-input-row" data-ng-repeat="input in $ctrl.formInput">'
		+			'<sw-labeled-input label-for="{{input.id}}" input-value="input.value" span-width="6" input-label="{{input.label}}"'
		+				'input-type="text" item-index="$index" input-name="{{input.id}}" is-required="input.required" place-holder="{{input.label}}"'
		+				'font-size="20" on-update="$ctrl.update(name, value, index)"/>'
		+ 		'</div>'
		+		'<span class="col-xs-3" />'
		+		'<sw-button type="submit" button-class="btn-primary" span-width="9" font-size="20" button-name="{{$ctrl.buttonName}}" />'
		+	'</form>'
};

let selectListComponent = {
	controller: 
		function() {
		
	},
	bindings: {
		list: '<',
		doClick: '&'
	},
	template:
			'<div class="col-xs-6">'
		+		'<div class="col-xs-12 cursor-pointer" data-ng-repeat="entry in $ctrl.list"'
		+			'data-ng-click="$ctrl.doClick(entry)">'
		+			'<span> </span>'
		+			'<span> </span>'
		+			'<span> </span>'
		+		'</div>'
		+	'</div>'
};