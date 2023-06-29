export const takeover = {

	elem: {
		$takeover: $('#js-takeover').length > 0 ? $('#js-takeover') : null
	},

	init() {
		if (this.elem.$takeover === null) {
			return;
		}

		this.takeoverModTime = (takeoverModTime) ? String(takeoverModTime) : null;
		this.bindUIActions();
		this.displayAlert();
	},

	bindUIActions() {
		this.elem.$takeover.on('click', '.takeover__close', this.onClick.bind(this));
		
		$(document).on('keydown', this.onKeyDown.bind(this));
	},

	displayAlert() {

		// If there are no cookies set, show the modal
		// If the cookies are set but the takeover is more current, show the modal
		if (Cookies.get('takeover') !== undefined) {
			if (Cookies.get('takeover') === undefined || Cookies.get('takeoverModTime') === undefined) {
				Cookies.set('takeoverModTime', this.takeoverModTime, { Secure: false, HttpOnly: false });
				$('html, body').addClass('body--no-scroll');
				this.elem.$takeover.attr('aria-modal', 'true');

			} else if (Cookies.get('takeoverModTime') !== undefined && Cookies.get('takeoverModTime') !== this.takeoverModTime) {
				Cookies.remove('takeover');
				Cookies.remove('takeoverModTime');
				Cookies.set('takeoverModTime', this.takeoverModTime, { Secure: false, HttpOnly: false });
				$('html, body').addClass('body--no-scroll');
				this.elem.$takeover.attr('aria-modal', 'true');
			}
		} else {
			$('html, body').addClass('body--no-scroll');
			this.elem.$takeover.attr('aria-modal', 'true');
		}	
	},

	onClick(e) {
		e.preventDefault();
		Cookies.set('takeover', 'true', { expires: 1, Secure: false, HttpOnly: false });
		Cookies.set('takeoverModTime', this.takeoverModTime, { Secure: false, HttpOnly: false });
		$('html, body').removeClass('body--no-scroll');

		// Hide takeover
		this.elem.$takeover.attr('aria-modal', 'false');
	},

	onKeyDown(e) {
		if (e.keyCode === 27) { // ESC
			$('.takeover__close', this.elem.$takeover).trigger('click');
		}
	}

};
