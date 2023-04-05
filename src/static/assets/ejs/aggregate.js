import { ready } from 'brei-project-utils';

import { results } from './modules/results';

const aggregate = {
	init() {
		results.init();
	}
};

ready(function () {
	aggregate.init();
});
