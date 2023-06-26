import { ready } from 'brei-project-utils';

import { chat } from './modules/chat';

const library = {
	init() {
		chat.init();
	}
};

ready(function () {
	library.init();
});
