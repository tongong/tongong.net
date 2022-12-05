/* mithril@2.2.2 */
!function(){"use strict";function e(e,t,n,r,o,i){return{tag:e,key:t,attrs:n,children:r,text:o,dom:i,domSize:void 0,state:void 0,events:void 0,instance:void 0}}e.normalize=function(t){return Array.isArray(t)?e("[",void 0,void 0,e.normalizeChildren(t),void 0,void 0):null==t||"boolean"==typeof t?null:"object"==typeof t?t:e("#",void 0,void 0,String(t),void 0,void 0)},e.normalizeChildren=function(t){var n=[];if(t.length){for(var r=null!=t[0]&&null!=t[0].key,o=1;o<t.length;o++)if((null!=t[o]&&null!=t[o].key)!==r)throw new TypeError(!r||null==t[o]&&"boolean"!=typeof t[o]?"In fragments, vnodes must either all have keys or none have keys.":"In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole.");for(o=0;o<t.length;o++)n[o]=e.normalize(t[o])}return n};var t=function(){var t,n=arguments[this],r=this+1;if(null==n?n={}:("object"!=typeof n||null!=n.tag||Array.isArray(n))&&(n={},r=this),arguments.length===r+1)t=arguments[r],Array.isArray(t)||(t=[t]);else for(t=[];r<arguments.length;)t.push(arguments[r++]);return e("",n.key,n,t)},n={}.hasOwnProperty,r=/(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,o={};function i(e){for(var t in e)if(n.call(e,t))return!1;return!0}function l(l){if(null==l||"string"!=typeof l&&"function"!=typeof l&&"function"!=typeof l.view)throw Error("The selector must be either a string or a component.");var a=t.apply(1,arguments);return"string"==typeof l&&(a.children=e.normalizeChildren(a.children),"["!==l)?function(e,t){var r=t.attrs,o=n.call(r,"class"),l=o?r.class:r.className;if(t.tag=e.tag,t.attrs={},!i(e.attrs)&&!i(r)){var a={};for(var u in r)n.call(r,u)&&(a[u]=r[u]);r=a}for(var u in e.attrs)n.call(e.attrs,u)&&"className"!==u&&!n.call(r,u)&&(r[u]=e.attrs[u]);for(var u in null==l&&null==e.attrs.className||(r.className=null!=l?null!=e.attrs.className?String(e.attrs.className)+" "+String(l):l:null!=e.attrs.className?e.attrs.className:null),o&&(r.class=null),r)if(n.call(r,u)&&"key"!==u){t.attrs=r;break}return t}(o[l]||function(e){for(var t,n="div",i=[],l={};t=r.exec(e);){var a=t[1],u=t[2];if(""===a&&""!==u)n=u;else if("#"===a)l.id=u;else if("."===a)i.push(u);else if("["===t[3][0]){var s=t[6];s&&(s=s.replace(/\\(["'])/g,"$1").replace(/\\\\/g,"\\")),"class"===t[4]?i.push(s):l[t[4]]=""===s?s:s||!0}}return i.length>0&&(l.className=i.join(" ")),o[e]={tag:n,attrs:l}}(l),a):(a.tag=l,a)}if(l.trust=function(t){return null==t&&(t=""),e("<",void 0,void 0,t,void 0,void 0)},l.fragment=function(){var n=t.apply(0,arguments);return n.tag="[",n.children=e.normalizeChildren(n.children),n},(a=function(e){if(!(this instanceof a))throw new Error("Promise must be called with 'new'.");if("function"!=typeof e)throw new TypeError("executor must be a function.");var t=this,n=[],r=[],o=s(n,!0),i=s(r,!1),l=t._instance={resolvers:n,rejectors:r},u="function"==typeof setImmediate?setImmediate:setTimeout;function s(e,o){return function a(s){var f;try{if(!o||null==s||"object"!=typeof s&&"function"!=typeof s||"function"!=typeof(f=s.then))u((function(){o||0!==e.length||console.error("Possible unhandled promise rejection:",s);for(var t=0;t<e.length;t++)e[t](s);n.length=0,r.length=0,l.state=o,l.retry=function(){a(s)}}));else{if(s===t)throw new TypeError("Promise can't be resolved with itself.");c(f.bind(s))}}catch(e){i(e)}}}function c(e){var t=0;function n(e){return function(n){t++>0||e(n)}}var r=n(i);try{e(n(o),r)}catch(e){r(e)}}c(e)}).prototype.then=function(e,t){var n,r,o=this._instance;function i(e,t,i,l){t.push((function(t){if("function"!=typeof e)i(t);else try{n(e(t))}catch(e){r&&r(e)}})),"function"==typeof o.retry&&l===o.state&&o.retry()}var l=new a((function(e,t){n=e,r=t}));return i(e,o.resolvers,n,!0),i(t,o.rejectors,r,!1),l},a.prototype.catch=function(e){return this.then(null,e)},a.prototype.finally=function(e){return this.then((function(t){return a.resolve(e()).then((function(){return t}))}),(function(t){return a.resolve(e()).then((function(){return a.reject(t)}))}))},a.resolve=function(e){return e instanceof a?e:new a((function(t){t(e)}))},a.reject=function(e){return new a((function(t,n){n(e)}))},a.all=function(e){return new a((function(t,n){var r=e.length,o=0,i=[];if(0===e.length)t([]);else for(var l=0;l<e.length;l++)!function(l){function a(e){o++,i[l]=e,o===r&&t(i)}null==e[l]||"object"!=typeof e[l]&&"function"!=typeof e[l]||"function"!=typeof e[l].then?a(e[l]):e[l].then(a,n)}(l)}))},a.race=function(e){return new a((function(t,n){for(var r=0;r<e.length;r++)e[r].then(t,n)}))},"undefined"!=typeof window){void 0===window.Promise?window.Promise=a:window.Promise.prototype.finally||(window.Promise.prototype.finally=a.prototype.finally);var a=window.Promise}else if("undefined"!=typeof global){void 0===global.Promise?global.Promise=a:global.Promise.prototype.finally||(global.Promise.prototype.finally=a.prototype.finally);a=global.Promise}var u=function(t){var n,r=t&&t.document,o={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"};function i(e){return e.attrs&&e.attrs.xmlns||o[e.tag]}function l(e,t){if(e.state!==t)throw new Error("'vnode.state' must not be modified.")}function a(e){var t=e.state;try{return this.apply(t,arguments)}finally{l(e,t)}}function u(){try{return r.activeElement}catch(e){return null}}function s(e,t,n,r,o,i,l){for(var a=n;a<r;a++){var u=t[a];null!=u&&c(e,u,o,l,i)}}function c(t,n,o,l,u){var f=n.tag;if("string"==typeof f)switch(n.state={},null!=n.attrs&&_(n.attrs,n,o),f){case"#":!function(e,t,n){t.dom=r.createTextNode(t.children),w(e,t.dom,n)}(t,n,u);break;case"<":d(t,n,l,u);break;case"[":!function(e,t,n,o,i){var l=r.createDocumentFragment();if(null!=t.children){var a=t.children;s(l,a,0,a.length,n,null,o)}t.dom=l.firstChild,t.domSize=l.childNodes.length,w(e,l,i)}(t,n,o,l,u);break;default:!function(e,t,n,o,l){var a=t.tag,u=t.attrs,c=u&&u.is,f=(o=i(t)||o)?c?r.createElementNS(o,a,{is:c}):r.createElementNS(o,a):c?r.createElement(a,{is:c}):r.createElement(a);t.dom=f,null!=u&&function(e,t,n){"input"===e.tag&&null!=t.type&&e.dom.setAttribute("type",t.type);var r=null!=t&&"input"===e.tag&&"file"===t.type;for(var o in t)C(e,o,null,t[o],n,r)}(t,u,o);if(w(e,f,l),!b(t)&&null!=t.children){var d=t.children;s(f,d,0,d.length,n,null,o),"select"===t.tag&&null!=u&&function(e,t){if("value"in t)if(null===t.value)-1!==e.dom.selectedIndex&&(e.dom.value=null);else{var n=""+t.value;e.dom.value===n&&-1!==e.dom.selectedIndex||(e.dom.value=n)}"selectedIndex"in t&&C(e,"selectedIndex",null,t.selectedIndex,void 0)}(t,u)}}(t,n,o,l,u)}else!function(t,n,r,o,i){(function(t,n){var r;if("function"==typeof t.tag.view){if(t.state=Object.create(t.tag),null!=(r=t.state.view).$$reentrantLock$$)return;r.$$reentrantLock$$=!0}else{if(t.state=void 0,null!=(r=t.tag).$$reentrantLock$$)return;r.$$reentrantLock$$=!0,t.state=null!=t.tag.prototype&&"function"==typeof t.tag.prototype.view?new t.tag(t):t.tag(t)}_(t.state,t,n),null!=t.attrs&&_(t.attrs,t,n);if(t.instance=e.normalize(a.call(t.state.view,t)),t.instance===t)throw Error("A view cannot return the vnode it received as argument");r.$$reentrantLock$$=null})(n,r),null!=n.instance?(c(t,n.instance,r,o,i),n.dom=n.instance.dom,n.domSize=null!=n.dom?n.instance.domSize:0):n.domSize=0}(t,n,o,l,u)}var f={caption:"table",thead:"table",tbody:"table",tfoot:"table",tr:"tbody",th:"tr",td:"tr",colgroup:"table",col:"colgroup"};function d(e,t,n,o){var i=t.children.match(/^\s*?<(\w+)/im)||[],l=r.createElement(f[i[1]]||"div");"http://www.w3.org/2000/svg"===n?(l.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+t.children+"</svg>",l=l.firstChild):l.innerHTML=t.children,t.dom=l.firstChild,t.domSize=l.childNodes.length,t.instance=[];for(var a,u=r.createDocumentFragment();a=l.firstChild;)t.instance.push(a),u.appendChild(a);w(e,u,o)}function p(e,t,n,r,o,i){if(t!==n&&(null!=t||null!=n))if(null==t||0===t.length)s(e,n,0,n.length,r,o,i);else if(null==n||0===n.length)k(e,t,0,t.length);else{var l=null!=t[0]&&null!=t[0].key,a=null!=n[0]&&null!=n[0].key,u=0,f=0;if(!l)for(;f<t.length&&null==t[f];)f++;if(!a)for(;u<n.length&&null==n[u];)u++;if(l!==a)k(e,t,f,t.length),s(e,n,u,n.length,r,o,i);else if(a){for(var d,p,w,b,S,E=t.length-1,j=n.length-1;E>=f&&j>=u&&(w=t[E],b=n[j],w.key===b.key);)w!==b&&h(e,w,b,r,o,i),null!=b.dom&&(o=b.dom),E--,j--;for(;E>=f&&j>=u&&(d=t[f],p=n[u],d.key===p.key);)f++,u++,d!==p&&h(e,d,p,r,y(t,f,o),i);for(;E>=f&&j>=u&&u!==j&&d.key===b.key&&w.key===p.key;)g(e,w,S=y(t,f,o)),w!==p&&h(e,w,p,r,S,i),++u<=--j&&g(e,d,o),d!==b&&h(e,d,b,r,o,i),null!=b.dom&&(o=b.dom),f++,w=t[--E],b=n[j],d=t[f],p=n[u];for(;E>=f&&j>=u&&w.key===b.key;)w!==b&&h(e,w,b,r,o,i),null!=b.dom&&(o=b.dom),j--,w=t[--E],b=n[j];if(u>j)k(e,t,f,E+1);else if(f>E)s(e,n,u,j+1,r,o,i);else{var C,z,A=o,T=j-u+1,N=new Array(T),O=0,P=0,I=2147483647,$=0;for(P=0;P<T;P++)N[P]=-1;for(P=j;P>=u;P--){null==C&&(C=v(t,f,E+1));var L=C[(b=n[P]).key];null!=L&&(I=L<I?L:-1,N[P-u]=L,w=t[L],t[L]=null,w!==b&&h(e,w,b,r,o,i),null!=b.dom&&(o=b.dom),$++)}if(o=A,$!==E-f+1&&k(e,t,f,E+1),0===$)s(e,n,u,j+1,r,o,i);else if(-1===I)for(O=(z=function(e){var t=[0],n=0,r=0,o=0,i=m.length=e.length;for(o=0;o<i;o++)m[o]=e[o];for(o=0;o<i;++o)if(-1!==e[o]){var l=t[t.length-1];if(e[l]<e[o])m[o]=l,t.push(o);else{for(n=0,r=t.length-1;n<r;){var a=(n>>>1)+(r>>>1)+(n&r&1);e[t[a]]<e[o]?n=a+1:r=a}e[o]<e[t[n]]&&(n>0&&(m[o]=t[n-1]),t[n]=o)}}n=t.length,r=t[n-1];for(;n-- >0;)t[n]=r,r=m[r];return m.length=0,t}(N)).length-1,P=j;P>=u;P--)p=n[P],-1===N[P-u]?c(e,p,r,i,o):z[O]===P-u?O--:g(e,p,o),null!=p.dom&&(o=n[P].dom);else for(P=j;P>=u;P--)p=n[P],-1===N[P-u]&&c(e,p,r,i,o),null!=p.dom&&(o=n[P].dom)}}else{var R=t.length<n.length?t.length:n.length;for(u=u<f?u:f;u<R;u++)(d=t[u])===(p=n[u])||null==d&&null==p||(null==d?c(e,p,r,i,y(t,u+1,o)):null==p?x(e,d):h(e,d,p,r,y(t,u+1,o),i));t.length>R&&k(e,t,u,t.length),n.length>R&&s(e,n,u,n.length,r,o,i)}}}function h(t,n,r,o,l,u){var s=n.tag;if(s===r.tag){if(r.state=n.state,r.events=n.events,function(e,t){do{var n;if(null!=e.attrs&&"function"==typeof e.attrs.onbeforeupdate)if(void 0!==(n=a.call(e.attrs.onbeforeupdate,e,t))&&!n)break;if("string"!=typeof e.tag&&"function"==typeof e.state.onbeforeupdate)if(void 0!==(n=a.call(e.state.onbeforeupdate,e,t))&&!n)break;return!1}while(0);return e.dom=t.dom,e.domSize=t.domSize,e.instance=t.instance,e.attrs=t.attrs,e.children=t.children,e.text=t.text,!0}(r,n))return;if("string"==typeof s)switch(null!=r.attrs&&D(r.attrs,r,o),s){case"#":!function(e,t){e.children.toString()!==t.children.toString()&&(e.dom.nodeValue=t.children);t.dom=e.dom}(n,r);break;case"<":!function(e,t,n,r,o){t.children!==n.children?(S(e,t),d(e,n,r,o)):(n.dom=t.dom,n.domSize=t.domSize,n.instance=t.instance)}(t,n,r,u,l);break;case"[":!function(e,t,n,r,o,i){p(e,t.children,n.children,r,o,i);var l=0,a=n.children;if(n.dom=null,null!=a){for(var u=0;u<a.length;u++){var s=a[u];null!=s&&null!=s.dom&&(null==n.dom&&(n.dom=s.dom),l+=s.domSize||1)}1!==l&&(n.domSize=l)}}(t,n,r,o,l,u);break;default:!function(e,t,n,r){var o=t.dom=e.dom;r=i(t)||r,"textarea"===t.tag&&null==t.attrs&&(t.attrs={});(function(e,t,n,r){t&&t===n&&console.warn("Don't reuse attrs object, use new object for every redraw, this will throw in next major");if(null!=n){"input"===e.tag&&null!=n.type&&e.dom.setAttribute("type",n.type);var o="input"===e.tag&&"file"===n.type;for(var i in n)C(e,i,t&&t[i],n[i],r,o)}var l;if(null!=t)for(var i in t)null==(l=t[i])||null!=n&&null!=n[i]||z(e,i,l,r)})(t,e.attrs,t.attrs,r),b(t)||p(o,e.children,t.children,n,null,r)}(n,r,o,u)}else!function(t,n,r,o,i,l){if(r.instance=e.normalize(a.call(r.state.view,r)),r.instance===r)throw Error("A view cannot return the vnode it received as argument");D(r.state,r,o),null!=r.attrs&&D(r.attrs,r,o);null!=r.instance?(null==n.instance?c(t,r.instance,o,l,i):h(t,n.instance,r.instance,o,i,l),r.dom=r.instance.dom,r.domSize=r.instance.domSize):null!=n.instance?(x(t,n.instance),r.dom=void 0,r.domSize=0):(r.dom=n.dom,r.domSize=n.domSize)}(t,n,r,o,l,u)}else x(t,n),c(t,r,o,u,l)}function v(e,t,n){for(var r=Object.create(null);t<n;t++){var o=e[t];if(null!=o){var i=o.key;null!=i&&(r[i]=t)}}return r}var m=[];function y(e,t,n){for(;t<e.length;t++)if(null!=e[t]&&null!=e[t].dom)return e[t].dom;return n}function g(e,t,n){var o=r.createDocumentFragment();!function e(t,n,r){for(;null!=r.dom&&r.dom.parentNode===t;){if("string"!=typeof r.tag){if(null!=(r=r.instance))continue}else if("<"===r.tag)for(var o=0;o<r.instance.length;o++)n.appendChild(r.instance[o]);else if("["!==r.tag)n.appendChild(r.dom);else if(1===r.children.length){if(null!=(r=r.children[0]))continue}else for(o=0;o<r.children.length;o++){var i=r.children[o];null!=i&&e(t,n,i)}break}}(e,o,t),w(e,o,n)}function w(e,t,n){null!=n?e.insertBefore(t,n):e.appendChild(t)}function b(e){if(null==e.attrs||null==e.attrs.contenteditable&&null==e.attrs.contentEditable)return!1;var t=e.children;if(null!=t&&1===t.length&&"<"===t[0].tag){var n=t[0].children;e.dom.innerHTML!==n&&(e.dom.innerHTML=n)}else if(null!=t&&0!==t.length)throw new Error("Child node of a contenteditable must be trusted.");return!0}function k(e,t,n,r){for(var o=n;o<r;o++){var i=t[o];null!=i&&x(e,i)}}function x(e,t){var n,r,o,i=0,u=t.state;"string"!=typeof t.tag&&"function"==typeof t.state.onbeforeremove&&(null!=(o=a.call(t.state.onbeforeremove,t))&&"function"==typeof o.then&&(i=1,n=o));t.attrs&&"function"==typeof t.attrs.onbeforeremove&&(null!=(o=a.call(t.attrs.onbeforeremove,t))&&"function"==typeof o.then&&(i|=2,r=o));if(l(t,u),i){if(null!=n){var s=function(){1&i&&((i&=2)||c())};n.then(s,s)}if(null!=r){s=function(){2&i&&((i&=1)||c())};r.then(s,s)}}else j(t),E(e,t);function c(){l(t,u),j(t),E(e,t)}}function S(e,t){for(var n=0;n<t.instance.length;n++)e.removeChild(t.instance[n])}function E(e,t){for(;null!=t.dom&&t.dom.parentNode===e;){if("string"!=typeof t.tag){if(null!=(t=t.instance))continue}else if("<"===t.tag)S(e,t);else{if("["!==t.tag&&(e.removeChild(t.dom),!Array.isArray(t.children)))break;if(1===t.children.length){if(null!=(t=t.children[0]))continue}else for(var n=0;n<t.children.length;n++){var r=t.children[n];null!=r&&E(e,r)}}break}}function j(e){if("string"!=typeof e.tag&&"function"==typeof e.state.onremove&&a.call(e.state.onremove,e),e.attrs&&"function"==typeof e.attrs.onremove&&a.call(e.attrs.onremove,e),"string"!=typeof e.tag)null!=e.instance&&j(e.instance);else{var t=e.children;if(Array.isArray(t))for(var n=0;n<t.length;n++){var r=t[n];null!=r&&j(r)}}}function C(e,t,n,o,i,l){if(!("key"===t||"is"===t||null==o||A(t)||n===o&&!function(e,t){return"value"===t||"checked"===t||"selectedIndex"===t||"selected"===t&&e.dom===u()||"option"===e.tag&&e.dom.parentNode===r.activeElement}(e,t)&&"object"!=typeof o||"type"===t&&"input"===e.tag)){if("o"===t[0]&&"n"===t[1])return R(e,t,o);if("xlink:"===t.slice(0,6))e.dom.setAttributeNS("http://www.w3.org/1999/xlink",t.slice(6),o);else if("style"===t)$(e.dom,n,o);else if(T(e,t,i)){if("value"===t){if(("input"===e.tag||"textarea"===e.tag)&&e.dom.value===""+o&&(l||e.dom===u()))return;if("select"===e.tag&&null!==n&&e.dom.value===""+o)return;if("option"===e.tag&&null!==n&&e.dom.value===""+o)return;if(l&&""+o!="")return void console.error("`value` is read-only on file inputs!")}e.dom[t]=o}else"boolean"==typeof o?o?e.dom.setAttribute(t,""):e.dom.removeAttribute(t):e.dom.setAttribute("className"===t?"class":t,o)}}function z(e,t,n,r){if("key"!==t&&"is"!==t&&null!=n&&!A(t))if("o"===t[0]&&"n"===t[1])R(e,t,void 0);else if("style"===t)$(e.dom,n,null);else if(!T(e,t,r)||"className"===t||"title"===t||"value"===t&&("option"===e.tag||"select"===e.tag&&-1===e.dom.selectedIndex&&e.dom===u())||"input"===e.tag&&"type"===t){var o=t.indexOf(":");-1!==o&&(t=t.slice(o+1)),!1!==n&&e.dom.removeAttribute("className"===t?"class":t)}else e.dom[t]=null}function A(e){return"oninit"===e||"oncreate"===e||"onupdate"===e||"onremove"===e||"onbeforeremove"===e||"onbeforeupdate"===e}function T(e,t,n){return void 0===n&&(e.tag.indexOf("-")>-1||null!=e.attrs&&e.attrs.is||"href"!==t&&"list"!==t&&"form"!==t&&"width"!==t&&"height"!==t)&&t in e.dom}var N,O=/[A-Z]/g;function P(e){return"-"+e.toLowerCase()}function I(e){return"-"===e[0]&&"-"===e[1]?e:"cssFloat"===e?"float":e.replace(O,P)}function $(e,t,n){if(t===n);else if(null==n)e.style.cssText="";else if("object"!=typeof n)e.style.cssText=n;else if(null==t||"object"!=typeof t)for(var r in e.style.cssText="",n){null!=(o=n[r])&&e.style.setProperty(I(r),String(o))}else{for(var r in n){var o;null!=(o=n[r])&&(o=String(o))!==String(t[r])&&e.style.setProperty(I(r),o)}for(var r in t)null!=t[r]&&null==n[r]&&e.style.removeProperty(I(r))}}function L(){this._=n}function R(e,t,r){if(null!=e.events){if(e.events._=n,e.events[t]===r)return;null==r||"function"!=typeof r&&"object"!=typeof r?(null!=e.events[t]&&e.dom.removeEventListener(t.slice(2),e.events,!1),e.events[t]=void 0):(null==e.events[t]&&e.dom.addEventListener(t.slice(2),e.events,!1),e.events[t]=r)}else null==r||"function"!=typeof r&&"object"!=typeof r||(e.events=new L,e.dom.addEventListener(t.slice(2),e.events,!1),e.events[t]=r)}function _(e,t,n){"function"==typeof e.oninit&&a.call(e.oninit,t),"function"==typeof e.oncreate&&n.push(a.bind(e.oncreate,t))}function D(e,t,n){"function"==typeof e.onupdate&&n.push(a.bind(e.onupdate,t))}return L.prototype=Object.create(null),L.prototype.handleEvent=function(e){var t,n=this["on"+e.type];"function"==typeof n?t=n.call(e.currentTarget,e):"function"==typeof n.handleEvent&&n.handleEvent(e),this._&&!1!==e.redraw&&(0,this._)(),!1===t&&(e.preventDefault(),e.stopPropagation())},function(t,r,o){if(!t)throw new TypeError("DOM element being rendered to does not exist.");if(null!=N&&t.contains(N))throw new TypeError("Node is currently being rendered to and thus is locked.");var i=n,l=N,a=[],s=u(),c=t.namespaceURI;N=t,n="function"==typeof o?o:void 0;try{null==t.vnodes&&(t.textContent=""),r=e.normalizeChildren(Array.isArray(r)?r:[r]),p(t,t.vnodes,r,a,null,"http://www.w3.org/1999/xhtml"===c?void 0:c),t.vnodes=r,null!=s&&u()!==s&&"function"==typeof s.focus&&s.focus();for(var f=0;f<a.length;f++)a[f]()}finally{n=i,N=l}}}("undefined"!=typeof window?window:null),s=function(t,n,r){var o=[],i=!1,l=-1;function a(){for(l=0;l<o.length;l+=2)try{t(o[l],e(o[l+1]),u)}catch(e){r.error(e)}l=-1}function u(){i||(i=!0,n((function(){i=!1,a()})))}return u.sync=a,{mount:function(n,r){if(null!=r&&null==r.view&&"function"!=typeof r)throw new TypeError("m.mount expects a component, not a vnode.");var i=o.indexOf(n);i>=0&&(o.splice(i,2),i<=l&&(l-=2),t(n,[])),null!=r&&(o.push(n,r),t(n,e(r),u))},redraw:u}}(u,"undefined"!=typeof requestAnimationFrame?requestAnimationFrame:null,"undefined"!=typeof console?console:null),c=function(e){if("[object Object]"!==Object.prototype.toString.call(e))return"";var t=[];for(var n in e)r(n,e[n]);return t.join("&");function r(e,n){if(Array.isArray(n))for(var o=0;o<n.length;o++)r(e+"["+o+"]",n[o]);else if("[object Object]"===Object.prototype.toString.call(n))for(var o in n)r(e+"["+o+"]",n[o]);else t.push(encodeURIComponent(e)+(null!=n&&""!==n?"="+encodeURIComponent(n):""))}},f=Object.assign||function(e,t){for(var r in t)n.call(t,r)&&(e[r]=t[r])},d=function(e,t){if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw new SyntaxError("Template parameter names must be separated by either a '/', '-', or '.'.");if(null==t)return e;var n=e.indexOf("?"),r=e.indexOf("#"),o=r<0?e.length:r,i=n<0?o:n,l=e.slice(0,i),a={};f(a,t);var u=l.replace(/:([^\/\.-]+)(\.{3})?/g,(function(e,n,r){return delete a[n],null==t[n]?e:r?t[n]:encodeURIComponent(String(t[n]))})),s=u.indexOf("?"),d=u.indexOf("#"),p=d<0?u.length:d,h=s<0?p:s,v=u.slice(0,h);n>=0&&(v+=e.slice(n,o)),s>=0&&(v+=(n<0?"?":"&")+u.slice(s,p));var m=c(a);return m&&(v+=(n<0&&s<0?"?":"&")+m),r>=0&&(v+=e.slice(r)),d>=0&&(v+=(r<0?"":"&")+u.slice(d)),v},p=function(e,t,r){var o=0;function i(e){return new t(e)}function l(e){return function(n,o){"string"!=typeof n?(o=n,n=n.url):null==o&&(o={});var l=new t((function(t,r){e(d(n,o.params),o,(function(e){if("function"==typeof o.type)if(Array.isArray(e))for(var n=0;n<e.length;n++)e[n]=new o.type(e[n]);else e=new o.type(e);t(e)}),r)}));if(!0===o.background)return l;var a=0;function u(){0==--a&&"function"==typeof r&&r()}return function e(t){var n=t.then;t.constructor=i;t.then=function(){a++;var r=n.apply(t,arguments);return r.then(u,(function(e){if(u(),0===a)throw e})),e(r)};return t}(l)}}function a(e,t){for(var r in e.headers)if(n.call(e.headers,r)&&r.toLowerCase()===t)return!0;return!1}return i.prototype=t.prototype,i.__proto__=t,{request:l((function(t,r,o,i){var l,u=null!=r.method?r.method.toUpperCase():"GET",s=r.body,c=(null==r.serialize||r.serialize===JSON.serialize)&&!(s instanceof e.FormData||s instanceof e.URLSearchParams),f=r.responseType||("function"==typeof r.extract?"":"json"),d=new e.XMLHttpRequest,p=!1,h=!1,v=d,m=d.abort;for(var y in d.abort=function(){p=!0,m.call(this)},d.open(u,t,!1!==r.async,"string"==typeof r.user?r.user:void 0,"string"==typeof r.password?r.password:void 0),c&&null!=s&&!a(r,"content-type")&&d.setRequestHeader("Content-Type","application/json; charset=utf-8"),"function"==typeof r.deserialize||a(r,"accept")||d.setRequestHeader("Accept","application/json, text/*"),r.withCredentials&&(d.withCredentials=r.withCredentials),r.timeout&&(d.timeout=r.timeout),d.responseType=f,r.headers)n.call(r.headers,y)&&d.setRequestHeader(y,r.headers[y]);d.onreadystatechange=function(e){if(!p&&4===e.target.readyState)try{var n,l=e.target.status>=200&&e.target.status<300||304===e.target.status||/^file:\/\//i.test(t),a=e.target.response;if("json"===f){if(!e.target.responseType&&"function"!=typeof r.extract)try{a=JSON.parse(e.target.responseText)}catch(e){a=null}}else f&&"text"!==f||null==a&&(a=e.target.responseText);if("function"==typeof r.extract?(a=r.extract(e.target,r),l=!0):"function"==typeof r.deserialize&&(a=r.deserialize(a)),l)o(a);else{var u=function(){try{n=e.target.responseText}catch(e){n=a}var t=new Error(n);t.code=e.target.status,t.response=a,i(t)};0===d.status?setTimeout((function(){h||u()})):u()}}catch(e){i(e)}},d.ontimeout=function(e){h=!0;var t=new Error("Request timed out");t.code=e.target.status,i(t)},"function"==typeof r.config&&(d=r.config(d,r,t)||d)!==v&&(l=d.abort,d.abort=function(){p=!0,l.call(this)}),null==s?d.send():"function"==typeof r.serialize?d.send(r.serialize(s)):s instanceof e.FormData||s instanceof e.URLSearchParams?d.send(s):d.send(JSON.stringify(s))})),jsonp:l((function(t,n,r,i){var l=n.callbackName||"_mithril_"+Math.round(1e16*Math.random())+"_"+o++,a=e.document.createElement("script");e[l]=function(t){delete e[l],a.parentNode.removeChild(a),r(t)},a.onerror=function(){delete e[l],a.parentNode.removeChild(a),i(new Error("JSONP request failed"))},a.src=t+(t.indexOf("?")<0?"?":"&")+encodeURIComponent(n.callbackKey||"callback")+"="+encodeURIComponent(l),e.document.documentElement.appendChild(a)}))}}("undefined"!=typeof window?window:null,a,s.redraw),h=s,v=function(){return l.apply(this,arguments)};v.m=l,v.trust=l.trust,v.fragment=l.fragment,v.Fragment="[",v.mount=h.mount;var m=l,y=a;function g(e){try{return decodeURIComponent(e)}catch(t){return e}}var w=function(e){if(""===e||null==e)return{};"?"===e.charAt(0)&&(e=e.slice(1));for(var t=e.split("&"),n={},r={},o=0;o<t.length;o++){var i=t[o].split("="),l=g(i[0]),a=2===i.length?g(i[1]):"";"true"===a?a=!0:"false"===a&&(a=!1);var u=l.split(/\]\[?|\[/),s=r;l.indexOf("[")>-1&&u.pop();for(var c=0;c<u.length;c++){var f=u[c],d=u[c+1],p=""==d||!isNaN(parseInt(d,10));if(""===f)null==n[l=u.slice(0,c).join()]&&(n[l]=Array.isArray(s)?s.length:0),f=n[l]++;else if("__proto__"===f)break;if(c===u.length-1)s[f]=a;else{var h=Object.getOwnPropertyDescriptor(s,f);null!=h&&(h=h.value),null==h&&(s[f]=h=p?[]:{}),s=h}}}return r},b=function(e){var t=e.indexOf("?"),n=e.indexOf("#"),r=n<0?e.length:n,o=t<0?r:t,i=e.slice(0,o).replace(/\/{2,}/g,"/");return i?("/"!==i[0]&&(i="/"+i),i.length>1&&"/"===i[i.length-1]&&(i=i.slice(0,-1))):i="/",{path:i,params:t<0?{}:w(e.slice(t+1,r))}},k=function(e){var t=b(e),n=Object.keys(t.params),r=[],o=new RegExp("^"+t.path.replace(/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,(function(e,t,n){return null==t?"\\"+e:(r.push({k:t,r:"..."===n}),"..."===n?"(.*)":"."===n?"([^/]+)\\.":"([^/]+)"+(n||""))}))+"$");return function(e){for(var i=0;i<n.length;i++)if(t.params[n[i]]!==e.params[n[i]])return!1;if(!r.length)return o.test(e.path);var l=o.exec(e.path);if(null==l)return!1;for(i=0;i<r.length;i++)e.params[r[i].k]=r[i].r?l[i+1]:decodeURIComponent(l[i+1]);return!0}},x=new RegExp("^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$"),S=function(e,t){var r={};if(null!=t)for(var o in e)n.call(e,o)&&!x.test(o)&&t.indexOf(o)<0&&(r[o]=e[o]);else for(var o in e)n.call(e,o)&&!x.test(o)&&(r[o]=e[o]);return r},E={};function j(e){try{return decodeURIComponent(e)}catch(t){return e}}v.route=function(t,n){var r,o,i,l,a,u,s=null==t?null:"function"==typeof t.setImmediate?t.setImmediate:t.setTimeout,c=y.resolve(),p=!1,h=!1,v=0,g=E,w={onbeforeupdate:function(){return!(!(v=v?2:1)||E===g)},onremove:function(){t.removeEventListener("popstate",z,!1),t.removeEventListener("hashchange",C,!1)},view:function(){if(v&&E!==g){var t=[e(i,l.key,l)];return g&&(t=g.render(t[0])),t}}},x=T.SKIP={};function C(){p=!1;var e=t.location.hash;"#"!==T.prefix[0]&&(e=t.location.search+e,"?"!==T.prefix[0]&&"/"!==(e=t.location.pathname+e)[0]&&(e="/"+e));var s=e.concat().replace(/(?:%[a-f89][a-f0-9])+/gim,j).slice(T.prefix.length),d=b(s);function h(e){console.error(e),A(o,null,{replace:!0})}f(d.params,t.history.state),function e(t){for(;t<r.length;t++)if(r[t].check(d)){var f=r[t].component,p=r[t].route,m=f,y=u=function(r){if(y===u){if(r===x)return e(t+1);i=null==r||"function"!=typeof r.view&&"function"!=typeof r?"div":r,l=d.params,a=s,u=null,g=f.render?f:null,2===v?n.redraw():(v=2,n.redraw.sync())}};return void(f.view||"function"==typeof f?(f={},y(m)):f.onmatch?c.then((function(){return f.onmatch(d.params,s,p)})).then(y,s===o?null:h):y("div"))}if(s===o)throw new Error("Could not resolve default route "+o+".");A(o,null,{replace:!0})}(0)}function z(){p||(p=!0,s(C))}function A(e,n,r){if(e=d(e,n),h){z();var o=r?r.state:null,i=r?r.title:null;r&&r.replace?t.history.replaceState(o,i,T.prefix+e):t.history.pushState(o,i,T.prefix+e)}else t.location.href=T.prefix+e}function T(e,i,l){if(!e)throw new TypeError("DOM element being rendered to does not exist.");if(r=Object.keys(l).map((function(e){if("/"!==e[0])throw new SyntaxError("Routes must start with a '/'.");if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw new SyntaxError("Route parameter names must be separated with either '/', '.', or '-'.");return{route:e,component:l[e],check:k(e)}})),o=i,null!=i){var a=b(i);if(!r.some((function(e){return e.check(a)})))throw new ReferenceError("Default route doesn't match any known routes.")}"function"==typeof t.history.pushState?t.addEventListener("popstate",z,!1):"#"===T.prefix[0]&&t.addEventListener("hashchange",C,!1),h=!0,n.mount(e,w),C()}return T.set=function(e,t,n){null!=u&&((n=n||{}).replace=!0),u=null,A(e,t,n)},T.get=function(){return a},T.prefix="#!",T.Link={view:function(e){var t,n,r,o=m(e.attrs.selector||"a",S(e.attrs,["options","params","selector","onclick"]),e.children);return(o.attrs.disabled=Boolean(o.attrs.disabled))?(o.attrs.href=null,o.attrs["aria-disabled"]="true"):(t=e.attrs.options,n=e.attrs.onclick,r=d(o.attrs.href,e.attrs.params),o.attrs.href=T.prefix+r,o.attrs.onclick=function(e){var o;"function"==typeof n?o=n.call(e.currentTarget,e):null==n||"object"!=typeof n||"function"==typeof n.handleEvent&&n.handleEvent(e),!1===o||e.defaultPrevented||0!==e.button&&0!==e.which&&1!==e.which||e.currentTarget.target&&"_self"!==e.currentTarget.target||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||(e.preventDefault(),e.redraw=!1,T.set(r,null,t))}),o}},T.param=function(e){return l&&null!=e?l[e]:l},T}("undefined"!=typeof window?window:null,h),v.render=u,v.redraw=h.redraw,v.request=p.request,v.jsonp=p.jsonp,v.parseQueryString=w,v.buildQueryString=c,v.parsePathname=b,v.buildPathname=d,v.vnode=e,v.PromisePolyfill=a,v.censor=S,"undefined"!=typeof module?module.exports=v:window.m=v}();