/**
 * Chat component.
 * @module components/chat
 */

const chat = {
	elem: {
		$chat: $('.chat'),
		$open: $('.open-chat')
	},
	
	init() {
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

			this.elem.$open.on('click', function(e) {
				e.preventDefault();
				chat.elem.$chat.addClass('chat--open');
				chat.elem.$chat.find('.chat__button').attr({ 'aria-expanded': 'true', 'aria-label': 'Click here to close the library chat window' });
				chat.elem.$chat.find('.chat__window').attr({'aria-hidden': 'false' });
				chat.elem.$chat.find('iframe').focus();				
			});
		}
	}
};

export { chat };
