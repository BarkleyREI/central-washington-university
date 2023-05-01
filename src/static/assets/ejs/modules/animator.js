const animator = {

	elem: {
		sections: document.querySelectorAll('.animate, .animateOnce')
	},

	animationObserver: null,

	init() {
		if (animator.elem.sections.length > 0 ) {
			if(!!window.IntersectionObserver){
				animator.animationObserver = new IntersectionObserver(animator.animate, { rootMargin: '-200px', threshold: 0 });
				animator.elem.sections.forEach(function(element) {
					animator.animationObserver.observe(element);
				});
			}
		}
	},

	animate(entries) {
		entries.forEach(entry => {
			if(entry.isIntersecting) {
				entry.target.classList.add('animated');
				if (entry.target.classList.contains('animateOnce')) {
					animator.animationObserver.unobserve(entry.target);
				}
			} else {
				entry.target.classList.remove('animated');
			}
		});
	}
};

export { animator };
