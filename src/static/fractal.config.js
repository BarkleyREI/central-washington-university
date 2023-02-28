'use strict';

/*
* Require the path module
*/
const path = require('path');

const exec = require('child_process').exec;

const config = require('./_config/_brei.json');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();


/*
 * Adjust settings if we are in a server versus a fully built library
 */
let pargs = process.argv;
let isStart = pargs.includes('start');

/*
 * Give your project a title.
 */
fractal.set('project.title', config.title);

/*
 * Change nav from Components to Library
 */
fractal.components.set('label', 'Library');

/*
 * Call all the stuff "Components"
 */
fractal.components.set('title', 'Components');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'));

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * If we're running a full build, we do not want the development section of docs.
 */
if (!isStart) {
	fractal.docs.set('exclude', '**/development/**');
}

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, config.dist));

/*
 * Handlebars Helpers
 */
const breiHelpers = require('./lib/helpers/helpers');
const handlebarsHelpers = require('handlebars-helpers')();

let helpers = Object.assign({}, handlebarsHelpers, breiHelpers);

const hbs = require('@frctl/handlebars')({
	helpers: helpers
});

fractal.components.engine(hbs);
fractal.docs.engine(hbs);

/*
 * Final build destination
 */
fractal.web.set('builder.dest', __dirname + '/' + config.deploy);

/*
 * Custom theme settings. Uses custom BarkleyREI subtheme of Mandelbrot.
 *
 * Theme located at: https://github.com/BarkleyREI/rei-cursion
 */
let mode = 'development';
let themeSettings = {
	'logo': ''
};

// Client facing settings
if (!isStart) {
	// mode = 'production';
	mode = 'development'
}

/*
 * Theme
 */
const mySubTheme = require('rei-cursion');
const myCustomisedTheme = mySubTheme(themeSettings, mode);

// const mandelbrot = require('@frctl/mandelbrot');
// const myCustomisedTheme = mandelbrot(themeSettings);

fractal.web.theme(myCustomisedTheme);

// Are we running a server?
if (mode === 'development') {
	fractal.set('project.is_server', 'true');
}

// SVG Class Name
fractal.set('project.svgClass', 'brei-icon');

// CDNs
fractal.set('project.tailwindcdn', 'https://unpkg.com/tailwindcss@2.2.7/dist/tailwind.min.css');
fractal.set('project.jquerycdn', 'https://code.jquery.com/jquery-3.5.1.min.js');

// Compiled date
fractal.set('project.compiled', new Date().toLocaleString('en'));

/*
 * BrowserSync options. What should we do when various static assets update?
 */
fractal.web.set('server.sync', true);
fractal.web.set('server.syncOptions', {
	ghostMode: false,
	open: 'local',
	reloadThrottle: 1000,
	// logLevel: "debug",
	logLevel: 'info',
	logConnections: false,
	notify: false,
	minify: false,
	files: [
		{
			match: ['./' + config.app + '/scss/**/*.scss'],
			fn: function (event, file) {
				if (event === 'change') {
					console.log('SCSS Change - ' + file + ' - running preprocess:css:server');
					exec('npm run preprocess:css:server', (error, stdout, stderr) => {
						if (error) {
							console.error(`exec error: ${error}`);
							return;
						}
						if (stderr) {
							console.error(`ERROR:\n ${stderr}`);
						}
					});
				}
				if (event === 'add' || event === 'unlink') {
					if (event === 'add') {
						console.log('SCSS Addition - ' + file + ' - running sass:index');
					}
					if (event === 'unlink') {
						console.log('SCSS Deletion - ' + file + ' - running sass:index');
					}
					exec('npm run preprocess:css', (error, stdout, stderr) => {
						if (error) {
							console.error(`exec error: ${error}`);
							return;
						}
						if (stderr) {
							console.error(`ERROR:\n ${stderr}`);
						}
					});
				}
			},
			options: {
				ignored: '**/_all.scss',
				ignoreInitial: true
			}
		},
		{
			match: ['./' + config.app + '/ejs/**/*.js'],
			fn: function (event, file) {
				console.log('JS Change - ' + file + ' - running preprocess:js');
				exec('npm run preprocess:js', (error, stdout, stderr) => {
					if (error) {
						console.error(`exec error: ${error}`);
						return;
					}
					if (stderr) {
						console.error(`ERROR:\n ${stderr}`);
					}
				});
			},
			options: {
				ignoreInitial: true
			}
		},
		{
			match: ['./' + config.app + '/img/**/*'],
			fn: function (event, file) {
				console.log('IMG Change - ' + file + ' - running build:img');
				exec('npm run build:img', (error, stdout, stderr) => {
					if (error) {
						console.error(`exec error: ${error}`);
						return;
					}
					if (stderr) {
						console.error(`ERROR:\n ${stderr}`);
					}
				});
			},
			options: {
				ignoreInitial: true
			}
		}
	]
});
