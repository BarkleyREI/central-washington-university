const header = {

	elem: {
		$primary: $('.header__lower'),
		$header: $('.header__navigation'),
		$primaryToggle: $('.header__toggle')
	},

	mql: {
		large: window.matchMedia('(min-width: 1024px)')
	},

	init() {

		this.elem.$primaryToggle.on('click', function(e) {
			e.preventDefault();
			$(e.target).attr({
				'aria-pressed': function (i, txt) {
					return (txt === 'false') ? 'true' : 'false';
				},
				'aria-label': function (i, txt) {
					return (txt === 'Open primary navigation') ? txt.replace('Open', 'Close') : txt.replace('Close', 'Open');
				}
			});
			$(e.target).find('.show-for-sr').html($(e.target).attr('aria-label'));
			$('html, body').toggleClass('body--no-scroll');	
		});

		$(window).on('resize', this.reset.bind(this));
	},

	reset() {
		if(header.mql.large.matches) {
			$('html, body').removeClass('body--no-scroll');						
			header.elem.$header.removeAttr('style');
			header.elem.$primaryToggle.attr({
				'aria-pressed': 'false',
				'aria-label': 'Open primary navigation'
			});
			header.elem.$primaryToggle.find('.show-for-sr').html(header.elem.$primaryToggle.attr('aria-label'));
		}
	}

};

export { header };
