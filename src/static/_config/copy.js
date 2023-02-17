const config = require('./_brei.json');

const root = __dirname + '/..';

const app = root + '/' + config.app;
const dist = root + '/' + config.dist;
const deploy = root + '/' + config.deploy;

exports = module.exports = {
	'deploy': [
		{
			'cwd': app + '/scss/icons',
			'dot': true,
			'src': [
				'selection.json'
			],
			'dest': deploy
		},
		{
			'cwd': dist + '',
			'dot': true,
			'src': [
				'**',
				'!components/*.html',
				'!*.html'
			],
			'dest': deploy
		}
	]
};
