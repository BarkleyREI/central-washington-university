import { ready } from 'brei-project-utils';

import { chat } from './modules/chat';

const bibliotheque = {
	init() {
		chat.init();
	}
};

ready(function () {
	bibliotheque.init();
});
