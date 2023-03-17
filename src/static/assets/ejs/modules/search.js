const search = {

	elem: {
		$form: $('.search-desktop__form'),		
		$input: $('.search-desktop__input'),
		$submit: $('.search-desktop__submit'),		
		$toggle: $('.search-desktop__toggle')
	},

	init() {


		this.elem.$toggle.on('click', function(e) {
			e.preventDefault();
			$(e.target).attr({
				'aria-pressed': function (i, txt) {
					return (txt === 'false') ? 'true' : 'false';
				},
				'aria-label': function (i, txt) {
					return (txt === 'Open site search') ? txt.replace('Open', 'Close') : txt.replace('Close', 'Open');
				}
			});

			if($(e.target).attr('aria-pressed') === 'true'){
				search.elem.$form.removeAttr('hidden');
				search.elem.$input.attr('tabindex', '0').focus();
				search.elem.$submit.attr('tabindex', '0');
			} else {
				search.elem.$form.attr('hidden','hidden');
				search.elem.$input.attr('tabindex', '-1');
				search.elem.$submit.attr('tabindex', '-1');
			}				
		});
	}

};

export { search };
