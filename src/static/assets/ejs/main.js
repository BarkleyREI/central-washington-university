import { ready } from 'brei-project-utils';

import { plugin } from './lib/plugin';

import { forms } from './modules/forms';
import { gallery } from './modules/gallery';
import { Tooltip } from './modules/tooltip';
import { video } from './modules/video';

const main = {

	elem: {
		$textTooltip: $('.text-tooltip'),
		$tooltip: $('.tooltip')				
	},

	init() {
		plugin('Tooltip', Tooltip);

		forms.init();
		gallery.init();
		video.init();

		this.bindUIActions();		
	},

	bindUIActions() {
		this.elem.$tooltip.Tooltip({ type: 'button' });

		this.elem.$textTooltip.Tooltip({
			type: 'text',
			after(target) {
				$(target).toggleClass('text-tooltip--is-active');
			}
		});
	}	

};

ready(function () {
	main.init();
});
