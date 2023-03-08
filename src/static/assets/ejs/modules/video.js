const video = {

	$window: $(window),

	elem: {
		$play: $('.play-button')
	},

	init() {
		if (this.elem.$play.length > 0) {
			this.bindSelectors();
			this.bindUIActions();
		}
	},

	bindUIActions() {

		this.elem.$play.magnificPopup({
			type: 'iframe',
			closeMarkup: '<button type="button" class="mfp-close btn btn--small"><span class="show-for-sr">Close Modal</span><span class="btn__icon"><svg class="brei-icon brei-icon-close" focusable="false"><use xlink:href="#brei-icon-close"></use></svg></span></button>',
			iframe: {
				patterns: {
					vimeo: {
						index: 'vimeo.com/', 
						id: '/',
						src: 'https://player.vimeo.com/video/%id%?autoplay=1'
					},
					youtu: {
						index: 'youtu.be/',
						id: '/',
						src: '//www.youtube.com/embed/%id%?autoplay=1&modestrbranding=1&rel=0'						
					},
					youtube: {
						src: '//www.youtube.com/embed/%id%?autoplay=1&modestbranding=1&rel=0'
					}
				}
			}
		});

	},

	bindSelectors() {
		this.elem.$play = $('.play-button');
	}
};

export { video };
