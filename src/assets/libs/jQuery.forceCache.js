// var AjaxForceCache = function(){
	$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
	//从ajax配置中获取forceCache
	var forceCache = originalOptions.forceCache;
	//启用了forceCache，才存储数据
	if (forceCache) {
		//寻找数据
		var keyArr = {
			url:originalOptions.url,
			data:originalOptions.data,
			type:originalOptions.type
		}
		var key = JSON.stringify(keyArr);

		//判断是否有缓存
		if (typeof(window._ajaxForceCache) !== 'object') {
			window._ajaxForceCache = {}
		}

		//尝试从缓存读取value值
		var value = window._ajaxForceCache[key];

		//value不存在，且成功请求，存储数据
		if (!value) {
			options.success = function(data) {
				window._ajaxForceCache[key] = JSON.stringify(data);
				console.warn('存储：Ajax请求结果已缓存！因为forceCache被开启');
			}
		}
	}
});

$.ajaxTransport('+*', function(options, originalOptions, jqXHR) {
	//从ajax配置中获取forceCache
	var forceCache = originalOptions.forceCache;

	//获取Value
	var keyArr = {
		url:originalOptions.url,
		data:originalOptions.data,
		type:originalOptions.type
	}
	var key = JSON.stringify(keyArr);

	//判断是否有缓存
	if (typeof(window._ajaxForceCache) !== 'object') {
		window._ajaxForceCache = {}
	}
	
	//尝试从缓存读取value值
	var value = window._ajaxForceCache[key];

	//存在value且启用了缓存，返回缓存的值
	if (value && forceCache == true) {
		console.warn('数据来自缓存：因为forceCache被开启，本次Ajax请求数据来自缓存！');
		return {
			send: function(headers, completeCallback) {
				var response = {};
				response['json'] = JSON.parse(value);
				completeCallback(200, 'success', response, '');
			},
			abort: function() {
				console.info('Ajax缓存请求数据被终止！');
			}
		}
	}
});
console.warn('Ajax forceCache已引入！');
/*}

export default AjaxForceCache;*/
