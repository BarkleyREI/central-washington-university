/**
 * Table component.
 * @module components/table
 */

const table = {

	$window: $(window),

	elem: {
		$table: $('.table')
	},

	init() {
		if ( this.elem.$table.length > 0) {
			$(window).on('resize', this.overscroll.bind(this));
			this.overscroll();
		}
	},

	overscroll() {
		this.elem.$table.each(function() {
			$(this).removeClass('table--overscroll');
			if($(this).find('table').width() > $(this).width()) {
				$(this).addClass('table--overscroll');
			}
		});
	}

};

export { table };
