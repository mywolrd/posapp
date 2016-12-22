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
			'<form id="input-form" class="input-form col-xs-12" data-ng-submit="$ctrl.submit()">'
		+		'<span class="col-xs-1" data-ng-if="$ctrl.title"/><h2 class="col-xs-11" data-ng-if="$ctrl.title">{{$ctrl.title}}</h2>'
		+		'<span data-ng-if="$ctrl.formInput" class="col-xs-12"/>'
		+ 		'<div data-ng-if="$ctrl.formInput" class="col-xs-12 labeled-input-row" data-ng-repeat="input in $ctrl.formInput">'
		+			'<sw-labeled-input label-for="{{input.id}}" input-value="input.value" span-width="6" input-label="{{input.label}}"'
		+				'input-type="text" item-index="$index" input-name="{{input.id}}" is-required="input.required" place-holder="{{input.label}}"'
		+				'font-size="20" on-update="$ctrl.update(name, value, index)" keyboard-config="input.keyboardConfig"/>'
		+ 		'</div>'
		+		'<span class="col-xs-3" />'
		+		'<sw-button type="submit" button-class="btn-primary" span-width="9" font-size="20" button-name="{{$ctrl.buttonName}}" />'
		+	'</form>'
};

let selectListComponent = {
	controller: 
		function(utilsService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				let totalWidth = 11;
				let singleSpanWidth = 2;
				if (ctrl.col)
					singleSpanWidth = Math.trunc(totalWidth/ctrl.col);
				
				ctrl.span_class = [];
				ctrl.span_class.push(utilsService.getCSScolxs() + singleSpanWidth);
			}
			
			ctrl.select = function(entry) {
				ctrl.doClick({selected: entry});
			}
	},
	bindings: {
		list: '<',
		col: '<',
		doClick: '&'
	},
	template:
			'<div class="col-xs-6">'
		+		'<div class="col-xs-12 cursor-pointer" data-ng-repeat="entry in $ctrl.list"'
		+			'data-ng-click="$ctrl.select(entry)">'
		+			'<span class="col-xs-1">{{$index + 1}}</span>'
		+			'<span data-ng-class="$ctrl.span_class" data-ng-repeat="out in entry.displayValue">{{out}}</span>'
		+		'</div>'
		+	'</div>'
};