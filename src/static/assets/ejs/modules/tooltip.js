import { getRandomNumber, mql, speechBubble } from 'brei-project-utils';
import { debounce } from '../lib/debounce';

class Tooltip {
	constructor(element, options) {
		this.defaults = { // Defaults
			offset: 0, // Vertical offset
			type: 'button',
			// Callback(s)
			before() {},
			after() {}
		};
		this.element = element;
		this.options = $.extend({}, this.defaults, options);

		this.init();
	}

	init () {
		this.bindUIActions();
	}

	bindUIActions() {
		$(this.element).off('click.element');
		$(this.element).on('click.element', this.toggle.bind(this));

		$(this.element).off('mouseleave.element');
		$(this.element).on('mouseleave.element', (e) => $(e.target).blur());

		$(window).off('resize.window_tooltip');
		$(window).on('resize.window_tooltip', debounce(this.onResize.bind(this), 100));

		$(document).off('click.document_tooltip');
		$(document).on('click.document_tooltip', this.closeAllSpeechBubbles.bind(this));

		$(document).off('click.tooltip_close');
		$(document).on('click.tooltip_close', '.close-button', this.closeSpeechBubble.bind(this));
	}

	onResize() {
		let $speechbubble = $(this.element).siblings('.speech-bubble');

		if ($speechbubble && $speechbubble.length) {
			let isVisible = $speechbubble.hasClass('speech-bubble--is-visible');

			if ($(this.element).hasClass('text-tooltip text-tooltip--is-active')) {
				$(this.element).removeClass('text-tooltip--is-active');
			}

			$speechbubble.remove();

			if (isVisible) {
				$(this.element).trigger('click');
			}
		}
	}

	toggle(e, closeAll = true) {
		e.preventDefault();

		const $target = $(e.target);
		const hasSpeechBubble = $target.siblings('.speech-bubble').length;

		if (closeAll) {
			this.closeAllSpeechBubbles(null);
		}

		// Callback:before
		this.options.before.call(this, this.element);

		if (hasSpeechBubble) {
			$target.siblings('.speech-bubble').toggleClass('speech-bubble--is-visible');
			$target.toggleClass('tooltip--is-active');
		} else {
			const title = $target.data('tooltip-content');
			const id = 'speech-bubble' + getRandomNumber();
			const speechbubble = speechBubble('', id, title);

			$target.attr('aria-describedby', id);
			$target.attr('aria-labelledby', id);

			$(speechbubble).insertAfter($target);

			// Wait till the speech-bubble is created and inserted into the DOM then determine` its x and y coordinates and "show" it - sstacho
			let timer = setInterval(() => {
				let $speechbubble = $('.speech-bubble[id="' + id + '"]');

				if ($speechbubble.length) {
					let $form = $target.closest('.form');

					// Mobile/Desktop offset(s) for type (button, text)
					if (mql.medium.matches) {
						if (this.options.type === 'button') {
							this.options.offset = 9;
						} else {
							this.options.offset = 10;
						}
					} else {
						if (this.options.type === 'button') {
							this.options.offset = 9;
						} else {
							this.options.offset = 0;
						}
					}

					let x = this.calculateX($target, $speechbubble);
					let y = this.calculateY($target);

					// Form tooltip styling only!
					if (mql.medium.matches) {
						if ($form.length) {
							x = $target.position().left - $speechbubble.outerWidth(true) + ($target.outerWidth(true) + 10);
						}
					}

					$speechbubble.css('transform', `translate3d(${x}px, ${y}px, 0px)`);
					$speechbubble.addClass(`speech-bubble--is-visible${($form.length) ? ' speech-bubble--align-right' : ''}`);

					$target.addClass('tooltip--is-active');

					clearInterval(timer);
				}
			}, 1);
		}

		// Callback:after
		this.options.after.call(this, this.element);
	}

	closeAllSpeechBubbles(e) {
		if (e && typeof e !== 'undefined') {
			let elements = $('.close-button, .speech-bubble, .speech-bubble__text, .tooltip, .text-tooltip');
			let isElement = elements.filter((i, elem) => $(elem).is(e.target)).length;

			if (isElement > 0) {
				return;
			}
		}

		$('.speech-bubble').each((i) => {
			if ($(`.speech-bubble:eq(${i})`).hasClass('speech-bubble--is-visible')) {
				$(`.speech-bubble:eq(${i})`).removeClass('speech-bubble--is-visible');
				$('.text-tooltip[class*="text-tooltip--is-active"]').removeClass('text-tooltip--is-active');
				$(`.speech-bubble:eq(${i})`).siblings('.tooltip--is-active').removeClass('tooltip--is-active');
			}
		});
	}

	closeSpeechBubble(e) {
		e.stopImmediatePropagation();

		const $target = $(e.target);
		const $speech = $target.closest('.speech-bubble');
		const $tooltip = $speech.siblings(this.element);

		$tooltip.trigger('click', false);
	}

	calculateX($target, $speechbubble) {

		if (mql.large.matches) {
			return $target.position().left - ($speechbubble.outerWidth(true) / 2) + ($target.outerWidth(true) / 2);
		}

		if (mql.medium.matches) {
			return $target.position().left - ($speechbubble.outerWidth(true) / 2);
		}

		return ($target.offset().left - 8) * -1;

	}

	calculateY($target) {

		return $target.position().top + ($target.outerHeight(true) + this.options.offset);

	}
}

export { Tooltip };
