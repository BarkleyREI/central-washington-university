// import {scrollToTop} from '../lib/utils';
// import {throttle} from '../lib/throttle';

const results = {

	elem: {
		$checkboxes: $('.filter__item--checkboxes'),
		$chips: $('.aggregate__chips'),
		$count: $('.aggregate__count'),
		$keywords: $('.keyword'),
		$loading: $('.aggregate__loading'),
		$pagination: $('.aggregate__pagination'),
		$reset: $('.aggregate__reset'),
		$results: $('.aggregate__results'),
		$selects: $('.filter-selectbox')
	},
	
	dataSource: null,
	filters: {},
	initial: true,
	results: '',
	suggestions: '',
	
	// initialize the search aggregate
	init() {
		this.dataSource = this.elem.$results.data('src'); // set the data source to the data-src attribute of $results
		this.buildFilters(); // build the state machine from the filters present on the page
		this.getQuery(); // parse the query string to a specific request has been passed to the page, and update the state accordingly
		this.setControls(); // update the filters based on the current state
		this.buildChips(); // update the chips based on the current state
		this.setQuery(false, false); // update the query string based on the current state
		window.onpopstate = this.filterState; // run this function when the user navigates using the browser previous/next buttons
		this.elem.$reset.on('click', this.filterReset); // run this function when the user clicks the "clear all" option
	},

	// rebind functions to filters after successfully updating the state
	bindUIActions() {
		this.elem.$checkboxes.find('input').on('change', this.filterCheckbox);
		this.elem.$keywords.find('button').on('click', this.filterKeyword);
		this.elem.$keywords.find('input').on('keydown', this.filterKeyword);
		this.elem.$selects.find('select').on('change', this.filterSelect);
	},

	// unbind UI from the filters while in the process of updating the state
	unbindUIActions() {
		this.elem.$checkboxes.find('input').off('change');
		this.elem.$keywords.find('button').off('click');
		this.elem.$selects.find('select').off('change', this.filterSelect);
	},

	// add a new chip to the list of chips and bind the unfilterChip action to it
	addChip(key, label) {
		let output = '<a href="#' + key + '" class="chip"><span class="chip__close"><span class="show-for-sr">Remove this filter</span><svg class="brei-icon brei-icon-close" focusable="false"><use xlink:href="#brei-icon-close"></use></svg></span><span class="chip__label">' + label + '</span></a>';
		results.elem.$chips.prepend(output);
		$('.chip[href="#' + key + '"]').on('click', results.unfilterChip);
	},

	// remove a chip from the list of chips
	removeChip(key) {
		$('.chip[href="#' + key + '"]').remove();
	},

	// update the state when a chip is clicked
	unfilterChip(e) {
		e.preventDefault();
		let target = e.currentTarget.hash;
		let value = target.substr(1);

		// if the filter is a checkbox, click it (which will unselect it and trigger a refresh)
		if( $(target)[0].type === 'checkbox' ) {
			$(target).trigger('click');
		}

		// if the filter is a keyword search, zero its value and the pageindex, and update the query
		if( $(target)[0].type === 'search' ) {
			$(e.currentTarget).remove();
			$(target)[0].value = '';
			results.filters[value] = '';
			results.filters['pageindex'] = 0;
			results.setQuery(true, true);
		}

		// if the filter is a selectbox, set the selectedIndex to -1 and trigger the change event
		if( $(target)[0].localName === 'select' ) {
			$(target)[0].selectedIndex = -1;
			$(target).siblings('.selectability').find('[role="textbox"]')[0].innerHTML = ''; // if you are using the selectability script, zero out the value of the textbox it uses for displaying the curent value
			$(target).trigger('change').removeClass('js-selectability--has-value');
		}
	},

	// build chips from filter array
	buildChips() {
		for (let key in results.filters) {
			let keyid = '#' + key;
			let label = '';
			if (results.filters.hasOwnProperty(key)) {
				// if the filter is an array (checkbox) add an item for each item in the array
				if (Array.isArray(results.filters[key])) {
					if (results.filters[key].length > 0 ) {
						for (let i = 0; i < results.filters[key].length; i = i + 1) {
							let item = $('[id^="' + key + '"][value="' + results.filters[key][i] + '"]');
							label = item.siblings('label')[0].innerText;
							results.addChip(item.attr('id'), label);
						}
					}
				} else {
					// if the filter is not the pagindex or pagesize parameter
					if((key !== 'pageindex') && (key !== 'pagesize') && (results.filters[key] !== '')) {
						// if the filter is an input, set the label to the value
						if( $(keyid)[0].localName === 'input') {
							label = $(keyid)[0].value;
						}
						// if the filter is a label, set the label to the text of the seleted option
						if( $(keyid)[0].localName === 'select') {
							label = $(keyid)[0].options[$(keyid)[0].selectedIndex].text;
						}
						results.addChip(key, label);
					}
				}
			}
		}
	},

	// build the filter array from the elements on the page
	buildFilters() {
		if(results.elem.$keywords.length > 0) {
			results.filters['search'] = '';
		}
		//  for each group of checkboxes to the page, add an array with a name equal to the legend
		if(results.elem.$checkboxes.length > 0) {
			results.elem.$checkboxes.each(function() {
				results.filters[$(this).find('legend')[0].innerText] = [];
			});
		}
		// for each keyword search (there should only be one) add a string with a name equal to the id
		if(results.elem.$keywords.length > 0) {
			results.elem.$keywords.each(function() {
				results.filters[$(this).find('input')[0].id] = '';
			});
		}
		// for each selectbox, add a string wiith a name equal to the id
		if(results.elem.$selects.length > 0) {
			results.elem.$selects.each(function() {
				results.filters[$(this).find('select')[0].id] = '';
			});
		}
		// set initial pageindex to 0 and initial pagesize to 10
		results.filters['pageindex'] = 0;
		results.filters['pagesize'] = 10;
	},

	// build a query string from the filters
	buildQuery() {
		let data = this.filters;
		let query = [];
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				if (Array.isArray(key)) {
					data[key] = key.toString();
				}
				query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
			}
		}
		query = query.join('&').replace(/%2C/g, ',');
		return query;
	},

	// filtering on checkbox click
	filterCheckbox(e) {
		let id = e.currentTarget.id;
		let key = id.substring(0, e.currentTarget.id.indexOf('-'));
		let value = e.currentTarget.value;
		let label = $(e.currentTarget).siblings('label')[0].innerText;
		let status = e.currentTarget.checked;

		// if the checkbox is checked, add a chip and add it to the state
		if(status) {
			results.addChip(id, label);
			results.filters[key].push(value);
		// otherwise, remove the chp and splice it out of the state
		} else {
			results.removeChip(id);
			results.filters[key].splice(results.filters[key].indexOf(value),1);
		}
		results.filters['pageindex'] = 0; // reset the page index
		results.setQuery(true, true); // set the query
	},

	// filtering on keyword submit
	filterKeyword(e) {
		let filter = false;
		let key = '';

		// if the triggering event is a keydown inside the input, only trigger if there is a return
		/// set the key to the id of the input
		if ((e.type === 'keydown') && (e.keyCode === 13)) {
			key = $(e.currentTarget)[0].id;
			filter = true;
		}

		// if the triggering event is a click on the submit button
		// set the key to id of the adjacent input
		if (e.type === 'click') {
			key = $(e.currentTarget).siblings('input')[0].id;
			filter = true;
		}

		if (filter) {
			e.preventDefault();
			let value = '<span>' + $('#' + key)[0].value.trim() + '</span>'; // wrap the value in a span because if there's no HTML content the next line will product a blank output
			let safeValue = $(value).text();
			if(safeValue.length > 0) {
				results.removeChip(key); // remove any existing chip for the keyword
				results.addChip(key, safeValue); // add a new chip for the keywords current value
				results.filters[key] = safeValue; // update the filters
				results.filters['pageindex'] = 0; // reset the page index
				results.setQuery(true, true); // set the query
			}
		}
	},

	// filtering on pagination click
	filterPagination(e) {
		e.preventDefault();
		results.filters['pageindex'] = e.currentTarget.hash.substr(1); // update the pageindex to the new value
		results.setQuery(true, true); // set the query
	},

	// reset all filters
	filterReset() {
		results.unbindUIActions();
		results.elem.$checkboxes.find('input').prop('checked',false);
		results.elem.$keywords.find('input').val('');
		if(results.elem.$selects.length > 0) {
			results.elem.$selects.find('select')[0].selectedIndex = -1;
			results.elem.$selects.find('select').siblings('.selectability').find('[role="textbox"]').html('');
			results.elem.$selects.find('select').removeClass('js-selectability--has-value');
		}
		$('.chip').remove();
		results.buildFilters();
		results.setQuery(true, true);
	},

	// filter on selectbox change
	filterSelect(e) {
		e.preventDefault();
		let key = e.currentTarget.id;
		let value = e.currentTarget.value;
		results.removeChip(key);
		if(e.currentTarget.selectedIndex > -1) {
			let label = e.currentTarget.options[e.currentTarget.selectedIndex].text;
			$(e.currentTarget).siblings('.selectability').find('[role="textbox"]')[0].innerHTML = label;
			results.addChip(key, label);
		}
		results.filters[key] = value;
		results.filters['pageindex'] = 0;
		results.setQuery(true, true);
	},

	// filtering on history state change
	filterState() {
		results.getQuery();
		results.setControls();
		results.setQuery(false, false);
	},

	// get data
	getData(query) {
		let deferred = $.Deferred();
		$.ajax({
			url: results.dataSource,
			method: 'GET',
			data: query,
			dataType: 'html',
			success: function(data) {
				deferred.resolve(data);
			},
			error: function(jqXHR, textStatus, errorThrow) {
				console.log(jqXHR, errorThrow);
				deferred.reject(textStatus);
			}
		});
		return deferred.promise();
	},
	
	// overwrite default filter settings with values passed through query string, ignoring blank values and values without a filter
	getQuery() {
		if (window.location.search.length > 0) { 
			let searchParams = new URLSearchParams(window.location.search);
			searchParams.forEach(function (value,key) {
				if(value !== '') {
					if(results.filters[key] !== undefined) {					
						if (Array.isArray(results.filters[key])) {
							results.filters[key] = [];
							value = value.split(',');
							results.filters[key] = value;
						} else {
							results.filters[key] = value;
						}
					}
				}
			});
		}
	},

	// build and render count from retrieved results
	renderCount() {
		let output = parseInt(results.filters['pageindex']) * parseInt(results.filters['pagesize']) + 1;
		let maxCount = output + parseInt(results.filters['pagesize']) - 1;
		if (maxCount > results.results[0].TotalCount) {
			maxCount = results.results[0].TotalCount;
		}
		if (parseInt(maxCount) !== 1) {
			output += '-';
			output += maxCount;
			output += ' of ';
			output += results.results[0].TotalCount;
			output += ' Results';
		} else {
			output += ' Result';
		}
		results.elem.$count.html(output);
	},

	// build and render pagination from retrieved results
	renderPagination() {
		let items = [];
		let filters = results.filters;
		let current = parseInt(filters['pageindex']);
		let max = Math.ceil(parseInt(results.results[0].TotalCount) / parseInt(filters['pagesize'])) - 1;
		let output = '<ul class="pagination__list clearfix" aria-label="Pagination">';

		// push all the items we need at a minimum: first, current, last, and output bracketing current
		items.push(0, current - 1, current, current + 1, max);

		// when the values are close to first or last, push some extra options to ensure that we always have at least four options showing
		if (current < 2) {
			items.push(2);
		}
		if (current > (max - 1)) {
			items.push(max - 2);
		}
		
		// filter out results that are less than zero, or greater than max, then sort
		items = items.filter(function(x){ return x > -1 });
		items = items.filter(function(x){ return x <= max });
		items.sort(function(a, b){return a-b});

		// previous button
		output += '<li class="pagination__item pagination__item--prev';
		if(current === 0) {
			output += ' pagination__item--disabled';
		}
		output += '"><a href="#' + (current - 1) + '" class="pagination__button btn btn--pagination"><span class="btn__icon"><svg class="brei-icon brei-icon-chevron" focusable="false"><use xlink:href="#brei-icon-chevron"></use></svg></span><span class="show-for-sr">Previous Page</span></a></li>';

		// individual results
		for(let i = 0; i < items.length; i = i + 1) {
			if((i === 0) || (items[i] !== items[i - 1])) {
				if((i > 0) && ((items[i] - items[i - 1]) > 1)) {
					output += '<li class="pagination__item pagination__item--spacer"><span class="pagination__span">...</span></li>';
				}
				if(items[i] === current) {
					output += '<li class="pagination__item pagination__item--active"><a href="#' + items[i] + '" class="pagination__link" tabindex="-1"><span class="show-for-sr">You\'re on page</span> ' + (items[i] + 1) + '</a></li>';
				} else {
					let classy = '';
					if(i === 0) { classy = ' pagination__item--first' }
					if(i === (items.length - 1)) { classy = ' pagination__item--last'; }					
					output += '<li class="pagination__item' + classy + '"><a href="#' + items[i] + '" class="pagination__link" aria-label="Page ' + (items[i] + 1) + '">' + (items[i] + 1) + '</a></li>';
				}
			}
		}

		// next button
		output += '<li class="pagination__item pagination__item--next';
		if(current === max) {
			output += ' pagination__item--disabled';
		}
		output += '"><a href="#' + (current + 1) + '" class="pagination__button btn btn--pagination"><span class="btn__icon"><svg class="brei-icon brei-icon-chevron" focusable="false"><use xlink:href="#brei-icon-chevron"></use></svg></span><span class="show-for-sr">Previous Page</span></a></li></ul>';
		
		results.elem.$pagination.html(output);
		$('.pagination__button, .pagination__link').on('click', results.filterPagination); // rebind UI actions
	},

	// build and render retrieved results 
	renderResults() {

		// hide the loading animation
		results.elem.$loading.hide();

		// if this is not the initial set-up of the aggregate, zero out any featured results on the page
		if(results.initial === false) {
			$('.aggregate__feature').empty();
		}

		// if there are results, render the count, results, and pagination then fade them in
		if(results.results[0].TotalCount > 0) {
			results.filters['pagesize'] = parseInt(results.results[0].PageSize); // reset pagesize based on response
			results.renderCount();
			results.elem.$count.fadeIn();
			results.elem.$results.html(results.results[0].Results).fadeIn();
			if(results.results[0].TotalCount > results.filters['pagesize']) {
				results.renderPagination();
				results.elem.$pagination.fadeIn();
			}
		} else {
			results.elem.$results.html('<p class="aggregate__none">No matching results were found.</p>').fadeIn();	
		}

		// set the state of the machine so we know to zero the featured results next time
		results.initial = false;
	},

	// update filters elements based on filters
	setControls() {
		// unbind all UI actions
		results.unbindUIActions();

		// uncheck every checkbox
		results.elem.$checkboxes.find('input').prop('checked',false);
		
		for (let key in results.filters) {
			// if the filter is an array (i.e. a checkbox) loop through the array and check every checkbox in it
			if (results.filters.hasOwnProperty(key)) {
				if (Array.isArray(results.filters[key])) {
					for (let i = 0; i < results.filters[key].length; i = i + 1) {
						let item = $('[id^="' + key + '"][value="' + results.filters[key][i] + '"]');
						item.prop('checked',true);
					}
				} 
				else {
					// if the filter is not an array, or the pageindex or pagesize parameters
					if((key !== 'pageindex') && (key !== 'pagesize') && (results.filters[key] !== '')) {
						let keyid = '#' + key;
						// if the filter is a keyword search (input box) set its value
						if( $(keyid)[0].localName === 'input' ) {
							$(keyid)[0].value = results.filters[key];
						}
						// if the filter is a selectbox, update its value and trigger the change event for selectability
						if( $(keyid)[0].localName === 'select' ) {
							$(keyid).val(results.filters[key]).trigger('change').addClass('js-selectability--has-value');
						}
					}

				}
			}
		}
		
		// rebind UI actions
		results.bindUIActions();
	},

	// update queryString based on filters
	setQuery(reposition, push) {
		// build the request to the datasource
		
		let query = results.buildQuery();
		let dataObj = results.getData(query);

		// if reposition is true, scroll to the top of the results
		if (reposition === true) {
			$('html, body').animate({ scrollTop: $('.aggregate__content').offset().top }, 425);
		}

		// if push is true, add the new page state to the browser history; otherwise, just replace the page state
		if (push === true) {
			history.pushState(null, '', '?' + query);
		} else {
			history.replaceState(null, '', '?' + query);
		}
		
		// show the "loading" animation, then fade out and empty all other page elements
		results.elem.$loading.show();
		results.elem.$count.fadeOut().empty();
		results.elem.$results.fadeOut().empty();
		results.elem.$pagination.fadeOut().empty();

		// send a request to the data source; when it is finished render the results
		$.when(dataObj)
			.done(function(data) {
				setTimeout(function() {
					results.results = JSON.parse(data);
					results.renderResults();
				}, 500);
			})
			.fail(function () {
				console.log('API ERROR: No results were returned')
			});
	}

};

export {results};
