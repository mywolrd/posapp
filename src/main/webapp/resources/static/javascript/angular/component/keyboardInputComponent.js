var keyboardInputComponent = {
	bindings : {
		inputObjs : '<'
	},
	template:'<div class="row form-horizontal" data-ng-repeat="inputObj in $ctrl.inputObjs">'
		+ 		'<div class="form-group form-group-lg">'
		+ 			'<label class="col-xs-4 control-label" for="formGroupInputLarge{{$index}}">{{inputObj.label}}</label>'
		+ 			'<div class="col-xs-8">'
		+ 				'<input class="form-control" ng-required="inputObj.required" data-ng-virtual-keyboard="{kt:' + "'POS_Keyboard'" + ', relative: false, size: 5}" type="text" data-ng-model="inputObj.value" id="formGroupInputLarge{{$index}}" placeholder="{{inputObj.placeholder}}">'
		+ 			'</div>' 
		+ 		'</div>'
		+ 	'</div>'
}