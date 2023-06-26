/**
 * Chat component.
 * @module components/chat
 */

const chat = {
	elem: {
		$chat: $('.chat')
	},
	
	init() {
		console.log('zap');
		
		if (this.elem.$chat.length > 0) {
			this.elem.$chat.find('.chat__button').on('click', function() {
				chat.elem.$chat.toggleClass('chat--open');
				chat.elem.$chat.find('.chat__button').attr({
					'aria-expanded': function (i, txt) {
						return (txt === 'false') ? 'true' : 'false';
					},
					'aria-label': function (i, txt) {
						return (txt === 'Click here to open the library chat window') ? txt.replace('open', 'close') : txt.replace('close', 'open');
					}
				});
				chat.elem.$chat.find('.chat__window').attr({
					'aria-hidden': function (i, txt) {
						return (txt === 'false') ? 'true' : 'false';
					}
				})
				
			});
		}
	}
};

export { chat };
