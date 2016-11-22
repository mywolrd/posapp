describe("Order Service Test Suite", function() {
	it("_OrderDetailAddonItemRequestBody_one", function() {
		let options = {item: {id: 1, price: {dollar:5, cent: 25}}, dollar: 5, cent: 25};
		
		let _testObj = new _OrderDetailAddonItemRequestBody(options);
		expect(_testObj.newPrice).toBe(undefined);
		
	});
});
