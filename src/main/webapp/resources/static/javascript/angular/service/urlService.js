/**
 * Url Service
 */
function urlService() {
	var protocol = location.protocol;
	var host = location.host;
	var root = 'app';
	var base = protocol + '//' + host + '/' + root;

	return {
		main : base + '/main',
		item : base + '/item',
		order : base + '/order',
		customer : base + '/customer',
	}
}
