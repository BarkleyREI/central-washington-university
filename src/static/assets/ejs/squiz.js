import { ready } from 'brei-project-utils';

import { header } from './modules/header';
import { search } from './modules/search';

const main = {

	init() {
		header.init();
		search.init();
	},

};

ready(function () {
	main.init();
});
