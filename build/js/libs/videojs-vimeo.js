/**
 * videojs-vimeo
 * @version 3.0.0
 * @copyright 2016 Benoit Tremblay <trembl.ben@gmail.com>
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsVimeo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*! @vimeo/player v1.0.6 | (c) 2016 Vimeo | MIT License | https://github.com/vimeo/player.js */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e.Vimeo=e.Vimeo||{},e.Vimeo.Player=t())}(this,function(){"use strict";function e(e,t){return t={exports:{}},e(t,t.exports),t.exports}function t(e,t,n){var r=T.get(e.element)||{};t in r||(r[t]=[]),r[t].push(n),T.set(e.element,r)}function n(e,t){var n=T.get(e.element)||{};return n[t]||[]}function r(e,t,n){var r=T.get(e.element)||{};if(!r[t])return!0;if(!n)return r[t]=[],T.set(e.element,r),!0;var o=r[t].indexOf(n);return o!==-1&&r[t].splice(o,1),T.set(e.element,r),r[t]&&0===r[t].length}function o(e,t){var n=T.get(e);T.set(t,n),T.delete(e)}function i(e,t){return 0===e.indexOf(t.toLowerCase())?e:""+t.toLowerCase()+e.substr(0,1).toUpperCase()+e.substr(1)}function a(e){return e instanceof window.HTMLElement}function u(e){return!isNaN(parseFloat(e))&&isFinite(e)&&Math.floor(e)==e}function s(e){return/^(https?:)?\/\/(player.)?vimeo.com(?=$|\/)/.test(e)}function c(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=e.id,n=e.url,r=t||n;if(!r)throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");if(u(r))return"https://vimeo.com/"+r;if(s(r))return r.replace("http:","https:");if(t)throw new TypeError("“"+t+"” is not a valid video id.");throw new TypeError("“"+r+"” is not a vimeo.com url.")}function f(e){for(var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=_,r=Array.isArray(n),o=0,n=r?n:n[Symbol.iterator]();;){var i;if(r){if(o>=n.length)break;i=n[o++]}else{if(o=n.next(),o.done)break;i=o.value}var a=i,u=e.getAttribute("data-vimeo-"+a);(u||""===u)&&(t[a]=""===u?1:u)}return t}function l(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return new Promise(function(n,r){if(!s(e))throw new TypeError("“"+e+"” is not a vimeo.com url.");var o="https://vimeo.com/api/oembed.json?url="+encodeURIComponent(e);for(var i in t)t.hasOwnProperty(i)&&(o+="&"+i+"="+encodeURIComponent(t[i]));var a="XDomainRequest"in window?new XDomainRequest:new XMLHttpRequest;a.open("GET",o,!0),a.onload=function(){if(404===a.status)return void r(new Error("“"+e+"” was not found."));if(403===a.status)return void r(new Error("“"+e+"” is not embeddable."));try{var t=JSON.parse(a.responseText);n(t)}catch(e){r(e)}},a.onerror=function(){var e=a.status?" ("+a.status+")":"";r(new Error("There was an error fetching the embed code from Vimeo"+e+"."))},a.send()})}function h(e,t){var n=e.html;if(!t)throw new TypeError("An element must be provided");if(null!==t.getAttribute("data-vimeo-initialized"))return t.querySelector("iframe");var r=document.createElement("div");return r.innerHTML=n,t.appendChild(r.firstChild),t.setAttribute("data-vimeo-initialized","true"),t.querySelector("iframe")}function d(){var e=arguments.length<=0||void 0===arguments[0]?document:arguments[0],t=[].slice.call(e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")),n=function(e){"console"in window&&console.error&&console.error("There was an error creating an embed: "+e)},r=function(){if(i){if(a>=o.length)return"break";u=o[a++]}else{if(a=o.next(),a.done)return"break";u=a.value}var e=u;try{if(null!==e.getAttribute("data-vimeo-defer"))return"continue";var t=f(e),r=c(t);l(r,t).then(function(t){return h(t,e)}).catch(n)}catch(e){n(e)}};e:for(var o=t,i=Array.isArray(o),a=0,o=i?o:o[Symbol.iterator]();;){var u,s=r();switch(s){case"break":break e;case"continue":continue}}}function p(e){return"string"==typeof e&&(e=JSON.parse(e)),e}function v(e,t,n){if(e.element.contentWindow.postMessage){var r={method:t};void 0!==n&&(r.value=n);var o=parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/,"$1"));o>=8&&o<10&&(r=JSON.stringify(r)),e.element.contentWindow.postMessage(r,e.origin)}}function y(e,t){t=p(t);var o=[],i=void 0;if(t.event){if("error"===t.event)for(var a=n(e,t.data.method),u=a,s=Array.isArray(u),c=0,u=s?u:u[Symbol.iterator]();;){var f;if(s){if(c>=u.length)break;f=u[c++]}else{if(c=u.next(),c.done)break;f=c.value}var l=f,h=new Error(t.data.message);h.name=t.data.name,l.reject(h),r(e,t.data.method,l)}o=n(e,"event:"+t.event),i=t.data}else t.method&&(o=n(e,t.method),i=t.value,r(e,t.method));for(var d=o,v=Array.isArray(d),y=0,d=v?d:d[Symbol.iterator]();;){var m;if(v){if(y>=d.length)break;m=d[y++]}else{if(y=d.next(),y.done)break;m=y.value}var g=m;try{if("function"==typeof g){g.call(e,i);continue}g.resolve(i)}catch(e){}}}var m="undefined"!=typeof Array.prototype.indexOf,g="undefined"!=typeof window.postMessage;if(!m||!g)throw new Error("Sorry, the Vimeo Player API is not available in this browser.");var w="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},b=(e(function(e,t){!function(e){function t(e,t){function r(e){return this&&this.constructor===r?(this._keys=[],this._values=[],this._itp=[],this.objectOnly=t,void(e&&n.call(this,e))):new r(e)}return t||w(e,"size",{get:y}),e.constructor=r,r.prototype=e,r}function n(e){this.add?e.forEach(this.add,this):e.forEach(function(e){this.set(e[0],e[1])},this)}function r(e){return this.has(e)&&(this._keys.splice(g,1),this._values.splice(g,1),this._itp.forEach(function(e){g<e[0]&&e[0]--})),-1<g}function o(e){return this.has(e)?this._values[g]:void 0}function i(e,t){if(this.objectOnly&&t!==Object(t))throw new TypeError("Invalid value used as weak collection key");if(t!=t||0===t)for(g=e.length;g--&&!b(e[g],t););else g=e.indexOf(t);return-1<g}function a(e){return i.call(this,this._values,e)}function u(e){return i.call(this,this._keys,e)}function s(e,t){return this.has(e)?this._values[g]=t:this._values[this._keys.push(e)-1]=t,this}function c(e){return this.has(e)||this._values.push(e),this}function f(){(this._keys||0).length=this._values.length=0}function l(){return v(this._itp,this._keys)}function h(){return v(this._itp,this._values)}function d(){return v(this._itp,this._keys,this._values)}function p(){return v(this._itp,this._values,this._values)}function v(e,t,n){var r=[0],o=!1;return e.push(r),{next:function(){var i,a=r[0];return!o&&a<t.length?(i=n?[t[a],n[a]]:t[a],r[0]++):(o=!0,e.splice(e.indexOf(r),1)),{done:o,value:i}}}}function y(){return this._values.length}function m(e,t){for(var n=this.entries();;){var r=n.next();if(r.done)break;e.call(t,r.value[1],r.value[0],this)}}var g,w=Object.defineProperty,b=function(e,t){return e===t||e!==e&&t!==t};"undefined"==typeof WeakMap&&(e.WeakMap=t({delete:r,clear:f,get:o,has:u,set:s},!0)),"undefined"!=typeof Map&&"function"==typeof(new Map).values&&(new Map).values().next||(e.Map=t({delete:r,has:u,get:o,set:s,keys:l,values:h,entries:d,forEach:m,clear:f})),"undefined"!=typeof Set&&"function"==typeof(new Set).values&&(new Set).values().next||(e.Set=t({has:a,add:c,delete:r,clear:f,keys:h,values:h,entries:p,forEach:m})),"undefined"==typeof WeakSet&&(e.WeakSet=t({delete:r,add:c,clear:f,has:a},!0))}("undefined"!=typeof t&&"undefined"!=typeof w?w:window)}),e(function(e){!function(t,n,r){n[t]=n[t]||r(),"undefined"!=typeof e&&e.exports?e.exports=n[t]:"function"==typeof define&&define.amd&&define(function(){return n[t]})}("Promise","undefined"!=typeof w?w:w,function(){function e(e,t){h.add(e,t),l||(l=p(h.drain))}function t(e){var t,n=typeof e;return null==e||"object"!=n&&"function"!=n||(t=e.then),"function"==typeof t&&t}function n(){for(var e=0;e<this.chain.length;e++)r(this,1===this.state?this.chain[e].success:this.chain[e].failure,this.chain[e]);this.chain.length=0}function r(e,n,r){var o,i;try{n===!1?r.reject(e.msg):(o=n===!0?e.msg:n.call(void 0,e.msg),o===r.promise?r.reject(TypeError("Promise-chain cycle")):(i=t(o))?i.call(o,r.resolve,r.reject):r.resolve(o))}catch(e){r.reject(e)}}function o(r){var a,s=this;if(!s.triggered){s.triggered=!0,s.def&&(s=s.def);try{(a=t(r))?e(function(){var e=new u(s);try{a.call(r,function(){o.apply(e,arguments)},function(){i.apply(e,arguments)})}catch(t){i.call(e,t)}}):(s.msg=r,s.state=1,s.chain.length>0&&e(n,s))}catch(e){i.call(new u(s),e)}}}function i(t){var r=this;r.triggered||(r.triggered=!0,r.def&&(r=r.def),r.msg=t,r.state=2,r.chain.length>0&&e(n,r))}function a(e,t,n,r){for(var o=0;o<t.length;o++)!function(o){e.resolve(t[o]).then(function(e){n(o,e)},r)}(o)}function u(e){this.def=e,this.triggered=!1}function s(e){this.promise=e,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function c(t){if("function"!=typeof t)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var r=new s(this);this.then=function(t,o){var i={success:"function"!=typeof t||t,failure:"function"==typeof o&&o};return i.promise=new this.constructor(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");i.resolve=e,i.reject=t}),r.chain.push(i),0!==r.state&&e(n,r),i.promise},this.catch=function(e){return this.then(void 0,e)};try{t.call(void 0,function(e){o.call(r,e)},function(e){i.call(r,e)})}catch(e){i.call(r,e)}}var f,l,h,d=Object.prototype.toString,p="undefined"!=typeof setImmediate?function(e){return setImmediate(e)}:setTimeout;try{Object.defineProperty({},"x",{}),f=function(e,t,n,r){return Object.defineProperty(e,t,{value:n,writable:!0,configurable:r!==!1})}}catch(e){f=function(e,t,n){return e[t]=n,e}}h=function(){function e(e,t){this.fn=e,this.self=t,this.next=void 0}var t,n,r;return{add:function(o,i){r=new e(o,i),n?n.next=r:t=r,n=r,r=void 0},drain:function(){var e=t;for(t=n=l=void 0;e;)e.fn.call(e.self),e=e.next}}}();var v=f({},"constructor",c,!1);return c.prototype=v,f(v,"__NPO__",0,!1),f(c,"resolve",function(e){var t=this;return e&&"object"==typeof e&&1===e.__NPO__?e:new t(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");t(e)})}),f(c,"reject",function(e){return new this(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");n(e)})}),f(c,"all",function(e){var t=this;return"[object Array]"!=d.call(e)?t.reject(TypeError("Not an array")):0===e.length?t.resolve([]):new t(function(n,r){if("function"!=typeof n||"function"!=typeof r)throw TypeError("Not a function");var o=e.length,i=Array(o),u=0;a(t,e,function(e,t){i[e]=t,++u===o&&n(i)},r)})}),f(c,"race",function(e){var t=this;return"[object Array]"!=d.call(e)?t.reject(TypeError("Not an array")):new t(function(n,r){if("function"!=typeof n||"function"!=typeof r)throw TypeError("Not a function");a(t,e,function(e,t){n(t)},r)})}),c})})),E=b&&"object"==typeof b&&"default"in b?b.default:b,T=new WeakMap,_=["id","url","width","maxwidth","height","maxheight","portrait","title","byline","color","autoplay","autopause","loop","responsive"],k=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},x=new WeakMap,j=new WeakMap,Player=function(){function Player(e){var t=this,n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(k(this,Player),window.jQuery&&e instanceof jQuery&&(e.length>1&&window.console&&console.warn&&console.warn("A jQuery object with multiple elements was passed, using the first element."),e=e[0]),"string"==typeof e&&(e=document.getElementById(e)),!a(e))throw new TypeError("You must pass either a valid element or a valid id.");if("IFRAME"!==e.nodeName){var r=e.querySelector("iframe");r&&(e=r)}if("IFRAME"===e.nodeName&&!s(e.getAttribute("src")||""))throw new Error("The player element passed isn’t a Vimeo embed.");if(x.has(e))return x.get(e);this.element=e,this.origin="*";var i=new E(function(r,i){var a=function(e){if(s(e.origin)&&t.element.contentWindow===e.source){"*"===t.origin&&(t.origin=e.origin);var n=p(e.data),o="event"in n&&"ready"===n.event,i="method"in n&&"ping"===n.method;return o||i?(t.element.setAttribute("data-ready","true"),void r()):void y(t,n)}};if(window.addEventListener?window.addEventListener("message",a,!1):window.attachEvent&&window.attachEvent("onmessage",a),"IFRAME"!==t.element.nodeName){var u=f(e,n),d=c(u);l(d,u).then(function(n){var r=h(n,e);return t.element=r,o(e,r),n}).catch(function(e){return i(e)})}});return j.set(this,i),x.set(this.element,this),"IFRAME"===this.element.nodeName&&v(this,"ping"),this}return Player.prototype.then=function(e){var t=arguments.length<=1||void 0===arguments[1]?function(){}:arguments[1];return this.ready().then(e,t)},Player.prototype.callMethod=function(e){var n=this,r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return new E(function(o,i){return n.ready().then(function(){t(n,e,{resolve:o,reject:i}),v(n,e,r)})})},Player.prototype.get=function(e){var n=this;return new E(function(r,o){return e=i(e,"get"),n.ready().then(function(){t(n,e,{resolve:r,reject:o}),v(n,e)})})},Player.prototype.set=function(e,n){var r=this;return E.resolve(n).then(function(n){if(e=i(e,"set"),void 0===n||null===n)throw new TypeError("There must be a value to set.");return r.ready().then(function(){return new E(function(o,i){t(r,e,{resolve:o,reject:i}),v(r,e,n)})})})},Player.prototype.on=function(e,r){if(!e)throw new TypeError("You must pass an event name.");if(!r)throw new TypeError("You must pass a callback function.");if("function"!=typeof r)throw new TypeError("The callback must be a function.");var o=n(this,"event:"+e);0===o.length&&this.callMethod("addEventListener",e).catch(function(){}),t(this,"event:"+e,r)},Player.prototype.off=function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(t&&"function"!=typeof t)throw new TypeError("The callback must be a function.");var n=r(this,"event:"+e,t);n&&this.callMethod("removeEventListener",e).catch(function(e){})},Player.prototype.loadVideo=function(e){return this.callMethod("loadVideo",e)},Player.prototype.ready=function(){var e=j.get(this);return E.resolve(e)},Player.prototype.enableTextTrack=function(e,t){if(!e)throw new TypeError("You must pass a language.");return this.callMethod("enableTextTrack",{language:e,kind:t})},Player.prototype.disableTextTrack=function(){return this.callMethod("disableTextTrack")},Player.prototype.pause=function(){return this.callMethod("pause")},Player.prototype.play=function(){return this.callMethod("play")},Player.prototype.unload=function(){return this.callMethod("unload")},Player.prototype.getAutopause=function(){return this.get("autopause")},Player.prototype.setAutopause=function(e){return this.set("autopause",e)},Player.prototype.getColor=function(){return this.get("color")},Player.prototype.setColor=function(e){return this.set("color",e)},Player.prototype.getCurrentTime=function(){return this.get("currentTime")},Player.prototype.setCurrentTime=function(e){return this.set("currentTime",e)},Player.prototype.getDuration=function(){return this.get("duration")},Player.prototype.getEnded=function(){return this.get("ended")},Player.prototype.getLoop=function(){return this.get("loop")},Player.prototype.setLoop=function(e){return this.set("loop",e)},Player.prototype.getPaused=function(){return this.get("paused")},Player.prototype.getTextTracks=function(){return this.get("textTracks")},Player.prototype.getVideoEmbedCode=function(){return this.get("videoEmbedCode")},Player.prototype.getVideoId=function(){return this.get("videoId")},Player.prototype.getVideoTitle=function(){return this.get("videoTitle")},Player.prototype.getVideoWidth=function(){return this.get("videoWidth")},Player.prototype.getVideoHeight=function(){return this.get("videoHeight")},Player.prototype.getVideoUrl=function(){return this.get("videoUrl")},Player.prototype.getVolume=function(){return this.get("volume")},Player.prototype.setVolume=function(e){return this.set("volume",e)},Player}();return d(),Player});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _player = require('@vimeo/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');
var cssInjected = false;

/**
 * Vimeo - Wrapper for Video Player API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Tech
 * @class Vimeo
 */

var Vimeo = function (_Tech) {
  _inherits(Vimeo, _Tech);

  function Vimeo(options, ready) {
    _classCallCheck(this, Vimeo);

    var _this = _possibleConstructorReturn(this, _Tech.call(this, options, ready));

    injectCss();
    _this.setPoster(options.poster);
    _this.initVimeoPlayer();
    return _this;
  }

  Vimeo.prototype.initVimeoPlayer = function initVimeoPlayer() {
    var _this2 = this;

    var vimeoOptions = {
      url: this.options_.source.src,
      byline: false,
      portrait: false,
      title: false
    };

    if (this.options_.autoplay) {
      vimeoOptions.autoplay = true;
    }
    if (this.options_.height) {
      vimeoOptions.height = this.options_.height;
    }
    if (this.options_.width) {
      vimeoOptions.width = this.options_.width;
    }
    if (this.options_.maxheight) {
      vimeoOptions.maxheight = this.options_.maxheight;
    }
    if (this.options_.maxwidth) {
      vimeoOptions.maxwidth = this.options_.maxwidth;
    }
    if (this.options_.loop) {
      vimeoOptions.loop = this.options_.loop;
    }

    this._player = new _player2.default(this.el(), vimeoOptions);
    this.initVimeoState();

    ['play', 'pause', 'ended', 'timeupdate', 'progress', 'seeked'].forEach(function (e) {
      _this2._player.on(e, function (progress) {
        if (_this2._vimeoState.progress.duration != progress.duration) {
          _this2.trigger('durationchange');
        }
        _this2._vimeoState.progress = progress;
        _this2.trigger(e);
      });
    });

    this._player.on('pause', function () {
      return _this2._vimeoState.playing = false;
    });
    this._player.on('play', function () {
      _this2._vimeoState.playing = true;
      _this2._vimeoState.ended = false;
    });
    this._player.on('ended', function () {
      _this2._vimeoState.playing = false;
      _this2._vimeoState.ended = true;
    });
    this._player.on('volumechange', function (v) {
      return _this2._vimeoState.volume = v;
    });
    this._player.on('error', function (e) {
      return _this2.trigger('error', e);
    });

    this.triggerReady();
  };

  Vimeo.prototype.initVimeoState = function initVimeoState() {
    var state = this._vimeoState = {
      ended: false,
      playing: false,
      volume: 0,
      progress: {
        seconds: 0,
        percent: 0,
        duration: 0
      }
    };

    this._player.getCurrentTime().then(function (time) {
      return state.progress.seconds = time;
    });
    this._player.getDuration().then(function (time) {
      return state.progress.duration = time;
    });
    this._player.getPaused().then(function (paused) {
      return state.playing = !paused;
    });
    this._player.getVolume().then(function (volume) {
      return state.volume = volume;
    });
  };

  Vimeo.prototype.createEl = function createEl() {
    var div = _video2.default.createEl('div', {
      id: this.options_.techId
    });

    div.style.cssText = 'width:100%;height:100%;top:0;left:0;position:absolute';
    div.className = 'vjs-vimeo';

    return div;
  };

  Vimeo.prototype.controls = function controls() {
    return true;
  };

  Vimeo.prototype.supportsFullScreen = function supportsFullScreen() {
    return true;
  };

  Vimeo.prototype.src = function src() {
    // @note: Not sure why this is needed but videojs requires it
    return this.options_.source;
  };

  Vimeo.prototype.currentSrc = function currentSrc() {
    return this.options_.source.src;
  };

  // @note setSrc is used in other usecases (YouTube, Html) it doesn't seem required here
  // setSrc() {}

  Vimeo.prototype.currentTime = function currentTime() {
    return this._vimeoState.progress.seconds;
  };

  Vimeo.prototype.setCurrentTime = function setCurrentTime(time) {
    this._player.setCurrentTime(time);
  };

  Vimeo.prototype.volume = function volume() {
    return this._vimeoState.volume;
  };

  Vimeo.prototype.setVolume = function setVolume(v) {
    return this._player.setVolume(volume);
  };

  Vimeo.prototype.duration = function duration() {
    return this._vimeoState.progress.duration;
  };

  Vimeo.prototype.buffered = function buffered() {
    var progress = this._vimeoState.progress;
    return _video2.default.createTimeRange(0, progress.percent * progress.duration);
  };

  Vimeo.prototype.paused = function paused() {
    return !this._vimeoState.playing;
  };

  Vimeo.prototype.pause = function pause() {
    this._player.pause();
  };

  Vimeo.prototype.play = function play() {
    this._player.play();
  };

  Vimeo.prototype.muted = function muted() {
    return this._vimeoState.volume === 0;
  };

  Vimeo.prototype.ended = function ended() {
    return this._vimeoState.ended;
  };

  // Vimeo does has a mute API and native controls aren't being used,
  // so setMuted doesn't really make sense and shouldn't be called.
  // setMuted(mute) {}


  return Vimeo;
}(Tech);

Vimeo.prototype.featuresTimeupdateEvents = true;

Vimeo.isSupported = function () {
  return true;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Vimeo);

Vimeo.nativeSourceHandler = {};

/**
 * Check if Vimeo can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'maybe', or '' (empty string)
 */
Vimeo.nativeSourceHandler.canPlayType = function (source) {
  if (source === 'video/vimeo') {
    return 'maybe';
  }

  return '';
};

/*
 * Check Vimeo can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'maybe', or '' (empty string)
 * @note: Copied over from YouTube — not sure this is relevant
 */
Vimeo.nativeSourceHandler.canHandleSource = function (source) {
  if (source.type) {
    return Vimeo.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Vimeo.nativeSourceHandler.canPlayType(source.src);
  }

  return '';
};

// @note: Copied over from YouTube — not sure this is relevant
Vimeo.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

// @note: Copied over from YouTube — not sure this is relevant
Vimeo.nativeSourceHandler.dispose = function () {};

Vimeo.registerSourceHandler(Vimeo.nativeSourceHandler);

// Since the iframe can't be touched using Vimeo's way of embedding,
// let's add a new styling rule to have the same style as `vjs-tech`
function injectCss() {
  if (cssInjected) {
    return;
  }
  cssInjected = true;
  var css = '\n      .vjs-vimeo iframe {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n      }\n    ';
  var head = document.head || document.getElementsByTagName('head')[0];

  var style = document.createElement('style');
  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
}

//Component.registerComponent('Vimeo', Vimeo);
//Tech.registerTech('Vimeo', Vimeo);
if (typeof Tech.registerTech !== 'undefined') { Tech.registerTech('Vimeo', Vimeo); } else { Component.registerComponent('Vimeo', Vimeo); }

// Include the version number.
Vimeo.VERSION = '0.0.1';

exports.default = Vimeo;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"@vimeo/player":1}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsaWJzL3ZpZGVvanMtdmltZW8uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIHZpZGVvanMtdmltZW9cclxuICogQHZlcnNpb24gMy4wLjBcclxuICogQGNvcHlyaWdodCAyMDE2IEJlbm9pdCBUcmVtYmxheSA8dHJlbWJsLmJlbkBnbWFpbC5jb20+XHJcbiAqIEBsaWNlbnNlIE1JVFxyXG4gKi9cclxuKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcudmlkZW9qc1ZpbWVvID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4oZnVuY3Rpb24gKGdsb2JhbCl7XHJcbi8qISBAdmltZW8vcGxheWVyIHYxLjAuNiB8IChjKSAyMDE2IFZpbWVvIHwgTUlUIExpY2Vuc2UgfCBodHRwczovL2dpdGh1Yi5jb20vdmltZW8vcGxheWVyLmpzICovXHJcbiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOihlLlZpbWVvPWUuVmltZW98fHt9LGUuVmltZW8uUGxheWVyPXQoKSl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKGUsdCl7cmV0dXJuIHQ9e2V4cG9ydHM6e319LGUodCx0LmV4cG9ydHMpLHQuZXhwb3J0c31mdW5jdGlvbiB0KGUsdCxuKXt2YXIgcj1ULmdldChlLmVsZW1lbnQpfHx7fTt0IGluIHJ8fChyW3RdPVtdKSxyW3RdLnB1c2gobiksVC5zZXQoZS5lbGVtZW50LHIpfWZ1bmN0aW9uIG4oZSx0KXt2YXIgbj1ULmdldChlLmVsZW1lbnQpfHx7fTtyZXR1cm4gblt0XXx8W119ZnVuY3Rpb24gcihlLHQsbil7dmFyIHI9VC5nZXQoZS5lbGVtZW50KXx8e307aWYoIXJbdF0pcmV0dXJuITA7aWYoIW4pcmV0dXJuIHJbdF09W10sVC5zZXQoZS5lbGVtZW50LHIpLCEwO3ZhciBvPXJbdF0uaW5kZXhPZihuKTtyZXR1cm4gbyE9PS0xJiZyW3RdLnNwbGljZShvLDEpLFQuc2V0KGUuZWxlbWVudCxyKSxyW3RdJiYwPT09clt0XS5sZW5ndGh9ZnVuY3Rpb24gbyhlLHQpe3ZhciBuPVQuZ2V0KGUpO1Quc2V0KHQsbiksVC5kZWxldGUoZSl9ZnVuY3Rpb24gaShlLHQpe3JldHVybiAwPT09ZS5pbmRleE9mKHQudG9Mb3dlckNhc2UoKSk/ZTpcIlwiK3QudG9Mb3dlckNhc2UoKStlLnN1YnN0cigwLDEpLnRvVXBwZXJDYXNlKCkrZS5zdWJzdHIoMSl9ZnVuY3Rpb24gYShlKXtyZXR1cm4gZSBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MRWxlbWVudH1mdW5jdGlvbiB1KGUpe3JldHVybiFpc05hTihwYXJzZUZsb2F0KGUpKSYmaXNGaW5pdGUoZSkmJk1hdGguZmxvb3IoZSk9PWV9ZnVuY3Rpb24gcyhlKXtyZXR1cm4vXihodHRwcz86KT9cXC9cXC8ocGxheWVyLik/dmltZW8uY29tKD89JHxcXC8pLy50ZXN0KGUpfWZ1bmN0aW9uIGMoKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/e306YXJndW1lbnRzWzBdLHQ9ZS5pZCxuPWUudXJsLHI9dHx8bjtpZighcil0aHJvdyBuZXcgRXJyb3IoXCJBbiBpZCBvciB1cmwgbXVzdCBiZSBwYXNzZWQsIGVpdGhlciBpbiBhbiBvcHRpb25zIG9iamVjdCBvciBhcyBhIGRhdGEtdmltZW8taWQgb3IgZGF0YS12aW1lby11cmwgYXR0cmlidXRlLlwiKTtpZih1KHIpKXJldHVyblwiaHR0cHM6Ly92aW1lby5jb20vXCIrcjtpZihzKHIpKXJldHVybiByLnJlcGxhY2UoXCJodHRwOlwiLFwiaHR0cHM6XCIpO2lmKHQpdGhyb3cgbmV3IFR5cGVFcnJvcihcIuKAnFwiK3QrXCLigJ0gaXMgbm90IGEgdmFsaWQgdmlkZW8gaWQuXCIpO3Rocm93IG5ldyBUeXBlRXJyb3IoXCLigJxcIityK1wi4oCdIGlzIG5vdCBhIHZpbWVvLmNvbSB1cmwuXCIpfWZ1bmN0aW9uIGYoZSl7Zm9yKHZhciB0PWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV0sbj1fLHI9QXJyYXkuaXNBcnJheShuKSxvPTAsbj1yP246bltTeW1ib2wuaXRlcmF0b3JdKCk7Oyl7dmFyIGk7aWYocil7aWYobz49bi5sZW5ndGgpYnJlYWs7aT1uW28rK119ZWxzZXtpZihvPW4ubmV4dCgpLG8uZG9uZSlicmVhaztpPW8udmFsdWV9dmFyIGE9aSx1PWUuZ2V0QXR0cmlidXRlKFwiZGF0YS12aW1lby1cIithKTsodXx8XCJcIj09PXUpJiYodFthXT1cIlwiPT09dT8xOnUpfXJldHVybiB0fWZ1bmN0aW9uIGwoZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXTtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24obixyKXtpZighcyhlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwi4oCcXCIrZStcIuKAnSBpcyBub3QgYSB2aW1lby5jb20gdXJsLlwiKTt2YXIgbz1cImh0dHBzOi8vdmltZW8uY29tL2FwaS9vZW1iZWQuanNvbj91cmw9XCIrZW5jb2RlVVJJQ29tcG9uZW50KGUpO2Zvcih2YXIgaSBpbiB0KXQuaGFzT3duUHJvcGVydHkoaSkmJihvKz1cIiZcIitpK1wiPVwiK2VuY29kZVVSSUNvbXBvbmVudCh0W2ldKSk7dmFyIGE9XCJYRG9tYWluUmVxdWVzdFwiaW4gd2luZG93P25ldyBYRG9tYWluUmVxdWVzdDpuZXcgWE1MSHR0cFJlcXVlc3Q7YS5vcGVuKFwiR0VUXCIsbywhMCksYS5vbmxvYWQ9ZnVuY3Rpb24oKXtpZig0MDQ9PT1hLnN0YXR1cylyZXR1cm4gdm9pZCByKG5ldyBFcnJvcihcIuKAnFwiK2UrXCLigJ0gd2FzIG5vdCBmb3VuZC5cIikpO2lmKDQwMz09PWEuc3RhdHVzKXJldHVybiB2b2lkIHIobmV3IEVycm9yKFwi4oCcXCIrZStcIuKAnSBpcyBub3QgZW1iZWRkYWJsZS5cIikpO3RyeXt2YXIgdD1KU09OLnBhcnNlKGEucmVzcG9uc2VUZXh0KTtuKHQpfWNhdGNoKGUpe3IoZSl9fSxhLm9uZXJyb3I9ZnVuY3Rpb24oKXt2YXIgZT1hLnN0YXR1cz9cIiAoXCIrYS5zdGF0dXMrXCIpXCI6XCJcIjtyKG5ldyBFcnJvcihcIlRoZXJlIHdhcyBhbiBlcnJvciBmZXRjaGluZyB0aGUgZW1iZWQgY29kZSBmcm9tIFZpbWVvXCIrZStcIi5cIikpfSxhLnNlbmQoKX0pfWZ1bmN0aW9uIGgoZSx0KXt2YXIgbj1lLmh0bWw7aWYoIXQpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFuIGVsZW1lbnQgbXVzdCBiZSBwcm92aWRlZFwiKTtpZihudWxsIT09dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZpbWVvLWluaXRpYWxpemVkXCIpKXJldHVybiB0LnF1ZXJ5U2VsZWN0b3IoXCJpZnJhbWVcIik7dmFyIHI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gci5pbm5lckhUTUw9bix0LmFwcGVuZENoaWxkKHIuZmlyc3RDaGlsZCksdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZpbWVvLWluaXRpYWxpemVkXCIsXCJ0cnVlXCIpLHQucXVlcnlTZWxlY3RvcihcImlmcmFtZVwiKX1mdW5jdGlvbiBkKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP2RvY3VtZW50OmFyZ3VtZW50c1swXSx0PVtdLnNsaWNlLmNhbGwoZS5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtdmltZW8taWRdLCBbZGF0YS12aW1lby11cmxdXCIpKSxuPWZ1bmN0aW9uKGUpe1wiY29uc29sZVwiaW4gd2luZG93JiZjb25zb2xlLmVycm9yJiZjb25zb2xlLmVycm9yKFwiVGhlcmUgd2FzIGFuIGVycm9yIGNyZWF0aW5nIGFuIGVtYmVkOiBcIitlKX0scj1mdW5jdGlvbigpe2lmKGkpe2lmKGE+PW8ubGVuZ3RoKXJldHVyblwiYnJlYWtcIjt1PW9bYSsrXX1lbHNle2lmKGE9by5uZXh0KCksYS5kb25lKXJldHVyblwiYnJlYWtcIjt1PWEudmFsdWV9dmFyIGU9dTt0cnl7aWYobnVsbCE9PWUuZ2V0QXR0cmlidXRlKFwiZGF0YS12aW1lby1kZWZlclwiKSlyZXR1cm5cImNvbnRpbnVlXCI7dmFyIHQ9ZihlKSxyPWModCk7bChyLHQpLnRoZW4oZnVuY3Rpb24odCl7cmV0dXJuIGgodCxlKX0pLmNhdGNoKG4pfWNhdGNoKGUpe24oZSl9fTtlOmZvcih2YXIgbz10LGk9QXJyYXkuaXNBcnJheShvKSxhPTAsbz1pP286b1tTeW1ib2wuaXRlcmF0b3JdKCk7Oyl7dmFyIHUscz1yKCk7c3dpdGNoKHMpe2Nhc2VcImJyZWFrXCI6YnJlYWsgZTtjYXNlXCJjb250aW51ZVwiOmNvbnRpbnVlfX19ZnVuY3Rpb24gcChlKXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9SlNPTi5wYXJzZShlKSksZX1mdW5jdGlvbiB2KGUsdCxuKXtpZihlLmVsZW1lbnQuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSl7dmFyIHI9e21ldGhvZDp0fTt2b2lkIDAhPT1uJiYoci52YWx1ZT1uKTt2YXIgbz1wYXJzZUZsb2F0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eLiptc2llIChcXGQrKS4qJC8sXCIkMVwiKSk7bz49OCYmbzwxMCYmKHI9SlNPTi5zdHJpbmdpZnkocikpLGUuZWxlbWVudC5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKHIsZS5vcmlnaW4pfX1mdW5jdGlvbiB5KGUsdCl7dD1wKHQpO3ZhciBvPVtdLGk9dm9pZCAwO2lmKHQuZXZlbnQpe2lmKFwiZXJyb3JcIj09PXQuZXZlbnQpZm9yKHZhciBhPW4oZSx0LmRhdGEubWV0aG9kKSx1PWEscz1BcnJheS5pc0FycmF5KHUpLGM9MCx1PXM/dTp1W1N5bWJvbC5pdGVyYXRvcl0oKTs7KXt2YXIgZjtpZihzKXtpZihjPj11Lmxlbmd0aClicmVhaztmPXVbYysrXX1lbHNle2lmKGM9dS5uZXh0KCksYy5kb25lKWJyZWFrO2Y9Yy52YWx1ZX12YXIgbD1mLGg9bmV3IEVycm9yKHQuZGF0YS5tZXNzYWdlKTtoLm5hbWU9dC5kYXRhLm5hbWUsbC5yZWplY3QoaCkscihlLHQuZGF0YS5tZXRob2QsbCl9bz1uKGUsXCJldmVudDpcIit0LmV2ZW50KSxpPXQuZGF0YX1lbHNlIHQubWV0aG9kJiYobz1uKGUsdC5tZXRob2QpLGk9dC52YWx1ZSxyKGUsdC5tZXRob2QpKTtmb3IodmFyIGQ9byx2PUFycmF5LmlzQXJyYXkoZCkseT0wLGQ9dj9kOmRbU3ltYm9sLml0ZXJhdG9yXSgpOzspe3ZhciBtO2lmKHYpe2lmKHk+PWQubGVuZ3RoKWJyZWFrO209ZFt5KytdfWVsc2V7aWYoeT1kLm5leHQoKSx5LmRvbmUpYnJlYWs7bT15LnZhbHVlfXZhciBnPW07dHJ5e2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGcpe2cuY2FsbChlLGkpO2NvbnRpbnVlfWcucmVzb2x2ZShpKX1jYXRjaChlKXt9fX12YXIgbT1cInVuZGVmaW5lZFwiIT10eXBlb2YgQXJyYXkucHJvdG90eXBlLmluZGV4T2YsZz1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93LnBvc3RNZXNzYWdlO2lmKCFtfHwhZyl0aHJvdyBuZXcgRXJyb3IoXCJTb3JyeSwgdGhlIFZpbWVvIFBsYXllciBBUEkgaXMgbm90IGF2YWlsYWJsZSBpbiB0aGlzIGJyb3dzZXIuXCIpO3ZhciB3PVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6e30sYj0oZShmdW5jdGlvbihlLHQpeyFmdW5jdGlvbihlKXtmdW5jdGlvbiB0KGUsdCl7ZnVuY3Rpb24gcihlKXtyZXR1cm4gdGhpcyYmdGhpcy5jb25zdHJ1Y3Rvcj09PXI/KHRoaXMuX2tleXM9W10sdGhpcy5fdmFsdWVzPVtdLHRoaXMuX2l0cD1bXSx0aGlzLm9iamVjdE9ubHk9dCx2b2lkKGUmJm4uY2FsbCh0aGlzLGUpKSk6bmV3IHIoZSl9cmV0dXJuIHR8fHcoZSxcInNpemVcIix7Z2V0Onl9KSxlLmNvbnN0cnVjdG9yPXIsci5wcm90b3R5cGU9ZSxyfWZ1bmN0aW9uIG4oZSl7dGhpcy5hZGQ/ZS5mb3JFYWNoKHRoaXMuYWRkLHRoaXMpOmUuZm9yRWFjaChmdW5jdGlvbihlKXt0aGlzLnNldChlWzBdLGVbMV0pfSx0aGlzKX1mdW5jdGlvbiByKGUpe3JldHVybiB0aGlzLmhhcyhlKSYmKHRoaXMuX2tleXMuc3BsaWNlKGcsMSksdGhpcy5fdmFsdWVzLnNwbGljZShnLDEpLHRoaXMuX2l0cC5mb3JFYWNoKGZ1bmN0aW9uKGUpe2c8ZVswXSYmZVswXS0tfSkpLC0xPGd9ZnVuY3Rpb24gbyhlKXtyZXR1cm4gdGhpcy5oYXMoZSk/dGhpcy5fdmFsdWVzW2ddOnZvaWQgMH1mdW5jdGlvbiBpKGUsdCl7aWYodGhpcy5vYmplY3RPbmx5JiZ0IT09T2JqZWN0KHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIHZhbHVlIHVzZWQgYXMgd2VhayBjb2xsZWN0aW9uIGtleVwiKTtpZih0IT10fHwwPT09dClmb3IoZz1lLmxlbmd0aDtnLS0mJiFiKGVbZ10sdCk7KTtlbHNlIGc9ZS5pbmRleE9mKHQpO3JldHVybi0xPGd9ZnVuY3Rpb24gYShlKXtyZXR1cm4gaS5jYWxsKHRoaXMsdGhpcy5fdmFsdWVzLGUpfWZ1bmN0aW9uIHUoZSl7cmV0dXJuIGkuY2FsbCh0aGlzLHRoaXMuX2tleXMsZSl9ZnVuY3Rpb24gcyhlLHQpe3JldHVybiB0aGlzLmhhcyhlKT90aGlzLl92YWx1ZXNbZ109dDp0aGlzLl92YWx1ZXNbdGhpcy5fa2V5cy5wdXNoKGUpLTFdPXQsdGhpc31mdW5jdGlvbiBjKGUpe3JldHVybiB0aGlzLmhhcyhlKXx8dGhpcy5fdmFsdWVzLnB1c2goZSksdGhpc31mdW5jdGlvbiBmKCl7KHRoaXMuX2tleXN8fDApLmxlbmd0aD10aGlzLl92YWx1ZXMubGVuZ3RoPTB9ZnVuY3Rpb24gbCgpe3JldHVybiB2KHRoaXMuX2l0cCx0aGlzLl9rZXlzKX1mdW5jdGlvbiBoKCl7cmV0dXJuIHYodGhpcy5faXRwLHRoaXMuX3ZhbHVlcyl9ZnVuY3Rpb24gZCgpe3JldHVybiB2KHRoaXMuX2l0cCx0aGlzLl9rZXlzLHRoaXMuX3ZhbHVlcyl9ZnVuY3Rpb24gcCgpe3JldHVybiB2KHRoaXMuX2l0cCx0aGlzLl92YWx1ZXMsdGhpcy5fdmFsdWVzKX1mdW5jdGlvbiB2KGUsdCxuKXt2YXIgcj1bMF0sbz0hMTtyZXR1cm4gZS5wdXNoKHIpLHtuZXh0OmZ1bmN0aW9uKCl7dmFyIGksYT1yWzBdO3JldHVybiFvJiZhPHQubGVuZ3RoPyhpPW4/W3RbYV0sblthXV06dFthXSxyWzBdKyspOihvPSEwLGUuc3BsaWNlKGUuaW5kZXhPZihyKSwxKSkse2RvbmU6byx2YWx1ZTppfX19fWZ1bmN0aW9uIHkoKXtyZXR1cm4gdGhpcy5fdmFsdWVzLmxlbmd0aH1mdW5jdGlvbiBtKGUsdCl7Zm9yKHZhciBuPXRoaXMuZW50cmllcygpOzspe3ZhciByPW4ubmV4dCgpO2lmKHIuZG9uZSlicmVhaztlLmNhbGwodCxyLnZhbHVlWzFdLHIudmFsdWVbMF0sdGhpcyl9fXZhciBnLHc9T2JqZWN0LmRlZmluZVByb3BlcnR5LGI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT09PXR8fGUhPT1lJiZ0IT09dH07XCJ1bmRlZmluZWRcIj09dHlwZW9mIFdlYWtNYXAmJihlLldlYWtNYXA9dCh7ZGVsZXRlOnIsY2xlYXI6ZixnZXQ6byxoYXM6dSxzZXQ6c30sITApKSxcInVuZGVmaW5lZFwiIT10eXBlb2YgTWFwJiZcImZ1bmN0aW9uXCI9PXR5cGVvZihuZXcgTWFwKS52YWx1ZXMmJihuZXcgTWFwKS52YWx1ZXMoKS5uZXh0fHwoZS5NYXA9dCh7ZGVsZXRlOnIsaGFzOnUsZ2V0Om8sc2V0OnMsa2V5czpsLHZhbHVlczpoLGVudHJpZXM6ZCxmb3JFYWNoOm0sY2xlYXI6Zn0pKSxcInVuZGVmaW5lZFwiIT10eXBlb2YgU2V0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZihuZXcgU2V0KS52YWx1ZXMmJihuZXcgU2V0KS52YWx1ZXMoKS5uZXh0fHwoZS5TZXQ9dCh7aGFzOmEsYWRkOmMsZGVsZXRlOnIsY2xlYXI6ZixrZXlzOmgsdmFsdWVzOmgsZW50cmllczpwLGZvckVhY2g6bX0pKSxcInVuZGVmaW5lZFwiPT10eXBlb2YgV2Vha1NldCYmKGUuV2Vha1NldD10KHtkZWxldGU6cixhZGQ6YyxjbGVhcjpmLGhhczphfSwhMCkpfShcInVuZGVmaW5lZFwiIT10eXBlb2YgdCYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHc/dzp3aW5kb3cpfSksZShmdW5jdGlvbihlKXshZnVuY3Rpb24odCxuLHIpe25bdF09blt0XXx8cigpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBlJiZlLmV4cG9ydHM/ZS5leHBvcnRzPW5bdF06XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kJiZkZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gblt0XX0pfShcIlByb21pc2VcIixcInVuZGVmaW5lZFwiIT10eXBlb2Ygdz93OncsZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCl7aC5hZGQoZSx0KSxsfHwobD1wKGguZHJhaW4pKX1mdW5jdGlvbiB0KGUpe3ZhciB0LG49dHlwZW9mIGU7cmV0dXJuIG51bGw9PWV8fFwib2JqZWN0XCIhPW4mJlwiZnVuY3Rpb25cIiE9bnx8KHQ9ZS50aGVuKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0JiZ0fWZ1bmN0aW9uIG4oKXtmb3IodmFyIGU9MDtlPHRoaXMuY2hhaW4ubGVuZ3RoO2UrKylyKHRoaXMsMT09PXRoaXMuc3RhdGU/dGhpcy5jaGFpbltlXS5zdWNjZXNzOnRoaXMuY2hhaW5bZV0uZmFpbHVyZSx0aGlzLmNoYWluW2VdKTt0aGlzLmNoYWluLmxlbmd0aD0wfWZ1bmN0aW9uIHIoZSxuLHIpe3ZhciBvLGk7dHJ5e249PT0hMT9yLnJlamVjdChlLm1zZyk6KG89bj09PSEwP2UubXNnOm4uY2FsbCh2b2lkIDAsZS5tc2cpLG89PT1yLnByb21pc2U/ci5yZWplY3QoVHlwZUVycm9yKFwiUHJvbWlzZS1jaGFpbiBjeWNsZVwiKSk6KGk9dChvKSk/aS5jYWxsKG8sci5yZXNvbHZlLHIucmVqZWN0KTpyLnJlc29sdmUobykpfWNhdGNoKGUpe3IucmVqZWN0KGUpfX1mdW5jdGlvbiBvKHIpe3ZhciBhLHM9dGhpcztpZighcy50cmlnZ2VyZWQpe3MudHJpZ2dlcmVkPSEwLHMuZGVmJiYocz1zLmRlZik7dHJ5eyhhPXQocikpP2UoZnVuY3Rpb24oKXt2YXIgZT1uZXcgdShzKTt0cnl7YS5jYWxsKHIsZnVuY3Rpb24oKXtvLmFwcGx5KGUsYXJndW1lbnRzKX0sZnVuY3Rpb24oKXtpLmFwcGx5KGUsYXJndW1lbnRzKX0pfWNhdGNoKHQpe2kuY2FsbChlLHQpfX0pOihzLm1zZz1yLHMuc3RhdGU9MSxzLmNoYWluLmxlbmd0aD4wJiZlKG4scykpfWNhdGNoKGUpe2kuY2FsbChuZXcgdShzKSxlKX19fWZ1bmN0aW9uIGkodCl7dmFyIHI9dGhpcztyLnRyaWdnZXJlZHx8KHIudHJpZ2dlcmVkPSEwLHIuZGVmJiYocj1yLmRlZiksci5tc2c9dCxyLnN0YXRlPTIsci5jaGFpbi5sZW5ndGg+MCYmZShuLHIpKX1mdW5jdGlvbiBhKGUsdCxuLHIpe2Zvcih2YXIgbz0wO288dC5sZW5ndGg7bysrKSFmdW5jdGlvbihvKXtlLnJlc29sdmUodFtvXSkudGhlbihmdW5jdGlvbihlKXtuKG8sZSl9LHIpfShvKX1mdW5jdGlvbiB1KGUpe3RoaXMuZGVmPWUsdGhpcy50cmlnZ2VyZWQ9ITF9ZnVuY3Rpb24gcyhlKXt0aGlzLnByb21pc2U9ZSx0aGlzLnN0YXRlPTAsdGhpcy50cmlnZ2VyZWQ9ITEsdGhpcy5jaGFpbj1bXSx0aGlzLm1zZz12b2lkIDB9ZnVuY3Rpb24gYyh0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO2lmKDAhPT10aGlzLl9fTlBPX18pdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgcHJvbWlzZVwiKTt0aGlzLl9fTlBPX189MTt2YXIgcj1uZXcgcyh0aGlzKTt0aGlzLnRoZW49ZnVuY3Rpb24odCxvKXt2YXIgaT17c3VjY2VzczpcImZ1bmN0aW9uXCIhPXR5cGVvZiB0fHx0LGZhaWx1cmU6XCJmdW5jdGlvblwiPT10eXBlb2YgbyYmb307cmV0dXJuIGkucHJvbWlzZT1uZXcgdGhpcy5jb25zdHJ1Y3RvcihmdW5jdGlvbihlLHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGV8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgZnVuY3Rpb25cIik7aS5yZXNvbHZlPWUsaS5yZWplY3Q9dH0pLHIuY2hhaW4ucHVzaChpKSwwIT09ci5zdGF0ZSYmZShuLHIpLGkucHJvbWlzZX0sdGhpcy5jYXRjaD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy50aGVuKHZvaWQgMCxlKX07dHJ5e3QuY2FsbCh2b2lkIDAsZnVuY3Rpb24oZSl7by5jYWxsKHIsZSl9LGZ1bmN0aW9uKGUpe2kuY2FsbChyLGUpfSl9Y2F0Y2goZSl7aS5jYWxsKHIsZSl9fXZhciBmLGwsaCxkPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcscD1cInVuZGVmaW5lZFwiIT10eXBlb2Ygc2V0SW1tZWRpYXRlP2Z1bmN0aW9uKGUpe3JldHVybiBzZXRJbW1lZGlhdGUoZSl9OnNldFRpbWVvdXQ7dHJ5e09iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSxcInhcIix7fSksZj1mdW5jdGlvbihlLHQsbixyKXtyZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsdCx7dmFsdWU6bix3cml0YWJsZTohMCxjb25maWd1cmFibGU6ciE9PSExfSl9fWNhdGNoKGUpe2Y9ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBlW3RdPW4sZX19aD1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0KXt0aGlzLmZuPWUsdGhpcy5zZWxmPXQsdGhpcy5uZXh0PXZvaWQgMH12YXIgdCxuLHI7cmV0dXJue2FkZDpmdW5jdGlvbihvLGkpe3I9bmV3IGUobyxpKSxuP24ubmV4dD1yOnQ9cixuPXIscj12b2lkIDB9LGRyYWluOmZ1bmN0aW9uKCl7dmFyIGU9dDtmb3IodD1uPWw9dm9pZCAwO2U7KWUuZm4uY2FsbChlLnNlbGYpLGU9ZS5uZXh0fX19KCk7dmFyIHY9Zih7fSxcImNvbnN0cnVjdG9yXCIsYywhMSk7cmV0dXJuIGMucHJvdG90eXBlPXYsZih2LFwiX19OUE9fX1wiLDAsITEpLGYoYyxcInJlc29sdmVcIixmdW5jdGlvbihlKXt2YXIgdD10aGlzO3JldHVybiBlJiZcIm9iamVjdFwiPT10eXBlb2YgZSYmMT09PWUuX19OUE9fXz9lOm5ldyB0KGZ1bmN0aW9uKHQsbil7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdHx8XCJmdW5jdGlvblwiIT10eXBlb2Ygbil0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvblwiKTt0KGUpfSl9KSxmKGMsXCJyZWplY3RcIixmdW5jdGlvbihlKXtyZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24odCxuKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0fHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBuKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO24oZSl9KX0pLGYoYyxcImFsbFwiLGZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiIT1kLmNhbGwoZSk/dC5yZWplY3QoVHlwZUVycm9yKFwiTm90IGFuIGFycmF5XCIpKTowPT09ZS5sZW5ndGg/dC5yZXNvbHZlKFtdKTpuZXcgdChmdW5jdGlvbihuLHIpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIG58fFwiZnVuY3Rpb25cIiE9dHlwZW9mIHIpdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgZnVuY3Rpb25cIik7dmFyIG89ZS5sZW5ndGgsaT1BcnJheShvKSx1PTA7YSh0LGUsZnVuY3Rpb24oZSx0KXtpW2VdPXQsKyt1PT09byYmbihpKX0scil9KX0pLGYoYyxcInJhY2VcIixmdW5jdGlvbihlKXt2YXIgdD10aGlzO3JldHVyblwiW29iamVjdCBBcnJheV1cIiE9ZC5jYWxsKGUpP3QucmVqZWN0KFR5cGVFcnJvcihcIk5vdCBhbiBhcnJheVwiKSk6bmV3IHQoZnVuY3Rpb24obixyKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBufHxcImZ1bmN0aW9uXCIhPXR5cGVvZiByKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO2EodCxlLGZ1bmN0aW9uKGUsdCl7bih0KX0scil9KX0pLGN9KX0pKSxFPWImJlwib2JqZWN0XCI9PXR5cGVvZiBiJiZcImRlZmF1bHRcImluIGI/Yi5kZWZhdWx0OmIsVD1uZXcgV2Vha01hcCxfPVtcImlkXCIsXCJ1cmxcIixcIndpZHRoXCIsXCJtYXh3aWR0aFwiLFwiaGVpZ2h0XCIsXCJtYXhoZWlnaHRcIixcInBvcnRyYWl0XCIsXCJ0aXRsZVwiLFwiYnlsaW5lXCIsXCJjb2xvclwiLFwiYXV0b3BsYXlcIixcImF1dG9wYXVzZVwiLFwibG9vcFwiLFwicmVzcG9uc2l2ZVwiXSxrPWZ1bmN0aW9uKGUsdCl7aWYoIShlIGluc3RhbmNlb2YgdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0seD1uZXcgV2Vha01hcCxqPW5ldyBXZWFrTWFwLFBsYXllcj1mdW5jdGlvbigpe2Z1bmN0aW9uIFBsYXllcihlKXt2YXIgdD10aGlzLG49YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXTtpZihrKHRoaXMsUGxheWVyKSx3aW5kb3cualF1ZXJ5JiZlIGluc3RhbmNlb2YgalF1ZXJ5JiYoZS5sZW5ndGg+MSYmd2luZG93LmNvbnNvbGUmJmNvbnNvbGUud2FybiYmY29uc29sZS53YXJuKFwiQSBqUXVlcnkgb2JqZWN0IHdpdGggbXVsdGlwbGUgZWxlbWVudHMgd2FzIHBhc3NlZCwgdXNpbmcgdGhlIGZpcnN0IGVsZW1lbnQuXCIpLGU9ZVswXSksXCJzdHJpbmdcIj09dHlwZW9mIGUmJihlPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUpKSwhYShlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiWW91IG11c3QgcGFzcyBlaXRoZXIgYSB2YWxpZCBlbGVtZW50IG9yIGEgdmFsaWQgaWQuXCIpO2lmKFwiSUZSQU1FXCIhPT1lLm5vZGVOYW1lKXt2YXIgcj1lLnF1ZXJ5U2VsZWN0b3IoXCJpZnJhbWVcIik7ciYmKGU9cil9aWYoXCJJRlJBTUVcIj09PWUubm9kZU5hbWUmJiFzKGUuZ2V0QXR0cmlidXRlKFwic3JjXCIpfHxcIlwiKSl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgcGxheWVyIGVsZW1lbnQgcGFzc2VkIGlzbuKAmXQgYSBWaW1lbyBlbWJlZC5cIik7aWYoeC5oYXMoZSkpcmV0dXJuIHguZ2V0KGUpO3RoaXMuZWxlbWVudD1lLHRoaXMub3JpZ2luPVwiKlwiO3ZhciBpPW5ldyBFKGZ1bmN0aW9uKHIsaSl7dmFyIGE9ZnVuY3Rpb24oZSl7aWYocyhlLm9yaWdpbikmJnQuZWxlbWVudC5jb250ZW50V2luZG93PT09ZS5zb3VyY2Upe1wiKlwiPT09dC5vcmlnaW4mJih0Lm9yaWdpbj1lLm9yaWdpbik7dmFyIG49cChlLmRhdGEpLG89XCJldmVudFwiaW4gbiYmXCJyZWFkeVwiPT09bi5ldmVudCxpPVwibWV0aG9kXCJpbiBuJiZcInBpbmdcIj09PW4ubWV0aG9kO3JldHVybiBvfHxpPyh0LmVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1yZWFkeVwiLFwidHJ1ZVwiKSx2b2lkIHIoKSk6dm9pZCB5KHQsbil9fTtpZih3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcj93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixhLCExKTp3aW5kb3cuYXR0YWNoRXZlbnQmJndpbmRvdy5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLGEpLFwiSUZSQU1FXCIhPT10LmVsZW1lbnQubm9kZU5hbWUpe3ZhciB1PWYoZSxuKSxkPWModSk7bChkLHUpLnRoZW4oZnVuY3Rpb24obil7dmFyIHI9aChuLGUpO3JldHVybiB0LmVsZW1lbnQ9cixvKGUsciksbn0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiBpKGUpfSl9fSk7cmV0dXJuIGouc2V0KHRoaXMsaSkseC5zZXQodGhpcy5lbGVtZW50LHRoaXMpLFwiSUZSQU1FXCI9PT10aGlzLmVsZW1lbnQubm9kZU5hbWUmJnYodGhpcyxcInBpbmdcIiksdGhpc31yZXR1cm4gUGxheWVyLnByb3RvdHlwZS50aGVuPWZ1bmN0aW9uKGUpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT9mdW5jdGlvbigpe306YXJndW1lbnRzWzFdO3JldHVybiB0aGlzLnJlYWR5KCkudGhlbihlLHQpfSxQbGF5ZXIucHJvdG90eXBlLmNhbGxNZXRob2Q9ZnVuY3Rpb24oZSl7dmFyIG49dGhpcyxyPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV07cmV0dXJuIG5ldyBFKGZ1bmN0aW9uKG8saSl7cmV0dXJuIG4ucmVhZHkoKS50aGVuKGZ1bmN0aW9uKCl7dChuLGUse3Jlc29sdmU6byxyZWplY3Q6aX0pLHYobixlLHIpfSl9KX0sUGxheWVyLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oZSl7dmFyIG49dGhpcztyZXR1cm4gbmV3IEUoZnVuY3Rpb24ocixvKXtyZXR1cm4gZT1pKGUsXCJnZXRcIiksbi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24oKXt0KG4sZSx7cmVzb2x2ZTpyLHJlamVjdDpvfSksdihuLGUpfSl9KX0sUGxheWVyLnByb3RvdHlwZS5zZXQ9ZnVuY3Rpb24oZSxuKXt2YXIgcj10aGlzO3JldHVybiBFLnJlc29sdmUobikudGhlbihmdW5jdGlvbihuKXtpZihlPWkoZSxcInNldFwiKSx2b2lkIDA9PT1ufHxudWxsPT09bil0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlcmUgbXVzdCBiZSBhIHZhbHVlIHRvIHNldC5cIik7cmV0dXJuIHIucmVhZHkoKS50aGVuKGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBFKGZ1bmN0aW9uKG8saSl7dChyLGUse3Jlc29sdmU6byxyZWplY3Q6aX0pLHYocixlLG4pfSl9KX0pfSxQbGF5ZXIucHJvdG90eXBlLm9uPWZ1bmN0aW9uKGUscil7aWYoIWUpdGhyb3cgbmV3IFR5cGVFcnJvcihcIllvdSBtdXN0IHBhc3MgYW4gZXZlbnQgbmFtZS5cIik7aWYoIXIpdGhyb3cgbmV3IFR5cGVFcnJvcihcIllvdSBtdXN0IHBhc3MgYSBjYWxsYmFjayBmdW5jdGlvbi5cIik7aWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygcil0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIGNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi5cIik7dmFyIG89bih0aGlzLFwiZXZlbnQ6XCIrZSk7MD09PW8ubGVuZ3RoJiZ0aGlzLmNhbGxNZXRob2QoXCJhZGRFdmVudExpc3RlbmVyXCIsZSkuY2F0Y2goZnVuY3Rpb24oKXt9KSx0KHRoaXMsXCJldmVudDpcIitlLHIpfSxQbGF5ZXIucHJvdG90eXBlLm9mZj1mdW5jdGlvbihlLHQpe2lmKCFlKXRocm93IG5ldyBUeXBlRXJyb3IoXCJZb3UgbXVzdCBwYXNzIGFuIGV2ZW50IG5hbWUuXCIpO2lmKHQmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uXCIpO3ZhciBuPXIodGhpcyxcImV2ZW50OlwiK2UsdCk7biYmdGhpcy5jYWxsTWV0aG9kKFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiLGUpLmNhdGNoKGZ1bmN0aW9uKGUpe30pfSxQbGF5ZXIucHJvdG90eXBlLmxvYWRWaWRlbz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5jYWxsTWV0aG9kKFwibG9hZFZpZGVvXCIsZSl9LFBsYXllci5wcm90b3R5cGUucmVhZHk9ZnVuY3Rpb24oKXt2YXIgZT1qLmdldCh0aGlzKTtyZXR1cm4gRS5yZXNvbHZlKGUpfSxQbGF5ZXIucHJvdG90eXBlLmVuYWJsZVRleHRUcmFjaz1mdW5jdGlvbihlLHQpe2lmKCFlKXRocm93IG5ldyBUeXBlRXJyb3IoXCJZb3UgbXVzdCBwYXNzIGEgbGFuZ3VhZ2UuXCIpO3JldHVybiB0aGlzLmNhbGxNZXRob2QoXCJlbmFibGVUZXh0VHJhY2tcIix7bGFuZ3VhZ2U6ZSxraW5kOnR9KX0sUGxheWVyLnByb3RvdHlwZS5kaXNhYmxlVGV4dFRyYWNrPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2FsbE1ldGhvZChcImRpc2FibGVUZXh0VHJhY2tcIil9LFBsYXllci5wcm90b3R5cGUucGF1c2U9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jYWxsTWV0aG9kKFwicGF1c2VcIil9LFBsYXllci5wcm90b3R5cGUucGxheT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmNhbGxNZXRob2QoXCJwbGF5XCIpfSxQbGF5ZXIucHJvdG90eXBlLnVubG9hZD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmNhbGxNZXRob2QoXCJ1bmxvYWRcIil9LFBsYXllci5wcm90b3R5cGUuZ2V0QXV0b3BhdXNlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0KFwiYXV0b3BhdXNlXCIpfSxQbGF5ZXIucHJvdG90eXBlLnNldEF1dG9wYXVzZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5zZXQoXCJhdXRvcGF1c2VcIixlKX0sUGxheWVyLnByb3RvdHlwZS5nZXRDb2xvcj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmdldChcImNvbG9yXCIpfSxQbGF5ZXIucHJvdG90eXBlLnNldENvbG9yPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnNldChcImNvbG9yXCIsZSl9LFBsYXllci5wcm90b3R5cGUuZ2V0Q3VycmVudFRpbWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5nZXQoXCJjdXJyZW50VGltZVwiKX0sUGxheWVyLnByb3RvdHlwZS5zZXRDdXJyZW50VGltZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5zZXQoXCJjdXJyZW50VGltZVwiLGUpfSxQbGF5ZXIucHJvdG90eXBlLmdldER1cmF0aW9uPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0KFwiZHVyYXRpb25cIil9LFBsYXllci5wcm90b3R5cGUuZ2V0RW5kZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5nZXQoXCJlbmRlZFwiKX0sUGxheWVyLnByb3RvdHlwZS5nZXRMb29wPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0KFwibG9vcFwiKX0sUGxheWVyLnByb3RvdHlwZS5zZXRMb29wPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnNldChcImxvb3BcIixlKX0sUGxheWVyLnByb3RvdHlwZS5nZXRQYXVzZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5nZXQoXCJwYXVzZWRcIil9LFBsYXllci5wcm90b3R5cGUuZ2V0VGV4dFRyYWNrcz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmdldChcInRleHRUcmFja3NcIil9LFBsYXllci5wcm90b3R5cGUuZ2V0VmlkZW9FbWJlZENvZGU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5nZXQoXCJ2aWRlb0VtYmVkQ29kZVwiKX0sUGxheWVyLnByb3RvdHlwZS5nZXRWaWRlb0lkPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0KFwidmlkZW9JZFwiKX0sUGxheWVyLnByb3RvdHlwZS5nZXRWaWRlb1RpdGxlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0KFwidmlkZW9UaXRsZVwiKX0sUGxheWVyLnByb3RvdHlwZS5nZXRWaWRlb1dpZHRoPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0KFwidmlkZW9XaWR0aFwiKX0sUGxheWVyLnByb3RvdHlwZS5nZXRWaWRlb0hlaWdodD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmdldChcInZpZGVvSGVpZ2h0XCIpfSxQbGF5ZXIucHJvdG90eXBlLmdldFZpZGVvVXJsPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0KFwidmlkZW9VcmxcIil9LFBsYXllci5wcm90b3R5cGUuZ2V0Vm9sdW1lPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0KFwidm9sdW1lXCIpfSxQbGF5ZXIucHJvdG90eXBlLnNldFZvbHVtZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5zZXQoXCJ2b2x1bWVcIixlKX0sUGxheWVyfSgpO3JldHVybiBkKCksUGxheWVyfSk7XHJcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxyXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuKGZ1bmN0aW9uIChnbG9iYWwpe1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG5cclxudmFyIF92aWRlbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Wyd2aWRlb2pzJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyd2aWRlb2pzJ10gOiBudWxsKTtcclxuXHJcbnZhciBfdmlkZW8yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmlkZW8pO1xyXG5cclxudmFyIF9wbGF5ZXIgPSByZXF1aXJlKCdAdmltZW8vcGxheWVyJyk7XHJcblxyXG52YXIgX3BsYXllcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbGF5ZXIpO1xyXG5cclxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cclxuXHJcbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XHJcblxyXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cclxuXHJcbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxyXG5cclxudmFyIENvbXBvbmVudCA9IF92aWRlbzIuZGVmYXVsdC5nZXRDb21wb25lbnQoJ0NvbXBvbmVudCcpO1xyXG52YXIgVGVjaCA9IF92aWRlbzIuZGVmYXVsdC5nZXRDb21wb25lbnQoJ1RlY2gnKTtcclxudmFyIGNzc0luamVjdGVkID0gZmFsc2U7XHJcblxyXG4vKipcclxuICogVmltZW8gLSBXcmFwcGVyIGZvciBWaWRlbyBQbGF5ZXIgQVBJXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9ucyBPYmplY3Qgb2Ygb3B0aW9uIG5hbWVzIGFuZCB2YWx1ZXNcclxuICogQHBhcmFtIHtGdW5jdGlvbj19IHJlYWR5IFJlYWR5IGNhbGxiYWNrIGZ1bmN0aW9uXHJcbiAqIEBleHRlbmRzIFRlY2hcclxuICogQGNsYXNzIFZpbWVvXHJcbiAqL1xyXG5cclxudmFyIFZpbWVvID0gZnVuY3Rpb24gKF9UZWNoKSB7XHJcbiAgX2luaGVyaXRzKFZpbWVvLCBfVGVjaCk7XHJcblxyXG4gIGZ1bmN0aW9uIFZpbWVvKG9wdGlvbnMsIHJlYWR5KSB7XHJcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVmltZW8pO1xyXG5cclxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9UZWNoLmNhbGwodGhpcywgb3B0aW9ucywgcmVhZHkpKTtcclxuXHJcbiAgICBpbmplY3RDc3MoKTtcclxuICAgIF90aGlzLnNldFBvc3RlcihvcHRpb25zLnBvc3Rlcik7XHJcbiAgICBfdGhpcy5pbml0VmltZW9QbGF5ZXIoKTtcclxuICAgIHJldHVybiBfdGhpcztcclxuICB9XHJcblxyXG4gIFZpbWVvLnByb3RvdHlwZS5pbml0VmltZW9QbGF5ZXIgPSBmdW5jdGlvbiBpbml0VmltZW9QbGF5ZXIoKSB7XHJcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcclxuXHJcbiAgICB2YXIgdmltZW9PcHRpb25zID0ge1xyXG4gICAgICB1cmw6IHRoaXMub3B0aW9uc18uc291cmNlLnNyYyxcclxuICAgICAgYnlsaW5lOiBmYWxzZSxcclxuICAgICAgcG9ydHJhaXQ6IGZhbHNlLFxyXG4gICAgICB0aXRsZTogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9uc18uYXV0b3BsYXkpIHtcclxuICAgICAgdmltZW9PcHRpb25zLmF1dG9wbGF5ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9wdGlvbnNfLmhlaWdodCkge1xyXG4gICAgICB2aW1lb09wdGlvbnMuaGVpZ2h0ID0gdGhpcy5vcHRpb25zXy5oZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vcHRpb25zXy53aWR0aCkge1xyXG4gICAgICB2aW1lb09wdGlvbnMud2lkdGggPSB0aGlzLm9wdGlvbnNfLndpZHRoO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub3B0aW9uc18ubWF4aGVpZ2h0KSB7XHJcbiAgICAgIHZpbWVvT3B0aW9ucy5tYXhoZWlnaHQgPSB0aGlzLm9wdGlvbnNfLm1heGhlaWdodDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9wdGlvbnNfLm1heHdpZHRoKSB7XHJcbiAgICAgIHZpbWVvT3B0aW9ucy5tYXh3aWR0aCA9IHRoaXMub3B0aW9uc18ubWF4d2lkdGg7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vcHRpb25zXy5sb29wKSB7XHJcbiAgICAgIHZpbWVvT3B0aW9ucy5sb29wID0gdGhpcy5vcHRpb25zXy5sb29wO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3BsYXllciA9IG5ldyBfcGxheWVyMi5kZWZhdWx0KHRoaXMuZWwoKSwgdmltZW9PcHRpb25zKTtcclxuICAgIHRoaXMuaW5pdFZpbWVvU3RhdGUoKTtcclxuXHJcbiAgICBbJ3BsYXknLCAncGF1c2UnLCAnZW5kZWQnLCAndGltZXVwZGF0ZScsICdwcm9ncmVzcycsICdzZWVrZWQnXS5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIF90aGlzMi5fcGxheWVyLm9uKGUsIGZ1bmN0aW9uIChwcm9ncmVzcykge1xyXG4gICAgICAgIGlmIChfdGhpczIuX3ZpbWVvU3RhdGUucHJvZ3Jlc3MuZHVyYXRpb24gIT0gcHJvZ3Jlc3MuZHVyYXRpb24pIHtcclxuICAgICAgICAgIF90aGlzMi50cmlnZ2VyKCdkdXJhdGlvbmNoYW5nZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfdGhpczIuX3ZpbWVvU3RhdGUucHJvZ3Jlc3MgPSBwcm9ncmVzcztcclxuICAgICAgICBfdGhpczIudHJpZ2dlcihlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLl9wbGF5ZXIub24oJ3BhdXNlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX3RoaXMyLl92aW1lb1N0YXRlLnBsYXlpbmcgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fcGxheWVyLm9uKCdwbGF5JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBfdGhpczIuX3ZpbWVvU3RhdGUucGxheWluZyA9IHRydWU7XHJcbiAgICAgIF90aGlzMi5fdmltZW9TdGF0ZS5lbmRlZCA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9wbGF5ZXIub24oJ2VuZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBfdGhpczIuX3ZpbWVvU3RhdGUucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICBfdGhpczIuX3ZpbWVvU3RhdGUuZW5kZWQgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9wbGF5ZXIub24oJ3ZvbHVtZWNoYW5nZScsIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgIHJldHVybiBfdGhpczIuX3ZpbWVvU3RhdGUudm9sdW1lID0gdjtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fcGxheWVyLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIHJldHVybiBfdGhpczIudHJpZ2dlcignZXJyb3InLCBlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudHJpZ2dlclJlYWR5KCk7XHJcbiAgfTtcclxuXHJcbiAgVmltZW8ucHJvdG90eXBlLmluaXRWaW1lb1N0YXRlID0gZnVuY3Rpb24gaW5pdFZpbWVvU3RhdGUoKSB7XHJcbiAgICB2YXIgc3RhdGUgPSB0aGlzLl92aW1lb1N0YXRlID0ge1xyXG4gICAgICBlbmRlZDogZmFsc2UsXHJcbiAgICAgIHBsYXlpbmc6IGZhbHNlLFxyXG4gICAgICB2b2x1bWU6IDAsXHJcbiAgICAgIHByb2dyZXNzOiB7XHJcbiAgICAgICAgc2Vjb25kczogMCxcclxuICAgICAgICBwZXJjZW50OiAwLFxyXG4gICAgICAgIGR1cmF0aW9uOiAwXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fcGxheWVyLmdldEN1cnJlbnRUaW1lKCkudGhlbihmdW5jdGlvbiAodGltZSkge1xyXG4gICAgICByZXR1cm4gc3RhdGUucHJvZ3Jlc3Muc2Vjb25kcyA9IHRpbWU7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX3BsYXllci5nZXREdXJhdGlvbigpLnRoZW4oZnVuY3Rpb24gKHRpbWUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlLnByb2dyZXNzLmR1cmF0aW9uID0gdGltZTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fcGxheWVyLmdldFBhdXNlZCgpLnRoZW4oZnVuY3Rpb24gKHBhdXNlZCkge1xyXG4gICAgICByZXR1cm4gc3RhdGUucGxheWluZyA9ICFwYXVzZWQ7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX3BsYXllci5nZXRWb2x1bWUoKS50aGVuKGZ1bmN0aW9uICh2b2x1bWUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlLnZvbHVtZSA9IHZvbHVtZTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIFZpbWVvLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uIGNyZWF0ZUVsKCkge1xyXG4gICAgdmFyIGRpdiA9IF92aWRlbzIuZGVmYXVsdC5jcmVhdGVFbCgnZGl2Jywge1xyXG4gICAgICBpZDogdGhpcy5vcHRpb25zXy50ZWNoSWRcclxuICAgIH0pO1xyXG5cclxuICAgIGRpdi5zdHlsZS5jc3NUZXh0ID0gJ3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7dG9wOjA7bGVmdDowO3Bvc2l0aW9uOmFic29sdXRlJztcclxuICAgIGRpdi5jbGFzc05hbWUgPSAndmpzLXZpbWVvJztcclxuXHJcbiAgICByZXR1cm4gZGl2O1xyXG4gIH07XHJcblxyXG4gIFZpbWVvLnByb3RvdHlwZS5jb250cm9scyA9IGZ1bmN0aW9uIGNvbnRyb2xzKCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfTtcclxuXHJcbiAgVmltZW8ucHJvdG90eXBlLnN1cHBvcnRzRnVsbFNjcmVlbiA9IGZ1bmN0aW9uIHN1cHBvcnRzRnVsbFNjcmVlbigpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH07XHJcblxyXG4gIFZpbWVvLnByb3RvdHlwZS5zcmMgPSBmdW5jdGlvbiBzcmMoKSB7XHJcbiAgICAvLyBAbm90ZTogTm90IHN1cmUgd2h5IHRoaXMgaXMgbmVlZGVkIGJ1dCB2aWRlb2pzIHJlcXVpcmVzIGl0XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zXy5zb3VyY2U7XHJcbiAgfTtcclxuXHJcbiAgVmltZW8ucHJvdG90eXBlLmN1cnJlbnRTcmMgPSBmdW5jdGlvbiBjdXJyZW50U3JjKCkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9uc18uc291cmNlLnNyYztcclxuICB9O1xyXG5cclxuICAvLyBAbm90ZSBzZXRTcmMgaXMgdXNlZCBpbiBvdGhlciB1c2VjYXNlcyAoWW91VHViZSwgSHRtbCkgaXQgZG9lc24ndCBzZWVtIHJlcXVpcmVkIGhlcmVcclxuICAvLyBzZXRTcmMoKSB7fVxyXG5cclxuICBWaW1lby5wcm90b3R5cGUuY3VycmVudFRpbWUgPSBmdW5jdGlvbiBjdXJyZW50VGltZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl92aW1lb1N0YXRlLnByb2dyZXNzLnNlY29uZHM7XHJcbiAgfTtcclxuXHJcbiAgVmltZW8ucHJvdG90eXBlLnNldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24gc2V0Q3VycmVudFRpbWUodGltZSkge1xyXG4gICAgdGhpcy5fcGxheWVyLnNldEN1cnJlbnRUaW1lKHRpbWUpO1xyXG4gIH07XHJcblxyXG4gIFZpbWVvLnByb3RvdHlwZS52b2x1bWUgPSBmdW5jdGlvbiB2b2x1bWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmltZW9TdGF0ZS52b2x1bWU7XHJcbiAgfTtcclxuXHJcbiAgVmltZW8ucHJvdG90eXBlLnNldFZvbHVtZSA9IGZ1bmN0aW9uIHNldFZvbHVtZSh2KSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGxheWVyLnNldFZvbHVtZSh2b2x1bWUpO1xyXG4gIH07XHJcblxyXG4gIFZpbWVvLnByb3RvdHlwZS5kdXJhdGlvbiA9IGZ1bmN0aW9uIGR1cmF0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZpbWVvU3RhdGUucHJvZ3Jlc3MuZHVyYXRpb247XHJcbiAgfTtcclxuXHJcbiAgVmltZW8ucHJvdG90eXBlLmJ1ZmZlcmVkID0gZnVuY3Rpb24gYnVmZmVyZWQoKSB7XHJcbiAgICB2YXIgcHJvZ3Jlc3MgPSB0aGlzLl92aW1lb1N0YXRlLnByb2dyZXNzO1xyXG4gICAgcmV0dXJuIF92aWRlbzIuZGVmYXVsdC5jcmVhdGVUaW1lUmFuZ2UoMCwgcHJvZ3Jlc3MucGVyY2VudCAqIHByb2dyZXNzLmR1cmF0aW9uKTtcclxuICB9O1xyXG5cclxuICBWaW1lby5wcm90b3R5cGUucGF1c2VkID0gZnVuY3Rpb24gcGF1c2VkKCkge1xyXG4gICAgcmV0dXJuICF0aGlzLl92aW1lb1N0YXRlLnBsYXlpbmc7XHJcbiAgfTtcclxuXHJcbiAgVmltZW8ucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gcGF1c2UoKSB7XHJcbiAgICB0aGlzLl9wbGF5ZXIucGF1c2UoKTtcclxuICB9O1xyXG5cclxuICBWaW1lby5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uIHBsYXkoKSB7XHJcbiAgICB0aGlzLl9wbGF5ZXIucGxheSgpO1xyXG4gIH07XHJcblxyXG4gIFZpbWVvLnByb3RvdHlwZS5tdXRlZCA9IGZ1bmN0aW9uIG11dGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZpbWVvU3RhdGUudm9sdW1lID09PSAwO1xyXG4gIH07XHJcblxyXG4gIFZpbWVvLnByb3RvdHlwZS5lbmRlZCA9IGZ1bmN0aW9uIGVuZGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZpbWVvU3RhdGUuZW5kZWQ7XHJcbiAgfTtcclxuXHJcbiAgLy8gVmltZW8gZG9lcyBoYXMgYSBtdXRlIEFQSSBhbmQgbmF0aXZlIGNvbnRyb2xzIGFyZW4ndCBiZWluZyB1c2VkLFxyXG4gIC8vIHNvIHNldE11dGVkIGRvZXNuJ3QgcmVhbGx5IG1ha2Ugc2Vuc2UgYW5kIHNob3VsZG4ndCBiZSBjYWxsZWQuXHJcbiAgLy8gc2V0TXV0ZWQobXV0ZSkge31cclxuXHJcblxyXG4gIHJldHVybiBWaW1lbztcclxufShUZWNoKTtcclxuXHJcblZpbWVvLnByb3RvdHlwZS5mZWF0dXJlc1RpbWV1cGRhdGVFdmVudHMgPSB0cnVlO1xyXG5cclxuVmltZW8uaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG4vLyBBZGQgU291cmNlIEhhbmRsZXIgcGF0dGVybiBmdW5jdGlvbnMgdG8gdGhpcyB0ZWNoXHJcblRlY2gud2l0aFNvdXJjZUhhbmRsZXJzKFZpbWVvKTtcclxuXHJcblZpbWVvLm5hdGl2ZVNvdXJjZUhhbmRsZXIgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBWaW1lbyBjYW4gcGxheSB0aGUgZ2l2ZW4gdmlkZW90eXBlXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gdHlwZSAgICBUaGUgbWltZXR5cGUgdG8gY2hlY2tcclxuICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICdtYXliZScsIG9yICcnIChlbXB0eSBzdHJpbmcpXHJcbiAqL1xyXG5WaW1lby5uYXRpdmVTb3VyY2VIYW5kbGVyLmNhblBsYXlUeXBlID0gZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gIGlmIChzb3VyY2UgPT09ICd2aWRlby92aW1lbycpIHtcclxuICAgIHJldHVybiAnbWF5YmUnO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuICcnO1xyXG59O1xyXG5cclxuLypcclxuICogQ2hlY2sgVmltZW8gY2FuIGhhbmRsZSB0aGUgc291cmNlIG5hdGl2ZWx5XHJcbiAqXHJcbiAqIEBwYXJhbSAge09iamVjdH0gc291cmNlICBUaGUgc291cmNlIG9iamVjdFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgJ21heWJlJywgb3IgJycgKGVtcHR5IHN0cmluZylcclxuICogQG5vdGU6IENvcGllZCBvdmVyIGZyb20gWW91VHViZSDigJQgbm90IHN1cmUgdGhpcyBpcyByZWxldmFudFxyXG4gKi9cclxuVmltZW8ubmF0aXZlU291cmNlSGFuZGxlci5jYW5IYW5kbGVTb3VyY2UgPSBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgaWYgKHNvdXJjZS50eXBlKSB7XHJcbiAgICByZXR1cm4gVmltZW8ubmF0aXZlU291cmNlSGFuZGxlci5jYW5QbGF5VHlwZShzb3VyY2UudHlwZSk7XHJcbiAgfSBlbHNlIGlmIChzb3VyY2Uuc3JjKSB7XHJcbiAgICByZXR1cm4gVmltZW8ubmF0aXZlU291cmNlSGFuZGxlci5jYW5QbGF5VHlwZShzb3VyY2Uuc3JjKTtcclxuICB9XHJcblxyXG4gIHJldHVybiAnJztcclxufTtcclxuXHJcbi8vIEBub3RlOiBDb3BpZWQgb3ZlciBmcm9tIFlvdVR1YmUg4oCUIG5vdCBzdXJlIHRoaXMgaXMgcmVsZXZhbnRcclxuVmltZW8ubmF0aXZlU291cmNlSGFuZGxlci5oYW5kbGVTb3VyY2UgPSBmdW5jdGlvbiAoc291cmNlLCB0ZWNoKSB7XHJcbiAgdGVjaC5zcmMoc291cmNlLnNyYyk7XHJcbn07XHJcblxyXG4vLyBAbm90ZTogQ29waWVkIG92ZXIgZnJvbSBZb3VUdWJlIOKAlCBub3Qgc3VyZSB0aGlzIGlzIHJlbGV2YW50XHJcblZpbWVvLm5hdGl2ZVNvdXJjZUhhbmRsZXIuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxuVmltZW8ucmVnaXN0ZXJTb3VyY2VIYW5kbGVyKFZpbWVvLm5hdGl2ZVNvdXJjZUhhbmRsZXIpO1xyXG5cclxuLy8gU2luY2UgdGhlIGlmcmFtZSBjYW4ndCBiZSB0b3VjaGVkIHVzaW5nIFZpbWVvJ3Mgd2F5IG9mIGVtYmVkZGluZyxcclxuLy8gbGV0J3MgYWRkIGEgbmV3IHN0eWxpbmcgcnVsZSB0byBoYXZlIHRoZSBzYW1lIHN0eWxlIGFzIGB2anMtdGVjaGBcclxuZnVuY3Rpb24gaW5qZWN0Q3NzKCkge1xyXG4gIGlmIChjc3NJbmplY3RlZCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBjc3NJbmplY3RlZCA9IHRydWU7XHJcbiAgdmFyIGNzcyA9ICdcXG4gICAgICAudmpzLXZpbWVvIGlmcmFtZSB7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB0b3A6IDA7XFxuICAgICAgICBsZWZ0OiAwO1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgfVxcbiAgICAnO1xyXG4gIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cclxuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xyXG5cclxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xyXG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuICB9XHJcblxyXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG59XHJcblxyXG4vL0NvbXBvbmVudC5yZWdpc3RlckNvbXBvbmVudCgnVmltZW8nLCBWaW1lbyk7XHJcbi8vVGVjaC5yZWdpc3RlclRlY2goJ1ZpbWVvJywgVmltZW8pO1xyXG5pZiAodHlwZW9mIFRlY2gucmVnaXN0ZXJUZWNoICE9PSAndW5kZWZpbmVkJykgeyBUZWNoLnJlZ2lzdGVyVGVjaCgnVmltZW8nLCBWaW1lbyk7IH0gZWxzZSB7IENvbXBvbmVudC5yZWdpc3RlckNvbXBvbmVudCgnVmltZW8nLCBWaW1lbyk7IH1cclxuXHJcbi8vIEluY2x1ZGUgdGhlIHZlcnNpb24gbnVtYmVyLlxyXG5WaW1lby5WRVJTSU9OID0gJzAuMC4xJztcclxuXHJcbmV4cG9ydHMuZGVmYXVsdCA9IFZpbWVvO1xyXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcclxufSx7XCJAdmltZW8vcGxheWVyXCI6MX1dfSx7fSxbMl0pKDIpXHJcbn0pOyJdLCJmaWxlIjoibGlicy92aWRlb2pzLXZpbWVvLmpzIn0=
