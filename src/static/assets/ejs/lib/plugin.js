/**
 * Generate a jQuery plugin
 * @name plugin
 * @param pluginName [string] Plugin name
 * @param className [object] Class of the plugin
 * @param shortHand [bool] Generate a shorthand as $.pluginName
 */
const plugin = function plugin(pluginName, className, shortHand = false) {
	let dataName = `__${pluginName}`;
	let old = $.fn[pluginName];

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			let $this = $(this);
			let data = $this.data(dataName);

			if (!data) {
				$this.data(dataName, (data = new className(this, options)));
			}

			if (typeof options === 'string') {
				data[options]();
			}
		});
	};

	// - Short hand
	if (shortHand) {
		$[pluginName] = (options) => $({})[pluginName](options);
	}

	// - No conflict
	$.fn[pluginName].noConflict = () => $.fn[pluginName] = old;
}

export { plugin };