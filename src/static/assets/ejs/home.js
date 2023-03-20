import { ready } from 'brei-project-utils';

import { ism } from './modules/ism';

const home = {

	init() {
		ism.init();
	}

};

ready(function () {
	home.init();
});
