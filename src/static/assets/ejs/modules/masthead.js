const masthead = {

	$window: $(window),

	elem: {
		$btn: $('.masthead__btn'),
		$image: $('.masthead__image'),
		$video: $('.masthead__video')
	},

	init() {
		if (this.elem.$btn.length > 0) {
			this.bindUIActions();
		}

		if (this.elem.$image.length > 0) {
			this.elem.$image.eq(Math.floor(Math.random() * this.elem.$image.length)).addClass('masthead__image--shown');
		}
	},

	bindUIActions() {
		this.elem.$btn.on('click', this.btnVideo.bind(this));
	},

	btnVideo() {
		this.elem.$btn.attr({
			'aria-label': function (i, txt) {
				return (txt.indexOf('Play') > -1) ? txt.replace('Play', 'Pause') : txt.replace('Pause', 'Play');
			},
			'aria-pressed': function (i, txt) {
				return (txt === 'false') ? 'true' : 'false';
			}
		});
		this.elem.$btn.find('.show-for-sr').html(this.elem.$btn.attr('aria-label'));
		
		this.elem.$btn.toggleClass('masthead__btn--is-playing');

		if (this.elem.$btn.hasClass('masthead__btn--is-playing')) {
			this.elem.$video.each(function() {
				this.play();
			});
		} else {
			this.elem.$video.each(function() {
				this.pause();
			});
		}
	}

};

export { masthead };
