/**
 * Interactive State Map component.
 * @module components/isms
 */

const ism = {

	elem: {
		$icon: $('.ism__location-item'),
		$heading: $('.ism__heading')
	},

	init() {
		if (this.elem.$icon.length > 0) {
			this.bindUIActions();
		}
	},

	bindUIActions() {
		this.elem.$icon.on('click', this.btnIcon.bind(this));
		this.elem.$heading.on('click', this.btnHeading.bind(this));
	},

	btnHeading(e) {
		this.elem.$icon.removeClass('is-active').find('.ism__location-link').attr('aria-expanded', false);
		$('.ism__location-link[href="#' + $(e.currentTarget).attr('aria-controls') + '"]').attr('aria-expanded', true).parent().addClass('is-active');
	},

	btnIcon(e) {
		console.log('blorb');
		this.elem.$icon.removeClass('is-active').find('.ism__location-link').attr('aria-expanded', false);
		$(e.currentTarget).addClass('is-active').find('.ism__location-link').attr('aria-expanded', true);
	}
};

export { ism };

// to use:
//
// import ism from './modules/ism';
//
// ism.init();
