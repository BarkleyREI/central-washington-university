!function(){"use strict";window.matchMedia("(min-width: 400px)"),window.matchMedia("(min-width: 768px)"),window.matchMedia("(min-width: 1024px)"),window.matchMedia("(min-width: 1200px)"),window.matchMedia("(min-width: 1440px)"),window.matchMedia("(min-width: 1920px)");const t=function(t){"loading"!==document.readyState?t():document.addEventListener?document.addEventListener("DOMContentLoaded",t,!1):document.attachEvent("onreadystatechange",(function(){"complete"===document.readyState&&t()}))};Object.assign;var e={elem:{$chat:$(".chat"),$open:$(".open-chat")},init:function(){this.elem.$chat.length>0&&(this.elem.$chat.find(".chat__button").on("click",(function(){e.elem.$chat.toggleClass("chat--open"),e.elem.$chat.find(".chat__button").attr({"aria-expanded":function(t,e){return"false"===e?"true":"false"},"aria-label":function(t,e){return"Click here to open the library chat window"===e?e.replace("open","close"):e.replace("close","open")}}),e.elem.$chat.find(".chat__window").attr({"aria-hidden":function(t,e){return"false"===e?"true":"false"}})})),this.elem.$open.on("click",(function(t){t.preventDefault(),e.elem.$chat.addClass("chat--open"),e.elem.$chat.find(".chat__button").attr({"aria-expanded":"true","aria-label":"Click here to close the library chat window"}),e.elem.$chat.find(".chat__window").attr({"aria-hidden":"false"}),e.elem.$chat.find("iframe").focus()})))}},n=function(){e.init()};t((function(){n()}))}();
//# sourceMappingURL=library.js.map