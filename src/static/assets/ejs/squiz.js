import { ready } from 'brei-project-utils';

import { accordion } from './modules/accordion';
import { header } from './modules/header';
import { search } from './modules/search';

const main = {

	init() {
		accordion.init();
		header.init();
		search.init();
	},

};

ready(function () {
	main.init();
});
