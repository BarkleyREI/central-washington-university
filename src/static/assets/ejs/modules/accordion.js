/**
 * Accordions component.
 * @module components/accordions
 */
import { Accordion } from 'foundation-sites';

const accordion = {

	elem: {
		$accordion: $('.accordion'),
		$asides: $('.aside__accordion'),		
		$emergency: $('.emergency'),
		$filters: $('.filter__accordion'),
		$navigation: $('.nav-primary__list')
	},

	mql: {
		large: window.matchMedia('(min-width: 1024px)')
	},	

	accordion: null,

	init() {		
		// const _this = this;

		if (this.elem.$accordion.length > 0) {

			this.elem.$accordion.each(function() {
				this.accordion = new Accordion($(this));
			});

			this.elem.$accordion
				.find('[data-accordion-item]:not(.is-active) .user-markup').css('opacity', 0)
				.end()
				.on('down.zf.accordion', function (e, $content) {

					$content.find('.nav-primary__children, .user-markup').animate({
						'opacity': 1
					}, 125);

				})
				.on('up.zf.accordion', function (e, $content) {
					
					$content.find('.nav-primary__children, .user-markup').animate({
						'opacity': 0
					}, 125);

				});

			if (!Foundation.MediaQuery.atLeast('large')) {

				this.elem.$accordion.foundation('up', $('.is-active'));

				$('.accordion-item.is-active .accordion-content').each(function () {

					let $p = $(this).parents('.accordion');

					$p.foundation('up', $(this));

				});

			}

			// Close navigation on click outside navigation and ESC
			$(document).on('click keydown', function(e) {
				if(e.type === 'click') {
					if(!$(e.target).closest('#primary-navigation').length) {
						accordion.elem.$navigation.foundation('up', $($('.nav-primary__item.is-active .accordion-title').eq(0).attr('href')));
					}
				} else if (e.keyCode === 27) {
					accordion.elem.$navigation.foundation('up', $($('.nav-primary__item.is-active .accordion-title').eq(0).attr('href')));
				}
			});
			
		}

		if (this.elem.$asides.length > 0) {
			if (this.mql.large.matches) {			
				this.elem.$asides.foundation('down', $(this.elem.$asides.find('.aside__heading').eq(0).attr('href')));
			}
		}

 		if (this.elem.$filters.length > 0) {
			if (this.mql.large.matches) {
				this.elem.$filters.foundation('down', $(this.elem.$filters.find('.filter__heading').eq(0).attr('href')));
			}
		}

		if (this.elem.$emergency.length > 0) {
			this.emergencyModTime = (emergencyModTime) ? String(emergencyModTime) : null;
			if (Cookies.get('cookie') !== undefined) {			
				if (Cookies.get('emergencyModTime') === undefined) {
					Cookies.set('emergencyModTime', this.emergencyModTime, { expires: 365, Secure: true, HttpOnly: true });
					this.elem.$emergency.foundation('down', $('#emergency'));
				} else if (Cookies.get('emergencyModTime') !== undefined && Cookies.get('emergencyModTime') !== this.emergencyModTime) {
					Cookies.set('emergencyModTime', this.emergencyModTime, { expires: 365, Secure: true, HttpOnly: true });
					this.elem.$emergency.foundation('down', $('#emergency'));
				}
			} else {
				this.elem.$emergency.foundation('down', $('#emergency'));
			}
		};
		
	}

};

export { accordion };

// to use:
//
// import accordion from './modules/accordion';
//
// accordion.init();
