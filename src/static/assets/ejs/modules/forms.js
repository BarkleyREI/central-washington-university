import { plugin } from '../lib/plugin';
import { Textarea } from './textarea';

const forms = {

	validClass: 'form__field--is-valid',
	invalidClass: 'form__field--is-invalid',

	elem: {
		$body: $('body'),
		$selects: $('select:not([multiple])'),
		$textarea: $('textarea')
	},

	init() {
		// Init plugins
		plugin('Textarea', Textarea);

		this.bindUIActions();
		this.selectability();
	},

	bindUIActions() {

		this.elem.$body
			.on('click', '.form input[type="submit"], .form button[type="submit"]', this.onClick.bind(this))
			.on('input', 'input,textarea', this.input.bind(this))
			.on('change', this.elem.$selects, this.input.bind(this));

		this.elem.$textarea.Textarea();

	},

	checkFormValid() {
		let $invalid = $('.form [required]:invalid');

		return ($invalid.length <= 0);
	},

	onClick(e) {
		let $form = $(e.target).parents('form');

		if ($form.hasClass('mobile-search')) {
			return;
		}

		$form.addClass('js-was-submitted');

		if (!$form.hasClass('js-is-valid')) {
			e.preventDefault();
		}

		if (this.checkFormValid()) {
			$form.addClass('js-is-valid');
			$form[0].submit();
		} else {
			let $field = $('[required]:invalid').first().closest('.form__field');

			$('[required]').each((i) => {
				this.input($(`[required]:eq(${i.toString()})`));
			});

			scrollToTop($field, 425);
		}
	},

	input(e) {
		let $input = (e.length) ? e : $(e.target);
		// let isRequired = typeof $input.attr('required') !== 'undefined' && $input.attr('required') !== false;
		let isEmpty = $input.val() === '';

		if ($input.is(':invalid')) {
			$input.parent('.form__field').removeClass(this.validClass).addClass(this.invalidClass);
		} else {
			if (!isEmpty) {
				$input.parent('.form__field').removeClass(this.invalidClass).addClass(this.validClass);
			} else {
				$input.parent('.form__field').removeClass(this.invalidClass).removeClass(this.validClass);
			}
		}
	},

	selectability() {
		if (this.elem.$selects.length > 0) {
			this.elem.$selects.selectability({
				'position': 'above',
				'floatLabel': 'true'
			});

			$('.selectability[aria-disabled="true"]').attr('tabindex', '-1');
		}
	}

};

export { forms };
