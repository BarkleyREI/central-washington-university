import { ready } from 'brei-project-utils';

class Textarea {
	constructor(element, options) {
		this.defaults = { // Defaults
			maxlength: ($(element).attr('maxlength')) ? $(element).attr('maxlength') : 999
		};
		this.element = element;
		this.options = $.extend({}, this.defaults, options);
		this.enabled = ($(element).attr('maxlength')) ? true : false;

		if (this.enabled) {
			this.init();
		}
	}

	init() {
		this.appendCount();
		this.bindUIActions();
	}

	bindUIActions() {
		$(this.element).on('keyup', this.onKeyUp.bind(this));
		$(this.element).on('render', this.render.bind(this));

		ready(() => {
			$(this.element).trigger('render', [$(this.element).val().length, this.options.maxlength]);
		});
	}

	onKeyUp(e) {
		const count = $(e.target).val().length;

		$(e.target).trigger('render', [count, this.options.maxlength]);
	}

	pad(n) {
		return (n < 100 && n >= 10) ? (`${n}`) : (n < 10) ? (`0${n}`) : n;
	}

	render(e, count, maxlength) {
		const $textCount = $(e.target).parent('.form__field').find('.form__text-count');		
		const remaining = maxlength - count;		
		$textCount.empty().text(`${this.pad(remaining)}/${maxlength} Characters Remaining`);

	}

	appendCount() {
		const parent = $(this.element).parent('.form__field');

		if (parent.length > 0) {
			const $textCount = parent.find('.form__text-count');

			if ($textCount.length <= 0) {
				parent.append('<div class="form__text-count"></div>');
			}
		}
	}
}

export { Textarea }
