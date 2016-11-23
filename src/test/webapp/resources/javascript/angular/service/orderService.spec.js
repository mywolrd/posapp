describe("_OrderDetailAddonItemRequestBody", function() {
	it("test_constructor_one", function() {
		let options = {item: {id: 1, price: {dollar:5, cent: 25}}, dollar: 5, cent: 25};
		
		let _testObj = new _OrderDetailAddonItemRequestBody(options);
		expect(_testObj.newPrice).toBe(undefined);
		expect(_testObj.addonItemId).toBe(1);
	});
	
	it("test_constructor_two", function() {
		let options = {item: {id: 1, price: {dollar:5, cent: 25}}, dollar: 6, cent: 25};
		
		let _testObj = new _OrderDetailAddonItemRequestBody(options);
		expect(_testObj.newPrice.dollar).toBe(6);
		expect(_testObj.newPrice.cent).toBe(25);
	});
	
	it("equals_true_one", function() {
		let options_one = {item: {id: 1, price: {dollar:5, cent: 25}}, dollar: 5, cent: 25};
		let options_two = {item: {id: 1, price: {dollar:5, cent: 25}}, dollar: 5, cent: 25};
		
		let _testObj_one = new _OrderDetailAddonItemRequestBody(options_one);
		let _testObj_two = new _OrderDetailAddonItemRequestBody(options_two);
		expect(_testObj_one.equals(_testObj_two)).toBe(true);
	});
	
	it("equals_true_two", function() {
		let options_one = {item: {id: 1, price: {dollar:5, cent: 25}}, dollar: 6, cent: 25};
		let options_two = {item: {id: 1, price: {dollar:5, cent: 25}}, dollar: 6, cent: 25};
		
		let _testObj_one = new _OrderDetailAddonItemRequestBody(options_one);
		let _testObj_two = new _OrderDetailAddonItemRequestBody(options_two);
		expect(_testObj_one.equals(_testObj_two)).toBe(true);
	});
	
	it("equals_false", function() {
		let options_one = {item: {id: 1, price: {dollar:5, cent: 25}}, dollar: 5, cent: 25};
		let options_two = {item: {id: 1, price: {dollar:5, cent: 25}}, dollar: 6, cent: 25};
		
		let _testObj_one = new _OrderDetailAddonItemRequestBody(options_one);
		let _testObj_two = new _OrderDetailAddonItemRequestBody(options_two);
		expect(_testObj_one.equals(_testObj_two)).toBe(false);
	});
});

describe("_OrderDetailRequestBody", function() {
	it("test_constructor_one", function() {
		let options = {item: {id: 1, price: {dollar:5, cent: 25}}, quantity: 2, dollar: 5, cent: 25};
		
		let _testObj = new _OrderDetailRequestBody(options);
		expect(_testObj.newPrice).toBe(undefined);
		expect(_testObj.itemId).toBe(1);
		expect(_testObj.quantity).toBe(2);
	});
	
	it("test_constructor_two", function() {
		let orderDetail_options = {item: {id: 1, price: {dollar:5, cent: 25}}, dollar: 6, cent: 25};
		
		let orderDetailAddonItem_options_one = {item: {id: 1, price: {dollar:5, cent: 25}}, dollar: 5, cent: 25};	
		let orderDetailAddonItem = new _OrderDetailAddonItemRequestBody(orderDetailAddonItem_options_one);
	
		let _testObj = new _OrderDetailRequestBody(orderDetail_options, [orderDetailAddonItem]);
		expect(_testObj.newPrice.dollar).toBe(6);
		expect(_testObj.newPrice.cent).toBe(25);
		expect(_testObj.orderDetailAddonItems.length).toBe(1);
	});
	
	it("test_constructor_three_addonItems_not_Array", function() {
		let orderDetail_options = {item: {id: 1, price: {dollar:5, cent: 25}}, dollar: 6, cent: 25};
		
		let orderDetailAddonItem_options_one = {item: {id: 1, price: {dollar:5, cent: 25}}, dollar: 5, cent: 25};	
		let orderDetailAddonItem = new _OrderDetailAddonItemRequestBody(orderDetailAddonItem_options_one);
	
		let _testObj = new _OrderDetailRequestBody(orderDetail_options, orderDetailAddonItem);
		expect(_testObj.newPrice.dollar).toBe(6);
		expect(_testObj.newPrice.cent).toBe(25);
		expect(_testObj.orderDetailAddonItems).toBe(undefined);
	});
	
	it("equals_true_one_diffrent_quantity", function() {
		let options_one = {item: {id: 1, price: {dollar:5, cent: 25}}, quantity: 5, dollar: 5, cent: 25};
		let options_two = {item: {id: 1, price: {dollar:5, cent: 25}}, quantity: 1, dollar: 5, cent: 25};
		
		let _testObj_one = new _OrderDetailRequestBody(options_one);
		let _testObj_two = new _OrderDetailRequestBody(options_two);
		expect(_testObj_one.equals(_testObj_two)).toBe(true);
	});
	
	it("equals_true_two_same_quantity", function() {
		let options_one = {item: {id: 1, price: {dollar:5, cent: 25}}, quantity: 1, dollar: 6, cent: 25};
		let options_two = {item: {id: 1, price: {dollar:5, cent: 25}}, quantity: 1, dollar: 6, cent: 25};
		
		let _testObj_one = new _OrderDetailRequestBody(options_one);
		let _testObj_two = new _OrderDetailRequestBody(options_two);
		expect(_testObj_one.equals(_testObj_two)).toBe(true);
	});
	
	it("equals_false_one_has_addonItem", function() {
		let options_one = {item: {id: 1, price: {dollar:5, cent: 25}}, quantity:1, dollar: 5, cent: 25};
		let options_two = {item: {id: 1, price: {dollar:5, cent: 25}}, quantity:1, dollar: 5, cent: 25};
		
		let orderDetailAddonItem_options_one = {item: {id: 1, price: {dollar:5, cent: 25}}, dollar: 5, cent: 25};	
		let orderDetailAddonItem = new _OrderDetailAddonItemRequestBody(orderDetailAddonItem_options_one);

		let _testObj_one = new _OrderDetailRequestBody(options_one, [orderDetailAddonItem]);
		let _testObj_two = new _OrderDetailRequestBody(options_two);
		expect(_testObj_one.equals(_testObj_two)).toBe(false);
	});
});