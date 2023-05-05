/**
 * Interactive State Map component.
 * @module components/isms
 */

const ism = {

	elem: {
		$icon: $('.ism__location-item'),
		$heading: $('.ism__heading'),
		$photos: $('.ism__photo')
	},

	init() {
		if (this.elem.$icon.length > 1) {
			this.bindUIActions();
		} else {
			this.bindNoUIActions();
		}
	},

	bindUIActions() {
		this.elem.$icon.on('click', this.btnIcon.bind(this));
		this.elem.$heading.on('click', this.btnHeading.bind(this));
	},
	
	bindNoUIActions() {
		this.elem.$icon.find('.ism__location-link').removeAttr('href').attr('disabled',true);
		this.elem.$icon.on('click', this.btnNoIcon.bind(this));
	},

	btnHeading(e) {
		this.elem.$icon.removeClass('is-active').find('.ism__location-link').attr('aria-expanded', false);
		$('.ism__location-link[href="#' + $(e.currentTarget).attr('aria-controls') + '"]').attr('aria-expanded', true).parent().addClass('is-active');
	},

	btnIcon(e) {
		e.preventDefault();
		let targetHash =  $(e.currentTarget).find('.ism__location-link').attr('href');
		if(this.elem.$photos.length > 0) {
			let targetPhoto = targetHash.substr(1);
			console.log(targetPhoto);
			this.elem.$photos.removeClass('ism__photo--shown');
			this.elem.$photos.eq(targetPhoto).addClass('ism__photo--shown');
		}
		this.elem.$icon.removeClass('is-active').find('.ism__location-link').attr('aria-expanded', false);
		$(e.currentTarget).addClass('is-active').find('.ism__location-link').attr('aria-expanded', true);
		$('.ism__heading[href="' + targetHash + '"]').trigger('click');

	},

	btnNoIcon(e) {
		e.preventDefault();
	}
};

export { ism };

// to use:
//
// import ism from './modules/ism';
//
// ism.init();
