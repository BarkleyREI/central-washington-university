!function(){"use strict";window.matchMedia("(min-width: 400px)"),window.matchMedia("(min-width: 768px)"),window.matchMedia("(min-width: 1024px)"),window.matchMedia("(min-width: 1200px)"),window.matchMedia("(min-width: 1440px)"),window.matchMedia("(min-width: 1920px)");const e=function(e){"loading"!==document.readyState?e():document.addEventListener?document.addEventListener("DOMContentLoaded",e,!1):document.attachEvent("onreadystatechange",(function(){"complete"===document.readyState&&e()}))};Object.assign;var t={elem:{$primary:$(".header__lower"),$header:$(".header__navigation"),$primaryToggle:$(".header__toggle")},mql:{large:window.matchMedia("(min-width: 1024px)")},init:function(){this.elem.$primaryToggle.on("click",(function(e){e.preventDefault(),$(e.target).attr({"aria-pressed":function(e,t){return"false"===t?"true":"false"},"aria-label":function(e,t){return"Open primary navigation"===t?t.replace("Open","Close"):t.replace("Close","Open")}}),$(e.target).find(".show-for-sr").html($(e.target).attr("aria-label")),$("html, body").toggleClass("body--no-scroll")})),$(window).on("resize",this.reset.bind(this))},reset:function(){t.mql.large.matches&&($("html, body").removeClass("body--no-scroll"),t.elem.$header.removeAttr("style"),t.elem.$primaryToggle.attr({"aria-pressed":"false","aria-label":"Open primary navigation"}),t.elem.$primaryToggle.find(".show-for-sr").html(t.elem.$primaryToggle.attr("aria-label")))}},a={elem:{$form:$(".search-desktop__form"),$input:$(".search-desktop__input"),$submit:$(".search-desktop__submit"),$toggle:$(".search-desktop__toggle")},init:function(){this.elem.$toggle.on("click",(function(e){e.preventDefault(),$(e.target).attr({"aria-pressed":function(e,t){return"false"===t?"true":"false"},"aria-label":function(e,t){return"Open site search"===t?t.replace("Open","Close"):t.replace("Close","Open")}}),"true"===$(e.target).attr("aria-pressed")?(a.elem.$form.removeAttr("hidden"),a.elem.$input.attr("tabindex","0").focus(),a.elem.$submit.attr("tabindex","0")):(a.elem.$form.attr("hidden","hidden"),a.elem.$input.attr("tabindex","-1"),a.elem.$submit.attr("tabindex","-1"))}))}},i=function(){t.init(),a.init()};e((function(){i()}))}();
//# sourceMappingURL=squiz.js.map