import { ready } from 'brei-project-utils';

import { plugin } from './lib/plugin';

import { accordion } from './modules/accordion';
import { animator } from './modules/animator';
import { form } from './modules/form';
import { gallery } from './modules/gallery';
import { header } from './modules/header';
import { ism } from './modules/ism';
import { masthead } from './modules/masthead';
import { search } from './modules/search';
import { table } from './modules/table';
import { takeover } from './modules/takeover';
import { Tooltip } from './modules/tooltip';
import { video } from './modules/video';

const main = {

	elem: {
		$textTooltip: $('.text-tooltip'),
		$tooltip: $('.tooltip')	
	},

	init() {
		plugin('Tooltip', Tooltip);

		accordion.init();
		form.init();
		gallery.init();
		header.init();
		ism.init();
		masthead.init();
		search.init();
		table.init();
		takeover.init();
		video.init();

		animator.init();

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
