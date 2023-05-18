/**
 * Full Image Gallery component.
 * @module components/media
 */
import { _extends } from 'brei-project-utils';

const gallery = {

	elem: {
		$slider: $('.gallery__items')
	},

	options: {
		adaptiveHeight: true,
		dots: true,
		draggable: true,
		fade: true,
		infinite: true,
		responsive: [],
		rows: 0,
		slidesToScroll: 1,
		slidesToShow: 1,
		speed: 500,
		prevArrow: '<button class="gallery__prev btn btn--small"><span class="show-for-sr">Go to the previous slide</span><svg class="brei-icon brei-icon-chevron"><use xmlns:xlink="http://www.w3.org/1999/xlink" href="#brei-icon-chevron"></use></svg></button>',
		nextArrow: '<button class="gallery__next btn btn--small"><span class="show-for-sr">Go to the next slide</span><svg class="brei-icon brei-icon-chevron"><use xmlns:xlink="http://www.w3.org/1999/xlink" href="#brei-icon-chevron"></use></svg></button>'
	},

	init() {
		if (this.elem.$slider.length > 0) {
			this.activateSliders();
		}

	},

	activateSliders() {

		const _this = this;

		this.elem.$slider.each(function () {
			if($(this).children().length) {

				let prev = $(this).parents('.js-has-carousel').find('.js-prev');
				let next = $(this).parents('.js-has-carousel').find('.js-next');

				let options = _extends({}, _this.options);
				
				if (prev.length > 0) {
					options.prevArrow = prev;
				}

				if (next.length > 0) {
					options.nextArrow = next;
				}

				$(this).on('afterChange', function() {
					let caption = $(this).find('.gallery__image').eq($(this).slick('slickCurrentSlide')).find('figcaption').html();
					if(caption === undefined) {
						caption = '';
					} 
					$(this).closest('.gallery').find('.gallery__caption').html(caption);
				}).on('init', function() {
					let caption = $(this).find('.gallery__image').eq(0).find('figcaption').html();
					if(caption === undefined) {
						caption = '';
					} 
					$(this).closest('.gallery').find('.gallery__caption').html(caption);
				}).slick(options);
				
			}
		});
	}

};

export { gallery };

// to use:
//
// import media from './modules/media';
//
// media.init();
