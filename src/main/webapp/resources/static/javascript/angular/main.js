// Polyfill
String.prototype.repeat = String.prototype.repeat || function(n){ 
    return n<=1 ? this : (this + this.repeat(n-1)); 
}

function messageService(APP_CONFIG) {
	let _data = {};
	
	return {
		setMessage: function(message) {
			_data.message = message;
		},
		getMessage: function() {
			if (!angular.isDefined(_data.message))
				return null;
			
			return _data.message;
		},
		clearMessage: function() {
			_data.message = null;
		}
	};
}

let app = 
	angular.module('posapp', ['ui.router', 'ui.bootstrap', 'angular-virtual-keyboard', 'angular-loading-bar', 'rx'])
		.constant('APP_CONFIG', {
			NAVIGATION: [{
			              	name: "POS App"
			              }, 
			              {
			            	name: "Order",
							menu: [{
										name: "New",
										link: "neworder"
									}, 
									{
										name: "PickUp",
										link: "pickuporder"
									}],
									customer : false
			              }, 
			              {
			            	  name: "Customer",
			            	  menu:	[{
										name: "New",
										link: "newcustomer"
									}, 
									{
										name: "Search",
										link: "searchcustomer"
									}],
									customer : true
			              },
			              {
			            	  name: "Manage",
			            	  menu:	[{
										name: "Menu",
										link: "managemenu"
									}],
									customer : false
			              },
			              ],
			
		    NEW_CUSTOMER_INPUT:	[{
									'label' : 'Last Name',
									'placeholder' : 'Last Name',
									'value' : null,
									required : true
								}, 
								{
									'label' : 'First Name',
									'placeholder' : 'First Name',
									'value' : null,
									required : false
								}, 
								{
									'label' : 'Phone Number',
									'placeholder' : 'Phone Number',
									'value' : null,
									required : false
								}],
			
			SEARCH_CUSTOMER_INPUT : [ {
				label : 'Customer',
				placeholder : 'Last Name',
				value : null,
				required : true
			} ],
			// true : requires a customer to complete an order
			// false: does not
			CUSTOMER_MODE : true,
			ENABLE_ONSCREEN_KEYBOARD : false, 
			// manage menu configs
			MANAGE_MENU_DEFAULT_NUMBER_OF_TYPES : 10,
			MANAGE_MENU_DEFAULT_NUMBER_OF_ITEMS : 10,
			
			// menu configs
			SHOW_ADD_ON_ITEMS : true,
			NUMBER_OF_ADDON_ITEM_BUTTONS : 4,
			NUMBER_OF_BUTTONS_PER_ROW : 4,
			
			IS_PRICE_LOCKED: true,
			
			// false : requires a ready date/time to complete an order
			// true : does not
			FIRST_COME_FIRST_SERVE : false,

			// true : pick a date from the order menu
			// false: today's date
			READY_DATE : true
		})
		.config(
				[
						'VKI_CONFIG',
						function(VKI_CONFIG) {
							VKI_CONFIG.layout['POS_Keyboard'] = {
								'name' : "POS Application Keyboard",
								'keys' : [
										[ [ "0" ], [ "1" ], [ "2" ], [ "3" ], [ "4" ], [ "5" ], [ "6" ], [ "7" ], [ "8" ], [ "9" ] ],
										[ [ "A" ], [ "B" ], [ "C" ], [ "D" ], [ "E" ], [ "F" ], [ "G" ], [ "H" ], [ "I" ], [ "J" ] ],
										[ [ "K" ], [ "L" ], [ "M" ], [ "N" ], [ "O" ], [ "P" ], [ "Q" ], [ "R" ], [ "S" ], [ "T" ] ],
										[ [ "U" ], [ "V" ], [ "W" ], [ "X" ], [ "Y" ], [ "Z" ], [ "", "" ], [ "", "" ], [ "", "" ], [ "", "" ] ],
										[ [ " ", " " ], [ "Bksp", "Bksp" ], [ "Enter", "Enter" ] ] ],
								'lang' : [ "en-US" ]
							};
							
							VKI_CONFIG.layout['Number_Pad'] = {
								'name' : 'Number Only Pad',
								'keys' : [
								          	[ [ "0" ], [ "1" ], [ "2" ], [ "3" ], [ "4" ] ],
								          	[ [ "5" ], [ "6" ], [ "7" ], [ "8" ], [ "9" ] ],
								          	[ [ " ", " " ], [ "Bksp", "Bksp" ], [ "Enter", "Enter" ] ] 
								          ],
								 'lang': ["en-US"]
							};
						} ])
		.config(
				[
						'$locationProvider',
						'$stateProvider',
						'$urlRouterProvider',
						function($locationProvider, $stateProvider,
								$urlRouterProvider) {
							$locationProvider.html5Mode({
								enabled : true,
								requireBase : false
							});
							$urlRouterProvider.otherwise('/app');
							$stateProvider.state('app', {
								url : '/app',
								template : "Home Page"
							}).state('newcustomer', {
								url : '/app/newcustomer',
								template : '<newcustomer></newcustomer>'
							}).state('searchcustomer', {
								url : '/app/searchcustomer',
								template : '<customersearch></customersearch>'
							}).state('neworder', {
								url : '/app/neworder',
								template : '<neworder></neworder>'
							}).state('pickuporder', {
								url : '/app/pickuporder',
								tempate : '<h2>Pick Up Order</h2>'
							}).state('managemenu', {
								url: '/app/manage_menu',
								template: '<managemenu></managemenu>'
							})
						} ])
						
		.provider('spinnerModal', spinnerModalProvider)
		.factory('stringService', stringService)
		.factory('urlService', urlService)
		.factory('orderService', [ 'APP_CONFIG', '$http', 'urlService', orderService ])
		.factory('cartService', [ 'APP_CONFIG', 'orderService', 'rx', cartService ])
		.factory('customerService', [ 'APP_CONFIG', '$http', 'urlService', 'stringService', customerService ])
		.factory('navigationService', [ 'APP_CONFIG', '$state', navigationService ])
		.factory('itemService', [ 'APP_CONFIG', '$http', 'urlService', itemService])
		.factory('menuService', ['APP_CONFIG', '$q', 'navigationService', 'itemService', menuService])
		.factory('utilsService', utilsService)
		.factory('keyboardService', ['APP_CONFIG', keyboardService])
		.component('navigation', navigationComponent)
		.component('newcustomer', newCustomerComponent)
		.component('customersearch', searchCustomerComponent)
		.component('menu', menuComponent)
		.component('addonitems', addonItemsComponent)
		.component('cart', cartComponent)
		.component('neworder', newOrderComponent)
		.component('managemenu', manageMenuComponent)
		.component('manageitemtype', manageItemTypeComponent)
		.component('manageitem', manageItemComponent)
		.component('pnButtons', prevNextButtonsComponent)
		.component('swInput', spanWrappedInputComponent)
		.component('swButton', spanWrappedButtonComponent)
		.component('spinner', spinnerModalComponent)
		.component('itemtype', editItemTypeComponent)
		.component('itemTypeList', itemTypeListComponent)
		.component('item', editItemComponent)
		.component('itemList', itemListComponent)
		.component('cartItem', cartItemComponent)
		.component('cartItemList', cartItemListComponent)
		.component('swLabeledInput', spanWrappedLabeledInputComponent)
		.component('pForm', formComponent)
		.component('selectList', selectListComponent)
		.component('manageaddon', manageAddonItemComponent)
.run(['$templateCache', 'menuService', function($templateCache, menuService) {
	menuService.initMenu();
}]);
