const animator = {

	elem: {
		groups: document.querySelectorAll('.animateOnce')
	},

	mover: null,

	init() {
		if (animator.elem.groups.length > 0 ) {
			animator.mover = new IntersectionObserver(animator.mover, { root: null, rootMargin: '-100px', threshold: 0 });
			animator.elem.groups.forEach(function(element) {
				animator.mover.observe(element);
			});
		}
	},

	mover(entries) {
		console.log('kiki');
		console.log(entries);
		entries.forEach(entry => {
			if(entry.isIntersecting) {
				entry.target.classList.add('animated');
				animator.mover.unobserve(entry.target);
			}
		});
	}
};

export { animator };
