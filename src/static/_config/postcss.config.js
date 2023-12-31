module.exports = (file, options, env) => {
	'use strict';

	let config = {
		plugins: []
	};

	if (typeof file.env !== 'undefined' && file.env === 'scss') {

		// Scss Processing

		config.syntax = 'postcss-scss';

		config.plugins = [
			require('postcss-sorting')({
				'order': [
					'custom-properties',
					'dollar-variables',
					{
						type: 'at-rule',
						name: 'extend'
					},
					'at-variables',
					'declarations',
					'rules',
					'at-rules'
				],
				'properties-order': 'alphabetical'
			})
		];

	} else if (typeof file.env !== 'undefined' && file.env === 'csspre') {

		// CSS Pre-processing

		config.plugins = [
			require('autoprefixer')({
				remove: false
			})
		];

	} else {

		// CSS Post-processing

		config.plugins = [
			require('postcss-pxtorem')({
				mediaQuery: true,
				propList: [
					'bottom',
					'font',
					'font-size',
					'height',
					'left',
					'letter-spacing',
					'line-height',
					'margin*',
					'max-*',
					'padding*',
					'top',
					'width'
				]
			}),
			require('cssnano')
		];

	}

	return config;

};
