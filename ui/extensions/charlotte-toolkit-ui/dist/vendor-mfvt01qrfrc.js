function e(e,t){for(var n=0;n<t.length;n++){const r=t[n];if("string"!=typeof r&&!Array.isArray(r))for(const t in r)if("default"!==t&&!(t in e)){const n=Object.getOwnPropertyDescriptor(r,t);n&&Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:()=>r[t]})}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}function t(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function n(e){if(Object.prototype.hasOwnProperty.call(e,"__esModule"))return e;var t=e.default;if("function"==typeof t){var n=function e(){var n=!1;try{n=this instanceof e}catch{}return n?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(t){var r=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(n,t,r.get?r:{enumerable:!0,get:function(){return e[t]}})}),n}var r,i,o={exports:{}},a={};function s(){if(r)return a;r=1;var e=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.consumer"),l=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),h=Symbol.for("react.lazy"),p=Symbol.iterator;var f={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,g={};function b(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||f}function y(){}function v(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||f}b.prototype.isReactComponent={},b.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},b.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=b.prototype;var w=v.prototype=new y;w.constructor=v,m(w,b.prototype),w.isPureReactComponent=!0;var k=Array.isArray,x={H:null,A:null,T:null,S:null,V:null},_=Object.prototype.hasOwnProperty;function S(t,n,r,i,o,a){return r=a.ref,{$$typeof:e,type:t,key:n,ref:void 0!==r?r:null,props:a}}function C(t){return"object"==typeof t&&null!==t&&t.$$typeof===e}var E=/\/+/g;function z(e,t){return"object"==typeof e&&null!==e&&null!=e.key?(n=""+e.key,r={"=":"=0",":":"=2"},"$"+n.replace(/[=:]/g,function(e){return r[e]})):t.toString(36);var n,r}function A(){}function $(n,r,i,o,a){var s=typeof n;"undefined"!==s&&"boolean"!==s||(n=null);var l,c,u=!1;if(null===n)u=!0;else switch(s){case"bigint":case"string":case"number":u=!0;break;case"object":switch(n.$$typeof){case e:case t:u=!0;break;case h:return $((u=n._init)(n._payload),r,i,o,a)}}if(u)return a=a(n),u=""===o?"."+z(n,0):o,k(a)?(i="",null!=u&&(i=u.replace(E,"$&/")+"/"),$(a,r,i,"",function(e){return e})):null!=a&&(C(a)&&(l=a,c=i+(null==a.key||n&&n.key===a.key?"":(""+a.key).replace(E,"$&/")+"/")+u,a=S(l.type,c,void 0,0,0,l.props)),r.push(a)),1;u=0;var d,f=""===o?".":o+":";if(k(n))for(var m=0;m<n.length;m++)u+=$(o=n[m],r,i,s=f+z(o,m),a);else if("function"==typeof(m=null===(d=n)||"object"!=typeof d?null:"function"==typeof(d=p&&d[p]||d["@@iterator"])?d:null))for(n=m.call(n),m=0;!(o=n.next()).done;)u+=$(o=o.value,r,i,s=f+z(o,m++),a);else if("object"===s){if("function"==typeof n.then)return $(function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch("string"==typeof e.status?e.then(A,A):(e.status="pending",e.then(function(t){"pending"===e.status&&(e.status="fulfilled",e.value=t)},function(t){"pending"===e.status&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}(n),r,i,o,a);throw r=String(n),Error("Objects are not valid as a React child (found: "+("[object Object]"===r?"object with keys {"+Object.keys(n).join(", ")+"}":r)+"). If you meant to render a collection of children, use an array instead.")}return u}function T(e,t,n){if(null==e)return e;var r=[],i=0;return $(e,r,"","",function(e){return t.call(n,e,i++)}),r}function P(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)},function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var M="function"==typeof reportError?reportError:function(e){if("object"==typeof window&&"function"==typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"==typeof e&&null!==e&&"string"==typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"==typeof process&&"function"==typeof process.emit)return void process.emit("uncaughtException",e)};function L(){}return a.Children={map:T,forEach:function(e,t,n){T(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return T(e,function(){t++}),t},toArray:function(e){return T(e,function(e){return e})||[]},only:function(e){if(!C(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},a.Component=b,a.Fragment=n,a.Profiler=o,a.PureComponent=v,a.StrictMode=i,a.Suspense=u,a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=x,a.__COMPILER_RUNTIME={__proto__:null,c:function(e){return x.H.useMemoCache(e)}},a.cache=function(e){return function(){return e.apply(null,arguments)}},a.cloneElement=function(e,t,n){if(null==e)throw Error("The argument must be a React element, but you passed "+e+".");var r=m({},e.props),i=e.key;if(null!=t)for(o in void 0!==t.ref&&void 0,void 0!==t.key&&(i=""+t.key),t)!_.call(t,o)||"key"===o||"__self"===o||"__source"===o||"ref"===o&&void 0===t.ref||(r[o]=t[o]);var o=arguments.length-2;if(1===o)r.children=n;else if(1<o){for(var a=Array(o),s=0;s<o;s++)a[s]=arguments[s+2];r.children=a}return S(e.type,i,void 0,0,0,r)},a.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider=e,e.Consumer={$$typeof:s,_context:e},e},a.createElement=function(e,t,n){var r,i={},o=null;if(null!=t)for(r in void 0!==t.key&&(o=""+t.key),t)_.call(t,r)&&"key"!==r&&"__self"!==r&&"__source"!==r&&(i[r]=t[r]);var a=arguments.length-2;if(1===a)i.children=n;else if(1<a){for(var s=Array(a),l=0;l<a;l++)s[l]=arguments[l+2];i.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps)void 0===i[r]&&(i[r]=a[r]);return S(e,o,void 0,0,0,i)},a.createRef=function(){return{current:null}},a.forwardRef=function(e){return{$$typeof:c,render:e}},a.isValidElement=C,a.lazy=function(e){return{$$typeof:h,_payload:{_status:-1,_result:e},_init:P}},a.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},a.startTransition=function(e){var t=x.T,n={};x.T=n;try{var r=e(),i=x.S;null!==i&&i(n,r),"object"==typeof r&&null!==r&&"function"==typeof r.then&&r.then(L,M)}catch(e){M(e)}finally{x.T=t}},a.unstable_useCacheRefresh=function(){return x.H.useCacheRefresh()},a.use=function(e){return x.H.use(e)},a.useActionState=function(e,t,n){return x.H.useActionState(e,t,n)},a.useCallback=function(e,t){return x.H.useCallback(e,t)},a.useContext=function(e){return x.H.useContext(e)},a.useDebugValue=function(){},a.useDeferredValue=function(e,t){return x.H.useDeferredValue(e,t)},a.useEffect=function(e,t,n){var r=x.H;if("function"==typeof n)throw Error("useEffect CRUD overload is not enabled in this build of React.");return r.useEffect(e,t)},a.useId=function(){return x.H.useId()},a.useImperativeHandle=function(e,t,n){return x.H.useImperativeHandle(e,t,n)},a.useInsertionEffect=function(e,t){return x.H.useInsertionEffect(e,t)},a.useLayoutEffect=function(e,t){return x.H.useLayoutEffect(e,t)},a.useMemo=function(e,t){return x.H.useMemo(e,t)},a.useOptimistic=function(e,t){return x.H.useOptimistic(e,t)},a.useReducer=function(e,t,n){return x.H.useReducer(e,t,n)},a.useRef=function(e){return x.H.useRef(e)},a.useState=function(e){return x.H.useState(e)},a.useSyncExternalStore=function(e,t,n){return x.H.useSyncExternalStore(e,t,n)},a.useTransition=function(){return x.H.useTransition()},a.version="19.1.0",a}function l(){return i||(i=1,o.exports=s()),o.exports}var c=l();const u=t(c),d=e({__proto__:null,default:u},[c]);var h,p,f={exports:{}},m={},g={exports:{}},b={};function y(){return p||(p=1,g.exports=(h||(h=1,function(e){function t(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,o=e[r];if(!(0<i(o,t)))break e;e[r]=t,e[n]=o,n=r}}function n(e){return 0===e.length?null:e[0]}function r(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length,a=o>>>1;r<a;){var s=2*(r+1)-1,l=e[s],c=s+1,u=e[c];if(0>i(l,n))c<o&&0>i(u,l)?(e[r]=u,e[c]=n,r=c):(e[r]=l,e[s]=n,r=s);else{if(!(c<o&&0>i(u,n)))break e;e[r]=u,e[c]=n,r=c}}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if(e.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var o=performance;e.unstable_now=function(){return o.now()}}else{var a=Date,s=a.now();e.unstable_now=function(){return a.now()-s}}var l=[],c=[],u=1,d=null,h=3,p=!1,f=!1,m=!1,g=!1,b="function"==typeof setTimeout?setTimeout:null,y="function"==typeof clearTimeout?clearTimeout:null,v="undefined"!=typeof setImmediate?setImmediate:null;function w(e){for(var i=n(c);null!==i;){if(null===i.callback)r(c);else{if(!(i.startTime<=e))break;r(c),i.sortIndex=i.expirationTime,t(l,i)}i=n(c)}}function k(e){if(m=!1,w(e),!f)if(null!==n(l))f=!0,_||(_=!0,x());else{var t=n(c);null!==t&&P(k,t.startTime-e)}}var x,_=!1,S=-1,C=5,E=-1;function z(){return!(!g&&e.unstable_now()-E<C)}function A(){if(g=!1,_){var t=e.unstable_now();E=t;var i=!0;try{e:{f=!1,m&&(m=!1,y(S),S=-1),p=!0;var o=h;try{t:{for(w(t),d=n(l);null!==d&&!(d.expirationTime>t&&z());){var a=d.callback;if("function"==typeof a){d.callback=null,h=d.priorityLevel;var s=a(d.expirationTime<=t);if(t=e.unstable_now(),"function"==typeof s){d.callback=s,w(t),i=!0;break t}d===n(l)&&r(l),w(t)}else r(l);d=n(l)}if(null!==d)i=!0;else{var u=n(c);null!==u&&P(k,u.startTime-t),i=!1}}break e}finally{d=null,h=o,p=!1}i=void 0}}finally{i?x():_=!1}}}if("function"==typeof v)x=function(){v(A)};else if("undefined"!=typeof MessageChannel){var $=new MessageChannel,T=$.port2;$.port1.onmessage=A,x=function(){T.postMessage(null)}}else x=function(){b(A,0)};function P(t,n){S=b(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e||(C=0<e?Math.floor(1e3/e):5)},e.unstable_getCurrentPriorityLevel=function(){return h},e.unstable_next=function(e){switch(h){case 1:case 2:case 3:var t=3;break;default:t=h}var n=h;h=t;try{return e()}finally{h=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=h;h=e;try{return t()}finally{h=n}},e.unstable_scheduleCallback=function(r,i,o){var a=e.unstable_now();switch(o="object"==typeof o&&null!==o&&"number"==typeof(o=o.delay)&&0<o?a+o:a,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return r={id:u++,callback:i,priorityLevel:r,startTime:o,expirationTime:s=o+s,sortIndex:-1},o>a?(r.sortIndex=o,t(c,r),null===n(l)&&r===n(c)&&(m?(y(S),S=-1):m=!0,P(k,o-a))):(r.sortIndex=s,t(l,r),f||p||(f=!0,_||(_=!0,x()))),r},e.unstable_shouldYield=z,e.unstable_wrapCallback=function(e){var t=h;return function(){var n=h;h=t;try{return e.apply(this,arguments)}finally{h=n}}}}(b)),b)),g.exports}var v,w,k,x,_={exports:{}},S={};function C(){if(v)return S;v=1;var e=l();function t(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var r={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},i=Symbol.for("react.portal");var o=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function a(e,t){return"font"===e?"":"string"==typeof t?"use-credentials"===t?t:"":void 0}return S.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,S.createPortal=function(e,n){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!n||1!==n.nodeType&&9!==n.nodeType&&11!==n.nodeType)throw Error(t(299));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:i,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,n,null,r)},S.flushSync=function(e){var t=o.T,n=r.p;try{if(o.T=null,r.p=2,e)return e()}finally{o.T=t,r.p=n,r.d.f()}},S.preconnect=function(e,t){"string"==typeof e&&(t?t="string"==typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:t=null,r.d.C(e,t))},S.prefetchDNS=function(e){"string"==typeof e&&r.d.D(e)},S.preinit=function(e,t){if("string"==typeof e&&t&&"string"==typeof t.as){var n=t.as,i=a(n,t.crossOrigin),o="string"==typeof t.integrity?t.integrity:void 0,s="string"==typeof t.fetchPriority?t.fetchPriority:void 0;"style"===n?r.d.S(e,"string"==typeof t.precedence?t.precedence:void 0,{crossOrigin:i,integrity:o,fetchPriority:s}):"script"===n&&r.d.X(e,{crossOrigin:i,integrity:o,fetchPriority:s,nonce:"string"==typeof t.nonce?t.nonce:void 0})}},S.preinitModule=function(e,t){if("string"==typeof e)if("object"==typeof t&&null!==t){if(null==t.as||"script"===t.as){var n=a(t.as,t.crossOrigin);r.d.M(e,{crossOrigin:n,integrity:"string"==typeof t.integrity?t.integrity:void 0,nonce:"string"==typeof t.nonce?t.nonce:void 0})}}else null==t&&r.d.M(e)},S.preload=function(e,t){if("string"==typeof e&&"object"==typeof t&&null!==t&&"string"==typeof t.as){var n=t.as,i=a(n,t.crossOrigin);r.d.L(e,n,{crossOrigin:i,integrity:"string"==typeof t.integrity?t.integrity:void 0,nonce:"string"==typeof t.nonce?t.nonce:void 0,type:"string"==typeof t.type?t.type:void 0,fetchPriority:"string"==typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"==typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"==typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"==typeof t.imageSizes?t.imageSizes:void 0,media:"string"==typeof t.media?t.media:void 0})}},S.preloadModule=function(e,t){if("string"==typeof e)if(t){var n=a(t.as,t.crossOrigin);r.d.m(e,{as:"string"==typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:n,integrity:"string"==typeof t.integrity?t.integrity:void 0})}else r.d.m(e)},S.requestFormReset=function(e){r.d.r(e)},S.unstable_batchedUpdates=function(e,t){return e(t)},S.useFormState=function(e,t,n){return o.H.useFormState(e,t,n)},S.useFormStatus=function(){return o.H.useHostTransitionStatus()},S.version="19.1.0",S}function E(){if(k)return m;k=1;var e=y(),t=l(),n=(w||(w=1,function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){}}(),_.exports=C()),_.exports);function r(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{!!(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function a(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function s(e){if(o(e)!==e)throw Error(r(188))}function c(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e;for(e=e.child;null!==e;){if(null!==(t=c(e)))return t;e=e.sibling}return null}var u=Object.assign,d=Symbol.for("react.element"),h=Symbol.for("react.transitional.element"),p=Symbol.for("react.portal"),f=Symbol.for("react.fragment"),g=Symbol.for("react.strict_mode"),b=Symbol.for("react.profiler"),v=Symbol.for("react.provider"),x=Symbol.for("react.consumer"),S=Symbol.for("react.context"),E=Symbol.for("react.forward_ref"),z=Symbol.for("react.suspense"),A=Symbol.for("react.suspense_list"),$=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),P=Symbol.for("react.activity"),M=Symbol.for("react.memo_cache_sentinel"),L=Symbol.iterator;function D(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=L&&e[L]||e["@@iterator"])?e:null}var I=Symbol.for("react.client.reference");function N(e){if(null==e)return null;if("function"==typeof e)return e.$$typeof===I?null:e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case f:return"Fragment";case b:return"Profiler";case g:return"StrictMode";case z:return"Suspense";case A:return"SuspenseList";case P:return"Activity"}if("object"==typeof e)switch(e.$$typeof){case p:return"Portal";case S:return(e.displayName||"Context")+".Provider";case x:return(e._context.displayName||"Context")+".Consumer";case E:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case $:return null!==(t=e.displayName||null)?t:N(e.type)||"Memo";case T:t=e._payload,e=e._init;try{return N(e(t))}catch(e){}}return null}var O=Array.isArray,F=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,R={pending:!1,data:null,method:null,action:null},B=[],U=-1;function H(e){return{current:e}}function j(e){0>U||(e.current=B[U],B[U]=null,U--)}function q(e,t){U++,B[U]=e.current,e.current=t}var W=H(null),K=H(null),G=H(null),Q=H(null);function Y(e,t){switch(q(G,t),q(K,e),q(W,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?ld(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)e=cd(t=ld(t),e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}j(W),q(W,e)}function X(){j(W),j(K),j(G)}function Z(e){null!==e.memoizedState&&q(Q,e);var t=W.current,n=cd(t,e.type);t!==n&&(q(K,e),q(W,n))}function J(e){K.current===e&&(j(W),j(K)),Q.current===e&&(j(Q),Zd._currentValue=R)}var ee=Object.prototype.hasOwnProperty,te=e.unstable_scheduleCallback,ne=e.unstable_cancelCallback,re=e.unstable_shouldYield,ie=e.unstable_requestPaint,oe=e.unstable_now,ae=e.unstable_getCurrentPriorityLevel,se=e.unstable_ImmediatePriority,le=e.unstable_UserBlockingPriority,ce=e.unstable_NormalPriority,ue=e.unstable_LowPriority,de=e.unstable_IdlePriority,he=e.log,pe=e.unstable_setDisableYieldValue,fe=null,me=null;function ge(e){if("function"==typeof he&&pe(e),me&&"function"==typeof me.setStrictMode)try{me.setStrictMode(fe,e)}catch(e){}}var be=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(ye(e)/ve|0)|0},ye=Math.log,ve=Math.LN2;var we=256,ke=4194304;function xe(e){var t=42&e;if(0!==t)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194048&e;case 4194304:case 8388608:case 16777216:case 33554432:return 62914560&e;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function _e(e,t,n){var r=e.pendingLanes;if(0===r)return 0;var i=0,o=e.suspendedLanes,a=e.pingedLanes;e=e.warmLanes;var s=134217727&r;return 0!==s?0!==(r=s&~o)?i=xe(r):0!==(a&=s)?i=xe(a):n||0!==(n=s&~e)&&(i=xe(n)):0!==(s=r&~o)?i=xe(s):0!==a?i=xe(a):n||0!==(n=r&~e)&&(i=xe(n)),0===i?0:0!==t&&t!==i&&0===(t&o)&&((o=i&-i)>=(n=t&-t)||32===o&&4194048&n)?t:i}function Se(e,t){return 0===(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)}function Ce(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function Ee(){var e=we;return!(4194048&(we<<=1))&&(we=256),e}function ze(){var e=ke;return!(62914560&(ke<<=1))&&(ke=4194304),e}function Ae(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function $e(e,t){e.pendingLanes|=t,268435456!==t&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Te(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-be(t);e.entangledLanes|=t,e.entanglements[r]=1073741824|e.entanglements[r]|4194090&n}function Pe(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-be(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function Me(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Le(e){return 2<(e&=-e)?8<e?134217727&e?32:268435456:8:2}function De(){var e=V.p;return 0!==e?e:void 0===(e=window.event)?32:ph(e.type)}var Ie=Math.random().toString(36).slice(2),Ne="__reactFiber$"+Ie,Oe="__reactProps$"+Ie,Fe="__reactContainer$"+Ie,Ve="__reactEvents$"+Ie,Re="__reactListeners$"+Ie,Be="__reactHandles$"+Ie,Ue="__reactResources$"+Ie,He="__reactMarker$"+Ie;function je(e){delete e[Ne],delete e[Oe],delete e[Ve],delete e[Re],delete e[Be]}function qe(e){var t=e[Ne];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Fe]||n[Ne]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=_d(e);null!==e;){if(n=e[Ne])return n;e=_d(e)}return t}n=(e=n).parentNode}return null}function We(e){if(e=e[Ne]||e[Fe]){var t=e.tag;if(5===t||6===t||13===t||26===t||27===t||3===t)return e}return null}function Ke(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e.stateNode;throw Error(r(33))}function Ge(e){var t=e[Ue];return t||(t=e[Ue]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Qe(e){e[He]=!0}var Ye=new Set,Xe={};function Ze(e,t){Je(e,t),Je(e+"Capture",t)}function Je(e,t){for(Xe[e]=t,e=0;e<t.length;e++)Ye.add(t[e])}var et,tt,nt=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),rt={},it={};function ot(e,t,n){if(i=t,ee.call(it,i)||!ee.call(rt,i)&&(nt.test(i)?it[i]=!0:(rt[i]=!0,0)))if(null===n)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":return void e.removeAttribute(t);case"boolean":var r=t.toLowerCase().slice(0,5);if("data-"!==r&&"aria-"!==r)return void e.removeAttribute(t)}e.setAttribute(t,""+n)}var i}function at(e,t,n){if(null===n)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(t)}e.setAttribute(t,""+n)}}function st(e,t,n,r){if(null===r)e.removeAttribute(n);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(n)}e.setAttributeNS(t,n,""+r)}}function lt(e){if(void 0===et)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);et=t&&t[1]||"",tt=-1<e.stack.indexOf("\n    at")?" (<anonymous>)":-1<e.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+et+e+tt}var ct=!1;function ut(e,t){if(!e||ct)return"";ct=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&"function"==typeof n.catch&&n.catch(function(){})}}catch(e){if(e&&r&&"string"==typeof e.stack)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var o=r.DetermineComponentFrameRoot(),a=o[0],s=o[1];if(a&&s){var l=a.split("\n"),c=s.split("\n");for(i=r=0;r<l.length&&!l[r].includes("DetermineComponentFrameRoot");)r++;for(;i<c.length&&!c[i].includes("DetermineComponentFrameRoot");)i++;if(r===l.length||i===c.length)for(r=l.length-1,i=c.length-1;1<=r&&0<=i&&l[r]!==c[i];)i--;for(;1<=r&&0<=i;r--,i--)if(l[r]!==c[i]){if(1!==r||1!==i)do{if(r--,0>--i||l[r]!==c[i]){var u="\n"+l[r].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}}while(1<=r&&0<=i);break}}}finally{ct=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?lt(n):""}function dt(e){switch(e.tag){case 26:case 27:case 5:return lt(e.type);case 16:return lt("Lazy");case 13:return lt("Suspense");case 19:return lt("SuspenseList");case 0:case 15:return ut(e.type,!1);case 11:return ut(e.type.render,!1);case 1:return ut(e.type,!0);case 31:return lt("Activity");default:return""}}function ht(e){try{var t="";do{t+=dt(e),e=e.return}while(e);return t}catch(e){return"\nError generating stack: "+e.message+"\n"+e.stack}}function pt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function ft(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function mt(e){e._valueTracker||(e._valueTracker=function(e){var t=ft(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&void 0!==n&&"function"==typeof n.get&&"function"==typeof n.set){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=""+e,o.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function gt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ft(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function bt(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}var yt=/[\n"\\]/g;function vt(e){return e.replace(yt,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function wt(e,t,n,r,i,o,a,s){e.name="",null!=a&&"function"!=typeof a&&"symbol"!=typeof a&&"boolean"!=typeof a?e.type=a:e.removeAttribute("type"),null!=t?"number"===a?(0===t&&""===e.value||e.value!=t)&&(e.value=""+pt(t)):e.value!==""+pt(t)&&(e.value=""+pt(t)):"submit"!==a&&"reset"!==a||e.removeAttribute("value"),null!=t?xt(e,a,pt(t)):null!=n?xt(e,a,pt(n)):null!=r&&e.removeAttribute("value"),null==i&&null!=o&&(e.defaultChecked=!!o),null!=i&&(e.checked=i&&"function"!=typeof i&&"symbol"!=typeof i),null!=s&&"function"!=typeof s&&"symbol"!=typeof s&&"boolean"!=typeof s?e.name=""+pt(s):e.removeAttribute("name")}function kt(e,t,n,r,i,o,a,s){if(null!=o&&"function"!=typeof o&&"symbol"!=typeof o&&"boolean"!=typeof o&&(e.type=o),null!=t||null!=n){if(("submit"===o||"reset"===o)&&null==t)return;n=null!=n?""+pt(n):"",t=null!=t?""+pt(t):n,s||t===e.value||(e.value=t),e.defaultValue=t}r="function"!=typeof(r=null!=r?r:i)&&"symbol"!=typeof r&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,null!=a&&"function"!=typeof a&&"symbol"!=typeof a&&"boolean"!=typeof a&&(e.name=a)}function xt(e,t,n){"number"===t&&bt(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function _t(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+pt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n)return e[i].selected=!0,void(r&&(e[i].defaultSelected=!0));null!==t||e[i].disabled||(t=e[i])}null!==t&&(t.selected=!0)}}function St(e,t,n){null==t||((t=""+pt(t))!==e.value&&(e.value=t),null!=n)?e.defaultValue=null!=n?""+pt(n):"":e.defaultValue!==t&&(e.defaultValue=t)}function Ct(e,t,n,i){if(null==t){if(null!=i){if(null!=n)throw Error(r(92));if(O(i)){if(1<i.length)throw Error(r(93));i=i[0]}n=i}null==n&&(n=""),t=n}n=pt(t),e.defaultValue=n,(i=e.textContent)===n&&""!==i&&null!==i&&(e.value=i)}function Et(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var zt=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function At(e,t,n){var r=0===t.indexOf("--");null==n||"boolean"==typeof n||""===n?r?e.setProperty(t,""):"float"===t?e.cssFloat="":e[t]="":r?e.setProperty(t,n):"number"!=typeof n||0===n||zt.has(t)?"float"===t?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function $t(e,t,n){if(null!=t&&"object"!=typeof t)throw Error(r(62));if(e=e.style,null!=n){for(var i in n)!n.hasOwnProperty(i)||null!=t&&t.hasOwnProperty(i)||(0===i.indexOf("--")?e.setProperty(i,""):"float"===i?e.cssFloat="":e[i]="");for(var o in t)i=t[o],t.hasOwnProperty(o)&&n[o]!==i&&At(e,o,i)}else for(var a in t)t.hasOwnProperty(a)&&At(e,a,t[a])}function Tt(e){if(-1===e.indexOf("-"))return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Pt=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Mt=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Lt(e){return Mt.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var Dt=null;function It(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Nt=null,Ot=null;function Ft(e){var t=We(e);if(t&&(e=t.stateNode)){var n=e[Oe]||null;e:switch(e=t.stateNode,t.type){case"input":if(wt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+vt(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var o=i[Oe]||null;if(!o)throw Error(r(90));wt(i,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(t=0;t<n.length;t++)(i=n[t]).form===e.form&&gt(i)}break e;case"textarea":St(e,n.value,n.defaultValue);break e;case"select":null!=(t=n.value)&&_t(e,!!n.multiple,t,!1)}}}var Vt=!1;function Rt(e,t,n){if(Vt)return e(t,n);Vt=!0;try{return e(t)}finally{if(Vt=!1,(null!==Nt||null!==Ot)&&(qc(),Nt&&(t=Nt,e=Ot,Ot=Nt=null,Ft(t),e)))for(t=0;t<e.length;t++)Ft(e[t])}}function Bt(e,t){var n=e.stateNode;if(null===n)return null;var i=n[Oe]||null;if(null===i)return null;n=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(i=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!i;break e;default:e=!1}if(e)return null;if(n&&"function"!=typeof n)throw Error(r(231,t,typeof n));return n}var Ut=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement),Ht=!1;if(Ut)try{var jt={};Object.defineProperty(jt,"passive",{get:function(){Ht=!0}}),window.addEventListener("test",jt,jt),window.removeEventListener("test",jt,jt)}catch(e){Ht=!1}var qt=null,Wt=null,Kt=null;function Gt(){if(Kt)return Kt;var e,t,n=Wt,r=n.length,i="value"in qt?qt.value:qt.textContent,o=i.length;for(e=0;e<r&&n[e]===i[e];e++);var a=r-e;for(t=1;t<=a&&n[r-t]===i[o-t];t++);return Kt=i.slice(e,1<t?1-t:void 0)}function Qt(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function Yt(){return!0}function Xt(){return!1}function Zt(e){function t(t,n,r,i,o){for(var a in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=o,this.currentTarget=null,e)e.hasOwnProperty(a)&&(t=e[a],this[a]=t?t(i):i[a]);return this.isDefaultPrevented=(null!=i.defaultPrevented?i.defaultPrevented:!1===i.returnValue)?Yt:Xt,this.isPropagationStopped=Xt,this}return u(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=Yt)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=Yt)},persist:function(){},isPersistent:Yt}),t}var Jt,en,tn,nn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},rn=Zt(nn),on=u({},nn,{view:0,detail:0}),an=Zt(on),sn=u({},on,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:yn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==tn&&(tn&&"mousemove"===e.type?(Jt=e.screenX-tn.screenX,en=e.screenY-tn.screenY):en=Jt=0,tn=e),Jt)},movementY:function(e){return"movementY"in e?e.movementY:en}}),ln=Zt(sn),cn=Zt(u({},sn,{dataTransfer:0})),un=Zt(u({},on,{relatedTarget:0})),dn=Zt(u({},nn,{animationName:0,elapsedTime:0,pseudoElement:0})),hn=Zt(u({},nn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),pn=Zt(u({},nn,{data:0})),fn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},mn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},gn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function bn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=gn[e])&&!!t[e]}function yn(){return bn}var vn=Zt(u({},on,{key:function(e){if(e.key){var t=fn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=Qt(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?mn[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:yn,charCode:function(e){return"keypress"===e.type?Qt(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?Qt(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),wn=Zt(u({},sn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),kn=Zt(u({},on,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:yn})),xn=Zt(u({},nn,{propertyName:0,elapsedTime:0,pseudoElement:0})),_n=Zt(u({},sn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Sn=Zt(u({},nn,{newState:0,oldState:0})),Cn=[9,13,27,32],En=Ut&&"CompositionEvent"in window,zn=null;Ut&&"documentMode"in document&&(zn=document.documentMode);var An=Ut&&"TextEvent"in window&&!zn,$n=Ut&&(!En||zn&&8<zn&&11>=zn),Tn=String.fromCharCode(32),Pn=!1;function Mn(e,t){switch(e){case"keyup":return-1!==Cn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ln(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}var Dn=!1;var In={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Nn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!In[e.type]:"textarea"===t}function On(e,t,n,r){Nt?Ot?Ot.push(r):Ot=[r]:Nt=r,0<(t=Gu(t,"onChange")).length&&(n=new rn("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Fn=null,Vn=null;function Rn(e){Ru(e,0)}function Bn(e){if(gt(Ke(e)))return e}function Un(e,t){if("change"===e)return t}var Hn=!1;if(Ut){var jn;if(Ut){var qn="oninput"in document;if(!qn){var Wn=document.createElement("div");Wn.setAttribute("oninput","return;"),qn="function"==typeof Wn.oninput}jn=qn}else jn=!1;Hn=jn&&(!document.documentMode||9<document.documentMode)}function Kn(){Fn&&(Fn.detachEvent("onpropertychange",Gn),Vn=Fn=null)}function Gn(e){if("value"===e.propertyName&&Bn(Vn)){var t=[];On(t,Vn,e,It(e)),Rt(Rn,t)}}function Qn(e,t,n){"focusin"===e?(Kn(),Vn=n,(Fn=t).attachEvent("onpropertychange",Gn)):"focusout"===e&&Kn()}function Yn(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Bn(Vn)}function Xn(e,t){if("click"===e)return Bn(t)}function Zn(e,t){if("input"===e||"change"===e)return Bn(t)}var Jn="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t};function er(e,t){if(Jn(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!ee.call(t,i)||!Jn(e[i],t[i]))return!1}return!0}function tr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function nr(e,t){var n,r=tr(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=tr(r)}}function rr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?rr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function ir(e){for(var t=bt((e=null!=e&&null!=e.ownerDocument&&null!=e.ownerDocument.defaultView?e.ownerDocument.defaultView:window).document);t instanceof e.HTMLIFrameElement;){try{var n="string"==typeof t.contentWindow.location.href}catch(e){n=!1}if(!n)break;t=bt((e=t.contentWindow).document)}return t}function or(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var ar=Ut&&"documentMode"in document&&11>=document.documentMode,sr=null,lr=null,cr=null,ur=!1;function dr(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;ur||null==sr||sr!==bt(r)||("selectionStart"in(r=sr)&&or(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},cr&&er(cr,r)||(cr=r,0<(r=Gu(lr,"onSelect")).length&&(t=new rn("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=sr)))}function hr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var pr={animationend:hr("Animation","AnimationEnd"),animationiteration:hr("Animation","AnimationIteration"),animationstart:hr("Animation","AnimationStart"),transitionrun:hr("Transition","TransitionRun"),transitionstart:hr("Transition","TransitionStart"),transitioncancel:hr("Transition","TransitionCancel"),transitionend:hr("Transition","TransitionEnd")},fr={},mr={};function gr(e){if(fr[e])return fr[e];if(!pr[e])return e;var t,n=pr[e];for(t in n)if(n.hasOwnProperty(t)&&t in mr)return fr[e]=n[t];return e}Ut&&(mr=document.createElement("div").style,"AnimationEvent"in window||(delete pr.animationend.animation,delete pr.animationiteration.animation,delete pr.animationstart.animation),"TransitionEvent"in window||delete pr.transitionend.transition);var br=gr("animationend"),yr=gr("animationiteration"),vr=gr("animationstart"),wr=gr("transitionrun"),kr=gr("transitionstart"),xr=gr("transitioncancel"),_r=gr("transitionend"),Sr=new Map,Cr="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Er(e,t){Sr.set(e,t),Ze(t,[e])}Cr.push("scrollEnd");var zr=new WeakMap;function Ar(e,t){if("object"==typeof e&&null!==e){var n=zr.get(e);return void 0!==n?n:(t={value:e,source:t,stack:ht(t)},zr.set(e,t),t)}return{value:e,source:t,stack:ht(t)}}var $r=[],Tr=0,Pr=0;function Mr(){for(var e=Tr,t=Pr=Tr=0;t<e;){var n=$r[t];$r[t++]=null;var r=$r[t];$r[t++]=null;var i=$r[t];$r[t++]=null;var o=$r[t];if($r[t++]=null,null!==r&&null!==i){var a=r.pending;null===a?i.next=i:(i.next=a.next,a.next=i),r.pending=i}0!==o&&Nr(n,i,o)}}function Lr(e,t,n,r){$r[Tr++]=e,$r[Tr++]=t,$r[Tr++]=n,$r[Tr++]=r,Pr|=r,e.lanes|=r,null!==(e=e.alternate)&&(e.lanes|=r)}function Dr(e,t,n,r){return Lr(e,t,n,r),Or(e)}function Ir(e,t){return Lr(e,null,null,t),Or(e)}function Nr(e,t,n){e.lanes|=n;var r=e.alternate;null!==r&&(r.lanes|=n);for(var i=!1,o=e.return;null!==o;)o.childLanes|=n,null!==(r=o.alternate)&&(r.childLanes|=n),22===o.tag&&(null===(e=o.stateNode)||1&e._visibility||(i=!0)),e=o,o=o.return;return 3===e.tag?(o=e.stateNode,i&&null!==t&&(i=31-be(n),null===(r=(e=o.hiddenUpdates)[i])?e[i]=[t]:r.push(t),t.lane=536870912|n),o):null}function Or(e){if(50<Nc)throw Nc=0,Oc=null,Error(r(185));for(var t=e.return;null!==t;)t=(e=t).return;return 3===e.tag?e.stateNode:null}var Fr={};function Vr(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Rr(e,t,n,r){return new Vr(e,t,n,r)}function Br(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Ur(e,t){var n=e.alternate;return null===n?((n=Rr(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=65011712&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Hr(e,t){e.flags&=65011714;var n=e.alternate;return null===n?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function jr(e,t,n,i,o,a){var s=0;if(i=e,"function"==typeof e)Br(e)&&(s=1);else if("string"==typeof e)s=function(e,t,n){if(1===n||null!=t.itemProp)return!1;switch(e){case"meta":case"title":return!0;case"style":if("string"!=typeof t.precedence||"string"!=typeof t.href||""===t.href)break;return!0;case"link":if("string"!=typeof t.rel||"string"!=typeof t.href||""===t.href||t.onLoad||t.onError)break;return"stylesheet"!==t.rel||(e=t.disabled,"string"==typeof t.precedence&&null==e);case"script":if(t.async&&"function"!=typeof t.async&&"symbol"!=typeof t.async&&!t.onLoad&&!t.onError&&t.src&&"string"==typeof t.src)return!0}return!1}(e,n,W.current)?26:"html"===e||"head"===e||"body"===e?27:5;else e:switch(e){case P:return(e=Rr(31,n,t,o)).elementType=P,e.lanes=a,e;case f:return qr(n.children,o,a,t);case g:s=8,o|=24;break;case b:return(e=Rr(12,n,t,2|o)).elementType=b,e.lanes=a,e;case z:return(e=Rr(13,n,t,o)).elementType=z,e.lanes=a,e;case A:return(e=Rr(19,n,t,o)).elementType=A,e.lanes=a,e;default:if("object"==typeof e&&null!==e)switch(e.$$typeof){case v:case S:s=10;break e;case x:s=9;break e;case E:s=11;break e;case $:s=14;break e;case T:s=16,i=null;break e}s=29,n=Error(r(130,null===e?"null":typeof e,"")),i=null}return(t=Rr(s,n,t,o)).elementType=e,t.type=i,t.lanes=a,t}function qr(e,t,n,r){return(e=Rr(7,e,r,t)).lanes=n,e}function Wr(e,t,n){return(e=Rr(6,e,null,t)).lanes=n,e}function Kr(e,t,n){return(t=Rr(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Gr=[],Qr=0,Yr=null,Xr=0,Zr=[],Jr=0,ei=null,ti=1,ni="";function ri(e,t){Gr[Qr++]=Xr,Gr[Qr++]=Yr,Yr=e,Xr=t}function ii(e,t,n){Zr[Jr++]=ti,Zr[Jr++]=ni,Zr[Jr++]=ei,ei=e;var r=ti;e=ni;var i=32-be(r)-1;r&=~(1<<i),n+=1;var o=32-be(t)+i;if(30<o){var a=i-i%5;o=(r&(1<<a)-1).toString(32),r>>=a,i-=a,ti=1<<32-be(t)+i|n<<i|r,ni=o+e}else ti=1<<o|n<<i|r,ni=e}function oi(e){null!==e.return&&(ri(e,1),ii(e,1,0))}function ai(e){for(;e===Yr;)Yr=Gr[--Qr],Gr[Qr]=null,Xr=Gr[--Qr],Gr[Qr]=null;for(;e===ei;)ei=Zr[--Jr],Zr[Jr]=null,ni=Zr[--Jr],Zr[Jr]=null,ti=Zr[--Jr],Zr[Jr]=null}var si=null,li=null,ci=!1,ui=null,di=!1,hi=Error(r(519));function pi(e){throw vi(Ar(Error(r(418,"")),e)),hi}function fi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Ne]=e,t[Oe]=r,n){case"dialog":Bu("cancel",t),Bu("close",t);break;case"iframe":case"object":case"embed":Bu("load",t);break;case"video":case"audio":for(n=0;n<Fu.length;n++)Bu(Fu[n],t);break;case"source":Bu("error",t);break;case"img":case"image":case"link":Bu("error",t),Bu("load",t);break;case"details":Bu("toggle",t);break;case"input":Bu("invalid",t),kt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0),mt(t);break;case"select":Bu("invalid",t);break;case"textarea":Bu("invalid",t),Ct(t,r.value,r.defaultValue,r.children),mt(t)}"string"!=typeof(n=r.children)&&"number"!=typeof n&&"bigint"!=typeof n||t.textContent===""+n||!0===r.suppressHydrationWarning||ed(t.textContent,n)?(null!=r.popover&&(Bu("beforetoggle",t),Bu("toggle",t)),null!=r.onScroll&&Bu("scroll",t),null!=r.onScrollEnd&&Bu("scrollend",t),null!=r.onClick&&(t.onclick=td),t=!0):t=!1,t||pi(e)}function mi(e){for(si=e.return;si;)switch(si.tag){case 5:case 13:return void(di=!1);case 27:case 3:return void(di=!0);default:si=si.return}}function gi(e){if(e!==si)return!1;if(!ci)return mi(e),ci=!0,!1;var t,n=e.tag;if((t=3!==n&&27!==n)&&((t=5===n)&&(t=!("form"!==(t=e.type)&&"button"!==t)||ud(e.type,e.memoizedProps)),t=!t),t&&li&&pi(e),mi(e),13===n){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(r(317));e:{for(e=e.nextSibling,n=0;e;){if(8===e.nodeType)if("/$"===(t=e.data)){if(0===n){li=kd(e.nextSibling);break e}n--}else"$"!==t&&"$!"!==t&&"$?"!==t||n++;e=e.nextSibling}li=null}}else 27===n?(n=li,bd(e.type)?(e=xd,xd=null,li=e):li=n):li=si?kd(e.stateNode.nextSibling):null;return!0}function bi(){li=si=null,ci=!1}function yi(){var e=ui;return null!==e&&(null===_c?_c=e:_c.push.apply(_c,e),ui=null),e}function vi(e){null===ui?ui=[e]:ui.push(e)}var wi=H(null),ki=null,xi=null;function _i(e,t,n){q(wi,t._currentValue),t._currentValue=n}function Si(e){e._currentValue=wi.current,j(wi)}function Ci(e,t,n){for(;null!==e;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Ei(e,t,n,i){var o=e.child;for(null!==o&&(o.return=e);null!==o;){var a=o.dependencies;if(null!==a){var s=o.child;a=a.firstContext;e:for(;null!==a;){var l=a;a=o;for(var c=0;c<t.length;c++)if(l.context===t[c]){a.lanes|=n,null!==(l=a.alternate)&&(l.lanes|=n),Ci(a.return,n,e),i||(s=null);break e}a=l.next}}else if(18===o.tag){if(null===(s=o.return))throw Error(r(341));s.lanes|=n,null!==(a=s.alternate)&&(a.lanes|=n),Ci(s,n,e),s=null}else s=o.child;if(null!==s)s.return=o;else for(s=o;null!==s;){if(s===e){s=null;break}if(null!==(o=s.sibling)){o.return=s.return,s=o;break}s=s.return}o=s}}function zi(e,t,n,i){e=null;for(var o=t,a=!1;null!==o;){if(!a)if(524288&o.flags)a=!0;else if(262144&o.flags)break;if(10===o.tag){var s=o.alternate;if(null===s)throw Error(r(387));if(null!==(s=s.memoizedProps)){var l=o.type;Jn(o.pendingProps.value,s.value)||(null!==e?e.push(l):e=[l])}}else if(o===Q.current){if(null===(s=o.alternate))throw Error(r(387));s.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(null!==e?e.push(Zd):e=[Zd])}o=o.return}null!==e&&Ei(t,e,n,i),t.flags|=262144}function Ai(e){for(e=e.firstContext;null!==e;){if(!Jn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function $i(e){ki=e,xi=null,null!==(e=e.dependencies)&&(e.firstContext=null)}function Ti(e){return Mi(ki,e)}function Pi(e,t){return null===ki&&$i(e),Mi(e,t)}function Mi(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},null===xi){if(null===e)throw Error(r(308));xi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else xi=xi.next=t;return n}var Li="undefined"!=typeof AbortController?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Di=e.unstable_scheduleCallback,Ii=e.unstable_NormalPriority,Ni={$$typeof:S,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Oi(){return{controller:new Li,data:new Map,refCount:0}}function Fi(e){e.refCount--,0===e.refCount&&Di(Ii,function(){e.controller.abort()})}var Vi=null,Ri=0,Bi=0,Ui=null;function Hi(){if(0===--Ri&&null!==Vi){null!==Ui&&(Ui.status="fulfilled");var e=Vi;Vi=null,Bi=0,Ui=null;for(var t=0;t<e.length;t++)(0,e[t])()}}var ji=F.S;F.S=function(e,t){"object"==typeof t&&null!==t&&"function"==typeof t.then&&function(e,t){if(null===Vi){var n=Vi=[];Ri=0,Bi=Lu(),Ui={status:"pending",value:void 0,then:function(e){n.push(e)}}}Ri++,t.then(Hi,Hi)}(0,t),null!==ji&&ji(e,t)};var qi=H(null);function Wi(){var e=qi.current;return null!==e?e:sc.pooledCache}function Ki(e,t){q(qi,null===t?qi.current:t.pool)}function Gi(){var e=Wi();return null===e?null:{parent:Ni._currentValue,pool:e}}var Qi=Error(r(460)),Yi=Error(r(474)),Xi=Error(r(542)),Zi={then:function(){}};function Ji(e){return"fulfilled"===(e=e.status)||"rejected"===e}function eo(){}function to(e,t,n){switch(void 0===(n=e[n])?e.push(t):n!==t&&(t.then(eo,eo),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw io(e=t.reason),e;default:if("string"==typeof t.status)t.then(eo,eo);else{if(null!==(e=sc)&&100<e.shellSuspendCounter)throw Error(r(482));(e=t).status="pending",e.then(function(e){if("pending"===t.status){var n=t;n.status="fulfilled",n.value=e}},function(e){if("pending"===t.status){var n=t;n.status="rejected",n.reason=e}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw io(e=t.reason),e}throw no=t,Qi}}var no=null;function ro(){if(null===no)throw Error(r(459));var e=no;return no=null,e}function io(e){if(e===Qi||e===Xi)throw Error(r(483))}var oo=!1;function ao(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function so(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function lo(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function co(e,t,n){var r=e.updateQueue;if(null===r)return null;if(r=r.shared,2&ac){var i=r.pending;return null===i?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Or(e),Nr(e,null,n),t}return Lr(e,r,t,n),Or(e)}function uo(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,4194048&n)){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,Pe(e,n)}}function ho(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var i=null,o=null;if(null!==(n=n.firstBaseUpdate)){do{var a={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};null===o?i=o=a:o=o.next=a,n=n.next}while(null!==n);null===o?i=o=t:o=o.next=t}else i=o=t;return n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,callbacks:r.callbacks},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var po=!1;function fo(){if(po){if(null!==Ui)throw Ui}}function mo(e,t,n,r){po=!1;var i=e.updateQueue;oo=!1;var o=i.firstBaseUpdate,a=i.lastBaseUpdate,s=i.shared.pending;if(null!==s){i.shared.pending=null;var l=s,c=l.next;l.next=null,null===a?o=c:a.next=c,a=l;var d=e.alternate;null!==d&&((s=(d=d.updateQueue).lastBaseUpdate)!==a&&(null===s?d.firstBaseUpdate=c:s.next=c,d.lastBaseUpdate=l))}if(null!==o){var h=i.baseState;for(a=0,d=c=l=null,s=o;;){var p=-536870913&s.lane,f=p!==s.lane;if(f?(cc&p)===p:(r&p)===p){0!==p&&p===Bi&&(po=!0),null!==d&&(d=d.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});e:{var m=e,g=s;p=t;var b=n;switch(g.tag){case 1:if("function"==typeof(m=g.payload)){h=m.call(b,h,p);break e}h=m;break e;case 3:m.flags=-65537&m.flags|128;case 0:if(null==(p="function"==typeof(m=g.payload)?m.call(b,h,p):m))break e;h=u({},h,p);break e;case 2:oo=!0}}null!==(p=s.callback)&&(e.flags|=64,f&&(e.flags|=8192),null===(f=i.callbacks)?i.callbacks=[p]:f.push(p))}else f={lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},null===d?(c=d=f,l=h):d=d.next=f,a|=p;if(null===(s=s.next)){if(null===(s=i.shared.pending))break;s=(f=s).next,f.next=null,i.lastBaseUpdate=f,i.shared.pending=null}}null===d&&(l=h),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=d,null===o&&(i.shared.lanes=0),bc|=a,e.lanes=a,e.memoizedState=h}}function go(e,t){if("function"!=typeof e)throw Error(r(191,e));e.call(t)}function bo(e,t){var n=e.callbacks;if(null!==n)for(e.callbacks=null,e=0;e<n.length;e++)go(n[e],t)}var yo=H(null),vo=H(0);function wo(e,t){q(vo,e=mc),q(yo,t),mc=e|t.baseLanes}function ko(){q(vo,mc),q(yo,yo.current)}function xo(){mc=vo.current,j(yo),j(vo)}var _o=0,So=null,Co=null,Eo=null,zo=!1,Ao=!1,$o=!1,To=0,Po=0,Mo=null,Lo=0;function Do(){throw Error(r(321))}function Io(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Jn(e[n],t[n]))return!1;return!0}function No(e,t,n,r,i,o){return _o=o,So=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,F.H=null===e||null===e.memoizedState?Ya:Xa,$o=!1,o=n(r,i),$o=!1,Ao&&(o=Fo(t,n,r,i)),Oo(e),o}function Oo(e){F.H=Qa;var t=null!==Co&&null!==Co.next;if(_o=0,Eo=Co=So=null,zo=!1,Po=0,Mo=null,t)throw Error(r(300));null===e||Ps||null!==(e=e.dependencies)&&Ai(e)&&(Ps=!0)}function Fo(e,t,n,i){So=e;var o=0;do{if(Ao&&(Mo=null),Po=0,Ao=!1,25<=o)throw Error(r(301));if(o+=1,Eo=Co=null,null!=e.updateQueue){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,null!=a.memoCache&&(a.memoCache.index=0)}F.H=Za,a=t(n,i)}while(Ao);return a}function Vo(){var e=F.H,t=e.useState()[0];return t="function"==typeof t.then?qo(t):t,e=e.useState()[0],(null!==Co?Co.memoizedState:null)!==e&&(So.flags|=1024),t}function Ro(){var e=0!==To;return To=0,e}function Bo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Uo(e){if(zo){for(e=e.memoizedState;null!==e;){var t=e.queue;null!==t&&(t.pending=null),e=e.next}zo=!1}_o=0,Eo=Co=So=null,Ao=!1,Po=To=0,Mo=null}function Ho(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===Eo?So.memoizedState=Eo=e:Eo=Eo.next=e,Eo}function jo(){if(null===Co){var e=So.alternate;e=null!==e?e.memoizedState:null}else e=Co.next;var t=null===Eo?So.memoizedState:Eo.next;if(null!==t)Eo=t,Co=e;else{if(null===e){if(null===So.alternate)throw Error(r(467));throw Error(r(310))}e={memoizedState:(Co=e).memoizedState,baseState:Co.baseState,baseQueue:Co.baseQueue,queue:Co.queue,next:null},null===Eo?So.memoizedState=Eo=e:Eo=Eo.next=e}return Eo}function qo(e){var t=Po;return Po+=1,null===Mo&&(Mo=[]),e=to(Mo,e,t),t=So,null===(null===Eo?t.memoizedState:Eo.next)&&(t=t.alternate,F.H=null===t||null===t.memoizedState?Ya:Xa),e}function Wo(e){if(null!==e&&"object"==typeof e){if("function"==typeof e.then)return qo(e);if(e.$$typeof===S)return Ti(e)}throw Error(r(438,String(e)))}function Ko(e){var t=null,n=So.updateQueue;if(null!==n&&(t=n.memoCache),null==t){var r=So.alternate;null!==r&&(null!==(r=r.updateQueue)&&(null!=(r=r.memoCache)&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(null==t&&(t={data:[],index:0}),null===n&&(n={lastEffect:null,events:null,stores:null,memoCache:null},So.updateQueue=n),n.memoCache=t,void 0===(n=t.data[t.index]))for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=M;return t.index++,n}function Go(e,t){return"function"==typeof t?t(e):t}function Qo(e){return Yo(jo(),Co,e)}function Yo(e,t,n){var i=e.queue;if(null===i)throw Error(r(311));i.lastRenderedReducer=n;var o=e.baseQueue,a=i.pending;if(null!==a){if(null!==o){var s=o.next;o.next=a.next,a.next=s}t.baseQueue=o=a,i.pending=null}if(a=e.baseState,null===o)e.memoizedState=a;else{var l=s=null,c=null,u=t=o.next,d=!1;do{var h=-536870913&u.lane;if(h!==u.lane?(cc&h)===h:(_o&h)===h){var p=u.revertLane;if(0===p)null!==c&&(c=c.next={lane:0,revertLane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),h===Bi&&(d=!0);else{if((_o&p)===p){u=u.next,p===Bi&&(d=!0);continue}h={lane:0,revertLane:u.revertLane,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},null===c?(l=c=h,s=a):c=c.next=h,So.lanes|=p,bc|=p}h=u.action,$o&&n(a,h),a=u.hasEagerState?u.eagerState:n(a,h)}else p={lane:h,revertLane:u.revertLane,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},null===c?(l=c=p,s=a):c=c.next=p,So.lanes|=h,bc|=h;u=u.next}while(null!==u&&u!==t);if(null===c?s=a:c.next=l,!Jn(a,e.memoizedState)&&(Ps=!0,d&&null!==(n=Ui)))throw n;e.memoizedState=a,e.baseState=s,e.baseQueue=c,i.lastRenderedState=a}return null===o&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Xo(e){var t=jo(),n=t.queue;if(null===n)throw Error(r(311));n.lastRenderedReducer=e;var i=n.dispatch,o=n.pending,a=t.memoizedState;if(null!==o){n.pending=null;var s=o=o.next;do{a=e(a,s.action),s=s.next}while(s!==o);Jn(a,t.memoizedState)||(Ps=!0),t.memoizedState=a,null===t.baseQueue&&(t.baseState=a),n.lastRenderedState=a}return[a,i]}function Zo(e,t,n){var i=So,o=jo(),a=ci;if(a){if(void 0===n)throw Error(r(407));n=n()}else n=t();var s=!Jn((Co||o).memoizedState,n);if(s&&(o.memoizedState=n,Ps=!0),o=o.queue,ka(2048,8,ta.bind(null,i,o,e),[e]),o.getSnapshot!==t||s||null!==Eo&&1&Eo.memoizedState.tag){if(i.flags|=2048,ya(9,{destroy:void 0,resource:void 0},ea.bind(null,i,o,n,t),null),null===sc)throw Error(r(349));a||124&_o||Jo(i,t,n)}return n}function Jo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=So.updateQueue)?(t={lastEffect:null,events:null,stores:null,memoCache:null},So.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function ea(e,t,n,r){t.value=n,t.getSnapshot=r,na(t)&&ra(e)}function ta(e,t,n){return n(function(){na(t)&&ra(e)})}function na(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Jn(e,n)}catch(e){return!0}}function ra(e){var t=Ir(e,2);null!==t&&Rc(t,e,2)}function ia(e){var t=Ho();if("function"==typeof e){var n=e;if(e=n(),$o){ge(!0);try{n()}finally{ge(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Go,lastRenderedState:e},t}function oa(e,t,n,r){return e.baseState=n,Yo(e,Co,"function"==typeof r?r:Go)}function aa(e,t,n,i,o){if(Wa(e))throw Error(r(485));if(null!==(e=t.action)){var a={payload:o,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(e){a.listeners.push(e)}};null!==F.T?n(!0):a.isTransition=!1,i(a),null===(n=t.pending)?(a.next=t.pending=a,sa(t,a)):(a.next=n.next,t.pending=n.next=a)}}function sa(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var o=F.T,a={};F.T=a;try{var s=n(i,r),l=F.S;null!==l&&l(a,s),la(e,t,s)}catch(n){ua(e,t,n)}finally{F.T=o}}else try{la(e,t,o=n(i,r))}catch(n){ua(e,t,n)}}function la(e,t,n){null!==n&&"object"==typeof n&&"function"==typeof n.then?n.then(function(n){ca(e,t,n)},function(n){return ua(e,t,n)}):ca(e,t,n)}function ca(e,t,n){t.status="fulfilled",t.value=n,da(t),e.state=n,null!==(t=e.pending)&&((n=t.next)===t?e.pending=null:(n=n.next,t.next=n,sa(e,n)))}function ua(e,t,n){var r=e.pending;if(e.pending=null,null!==r){r=r.next;do{t.status="rejected",t.reason=n,da(t),t=t.next}while(t!==r)}e.action=null}function da(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ha(e,t){return t}function pa(e,t){if(ci){var n=sc.formState;if(null!==n){e:{var r=So;if(ci){if(li){t:{for(var i=li,o=di;8!==i.nodeType;){if(!o){i=null;break t}if(null===(i=kd(i.nextSibling))){i=null;break t}}i="F!"===(o=i.data)||"F"===o?i:null}if(i){li=kd(i.nextSibling),r="F!"===i.data;break e}}pi(r)}r=!1}r&&(t=n[0])}}return(n=Ho()).memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:t},n.queue=r,n=Ha.bind(null,So,r),r.dispatch=n,r=ia(!1),o=qa.bind(null,So,!1,r.queue),i={state:t,dispatch:null,action:e,pending:null},(r=Ho()).queue=i,n=aa.bind(null,So,i,o,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function fa(e){return ma(jo(),Co,e)}function ma(e,t,n){if(t=Yo(e,t,ha)[0],e=Qo(Go)[0],"object"==typeof t&&null!==t&&"function"==typeof t.then)try{var r=qo(t)}catch(e){if(e===Qi)throw Xi;throw e}else r=t;var i=(t=jo()).queue,o=i.dispatch;return n!==t.memoizedState&&(So.flags|=2048,ya(9,{destroy:void 0,resource:void 0},ga.bind(null,i,n),null)),[r,o,e]}function ga(e,t){e.action=t}function ba(e){var t=jo(),n=Co;if(null!==n)return ma(t,n,e);jo(),t=t.memoizedState;var r=(n=jo()).queue.dispatch;return n.memoizedState=e,[t,r,!1]}function ya(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},null===(t=So.updateQueue)&&(t={lastEffect:null,events:null,stores:null,memoCache:null},So.updateQueue=t),null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function va(){return jo().memoizedState}function wa(e,t,n,r){var i=Ho();r=void 0===r?null:r,So.flags|=e,i.memoizedState=ya(1|t,{destroy:void 0,resource:void 0},n,r)}function ka(e,t,n,r){var i=jo();r=void 0===r?null:r;var o=i.memoizedState.inst;null!==Co&&null!==r&&Io(r,Co.memoizedState.deps)?i.memoizedState=ya(t,o,n,r):(So.flags|=e,i.memoizedState=ya(1|t,o,n,r))}function xa(e,t){wa(8390656,8,e,t)}function _a(e,t){ka(2048,8,e,t)}function Sa(e,t){return ka(4,2,e,t)}function Ca(e,t){return ka(4,4,e,t)}function Ea(e,t){if("function"==typeof t){e=e();var n=t(e);return function(){"function"==typeof n?n():t(null)}}if(null!=t)return e=e(),t.current=e,function(){t.current=null}}function za(e,t,n){n=null!=n?n.concat([e]):null,ka(4,4,Ea.bind(null,t,e),n)}function Aa(){}function $a(e,t){var n=jo();t=void 0===t?null:t;var r=n.memoizedState;return null!==t&&Io(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ta(e,t){var n=jo();t=void 0===t?null:t;var r=n.memoizedState;if(null!==t&&Io(t,r[1]))return r[0];if(r=e(),$o){ge(!0);try{e()}finally{ge(!1)}}return n.memoizedState=[r,t],r}function Pa(e,t,n){return void 0===n||1073741824&_o?e.memoizedState=t:(e.memoizedState=n,e=Vc(),So.lanes|=e,bc|=e,n)}function Ma(e,t,n,r){return Jn(n,t)?n:null!==yo.current?(e=Pa(e,n,r),Jn(e,t)||(Ps=!0),e):42&_o?(e=Vc(),So.lanes|=e,bc|=e,t):(Ps=!0,e.memoizedState=n)}function La(e,t,n,r,i){var o=V.p;V.p=0!==o&&8>o?o:8;var a,s,l,c=F.T,u={};F.T=u,qa(e,!1,t,n);try{var d=i(),h=F.S;if(null!==h&&h(u,d),null!==d&&"object"==typeof d&&"function"==typeof d.then){var p=(a=r,s=[],l={status:"pending",value:null,reason:null,then:function(e){s.push(e)}},d.then(function(){l.status="fulfilled",l.value=a;for(var e=0;e<s.length;e++)(0,s[e])(a)},function(e){for(l.status="rejected",l.reason=e,e=0;e<s.length;e++)(0,s[e])(void 0)}),l);ja(e,t,p,Fc())}else ja(e,t,r,Fc())}catch(n){ja(e,t,{then:function(){},status:"rejected",reason:n},Fc())}finally{V.p=o,F.T=c}}function Da(){}function Ia(e,t,n,i){if(5!==e.tag)throw Error(r(476));var o=Na(e).queue;La(e,o,t,R,null===n?Da:function(){return Oa(e),n(i)})}function Na(e){var t=e.memoizedState;if(null!==t)return t;var n={};return(t={memoizedState:R,baseState:R,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Go,lastRenderedState:R},next:null}).next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Go,lastRenderedState:n},next:null},e.memoizedState=t,null!==(e=e.alternate)&&(e.memoizedState=t),t}function Oa(e){ja(e,Na(e).next.queue,{},Fc())}function Fa(){return Ti(Zd)}function Va(){return jo().memoizedState}function Ra(){return jo().memoizedState}function Ba(e){for(var t=e.return;null!==t;){switch(t.tag){case 24:case 3:var n=Fc(),r=co(t,e=lo(n),n);return null!==r&&(Rc(r,t,n),uo(r,t,n)),t={cache:Oi()},void(e.payload=t)}t=t.return}}function Ua(e,t,n){var r=Fc();n={lane:r,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null},Wa(e)?Ka(t,n):null!==(n=Dr(e,t,n,r))&&(Rc(n,e,r),Ga(n,t,r))}function Ha(e,t,n){ja(e,t,n,Fc())}function ja(e,t,n,r){var i={lane:r,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null};if(Wa(e))Ka(t,i);else{var o=e.alternate;if(0===e.lanes&&(null===o||0===o.lanes)&&null!==(o=t.lastRenderedReducer))try{var a=t.lastRenderedState,s=o(a,n);if(i.hasEagerState=!0,i.eagerState=s,Jn(s,a))return Lr(e,t,i,0),null===sc&&Mr(),!1}catch(e){}if(null!==(n=Dr(e,t,i,r)))return Rc(n,e,r),Ga(n,t,r),!0}return!1}function qa(e,t,n,i){if(i={lane:2,revertLane:Lu(),action:i,hasEagerState:!1,eagerState:null,next:null},Wa(e)){if(t)throw Error(r(479))}else null!==(t=Dr(e,n,i,2))&&Rc(t,e,2)}function Wa(e){var t=e.alternate;return e===So||null!==t&&t===So}function Ka(e,t){Ao=zo=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ga(e,t,n){if(4194048&n){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,Pe(e,n)}}var Qa={readContext:Ti,use:Wo,useCallback:Do,useContext:Do,useEffect:Do,useImperativeHandle:Do,useLayoutEffect:Do,useInsertionEffect:Do,useMemo:Do,useReducer:Do,useRef:Do,useState:Do,useDebugValue:Do,useDeferredValue:Do,useTransition:Do,useSyncExternalStore:Do,useId:Do,useHostTransitionStatus:Do,useFormState:Do,useActionState:Do,useOptimistic:Do,useMemoCache:Do,useCacheRefresh:Do},Ya={readContext:Ti,use:Wo,useCallback:function(e,t){return Ho().memoizedState=[e,void 0===t?null:t],e},useContext:Ti,useEffect:xa,useImperativeHandle:function(e,t,n){n=null!=n?n.concat([e]):null,wa(4194308,4,Ea.bind(null,t,e),n)},useLayoutEffect:function(e,t){return wa(4194308,4,e,t)},useInsertionEffect:function(e,t){wa(4,2,e,t)},useMemo:function(e,t){var n=Ho();t=void 0===t?null:t;var r=e();if($o){ge(!0);try{e()}finally{ge(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Ho();if(void 0!==n){var i=n(t);if($o){ge(!0);try{n(t)}finally{ge(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ua.bind(null,So,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},Ho().memoizedState=e},useState:function(e){var t=(e=ia(e)).queue,n=Ha.bind(null,So,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Aa,useDeferredValue:function(e,t){return Pa(Ho(),e,t)},useTransition:function(){var e=ia(!1);return e=La.bind(null,So,e.queue,!0,!1),Ho().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=So,o=Ho();if(ci){if(void 0===n)throw Error(r(407));n=n()}else{if(n=t(),null===sc)throw Error(r(349));124&cc||Jo(i,t,n)}o.memoizedState=n;var a={value:n,getSnapshot:t};return o.queue=a,xa(ta.bind(null,i,a,e),[e]),i.flags|=2048,ya(9,{destroy:void 0,resource:void 0},ea.bind(null,i,a,n,t),null),n},useId:function(){var e=Ho(),t=sc.identifierPrefix;if(ci){var n=ni;t="«"+t+"R"+(n=(ti&~(1<<32-be(ti)-1)).toString(32)+n),0<(n=To++)&&(t+="H"+n.toString(32)),t+="»"}else t="«"+t+"r"+(n=Lo++).toString(32)+"»";return e.memoizedState=t},useHostTransitionStatus:Fa,useFormState:pa,useActionState:pa,useOptimistic:function(e){var t=Ho();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=qa.bind(null,So,!0,n),n.dispatch=t,[e,t]},useMemoCache:Ko,useCacheRefresh:function(){return Ho().memoizedState=Ba.bind(null,So)}},Xa={readContext:Ti,use:Wo,useCallback:$a,useContext:Ti,useEffect:_a,useImperativeHandle:za,useInsertionEffect:Sa,useLayoutEffect:Ca,useMemo:Ta,useReducer:Qo,useRef:va,useState:function(){return Qo(Go)},useDebugValue:Aa,useDeferredValue:function(e,t){return Ma(jo(),Co.memoizedState,e,t)},useTransition:function(){var e=Qo(Go)[0],t=jo().memoizedState;return["boolean"==typeof e?e:qo(e),t]},useSyncExternalStore:Zo,useId:Va,useHostTransitionStatus:Fa,useFormState:fa,useActionState:fa,useOptimistic:function(e,t){return oa(jo(),0,e,t)},useMemoCache:Ko,useCacheRefresh:Ra},Za={readContext:Ti,use:Wo,useCallback:$a,useContext:Ti,useEffect:_a,useImperativeHandle:za,useInsertionEffect:Sa,useLayoutEffect:Ca,useMemo:Ta,useReducer:Xo,useRef:va,useState:function(){return Xo(Go)},useDebugValue:Aa,useDeferredValue:function(e,t){var n=jo();return null===Co?Pa(n,e,t):Ma(n,Co.memoizedState,e,t)},useTransition:function(){var e=Xo(Go)[0],t=jo().memoizedState;return["boolean"==typeof e?e:qo(e),t]},useSyncExternalStore:Zo,useId:Va,useHostTransitionStatus:Fa,useFormState:ba,useActionState:ba,useOptimistic:function(e,t){var n=jo();return null!==Co?oa(n,0,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:Ko,useCacheRefresh:Ra},Ja=null,es=0;function ts(e){var t=es;return es+=1,null===Ja&&(Ja=[]),to(Ja,e,t)}function ns(e,t){t=t.props.ref,e.ref=void 0!==t?t:null}function rs(e,t){if(t.$$typeof===d)throw Error(r(525));throw e=Object.prototype.toString.call(t),Error(r(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function is(e){return(0,e._init)(e._payload)}function os(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function i(e){for(var t=new Map;null!==e;)null!==e.key?t.set(e.key,e):t.set(e.index,e),e=e.sibling;return t}function o(e,t){return(e=Ur(e,t)).index=0,e.sibling=null,e}function a(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags|=67108866,n):r:(t.flags|=67108866,n):(t.flags|=1048576,n)}function s(t){return e&&null===t.alternate&&(t.flags|=67108866),t}function l(e,t,n,r){return null===t||6!==t.tag?((t=Wr(n,e.mode,r)).return=e,t):((t=o(t,n)).return=e,t)}function c(e,t,n,r){var i=n.type;return i===f?d(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===i||"object"==typeof i&&null!==i&&i.$$typeof===T&&is(i)===t.type)?(ns(t=o(t,n.props),n),t.return=e,t):(ns(t=jr(n.type,n.key,n.props,null,e.mode,r),n),t.return=e,t)}function u(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Kr(n,e.mode,r)).return=e,t):((t=o(t,n.children||[])).return=e,t)}function d(e,t,n,r,i){return null===t||7!==t.tag?((t=qr(n,e.mode,r,i)).return=e,t):((t=o(t,n)).return=e,t)}function m(e,t,n){if("string"==typeof t&&""!==t||"number"==typeof t||"bigint"==typeof t)return(t=Wr(""+t,e.mode,n)).return=e,t;if("object"==typeof t&&null!==t){switch(t.$$typeof){case h:return ns(n=jr(t.type,t.key,t.props,null,e.mode,n),t),n.return=e,n;case p:return(t=Kr(t,e.mode,n)).return=e,t;case T:return m(e,t=(0,t._init)(t._payload),n)}if(O(t)||D(t))return(t=qr(t,e.mode,n,null)).return=e,t;if("function"==typeof t.then)return m(e,ts(t),n);if(t.$$typeof===S)return m(e,Pi(e,t),n);rs(e,t)}return null}function g(e,t,n,r){var i=null!==t?t.key:null;if("string"==typeof n&&""!==n||"number"==typeof n||"bigint"==typeof n)return null!==i?null:l(e,t,""+n,r);if("object"==typeof n&&null!==n){switch(n.$$typeof){case h:return n.key===i?c(e,t,n,r):null;case p:return n.key===i?u(e,t,n,r):null;case T:return g(e,t,n=(i=n._init)(n._payload),r)}if(O(n)||D(n))return null!==i?null:d(e,t,n,r,null);if("function"==typeof n.then)return g(e,t,ts(n),r);if(n.$$typeof===S)return g(e,t,Pi(e,n),r);rs(e,n)}return null}function b(e,t,n,r,i){if("string"==typeof r&&""!==r||"number"==typeof r||"bigint"==typeof r)return l(t,e=e.get(n)||null,""+r,i);if("object"==typeof r&&null!==r){switch(r.$$typeof){case h:return c(t,e=e.get(null===r.key?n:r.key)||null,r,i);case p:return u(t,e=e.get(null===r.key?n:r.key)||null,r,i);case T:return b(e,t,n,r=(0,r._init)(r._payload),i)}if(O(r)||D(r))return d(t,e=e.get(n)||null,r,i,null);if("function"==typeof r.then)return b(e,t,n,ts(r),i);if(r.$$typeof===S)return b(e,t,n,Pi(t,r),i);rs(t,r)}return null}function y(l,c,u,d){if("object"==typeof u&&null!==u&&u.type===f&&null===u.key&&(u=u.props.children),"object"==typeof u&&null!==u){switch(u.$$typeof){case h:e:{for(var v=u.key;null!==c;){if(c.key===v){if((v=u.type)===f){if(7===c.tag){n(l,c.sibling),(d=o(c,u.props.children)).return=l,l=d;break e}}else if(c.elementType===v||"object"==typeof v&&null!==v&&v.$$typeof===T&&is(v)===c.type){n(l,c.sibling),ns(d=o(c,u.props),u),d.return=l,l=d;break e}n(l,c);break}t(l,c),c=c.sibling}u.type===f?((d=qr(u.props.children,l.mode,d,u.key)).return=l,l=d):(ns(d=jr(u.type,u.key,u.props,null,l.mode,d),u),d.return=l,l=d)}return s(l);case p:e:{for(v=u.key;null!==c;){if(c.key===v){if(4===c.tag&&c.stateNode.containerInfo===u.containerInfo&&c.stateNode.implementation===u.implementation){n(l,c.sibling),(d=o(c,u.children||[])).return=l,l=d;break e}n(l,c);break}t(l,c),c=c.sibling}(d=Kr(u,l.mode,d)).return=l,l=d}return s(l);case T:return y(l,c,u=(v=u._init)(u._payload),d)}if(O(u))return function(r,o,s,l){for(var c=null,u=null,d=o,h=o=0,p=null;null!==d&&h<s.length;h++){d.index>h?(p=d,d=null):p=d.sibling;var f=g(r,d,s[h],l);if(null===f){null===d&&(d=p);break}e&&d&&null===f.alternate&&t(r,d),o=a(f,o,h),null===u?c=f:u.sibling=f,u=f,d=p}if(h===s.length)return n(r,d),ci&&ri(r,h),c;if(null===d){for(;h<s.length;h++)null!==(d=m(r,s[h],l))&&(o=a(d,o,h),null===u?c=d:u.sibling=d,u=d);return ci&&ri(r,h),c}for(d=i(d);h<s.length;h++)null!==(p=b(d,r,h,s[h],l))&&(e&&null!==p.alternate&&d.delete(null===p.key?h:p.key),o=a(p,o,h),null===u?c=p:u.sibling=p,u=p);return e&&d.forEach(function(e){return t(r,e)}),ci&&ri(r,h),c}(l,c,u,d);if(D(u)){if("function"!=typeof(v=D(u)))throw Error(r(150));return function(o,s,l,c){if(null==l)throw Error(r(151));for(var u=null,d=null,h=s,p=s=0,f=null,y=l.next();null!==h&&!y.done;p++,y=l.next()){h.index>p?(f=h,h=null):f=h.sibling;var v=g(o,h,y.value,c);if(null===v){null===h&&(h=f);break}e&&h&&null===v.alternate&&t(o,h),s=a(v,s,p),null===d?u=v:d.sibling=v,d=v,h=f}if(y.done)return n(o,h),ci&&ri(o,p),u;if(null===h){for(;!y.done;p++,y=l.next())null!==(y=m(o,y.value,c))&&(s=a(y,s,p),null===d?u=y:d.sibling=y,d=y);return ci&&ri(o,p),u}for(h=i(h);!y.done;p++,y=l.next())null!==(y=b(h,o,p,y.value,c))&&(e&&null!==y.alternate&&h.delete(null===y.key?p:y.key),s=a(y,s,p),null===d?u=y:d.sibling=y,d=y);return e&&h.forEach(function(e){return t(o,e)}),ci&&ri(o,p),u}(l,c,u=v.call(u),d)}if("function"==typeof u.then)return y(l,c,ts(u),d);if(u.$$typeof===S)return y(l,c,Pi(l,u),d);rs(l,u)}return"string"==typeof u&&""!==u||"number"==typeof u||"bigint"==typeof u?(u=""+u,null!==c&&6===c.tag?(n(l,c.sibling),(d=o(c,u)).return=l,l=d):(n(l,c),(d=Wr(u,l.mode,d)).return=l,l=d),s(l)):n(l,c)}return function(e,t,n,r){try{es=0;var i=y(e,t,n,r);return Ja=null,i}catch(t){if(t===Qi||t===Xi)throw t;var o=Rr(29,t,null,e.mode);return o.lanes=r,o.return=e,o}}}var as=os(!0),ss=os(!1),ls=H(null),cs=null;function us(e){var t=e.alternate;q(fs,1&fs.current),q(ls,e),null===cs&&(null===t||null!==yo.current||null!==t.memoizedState)&&(cs=e)}function ds(e){if(22===e.tag){if(q(fs,fs.current),q(ls,e),null===cs){var t=e.alternate;null!==t&&null!==t.memoizedState&&(cs=e)}}else hs()}function hs(){q(fs,fs.current),q(ls,ls.current)}function ps(e){j(ls),cs===e&&(cs=null),j(fs)}var fs=H(0);function ms(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||wd(n)))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(128&t.flags)return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function gs(e,t,n,r){n=null==(n=n(r,t=e.memoizedState))?t:u({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var bs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Fc(),i=lo(r);i.payload=t,null!=n&&(i.callback=n),null!==(t=co(e,i,r))&&(Rc(t,e,r),uo(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Fc(),i=lo(r);i.tag=1,i.payload=t,null!=n&&(i.callback=n),null!==(t=co(e,i,r))&&(Rc(t,e,r),uo(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Fc(),r=lo(n);r.tag=2,null!=t&&(r.callback=t),null!==(t=co(e,r,n))&&(Rc(t,e,n),uo(t,e,n))}};function ys(e,t,n,r,i,o,a){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,o,a):!t.prototype||!t.prototype.isPureReactComponent||(!er(n,r)||!er(i,o))}function vs(e,t,n,r){e=t.state,"function"==typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"==typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&bs.enqueueReplaceState(t,t.state,null)}function ws(e,t){var n=t;if("ref"in t)for(var r in n={},t)"ref"!==r&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=u({},n)),e)void 0===n[i]&&(n[i]=e[i]);return n}var ks="function"==typeof reportError?reportError:function(e){if("object"==typeof window&&"function"==typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"==typeof e&&null!==e&&"string"==typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"==typeof process&&"function"==typeof process.emit)return void process.emit("uncaughtException",e)};function xs(e){ks(e)}function _s(e){}function Ss(e){ks(e)}function Cs(e,t){try{(0,e.onUncaughtError)(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Es(e,t,n){try{(0,e.onCaughtError)(n.value,{componentStack:n.stack,errorBoundary:1===t.tag?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function zs(e,t,n){return(n=lo(n)).tag=3,n.payload={element:null},n.callback=function(){Cs(e,t)},n}function As(e){return(e=lo(e)).tag=3,e}function $s(e,t,n,r){var i=n.type.getDerivedStateFromError;if("function"==typeof i){var o=r.value;e.payload=function(){return i(o)},e.callback=function(){Es(t,n,r)}}var a=n.stateNode;null!==a&&"function"==typeof a.componentDidCatch&&(e.callback=function(){Es(t,n,r),"function"!=typeof i&&(null===Ac?Ac=new Set([this]):Ac.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:null!==e?e:""})})}var Ts=Error(r(461)),Ps=!1;function Ms(e,t,n,r){t.child=null===e?ss(t,null,n,r):as(t,e.child,n,r)}function Ls(e,t,n,r,i){n=n.render;var o=t.ref;if("ref"in r){var a={};for(var s in r)"ref"!==s&&(a[s]=r[s])}else a=r;return $i(t),r=No(e,t,n,a,o,i),s=Ro(),null===e||Ps?(ci&&s&&oi(t),t.flags|=1,Ms(e,t,r,i),t.child):(Bo(e,t,i),Js(e,t,i))}function Ds(e,t,n,r,i){if(null===e){var o=n.type;return"function"!=typeof o||Br(o)||void 0!==o.defaultProps||null!==n.compare?((e=jr(n.type,null,r,t,t.mode,i)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=o,Is(e,t,o,r,i))}if(o=e.child,!el(e,i)){var a=o.memoizedProps;if((n=null!==(n=n.compare)?n:er)(a,r)&&e.ref===t.ref)return Js(e,t,i)}return t.flags|=1,(e=Ur(o,r)).ref=t.ref,e.return=t,t.child=e}function Is(e,t,n,r,i){if(null!==e){var o=e.memoizedProps;if(er(o,r)&&e.ref===t.ref){if(Ps=!1,t.pendingProps=r=o,!el(e,i))return t.lanes=e.lanes,Js(e,t,i);131072&e.flags&&(Ps=!0)}}return Vs(e,t,n,r,i)}function Ns(e,t,n){var r=t.pendingProps,i=r.children,o=null!==e?e.memoizedState:null;if("hidden"===r.mode){if(128&t.flags){if(r=null!==o?o.baseLanes|n:n,null!==e){for(i=t.child=e.child,o=0;null!==i;)o=o|i.lanes|i.childLanes,i=i.sibling;t.childLanes=o&~r}else t.childLanes=0,t.child=null;return Os(e,t,r,n)}if(!(536870912&n))return t.lanes=t.childLanes=536870912,Os(e,t,null!==o?o.baseLanes|n:n,n);t.memoizedState={baseLanes:0,cachePool:null},null!==e&&Ki(0,null!==o?o.cachePool:null),null!==o?wo(t,o):ko(),ds(t)}else null!==o?(Ki(0,o.cachePool),wo(t,o),hs(),t.memoizedState=null):(null!==e&&Ki(0,null),ko(),hs());return Ms(e,t,i,n),t.child}function Os(e,t,n,r){var i=Wi();return i=null===i?null:{parent:Ni._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},null!==e&&Ki(0,null),ko(),ds(t),null!==e&&zi(e,t,r,!0),null}function Fs(e,t){var n=t.ref;if(null===n)null!==e&&null!==e.ref&&(t.flags|=4194816);else{if("function"!=typeof n&&"object"!=typeof n)throw Error(r(284));null!==e&&e.ref===n||(t.flags|=4194816)}}function Vs(e,t,n,r,i){return $i(t),n=No(e,t,n,r,void 0,i),r=Ro(),null===e||Ps?(ci&&r&&oi(t),t.flags|=1,Ms(e,t,n,i),t.child):(Bo(e,t,i),Js(e,t,i))}function Rs(e,t,n,r,i,o){return $i(t),t.updateQueue=null,n=Fo(t,r,n,i),Oo(e),r=Ro(),null===e||Ps?(ci&&r&&oi(t),t.flags|=1,Ms(e,t,n,o),t.child):(Bo(e,t,o),Js(e,t,o))}function Bs(e,t,n,r,i){if($i(t),null===t.stateNode){var o=Fr,a=n.contextType;"object"==typeof a&&null!==a&&(o=Ti(a)),o=new n(r,o),t.memoizedState=null!==o.state&&void 0!==o.state?o.state:null,o.updater=bs,t.stateNode=o,o._reactInternals=t,(o=t.stateNode).props=r,o.state=t.memoizedState,o.refs={},ao(t),a=n.contextType,o.context="object"==typeof a&&null!==a?Ti(a):Fr,o.state=t.memoizedState,"function"==typeof(a=n.getDerivedStateFromProps)&&(gs(t,n,a,r),o.state=t.memoizedState),"function"==typeof n.getDerivedStateFromProps||"function"==typeof o.getSnapshotBeforeUpdate||"function"!=typeof o.UNSAFE_componentWillMount&&"function"!=typeof o.componentWillMount||(a=o.state,"function"==typeof o.componentWillMount&&o.componentWillMount(),"function"==typeof o.UNSAFE_componentWillMount&&o.UNSAFE_componentWillMount(),a!==o.state&&bs.enqueueReplaceState(o,o.state,null),mo(t,r,o,i),fo(),o.state=t.memoizedState),"function"==typeof o.componentDidMount&&(t.flags|=4194308),r=!0}else if(null===e){o=t.stateNode;var s=t.memoizedProps,l=ws(n,s);o.props=l;var c=o.context,u=n.contextType;a=Fr,"object"==typeof u&&null!==u&&(a=Ti(u));var d=n.getDerivedStateFromProps;u="function"==typeof d||"function"==typeof o.getSnapshotBeforeUpdate,s=t.pendingProps!==s,u||"function"!=typeof o.UNSAFE_componentWillReceiveProps&&"function"!=typeof o.componentWillReceiveProps||(s||c!==a)&&vs(t,o,r,a),oo=!1;var h=t.memoizedState;o.state=h,mo(t,r,o,i),fo(),c=t.memoizedState,s||h!==c||oo?("function"==typeof d&&(gs(t,n,d,r),c=t.memoizedState),(l=oo||ys(t,n,l,r,h,c,a))?(u||"function"!=typeof o.UNSAFE_componentWillMount&&"function"!=typeof o.componentWillMount||("function"==typeof o.componentWillMount&&o.componentWillMount(),"function"==typeof o.UNSAFE_componentWillMount&&o.UNSAFE_componentWillMount()),"function"==typeof o.componentDidMount&&(t.flags|=4194308)):("function"==typeof o.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=a,r=l):("function"==typeof o.componentDidMount&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,so(e,t),u=ws(n,a=t.memoizedProps),o.props=u,d=t.pendingProps,h=o.context,c=n.contextType,l=Fr,"object"==typeof c&&null!==c&&(l=Ti(c)),(c="function"==typeof(s=n.getDerivedStateFromProps)||"function"==typeof o.getSnapshotBeforeUpdate)||"function"!=typeof o.UNSAFE_componentWillReceiveProps&&"function"!=typeof o.componentWillReceiveProps||(a!==d||h!==l)&&vs(t,o,r,l),oo=!1,h=t.memoizedState,o.state=h,mo(t,r,o,i),fo();var p=t.memoizedState;a!==d||h!==p||oo||null!==e&&null!==e.dependencies&&Ai(e.dependencies)?("function"==typeof s&&(gs(t,n,s,r),p=t.memoizedState),(u=oo||ys(t,n,u,r,h,p,l)||null!==e&&null!==e.dependencies&&Ai(e.dependencies))?(c||"function"!=typeof o.UNSAFE_componentWillUpdate&&"function"!=typeof o.componentWillUpdate||("function"==typeof o.componentWillUpdate&&o.componentWillUpdate(r,p,l),"function"==typeof o.UNSAFE_componentWillUpdate&&o.UNSAFE_componentWillUpdate(r,p,l)),"function"==typeof o.componentDidUpdate&&(t.flags|=4),"function"==typeof o.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!=typeof o.componentDidUpdate||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),"function"!=typeof o.getSnapshotBeforeUpdate||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),o.props=r,o.state=p,o.context=l,r=u):("function"!=typeof o.componentDidUpdate||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),"function"!=typeof o.getSnapshotBeforeUpdate||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return o=r,Fs(e,t),r=!!(128&t.flags),o||r?(o=t.stateNode,n=r&&"function"!=typeof n.getDerivedStateFromError?null:o.render(),t.flags|=1,null!==e&&r?(t.child=as(t,e.child,null,i),t.child=as(t,null,n,i)):Ms(e,t,n,i),t.memoizedState=o.state,e=t.child):e=Js(e,t,i),e}function Us(e,t,n,r){return bi(),t.flags|=256,Ms(e,t,n,r),t.child}var Hs={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function js(e){return{baseLanes:e,cachePool:Gi()}}function qs(e,t,n){return e=null!==e?e.childLanes&~n:0,t&&(e|=wc),e}function Ws(e,t,n){var i,o=t.pendingProps,a=!1,s=!!(128&t.flags);if((i=s)||(i=(null===e||null!==e.memoizedState)&&!!(2&fs.current)),i&&(a=!0,t.flags&=-129),i=!!(32&t.flags),t.flags&=-33,null===e){if(ci){if(a?us(t):hs(),ci){var l,c=li;if(l=c){e:{for(l=c,c=di;8!==l.nodeType;){if(!c){c=null;break e}if(null===(l=kd(l.nextSibling))){c=null;break e}}c=l}null!==c?(t.memoizedState={dehydrated:c,treeContext:null!==ei?{id:ti,overflow:ni}:null,retryLane:536870912,hydrationErrors:null},(l=Rr(18,null,null,0)).stateNode=c,l.return=t,t.child=l,si=t,li=null,l=!0):l=!1}l||pi(t)}if(null!==(c=t.memoizedState)&&null!==(c=c.dehydrated))return wd(c)?t.lanes=32:t.lanes=536870912,null;ps(t)}return c=o.children,o=o.fallback,a?(hs(),c=Gs({mode:"hidden",children:c},a=t.mode),o=qr(o,a,n,null),c.return=t,o.return=t,c.sibling=o,t.child=c,(a=t.child).memoizedState=js(n),a.childLanes=qs(e,i,n),t.memoizedState=Hs,o):(us(t),Ks(t,c))}if(null!==(l=e.memoizedState)&&null!==(c=l.dehydrated)){if(s)256&t.flags?(us(t),t.flags&=-257,t=Qs(e,t,n)):null!==t.memoizedState?(hs(),t.child=e.child,t.flags|=128,t=null):(hs(),a=o.fallback,c=t.mode,o=Gs({mode:"visible",children:o.children},c),(a=qr(a,c,n,null)).flags|=2,o.return=t,a.return=t,o.sibling=a,t.child=o,as(t,e.child,null,n),(o=t.child).memoizedState=js(n),o.childLanes=qs(e,i,n),t.memoizedState=Hs,t=a);else if(us(t),wd(c)){if(i=c.nextSibling&&c.nextSibling.dataset)var u=i.dgst;i=u,(o=Error(r(419))).stack="",o.digest=i,vi({value:o,source:null,stack:null}),t=Qs(e,t,n)}else if(Ps||zi(e,t,n,!1),i=0!==(n&e.childLanes),Ps||i){if(null!==(i=sc)&&(0!==(o=0!==((o=42&(o=n&-n)?1:Me(o))&(i.suspendedLanes|n))?0:o)&&o!==l.retryLane))throw l.retryLane=o,Ir(e,o),Rc(i,e,o),Ts;"$?"===c.data||Xc(),t=Qs(e,t,n)}else"$?"===c.data?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,li=kd(c.nextSibling),si=t,ci=!0,ui=null,di=!1,null!==e&&(Zr[Jr++]=ti,Zr[Jr++]=ni,Zr[Jr++]=ei,ti=e.id,ni=e.overflow,ei=t),(t=Ks(t,o.children)).flags|=4096);return t}return a?(hs(),a=o.fallback,c=t.mode,u=(l=e.child).sibling,(o=Ur(l,{mode:"hidden",children:o.children})).subtreeFlags=65011712&l.subtreeFlags,null!==u?a=Ur(u,a):(a=qr(a,c,n,null)).flags|=2,a.return=t,o.return=t,o.sibling=a,t.child=o,o=a,a=t.child,null===(c=e.child.memoizedState)?c=js(n):(null!==(l=c.cachePool)?(u=Ni._currentValue,l=l.parent!==u?{parent:u,pool:u}:l):l=Gi(),c={baseLanes:c.baseLanes|n,cachePool:l}),a.memoizedState=c,a.childLanes=qs(e,i,n),t.memoizedState=Hs,o):(us(t),e=(n=e.child).sibling,(n=Ur(n,{mode:"visible",children:o.children})).return=t,n.sibling=null,null!==e&&(null===(i=t.deletions)?(t.deletions=[e],t.flags|=16):i.push(e)),t.child=n,t.memoizedState=null,n)}function Ks(e,t){return(t=Gs({mode:"visible",children:t},e.mode)).return=e,e.child=t}function Gs(e,t){return(e=Rr(22,e,null,t)).lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function Qs(e,t,n){return as(t,e.child,null,n),(e=Ks(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function Ys(e,t,n){e.lanes|=t;var r=e.alternate;null!==r&&(r.lanes|=t),Ci(e.return,t,n)}function Xs(e,t,n,r,i){var o=e.memoizedState;null===o?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function Zs(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(Ms(e,t,r.children,n),2&(r=fs.current))r=1&r|2,t.flags|=128;else{if(null!==e&&128&e.flags)e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Ys(e,n,t);else if(19===e.tag)Ys(e,n,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}switch(q(fs,r),i){case"forwards":for(n=t.child,i=null;null!==n;)null!==(e=n.alternate)&&null===ms(e)&&(i=n),n=n.sibling;null===(n=i)?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Xs(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;null!==i;){if(null!==(e=i.alternate)&&null===ms(e)){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Xs(t,!0,n,null,o);break;case"together":Xs(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Js(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),bc|=t.lanes,0===(n&t.childLanes)){if(null===e)return null;if(zi(e,t,n,!1),0===(n&t.childLanes))return null}if(null!==e&&t.child!==e.child)throw Error(r(153));if(null!==t.child){for(n=Ur(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Ur(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function el(e,t){return 0!==(e.lanes&t)||!(null===(e=e.dependencies)||!Ai(e))}function tl(e,t,n){if(null!==e)if(e.memoizedProps!==t.pendingProps)Ps=!0;else{if(!(el(e,n)||128&t.flags))return Ps=!1,function(e,t,n){switch(t.tag){case 3:Y(t,t.stateNode.containerInfo),_i(0,Ni,e.memoizedState.cache),bi();break;case 27:case 5:Z(t);break;case 4:Y(t,t.stateNode.containerInfo);break;case 10:_i(0,t.type,t.memoizedProps.value);break;case 13:var r=t.memoizedState;if(null!==r)return null!==r.dehydrated?(us(t),t.flags|=128,null):0!==(n&t.child.childLanes)?Ws(e,t,n):(us(t),null!==(e=Js(e,t,n))?e.sibling:null);us(t);break;case 19:var i=!!(128&e.flags);if((r=0!==(n&t.childLanes))||(zi(e,t,n,!1),r=0!==(n&t.childLanes)),i){if(r)return Zs(e,t,n);t.flags|=128}if(null!==(i=t.memoizedState)&&(i.rendering=null,i.tail=null,i.lastEffect=null),q(fs,fs.current),r)break;return null;case 22:case 23:return t.lanes=0,Ns(e,t,n);case 24:_i(0,Ni,e.memoizedState.cache)}return Js(e,t,n)}(e,t,n);Ps=!!(131072&e.flags)}else Ps=!1,ci&&1048576&t.flags&&ii(t,Xr,t.index);switch(t.lanes=0,t.tag){case 16:e:{e=t.pendingProps;var i=t.elementType,o=i._init;if(i=o(i._payload),t.type=i,"function"!=typeof i){if(null!=i){if((o=i.$$typeof)===E){t.tag=11,t=Ls(null,t,i,e,n);break e}if(o===$){t.tag=14,t=Ds(null,t,i,e,n);break e}}throw t=N(i)||i,Error(r(306,t,""))}Br(i)?(e=ws(i,e),t.tag=1,t=Bs(null,t,i,e,n)):(t.tag=0,t=Vs(null,t,i,e,n))}return t;case 0:return Vs(e,t,t.type,t.pendingProps,n);case 1:return Bs(e,t,i=t.type,o=ws(i,t.pendingProps),n);case 3:e:{if(Y(t,t.stateNode.containerInfo),null===e)throw Error(r(387));i=t.pendingProps;var a=t.memoizedState;o=a.element,so(e,t),mo(t,i,null,n);var s=t.memoizedState;if(i=s.cache,_i(0,Ni,i),i!==a.cache&&Ei(t,[Ni],n,!0),fo(),i=s.element,a.isDehydrated){if(a={element:i,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=a,t.memoizedState=a,256&t.flags){t=Us(e,t,i,n);break e}if(i!==o){vi(o=Ar(Error(r(424)),t)),t=Us(e,t,i,n);break e}if(9===(e=t.stateNode.containerInfo).nodeType)e=e.body;else e="HTML"===e.nodeName?e.ownerDocument.body:e;for(li=kd(e.firstChild),si=t,ci=!0,ui=null,di=!0,n=ss(t,null,i,n),t.child=n;n;)n.flags=-3&n.flags|4096,n=n.sibling}else{if(bi(),i===o){t=Js(e,t,n);break e}Ms(e,t,i,n)}t=t.child}return t;case 26:return Fs(e,t),null===e?(n=Md(t.type,null,t.pendingProps,null))?t.memoizedState=n:ci||(n=t.type,e=t.pendingProps,(i=sd(G.current).createElement(n))[Ne]=t,i[Oe]=e,id(i,n,e),Qe(i),t.stateNode=i):t.memoizedState=Md(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Z(t),null===e&&ci&&(i=t.stateNode=Sd(t.type,t.pendingProps,G.current),si=t,di=!0,o=li,bd(t.type)?(xd=o,li=kd(i.firstChild)):li=o),Ms(e,t,t.pendingProps.children,n),Fs(e,t),null===e&&(t.flags|=4194304),t.child;case 5:return null===e&&ci&&((o=i=li)&&(i=function(e,t,n,r){for(;1===e.nodeType;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&("INPUT"!==e.nodeName||"hidden"!==e.type))break}else if(r){if(!e[He])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if("stylesheet"===(o=e.getAttribute("rel"))&&e.hasAttribute("data-precedence"))break;if(o!==i.rel||e.getAttribute("href")!==(null==i.href||""===i.href?null:i.href)||e.getAttribute("crossorigin")!==(null==i.crossOrigin?null:i.crossOrigin)||e.getAttribute("title")!==(null==i.title?null:i.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(((o=e.getAttribute("src"))!==(null==i.src?null:i.src)||e.getAttribute("type")!==(null==i.type?null:i.type)||e.getAttribute("crossorigin")!==(null==i.crossOrigin?null:i.crossOrigin))&&o&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else{if("input"!==t||"hidden"!==e.type)return e;var o=null==i.name?null:""+i.name;if("hidden"===i.type&&e.getAttribute("name")===o)return e}if(null===(e=kd(e.nextSibling)))break}return null}(i,t.type,t.pendingProps,di),null!==i?(t.stateNode=i,si=t,li=kd(i.firstChild),di=!1,o=!0):o=!1),o||pi(t)),Z(t),o=t.type,a=t.pendingProps,s=null!==e?e.memoizedProps:null,i=a.children,ud(o,a)?i=null:null!==s&&ud(o,s)&&(t.flags|=32),null!==t.memoizedState&&(o=No(e,t,Vo,null,null,n),Zd._currentValue=o),Fs(e,t),Ms(e,t,i,n),t.child;case 6:return null===e&&ci&&((e=n=li)&&(n=function(e,t,n){if(""===t)return null;for(;3!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!n)return null;if(null===(e=kd(e.nextSibling)))return null}return e}(n,t.pendingProps,di),null!==n?(t.stateNode=n,si=t,li=null,e=!0):e=!1),e||pi(t)),null;case 13:return Ws(e,t,n);case 4:return Y(t,t.stateNode.containerInfo),i=t.pendingProps,null===e?t.child=as(t,null,i,n):Ms(e,t,i,n),t.child;case 11:return Ls(e,t,t.type,t.pendingProps,n);case 7:return Ms(e,t,t.pendingProps,n),t.child;case 8:case 12:return Ms(e,t,t.pendingProps.children,n),t.child;case 10:return i=t.pendingProps,_i(0,t.type,i.value),Ms(e,t,i.children,n),t.child;case 9:return o=t.type._context,i=t.pendingProps.children,$i(t),i=i(o=Ti(o)),t.flags|=1,Ms(e,t,i,n),t.child;case 14:return Ds(e,t,t.type,t.pendingProps,n);case 15:return Is(e,t,t.type,t.pendingProps,n);case 19:return Zs(e,t,n);case 31:return i=t.pendingProps,n=t.mode,i={mode:i.mode,children:i.children},null===e?((n=Gs(i,n)).ref=t.ref,t.child=n,n.return=t,t=n):((n=Ur(e.child,i)).ref=t.ref,t.child=n,n.return=t,t=n),t;case 22:return Ns(e,t,n);case 24:return $i(t),i=Ti(Ni),null===e?(null===(o=Wi())&&(o=sc,a=Oi(),o.pooledCache=a,a.refCount++,null!==a&&(o.pooledCacheLanes|=n),o=a),t.memoizedState={parent:i,cache:o},ao(t),_i(0,Ni,o)):(0!==(e.lanes&n)&&(so(e,t),mo(t,null,null,n),fo()),o=e.memoizedState,a=t.memoizedState,o.parent!==i?(o={parent:i,cache:i},t.memoizedState=o,0===t.lanes&&(t.memoizedState=t.updateQueue.baseState=o),_i(0,Ni,i)):(i=a.cache,_i(0,Ni,i),i!==o.cache&&Ei(t,[Ni],n,!0))),Ms(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(r(156,t.tag))}function nl(e){e.flags|=4}function rl(e,t){if("stylesheet"!==t.type||4&t.state.loading)e.flags&=-16777217;else if(e.flags|=16777216,!qd(t)){if(null!==(t=ls.current)&&((4194048&cc)===cc?null!==cs:(62914560&cc)!==cc&&!(536870912&cc)||t!==cs))throw no=Zi,Yi;e.flags|=8192}}function il(e,t){null!==t&&(e.flags|=4),16384&e.flags&&(t=22!==e.tag?ze():536870912,e.lanes|=t,kc|=t)}function ol(e,t){if(!ci)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function al(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;null!==i;)n|=i.lanes|i.childLanes,r|=65011712&i.subtreeFlags,r|=65011712&i.flags,i.return=e,i=i.sibling;else for(i=e.child;null!==i;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function sl(e,t,n){var i=t.pendingProps;switch(ai(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return al(t),null;case 3:return n=t.stateNode,i=null,null!==e&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Si(Ni),X(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),null!==e&&null!==e.child||(gi(t)?nl(t):null===e||e.memoizedState.isDehydrated&&!(256&t.flags)||(t.flags|=1024,yi())),al(t),null;case 26:return n=t.memoizedState,null===e?(nl(t),null!==n?(al(t),rl(t,n)):(al(t),t.flags&=-16777217)):n?n!==e.memoizedState?(nl(t),al(t),rl(t,n)):(al(t),t.flags&=-16777217):(e.memoizedProps!==i&&nl(t),al(t),t.flags&=-16777217),null;case 27:J(t),n=G.current;var o=t.type;if(null!==e&&null!=t.stateNode)e.memoizedProps!==i&&nl(t);else{if(!i){if(null===t.stateNode)throw Error(r(166));return al(t),null}e=W.current,gi(t)?fi(t):(e=Sd(o,i,n),t.stateNode=e,nl(t))}return al(t),null;case 5:if(J(t),n=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==i&&nl(t);else{if(!i){if(null===t.stateNode)throw Error(r(166));return al(t),null}if(e=W.current,gi(t))fi(t);else{switch(o=sd(G.current),e){case 1:e=o.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:e=o.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":e=o.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":e=o.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":(e=o.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e="string"==typeof i.is?o.createElement("select",{is:i.is}):o.createElement("select"),i.multiple?e.multiple=!0:i.size&&(e.size=i.size);break;default:e="string"==typeof i.is?o.createElement(n,{is:i.is}):o.createElement(n)}}e[Ne]=t,e[Oe]=i;e:for(o=t.child;null!==o;){if(5===o.tag||6===o.tag)e.appendChild(o.stateNode);else if(4!==o.tag&&27!==o.tag&&null!==o.child){o.child.return=o,o=o.child;continue}if(o===t)break e;for(;null===o.sibling;){if(null===o.return||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=e;e:switch(id(e,n,i),n){case"button":case"input":case"select":case"textarea":e=!!i.autoFocus;break e;case"img":e=!0;break e;default:e=!1}e&&nl(t)}}return al(t),t.flags&=-16777217,null;case 6:if(e&&null!=t.stateNode)e.memoizedProps!==i&&nl(t);else{if("string"!=typeof i&&null===t.stateNode)throw Error(r(166));if(e=G.current,gi(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,null!==(o=si))switch(o.tag){case 27:case 5:i=o.memoizedProps}e[Ne]=t,(e=!!(e.nodeValue===n||null!==i&&!0===i.suppressHydrationWarning||ed(e.nodeValue,n)))||pi(t)}else(e=sd(e).createTextNode(i))[Ne]=t,t.stateNode=e}return al(t),null;case 13:if(i=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(o=gi(t),null!==i&&null!==i.dehydrated){if(null===e){if(!o)throw Error(r(318));if(!(o=null!==(o=t.memoizedState)?o.dehydrated:null))throw Error(r(317));o[Ne]=t}else bi(),!(128&t.flags)&&(t.memoizedState=null),t.flags|=4;al(t),o=!1}else o=yi(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=o),o=!0;if(!o)return 256&t.flags?(ps(t),t):(ps(t),null)}if(ps(t),128&t.flags)return t.lanes=n,t;if(n=null!==i,e=null!==e&&null!==e.memoizedState,n){o=null,null!==(i=t.child).alternate&&null!==i.alternate.memoizedState&&null!==i.alternate.memoizedState.cachePool&&(o=i.alternate.memoizedState.cachePool.pool);var a=null;null!==i.memoizedState&&null!==i.memoizedState.cachePool&&(a=i.memoizedState.cachePool.pool),a!==o&&(i.flags|=2048)}return n!==e&&n&&(t.child.flags|=8192),il(t,t.updateQueue),al(t),null;case 4:return X(),null===e&&ju(t.stateNode.containerInfo),al(t),null;case 10:return Si(t.type),al(t),null;case 19:if(j(fs),null===(o=t.memoizedState))return al(t),null;if(i=!!(128&t.flags),null===(a=o.rendering))if(i)ol(o,!1);else{if(0!==gc||null!==e&&128&e.flags)for(e=t.child;null!==e;){if(null!==(a=ms(e))){for(t.flags|=128,ol(o,!1),e=a.updateQueue,t.updateQueue=e,il(t,e),t.subtreeFlags=0,e=n,n=t.child;null!==n;)Hr(n,e),n=n.sibling;return q(fs,1&fs.current|2),t.child}e=e.sibling}null!==o.tail&&oe()>Ec&&(t.flags|=128,i=!0,ol(o,!1),t.lanes=4194304)}else{if(!i)if(null!==(e=ms(a))){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,il(t,e),ol(o,!0),null===o.tail&&"hidden"===o.tailMode&&!a.alternate&&!ci)return al(t),null}else 2*oe()-o.renderingStartTime>Ec&&536870912!==n&&(t.flags|=128,i=!0,ol(o,!1),t.lanes=4194304);o.isBackwards?(a.sibling=t.child,t.child=a):(null!==(e=o.last)?e.sibling=a:t.child=a,o.last=a)}return null!==o.tail?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=oe(),t.sibling=null,e=fs.current,q(fs,i?1&e|2:1&e),t):(al(t),null);case 22:case 23:return ps(t),xo(),i=null!==t.memoizedState,null!==e?null!==e.memoizedState!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?!!(536870912&n)&&!(128&t.flags)&&(al(t),6&t.subtreeFlags&&(t.flags|=8192)):al(t),null!==(n=t.updateQueue)&&il(t,n.retryQueue),n=null,null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),i=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),null!==e&&j(qi),null;case 24:return n=null,null!==e&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Si(Ni),al(t),null;case 25:case 30:return null}throw Error(r(156,t.tag))}function ll(e,t){switch(ai(t),t.tag){case 1:return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return Si(Ni),X(),65536&(e=t.flags)&&!(128&e)?(t.flags=-65537&e|128,t):null;case 26:case 27:case 5:return J(t),null;case 13:if(ps(t),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(r(340));bi()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return j(fs),null;case 4:return X(),null;case 10:return Si(t.type),null;case 22:case 23:return ps(t),xo(),null!==e&&j(qi),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 24:return Si(Ni),null;default:return null}}function cl(e,t){switch(ai(t),t.tag){case 3:Si(Ni),X();break;case 26:case 27:case 5:J(t);break;case 4:X();break;case 13:ps(t);break;case 19:j(fs);break;case 10:Si(t.type);break;case 22:case 23:ps(t),xo(),null!==e&&j(qi);break;case 24:Si(Ni)}}function ul(e,t){try{var n=t.updateQueue,r=null!==n?n.lastEffect:null;if(null!==r){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var o=n.create,a=n.inst;r=o(),a.destroy=r}n=n.next}while(n!==i)}}catch(e){fu(t,t.return,e)}}function dl(e,t,n){try{var r=t.updateQueue,i=null!==r?r.lastEffect:null;if(null!==i){var o=i.next;r=o;do{if((r.tag&e)===e){var a=r.inst,s=a.destroy;if(void 0!==s){a.destroy=void 0,i=t;var l=n,c=s;try{c()}catch(e){fu(i,l,e)}}}r=r.next}while(r!==o)}}catch(e){fu(t,t.return,e)}}function hl(e){var t=e.updateQueue;if(null!==t){var n=e.stateNode;try{bo(t,n)}catch(t){fu(e,e.return,t)}}}function pl(e,t,n){n.props=ws(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){fu(e,t,n)}}function fl(e,t){try{var n=e.ref;if(null!==n){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;default:r=e.stateNode}"function"==typeof n?e.refCleanup=n(r):n.current=r}}catch(n){fu(e,t,n)}}function ml(e,t){var n=e.ref,r=e.refCleanup;if(null!==n)if("function"==typeof r)try{r()}catch(n){fu(e,t,n)}finally{e.refCleanup=null,null!=(e=e.alternate)&&(e.refCleanup=null)}else if("function"==typeof n)try{n(null)}catch(n){fu(e,t,n)}else n.current=null}function gl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&r.focus();break e;case"img":n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){fu(e,e.return,t)}}function bl(e,t,n){try{var i=e.stateNode;!function(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,a=null,s=null,l=null,c=null,u=null,d=null;for(f in n){var h=n[f];if(n.hasOwnProperty(f)&&null!=h)switch(f){case"checked":case"value":break;case"defaultValue":c=h;default:i.hasOwnProperty(f)||nd(e,t,f,null,i,h)}}for(var p in i){var f=i[p];if(h=n[p],i.hasOwnProperty(p)&&(null!=f||null!=h))switch(p){case"type":a=f;break;case"name":o=f;break;case"checked":u=f;break;case"defaultChecked":d=f;break;case"value":s=f;break;case"defaultValue":l=f;break;case"children":case"dangerouslySetInnerHTML":if(null!=f)throw Error(r(137,t));break;default:f!==h&&nd(e,t,p,f,i,h)}}return void wt(e,s,l,c,u,d,a,o);case"select":for(a in f=s=l=p=null,n)if(c=n[a],n.hasOwnProperty(a)&&null!=c)switch(a){case"value":break;case"multiple":f=c;default:i.hasOwnProperty(a)||nd(e,t,a,null,i,c)}for(o in i)if(a=i[o],c=n[o],i.hasOwnProperty(o)&&(null!=a||null!=c))switch(o){case"value":p=a;break;case"defaultValue":l=a;break;case"multiple":s=a;default:a!==c&&nd(e,t,o,a,i,c)}return t=l,n=s,i=f,void(null!=p?_t(e,!!n,p,!1):!!i!=!!n&&(null!=t?_t(e,!!n,t,!0):_t(e,!!n,n?[]:"",!1)));case"textarea":for(l in f=p=null,n)if(o=n[l],n.hasOwnProperty(l)&&null!=o&&!i.hasOwnProperty(l))switch(l){case"value":case"children":break;default:nd(e,t,l,null,i,o)}for(s in i)if(o=i[s],a=n[s],i.hasOwnProperty(s)&&(null!=o||null!=a))switch(s){case"value":p=o;break;case"defaultValue":f=o;break;case"children":break;case"dangerouslySetInnerHTML":if(null!=o)throw Error(r(91));break;default:o!==a&&nd(e,t,s,o,i,a)}return void St(e,p,f);case"option":for(var m in n)if(p=n[m],n.hasOwnProperty(m)&&null!=p&&!i.hasOwnProperty(m))if("selected"===m)e.selected=!1;else nd(e,t,m,null,i,p);for(c in i)if(p=i[c],f=n[c],i.hasOwnProperty(c)&&p!==f&&(null!=p||null!=f))if("selected"===c)e.selected=p&&"function"!=typeof p&&"symbol"!=typeof p;else nd(e,t,c,p,i,f);return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var g in n)p=n[g],n.hasOwnProperty(g)&&null!=p&&!i.hasOwnProperty(g)&&nd(e,t,g,null,i,p);for(u in i)if(p=i[u],f=n[u],i.hasOwnProperty(u)&&p!==f&&(null!=p||null!=f))switch(u){case"children":case"dangerouslySetInnerHTML":if(null!=p)throw Error(r(137,t));break;default:nd(e,t,u,p,i,f)}return;default:if(Tt(t)){for(var b in n)p=n[b],n.hasOwnProperty(b)&&void 0!==p&&!i.hasOwnProperty(b)&&rd(e,t,b,void 0,i,p);for(d in i)p=i[d],f=n[d],!i.hasOwnProperty(d)||p===f||void 0===p&&void 0===f||rd(e,t,d,p,i,f);return}}for(var y in n)p=n[y],n.hasOwnProperty(y)&&null!=p&&!i.hasOwnProperty(y)&&nd(e,t,y,null,i,p);for(h in i)p=i[h],f=n[h],!i.hasOwnProperty(h)||p===f||null==p&&null==f||nd(e,t,h,p,i,f)}(i,e.type,n,t),i[Oe]=t}catch(t){fu(e,e.return,t)}}function yl(e){return 5===e.tag||3===e.tag||26===e.tag||27===e.tag&&bd(e.type)||4===e.tag}function vl(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||yl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(27===e.tag&&bd(e.type))continue e;if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function wl(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?(9===n.nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n).insertBefore(e,t):((t=9===n.nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n).appendChild(e),null!=(n=n._reactRootContainer)||null!==t.onclick||(t.onclick=td));else if(4!==r&&(27===r&&bd(e.type)&&(n=e.stateNode,t=null),null!==(e=e.child)))for(wl(e,t,n),e=e.sibling;null!==e;)wl(e,t,n),e=e.sibling}function kl(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&(27===r&&bd(e.type)&&(n=e.stateNode),null!==(e=e.child)))for(kl(e,t,n),e=e.sibling;null!==e;)kl(e,t,n),e=e.sibling}function xl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);id(t,r,n),t[Ne]=e,t[Oe]=n}catch(t){fu(e,e.return,t)}}var _l=!1,Sl=!1,Cl=!1,El="function"==typeof WeakSet?WeakSet:Set,zl=null;function Al(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Bl(e,n),4&r&&ul(5,n);break;case 1:if(Bl(e,n),4&r)if(e=n.stateNode,null===t)try{e.componentDidMount()}catch(e){fu(n,n.return,e)}else{var i=ws(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){fu(n,n.return,e)}}64&r&&hl(n),512&r&&fl(n,n.return);break;case 3:if(Bl(e,n),64&r&&null!==(e=n.updateQueue)){if(t=null,null!==n.child)switch(n.child.tag){case 27:case 5:case 1:t=n.child.stateNode}try{bo(e,t)}catch(e){fu(n,n.return,e)}}break;case 27:null===t&&4&r&&xl(n);case 26:case 5:Bl(e,n),null===t&&4&r&&gl(n),512&r&&fl(n,n.return);break;case 12:Bl(e,n);break;case 13:Bl(e,n),4&r&&Dl(e,n),64&r&&(null!==(e=n.memoizedState)&&(null!==(e=e.dehydrated)&&function(e,t){var n=e.ownerDocument;if("$?"!==e.data||"complete"===n.readyState)t();else{var r=function(){t(),n.removeEventListener("DOMContentLoaded",r)};n.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}(e,n=yu.bind(null,n))));break;case 22:if(!(r=null!==n.memoizedState||_l)){t=null!==t&&null!==t.memoizedState||Sl,i=_l;var o=Sl;_l=r,(Sl=t)&&!o?Hl(e,n,!!(8772&n.subtreeFlags)):Bl(e,n),_l=i,Sl=o}break;case 30:break;default:Bl(e,n)}}function $l(e){var t=e.alternate;null!==t&&(e.alternate=null,$l(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&je(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Tl=null,Pl=!1;function Ml(e,t,n){for(n=n.child;null!==n;)Ll(e,t,n),n=n.sibling}function Ll(e,t,n){if(me&&"function"==typeof me.onCommitFiberUnmount)try{me.onCommitFiberUnmount(fe,n)}catch(e){}switch(n.tag){case 26:Sl||ml(n,t),Ml(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode).parentNode.removeChild(n);break;case 27:Sl||ml(n,t);var r=Tl,i=Pl;bd(n.type)&&(Tl=n.stateNode,Pl=!1),Ml(e,t,n),Cd(n.stateNode),Tl=r,Pl=i;break;case 5:Sl||ml(n,t);case 6:if(r=Tl,i=Pl,Tl=null,Ml(e,t,n),Pl=i,null!==(Tl=r))if(Pl)try{(9===Tl.nodeType?Tl.body:"HTML"===Tl.nodeName?Tl.ownerDocument.body:Tl).removeChild(n.stateNode)}catch(e){fu(n,t,e)}else try{Tl.removeChild(n.stateNode)}catch(e){fu(n,t,e)}break;case 18:null!==Tl&&(Pl?(yd(9===(e=Tl).nodeType?e.body:"HTML"===e.nodeName?e.ownerDocument.body:e,n.stateNode),Ph(e)):yd(Tl,n.stateNode));break;case 4:r=Tl,i=Pl,Tl=n.stateNode.containerInfo,Pl=!0,Ml(e,t,n),Tl=r,Pl=i;break;case 0:case 11:case 14:case 15:Sl||dl(2,n,t),Sl||dl(4,n,t),Ml(e,t,n);break;case 1:Sl||(ml(n,t),"function"==typeof(r=n.stateNode).componentWillUnmount&&pl(n,t,r)),Ml(e,t,n);break;case 21:Ml(e,t,n);break;case 22:Sl=(r=Sl)||null!==n.memoizedState,Ml(e,t,n),Sl=r;break;default:Ml(e,t,n)}}function Dl(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&(null!==(e=e.memoizedState)&&null!==(e=e.dehydrated))))try{Ph(e)}catch(e){fu(t,t.return,e)}}function Il(e,t){var n=function(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return null===t&&(t=e.stateNode=new El),t;case 22:return null===(t=(e=e.stateNode)._retryCache)&&(t=e._retryCache=new El),t;default:throw Error(r(435,e.tag))}}(e);t.forEach(function(t){var r=vu.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))})}function Nl(e,t){var n=t.deletions;if(null!==n)for(var i=0;i<n.length;i++){var o=n[i],a=e,s=t,l=s;e:for(;null!==l;){switch(l.tag){case 27:if(bd(l.type)){Tl=l.stateNode,Pl=!1;break e}break;case 5:Tl=l.stateNode,Pl=!1;break e;case 3:case 4:Tl=l.stateNode.containerInfo,Pl=!0;break e}l=l.return}if(null===Tl)throw Error(r(160));Ll(a,s,o),Tl=null,Pl=!1,null!==(a=o.alternate)&&(a.return=null),o.return=null}if(13878&t.subtreeFlags)for(t=t.child;null!==t;)Fl(t,e),t=t.sibling}var Ol=null;function Fl(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Nl(t,e),Vl(e),4&i&&(dl(3,e,e.return),ul(3,e),dl(5,e,e.return));break;case 1:Nl(t,e),Vl(e),512&i&&(Sl||null===n||ml(n,n.return)),64&i&&_l&&(null!==(e=e.updateQueue)&&(null!==(i=e.callbacks)&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=null===n?i:n.concat(i))));break;case 26:var o=Ol;if(Nl(t,e),Vl(e),512&i&&(Sl||null===n||ml(n,n.return)),4&i){var a=null!==n?n.memoizedState:null;if(i=e.memoizedState,null===n)if(null===i)if(null===e.stateNode){e:{i=e.type,n=e.memoizedProps,o=o.ownerDocument||o;t:switch(i){case"title":(!(a=o.getElementsByTagName("title")[0])||a[He]||a[Ne]||"http://www.w3.org/2000/svg"===a.namespaceURI||a.hasAttribute("itemprop"))&&(a=o.createElement(i),o.head.insertBefore(a,o.querySelector("head > title"))),id(a,i,n),a[Ne]=e,Qe(a),i=a;break e;case"link":var s=Hd("link","href",o).get(i+(n.href||""));if(s)for(var l=0;l<s.length;l++)if((a=s[l]).getAttribute("href")===(null==n.href||""===n.href?null:n.href)&&a.getAttribute("rel")===(null==n.rel?null:n.rel)&&a.getAttribute("title")===(null==n.title?null:n.title)&&a.getAttribute("crossorigin")===(null==n.crossOrigin?null:n.crossOrigin)){s.splice(l,1);break t}id(a=o.createElement(i),i,n),o.head.appendChild(a);break;case"meta":if(s=Hd("meta","content",o).get(i+(n.content||"")))for(l=0;l<s.length;l++)if((a=s[l]).getAttribute("content")===(null==n.content?null:""+n.content)&&a.getAttribute("name")===(null==n.name?null:n.name)&&a.getAttribute("property")===(null==n.property?null:n.property)&&a.getAttribute("http-equiv")===(null==n.httpEquiv?null:n.httpEquiv)&&a.getAttribute("charset")===(null==n.charSet?null:n.charSet)){s.splice(l,1);break t}id(a=o.createElement(i),i,n),o.head.appendChild(a);break;default:throw Error(r(468,i))}a[Ne]=e,Qe(a),i=a}e.stateNode=i}else jd(o,e.type,e.stateNode);else e.stateNode=Fd(o,i,e.memoizedProps);else a!==i?(null===a?null!==n.stateNode&&(n=n.stateNode).parentNode.removeChild(n):a.count--,null===i?jd(o,e.type,e.stateNode):Fd(o,i,e.memoizedProps)):null===i&&null!==e.stateNode&&bl(e,e.memoizedProps,n.memoizedProps)}break;case 27:Nl(t,e),Vl(e),512&i&&(Sl||null===n||ml(n,n.return)),null!==n&&4&i&&bl(e,e.memoizedProps,n.memoizedProps);break;case 5:if(Nl(t,e),Vl(e),512&i&&(Sl||null===n||ml(n,n.return)),32&e.flags){o=e.stateNode;try{Et(o,"")}catch(t){fu(e,e.return,t)}}4&i&&null!=e.stateNode&&bl(e,o=e.memoizedProps,null!==n?n.memoizedProps:o),1024&i&&(Cl=!0);break;case 6:if(Nl(t,e),Vl(e),4&i){if(null===e.stateNode)throw Error(r(162));i=e.memoizedProps,n=e.stateNode;try{n.nodeValue=i}catch(t){fu(e,e.return,t)}}break;case 3:if(Ud=null,o=Ol,Ol=Ad(t.containerInfo),Nl(t,e),Ol=o,Vl(e),4&i&&null!==n&&n.memoizedState.isDehydrated)try{Ph(t.containerInfo)}catch(t){fu(e,e.return,t)}Cl&&(Cl=!1,Rl(e));break;case 4:i=Ol,Ol=Ad(e.stateNode.containerInfo),Nl(t,e),Vl(e),Ol=i;break;case 12:default:Nl(t,e),Vl(e);break;case 13:Nl(t,e),Vl(e),8192&e.child.flags&&null!==e.memoizedState!=(null!==n&&null!==n.memoizedState)&&(Cc=oe()),4&i&&(null!==(i=e.updateQueue)&&(e.updateQueue=null,Il(e,i)));break;case 22:o=null!==e.memoizedState;var c=null!==n&&null!==n.memoizedState,u=_l,d=Sl;if(_l=u||o,Sl=d||c,Nl(t,e),Sl=d,_l=u,Vl(e),8192&i)e:for(t=e.stateNode,t._visibility=o?-2&t._visibility:1|t._visibility,o&&(null===n||c||_l||Sl||Ul(e)),n=null,t=e;;){if(5===t.tag||26===t.tag){if(null===n){c=n=t;try{if(a=c.stateNode,o)"function"==typeof(s=a.style).setProperty?s.setProperty("display","none","important"):s.display="none";else{l=c.stateNode;var h=c.memoizedProps.style,p=null!=h&&h.hasOwnProperty("display")?h.display:null;l.style.display=null==p||"boolean"==typeof p?"":(""+p).trim()}}catch(e){fu(c,c.return,e)}}}else if(6===t.tag){if(null===n){c=t;try{c.stateNode.nodeValue=o?"":c.memoizedProps}catch(e){fu(c,c.return,e)}}}else if((22!==t.tag&&23!==t.tag||null===t.memoizedState||t===e)&&null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;null===t.sibling;){if(null===t.return||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}4&i&&(null!==(i=e.updateQueue)&&(null!==(n=i.retryQueue)&&(i.retryQueue=null,Il(e,n))));break;case 19:Nl(t,e),Vl(e),4&i&&(null!==(i=e.updateQueue)&&(e.updateQueue=null,Il(e,i)));case 30:case 21:}}function Vl(e){var t=e.flags;if(2&t){try{for(var n,i=e.return;null!==i;){if(yl(i)){n=i;break}i=i.return}if(null==n)throw Error(r(160));switch(n.tag){case 27:var o=n.stateNode;kl(e,vl(e),o);break;case 5:var a=n.stateNode;32&n.flags&&(Et(a,""),n.flags&=-33),kl(e,vl(e),a);break;case 3:case 4:var s=n.stateNode.containerInfo;wl(e,vl(e),s);break;default:throw Error(r(161))}}catch(t){fu(e,e.return,t)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function Rl(e){if(1024&e.subtreeFlags)for(e=e.child;null!==e;){var t=e;Rl(t),5===t.tag&&1024&t.flags&&t.stateNode.reset(),e=e.sibling}}function Bl(e,t){if(8772&t.subtreeFlags)for(t=t.child;null!==t;)Al(e,t.alternate,t),t=t.sibling}function Ul(e){for(e=e.child;null!==e;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:dl(4,t,t.return),Ul(t);break;case 1:ml(t,t.return);var n=t.stateNode;"function"==typeof n.componentWillUnmount&&pl(t,t.return,n),Ul(t);break;case 27:Cd(t.stateNode);case 26:case 5:ml(t,t.return),Ul(t);break;case 22:null===t.memoizedState&&Ul(t);break;default:Ul(t)}e=e.sibling}}function Hl(e,t,n){for(n=n&&!!(8772&t.subtreeFlags),t=t.child;null!==t;){var r=t.alternate,i=e,o=t,a=o.flags;switch(o.tag){case 0:case 11:case 15:Hl(i,o,n),ul(4,o);break;case 1:if(Hl(i,o,n),"function"==typeof(i=(r=o).stateNode).componentDidMount)try{i.componentDidMount()}catch(e){fu(r,r.return,e)}if(null!==(i=(r=o).updateQueue)){var s=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(null!==l)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)go(l[i],s)}catch(e){fu(r,r.return,e)}}n&&64&a&&hl(o),fl(o,o.return);break;case 27:xl(o);case 26:case 5:Hl(i,o,n),n&&null===r&&4&a&&gl(o),fl(o,o.return);break;case 12:Hl(i,o,n);break;case 13:Hl(i,o,n),n&&4&a&&Dl(i,o);break;case 22:null===o.memoizedState&&Hl(i,o,n),fl(o,o.return);break;case 30:break;default:Hl(i,o,n)}t=t.sibling}}function jl(e,t){var n=null;null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),e=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(e=t.memoizedState.cachePool.pool),e!==n&&(null!=e&&e.refCount++,null!=n&&Fi(n))}function ql(e,t){e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Fi(e))}function Wl(e,t,n,r){if(10256&t.subtreeFlags)for(t=t.child;null!==t;)Kl(e,t,n,r),t=t.sibling}function Kl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Wl(e,t,n,r),2048&i&&ul(9,t);break;case 1:case 13:default:Wl(e,t,n,r);break;case 3:Wl(e,t,n,r),2048&i&&(e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Fi(e)));break;case 12:if(2048&i){Wl(e,t,n,r),e=t.stateNode;try{var o=t.memoizedProps,a=o.id,s=o.onPostCommit;"function"==typeof s&&s(a,null===t.alternate?"mount":"update",e.passiveEffectDuration,-0)}catch(e){fu(t,t.return,e)}}else Wl(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,a=t.alternate,null!==t.memoizedState?2&o._visibility?Wl(e,t,n,r):Ql(e,t):2&o._visibility?Wl(e,t,n,r):(o._visibility|=2,Gl(e,t,n,r,!!(10256&t.subtreeFlags))),2048&i&&jl(a,t);break;case 24:Wl(e,t,n,r),2048&i&&ql(t.alternate,t)}}function Gl(e,t,n,r,i){for(i=i&&!!(10256&t.subtreeFlags),t=t.child;null!==t;){var o=e,a=t,s=n,l=r,c=a.flags;switch(a.tag){case 0:case 11:case 15:Gl(o,a,s,l,i),ul(8,a);break;case 23:break;case 22:var u=a.stateNode;null!==a.memoizedState?2&u._visibility?Gl(o,a,s,l,i):Ql(o,a):(u._visibility|=2,Gl(o,a,s,l,i)),i&&2048&c&&jl(a.alternate,a);break;case 24:Gl(o,a,s,l,i),i&&2048&c&&ql(a.alternate,a);break;default:Gl(o,a,s,l,i)}t=t.sibling}}function Ql(e,t){if(10256&t.subtreeFlags)for(t=t.child;null!==t;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Ql(n,r),2048&i&&jl(r.alternate,r);break;case 24:Ql(n,r),2048&i&&ql(r.alternate,r);break;default:Ql(n,r)}t=t.sibling}}var Yl=8192;function Xl(e){if(e.subtreeFlags&Yl)for(e=e.child;null!==e;)Zl(e),e=e.sibling}function Zl(e){switch(e.tag){case 26:Xl(e),e.flags&Yl&&null!==e.memoizedState&&function(e,t,n){if(null===Wd)throw Error(r(475));var i=Wd;if(!("stylesheet"!==t.type||"string"==typeof n.media&&!1===matchMedia(n.media).matches||4&t.state.loading)){if(null===t.instance){var o=Ld(n.href),a=e.querySelector(Dd(o));if(a)return null!==(e=a._p)&&"object"==typeof e&&"function"==typeof e.then&&(i.count++,i=Gd.bind(i),e.then(i,i)),t.state.loading|=4,t.instance=a,void Qe(a);a=e.ownerDocument||e,n=Id(n),(o=Ed.get(o))&&Rd(n,o),Qe(a=a.createElement("link"));var s=a;s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),id(a,"link",n),t.instance=a}null===i.stylesheets&&(i.stylesheets=new Map),i.stylesheets.set(t,e),(e=t.state.preload)&&!(3&t.state.loading)&&(i.count++,t=Gd.bind(i),e.addEventListener("load",t),e.addEventListener("error",t))}}(Ol,e.memoizedState,e.memoizedProps);break;case 5:default:Xl(e);break;case 3:case 4:var t=Ol;Ol=Ad(e.stateNode.containerInfo),Xl(e),Ol=t;break;case 22:null===e.memoizedState&&(null!==(t=e.alternate)&&null!==t.memoizedState?(t=Yl,Yl=16777216,Xl(e),Yl=t):Xl(e))}}function Jl(e){var t=e.alternate;if(null!==t&&null!==(e=t.child)){t.child=null;do{t=e.sibling,e.sibling=null,e=t}while(null!==e)}}function ec(e){var t=e.deletions;if(16&e.flags){if(null!==t)for(var n=0;n<t.length;n++){var r=t[n];zl=r,rc(r,e)}Jl(e)}if(10256&e.subtreeFlags)for(e=e.child;null!==e;)tc(e),e=e.sibling}function tc(e){switch(e.tag){case 0:case 11:case 15:ec(e),2048&e.flags&&dl(9,e,e.return);break;case 3:case 12:default:ec(e);break;case 22:var t=e.stateNode;null!==e.memoizedState&&2&t._visibility&&(null===e.return||13!==e.return.tag)?(t._visibility&=-3,nc(e)):ec(e)}}function nc(e){var t=e.deletions;if(16&e.flags){if(null!==t)for(var n=0;n<t.length;n++){var r=t[n];zl=r,rc(r,e)}Jl(e)}for(e=e.child;null!==e;){switch((t=e).tag){case 0:case 11:case 15:dl(8,t,t.return),nc(t);break;case 22:2&(n=t.stateNode)._visibility&&(n._visibility&=-3,nc(t));break;default:nc(t)}e=e.sibling}}function rc(e,t){for(;null!==zl;){var n=zl;switch(n.tag){case 0:case 11:case 15:dl(8,n,t);break;case 23:case 22:if(null!==n.memoizedState&&null!==n.memoizedState.cachePool){var r=n.memoizedState.cachePool.pool;null!=r&&r.refCount++}break;case 24:Fi(n.memoizedState.cache)}if(null!==(r=n.child))r.return=n,zl=r;else e:for(n=e;null!==zl;){var i=(r=zl).sibling,o=r.return;if($l(r),r===n){zl=null;break e}if(null!==i){i.return=o,zl=i;break e}zl=o}}}var ic={getCacheForType:function(e){var t=Ti(Ni),n=t.data.get(e);return void 0===n&&(n=e(),t.data.set(e,n)),n}},oc="function"==typeof WeakMap?WeakMap:Map,ac=0,sc=null,lc=null,cc=0,uc=0,dc=null,hc=!1,pc=!1,fc=!1,mc=0,gc=0,bc=0,yc=0,vc=0,wc=0,kc=0,xc=null,_c=null,Sc=!1,Cc=0,Ec=1/0,zc=null,Ac=null,$c=0,Tc=null,Pc=null,Mc=0,Lc=0,Dc=null,Ic=null,Nc=0,Oc=null;function Fc(){if(2&ac&&0!==cc)return cc&-cc;if(null!==F.T){return 0!==Bi?Bi:Lu()}return De()}function Vc(){0===wc&&(wc=536870912&cc&&!ci?536870912:Ee());var e=ls.current;return null!==e&&(e.flags|=32),wc}function Rc(e,t,n){(e!==sc||2!==uc&&9!==uc)&&null===e.cancelPendingCommit||(Kc(e,0),jc(e,cc,wc,!1)),$e(e,n),2&ac&&e===sc||(e===sc&&(!(2&ac)&&(yc|=n),4===gc&&jc(e,cc,wc,!1)),Eu(e))}function Bc(e,t,n){if(6&ac)throw Error(r(327));for(var i=!n&&!(124&t)&&0===(t&e.expiredLanes)||Se(e,t),o=i?function(e,t){var n=ac;ac|=2;var i=Qc(),o=Yc();sc!==e||cc!==t?(zc=null,Ec=oe()+500,Kc(e,t)):pc=Se(e,t);e:for(;;)try{if(0!==uc&&null!==lc){t=lc;var a=dc;t:switch(uc){case 1:uc=0,dc=null,ru(e,t,a,1);break;case 2:case 9:if(Ji(a)){uc=0,dc=null,nu(t);break}t=function(){2!==uc&&9!==uc||sc!==e||(uc=7),Eu(e)},a.then(t,t);break e;case 3:uc=7;break e;case 4:uc=5;break e;case 7:Ji(a)?(uc=0,dc=null,nu(t)):(uc=0,dc=null,ru(e,t,a,7));break;case 5:var s=null;switch(lc.tag){case 26:s=lc.memoizedState;case 5:case 27:var l=lc;if(!s||qd(s)){uc=0,dc=null;var c=l.sibling;if(null!==c)lc=c;else{var u=l.return;null!==u?(lc=u,iu(u)):lc=null}break t}}uc=0,dc=null,ru(e,t,a,5);break;case 6:uc=0,dc=null,ru(e,t,a,6);break;case 8:Wc(),gc=6;break e;default:throw Error(r(462))}}eu();break}catch(t){Gc(e,t)}return xi=ki=null,F.H=i,F.A=o,ac=n,null!==lc?0:(sc=null,cc=0,Mr(),gc)}(e,t):Zc(e,t,!0),a=i;;){if(0===o){pc&&!i&&jc(e,t,0,!1);break}if(n=e.current.alternate,!a||Hc(n)){if(2===o){if(a=t,e.errorRecoveryDisabledLanes&a)var s=0;else s=0!==(s=-536870913&e.pendingLanes)?s:536870912&s?536870912:0;if(0!==s){t=s;e:{var l=e;o=xc;var c=l.current.memoizedState.isDehydrated;if(c&&(Kc(l,s).flags|=256),2!==(s=Zc(l,s,!1))){if(fc&&!c){l.errorRecoveryDisabledLanes|=a,yc|=a,o=4;break e}a=_c,_c=o,null!==a&&(null===_c?_c=a:_c.push.apply(_c,a))}o=s}if(a=!1,2!==o)continue}}if(1===o){Kc(e,0),jc(e,t,0,!0);break}e:{switch(i=e,a=o){case 0:case 1:throw Error(r(345));case 4:if((4194048&t)!==t)break;case 6:jc(i,t,wc,!hc);break e;case 2:_c=null;break;case 3:case 5:break;default:throw Error(r(329))}if((62914560&t)===t&&10<(o=Cc+300-oe())){if(jc(i,t,wc,!hc),0!==_e(i,0,!0))break e;i.timeoutHandle=hd(Uc.bind(null,i,n,_c,zc,Sc,t,wc,yc,kc,hc,a,2,-0,0),o)}else Uc(i,n,_c,zc,Sc,t,wc,yc,kc,hc,a,0,-0,0)}break}o=Zc(e,t,!1),a=!1}Eu(e)}function Uc(e,t,n,i,o,a,s,l,c,u,d,h,p,f){if(e.timeoutHandle=-1,(8192&(h=t.subtreeFlags)||!(16785408&~h))&&(Wd={stylesheets:null,count:0,unsuspend:Kd},Zl(t),null!==(h=function(){if(null===Wd)throw Error(r(475));var e=Wd;return e.stylesheets&&0===e.count&&Yd(e,e.stylesheets),0<e.count?function(t){var n=setTimeout(function(){if(e.stylesheets&&Yd(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(n)}}:null}())))return e.cancelPendingCommit=h(au.bind(null,e,t,a,n,i,o,s,l,c,d,1,p,f)),void jc(e,a,s,!u);au(e,t,a,n,i,o,s,l,c)}function Hc(e){for(var t=e;;){var n=t.tag;if((0===n||11===n||15===n)&&16384&t.flags&&(null!==(n=t.updateQueue)&&null!==(n=n.stores)))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!Jn(o(),i))return!1}catch(e){return!1}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function jc(e,t,n,r){t&=~vc,t&=~yc,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var o=31-be(i),a=1<<o;r[o]=-1,i&=~a}0!==n&&Te(e,n,t)}function qc(){return!!(6&ac)||(zu(0),!1)}function Wc(){if(null!==lc){if(0===uc)var e=lc.return;else xi=ki=null,Uo(e=lc),Ja=null,es=0,e=lc;for(;null!==e;)cl(e.alternate,e),e=e.return;lc=null}}function Kc(e,t){var n=e.timeoutHandle;-1!==n&&(e.timeoutHandle=-1,pd(n)),null!==(n=e.cancelPendingCommit)&&(e.cancelPendingCommit=null,n()),Wc(),sc=e,lc=n=Ur(e.current,null),cc=t,uc=0,dc=null,hc=!1,pc=Se(e,t),fc=!1,kc=wc=vc=yc=bc=gc=0,_c=xc=null,Sc=!1,8&t&&(t|=32&t);var r=e.entangledLanes;if(0!==r)for(e=e.entanglements,r&=t;0<r;){var i=31-be(r),o=1<<i;t|=e[i],r&=~o}return mc=t,Mr(),n}function Gc(e,t){So=null,F.H=Qa,t===Qi||t===Xi?(t=ro(),uc=3):t===Yi?(t=ro(),uc=4):uc=t===Ts?8:null!==t&&"object"==typeof t&&"function"==typeof t.then?6:1,dc=t,null===lc&&(gc=1,Cs(e,Ar(t,e.current)))}function Qc(){var e=F.H;return F.H=Qa,null===e?Qa:e}function Yc(){var e=F.A;return F.A=ic,e}function Xc(){gc=4,hc||(4194048&cc)!==cc&&null!==ls.current||(pc=!0),!(134217727&bc)&&!(134217727&yc)||null===sc||jc(sc,cc,wc,!1)}function Zc(e,t,n){var r=ac;ac|=2;var i=Qc(),o=Yc();sc===e&&cc===t||(zc=null,Kc(e,t)),t=!1;var a=gc;e:for(;;)try{if(0!==uc&&null!==lc){var s=lc,l=dc;switch(uc){case 8:Wc(),a=6;break e;case 3:case 2:case 9:case 6:null===ls.current&&(t=!0);var c=uc;if(uc=0,dc=null,ru(e,s,l,c),n&&pc){a=0;break e}break;default:c=uc,uc=0,dc=null,ru(e,s,l,c)}}Jc(),a=gc;break}catch(t){Gc(e,t)}return t&&e.shellSuspendCounter++,xi=ki=null,ac=r,F.H=i,F.A=o,null===lc&&(sc=null,cc=0,Mr()),a}function Jc(){for(;null!==lc;)tu(lc)}function eu(){for(;null!==lc&&!re();)tu(lc)}function tu(e){var t=tl(e.alternate,e,mc);e.memoizedProps=e.pendingProps,null===t?iu(e):lc=t}function nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Rs(n,t,t.pendingProps,t.type,void 0,cc);break;case 11:t=Rs(n,t,t.pendingProps,t.type.render,t.ref,cc);break;case 5:Uo(t);default:cl(n,t),t=tl(n,t=lc=Hr(t,mc),mc)}e.memoizedProps=e.pendingProps,null===t?iu(e):lc=t}function ru(e,t,n,i){xi=ki=null,Uo(t),Ja=null,es=0;var o=t.return;try{if(function(e,t,n,i,o){if(n.flags|=32768,null!==i&&"object"==typeof i&&"function"==typeof i.then){if(null!==(t=n.alternate)&&zi(t,n,o,!0),null!==(n=ls.current)){switch(n.tag){case 13:return null===cs?Xc():null===n.alternate&&0===gc&&(gc=3),n.flags&=-257,n.flags|=65536,n.lanes=o,i===Zi?n.flags|=16384:(null===(t=n.updateQueue)?n.updateQueue=new Set([i]):t.add(i),mu(e,i,o)),!1;case 22:return n.flags|=65536,i===Zi?n.flags|=16384:(null===(t=n.updateQueue)?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):null===(n=t.retryQueue)?t.retryQueue=new Set([i]):n.add(i),mu(e,i,o)),!1}throw Error(r(435,n.tag))}return mu(e,i,o),Xc(),!1}if(ci)return null!==(t=ls.current)?(!(65536&t.flags)&&(t.flags|=256),t.flags|=65536,t.lanes=o,i!==hi&&vi(Ar(e=Error(r(422),{cause:i}),n))):(i!==hi&&vi(Ar(t=Error(r(423),{cause:i}),n)),(e=e.current.alternate).flags|=65536,o&=-o,e.lanes|=o,i=Ar(i,n),ho(e,o=zs(e.stateNode,i,o)),4!==gc&&(gc=2)),!1;var a=Error(r(520),{cause:i});if(a=Ar(a,n),null===xc?xc=[a]:xc.push(a),4!==gc&&(gc=2),null===t)return!0;i=Ar(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=o&-o,n.lanes|=e,ho(n,e=zs(n.stateNode,i,e)),!1;case 1:if(t=n.type,a=n.stateNode,!(128&n.flags||"function"!=typeof t.getDerivedStateFromError&&(null===a||"function"!=typeof a.componentDidCatch||null!==Ac&&Ac.has(a))))return n.flags|=65536,o&=-o,n.lanes|=o,$s(o=As(o),e,n,i),ho(n,o),!1}n=n.return}while(null!==n);return!1}(e,o,t,n,cc))return gc=1,Cs(e,Ar(n,e.current)),void(lc=null)}catch(t){if(null!==o)throw lc=o,t;return gc=1,Cs(e,Ar(n,e.current)),void(lc=null)}32768&t.flags?(ci||1===i?e=!0:pc||536870912&cc?e=!1:(hc=e=!0,(2===i||9===i||3===i||6===i)&&(null!==(i=ls.current)&&13===i.tag&&(i.flags|=16384))),ou(t,e)):iu(t)}function iu(e){var t=e;do{if(32768&t.flags)return void ou(t,hc);e=t.return;var n=sl(t.alternate,t,mc);if(null!==n)return void(lc=n);if(null!==(t=t.sibling))return void(lc=t);lc=t=e}while(null!==t);0===gc&&(gc=5)}function ou(e,t){do{var n=ll(e.alternate,e);if(null!==n)return n.flags&=32767,void(lc=n);if(null!==(n=e.return)&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&null!==(e=e.sibling))return void(lc=e);lc=e=n}while(null!==e);gc=6,lc=null}function au(e,t,n,i,o,a,s,l,c){e.cancelPendingCommit=null;do{du()}while(0!==$c);if(6&ac)throw Error(r(327));if(null!==t){if(t===e.current)throw Error(r(177));if(a=t.lanes|t.childLanes,function(e,t,n,r,i,o){var a=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=a&~n;0<n;){var u=31-be(n),d=1<<u;s[u]=0,l[u]=-1;var h=c[u];if(null!==h)for(c[u]=null,u=0;u<h.length;u++){var p=h[u];null!==p&&(p.lane&=-536870913)}n&=~d}0!==r&&Te(e,r,0),0!==o&&0===i&&0!==e.tag&&(e.suspendedLanes|=o&~(a&~t))}(e,n,a|=Pr,s,l,c),e===sc&&(lc=sc=null,cc=0),Pc=t,Tc=e,Mc=n,Lc=a,Dc=o,Ic=i,10256&t.subtreeFlags||10256&t.flags?(e.callbackNode=null,e.callbackPriority=0,te(ce,function(){return hu(),null})):(e.callbackNode=null,e.callbackPriority=0),i=!!(13878&t.flags),13878&t.subtreeFlags||i){i=F.T,F.T=null,o=V.p,V.p=2,s=ac,ac|=4;try{!function(e,t){if(e=e.containerInfo,od=ah,or(e=ir(e))){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else{var i=(n=(n=e.ownerDocument)&&n.defaultView||window).getSelection&&n.getSelection();if(i&&0!==i.rangeCount){n=i.anchorNode;var o=i.anchorOffset,a=i.focusNode;i=i.focusOffset;var s=0,l=-1,c=-1,u=0,d=0,h=e,p=null;e:for(;;){for(var f;h!==n||0!==o&&3!==h.nodeType||(l=s+o),h!==a||0!==i&&3!==h.nodeType||(c=s+i),3===h.nodeType&&(s+=h.nodeValue.length),null!==(f=h.firstChild);)p=h,h=f;for(;;){if(h===e)break e;if(p===n&&++u===o&&(l=s),p===a&&++d===i&&(c=s),null!==(f=h.nextSibling))break;p=(h=p).parentNode}h=f}n=-1===l||-1===c?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(ad={focusedElem:e,selectionRange:n},ah=!1,zl=t;null!==zl;)if(e=(t=zl).child,1024&t.subtreeFlags&&null!==e)e.return=t,zl=e;else for(;null!==zl;){switch(a=(t=zl).alternate,e=t.flags,t.tag){case 0:case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break;case 1:if(1024&e&&null!==a){e=void 0,n=t,o=a.memoizedProps,a=a.memoizedState,i=n.stateNode;try{var m=ws(n.type,o);e=i.getSnapshotBeforeUpdate(m,a),i.__reactInternalSnapshotBeforeUpdate=e}catch(e){fu(n,n.return,e)}}break;case 3:if(1024&e)if(9===(n=(e=t.stateNode.containerInfo).nodeType))vd(e);else if(1===n)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":vd(e);break;default:e.textContent=""}break;default:if(1024&e)throw Error(r(163))}if(null!==(e=t.sibling)){e.return=t.return,zl=e;break}zl=t.return}}(e,t)}finally{ac=s,V.p=o,F.T=i}}$c=1,su(),lu(),cu()}}function su(){if(1===$c){$c=0;var e=Tc,t=Pc,n=!!(13878&t.flags);if(13878&t.subtreeFlags||n){n=F.T,F.T=null;var r=V.p;V.p=2;var i=ac;ac|=4;try{Fl(t,e);var o=ad,a=ir(e.containerInfo),s=o.focusedElem,l=o.selectionRange;if(a!==s&&s&&s.ownerDocument&&rr(s.ownerDocument.documentElement,s)){if(null!==l&&or(s)){var c=l.start,u=l.end;if(void 0===u&&(u=c),"selectionStart"in s)s.selectionStart=c,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,h=d&&d.defaultView||window;if(h.getSelection){var p=h.getSelection(),f=s.textContent.length,m=Math.min(l.start,f),g=void 0===l.end?m:Math.min(l.end,f);!p.extend&&m>g&&(a=g,g=m,m=a);var b=nr(s,m),y=nr(s,g);if(b&&y&&(1!==p.rangeCount||p.anchorNode!==b.node||p.anchorOffset!==b.offset||p.focusNode!==y.node||p.focusOffset!==y.offset)){var v=d.createRange();v.setStart(b.node,b.offset),p.removeAllRanges(),m>g?(p.addRange(v),p.extend(y.node,y.offset)):(v.setEnd(y.node,y.offset),p.addRange(v))}}}}for(d=[],p=s;p=p.parentNode;)1===p.nodeType&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for("function"==typeof s.focus&&s.focus(),s=0;s<d.length;s++){var w=d[s];w.element.scrollLeft=w.left,w.element.scrollTop=w.top}}ah=!!od,ad=od=null}finally{ac=i,V.p=r,F.T=n}}e.current=t,$c=2}}function lu(){if(2===$c){$c=0;var e=Tc,t=Pc,n=!!(8772&t.flags);if(8772&t.subtreeFlags||n){n=F.T,F.T=null;var r=V.p;V.p=2;var i=ac;ac|=4;try{Al(e,t.alternate,t)}finally{ac=i,V.p=r,F.T=n}}$c=3}}function cu(){if(4===$c||3===$c){$c=0,ie();var e=Tc,t=Pc,n=Mc,r=Ic;10256&t.subtreeFlags||10256&t.flags?$c=5:($c=0,Pc=Tc=null,uu(e,e.pendingLanes));var i=e.pendingLanes;if(0===i&&(Ac=null),Le(n),t=t.stateNode,me&&"function"==typeof me.onCommitFiberRoot)try{me.onCommitFiberRoot(fe,t,void 0,!(128&~t.current.flags))}catch(e){}if(null!==r){t=F.T,i=V.p,V.p=2,F.T=null;try{for(var o=e.onRecoverableError,a=0;a<r.length;a++){var s=r[a];o(s.value,{componentStack:s.stack})}}finally{F.T=t,V.p=i}}3&Mc&&du(),Eu(e),i=e.pendingLanes,4194090&n&&42&i?e===Oc?Nc++:(Nc=0,Oc=e):Nc=0,zu(0)}}function uu(e,t){0===(e.pooledCacheLanes&=t)&&(null!=(t=e.pooledCache)&&(e.pooledCache=null,Fi(t)))}function du(e){return su(),lu(),cu(),hu()}function hu(){if(5!==$c)return!1;var e=Tc,t=Lc;Lc=0;var n=Le(Mc),i=F.T,o=V.p;try{V.p=32>n?32:n,F.T=null,n=Dc,Dc=null;var a=Tc,s=Mc;if($c=0,Pc=Tc=null,Mc=0,6&ac)throw Error(r(331));var l=ac;if(ac|=4,tc(a.current),Kl(a,a.current,s,n),ac=l,zu(0),me&&"function"==typeof me.onPostCommitFiberRoot)try{me.onPostCommitFiberRoot(fe,a)}catch(e){}return!0}finally{V.p=o,F.T=i,uu(e,t)}}function pu(e,t,n){t=Ar(n,t),null!==(e=co(e,t=zs(e.stateNode,t,2),2))&&($e(e,2),Eu(e))}function fu(e,t,n){if(3===e.tag)pu(e,e,n);else for(;null!==t;){if(3===t.tag){pu(t,e,n);break}if(1===t.tag){var r=t.stateNode;if("function"==typeof t.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===Ac||!Ac.has(r))){e=Ar(n,e),null!==(r=co(t,n=As(2),2))&&($s(n,r,t,e),$e(r,2),Eu(r));break}}t=t.return}}function mu(e,t,n){var r=e.pingCache;if(null===r){r=e.pingCache=new oc;var i=new Set;r.set(t,i)}else void 0===(i=r.get(t))&&(i=new Set,r.set(t,i));i.has(n)||(fc=!0,i.add(n),e=gu.bind(null,e,t,n),t.then(e,e))}function gu(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,sc===e&&(cc&n)===n&&(4===gc||3===gc&&(62914560&cc)===cc&&300>oe()-Cc?!(2&ac)&&Kc(e,0):vc|=n,kc===cc&&(kc=0)),Eu(e)}function bu(e,t){0===t&&(t=ze()),null!==(e=Ir(e,t))&&($e(e,t),Eu(e))}function yu(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),bu(e,n)}function vu(e,t){var n=0;switch(e.tag){case 13:var i=e.stateNode,o=e.memoizedState;null!==o&&(n=o.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(r(314))}null!==i&&i.delete(t),bu(e,n)}var wu=null,ku=null,xu=!1,_u=!1,Su=!1,Cu=0;function Eu(e){e!==ku&&null===e.next&&(null===ku?wu=ku=e:ku=ku.next=e),_u=!0,xu||(xu=!0,md(function(){6&ac?te(se,Au):$u()}))}function zu(e,t){if(!Su&&_u){Su=!0;do{for(var n=!1,r=wu;null!==r;){if(0!==e){var i=r.pendingLanes;if(0===i)var o=0;else{var a=r.suspendedLanes,s=r.pingedLanes;o=(1<<31-be(42|e)+1)-1,o=201326741&(o&=i&~(a&~s))?201326741&o|1:o?2|o:0}0!==o&&(n=!0,Mu(r,o))}else o=cc,!(3&(o=_e(r,r===sc?o:0,null!==r.cancelPendingCommit||-1!==r.timeoutHandle)))||Se(r,o)||(n=!0,Mu(r,o));r=r.next}}while(n);Su=!1}}function Au(){$u()}function $u(){_u=xu=!1;var e=0;0!==Cu&&(function(){var e=window.event;if(e&&"popstate"===e.type)return e!==dd&&(dd=e,!0);return dd=null,!1}()&&(e=Cu),Cu=0);for(var t=oe(),n=null,r=wu;null!==r;){var i=r.next,o=Tu(r,t);0===o?(r.next=null,null===n?wu=i:n.next=i,null===i&&(ku=n)):(n=r,(0!==e||3&o)&&(_u=!0)),r=i}zu(e)}function Tu(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=-62914561&e.pendingLanes;0<o;){var a=31-be(o),s=1<<a,l=i[a];-1===l?0!==(s&n)&&0===(s&r)||(i[a]=Ce(s,t)):l<=t&&(e.expiredLanes|=s),o&=~s}if(n=cc,n=_e(e,e===(t=sc)?n:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle),r=e.callbackNode,0===n||e===t&&(2===uc||9===uc)||null!==e.cancelPendingCommit)return null!==r&&null!==r&&ne(r),e.callbackNode=null,e.callbackPriority=0;if(!(3&n)||Se(e,n)){if((t=n&-n)===e.callbackPriority)return t;switch(null!==r&&ne(r),Le(n)){case 2:case 8:n=le;break;case 32:default:n=ce;break;case 268435456:n=de}return r=Pu.bind(null,e),n=te(n,r),e.callbackPriority=t,e.callbackNode=n,t}return null!==r&&null!==r&&ne(r),e.callbackPriority=2,e.callbackNode=null,2}function Pu(e,t){if(0!==$c&&5!==$c)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(du()&&e.callbackNode!==n)return null;var r=cc;return 0===(r=_e(e,e===sc?r:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle))?null:(Bc(e,r,t),Tu(e,oe()),null!=e.callbackNode&&e.callbackNode===n?Pu.bind(null,e):null)}function Mu(e,t){if(du())return null;Bc(e,t,!0)}function Lu(){return 0===Cu&&(Cu=Ee()),Cu}function Du(e){return null==e||"symbol"==typeof e||"boolean"==typeof e?null:"function"==typeof e?e:Lt(""+e)}function Iu(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}for(var Nu=0;Nu<Cr.length;Nu++){var Ou=Cr[Nu];Er(Ou.toLowerCase(),"on"+(Ou[0].toUpperCase()+Ou.slice(1)))}Er(br,"onAnimationEnd"),Er(yr,"onAnimationIteration"),Er(vr,"onAnimationStart"),Er("dblclick","onDoubleClick"),Er("focusin","onFocus"),Er("focusout","onBlur"),Er(wr,"onTransitionRun"),Er(kr,"onTransitionStart"),Er(xr,"onTransitionCancel"),Er(_r,"onTransitionEnd"),Je("onMouseEnter",["mouseout","mouseover"]),Je("onMouseLeave",["mouseout","mouseover"]),Je("onPointerEnter",["pointerout","pointerover"]),Je("onPointerLeave",["pointerout","pointerover"]),Ze("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ze("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ze("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ze("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ze("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ze("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fu="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Vu=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Fu));function Ru(e,t){t=!!(4&t);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var a=r.length-1;0<=a;a--){var s=r[a],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==o&&i.isPropagationStopped())break e;o=s,i.currentTarget=c;try{o(i)}catch(e){ks(e)}i.currentTarget=null,o=l}else for(a=0;a<r.length;a++){if(l=(s=r[a]).instance,c=s.currentTarget,s=s.listener,l!==o&&i.isPropagationStopped())break e;o=s,i.currentTarget=c;try{o(i)}catch(e){ks(e)}i.currentTarget=null,o=l}}}}function Bu(e,t){var n=t[Ve];void 0===n&&(n=t[Ve]=new Set);var r=e+"__bubble";n.has(r)||(qu(t,e,2,!1),n.add(r))}function Uu(e,t,n){var r=0;t&&(r|=4),qu(n,e,r,t)}var Hu="_reactListening"+Math.random().toString(36).slice(2);function ju(e){if(!e[Hu]){e[Hu]=!0,Ye.forEach(function(t){"selectionchange"!==t&&(Vu.has(t)||Uu(t,!1,e),Uu(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Hu]||(t[Hu]=!0,Uu("selectionchange",!1,t))}}function qu(e,t,n,r){switch(ph(t)){case 2:var i=sh;break;case 8:i=lh;break;default:i=ch}n=i.bind(null,t,n,e),i=void 0,!Ht||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(i=!0),r?void 0!==i?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):void 0!==i?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Wu(e,t,n,r,i){var a=r;if(!(1&t||2&t||null===r))e:for(;;){if(null===r)return;var s=r.tag;if(3===s||4===s){var l=r.stateNode.containerInfo;if(l===i)break;if(4===s)for(s=r.return;null!==s;){var c=s.tag;if((3===c||4===c)&&s.stateNode.containerInfo===i)return;s=s.return}for(;null!==l;){if(null===(s=qe(l)))return;if(5===(c=s.tag)||6===c||26===c||27===c){r=a=s;continue e}l=l.parentNode}}r=r.return}Rt(function(){var r=a,i=It(n),s=[];e:{var l=Sr.get(e);if(void 0!==l){var c=rn,u=e;switch(e){case"keypress":if(0===Qt(n))break e;case"keydown":case"keyup":c=vn;break;case"focusin":u="focus",c=un;break;case"focusout":u="blur",c=un;break;case"beforeblur":case"afterblur":c=un;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":c=ln;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":c=cn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":c=kn;break;case br:case yr:case vr:c=dn;break;case _r:c=xn;break;case"scroll":case"scrollend":c=an;break;case"wheel":c=_n;break;case"copy":case"cut":case"paste":c=hn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":c=wn;break;case"toggle":case"beforetoggle":c=Sn}var d=!!(4&t),h=!d&&("scroll"===e||"scrollend"===e),p=d?null!==l?l+"Capture":null:l;d=[];for(var f,m=r;null!==m;){var g=m;if(f=g.stateNode,5!==(g=g.tag)&&26!==g&&27!==g||null===f||null===p||null!=(g=Bt(m,p))&&d.push(Ku(m,g,f)),h)break;m=m.return}0<d.length&&(l=new c(l,u,null,n,i),s.push({event:l,listeners:d}))}}if(!(7&t)){if(c="mouseout"===e||"pointerout"===e,(!(l="mouseover"===e||"pointerover"===e)||n===Dt||!(u=n.relatedTarget||n.fromElement)||!qe(u)&&!u[Fe])&&(c||l)&&(l=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(c=r,null!==(u=(u=n.relatedTarget||n.toElement)?qe(u):null)&&(h=o(u),d=u.tag,u!==h||5!==d&&27!==d&&6!==d)&&(u=null)):(c=null,u=r),c!==u)){if(d=ln,g="onMouseLeave",p="onMouseEnter",m="mouse","pointerout"!==e&&"pointerover"!==e||(d=wn,g="onPointerLeave",p="onPointerEnter",m="pointer"),h=null==c?l:Ke(c),f=null==u?l:Ke(u),(l=new d(g,m+"leave",c,n,i)).target=h,l.relatedTarget=f,g=null,qe(i)===r&&((d=new d(p,m+"enter",u,n,i)).target=f,d.relatedTarget=h,g=d),h=g,c&&u)e:{for(p=u,m=0,f=d=c;f;f=Qu(f))m++;for(f=0,g=p;g;g=Qu(g))f++;for(;0<m-f;)d=Qu(d),m--;for(;0<f-m;)p=Qu(p),f--;for(;m--;){if(d===p||null!==p&&d===p.alternate)break e;d=Qu(d),p=Qu(p)}d=null}else d=null;null!==c&&Yu(s,l,c,d,!1),null!==u&&null!==h&&Yu(s,h,u,d,!0)}if("select"===(c=(l=r?Ke(r):window).nodeName&&l.nodeName.toLowerCase())||"input"===c&&"file"===l.type)var b=Un;else if(Nn(l))if(Hn)b=Zn;else{b=Yn;var y=Qn}else!(c=l.nodeName)||"input"!==c.toLowerCase()||"checkbox"!==l.type&&"radio"!==l.type?r&&Tt(r.elementType)&&(b=Un):b=Xn;switch(b&&(b=b(e,r))?On(s,b,n,i):(y&&y(e,l,r),"focusout"===e&&r&&"number"===l.type&&null!=r.memoizedProps.value&&xt(l,"number",l.value)),y=r?Ke(r):window,e){case"focusin":(Nn(y)||"true"===y.contentEditable)&&(sr=y,lr=r,cr=null);break;case"focusout":cr=lr=sr=null;break;case"mousedown":ur=!0;break;case"contextmenu":case"mouseup":case"dragend":ur=!1,dr(s,n,i);break;case"selectionchange":if(ar)break;case"keydown":case"keyup":dr(s,n,i)}var v;if(En)e:{switch(e){case"compositionstart":var w="onCompositionStart";break e;case"compositionend":w="onCompositionEnd";break e;case"compositionupdate":w="onCompositionUpdate";break e}w=void 0}else Dn?Mn(e,n)&&(w="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(w="onCompositionStart");w&&($n&&"ko"!==n.locale&&(Dn||"onCompositionStart"!==w?"onCompositionEnd"===w&&Dn&&(v=Gt()):(Wt="value"in(qt=i)?qt.value:qt.textContent,Dn=!0)),0<(y=Gu(r,w)).length&&(w=new pn(w,e,null,n,i),s.push({event:w,listeners:y}),v?w.data=v:null!==(v=Ln(n))&&(w.data=v))),(v=An?function(e,t){switch(e){case"compositionend":return Ln(t);case"keypress":return 32!==t.which?null:(Pn=!0,Tn);case"textInput":return(e=t.data)===Tn&&Pn?null:e;default:return null}}(e,n):function(e,t){if(Dn)return"compositionend"===e||!En&&Mn(e,t)?(e=Gt(),Kt=Wt=qt=null,Dn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return $n&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(w=Gu(r,"onBeforeInput")).length&&(y=new pn("onBeforeInput","beforeinput",null,n,i),s.push({event:y,listeners:w}),y.data=v)),function(e,t,n,r,i){if("submit"===t&&n&&n.stateNode===i){var o=Du((i[Oe]||null).action),a=r.submitter;a&&null!==(t=(t=a[Oe]||null)?Du(t.formAction):a.getAttribute("formAction"))&&(o=t,a=null);var s=new rn("action","action",null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(0!==Cu){var e=a?Iu(i,a):new FormData(i);Ia(n,{pending:!0,data:e,method:i.method,action:o},null,e)}}else"function"==typeof o&&(s.preventDefault(),e=a?Iu(i,a):new FormData(i),Ia(n,{pending:!0,data:e,method:i.method,action:o},o,e))},currentTarget:i}]})}}(s,e,r,n,i)}Ru(s,t)})}function Ku(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Gu(e,t){for(var n=t+"Capture",r=[];null!==e;){var i=e,o=i.stateNode;if(5!==(i=i.tag)&&26!==i&&27!==i||null===o||(null!=(i=Bt(e,n))&&r.unshift(Ku(e,i,o)),null!=(i=Bt(e,t))&&r.push(Ku(e,i,o))),3===e.tag)return r;e=e.return}return[]}function Qu(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag&&27!==e.tag);return e||null}function Yu(e,t,n,r,i){for(var o=t._reactName,a=[];null!==n&&n!==r;){var s=n,l=s.alternate,c=s.stateNode;if(s=s.tag,null!==l&&l===r)break;5!==s&&26!==s&&27!==s||null===c||(l=c,i?null!=(c=Bt(n,o))&&a.unshift(Ku(n,c,l)):i||null!=(c=Bt(n,o))&&a.push(Ku(n,c,l))),n=n.return}0!==a.length&&e.push({event:t,listeners:a})}var Xu=/\r\n?/g,Zu=/\u0000|\uFFFD/g;function Ju(e){return("string"==typeof e?e:""+e).replace(Xu,"\n").replace(Zu,"")}function ed(e,t){return t=Ju(t),Ju(e)===t}function td(){}function nd(e,t,n,i,o,a){switch(n){case"children":"string"==typeof i?"body"===t||"textarea"===t&&""===i||Et(e,i):("number"==typeof i||"bigint"==typeof i)&&"body"!==t&&Et(e,""+i);break;case"className":at(e,"class",i);break;case"tabIndex":at(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":at(e,n,i);break;case"style":$t(e,i,a);break;case"data":if("object"!==t){at(e,"data",i);break}case"src":case"href":if(""===i&&("a"!==t||"href"!==n)){e.removeAttribute(n);break}if(null==i||"function"==typeof i||"symbol"==typeof i||"boolean"==typeof i){e.removeAttribute(n);break}i=Lt(""+i),e.setAttribute(n,i);break;case"action":case"formAction":if("function"==typeof i){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}if("function"==typeof a&&("formAction"===n?("input"!==t&&nd(e,t,"name",o.name,o,null),nd(e,t,"formEncType",o.formEncType,o,null),nd(e,t,"formMethod",o.formMethod,o,null),nd(e,t,"formTarget",o.formTarget,o,null)):(nd(e,t,"encType",o.encType,o,null),nd(e,t,"method",o.method,o,null),nd(e,t,"target",o.target,o,null))),null==i||"symbol"==typeof i||"boolean"==typeof i){e.removeAttribute(n);break}i=Lt(""+i),e.setAttribute(n,i);break;case"onClick":null!=i&&(e.onclick=td);break;case"onScroll":null!=i&&Bu("scroll",e);break;case"onScrollEnd":null!=i&&Bu("scrollend",e);break;case"dangerouslySetInnerHTML":if(null!=i){if("object"!=typeof i||!("__html"in i))throw Error(r(61));if(null!=(n=i.__html)){if(null!=o.children)throw Error(r(60));e.innerHTML=n}}break;case"multiple":e.multiple=i&&"function"!=typeof i&&"symbol"!=typeof i;break;case"muted":e.muted=i&&"function"!=typeof i&&"symbol"!=typeof i;break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":case"autoFocus":break;case"xlinkHref":if(null==i||"function"==typeof i||"boolean"==typeof i||"symbol"==typeof i){e.removeAttribute("xlink:href");break}n=Lt(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":null!=i&&"function"!=typeof i&&"symbol"!=typeof i?e.setAttribute(n,""+i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&"function"!=typeof i&&"symbol"!=typeof i?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":!0===i?e.setAttribute(n,""):!1!==i&&null!=i&&"function"!=typeof i&&"symbol"!=typeof i?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":null!=i&&"function"!=typeof i&&"symbol"!=typeof i&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":null==i||"function"==typeof i||"symbol"==typeof i||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":Bu("beforetoggle",e),Bu("toggle",e),ot(e,"popover",i);break;case"xlinkActuate":st(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":st(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":st(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":st(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":st(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":st(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":st(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":st(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":st(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":ot(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||"o"!==n[0]&&"O"!==n[0]||"n"!==n[1]&&"N"!==n[1])&&ot(e,n=Pt.get(n)||n,i)}}function rd(e,t,n,i,o,a){switch(n){case"style":$t(e,i,a);break;case"dangerouslySetInnerHTML":if(null!=i){if("object"!=typeof i||!("__html"in i))throw Error(r(61));if(null!=(n=i.__html)){if(null!=o.children)throw Error(r(60));e.innerHTML=n}}break;case"children":"string"==typeof i?Et(e,i):("number"==typeof i||"bigint"==typeof i)&&Et(e,""+i);break;case"onScroll":null!=i&&Bu("scroll",e);break;case"onScrollEnd":null!=i&&Bu("scrollend",e);break;case"onClick":null!=i&&(e.onclick=td);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":case"innerText":case"textContent":break;default:Xe.hasOwnProperty(n)||("o"!==n[0]||"n"!==n[1]||(o=n.endsWith("Capture"),t=n.slice(2,o?n.length-7:void 0),"function"==typeof(a=null!=(a=e[Oe]||null)?a[n]:null)&&e.removeEventListener(t,a,o),"function"!=typeof i)?n in e?e[n]=i:!0===i?e.setAttribute(n,""):ot(e,n,i):("function"!=typeof a&&null!==a&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,i,o)))}}function id(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Bu("error",e),Bu("load",e);var i,o=!1,a=!1;for(i in n)if(n.hasOwnProperty(i)){var s=n[i];if(null!=s)switch(i){case"src":o=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,t));default:nd(e,t,i,s,n,null)}}return a&&nd(e,t,"srcSet",n.srcSet,n,null),void(o&&nd(e,t,"src",n.src,n,null));case"input":Bu("invalid",e);var l=i=s=a=null,c=null,u=null;for(o in n)if(n.hasOwnProperty(o)){var d=n[o];if(null!=d)switch(o){case"name":a=d;break;case"type":s=d;break;case"checked":c=d;break;case"defaultChecked":u=d;break;case"value":i=d;break;case"defaultValue":l=d;break;case"children":case"dangerouslySetInnerHTML":if(null!=d)throw Error(r(137,t));break;default:nd(e,t,o,d,n,null)}}return kt(e,i,l,c,u,s,a,!1),void mt(e);case"select":for(a in Bu("invalid",e),o=s=i=null,n)if(n.hasOwnProperty(a)&&null!=(l=n[a]))switch(a){case"value":i=l;break;case"defaultValue":s=l;break;case"multiple":o=l;default:nd(e,t,a,l,n,null)}return t=i,n=s,e.multiple=!!o,void(null!=t?_t(e,!!o,t,!1):null!=n&&_t(e,!!o,n,!0));case"textarea":for(s in Bu("invalid",e),i=a=o=null,n)if(n.hasOwnProperty(s)&&null!=(l=n[s]))switch(s){case"value":o=l;break;case"defaultValue":a=l;break;case"children":i=l;break;case"dangerouslySetInnerHTML":if(null!=l)throw Error(r(91));break;default:nd(e,t,s,l,n,null)}return Ct(e,o,a,i),void mt(e);case"option":for(c in n)if(n.hasOwnProperty(c)&&null!=(o=n[c]))if("selected"===c)e.selected=o&&"function"!=typeof o&&"symbol"!=typeof o;else nd(e,t,c,o,n,null);return;case"dialog":Bu("beforetoggle",e),Bu("toggle",e),Bu("cancel",e),Bu("close",e);break;case"iframe":case"object":Bu("load",e);break;case"video":case"audio":for(o=0;o<Fu.length;o++)Bu(Fu[o],e);break;case"image":Bu("error",e),Bu("load",e);break;case"details":Bu("toggle",e);break;case"embed":case"source":case"link":Bu("error",e),Bu("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(u in n)if(n.hasOwnProperty(u)&&null!=(o=n[u]))switch(u){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,t));default:nd(e,t,u,o,n,null)}return;default:if(Tt(t)){for(d in n)n.hasOwnProperty(d)&&(void 0!==(o=n[d])&&rd(e,t,d,o,n,void 0));return}}for(l in n)n.hasOwnProperty(l)&&(null!=(o=n[l])&&nd(e,t,l,o,n,null))}var od=null,ad=null;function sd(e){return 9===e.nodeType?e:e.ownerDocument}function ld(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function cd(e,t){if(0===e)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return 1===e&&"foreignObject"===t?0:e}function ud(e,t){return"textarea"===e||"noscript"===e||"string"==typeof t.children||"number"==typeof t.children||"bigint"==typeof t.children||"object"==typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var dd=null;var hd="function"==typeof setTimeout?setTimeout:void 0,pd="function"==typeof clearTimeout?clearTimeout:void 0,fd="function"==typeof Promise?Promise:void 0,md="function"==typeof queueMicrotask?queueMicrotask:void 0!==fd?function(e){return fd.resolve(null).then(e).catch(gd)}:hd;function gd(e){setTimeout(function(){throw e})}function bd(e){return"head"===e}function yd(e,t){var n=t,r=0,i=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&8===o.nodeType)if("/$"===(n=o.data)){if(0<r&&8>r){n=r;var a=e.ownerDocument;if(1&n&&Cd(a.documentElement),2&n&&Cd(a.body),4&n)for(Cd(n=a.head),a=n.firstChild;a;){var s=a.nextSibling,l=a.nodeName;a[He]||"SCRIPT"===l||"STYLE"===l||"LINK"===l&&"stylesheet"===a.rel.toLowerCase()||n.removeChild(a),a=s}}if(0===i)return e.removeChild(o),void Ph(t);i--}else"$"===n||"$?"===n||"$!"===n?i++:r=n.charCodeAt(0)-48;else r=0;n=o}while(n);Ph(t)}function vd(e){var t=e.firstChild;for(t&&10===t.nodeType&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":vd(n),je(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if("stylesheet"===n.rel.toLowerCase())continue}e.removeChild(n)}}function wd(e){return"$!"===e.data||"$?"===e.data&&"complete"===e.ownerDocument.readyState}function kd(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t||"F!"===t||"F"===t)break;if("/$"===t)return null}}return e}var xd=null;function _d(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}function Sd(e,t,n){switch(t=sd(n),e){case"html":if(!(e=t.documentElement))throw Error(r(452));return e;case"head":if(!(e=t.head))throw Error(r(453));return e;case"body":if(!(e=t.body))throw Error(r(454));return e;default:throw Error(r(451))}}function Cd(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);je(e)}var Ed=new Map,zd=new Set;function Ad(e){return"function"==typeof e.getRootNode?e.getRootNode():9===e.nodeType?e:e.ownerDocument}var $d=V.d;V.d={f:function(){var e=$d.f(),t=qc();return e||t},r:function(e){var t=We(e);null!==t&&5===t.tag&&"form"===t.type?Oa(t):$d.r(e)},D:function(e){$d.D(e),Pd("dns-prefetch",e,null)},C:function(e,t){$d.C(e,t),Pd("preconnect",e,t)},L:function(e,t,n){$d.L(e,t,n);var r=Td;if(r&&e&&t){var i='link[rel="preload"][as="'+vt(t)+'"]';"image"===t&&n&&n.imageSrcSet?(i+='[imagesrcset="'+vt(n.imageSrcSet)+'"]',"string"==typeof n.imageSizes&&(i+='[imagesizes="'+vt(n.imageSizes)+'"]')):i+='[href="'+vt(e)+'"]';var o=i;switch(t){case"style":o=Ld(e);break;case"script":o=Nd(e)}Ed.has(o)||(e=u({rel:"preload",href:"image"===t&&n&&n.imageSrcSet?void 0:e,as:t},n),Ed.set(o,e),null!==r.querySelector(i)||"style"===t&&r.querySelector(Dd(o))||"script"===t&&r.querySelector(Od(o))||(id(t=r.createElement("link"),"link",e),Qe(t),r.head.appendChild(t)))}},m:function(e,t){$d.m(e,t);var n=Td;if(n&&e){var r=t&&"string"==typeof t.as?t.as:"script",i='link[rel="modulepreload"][as="'+vt(r)+'"][href="'+vt(e)+'"]',o=i;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":o=Nd(e)}if(!Ed.has(o)&&(e=u({rel:"modulepreload",href:e},t),Ed.set(o,e),null===n.querySelector(i))){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Od(o)))return}id(r=n.createElement("link"),"link",e),Qe(r),n.head.appendChild(r)}}},X:function(e,t){$d.X(e,t);var n=Td;if(n&&e){var r=Ge(n).hoistableScripts,i=Nd(e),o=r.get(i);o||((o=n.querySelector(Od(i)))||(e=u({src:e,async:!0},t),(t=Ed.get(i))&&Bd(e,t),Qe(o=n.createElement("script")),id(o,"link",e),n.head.appendChild(o)),o={type:"script",instance:o,count:1,state:null},r.set(i,o))}},S:function(e,t,n){$d.S(e,t,n);var r=Td;if(r&&e){var i=Ge(r).hoistableStyles,o=Ld(e);t=t||"default";var a=i.get(o);if(!a){var s={loading:0,preload:null};if(a=r.querySelector(Dd(o)))s.loading=5;else{e=u({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Ed.get(o))&&Rd(e,n);var l=a=r.createElement("link");Qe(l),id(l,"link",e),l._p=new Promise(function(e,t){l.onload=e,l.onerror=t}),l.addEventListener("load",function(){s.loading|=1}),l.addEventListener("error",function(){s.loading|=2}),s.loading|=4,Vd(a,t,r)}a={type:"stylesheet",instance:a,count:1,state:s},i.set(o,a)}}},M:function(e,t){$d.M(e,t);var n=Td;if(n&&e){var r=Ge(n).hoistableScripts,i=Nd(e),o=r.get(i);o||((o=n.querySelector(Od(i)))||(e=u({src:e,async:!0,type:"module"},t),(t=Ed.get(i))&&Bd(e,t),Qe(o=n.createElement("script")),id(o,"link",e),n.head.appendChild(o)),o={type:"script",instance:o,count:1,state:null},r.set(i,o))}}};var Td="undefined"==typeof document?null:document;function Pd(e,t,n){var r=Td;if(r&&"string"==typeof t&&t){var i=vt(t);i='link[rel="'+e+'"][href="'+i+'"]',"string"==typeof n&&(i+='[crossorigin="'+n+'"]'),zd.has(i)||(zd.add(i),e={rel:e,crossOrigin:n,href:t},null===r.querySelector(i)&&(id(t=r.createElement("link"),"link",e),Qe(t),r.head.appendChild(t)))}}function Md(e,t,n,i){var o,a,s,l,c=(c=G.current)?Ad(c):null;if(!c)throw Error(r(446));switch(e){case"meta":case"title":return null;case"style":return"string"==typeof n.precedence&&"string"==typeof n.href?(t=Ld(n.href),(i=(n=Ge(c).hoistableStyles).get(t))||(i={type:"style",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if("stylesheet"===n.rel&&"string"==typeof n.href&&"string"==typeof n.precedence){e=Ld(n.href);var u=Ge(c).hoistableStyles,d=u.get(e);if(d||(c=c.ownerDocument||c,d={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},u.set(e,d),(u=c.querySelector(Dd(e)))&&!u._p&&(d.instance=u,d.state.loading=5),Ed.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ed.set(e,n),u||(o=c,a=e,s=n,l=d.state,o.querySelector('link[rel="preload"][as="style"]['+a+"]")?l.loading=1:(a=o.createElement("link"),l.preload=a,a.addEventListener("load",function(){return l.loading|=1}),a.addEventListener("error",function(){return l.loading|=2}),id(a,"link",s),Qe(a),o.head.appendChild(a))))),t&&null===i)throw Error(r(528,""));return d}if(t&&null!==i)throw Error(r(529,""));return null;case"script":return t=n.async,"string"==typeof(n=n.src)&&t&&"function"!=typeof t&&"symbol"!=typeof t?(t=Nd(n),(i=(n=Ge(c).hoistableScripts).get(t))||(i={type:"script",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,e))}}function Ld(e){return'href="'+vt(e)+'"'}function Dd(e){return'link[rel="stylesheet"]['+e+"]"}function Id(e){return u({},e,{"data-precedence":e.precedence,precedence:null})}function Nd(e){return'[src="'+vt(e)+'"]'}function Od(e){return"script[async]"+e}function Fd(e,t,n){if(t.count++,null===t.instance)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+vt(n.href)+'"]');if(i)return t.instance=i,Qe(i),i;var o=u({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return Qe(i=(e.ownerDocument||e).createElement("style")),id(i,"style",o),Vd(i,n.precedence,e),t.instance=i;case"stylesheet":o=Ld(n.href);var a=e.querySelector(Dd(o));if(a)return t.state.loading|=4,t.instance=a,Qe(a),a;i=Id(n),(o=Ed.get(o))&&Rd(i,o),Qe(a=(e.ownerDocument||e).createElement("link"));var s=a;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),id(a,"link",i),t.state.loading|=4,Vd(a,n.precedence,e),t.instance=a;case"script":return a=Nd(n.src),(o=e.querySelector(Od(a)))?(t.instance=o,Qe(o),o):(i=n,(o=Ed.get(a))&&Bd(i=u({},n),o),Qe(o=(e=e.ownerDocument||e).createElement("script")),id(o,"link",i),e.head.appendChild(o),t.instance=o);case"void":return null;default:throw Error(r(443,t.type))}else"stylesheet"===t.type&&!(4&t.state.loading)&&(i=t.instance,t.state.loading|=4,Vd(i,n.precedence,e));return t.instance}function Vd(e,t,n){for(var r=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),i=r.length?r[r.length-1]:null,o=i,a=0;a<r.length;a++){var s=r[a];if(s.dataset.precedence===t)o=s;else if(o!==i)break}o?o.parentNode.insertBefore(e,o.nextSibling):(t=9===n.nodeType?n.head:n).insertBefore(e,t.firstChild)}function Rd(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.title&&(e.title=t.title)}function Bd(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.integrity&&(e.integrity=t.integrity)}var Ud=null;function Hd(e,t,n){if(null===Ud){var r=new Map,i=Ud=new Map;i.set(n,r)}else(r=(i=Ud).get(n))||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var o=n[i];if(!(o[He]||o[Ne]||"link"===e&&"stylesheet"===o.getAttribute("rel"))&&"http://www.w3.org/2000/svg"!==o.namespaceURI){var a=o.getAttribute(t)||"";a=e+a;var s=r.get(a);s?s.push(o):r.set(a,[o])}}return r}function jd(e,t,n){(e=e.ownerDocument||e).head.insertBefore(n,"title"===t?e.querySelector("head > title"):null)}function qd(e){return!!("stylesheet"!==e.type||3&e.state.loading)}var Wd=null;function Kd(){}function Gd(){if(this.count--,0===this.count)if(this.stylesheets)Yd(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}var Qd=null;function Yd(e,t){e.stylesheets=null,null!==e.unsuspend&&(e.count++,Qd=new Map,t.forEach(Xd,e),Qd=null,Gd.call(e))}function Xd(e,t){if(!(4&t.state.loading)){var n=Qd.get(e);if(n)var r=n.get(null);else{n=new Map,Qd.set(e,n);for(var i=e.querySelectorAll("link[data-precedence],style[data-precedence]"),o=0;o<i.length;o++){var a=i[o];"LINK"!==a.nodeName&&"not all"===a.getAttribute("media")||(n.set(a.dataset.precedence,a),r=a)}r&&n.set(null,r)}a=(i=t.instance).getAttribute("data-precedence"),(o=n.get(a)||r)===r&&n.set(null,i),n.set(a,i),this.count++,r=Gd.bind(this),i.addEventListener("load",r),i.addEventListener("error",r),o?o.parentNode.insertBefore(i,o.nextSibling):(e=9===e.nodeType?e.head:e).insertBefore(i,e.firstChild),t.state.loading|=4}}var Zd={$$typeof:S,Provider:null,Consumer:null,_currentValue:R,_currentValue2:R,_threadCount:0};function Jd(e,t,n,r,i,o,a,s){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ae(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ae(0),this.hiddenUpdates=Ae(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=o,this.onRecoverableError=a,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function eh(e,t,n,r,i,o,a,s,l,c,u,d){return e=new Jd(e,t,n,a,s,l,c,d),t=1,!0===o&&(t|=24),o=Rr(3,null,null,t),e.current=o,o.stateNode=e,(t=Oi()).refCount++,e.pooledCache=t,t.refCount++,o.memoizedState={element:r,isDehydrated:n,cache:t},ao(o),e}function th(e){return e?e=Fr:Fr}function nh(e,t,n,r,i,o){i=th(i),null===r.context?r.context=i:r.pendingContext=i,(r=lo(t)).payload={element:n},null!==(o=void 0===o?null:o)&&(r.callback=o),null!==(n=co(e,r,t))&&(Rc(n,0,t),uo(n,e,t))}function rh(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function ih(e,t){rh(e,t),(e=e.alternate)&&rh(e,t)}function oh(e){if(13===e.tag){var t=Ir(e,67108864);null!==t&&Rc(t,0,67108864),ih(e,67108864)}}var ah=!0;function sh(e,t,n,r){var i=F.T;F.T=null;var o=V.p;try{V.p=2,ch(e,t,n,r)}finally{V.p=o,F.T=i}}function lh(e,t,n,r){var i=F.T;F.T=null;var o=V.p;try{V.p=8,ch(e,t,n,r)}finally{V.p=o,F.T=i}}function ch(e,t,n,r){if(ah){var i=uh(r);if(null===i)Wu(e,t,r,dh,n),xh(e,r);else if(function(e,t,n,r,i){switch(t){case"focusin":return mh=_h(mh,e,t,n,r,i),!0;case"dragenter":return gh=_h(gh,e,t,n,r,i),!0;case"mouseover":return bh=_h(bh,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return yh.set(o,_h(yh.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,vh.set(o,_h(vh.get(o)||null,e,t,n,r,i)),!0}return!1}(i,e,t,n,r))r.stopPropagation();else if(xh(e,r),4&t&&-1<kh.indexOf(e)){for(;null!==i;){var o=We(i);if(null!==o)switch(o.tag){case 3:if((o=o.stateNode).current.memoizedState.isDehydrated){var a=xe(o.pendingLanes);if(0!==a){var s=o;for(s.pendingLanes|=2,s.entangledLanes|=2;a;){var l=1<<31-be(a);s.entanglements[1]|=l,a&=~l}Eu(o),!(6&ac)&&(Ec=oe()+500,zu(0))}}break;case 13:null!==(s=Ir(o,2))&&Rc(s,0,2),qc(),ih(o,2)}if(null===(o=uh(r))&&Wu(e,t,r,dh,n),o===i)break;i=o}null!==i&&r.stopPropagation()}else Wu(e,t,r,null,n)}}function uh(e){return hh(e=It(e))}var dh=null;function hh(e){if(dh=null,null!==(e=qe(e))){var t=o(e);if(null===t)e=null;else{var n=t.tag;if(13===n){if(null!==(e=a(t)))return e;e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return dh=e,null}function ph(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ae()){case se:return 2;case le:return 8;case ce:case ue:return 32;case de:return 268435456;default:return 32}default:return 32}}var fh=!1,mh=null,gh=null,bh=null,yh=new Map,vh=new Map,wh=[],kh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function xh(e,t){switch(e){case"focusin":case"focusout":mh=null;break;case"dragenter":case"dragleave":gh=null;break;case"mouseover":case"mouseout":bh=null;break;case"pointerover":case"pointerout":yh.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":vh.delete(t.pointerId)}}function _h(e,t,n,r,i,o){return null===e||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},null!==t&&(null!==(t=We(t))&&oh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==i&&-1===t.indexOf(i)&&t.push(i),e)}function Sh(e){var t=qe(e.target);if(null!==t){var n=o(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=a(n)))return e.blockedOn=t,void function(e,t){var n=V.p;try{return V.p=e,t()}finally{V.p=n}}(e.priority,function(){if(13===n.tag){var e=Fc();e=Me(e);var t=Ir(n,e);null!==t&&Rc(t,0,e),ih(n,e)}})}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function Ch(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=uh(e.nativeEvent);if(null!==n)return null!==(t=We(n))&&oh(t),e.blockedOn=n,!1;var r=new(n=e.nativeEvent).constructor(n.type,n);Dt=r,n.target.dispatchEvent(r),Dt=null,t.shift()}return!0}function Eh(e,t,n){Ch(e)&&n.delete(t)}function zh(){fh=!1,null!==mh&&Ch(mh)&&(mh=null),null!==gh&&Ch(gh)&&(gh=null),null!==bh&&Ch(bh)&&(bh=null),yh.forEach(Eh),vh.forEach(Eh)}function Ah(t,n){t.blockedOn===n&&(t.blockedOn=null,fh||(fh=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,zh)))}var $h=null;function Th(t){$h!==t&&($h=t,e.unstable_scheduleCallback(e.unstable_NormalPriority,function(){$h===t&&($h=null);for(var e=0;e<t.length;e+=3){var n=t[e],r=t[e+1],i=t[e+2];if("function"!=typeof r){if(null===hh(r||n))continue;break}var o=We(n);null!==o&&(t.splice(e,3),e-=3,Ia(o,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Ph(e){function t(t){return Ah(t,e)}null!==mh&&Ah(mh,e),null!==gh&&Ah(gh,e),null!==bh&&Ah(bh,e),yh.forEach(t),vh.forEach(t);for(var n=0;n<wh.length;n++){var r=wh[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<wh.length&&null===(n=wh[0]).blockedOn;)Sh(n),null===n.blockedOn&&wh.shift();if(null!=(n=(e.ownerDocument||e).$$reactFormReplay))for(r=0;r<n.length;r+=3){var i=n[r],o=n[r+1],a=i[Oe]||null;if("function"==typeof o)a||Th(n);else if(a){var s=null;if(o&&o.hasAttribute("formAction")){if(i=o,a=o[Oe]||null)s=a.formAction;else if(null!==hh(i))continue}else s=a.action;"function"==typeof s?n[r+1]=s:(n.splice(r,3),r-=3),Th(n)}}}function Mh(e){this._internalRoot=e}function Lh(e){this._internalRoot=e}Lh.prototype.render=Mh.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(r(409));nh(t.current,Fc(),e,t,null,null)},Lh.prototype.unmount=Mh.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;nh(e.current,2,null,e,null,null),qc(),t[Fe]=null}},Lh.prototype.unstable_scheduleHydration=function(e){if(e){var t=De();e={blockedOn:null,target:e,priority:t};for(var n=0;n<wh.length&&0!==t&&t<wh[n].priority;n++);wh.splice(n,0,e),0===n&&Sh(e)}};var Dh=t.version;if("19.1.0"!==Dh)throw Error(r(527,Dh,"19.1.0"));V.findDOMNode=function(e){var t=e._reactInternals;if(void 0===t){if("function"==typeof e.render)throw Error(r(188));throw e=Object.keys(e).join(","),Error(r(268,e))}return e=function(e){var t=e.alternate;if(!t){if(null===(t=o(e)))throw Error(r(188));return t!==e?null:e}for(var n=e,i=t;;){var a=n.return;if(null===a)break;var l=a.alternate;if(null===l){if(null!==(i=a.return)){n=i;continue}break}if(a.child===l.child){for(l=a.child;l;){if(l===n)return s(a),e;if(l===i)return s(a),t;l=l.sibling}throw Error(r(188))}if(n.return!==i.return)n=a,i=l;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,i=l;break}if(u===i){c=!0,i=a,n=l;break}u=u.sibling}if(!c){for(u=l.child;u;){if(u===n){c=!0,n=l,i=a;break}if(u===i){c=!0,i=l,n=a;break}u=u.sibling}if(!c)throw Error(r(189))}}if(n.alternate!==i)throw Error(r(190))}if(3!==n.tag)throw Error(r(188));return n.stateNode.current===n?e:t}(t),e=null===(e=null!==e?c(e):null)?null:e.stateNode};var Ih={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:F,reconcilerVersion:"19.1.0"};if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var Nh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Nh.isDisabled&&Nh.supportsFiber)try{fe=Nh.inject(Ih),me=Nh}catch(e){}}return m.createRoot=function(e,t){if(!i(e))throw Error(r(299));var n=!1,o="",a=xs,s=_s,l=Ss;return null!=t&&(!0===t.unstable_strictMode&&(n=!0),void 0!==t.identifierPrefix&&(o=t.identifierPrefix),void 0!==t.onUncaughtError&&(a=t.onUncaughtError),void 0!==t.onCaughtError&&(s=t.onCaughtError),void 0!==t.onRecoverableError&&(l=t.onRecoverableError),void 0!==t.unstable_transitionCallbacks&&t.unstable_transitionCallbacks),t=eh(e,1,!1,null,0,n,o,a,s,l,0,null),e[Fe]=t.current,ju(e),new Mh(t)},m.hydrateRoot=function(e,t,n){if(!i(e))throw Error(r(299));var o=!1,a="",s=xs,l=_s,c=Ss,u=null;return null!=n&&(!0===n.unstable_strictMode&&(o=!0),void 0!==n.identifierPrefix&&(a=n.identifierPrefix),void 0!==n.onUncaughtError&&(s=n.onUncaughtError),void 0!==n.onCaughtError&&(l=n.onCaughtError),void 0!==n.onRecoverableError&&(c=n.onRecoverableError),void 0!==n.unstable_transitionCallbacks&&n.unstable_transitionCallbacks,void 0!==n.formState&&(u=n.formState)),(t=eh(e,1,!0,t,0,o,a,s,l,c,0,u)).context=th(null),n=t.current,(a=lo(o=Me(o=Fc()))).callback=null,co(n,a,o),n=o,t.current.lanes=n,$e(t,n),Eu(t),e[Fe]=t.current,ju(e),new Lh(t)},m.version="19.1.0",m}const z=t((x||(x=1,function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){}}(),f.exports=E()),f.exports));var A,$,T={exports:{}},P={};var M=($||($=1,T.exports=function(){if(A)return P;A=1;var e=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(t,n,r){var i=null;if(void 0!==r&&(i=""+r),void 0!==n.key&&(i=""+n.key),"key"in n)for(var o in r={},n)"key"!==o&&(r[o]=n[o]);else r=n;return n=r.ref,{$$typeof:e,type:t,key:i,ref:void 0!==n?n:null,props:r}}return P.Fragment=t,P.jsx=n,P.jsxs=n,P}()),T.exports);const L=globalThis,D=L.ShadowRoot&&(void 0===L.ShadyCSS||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,I=Symbol(),N=new WeakMap;let O=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==I)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(D&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=N.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&N.set(t,e))}return e}toString(){return this.cssText}};const F=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[r+1],e[0]);return new O(n,e,I)},V=D?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return(e=>new O("string"==typeof e?e:e+"",void 0,I))(t)})(e):e,{is:R,defineProperty:B,getOwnPropertyDescriptor:U,getOwnPropertyNames:H,getOwnPropertySymbols:j,getPrototypeOf:q}=Object,W=globalThis,K=W.trustedTypes,G=K?K.emptyScript:"",Q=W.reactiveElementPolyfillSupport,Y=(e,t)=>e,X={toAttribute(e,t){switch(t){case Boolean:e=e?G:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},Z=(e,t)=>!R(e,t),J={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??=Symbol("metadata"),W.litPropertyMetadata??=new WeakMap;let ee=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=J){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),r=this.getPropertyDescriptor(e,n,t);void 0!==r&&B(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){const{get:r,set:i}=U(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const o=r?.call(this);i?.call(this,t),this.requestUpdate(e,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??J}static _$Ei(){if(this.hasOwnProperty(Y("elementProperties")))return;const e=q(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Y("properties"))){const e=this.properties,t=[...H(e),...j(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(V(e))}else void 0!==e&&t.push(V(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(D)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const n of t){const t=document.createElement("style"),r=L.litNonce;void 0!==r&&t.setAttribute("nonce",r),t.textContent=n.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(void 0!==r&&!0===n.reflect){const i=(void 0!==n.converter?.toAttribute?n.converter:X).toAttribute(t,n.type);this._$Em=e,null==i?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){const n=this.constructor,r=n._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=n.getPropertyOptions(r),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:X;this._$Em=r;const o=i.fromAttribute(t,e.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(e,t,n){if(void 0!==e){const r=this.constructor,i=this[e];if(n??=r.getPropertyOptions(e),!((n.hasChanged??Z)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},o){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==i||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e){const{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,n,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};ee.elementStyles=[],ee.shadowRootOptions={mode:"open"},ee[Y("elementProperties")]=new Map,ee[Y("finalized")]=new Map,Q?.({ReactiveElement:ee}),(W.reactiveElementVersions??=[]).push("2.1.1");const te=globalThis,ne=te.trustedTypes,re=ne?ne.createPolicy("lit-html",{createHTML:e=>e}):void 0,ie="$lit$",oe=`lit$${Math.random().toFixed(9).slice(2)}$`,ae="?"+oe,se=`<${ae}>`,le=document,ce=()=>le.createComment(""),ue=e=>null===e||"object"!=typeof e&&"function"!=typeof e,de=Array.isArray,he="[ \t\n\f\r]",pe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,me=/>/g,ge=RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,ye=/"/g,ve=/^(?:script|style|textarea|title)$/i,we=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),ke=Symbol.for("lit-noChange"),xe=Symbol.for("lit-nothing"),_e=new WeakMap,Se=le.createTreeWalker(le,129);function Ce(e,t){if(!de(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==re?re.createHTML(t):t}const Ee=(e,t)=>{const n=e.length-1,r=[];let i,o=2===t?"<svg>":3===t?"<math>":"",a=pe;for(let t=0;t<n;t++){const n=e[t];let s,l,c=-1,u=0;for(;u<n.length&&(a.lastIndex=u,l=a.exec(n),null!==l);)u=a.lastIndex,a===pe?"!--"===l[1]?a=fe:void 0!==l[1]?a=me:void 0!==l[2]?(ve.test(l[2])&&(i=RegExp("</"+l[2],"g")),a=ge):void 0!==l[3]&&(a=ge):a===ge?">"===l[0]?(a=i??pe,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?ge:'"'===l[3]?ye:be):a===ye||a===be?a=ge:a===fe||a===me?a=pe:(a=ge,i=void 0);const d=a===ge&&e[t+1].startsWith("/>")?" ":"";o+=a===pe?n+se:c>=0?(r.push(s),n.slice(0,c)+ie+n.slice(c)+oe+d):n+oe+(-2===c?t:d)}return[Ce(e,o+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class ze{constructor({strings:e,_$litType$:t},n){let r;this.parts=[];let i=0,o=0;const a=e.length-1,s=this.parts,[l,c]=Ee(e,t);if(this.el=ze.createElement(l,n),Se.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=Se.nextNode())&&s.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(ie)){const t=c[o++],n=r.getAttribute(e).split(oe),a=/([.?@])?(.*)/.exec(t);s.push({type:1,index:i,name:a[2],strings:n,ctor:"."===a[1]?Me:"?"===a[1]?Le:"@"===a[1]?De:Pe}),r.removeAttribute(e)}else e.startsWith(oe)&&(s.push({type:6,index:i}),r.removeAttribute(e));if(ve.test(r.tagName)){const e=r.textContent.split(oe),t=e.length-1;if(t>0){r.textContent=ne?ne.emptyScript:"";for(let n=0;n<t;n++)r.append(e[n],ce()),Se.nextNode(),s.push({type:2,index:++i});r.append(e[t],ce())}}}else if(8===r.nodeType)if(r.data===ae)s.push({type:2,index:i});else{let e=-1;for(;-1!==(e=r.data.indexOf(oe,e+1));)s.push({type:7,index:i}),e+=oe.length-1}i++}}static createElement(e,t){const n=le.createElement("template");return n.innerHTML=e,n}}function Ae(e,t,n=e,r){if(t===ke)return t;let i=void 0!==r?n._$Co?.[r]:n._$Cl;const o=ue(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),void 0===o?i=void 0:(i=new o(e),i._$AT(e,n,r)),void 0!==r?(n._$Co??=[])[r]=i:n._$Cl=i),void 0!==i&&(t=Ae(e,i._$AS(e,t.values),i,r)),t}class $e{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??le).importNode(t,!0);Se.currentNode=r;let i=Se.nextNode(),o=0,a=0,s=n[0];for(;void 0!==s;){if(o===s.index){let t;2===s.type?t=new Te(i,i.nextSibling,this,e):1===s.type?t=new s.ctor(i,s.name,s.strings,this,e):6===s.type&&(t=new Ie(i,this,e)),this._$AV.push(t),s=n[++a]}o!==s?.index&&(i=Se.nextNode(),o++)}return Se.currentNode=le,r}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class Te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=xe,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ae(this,e,t),ue(e)?e===xe||null==e||""===e?(this._$AH!==xe&&this._$AR(),this._$AH=xe):e!==this._$AH&&e!==ke&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>de(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==xe&&ue(this._$AH)?this._$AA.nextSibling.data=e:this.T(le.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,r="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=ze.createElement(Ce(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new $e(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=_e.get(e.strings);return void 0===t&&_e.set(e.strings,t=new ze(e)),t}k(e){de(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,r=0;for(const i of e)r===t.length?t.push(n=new Te(this.O(ce()),this.O(ce()),this,this.options)):n=t[r],n._$AI(i),r++;r<t.length&&(this._$AR(n&&n._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Pe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=xe,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=xe}_$AI(e,t=this,n,r){const i=this.strings;let o=!1;if(void 0===i)e=Ae(this,e,t,0),o=!ue(e)||e!==this._$AH&&e!==ke,o&&(this._$AH=e);else{const r=e;let a,s;for(e=i[0],a=0;a<i.length-1;a++)s=Ae(this,r[n+a],t,a),s===ke&&(s=this._$AH[a]),o||=!ue(s)||s!==this._$AH[a],s===xe?e=xe:e!==xe&&(e+=(s??"")+i[a+1]),this._$AH[a]=s}o&&!r&&this.j(e)}j(e){e===xe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}let Me=class extends Pe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===xe?void 0:e}};class Le extends Pe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==xe)}}class De extends Pe{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=Ae(this,e,t,0)??xe)===ke)return;const n=this._$AH,r=e===xe&&n!==xe||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==xe&&(n===xe||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Ie{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Ae(this,e)}}const Ne=te.litHtmlPolyfillSupport;Ne?.(ze,Te),(te.litHtmlVersions??=[]).push("3.3.1");const Oe=globalThis;let Fe=class extends ee{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{const r=n?.renderBefore??t;let i=r._$litPart$;if(void 0===i){const e=n?.renderBefore??null;r._$litPart$=i=new Te(t.insertBefore(ce(),e),e,void 0,n??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ke}};Fe._$litElement$=!0,Fe.finalized=!0,Oe.litElementHydrateSupport?.({LitElement:Fe});const Ve=Oe.litElementPolyfillSupport;Ve?.({LitElement:Fe}),(Oe.litElementVersions??=[]).push("4.2.1");var Re=F`
  :host(:not(:focus-within)) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`,Be=F`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,Ue=Object.defineProperty,He=Object.defineProperties,je=Object.getOwnPropertyDescriptor,qe=Object.getOwnPropertyDescriptors,We=Object.getOwnPropertySymbols,Ke=Object.prototype.hasOwnProperty,Ge=Object.prototype.propertyIsEnumerable,Qe=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),Ye=e=>{throw TypeError(e)},Xe=(e,t,n)=>t in e?Ue(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Ze=(e,t)=>{for(var n in t||(t={}))Ke.call(t,n)&&Xe(e,n,t[n]);if(We)for(var n of We(t))Ge.call(t,n)&&Xe(e,n,t[n]);return e},Je=(e,t)=>He(e,qe(t)),et=(e,t,n,r)=>{for(var i,o=r>1?void 0:r?je(t,n):t,a=e.length-1;a>=0;a--)(i=e[a])&&(o=(r?i(t,n,o):i(o))||o);return r&&o&&Ue(t,n,o),o},tt=(e,t,n)=>t.has(e)||Ye("Cannot "+n),nt=function(e,t){this[0]=e,this[1]=t};const rt={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:Z},it=(e=rt,t,n)=>{const{kind:r,metadata:i}=n;let o=globalThis.litPropertyMetadata.get(i);if(void 0===o&&globalThis.litPropertyMetadata.set(i,o=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),"accessor"===r){const{name:r}=n;return{set(n){const i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=n;return function(n){const i=this[r];t.call(this,n),this.requestUpdate(r,i,e)}}throw Error("Unsupported decorator location: "+r)};function ot(e){return(t,n)=>"object"==typeof n?it(e,t,n):((e,t,n)=>{const r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function at(e){return ot({...e,state:!0,attribute:!1})}function st(e){return(t,n)=>{const r="function"==typeof t?t:t[n];Object.assign(r,e)}}const lt=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,n),n);function ct(e,t){return(t,n,r)=>lt(t,n,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}var ut,dt=class extends Fe{constructor(){var e,t,n;super(),e=this,n=!1,(t=ut).has(e)?Ye("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([e,t])=>{this.constructor.define(e,t)})}emit(e,t){const n=new CustomEvent(e,Ze({bubbles:!0,cancelable:!1,composed:!0,detail:{}},t));return this.dispatchEvent(n),n}static define(e,t=this,n={}){const r=customElements.get(e);if(!r){try{customElements.define(e,t,n)}catch(r){customElements.define(e,class extends t{},n)}return}let i=" (unknown version)",o=i;"version"in t&&t.version&&(i=" v"+t.version),"version"in r&&r.version&&(o=" v"+r.version)}attributeChangedCallback(e,t,n){var r,i;tt(r=this,i=ut,"read from private field"),i.get(r)||(this.constructor.elementProperties.forEach((e,t)=>{e.reflect&&null!=this[t]&&this.initialReflectedProperties.set(t,this[t])}),((e,t,n)=>{tt(e,t,"write to private field"),t.set(e,n)})(this,ut,!0)),super.attributeChangedCallback(e,t,n)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,n)=>{e.has(n)&&null==this[n]&&(this[n]=t)})}};ut=new WeakMap,dt.version="2.20.1",dt.dependencies={},et([ot()],dt.prototype,"dir",2),et([ot()],dt.prototype,"lang",2);var ht=class extends dt{render(){return we` <slot></slot> `}};ht.styles=[Be,Re];const pt=new Set(["children","localName","ref","style","className"]),ft=new WeakMap,mt=(e,t,n,r,i)=>{const o=i?.[t];void 0===o?(e[t]=n,null==n&&t in HTMLElement.prototype&&e.removeAttribute(t)):n!==r&&((e,t,n)=>{let r=ft.get(e);void 0===r&&ft.set(e,r=new Map);let i=r.get(t);void 0!==n?void 0===i?(r.set(t,i={handleEvent:n}),e.addEventListener(t,i)):i.handleEvent=n:void 0!==i&&(r.delete(t),e.removeEventListener(t,i))})(e,o,n)},gt=({react:e,tagName:t,elementClass:n,events:r,displayName:i})=>{const o=new Set(Object.keys(r??{})),a=e.forwardRef((i,a)=>{const s=e.useRef(new Map),l=e.useRef(null),c={},u={};for(const[e,t]of Object.entries(i))pt.has(e)?c["className"===e?"class":e]=t:o.has(e)||e in n.prototype?u[e]=t:c[e]=t;return e.useLayoutEffect(()=>{if(null===l.current)return;const e=new Map;for(const t in u)mt(l.current,t,i[t],s.current.get(t),r),s.current.delete(t),e.set(t,i[t]);for(const[e,t]of s.current)mt(l.current,e,void 0,t,r);s.current=e}),e.useLayoutEffect(()=>{l.current?.removeAttribute("defer-hydration")},[]),c.suppressHydrationWarning=!0,e.createElement(t,{...c,ref:e.useCallback(e=>{l.current=e,"function"==typeof a?a(e):null!==a&&(a.current=e)},[a])})});return a.displayName=i??n.name,a};ht.define("sl-visually-hidden"),gt({tagName:"sl-visually-hidden",elementClass:ht,react:d,events:{},displayName:"SlVisuallyHidden"});var bt=F`
  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible) {
    color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`,yt=F`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`,vt="";function wt(e){vt=e}var kt={name:"default",resolver:e=>function(e=""){if(!vt){const e=[...document.getElementsByTagName("script")],t=e.find(e=>e.hasAttribute("data-shoelace"));if(t)wt(t.getAttribute("data-shoelace"));else{const t=e.find(e=>/shoelace(\.min)?\.js($|\?)/.test(e.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(e.src));let n="";t&&(n=t.getAttribute("src")),wt(n.split("/").slice(0,-1).join("/"))}}return vt.replace(/\/$/,"")+(e?`/${e.replace(/^\//,"")}`:"")}(`assets/icons/${e}.svg`)},xt={caret:'\n    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n      <polyline points="6 9 12 15 18 9"></polyline>\n    </svg>\n  ',check:'\n    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor">\n          <g transform="translate(3.428571, 3.428571)">\n            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>\n            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"chevron-down":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"chevron-left":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n    </svg>\n  ',"chevron-right":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',copy:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>\n    </svg>\n  ',eye:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n    </svg>\n  ',"eye-slash":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n    </svg>\n  ',eyedropper:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">\n      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>\n    </svg>\n  ',"grip-vertical":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">\n      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>\n    </svg>\n  ',indeterminate:'\n    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor" stroke-width="2">\n          <g transform="translate(2.285714, 6.857143)">\n            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"person-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n    </svg>\n  ',"play-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">\n      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>\n    </svg>\n  ',"pause-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">\n      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>\n    </svg>\n  ',radio:'\n    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g fill="currentColor">\n          <circle cx="8" cy="8" r="3.42857143"></circle>\n        </g>\n      </g>\n    </svg>\n  ',"star-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>\n  ',"x-lg":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">\n      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n    </svg>\n  ',"x-circle-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">\n      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>\n    </svg>\n  '},_t={name:"system",resolver:e=>e in xt?`data:image/svg+xml,${encodeURIComponent(xt[e])}`:""},St=[kt,_t],Ct=[];function Et(e){return St.find(t=>t.name===e)}var zt=F`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;function At(e,t){const n=Ze({waitUntilFirstUpdate:!1},t);return(t,r)=>{const{update:i}=t,o=Array.isArray(e)?e:[e];t.update=function(e){o.forEach(t=>{const i=t;if(e.has(i)){const t=e.get(i),o=this[i];t!==o&&(n.waitUntilFirstUpdate&&!this.hasUpdated||this[r](t,o))}}),i.call(this,e)}}}const $t=e=>void 0===e.strings,Tt={};var Pt,Mt=Symbol(),Lt=Symbol(),Dt=new Map,It=class extends dt{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(e,t){var n;let r;if(null==t?void 0:t.spriteSheet)return this.svg=we`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,this.svg;try{if(r=await fetch(e,{mode:"cors"}),!r.ok)return 410===r.status?Mt:Lt}catch(e){return Lt}try{const e=document.createElement("div");e.innerHTML=await r.text();const t=e.firstElementChild;if("svg"!==(null==(n=null==t?void 0:t.tagName)?void 0:n.toLowerCase()))return Mt;Pt||(Pt=new DOMParser);const i=Pt.parseFromString(t.outerHTML,"text/html").body.querySelector("svg");return i?(i.part.add("svg"),document.adoptNode(i)):Mt}catch(e){return Mt}}connectedCallback(){var e;super.connectedCallback(),e=this,Ct.push(e)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){var e;super.disconnectedCallback(),e=this,Ct=Ct.filter(t=>t!==e)}getIconSource(){const e=Et(this.library);return this.name&&e?{url:e.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var e;const{url:t,fromLibrary:n}=this.getIconSource(),r=n?Et(this.library):void 0;if(!t)return void(this.svg=null);let i=Dt.get(t);if(i||(i=this.resolveIcon(t,r),Dt.set(t,i)),!this.initialRender)return;const o=await i;if(o===Lt&&Dt.delete(t),t===this.getIconSource().url)if((e=>void 0!==e?._$litType$)(o)){if(this.svg=o,r){await this.updateComplete;const e=this.shadowRoot.querySelector("[part='svg']");"function"==typeof r.mutator&&e&&r.mutator(e)}}else switch(o){case Lt:case Mt:this.svg=null,this.emit("sl-error");break;default:this.svg=o.cloneNode(!0),null==(e=null==r?void 0:r.mutator)||e.call(r,this.svg),this.emit("sl-load")}}render(){return this.svg}};It.styles=[Be,zt],et([at()],It.prototype,"svg",2),et([ot({reflect:!0})],It.prototype,"name",2),et([ot()],It.prototype,"src",2),et([ot()],It.prototype,"label",2),et([ot({reflect:!0})],It.prototype,"library",2),et([At("label")],It.prototype,"handleLabelChange",1),et([At(["name","src","library"])],It.prototype,"setIcon",1);const Nt=1,Ot=2,Ft=3,Vt=4,Rt=e=>(...t)=>({_$litDirective$:e,values:t});let Bt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const Ut=Rt(class extends Bt{constructor(e){if(super(e),e.type!==Nt||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e)));for(const e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}const n=e.element.classList;for(const e of this.st)e in t||(n.remove(e),this.st.delete(e));for(const e in t){const r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return ke}}),Ht=Symbol.for(""),jt=e=>{if(e?.r===Ht)return e?._$litStatic$},qt=(e,...t)=>({_$litStatic$:t.reduce((t,n,r)=>t+(e=>{if(void 0!==e._$litStatic$)return e._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${e}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+e[r+1],e[0]),r:Ht}),Wt=new Map,Kt=(e=>(t,...n)=>{const r=n.length;let i,o;const a=[],s=[];let l,c=0,u=!1;for(;c<r;){for(l=t[c];c<r&&void 0!==(o=n[c],i=jt(o));)l+=i+t[++c],u=!0;c!==r&&s.push(o),a.push(l),c++}if(c===r&&a.push(t[r]),u){const e=a.join("$$lit$$");void 0===(t=Wt.get(e))&&(a.raw=a,Wt.set(e,t=a)),n=s}return e(t,...n)})(we),Gt=e=>e??xe;var Qt=class extends dt{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}render(){const e=!!this.href,t=e?qt`a`:qt`button`;return Kt`
      <${t}
        part="base"
        class=${Ut({"icon-button":!0,"icon-button--disabled":!e&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${Gt(e?void 0:this.disabled)}
        type=${Gt(e?void 0:"button")}
        href=${Gt(e?this.href:void 0)}
        target=${Gt(e?this.target:void 0)}
        download=${Gt(e?this.download:void 0)}
        rel=${Gt(e&&this.target?"noreferrer noopener":void 0)}
        role=${Gt(e?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${Gt(this.name)}
          library=${Gt(this.library)}
          src=${Gt(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${t}>
    `}};Qt.styles=[Be,yt],Qt.dependencies={"sl-icon":It},et([ct(".icon-button")],Qt.prototype,"button",2),et([at()],Qt.prototype,"hasFocus",2),et([ot()],Qt.prototype,"name",2),et([ot()],Qt.prototype,"library",2),et([ot()],Qt.prototype,"src",2),et([ot()],Qt.prototype,"href",2),et([ot()],Qt.prototype,"target",2),et([ot()],Qt.prototype,"download",2),et([ot()],Qt.prototype,"label",2),et([ot({type:Boolean,reflect:!0})],Qt.prototype,"disabled",2);const Yt=new Set,Xt=new Map;let Zt,Jt="ltr",en="en";const tn="undefined"!=typeof MutationObserver&&"undefined"!=typeof document&&void 0!==document.documentElement;if(tn){const e=new MutationObserver(rn);Jt=document.documentElement.dir||"ltr",en=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function nn(...e){e.map(e=>{const t=e.$code.toLowerCase();Xt.has(t)?Xt.set(t,Object.assign(Object.assign({},Xt.get(t)),e)):Xt.set(t,e),Zt||(Zt=e)}),rn()}function rn(){tn&&(Jt=document.documentElement.dir||"ltr",en=document.documentElement.lang||navigator.language),[...Yt.keys()].map(e=>{"function"==typeof e.requestUpdate&&e.requestUpdate()})}let on=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Yt.add(this.host)}hostDisconnected(){Yt.delete(this.host)}dir(){return`${this.host.dir||Jt}`.toLowerCase()}lang(){return`${this.host.lang||en}`.toLowerCase()}getTranslationData(e){var t,n;const r=new Intl.Locale(e.replace(/_/g,"-")),i=null==r?void 0:r.language.toLowerCase(),o=null!==(n=null===(t=null==r?void 0:r.region)||void 0===t?void 0:t.toLowerCase())&&void 0!==n?n:"";return{locale:r,language:i,region:o,primary:Xt.get(`${i}-${o}`),secondary:Xt.get(i)}}exists(e,t){var n;const{primary:r,secondary:i}=this.getTranslationData(null!==(n=t.lang)&&void 0!==n?n:this.lang());return t=Object.assign({includeFallback:!1},t),!!(r&&r[e]||i&&i[e]||t.includeFallback&&Zt&&Zt[e])}term(e,...t){const{primary:n,secondary:r}=this.getTranslationData(this.lang());let i;if(n&&n[e])i=n[e];else if(r&&r[e])i=r[e];else{if(!Zt||!Zt[e])return String(e);i=Zt[e]}return"function"==typeof i?i(...t):i}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,n){return new Intl.RelativeTimeFormat(this.lang(),n).format(e,t)}};var an={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>0===e?"No options selected":1===e?"1 option selected":`${e} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format"};nn(an);var sn=an,ln=class extends on{};nn(sn);var cn=0,un=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.attrId=++cn,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=!1,this.closable=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}handleCloseClick(e){e.stopPropagation(),this.emit("sl-close")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id.length>0?this.id:this.componentId,we`
      <div
        part="base"
        class=${Ut({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
      >
        <slot></slot>
        ${this.closable?we`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};un.styles=[Be,bt],un.dependencies={"sl-icon-button":Qt},et([ct(".tab")],un.prototype,"tab",2),et([ot({reflect:!0})],un.prototype,"panel",2),et([ot({type:Boolean,reflect:!0})],un.prototype,"active",2),et([ot({type:Boolean,reflect:!0})],un.prototype,"closable",2),et([ot({type:Boolean,reflect:!0})],un.prototype,"disabled",2),et([ot({type:Number,reflect:!0})],un.prototype,"tabIndex",2),et([At("active")],un.prototype,"handleActiveChange",1),et([At("disabled")],un.prototype,"handleDisabledChange",1);un.define("sl-tab");var dn=gt({tagName:"sl-tab",elementClass:un,react:d,events:{onSlClose:"sl-close"},displayName:"SlTab"}),hn=F`
  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group--has-scroll-controls .tab-group__scroll-button--start--hidden,
  .tab-group--has-scroll-controls .tab-group__scroll-button--end--hidden {
    visibility: hidden;
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`,pn=F`
  :host {
    display: contents;
  }
`,fn=class extends dt{constructor(){super(...arguments),this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>{this.emit("sl-resize",{detail:{entries:e}})}),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){const e=this.shadowRoot.querySelector("slot");if(null!==e){const t=e.assignedElements({flatten:!0});this.observedElements.forEach(e=>this.resizeObserver.unobserve(e)),this.observedElements=[],t.forEach(e=>{this.resizeObserver.observe(e),this.observedElements.push(e)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return we` <slot @slotchange=${this.handleSlotChange}></slot> `}};fn.styles=[Be,pn],et([ot({type:Boolean,reflect:!0})],fn.prototype,"disabled",2),et([At("disabled",{waitUntilFirstUpdate:!0})],fn.prototype,"handleDisabledChange",1);var mn=new Set;function gn(e){if(mn.add(e),!document.documentElement.classList.contains("sl-scroll-lock")){const e=function(){const e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}()+function(){const e=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(e)||!e?0:e}();let t=getComputedStyle(document.documentElement).scrollbarGutter;t&&"auto"!==t||(t="stable"),e<2&&(t=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",t),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${e}px`)}}function bn(e){mn.delete(e),0===mn.size&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}function yn(e,t,n="vertical",r="smooth"){const i=function(e,t){return{top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)}}(e,t),o=i.top+t.scrollTop,a=i.left+t.scrollLeft,s=t.scrollLeft,l=t.scrollLeft+t.offsetWidth,c=t.scrollTop,u=t.scrollTop+t.offsetHeight;"horizontal"!==n&&"both"!==n||(a<s?t.scrollTo({left:a,behavior:r}):a+e.clientWidth>l&&t.scrollTo({left:a-t.offsetWidth+e.clientWidth,behavior:r})),"vertical"!==n&&"both"!==n||(o<c?t.scrollTo({top:o,behavior:r}):o+e.clientHeight>u&&t.scrollTo({top:o-t.offsetHeight+e.clientHeight,behavior:r}))}var vn=class extends dt{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new ln(this),this.hasScrollControls=!1,this.shouldHideScrollStartButton=!1,this.shouldHideScrollEndButton=!1,this.placement="top",this.activation="auto",this.noScrollControls=!1,this.fixedScrollControls=!1,this.scrollOffset=1}connectedCallback(){const e=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls()}),this.mutationObserver=new MutationObserver(e=>{const t=e.filter(({target:e})=>{if(e===this)return!0;if(e.closest("sl-tab-group")!==this)return!1;const t=e.tagName.toLowerCase();return"sl-tab"===t||"sl-tab-panel"===t});if(0!==t.length)if(t.some(e=>!["aria-labelledby","aria-controls"].includes(e.attributeName))&&setTimeout(()=>this.setAriaLabels()),t.some(e=>"disabled"===e.attributeName))this.syncTabsAndPanels();else if(t.some(e=>"active"===e.attributeName)){const e=t.filter(e=>"active"===e.attributeName&&"sl-tab"===e.target.tagName.toLowerCase()).map(e=>e.target),n=e.find(e=>e.active);n&&this.setActiveTab(n)}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,attributeFilter:["active","disabled","name","panel"],childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),e.then(()=>{new IntersectionObserver((e,t)=>{var n;e[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab(null!=(n=this.getActiveTab())?n:this.tabs[0],{emitEvents:!1}),t.unobserve(e[0].target))}).observe(this.tabGroup)})})}disconnectedCallback(){var e,t;super.disconnectedCallback(),null==(e=this.mutationObserver)||e.disconnect(),this.nav&&(null==(t=this.resizeObserver)||t.unobserve(this.nav))}getAllTabs(){return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()}getAllPanels(){return[...this.body.assignedElements()].filter(e=>"sl-tab-panel"===e.tagName.toLowerCase())}getActiveTab(){return this.tabs.find(e=>e.active)}handleClick(e){const t=e.target.closest("sl-tab");(null==t?void 0:t.closest("sl-tab-group"))===this&&null!==t&&this.setActiveTab(t,{scrollBehavior:"smooth"})}handleKeyDown(e){const t=e.target.closest("sl-tab");if((null==t?void 0:t.closest("sl-tab-group"))===this&&(["Enter"," "].includes(e.key)&&null!==t&&(this.setActiveTab(t,{scrollBehavior:"smooth"}),e.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key))){const t=this.tabs.find(e=>e.matches(":focus")),n="rtl"===this.localize.dir();let r=null;if("sl-tab"===(null==t?void 0:t.tagName.toLowerCase())){if("Home"===e.key)r=this.focusableTabs[0];else if("End"===e.key)r=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&e.key===(n?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&"ArrowUp"===e.key){const e=this.tabs.findIndex(e=>e===t);r=this.findNextFocusableTab(e,"backward")}else if(["top","bottom"].includes(this.placement)&&e.key===(n?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&"ArrowDown"===e.key){const e=this.tabs.findIndex(e=>e===t);r=this.findNextFocusableTab(e,"forward")}if(!r)return;r.tabIndex=0,r.focus({preventScroll:!0}),"auto"===this.activation?this.setActiveTab(r,{scrollBehavior:"smooth"}):this.tabs.forEach(e=>{e.tabIndex=e===r?0:-1}),["top","bottom"].includes(this.placement)&&yn(r,this.nav,"horizontal"),e.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:"rtl"===this.localize.dir()?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:"rtl"===this.localize.dir()?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(e,t){if(t=Ze({emitEvents:!0,scrollBehavior:"auto"},t),e!==this.activeTab&&!e.disabled){const n=this.activeTab;this.activeTab=e,this.tabs.forEach(e=>{e.active=e===this.activeTab,e.tabIndex=e===this.activeTab?0:-1}),this.panels.forEach(e=>{var t;return e.active=e.name===(null==(t=this.activeTab)?void 0:t.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&yn(this.activeTab,this.nav,"horizontal",t.scrollBehavior),t.emitEvents&&(n&&this.emit("sl-tab-hide",{detail:{name:n.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach(e=>{const t=this.panels.find(t=>t.name===e.panel);t&&(e.setAttribute("aria-controls",t.getAttribute("id")),t.setAttribute("aria-labelledby",e.getAttribute("id")))})}repositionIndicator(){const e=this.getActiveTab();if(!e)return;const t=e.clientWidth,n=e.clientHeight,r="rtl"===this.localize.dir(),i=this.getAllTabs(),o=i.slice(0,i.indexOf(e)).reduce((e,t)=>({left:e.left+t.clientWidth,top:e.top+t.clientHeight}),{left:0,top:0});switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${t}px`,this.indicator.style.height="auto",this.indicator.style.translate=r?-1*o.left+"px":`${o.left}px`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${n}px`,this.indicator.style.translate=`0 ${o.top}px`}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(e=>!e.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls())}findNextFocusableTab(e,t){let n=null;const r="forward"===t?1:-1;let i=e+r;for(;e<this.tabs.length;){if(n=this.tabs[i]||null,null===n){n="forward"===t?this.focusableTabs[0]:this.focusableTabs[this.focusableTabs.length-1];break}if(!n.disabled)break;i+=r}return n}updateScrollButtons(){this.hasScrollControls&&!this.fixedScrollControls&&(this.shouldHideScrollStartButton=this.scrollFromStart()<=this.scrollOffset,this.shouldHideScrollEndButton=this.isScrolledToEnd())}isScrolledToEnd(){return this.scrollFromStart()+this.nav.clientWidth>=this.nav.scrollWidth-this.scrollOffset}scrollFromStart(){return"rtl"===this.localize.dir()?-this.nav.scrollLeft:this.nav.scrollLeft}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1,this.updateScrollButtons()}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}show(e){const t=this.tabs.find(t=>t.panel===e);t&&this.setActiveTab(t,{scrollBehavior:"smooth"})}render(){const e="rtl"===this.localize.dir();return we`
      <div
        part="base"
        class=${Ut({"tab-group":!0,"tab-group--top":"top"===this.placement,"tab-group--bottom":"bottom"===this.placement,"tab-group--start":"start"===this.placement,"tab-group--end":"end"===this.placement,"tab-group--rtl":"rtl"===this.localize.dir(),"tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?we`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class=${Ut({"tab-group__scroll-button":!0,"tab-group__scroll-button--start":!0,"tab-group__scroll-button--start--hidden":this.shouldHideScrollStartButton})}
                  name=${e?"chevron-right":"chevron-left"}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav" @scrollend=${this.updateScrollButtons}>
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <sl-resize-observer @sl-resize=${this.syncIndicator}>
                <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
              </sl-resize-observer>
            </div>
          </div>

          ${this.hasScrollControls?we`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class=${Ut({"tab-group__scroll-button":!0,"tab-group__scroll-button--end":!0,"tab-group__scroll-button--end--hidden":this.shouldHideScrollEndButton})}
                  name=${e?"chevron-left":"chevron-right"}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};vn.styles=[Be,hn],vn.dependencies={"sl-icon-button":Qt,"sl-resize-observer":fn},et([ct(".tab-group")],vn.prototype,"tabGroup",2),et([ct(".tab-group__body")],vn.prototype,"body",2),et([ct(".tab-group__nav")],vn.prototype,"nav",2),et([ct(".tab-group__indicator")],vn.prototype,"indicator",2),et([at()],vn.prototype,"hasScrollControls",2),et([at()],vn.prototype,"shouldHideScrollStartButton",2),et([at()],vn.prototype,"shouldHideScrollEndButton",2),et([ot()],vn.prototype,"placement",2),et([ot()],vn.prototype,"activation",2),et([ot({attribute:"no-scroll-controls",type:Boolean})],vn.prototype,"noScrollControls",2),et([ot({attribute:"fixed-scroll-controls",type:Boolean})],vn.prototype,"fixedScrollControls",2),et([st({passive:!0})],vn.prototype,"updateScrollButtons",1),et([At("noScrollControls",{waitUntilFirstUpdate:!0})],vn.prototype,"updateScrollControls",1),et([At("placement",{waitUntilFirstUpdate:!0})],vn.prototype,"syncIndicator",1);vn.define("sl-tab-group");var wn=gt({tagName:"sl-tab-group",elementClass:vn,react:d,events:{onSlTabShow:"sl-tab-show",onSlTabHide:"sl-tab-hide"},displayName:"SlTabGroup"}),kn=F`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`,xn=0,_n=class extends dt{constructor(){super(...arguments),this.attrId=++xn,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return we`
      <slot
        part="base"
        class=${Ut({"tab-panel":!0,"tab-panel--active":this.active})}
      ></slot>
    `}};_n.styles=[Be,kn],et([ot({reflect:!0})],_n.prototype,"name",2),et([ot({type:Boolean,reflect:!0})],_n.prototype,"active",2),et([At("active")],_n.prototype,"handleActiveChange",1);_n.define("sl-tab-panel");var Sn=gt({tagName:"sl-tab-panel",elementClass:_n,react:d,events:{},displayName:"SlTabPanel"}),Cn=F`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`,En=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return we`
      <span
        part="base"
        class=${Ut({tag:!0,"tag--primary":"primary"===this.variant,"tag--success":"success"===this.variant,"tag--neutral":"neutral"===this.variant,"tag--warning":"warning"===this.variant,"tag--danger":"danger"===this.variant,"tag--text":"text"===this.variant,"tag--small":"small"===this.size,"tag--medium":"medium"===this.size,"tag--large":"large"===this.size,"tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?we`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `}};En.styles=[Be,Cn],En.dependencies={"sl-icon-button":Qt},et([ot({reflect:!0})],En.prototype,"variant",2),et([ot({reflect:!0})],En.prototype,"size",2),et([ot({type:Boolean,reflect:!0})],En.prototype,"pill",2),et([ot({type:Boolean})],En.prototype,"removable",2);En.define("sl-tag"),gt({tagName:"sl-tag",elementClass:En,react:d,events:{onSlRemove:"sl-remove"},displayName:"SlTag"});var zn=F`
  :host {
    display: block;
  }

  .textarea {
    display: grid;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control,
  .textarea__size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .textarea__size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`,An=(e="value")=>(t,n)=>{const r=t.constructor,i=r.prototype.attributeChangedCallback;r.prototype.attributeChangedCallback=function(t,o,a){var s;const l=r.getPropertyOptions(e);if(t===("string"==typeof l.attribute?l.attribute:e)){const t=l.converter||X,r=("function"==typeof t?t:null!=(s=null==t?void 0:t.fromAttribute)?s:X.fromAttribute)(a,l.type);this[e]!==r&&(this[n]=r)}i.call(this,t,o,a)}},$n=F`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`,Tn=new WeakMap,Pn=new WeakMap,Mn=new WeakMap,Ln=new WeakSet,Dn=new WeakMap,In=class{constructor(e,t){this.handleFormData=e=>{const t=this.options.disabled(this.host),n=this.options.name(this.host),r=this.options.value(this.host),i="sl-button"===this.host.tagName.toLowerCase();this.host.isConnected&&!t&&!i&&"string"==typeof n&&n.length>0&&void 0!==r&&(Array.isArray(r)?r.forEach(t=>{e.formData.append(n,t.toString())}):e.formData.append(n,r.toString()))},this.handleFormSubmit=e=>{var t;const n=this.options.disabled(this.host),r=this.options.reportValidity;this.form&&!this.form.noValidate&&(null==(t=Tn.get(this.form))||t.forEach(e=>{this.setUserInteracted(e,!0)})),!this.form||this.form.noValidate||n||r(this.host)||(e.preventDefault(),e.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),Dn.set(this.host,[])},this.handleInteraction=e=>{const t=Dn.get(this.host);t.includes(e.type)||t.push(e.type),t.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const e=this.form.querySelectorAll("*");for(const t of e)if("function"==typeof t.checkValidity&&!t.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const e=this.form.querySelectorAll("*");for(const t of e)if("function"==typeof t.reportValidity&&!t.reportValidity())return!1}return!0},(this.host=e).addController(this),this.options=Ze({form:e=>{const t=e.form;if(t){const n=e.getRootNode().querySelector(`#${t}`);if(n)return n}return e.closest("form")},name:e=>e.name,value:e=>e.value,defaultValue:e=>e.defaultValue,disabled:e=>{var t;return null!=(t=e.disabled)&&t},reportValidity:e=>"function"!=typeof e.reportValidity||e.reportValidity(),checkValidity:e=>"function"!=typeof e.checkValidity||e.checkValidity(),setValue:(e,t)=>e.value=t,assumeInteractionOn:["sl-input"]},t)}hostConnected(){const e=this.options.form(this.host);e&&this.attachForm(e),Dn.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),Dn.delete(this.host),this.options.assumeInteractionOn.forEach(e=>{this.host.removeEventListener(e,this.handleInteraction)})}hostUpdated(){const e=this.options.form(this.host);e||this.detachForm(),e&&this.form!==e&&(this.detachForm(),this.attachForm(e)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(e){e?(this.form=e,Tn.has(this.form)?Tn.get(this.form).add(this.host):Tn.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Pn.has(this.form)||(Pn.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Mn.has(this.form)||(Mn.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const e=Tn.get(this.form);e&&(e.delete(this.host),e.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Pn.has(this.form)&&(this.form.reportValidity=Pn.get(this.form),Pn.delete(this.form)),Mn.has(this.form)&&(this.form.checkValidity=Mn.get(this.form),Mn.delete(this.form)),this.form=void 0))}setUserInteracted(e,t){t?Ln.add(e):Ln.delete(e),e.requestUpdate()}doAction(e,t){if(this.form){const n=document.createElement("button");n.type=e,n.style.position="absolute",n.style.width="0",n.style.height="0",n.style.clipPath="inset(50%)",n.style.overflow="hidden",n.style.whiteSpace="nowrap",t&&(n.name=t.name,n.value=t.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(e=>{t.hasAttribute(e)&&n.setAttribute(e,t.getAttribute(e))})),this.form.append(n),n.click(),n.remove()}}getForm(){var e;return null!=(e=this.form)?e:null}reset(e){this.doAction("reset",e)}submit(e){this.doAction("submit",e)}setValidity(e){const t=this.host,n=Boolean(Ln.has(t)),r=Boolean(t.required);t.toggleAttribute("data-required",r),t.toggleAttribute("data-optional",!r),t.toggleAttribute("data-invalid",!e),t.toggleAttribute("data-valid",e),t.toggleAttribute("data-user-invalid",!e&&n),t.toggleAttribute("data-user-valid",e&&n)}updateValidity(){const e=this.host;this.setValidity(e.validity.valid)}emitInvalidEvent(e){const t=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});e||t.preventDefault(),this.host.dispatchEvent(t)||null==e||e.preventDefault()}},Nn=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1}),On=Object.freeze(Je(Ze({},Nn),{valid:!1,valueMissing:!0})),Fn=Object.freeze(Je(Ze({},Nn),{valid:!1,customError:!0})),Vn=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=e=>{const t=e.target;(this.slotNames.includes("[default]")&&!t.name||t.name&&this.slotNames.includes(t.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return[...this.host.childNodes].some(e=>{if(e.nodeType===e.TEXT_NODE&&""!==e.textContent.trim())return!0;if(e.nodeType===e.ELEMENT_NODE){const t=e;if("sl-visually-hidden"===t.tagName.toLowerCase())return!1;if(!t.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(e){return null!==this.host.querySelector(`:scope > [slot="${e}"]`)}test(e){return"[default]"===e?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};const Rn=Rt(class extends Bt{constructor(e){if(super(e),e.type!==Ft&&e.type!==Nt&&e.type!==Vt)throw Error("The `live` directive is not allowed on child or event bindings");if(!$t(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===ke||t===xe)return t;const n=e.element,r=e.name;if(e.type===Ft){if(t===n[r])return ke}else if(e.type===Vt){if(!!t===n.hasAttribute(r))return ke}else if(e.type===Nt&&n.getAttribute(r)===t+"")return ke;return((e,t=Tt)=>{e._$AH=t})(e),t}});var Bn=class extends dt{constructor(){super(...arguments),this.formControlController=new In(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Vn(this,"help-text","label"),this.hasFocus=!1,this.title="",this.name="",this.value="",this.size="medium",this.filled=!1,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.form="",this.required=!1,this.spellcheck=!0,this.defaultValue=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input)})}firstUpdated(){this.formControlController.updateValidity()}disconnectedCallback(){var e;super.disconnectedCallback(),this.input&&(null==(e=this.resizeObserver)||e.unobserve(this.input))}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}setTextareaHeight(){"auto"===this.resize?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=""}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleRowsChange(){this.setTextareaHeight()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(e){return e?("number"==typeof e.top&&(this.input.scrollTop=e.top),void("number"==typeof e.left&&(this.input.scrollLeft=e.left))):{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(e,t,n="none"){this.input.setSelectionRange(e,t,n)}setRangeText(e,t,n,r="preserve"){const i=null!=t?t:this.input.selectionStart,o=null!=n?n:this.input.selectionEnd;this.input.setRangeText(e,i,o,r),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight())}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),n=!!this.label||!!e,r=!!this.helpText||!!t;return we`
      <div
        part="form-control"
        class=${Ut({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":n,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${n?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${Ut({textarea:!0,"textarea--small":"small"===this.size,"textarea--medium":"medium"===this.size,"textarea--large":"large"===this.size,"textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":"none"===this.resize,"textarea--resize-vertical":"vertical"===this.resize,"textarea--resize-auto":"auto"===this.resize})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${Gt(this.name)}
              .value=${Rn(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${Gt(this.placeholder)}
              rows=${Gt(this.rows)}
              minlength=${Gt(this.minlength)}
              maxlength=${Gt(this.maxlength)}
              autocapitalize=${Gt(this.autocapitalize)}
              autocorrect=${Gt(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${Gt(this.spellcheck)}
              enterkeyhint=${Gt(this.enterkeyhint)}
              inputmode=${Gt(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
            <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
            <div part="textarea-adjuster" class="textarea__size-adjuster" ?hidden=${"auto"!==this.resize}></div>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Bn.styles=[Be,$n,zn],et([ct(".textarea__control")],Bn.prototype,"input",2),et([ct(".textarea__size-adjuster")],Bn.prototype,"sizeAdjuster",2),et([at()],Bn.prototype,"hasFocus",2),et([ot()],Bn.prototype,"title",2),et([ot()],Bn.prototype,"name",2),et([ot()],Bn.prototype,"value",2),et([ot({reflect:!0})],Bn.prototype,"size",2),et([ot({type:Boolean,reflect:!0})],Bn.prototype,"filled",2),et([ot()],Bn.prototype,"label",2),et([ot({attribute:"help-text"})],Bn.prototype,"helpText",2),et([ot()],Bn.prototype,"placeholder",2),et([ot({type:Number})],Bn.prototype,"rows",2),et([ot()],Bn.prototype,"resize",2),et([ot({type:Boolean,reflect:!0})],Bn.prototype,"disabled",2),et([ot({type:Boolean,reflect:!0})],Bn.prototype,"readonly",2),et([ot({reflect:!0})],Bn.prototype,"form",2),et([ot({type:Boolean,reflect:!0})],Bn.prototype,"required",2),et([ot({type:Number})],Bn.prototype,"minlength",2),et([ot({type:Number})],Bn.prototype,"maxlength",2),et([ot()],Bn.prototype,"autocapitalize",2),et([ot()],Bn.prototype,"autocorrect",2),et([ot()],Bn.prototype,"autocomplete",2),et([ot({type:Boolean})],Bn.prototype,"autofocus",2),et([ot()],Bn.prototype,"enterkeyhint",2),et([ot({type:Boolean,converter:{fromAttribute:e=>!(!e||"false"===e),toAttribute:e=>e?"true":"false"}})],Bn.prototype,"spellcheck",2),et([ot()],Bn.prototype,"inputmode",2),et([An()],Bn.prototype,"defaultValue",2),et([At("disabled",{waitUntilFirstUpdate:!0})],Bn.prototype,"handleDisabledChange",1),et([At("rows",{waitUntilFirstUpdate:!0})],Bn.prototype,"handleRowsChange",1),et([At("value",{waitUntilFirstUpdate:!0})],Bn.prototype,"handleValueChange",1);Bn.define("sl-textarea");var Un=gt({tagName:"sl-textarea",elementClass:Bn,react:d,events:{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlFocus:"sl-focus",onSlInput:"sl-input",onSlInvalid:"sl-invalid"},displayName:"SlTextarea"}),Hn=F`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,jn=F`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const qn=Math.min,Wn=Math.max,Kn=Math.round,Gn=Math.floor,Qn=e=>({x:e,y:e}),Yn={left:"right",right:"left",bottom:"top",top:"bottom"},Xn={start:"end",end:"start"};function Zn(e,t,n){return Wn(e,qn(t,n))}function Jn(e,t){return"function"==typeof e?e(t):e}function er(e){return e.split("-")[0]}function tr(e){return e.split("-")[1]}function nr(e){return"x"===e?"y":"x"}function rr(e){return"y"===e?"height":"width"}const ir=new Set(["top","bottom"]);function or(e){return ir.has(er(e))?"y":"x"}function ar(e){return nr(or(e))}function sr(e){return e.replace(/start|end/g,e=>Xn[e])}const lr=["left","right"],cr=["right","left"],ur=["top","bottom"],dr=["bottom","top"];function hr(e,t,n,r){const i=tr(e);let o=function(e,t,n){switch(e){case"top":case"bottom":return n?t?cr:lr:t?lr:cr;case"left":case"right":return t?ur:dr;default:return[]}}(er(e),"start"===n,r);return i&&(o=o.map(e=>e+"-"+i),t&&(o=o.concat(o.map(sr)))),o}function pr(e){return e.replace(/left|right|bottom|top/g,e=>Yn[e])}function fr(e){return"number"!=typeof e?function(e){return{top:0,right:0,bottom:0,left:0,...e}}(e):{top:e,right:e,bottom:e,left:e}}function mr(e){const{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function gr(e,t,n){let{reference:r,floating:i}=e;const o=or(t),a=ar(t),s=rr(a),l=er(t),c="y"===o,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,h=r[s]/2-i[s]/2;let p;switch(l){case"top":p={x:u,y:r.y-i.height};break;case"bottom":p={x:u,y:r.y+r.height};break;case"right":p={x:r.x+r.width,y:d};break;case"left":p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}switch(tr(t)){case"start":p[a]-=h*(n&&c?-1:1);break;case"end":p[a]+=h*(n&&c?-1:1)}return p}async function br(e,t){var n;void 0===t&&(t={});const{x:r,y:i,platform:o,rects:a,elements:s,strategy:l}=e,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:h=!1,padding:p=0}=Jn(t,e),f=fr(p),m=s[h?"floating"===d?"reference":"floating":d],g=mr(await o.getClippingRect({element:null==(n=await(null==o.isElement?void 0:o.isElement(m)))||n?m:m.contextElement||await(null==o.getDocumentElement?void 0:o.getDocumentElement(s.floating)),boundary:c,rootBoundary:u,strategy:l})),b="floating"===d?{x:r,y:i,width:a.floating.width,height:a.floating.height}:a.reference,y=await(null==o.getOffsetParent?void 0:o.getOffsetParent(s.floating)),v=await(null==o.isElement?void 0:o.isElement(y))&&await(null==o.getScale?void 0:o.getScale(y))||{x:1,y:1},w=mr(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({elements:s,rect:b,offsetParent:y,strategy:l}):b);return{top:(g.top-w.top+f.top)/v.y,bottom:(w.bottom-g.bottom+f.bottom)/v.y,left:(g.left-w.left+f.left)/v.x,right:(w.right-g.right+f.right)/v.x}}const yr=new Set(["left","top"]);function vr(){return"undefined"!=typeof window}function wr(e){return _r(e)?(e.nodeName||"").toLowerCase():"#document"}function kr(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function xr(e){var t;return null==(t=(_r(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function _r(e){return!!vr()&&(e instanceof Node||e instanceof kr(e).Node)}function Sr(e){return!!vr()&&(e instanceof Element||e instanceof kr(e).Element)}function Cr(e){return!!vr()&&(e instanceof HTMLElement||e instanceof kr(e).HTMLElement)}function Er(e){return!(!vr()||"undefined"==typeof ShadowRoot)&&(e instanceof ShadowRoot||e instanceof kr(e).ShadowRoot)}const zr=new Set(["inline","contents"]);function Ar(e){const{overflow:t,overflowX:n,overflowY:r,display:i}=Rr(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&!zr.has(i)}const $r=new Set(["table","td","th"]);function Tr(e){return $r.has(wr(e))}const Pr=[":popover-open",":modal"];function Mr(e){return Pr.some(t=>{try{return e.matches(t)}catch(e){return!1}})}const Lr=["transform","translate","scale","rotate","perspective"],Dr=["transform","translate","scale","rotate","perspective","filter"],Ir=["paint","layout","strict","content"];function Nr(e){const t=Or(),n=Sr(e)?Rr(e):e;return Lr.some(e=>!!n[e]&&"none"!==n[e])||!!n.containerType&&"normal"!==n.containerType||!t&&!!n.backdropFilter&&"none"!==n.backdropFilter||!t&&!!n.filter&&"none"!==n.filter||Dr.some(e=>(n.willChange||"").includes(e))||Ir.some(e=>(n.contain||"").includes(e))}function Or(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}const Fr=new Set(["html","body","#document"]);function Vr(e){return Fr.has(wr(e))}function Rr(e){return kr(e).getComputedStyle(e)}function Br(e){return Sr(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Ur(e){if("html"===wr(e))return e;const t=e.assignedSlot||e.parentNode||Er(e)&&e.host||xr(e);return Er(t)?t.host:t}function Hr(e){const t=Ur(e);return Vr(t)?e.ownerDocument?e.ownerDocument.body:e.body:Cr(t)&&Ar(t)?t:Hr(t)}function jr(e,t,n){var r;void 0===t&&(t=[]),void 0===n&&(n=!0);const i=Hr(e),o=i===(null==(r=e.ownerDocument)?void 0:r.body),a=kr(i);if(o){const e=qr(a);return t.concat(a,a.visualViewport||[],Ar(i)?i:[],e&&n?jr(e):[])}return t.concat(i,jr(i,[],n))}function qr(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Wr(e){const t=Rr(e);let n=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const i=Cr(e),o=i?e.offsetWidth:n,a=i?e.offsetHeight:r,s=Kn(n)!==o||Kn(r)!==a;return s&&(n=o,r=a),{width:n,height:r,$:s}}function Kr(e){return Sr(e)?e:e.contextElement}function Gr(e){const t=Kr(e);if(!Cr(t))return Qn(1);const n=t.getBoundingClientRect(),{width:r,height:i,$:o}=Wr(t);let a=(o?Kn(n.width):n.width)/r,s=(o?Kn(n.height):n.height)/i;return a&&Number.isFinite(a)||(a=1),s&&Number.isFinite(s)||(s=1),{x:a,y:s}}const Qr=Qn(0);function Yr(e){const t=kr(e);return Or()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:Qr}function Xr(e,t,n,r){void 0===t&&(t=!1),void 0===n&&(n=!1);const i=e.getBoundingClientRect(),o=Kr(e);let a=Qn(1);t&&(r?Sr(r)&&(a=Gr(r)):a=Gr(e));const s=function(e,t,n){return void 0===t&&(t=!1),!(!n||t&&n!==kr(e))&&t}(o,n,r)?Yr(o):Qn(0);let l=(i.left+s.x)/a.x,c=(i.top+s.y)/a.y,u=i.width/a.x,d=i.height/a.y;if(o){const e=kr(o),t=r&&Sr(r)?kr(r):r;let n=e,i=qr(n);for(;i&&r&&t!==n;){const e=Gr(i),t=i.getBoundingClientRect(),r=Rr(i),o=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,a=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;l*=e.x,c*=e.y,u*=e.x,d*=e.y,l+=o,c+=a,n=kr(i),i=qr(n)}}return mr({width:u,height:d,x:l,y:c})}function Zr(e,t){const n=Br(e).scrollLeft;return t?t.left+n:Xr(xr(e)).left+n}function Jr(e,t,n){void 0===n&&(n=!1);const r=e.getBoundingClientRect();return{x:r.left+t.scrollLeft-(n?0:Zr(e,r)),y:r.top+t.scrollTop}}const ei=new Set(["absolute","fixed"]);function ti(e,t,n){let r;if("viewport"===t)r=function(e,t){const n=kr(e),r=xr(e),i=n.visualViewport;let o=r.clientWidth,a=r.clientHeight,s=0,l=0;if(i){o=i.width,a=i.height;const e=Or();(!e||e&&"fixed"===t)&&(s=i.offsetLeft,l=i.offsetTop)}return{width:o,height:a,x:s,y:l}}(e,n);else if("document"===t)r=function(e){const t=xr(e),n=Br(e),r=e.ownerDocument.body,i=Wn(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),o=Wn(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let a=-n.scrollLeft+Zr(e);const s=-n.scrollTop;return"rtl"===Rr(r).direction&&(a+=Wn(t.clientWidth,r.clientWidth)-i),{width:i,height:o,x:a,y:s}}(xr(e));else if(Sr(t))r=function(e,t){const n=Xr(e,!0,"fixed"===t),r=n.top+e.clientTop,i=n.left+e.clientLeft,o=Cr(e)?Gr(e):Qn(1);return{width:e.clientWidth*o.x,height:e.clientHeight*o.y,x:i*o.x,y:r*o.y}}(t,n);else{const n=Yr(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return mr(r)}function ni(e,t){const n=Ur(e);return!(n===t||!Sr(n)||Vr(n))&&("fixed"===Rr(n).position||ni(n,t))}function ri(e,t,n){const r=Cr(t),i=xr(t),o="fixed"===n,a=Xr(e,!0,o,t);let s={scrollLeft:0,scrollTop:0};const l=Qn(0);function c(){l.x=Zr(i)}if(r||!r&&!o)if(("body"!==wr(t)||Ar(i))&&(s=Br(t)),r){const e=Xr(t,!0,o,t);l.x=e.x+t.clientLeft,l.y=e.y+t.clientTop}else i&&c();o&&!r&&i&&c();const u=!i||r||o?Qn(0):Jr(i,s);return{x:a.left+s.scrollLeft-l.x-u.x,y:a.top+s.scrollTop-l.y-u.y,width:a.width,height:a.height}}function ii(e){return"static"===Rr(e).position}function oi(e,t){if(!Cr(e)||"fixed"===Rr(e).position)return null;if(t)return t(e);let n=e.offsetParent;return xr(e)===n&&(n=n.ownerDocument.body),n}function ai(e,t){const n=kr(e);if(Mr(e))return n;if(!Cr(e)){let t=Ur(e);for(;t&&!Vr(t);){if(Sr(t)&&!ii(t))return t;t=Ur(t)}return n}let r=oi(e,t);for(;r&&Tr(r)&&ii(r);)r=oi(r,t);return r&&Vr(r)&&ii(r)&&!Nr(r)?n:r||function(e){let t=Ur(e);for(;Cr(t)&&!Vr(t);){if(Nr(t))return t;if(Mr(t))return null;t=Ur(t)}return null}(e)||n}const si={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e;const o="fixed"===i,a=xr(r),s=!!t&&Mr(t.floating);if(r===a||s&&o)return n;let l={scrollLeft:0,scrollTop:0},c=Qn(1);const u=Qn(0),d=Cr(r);if((d||!d&&!o)&&(("body"!==wr(r)||Ar(a))&&(l=Br(r)),Cr(r))){const e=Xr(r);c=Gr(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}const h=!a||d||o?Qn(0):Jr(a,l,!0);return{width:n.width*c.x,height:n.height*c.y,x:n.x*c.x-l.scrollLeft*c.x+u.x+h.x,y:n.y*c.y-l.scrollTop*c.y+u.y+h.y}},getDocumentElement:xr,getClippingRect:function(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e;const o="clippingAncestors"===n?Mr(t)?[]:function(e,t){const n=t.get(e);if(n)return n;let r=jr(e,[],!1).filter(e=>Sr(e)&&"body"!==wr(e)),i=null;const o="fixed"===Rr(e).position;let a=o?Ur(e):e;for(;Sr(a)&&!Vr(a);){const t=Rr(a),n=Nr(a);n||"fixed"!==t.position||(i=null),(o?!n&&!i:!n&&"static"===t.position&&i&&ei.has(i.position)||Ar(a)&&!n&&ni(e,a))?r=r.filter(e=>e!==a):i=t,a=Ur(a)}return t.set(e,r),r}(t,this._c):[].concat(n),a=[...o,r],s=a[0],l=a.reduce((e,n)=>{const r=ti(t,n,i);return e.top=Wn(r.top,e.top),e.right=qn(r.right,e.right),e.bottom=qn(r.bottom,e.bottom),e.left=Wn(r.left,e.left),e},ti(t,s,i));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}},getOffsetParent:ai,getElementRects:async function(e){const t=this.getOffsetParent||ai,n=this.getDimensions,r=await n(e.floating);return{reference:ri(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){const{width:t,height:n}=Wr(e);return{width:t,height:n}},getScale:Gr,isElement:Sr,isRTL:function(e){return"rtl"===Rr(e).direction}};function li(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function ci(e,t,n,r){void 0===r&&(r={});const{ancestorScroll:i=!0,ancestorResize:o=!0,elementResize:a="function"==typeof ResizeObserver,layoutShift:s="function"==typeof IntersectionObserver,animationFrame:l=!1}=r,c=Kr(e),u=i||o?[...c?jr(c):[],...jr(t)]:[];u.forEach(e=>{i&&e.addEventListener("scroll",n,{passive:!0}),o&&e.addEventListener("resize",n)});const d=c&&s?function(e,t){let n,r=null;const i=xr(e);function o(){var e;clearTimeout(n),null==(e=r)||e.disconnect(),r=null}return function a(s,l){void 0===s&&(s=!1),void 0===l&&(l=1),o();const c=e.getBoundingClientRect(),{left:u,top:d,width:h,height:p}=c;if(s||t(),!h||!p)return;const f={rootMargin:-Gn(d)+"px "+-Gn(i.clientWidth-(u+h))+"px "+-Gn(i.clientHeight-(d+p))+"px "+-Gn(u)+"px",threshold:Wn(0,qn(1,l))||1};let m=!0;function g(t){const r=t[0].intersectionRatio;if(r!==l){if(!m)return a();r?a(!1,r):n=setTimeout(()=>{a(!1,1e-7)},1e3)}1!==r||li(c,e.getBoundingClientRect())||a(),m=!1}try{r=new IntersectionObserver(g,{...f,root:i.ownerDocument})}catch(e){r=new IntersectionObserver(g,f)}r.observe(e)}(!0),o}(c,n):null;let h,p=-1,f=null;a&&(f=new ResizeObserver(e=>{let[r]=e;r&&r.target===c&&f&&(f.unobserve(t),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{var e;null==(e=f)||e.observe(t)})),n()}),c&&!l&&f.observe(c),f.observe(t));let m=l?Xr(e):null;return l&&function t(){const r=Xr(e);m&&!li(m,r)&&n();m=r,h=requestAnimationFrame(t)}(),n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener("scroll",n),o&&e.removeEventListener("resize",n)}),null==d||d(),null==(e=f)||e.disconnect(),f=null,l&&cancelAnimationFrame(h)}}const ui=function(e){return void 0===e&&(e=0),{name:"offset",options:e,async fn(t){var n,r;const{x:i,y:o,placement:a,middlewareData:s}=t,l=await async function(e,t){const{placement:n,platform:r,elements:i}=e,o=await(null==r.isRTL?void 0:r.isRTL(i.floating)),a=er(n),s=tr(n),l="y"===or(n),c=yr.has(a)?-1:1,u=o&&l?-1:1,d=Jn(t,e);let{mainAxis:h,crossAxis:p,alignmentAxis:f}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&"number"==typeof f&&(p="end"===s?-1*f:f),l?{x:p*u,y:h*c}:{x:h*c,y:p*u}}(t,e);return a===(null==(n=s.offset)?void 0:n.placement)&&null!=(r=s.arrow)&&r.alignmentOffset?{}:{x:i+l.x,y:o+l.y,data:{...l,placement:a}}}}},di=function(e){return void 0===e&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:r,placement:i}=t,{mainAxis:o=!0,crossAxis:a=!1,limiter:s={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=Jn(e,t),c={x:n,y:r},u=await br(t,l),d=or(er(i)),h=nr(d);let p=c[h],f=c[d];if(o){const e="y"===h?"bottom":"right";p=Zn(p+u["y"===h?"top":"left"],p,p-u[e])}if(a){const e="y"===d?"bottom":"right";f=Zn(f+u["y"===d?"top":"left"],f,f-u[e])}const m=s.fn({...t,[h]:p,[d]:f});return{...m,data:{x:m.x-n,y:m.y-r,enabled:{[h]:o,[d]:a}}}}}},hi=function(e){return void 0===e&&(e={}),{name:"flip",options:e,async fn(t){var n,r;const{placement:i,middlewareData:o,rects:a,initialPlacement:s,platform:l,elements:c}=t,{mainAxis:u=!0,crossAxis:d=!0,fallbackPlacements:h,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:f="none",flipAlignment:m=!0,...g}=Jn(e,t);if(null!=(n=o.arrow)&&n.alignmentOffset)return{};const b=er(i),y=or(s),v=er(s)===s,w=await(null==l.isRTL?void 0:l.isRTL(c.floating)),k=h||(v||!m?[pr(s)]:function(e){const t=pr(e);return[sr(e),t,sr(t)]}(s)),x="none"!==f;!h&&x&&k.push(...hr(s,m,f,w));const _=[s,...k],S=await br(t,g),C=[];let E=(null==(r=o.flip)?void 0:r.overflows)||[];if(u&&C.push(S[b]),d){const e=function(e,t,n){void 0===n&&(n=!1);const r=tr(e),i=ar(e),o=rr(i);let a="x"===i?r===(n?"end":"start")?"right":"left":"start"===r?"bottom":"top";return t.reference[o]>t.floating[o]&&(a=pr(a)),[a,pr(a)]}(i,a,w);C.push(S[e[0]],S[e[1]])}if(E=[...E,{placement:i,overflows:C}],!C.every(e=>e<=0)){var z,A;const e=((null==(z=o.flip)?void 0:z.index)||0)+1,t=_[e];if(t){if(!("alignment"===d&&y!==or(t))||E.every(e=>or(e.placement)!==y||e.overflows[0]>0))return{data:{index:e,overflows:E},reset:{placement:t}}}let n=null==(A=E.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:A.placement;if(!n)switch(p){case"bestFit":{var $;const e=null==($=E.filter(e=>{if(x){const t=or(e.placement);return t===y||"y"===t}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:$[0];e&&(n=e);break}case"initialPlacement":n=s}if(i!==n)return{reset:{placement:n}}}return{}}}},pi=function(e){return void 0===e&&(e={}),{name:"size",options:e,async fn(t){var n,r;const{placement:i,rects:o,platform:a,elements:s}=t,{apply:l=()=>{},...c}=Jn(e,t),u=await br(t,c),d=er(i),h=tr(i),p="y"===or(i),{width:f,height:m}=o.floating;let g,b;"top"===d||"bottom"===d?(g=d,b=h===(await(null==a.isRTL?void 0:a.isRTL(s.floating))?"start":"end")?"left":"right"):(b=d,g="end"===h?"top":"bottom");const y=m-u.top-u.bottom,v=f-u.left-u.right,w=qn(m-u[g],y),k=qn(f-u[b],v),x=!t.middlewareData.shift;let _=w,S=k;if(null!=(n=t.middlewareData.shift)&&n.enabled.x&&(S=v),null!=(r=t.middlewareData.shift)&&r.enabled.y&&(_=y),x&&!h){const e=Wn(u.left,0),t=Wn(u.right,0),n=Wn(u.top,0),r=Wn(u.bottom,0);p?S=f-2*(0!==e||0!==t?e+t:Wn(u.left,u.right)):_=m-2*(0!==n||0!==r?n+r:Wn(u.top,u.bottom))}await l({...t,availableWidth:S,availableHeight:_});const C=await a.getDimensions(s.floating);return f!==C.width||m!==C.height?{reset:{rects:!0}}:{}}}},fi=e=>({name:"arrow",options:e,async fn(t){const{x:n,y:r,placement:i,rects:o,platform:a,elements:s,middlewareData:l}=t,{element:c,padding:u=0}=Jn(e,t)||{};if(null==c)return{};const d=fr(u),h={x:n,y:r},p=ar(i),f=rr(p),m=await a.getDimensions(c),g="y"===p,b=g?"top":"left",y=g?"bottom":"right",v=g?"clientHeight":"clientWidth",w=o.reference[f]+o.reference[p]-h[p]-o.floating[f],k=h[p]-o.reference[p],x=await(null==a.getOffsetParent?void 0:a.getOffsetParent(c));let _=x?x[v]:0;_&&await(null==a.isElement?void 0:a.isElement(x))||(_=s.floating[v]||o.floating[f]);const S=w/2-k/2,C=_/2-m[f]/2-1,E=qn(d[b],C),z=qn(d[y],C),A=E,$=_-m[f]-z,T=_/2-m[f]/2+S,P=Zn(A,T,$),M=!l.arrow&&null!=tr(i)&&T!==P&&o.reference[f]/2-(T<A?E:z)-m[f]/2<0,L=M?T<A?T-A:T-$:0;return{[p]:h[p]+L,data:{[p]:P,centerOffset:T-P-L,...M&&{alignmentOffset:L}},reset:M}}}),mi=(e,t,n)=>{const r=new Map,i={platform:si,...n},o={...i.platform,_c:r};return(async(e,t,n)=>{const{placement:r="bottom",strategy:i="absolute",middleware:o=[],platform:a}=n,s=o.filter(Boolean),l=await(null==a.isRTL?void 0:a.isRTL(t));let c=await a.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=gr(c,r,l),h=r,p={},f=0;for(let n=0;n<s.length;n++){const{name:o,fn:m}=s[n],{x:g,y:b,data:y,reset:v}=await m({x:u,y:d,initialPlacement:r,placement:h,strategy:i,middlewareData:p,rects:c,platform:a,elements:{reference:e,floating:t}});u=null!=g?g:u,d=null!=b?b:d,p={...p,[o]:{...p[o],...y}},v&&f<=50&&(f++,"object"==typeof v&&(v.placement&&(h=v.placement),v.rects&&(c=!0===v.rects?await a.getElementRects({reference:e,floating:t,strategy:i}):v.rects),({x:u,y:d}=gr(c,h,l))),n=-1)}return{x:u,y:d,placement:h,strategy:i,middlewareData:p}})(e,t,{...i,platform:o})};function gi(e){return function(e){for(let t=e;t;t=bi(t))if(t instanceof Element&&"none"===getComputedStyle(t).display)return null;for(let t=bi(e);t;t=bi(t)){if(!(t instanceof Element))continue;const e=getComputedStyle(t);if("contents"!==e.display){if("static"!==e.position||Nr(e))return t;if("BODY"===t.tagName)return t}}return null}(e)}function bi(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}var yi=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect();let n=0,r=0,i=0,o=0,a=0,s=0,l=0,c=0;this.placement.includes("top")||this.placement.includes("bottom")?e.top<t.top?(n=e.left,r=e.bottom,i=e.right,o=e.bottom,a=t.left,s=t.top,l=t.right,c=t.top):(n=t.left,r=t.bottom,i=t.right,o=t.bottom,a=e.left,s=e.top,l=e.right,c=e.top):e.left<t.left?(n=e.right,r=e.top,i=t.left,o=t.top,a=e.right,s=e.bottom,l=t.left,c=t.bottom):(n=t.right,r=t.top,i=e.left,o=e.top,a=t.right,s=t.bottom,l=e.left,c=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${n}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${i}px`),this.style.setProperty("--hover-bridge-top-right-y",`${o}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${s}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${c}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){const e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||function(e){return null!==e&&"object"==typeof e&&"getBoundingClientRect"in e&&(!("contextElement"in e)||e.contextElement instanceof Element)}(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){this.anchorEl&&this.active&&(this.cleanup=ci(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){if(!this.active||!this.anchorEl)return;const e=[ui({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(pi({apply:({rects:e})=>{const t="width"===this.sync||"both"===this.sync,n="height"===this.sync||"both"===this.sync;this.popup.style.width=t?`${e.reference.width}px`:"",this.popup.style.height=n?`${e.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&e.push(hi({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&e.push(di({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?e.push(pi({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:t})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${t}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&e.push(fi({element:this.arrowEl,padding:this.arrowPadding}));const t="absolute"===this.strategy?e=>si.getOffsetParent(e,gi):si.getOffsetParent;mi(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:this.strategy,platform:Je(Ze({},si),{getOffsetParent:t})}).then(({x:e,y:t,middlewareData:n,placement:r})=>{const i="rtl"===this.localize.dir(),o={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]];if(this.setAttribute("data-current-placement",r),Object.assign(this.popup.style,{left:`${e}px`,top:`${t}px`}),this.arrow){const e=n.arrow.x,t=n.arrow.y;let r="",a="",s="",l="";if("start"===this.arrowPlacement){const n="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";r="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",a=i?n:"",l=i?"":n}else if("end"===this.arrowPlacement){const n="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";a=i?"":n,l=i?n:"",s="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(l="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":"",r="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":""):(l="number"==typeof e?`${e}px`:"",r="number"==typeof t?`${t}px`:"");Object.assign(this.arrowEl.style,{top:r,right:a,bottom:s,left:l,[o]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return we`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${Ut({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${Ut({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?we`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};yi.styles=[Be,jn],et([ct(".popup")],yi.prototype,"popup",2),et([ct(".popup__arrow")],yi.prototype,"arrowEl",2),et([ot()],yi.prototype,"anchor",2),et([ot({type:Boolean,reflect:!0})],yi.prototype,"active",2),et([ot({reflect:!0})],yi.prototype,"placement",2),et([ot({reflect:!0})],yi.prototype,"strategy",2),et([ot({type:Number})],yi.prototype,"distance",2),et([ot({type:Number})],yi.prototype,"skidding",2),et([ot({type:Boolean})],yi.prototype,"arrow",2),et([ot({attribute:"arrow-placement"})],yi.prototype,"arrowPlacement",2),et([ot({attribute:"arrow-padding",type:Number})],yi.prototype,"arrowPadding",2),et([ot({type:Boolean})],yi.prototype,"flip",2),et([ot({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(e=>e.trim()).filter(e=>""!==e),toAttribute:e=>e.join(" ")}})],yi.prototype,"flipFallbackPlacements",2),et([ot({attribute:"flip-fallback-strategy"})],yi.prototype,"flipFallbackStrategy",2),et([ot({type:Object})],yi.prototype,"flipBoundary",2),et([ot({attribute:"flip-padding",type:Number})],yi.prototype,"flipPadding",2),et([ot({type:Boolean})],yi.prototype,"shift",2),et([ot({type:Object})],yi.prototype,"shiftBoundary",2),et([ot({attribute:"shift-padding",type:Number})],yi.prototype,"shiftPadding",2),et([ot({attribute:"auto-size"})],yi.prototype,"autoSize",2),et([ot()],yi.prototype,"sync",2),et([ot({type:Object})],yi.prototype,"autoSizeBoundary",2),et([ot({attribute:"auto-size-padding",type:Number})],yi.prototype,"autoSizePadding",2),et([ot({attribute:"hover-bridge",type:Boolean})],yi.prototype,"hoverBridge",2);var vi=new Map,wi=new WeakMap;function ki(e,t){return"rtl"===t.toLowerCase()?{keyframes:e.rtlKeyframes||e.keyframes,options:e.options}:e}function xi(e,t){vi.set(e,function(e){return null!=e?e:{keyframes:[],options:{duration:0}}}(t))}function _i(e,t,n){const r=wi.get(e);if(null==r?void 0:r[t])return ki(r[t],n.dir);const i=vi.get(t);return i?ki(i,n.dir):{keyframes:[],options:{duration:0}}}function Si(e,t){return new Promise(n=>{e.addEventListener(t,function r(i){i.target===e&&(e.removeEventListener(t,r),n())})})}function Ci(e,t,n){return new Promise(r=>{if((null==n?void 0:n.duration)===1/0)throw new Error("Promise-based animations must be finite.");const i=e.animate(t,Je(Ze({},n),{duration:zi()?0:n.duration}));i.addEventListener("cancel",r,{once:!0}),i.addEventListener("finish",r,{once:!0})})}function Ei(e){return(e=e.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(e):e.indexOf("s")>-1?1e3*parseFloat(e):parseFloat(e)}function zi(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Ai(e){return Promise.all(e.getAnimations().map(e=>new Promise(t=>{e.cancel(),requestAnimationFrame(t)})))}function $i(e,t){return e.map(e=>Je(Ze({},e),{height:"auto"===e.height?`${t}px`:e.height}))}var Ti=class extends dt{constructor(){super(),this.localize=new ln(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=e=>{"Escape"===e.key&&(e.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const e=Ei(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),e)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const e=Ei(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),e)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var e;super.disconnectedCallback(),null==(e=this.closeWatcher)||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(e){return this.trigger.split(" ").includes(e)}async handleOpenChange(){var e,t;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(e=this.closeWatcher)||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await Ai(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:t,options:n}=_i(this,"tooltip.show",{dir:this.localize.dir()});await Ci(this.popup.popup,t,n),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await Ai(this.body);const{keyframes:e,options:n}=_i(this,"tooltip.hide",{dir:this.localize.dir()});await Ci(this.popup.popup,e,n),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Si(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Si(this,"sl-after-hide")}render(){return we`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${Ut({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};Ti.styles=[Be,Hn],Ti.dependencies={"sl-popup":yi},et([ct("slot:not([name])")],Ti.prototype,"defaultSlot",2),et([ct(".tooltip__body")],Ti.prototype,"body",2),et([ct("sl-popup")],Ti.prototype,"popup",2),et([ot()],Ti.prototype,"content",2),et([ot()],Ti.prototype,"placement",2),et([ot({type:Boolean,reflect:!0})],Ti.prototype,"disabled",2),et([ot({type:Number})],Ti.prototype,"distance",2),et([ot({type:Boolean,reflect:!0})],Ti.prototype,"open",2),et([ot({type:Number})],Ti.prototype,"skidding",2),et([ot()],Ti.prototype,"trigger",2),et([ot({type:Boolean})],Ti.prototype,"hoist",2),et([At("open",{waitUntilFirstUpdate:!0})],Ti.prototype,"handleOpenChange",1),et([At(["content","distance","hoist","placement","skidding"])],Ti.prototype,"handleOptionsChange",1),et([At("disabled")],Ti.prototype,"handleDisabledChange",1),xi("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),xi("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});Ti.define("sl-tooltip");var Pi=gt({tagName:"sl-tooltip",elementClass:Ti,react:d,events:{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide"},displayName:"SlTooltip"}),Mi=F`
  :host {
    display: block;
    outline: 0;
    z-index: 0;
  }

  :host(:focus) {
    outline: none;
  }

  slot:not([name])::slotted(sl-icon) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .tree-item {
    position: relative;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    color: var(--sl-color-neutral-700);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  .tree-item__checkbox {
    pointer-events: none;
  }

  .tree-item__expand-button,
  .tree-item__checkbox,
  .tree-item__label {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-dense);
    letter-spacing: var(--sl-letter-spacing-normal);
  }

  .tree-item__checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .tree-item__indentation {
    display: block;
    width: 1em;
    flex-shrink: 0;
  }

  .tree-item__expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-x-small);
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    cursor: pointer;
  }

  .tree-item__expand-button {
    transition: var(--sl-transition-medium) rotate ease;
  }

  .tree-item--expanded .tree-item__expand-button {
    rotate: 90deg;
  }

  .tree-item--expanded.tree-item--rtl .tree-item__expand-button {
    rotate: -90deg;
  }

  .tree-item--expanded slot[name='expand-icon'],
  .tree-item:not(.tree-item--expanded) slot[name='collapse-icon'] {
    display: none;
  }

  .tree-item:not(.tree-item--has-expand-button) .tree-item__expand-icon-slot {
    display: none;
  }

  .tree-item__expand-button--visible {
    cursor: pointer;
  }

  .tree-item__item {
    display: flex;
    align-items: center;
    border-inline-start: solid 3px transparent;
  }

  .tree-item--disabled .tree-item__item {
    opacity: 0.5;
    outline: none;
    cursor: not-allowed;
  }

  :host(:focus-visible) .tree-item__item {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
    z-index: 2;
  }

  :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
    background-color: var(--sl-color-neutral-100);
    border-inline-start-color: var(--sl-color-primary-600);
  }

  :host(:not([aria-disabled='true'])) .tree-item__expand-button {
    color: var(--sl-color-neutral-600);
  }

  .tree-item__label {
    display: flex;
    align-items: center;
    transition: var(--sl-transition-fast) color;
  }

  .tree-item__children {
    display: block;
    font-size: calc(1em + var(--indent-size, var(--sl-spacing-medium)));
  }

  /* Indentation lines */
  .tree-item__children {
    position: relative;
  }

  .tree-item__children::before {
    content: '';
    position: absolute;
    top: var(--indent-guide-offset);
    bottom: var(--indent-guide-offset);
    left: calc(1em - (var(--indent-guide-width) / 2) - 1px);
    border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
    z-index: 1;
  }

  .tree-item--rtl .tree-item__children::before {
    left: auto;
    right: 1em;
  }

  @media (forced-colors: active) {
    :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
      outline: dashed 1px SelectedItem;
    }
  }
`,Li=F`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`,Di=class extends dt{constructor(){super(...arguments),this.formControlController=new In(this,{value:e=>e.checked?e.value||"on":void 0,defaultValue:e=>e.defaultChecked,setValue:(e,t)=>e.checked=t}),this.hasSlotController=new Vn(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.indeterminate=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,this.emit("sl-change")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("help-text"),t=!!this.helpText||!!e;return we`
      <div
        class=${Ut({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-help-text":t})}
      >
        <label
          part="base"
          class=${Ut({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":"small"===this.size,"checkbox--medium":"medium"===this.size,"checkbox--large":"large"===this.size})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${Gt(this.value)}
            .indeterminate=${Rn(this.indeterminate)}
            .checked=${Rn(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked?" control--checked":""}${this.indeterminate?" control--indeterminate":""}"
            class="checkbox__control"
          >
            ${this.checked?we`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:""}
            ${!this.checked&&this.indeterminate?we`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                `:""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${t?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Di.styles=[Be,$n,Li],Di.dependencies={"sl-icon":It},et([ct('input[type="checkbox"]')],Di.prototype,"input",2),et([at()],Di.prototype,"hasFocus",2),et([ot()],Di.prototype,"title",2),et([ot()],Di.prototype,"name",2),et([ot()],Di.prototype,"value",2),et([ot({reflect:!0})],Di.prototype,"size",2),et([ot({type:Boolean,reflect:!0})],Di.prototype,"disabled",2),et([ot({type:Boolean,reflect:!0})],Di.prototype,"checked",2),et([ot({type:Boolean,reflect:!0})],Di.prototype,"indeterminate",2),et([An("checked")],Di.prototype,"defaultChecked",2),et([ot({reflect:!0})],Di.prototype,"form",2),et([ot({type:Boolean,reflect:!0})],Di.prototype,"required",2),et([ot({attribute:"help-text"})],Di.prototype,"helpText",2),et([At("disabled",{waitUntilFirstUpdate:!0})],Di.prototype,"handleDisabledChange",1),et([At(["checked","indeterminate"],{waitUntilFirstUpdate:!0})],Di.prototype,"handleStateChange",1);var Ii=F`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`,Ni=class extends dt{constructor(){super(...arguments),this.localize=new ln(this)}render(){return we`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};function Oi(e,t,n){return e?t(e):n?.(e)}Ni.styles=[Be,Ii];var Fi=class e extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(e){return e instanceof Element&&"treeitem"===e.getAttribute("role")}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&0===this.getChildrenItems().length,this.handleExpandedChange()}async animateCollapse(){this.emit("sl-collapse"),await Ai(this.childrenContainer);const{keyframes:e,options:t}=_i(this,"tree-item.collapse",{dir:this.localize.dir()});await Ci(this.childrenContainer,$i(e,this.childrenContainer.scrollHeight),t),this.childrenContainer.hidden=!0,this.emit("sl-after-collapse")}isNestedItem(){const t=this.parentElement;return!!t&&e.isTreeItem(t)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&0===this.getChildrenItems().length}willUpdate(e){e.has("selected")&&!e.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.emit("sl-expand"),await Ai(this.childrenContainer),this.childrenContainer.hidden=!1;const{keyframes:e,options:t}=_i(this,"tree-item.expand",{dir:this.localize.dir()});await Ci(this.childrenContainer,$i(e,this.childrenContainer.scrollHeight),t),this.childrenContainer.style.height="auto",this.emit("sl-after-expand")}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.emit("sl-lazy-change")}getChildrenItems({includeDisabled:t=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(n=>e.isTreeItem(n)&&(t||!n.disabled)):[]}render(){const e="rtl"===this.localize.dir(),t=!this.loading&&(!this.isLeaf||this.lazy);return we`
      <div
        part="base"
        class="${Ut({"tree-item":!0,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":t,"tree-item--rtl":"rtl"===this.localize.dir()})}"
      >
        <div
          class="tree-item__item"
          part="
            item
            ${this.disabled?"item--disabled":""}
            ${this.expanded?"item--expanded":""}
            ${this.indeterminate?"item--indeterminate":""}
            ${this.selected?"item--selected":""}
          "
        >
          <div class="tree-item__indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${Ut({"tree-item__expand-button":!0,"tree-item__expand-button--visible":t})}
            aria-hidden="true"
          >
            ${Oi(this.loading,()=>we` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${Oi(this.selectable,()=>we`
              <sl-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    control--checked:checkbox__control--checked,
                    control--indeterminate:checkbox__control--indeterminate,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="tree-item__checkbox"
                ?disabled="${this.disabled}"
                ?checked="${Rn(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></sl-checkbox>
            `)}

          <slot class="tree-item__label" part="label"></slot>
        </div>

        <div class="tree-item__children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};Fi.styles=[Be,Mi],Fi.dependencies={"sl-checkbox":Di,"sl-icon":It,"sl-spinner":Ni},et([at()],Fi.prototype,"indeterminate",2),et([at()],Fi.prototype,"isLeaf",2),et([at()],Fi.prototype,"loading",2),et([at()],Fi.prototype,"selectable",2),et([ot({type:Boolean,reflect:!0})],Fi.prototype,"expanded",2),et([ot({type:Boolean,reflect:!0})],Fi.prototype,"selected",2),et([ot({type:Boolean,reflect:!0})],Fi.prototype,"disabled",2),et([ot({type:Boolean,reflect:!0})],Fi.prototype,"lazy",2),et([ct("slot:not([name])")],Fi.prototype,"defaultSlot",2),et([ct("slot[name=children]")],Fi.prototype,"childrenSlot",2),et([ct(".tree-item__item")],Fi.prototype,"itemElement",2),et([ct(".tree-item__children")],Fi.prototype,"childrenContainer",2),et([ct(".tree-item__expand-button slot")],Fi.prototype,"expandButtonSlot",2),et([At("loading",{waitUntilFirstUpdate:!0})],Fi.prototype,"handleLoadingChange",1),et([At("disabled")],Fi.prototype,"handleDisabledChange",1),et([At("selected")],Fi.prototype,"handleSelectedChange",1),et([At("expanded",{waitUntilFirstUpdate:!0})],Fi.prototype,"handleExpandedChange",1),et([At("expanded",{waitUntilFirstUpdate:!0})],Fi.prototype,"handleExpandAnimation",1),et([At("lazy",{waitUntilFirstUpdate:!0})],Fi.prototype,"handleLazyChange",1);var Vi=Fi;xi("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}}),xi("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});Vi.define("sl-tree-item"),gt({tagName:"sl-tree-item",elementClass:Vi,react:d,events:{onSlExpand:"sl-expand",onSlAfterExpand:"sl-after-expand",onSlCollapse:"sl-collapse",onSlAfterCollapse:"sl-after-collapse",onSlLazyChange:"sl-lazy-change",onSlLazyLoad:"sl-lazy-load"},displayName:"SlTreeItem"});var Ri=F`
  :host {
    /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
    --indent-guide-color: var(--sl-color-neutral-200);
    --indent-guide-offset: 0;
    --indent-guide-style: solid;
    --indent-guide-width: 0;
    --indent-size: var(--sl-spacing-large);

    display: block;

    /*
     * Tree item indentation uses the "em" unit to increment its width on each level, so setting the font size to zero
     * here removes the indentation for all the nodes on the first level.
     */
    font-size: 0;
  }
`;function Bi(e,t,n){const r=e=>Object.is(e,-0)?0:e;return r(e<t?t:e>n?n:e)}function Ui(e,t=!1){function n(e){const t=e.getChildrenItems({includeDisabled:!1});if(t.length){const n=t.every(e=>e.selected),r=t.every(e=>!e.selected&&!e.indeterminate);e.selected=n,e.indeterminate=!n&&!r}}!function e(r){for(const n of r.getChildrenItems())n.selected=t?r.selected||n.selected:!n.disabled&&r.selected,e(n);t&&n(r)}(e),function e(t){const r=t.parentElement;Vi.isTreeItem(r)&&(n(r),e(r))}(e)}var Hi=class extends dt{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new ln(this),this.initTreeItem=e=>{e.selectable="multiple"===this.selection,["expand","collapse"].filter(e=>!!this.querySelector(`[slot="${e}-icon"]`)).forEach(t=>{const n=e.querySelector(`[slot="${t}-icon"]`),r=this.getExpandButtonIcon(t);r&&(null===n?e.append(r):n.hasAttribute("data-default")&&n.replaceWith(r))})},this.handleTreeChanged=e=>{for(const t of e){const e=[...t.addedNodes].filter(Vi.isTreeItem),n=[...t.removedNodes].filter(Vi.isTreeItem);e.forEach(this.initTreeItem),this.lastFocusedItem&&n.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=e=>{const t=e.relatedTarget;t&&this.contains(t)||(this.tabIndex=0)},this.handleFocusIn=e=>{const t=e.target;e.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),Vi.isTreeItem(t)&&!t.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=t,this.tabIndex=-1,t.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){var e;super.disconnectedCallback(),null==(e=this.mutationObserver)||e.disconnect()}getExpandButtonIcon(e){const t=("expand"===e?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(t){const n=t.cloneNode(!0);return[n,...n.querySelectorAll("[id]")].forEach(e=>e.removeAttribute("id")),n.setAttribute("data-default",""),n.slot=`${e}-icon`,n}return null}selectItem(e){const t=[...this.selectedItems];if("multiple"===this.selection)e.selected=!e.selected,e.lazy&&(e.expanded=!0),Ui(e);else if("single"===this.selection||e.isLeaf){const t=this.getAllTreeItems();for(const n of t)n.selected=n===e}else"leaf"===this.selection&&(e.expanded=!e.expanded);const n=this.selectedItems;(t.length!==n.length||n.some(e=>!t.includes(e)))&&Promise.all(n.map(e=>e.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:n}})})}getAllTreeItems(){return[...this.querySelectorAll("sl-tree-item")]}focusItem(e){null==e||e.focus()}handleKeyDown(e){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(e.key))return;if(e.composedPath().some(e=>{var t;return["input","textarea"].includes(null==(t=null==e?void 0:e.tagName)?void 0:t.toLowerCase())}))return;const t=this.getFocusableItems(),n="ltr"===this.localize.dir(),r="rtl"===this.localize.dir();if(t.length>0){e.preventDefault();const i=t.findIndex(e=>e.matches(":focus")),o=t[i],a=e=>{const n=t[Bi(e,0,t.length-1)];this.focusItem(n)},s=e=>{o.expanded=e};"ArrowDown"===e.key?a(i+1):"ArrowUp"===e.key?a(i-1):n&&"ArrowRight"===e.key||r&&"ArrowLeft"===e.key?!o||o.disabled||o.expanded||o.isLeaf&&!o.lazy?a(i+1):s(!0):n&&"ArrowLeft"===e.key||r&&"ArrowRight"===e.key?!o||o.disabled||o.isLeaf||!o.expanded?a(i-1):s(!1):"Home"===e.key?a(0):"End"===e.key?a(t.length-1):"Enter"!==e.key&&" "!==e.key||o.disabled||this.selectItem(o)}}handleClick(e){const t=e.target,n=t.closest("sl-tree-item"),r=e.composedPath().some(e=>{var t;return null==(t=null==e?void 0:e.classList)?void 0:t.contains("tree-item__expand-button")});n&&!n.disabled&&t===this.clickTarget&&(r?n.expanded=!n.expanded:this.selectItem(n))}handleMouseDown(e){this.clickTarget=e.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){const e="multiple"===this.selection,t=this.getAllTreeItems();this.setAttribute("aria-multiselectable",e?"true":"false");for(const n of t)n.selectable=e;e&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(e=>Ui(e,!0)))}get selectedItems(){return this.getAllTreeItems().filter(e=>e.selected)}getFocusableItems(){const e=this.getAllTreeItems(),t=new Set;return e.filter(e=>{var n;if(e.disabled)return!1;const r=null==(n=e.parentElement)?void 0:n.closest("[role=treeitem]");return r&&(!r.expanded||r.loading||t.has(r))&&t.add(e),!t.has(e)})}render(){return we`
      <div
        part="base"
        class="tree"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
        <span hidden aria-hidden="true"><slot name="expand-icon"></slot></span>
        <span hidden aria-hidden="true"><slot name="collapse-icon"></slot></span>
      </div>
    `}};Hi.styles=[Be,Ri],et([ct("slot:not([name])")],Hi.prototype,"defaultSlot",2),et([ct("slot[name=expand-icon]")],Hi.prototype,"expandedIconSlot",2),et([ct("slot[name=collapse-icon]")],Hi.prototype,"collapsedIconSlot",2),et([ot()],Hi.prototype,"selection",2),et([At("selection")],Hi.prototype,"handleSelectionChange",1);Hi.define("sl-tree"),gt({tagName:"sl-tree",elementClass:Hi,react:d,events:{onSlSelectionChange:"sl-selection-change"},displayName:"SlTree"});var ji=F`
  :host {
    --symbol-color: var(--sl-color-neutral-300);
    --symbol-color-active: var(--sl-color-amber-500);
    --symbol-size: 1.2rem;
    --symbol-spacing: var(--sl-spacing-3x-small);

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--sl-border-radius-medium);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .rating__symbols {
    display: inline-flex;
    position: relative;
    font-size: var(--symbol-size);
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .rating__symbols > * {
    padding: var(--symbol-spacing);
  }

  .rating__symbol--active,
  .rating__partial--filled {
    color: var(--symbol-color-active);
  }

  .rating__partial-symbol-container {
    position: relative;
  }

  .rating__partial--filled {
    position: absolute;
    top: var(--symbol-spacing);
    left: var(--symbol-spacing);
  }

  .rating__symbol {
    transition: var(--sl-transition-fast) scale;
    pointer-events: none;
  }

  .rating__symbol--hover {
    scale: 1.2;
  }

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }

  .rating--disabled .rating__symbol--hover,
  .rating--readonly .rating__symbol--hover {
    scale: none;
  }

  .rating--disabled {
    opacity: 0.5;
  }

  .rating--disabled .rating__symbols {
    cursor: not-allowed;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    .rating__symbol--active {
      color: SelectedItem;
    }
  }
`;const qi="important",Wi=" !"+qi,Ki=Rt(class extends Bt{constructor(e){if(super(e),e.type!==Nt||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{const r=e[n];return null==r?t:t+`${n=n.includes("-")?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(e,[t]){const{style:n}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(const e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?n.removeProperty(e):n[e]=null);for(const e in t){const r=t[e];if(null!=r){this.ft.add(e);const t="string"==typeof r&&r.endsWith(Wi);e.includes("-")||t?n.setProperty(e,t?r.slice(0,-11):r,t?qi:""):n[e]=r}}return ke}});let Gi=class extends Bt{constructor(e){if(super(e),this.it=xe,e.type!==Ot)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===xe||null==e)return this._t=void 0,this.it=e;if(e===ke)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};Gi.directiveName="unsafeHTML",Gi.resultType=1;const Qi=Rt(Gi);var Yi=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.hoverValue=0,this.isHovering=!1,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=!1,this.disabled=!1,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>'}getValueFromMousePosition(e){return this.getValueFromXCoordinate(e.clientX)}getValueFromTouchPosition(e){return this.getValueFromXCoordinate(e.touches[0].clientX)}getValueFromXCoordinate(e){const t="rtl"===this.localize.dir(),{left:n,right:r,width:i}=this.rating.getBoundingClientRect();return Bi(t?this.roundToPrecision((r-e)/i*this.max,this.precision):this.roundToPrecision((e-n)/i*this.max,this.precision),0,this.max)}handleClick(e){this.disabled||(this.setValue(this.getValueFromMousePosition(e)),this.emit("sl-change"))}setValue(e){this.disabled||this.readonly||(this.value=e===this.value?0:e,this.isHovering=!1)}handleKeyDown(e){const t="ltr"===this.localize.dir(),n="rtl"===this.localize.dir(),r=this.value;if(!this.disabled&&!this.readonly){if("ArrowDown"===e.key||t&&"ArrowLeft"===e.key||n&&"ArrowRight"===e.key){const t=e.shiftKey?1:this.precision;this.value=Math.max(0,this.value-t),e.preventDefault()}if("ArrowUp"===e.key||t&&"ArrowRight"===e.key||n&&"ArrowLeft"===e.key){const t=e.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+t),e.preventDefault()}"Home"===e.key&&(this.value=0,e.preventDefault()),"End"===e.key&&(this.value=this.max,e.preventDefault()),this.value!==r&&this.emit("sl-change")}}handleMouseEnter(e){this.isHovering=!0,this.hoverValue=this.getValueFromMousePosition(e)}handleMouseMove(e){this.hoverValue=this.getValueFromMousePosition(e)}handleMouseLeave(){this.isHovering=!1}handleTouchStart(e){this.isHovering=!0,this.hoverValue=this.getValueFromTouchPosition(e),e.preventDefault()}handleTouchMove(e){this.hoverValue=this.getValueFromTouchPosition(e)}handleTouchEnd(e){this.isHovering=!1,this.setValue(this.hoverValue),this.emit("sl-change"),e.preventDefault()}roundToPrecision(e,t=.5){const n=1/t;return Math.ceil(e*n)/n}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}})}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}})}focus(e){this.rating.focus(e)}blur(){this.rating.blur()}render(){const e="rtl"===this.localize.dir(),t=Array.from(Array(this.max).keys());let n=0;return n=this.disabled||this.readonly?this.value:this.isHovering?this.hoverValue:this.value,we`
      <div
        part="base"
        class=${Ut({rating:!0,"rating--readonly":this.readonly,"rating--disabled":this.disabled,"rating--rtl":e})}
        role="slider"
        aria-label=${this.label}
        aria-disabled=${this.disabled?"true":"false"}
        aria-readonly=${this.readonly?"true":"false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled||this.readonly?"-1":"0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols">
          ${t.map(t=>n>t&&n<t+1?we`
                <span
                  class=${Ut({rating__symbol:!0,"rating__partial-symbol-container":!0,"rating__symbol--hover":this.isHovering&&Math.ceil(n)===t+1})}
                  role="presentation"
                >
                  <div
                    style=${Ki({clipPath:e?`inset(0 ${100*(n-t)}% 0 0)`:`inset(0 0 0 ${100*(n-t)}%)`})}
                  >
                    ${Qi(this.getSymbol(t+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${Ki({clipPath:e?`inset(0 0 0 ${100-100*(n-t)}%)`:`inset(0 ${100-100*(n-t)}% 0 0)`})}
                  >
                    ${Qi(this.getSymbol(t+1))}
                  </div>
                </span>
              `:we`
              <span
                class=${Ut({rating__symbol:!0,"rating__symbol--hover":this.isHovering&&Math.ceil(n)===t+1,"rating__symbol--active":n>=t+1})}
                role="presentation"
              >
                ${Qi(this.getSymbol(t+1))}
              </span>
            `)}
        </span>
      </div>
    `}};Yi.styles=[Be,ji],Yi.dependencies={"sl-icon":It},et([ct(".rating")],Yi.prototype,"rating",2),et([at()],Yi.prototype,"hoverValue",2),et([at()],Yi.prototype,"isHovering",2),et([ot()],Yi.prototype,"label",2),et([ot({type:Number})],Yi.prototype,"value",2),et([ot({type:Number})],Yi.prototype,"max",2),et([ot({type:Number})],Yi.prototype,"precision",2),et([ot({type:Boolean,reflect:!0})],Yi.prototype,"readonly",2),et([ot({type:Boolean,reflect:!0})],Yi.prototype,"disabled",2),et([ot()],Yi.prototype,"getSymbol",2),et([st({passive:!0})],Yi.prototype,"handleTouchMove",1),et([At("hoverValue")],Yi.prototype,"handleHoverValueChange",1),et([At("isHovering")],Yi.prototype,"handleIsHoveringChange",1);Yi.define("sl-rating"),gt({tagName:"sl-rating",elementClass:Yi,react:d,events:{onSlChange:"sl-change",onSlHover:"sl-hover"},displayName:"SlRating"});var Xi=[{max:276e4,value:6e4,unit:"minute"},{max:72e6,value:36e5,unit:"hour"},{max:5184e5,value:864e5,unit:"day"},{max:24192e5,value:6048e5,unit:"week"},{max:28512e6,value:2592e6,unit:"month"},{max:1/0,value:31536e6,unit:"year"}],Zi=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.isoTime="",this.relativeTime="",this.date=new Date,this.format="long",this.numeric="auto",this.sync=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){const e=new Date,t=new Date(this.date);if(isNaN(t.getMilliseconds()))return this.relativeTime="",this.isoTime="","";const n=t.getTime()-e.getTime(),{unit:r,value:i}=Xi.find(e=>Math.abs(n)<e.max);if(this.isoTime=t.toISOString(),this.relativeTime=this.localize.relativeTime(Math.round(n/i),r,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let e;e=Ji("minute"===r?"second":"hour"===r?"minute":"day"===r?"hour":"day"),this.updateTimeout=window.setTimeout(()=>this.requestUpdate(),e)}return we` <time datetime=${this.isoTime}>${this.relativeTime}</time> `}};function Ji(e){const t={second:1e3,minute:6e4,hour:36e5,day:864e5}[e];return t-Date.now()%t}et([at()],Zi.prototype,"isoTime",2),et([at()],Zi.prototype,"relativeTime",2),et([ot()],Zi.prototype,"date",2),et([ot()],Zi.prototype,"format",2),et([ot()],Zi.prototype,"numeric",2),et([ot({type:Boolean})],Zi.prototype,"sync",2);Zi.define("sl-relative-time"),gt({tagName:"sl-relative-time",elementClass:Zi,react:d,events:{},displayName:"SlRelativeTime"});fn.define("sl-resize-observer"),gt({tagName:"sl-resize-observer",elementClass:fn,react:d,events:{onSlResize:"sl-resize"},displayName:"SlResizeObserver"});var eo=F`
  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix and Suffix */
  .select__prefix,
  .select__suffix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-small);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`,to=class extends dt{constructor(){super(...arguments),this.formControlController=new In(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Vn(this,"help-text","label"),this.localize=new ln(this),this.typeToSelectString="",this.hasFocus=!1,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=!1,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.clearable=!1,this.open=!1,this.hoist=!1,this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=!1,this.getTag=e=>we`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${t=>this.handleTagRemove(t,e)}
      >
        ${e.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=e=>{const t=e.composedPath();this&&!t.includes(this)&&this.hide()},this.handleDocumentKeyDown=e=>{const t=e.target,n=null!==t.closest(".select__clear"),r=null!==t.closest("sl-icon-button");if(!n&&!r){if("Escape"===e.key&&this.open&&!this.closeWatcher&&(e.preventDefault(),e.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),"Enter"===e.key||" "===e.key&&""===this.typeToSelectString)return e.preventDefault(),e.stopImmediatePropagation(),this.open?void(this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))):void this.show();if(["ArrowUp","ArrowDown","Home","End"].includes(e.key)){const t=this.getAllOptions(),n=t.indexOf(this.currentOption);let r=Math.max(0,n);if(e.preventDefault(),!this.open&&(this.show(),this.currentOption))return;"ArrowDown"===e.key?(r=n+1,r>t.length-1&&(r=0)):"ArrowUp"===e.key?(r=n-1,r<0&&(r=t.length-1)):"Home"===e.key?r=0:"End"===e.key&&(r=t.length-1),this.setCurrentOption(t[r])}if(e.key&&1===e.key.length||"Backspace"===e.key){const t=this.getAllOptions();if(e.metaKey||e.ctrlKey||e.altKey)return;if(!this.open){if("Backspace"===e.key)return;this.show()}e.stopPropagation(),e.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),"Backspace"===e.key?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=e.key.toLowerCase();for(const e of t){if(e.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(e);break}}}}},this.handleDocumentMouseDown=e=>{const t=e.composedPath();this&&!t.includes(this)&&this.hide()}}get value(){return this._value}set value(e){e=this.multiple?Array.isArray(e)?e:e.split(" "):Array.isArray(e)?e.join(" "):e,this._value!==e&&(this.valueHasChanged=!0,this._value=e)}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange()}),this.open=!1}addOpenListeners(){var e;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&(null==(e=this.closeWatcher)||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:!0}))})}removeOpenListeners(){var e;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),null==(e=this.closeWatcher)||e.destroy()}handleFocus(){this.hasFocus=!0,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleLabelClick(){this.displayInput.focus()}handleComboboxMouseDown(e){const t=e.composedPath().some(e=>e instanceof Element&&"sl-icon-button"===e.tagName.toLowerCase());this.disabled||t||(e.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(e){"Tab"!==e.key&&(e.stopPropagation(),this.handleDocumentKeyDown(e))}handleClearClick(e){e.stopPropagation(),this.valueHasChanged=!0,""!==this.value&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")}))}handleClearMouseDown(e){e.stopPropagation(),e.preventDefault()}handleOptionClick(e){const t=e.target.closest("sl-option"),n=this.value;t&&!t.disabled&&(this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(t):this.setSelectedOptions(t),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.value!==n&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());const e=this.getAllOptions(),t=this.valueHasChanged?this.value:this.defaultValue,n=Array.isArray(t)?t:[t],r=[];e.forEach(e=>r.push(e.value)),this.setSelectedOptions(e.filter(e=>n.includes(e.value)))}handleTagRemove(e,t){e.stopPropagation(),this.valueHasChanged=!0,this.disabled||(this.toggleOptionSelection(t,!1),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}))}getAllOptions(){return[...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(e){this.getAllOptions().forEach(e=>{e.current=!1,e.tabIndex=-1}),e&&(this.currentOption=e,e.current=!0,e.tabIndex=0,e.focus())}setSelectedOptions(e){const t=this.getAllOptions(),n=Array.isArray(e)?e:[e];t.forEach(e=>e.selected=!1),n.length&&n.forEach(e=>e.selected=!0),this.selectionChanged()}toggleOptionSelection(e,t){e.selected=!0===t||!1===t?t:!e.selected,this.selectionChanged()}selectionChanged(){var e,t,n;const r=this.getAllOptions();this.selectedOptions=r.filter(e=>e.selected);const i=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(e=>e.value),this.placeholder&&0===this.value.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const r=this.selectedOptions[0];this.value=null!=(e=null==r?void 0:r.value)?e:"",this.displayLabel=null!=(n=null==(t=null==r?void 0:r.getTextLabel)?void 0:t.call(r))?n:""}this.valueHasChanged=i,this.updateComplete.then(()=>{this.formControlController.updateValidity()})}get tags(){return this.selectedOptions.map((e,t)=>{if(t<this.maxOptionsVisible||this.maxOptionsVisible<=0){const n=this.getTag(e,t);return we`<div @sl-remove=${t=>this.handleTagRemove(t,e)}>
          ${"string"==typeof n?Qi(n):n}
        </div>`}return t===this.maxOptionsVisible?we`<sl-tag size=${this.size}>+${this.selectedOptions.length-t}</sl-tag>`:we``})}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleDisabledChange(){this.disabled&&(this.open=!1,this.handleOpenChange())}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),"value"===e){const e=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=e}}handleValueChange(){if(!this.valueHasChanged){const e=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=e}const e=this.getAllOptions(),t=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(e.filter(e=>t.includes(e.value)))}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await Ai(this),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)});const{keyframes:e,options:t}=_i(this,"select.show",{dir:this.localize.dir()});await Ci(this.popup.popup,e,t),this.currentOption&&yn(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await Ai(this);const{keyframes:e,options:t}=_i(this,"select.hide",{dir:this.localize.dir()});await Ci(this.popup.popup,e,t),this.listbox.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}async show(){if(!this.open&&!this.disabled)return this.open=!0,Si(this,"sl-after-show");this.open=!1}async hide(){if(this.open&&!this.disabled)return this.open=!1,Si(this,"sl-after-hide");this.open=!1}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(e){this.valueInput.setCustomValidity(e),this.formControlController.updateValidity()}focus(e){this.displayInput.focus(e)}blur(){this.displayInput.blur()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),n=!!this.label||!!e,r=!!this.helpText||!!t,i=this.clearable&&!this.disabled&&this.value.length>0,o=this.placeholder&&this.value&&this.value.length<=0;return we`
      <div
        part="form-control"
        class=${Ut({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":n,"form-control--has-help-text":r})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${n?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${Ut({select:!0,"select--standard":!0,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":o,"select--top":"top"===this.placement,"select--bottom":"bottom"===this.placement,"select--small":"small"===this.size,"select--medium":"medium"===this.size,"select--large":"large"===this.size})}
            placement=${this.placement}
            strategy=${this.hoist?"fixed":"absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple?we`<div part="tags" class="select__tags">${this.tags}</div>`:""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${i?we`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="suffix" part="suffix" class="select__suffix"></slot>

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};to.styles=[Be,$n,eo],to.dependencies={"sl-icon":It,"sl-popup":yi,"sl-tag":En},et([ct(".select")],to.prototype,"popup",2),et([ct(".select__combobox")],to.prototype,"combobox",2),et([ct(".select__display-input")],to.prototype,"displayInput",2),et([ct(".select__value-input")],to.prototype,"valueInput",2),et([ct(".select__listbox")],to.prototype,"listbox",2),et([at()],to.prototype,"hasFocus",2),et([at()],to.prototype,"displayLabel",2),et([at()],to.prototype,"currentOption",2),et([at()],to.prototype,"selectedOptions",2),et([at()],to.prototype,"valueHasChanged",2),et([ot()],to.prototype,"name",2),et([at()],to.prototype,"value",1),et([ot({attribute:"value"})],to.prototype,"defaultValue",2),et([ot({reflect:!0})],to.prototype,"size",2),et([ot()],to.prototype,"placeholder",2),et([ot({type:Boolean,reflect:!0})],to.prototype,"multiple",2),et([ot({attribute:"max-options-visible",type:Number})],to.prototype,"maxOptionsVisible",2),et([ot({type:Boolean,reflect:!0})],to.prototype,"disabled",2),et([ot({type:Boolean})],to.prototype,"clearable",2),et([ot({type:Boolean,reflect:!0})],to.prototype,"open",2),et([ot({type:Boolean})],to.prototype,"hoist",2),et([ot({type:Boolean,reflect:!0})],to.prototype,"filled",2),et([ot({type:Boolean,reflect:!0})],to.prototype,"pill",2),et([ot()],to.prototype,"label",2),et([ot({reflect:!0})],to.prototype,"placement",2),et([ot({attribute:"help-text"})],to.prototype,"helpText",2),et([ot({reflect:!0})],to.prototype,"form",2),et([ot({type:Boolean,reflect:!0})],to.prototype,"required",2),et([ot()],to.prototype,"getTag",2),et([At("disabled",{waitUntilFirstUpdate:!0})],to.prototype,"handleDisabledChange",1),et([At(["defaultValue","value"],{waitUntilFirstUpdate:!0})],to.prototype,"handleValueChange",1),et([At("open",{waitUntilFirstUpdate:!0})],to.prototype,"handleOpenChange",1),xi("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}}),xi("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});to.define("sl-select");var no=gt({tagName:"sl-select",elementClass:to,react:d,events:{onSlChange:"sl-change",onSlClear:"sl-clear",onSlInput:"sl-input",onSlFocus:"sl-focus",onSlBlur:"sl-blur",onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide",onSlInvalid:"sl-invalid"},displayName:"SlSelect"});Ni.define("sl-spinner");var ro=gt({tagName:"sl-spinner",elementClass:Ni,react:d,events:{},displayName:"SlSpinner"}),io=F`
  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: var(--sl-color-neutral-200);
    --sheen-color: var(--sl-color-neutral-300);

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    :host {
      --color: GrayText;
    }
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`,oo=class extends dt{constructor(){super(...arguments),this.effect="none"}render(){return we`
      <div
        part="base"
        class=${Ut({skeleton:!0,"skeleton--pulse":"pulse"===this.effect,"skeleton--sheen":"sheen"===this.effect})}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};oo.styles=[Be,io],et([ot()],oo.prototype,"effect",2);oo.define("sl-skeleton"),gt({tagName:"sl-skeleton",elementClass:oo,react:d,events:{},displayName:"SlSkeleton"});var ao=F`
  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`,so=class extends dt{constructor(){super(...arguments),this.formControlController=new In(this,{value:e=>e.checked?e.value||"on":void 0,defaultValue:e=>e.defaultChecked,setValue:(e,t)=>e.checked=t}),this.hasSlotController=new Vn(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(e){"ArrowLeft"===e.key&&(e.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),"ArrowRight"===e.key&&(e.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("help-text"),t=!!this.helpText||!!e;return we`
      <div
        class=${Ut({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-help-text":t})}
      >
        <label
          part="base"
          class=${Ut({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":"small"===this.size,"switch--medium":"medium"===this.size,"switch--large":"large"===this.size})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${Gt(this.value)}
            .checked=${Rn(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            role="switch"
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          />

          <span part="control" class="switch__control">
            <span part="thumb" class="switch__thumb"></span>
          </span>

          <div part="label" class="switch__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${t?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};so.styles=[Be,$n,ao],et([ct('input[type="checkbox"]')],so.prototype,"input",2),et([at()],so.prototype,"hasFocus",2),et([ot()],so.prototype,"title",2),et([ot()],so.prototype,"name",2),et([ot()],so.prototype,"value",2),et([ot({reflect:!0})],so.prototype,"size",2),et([ot({type:Boolean,reflect:!0})],so.prototype,"disabled",2),et([ot({type:Boolean,reflect:!0})],so.prototype,"checked",2),et([An("checked")],so.prototype,"defaultChecked",2),et([ot({reflect:!0})],so.prototype,"form",2),et([ot({type:Boolean,reflect:!0})],so.prototype,"required",2),et([ot({attribute:"help-text"})],so.prototype,"helpText",2),et([At("checked",{waitUntilFirstUpdate:!0})],so.prototype,"handleCheckedChange",1),et([At("disabled",{waitUntilFirstUpdate:!0})],so.prototype,"handleDisabledChange",1);so.define("sl-switch"),gt({tagName:"sl-switch",elementClass:so,react:d,events:{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlInput:"sl-input",onSlFocus:"sl-focus",onSlInvalid:"sl-invalid"},displayName:"SlSwitch"});var lo=F`
  :host {
    --divider-width: 4px;
    --divider-hit-area: 12px;
    --min: 0%;
    --max: 100%;

    display: grid;
  }

  .start,
  .end {
    overflow: hidden;
  }

  .divider {
    flex: 0 0 var(--divider-width);
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-900);
    z-index: 1;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider:focus-visible {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  :host([disabled]) .divider {
    cursor: not-allowed;
  }

  /* Horizontal */
  :host(:not([vertical], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    display: flex;
    content: '';
    position: absolute;
    height: 100%;
    left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    width: var(--divider-hit-area);
  }

  /* Vertical */
  :host([vertical]) {
    flex-direction: column;
  }

  :host([vertical]:not([disabled])) .divider {
    cursor: row-resize;
  }

  :host([vertical]) .divider::after {
    content: '';
    position: absolute;
    width: 100%;
    top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    height: var(--divider-hit-area);
  }

  @media (forced-colors: active) {
    .divider {
      outline: solid 1px transparent;
    }
  }
`;function co(e,t){function n(n){const r=e.getBoundingClientRect(),i=e.ownerDocument.defaultView,o=r.left+i.scrollX,a=r.top+i.scrollY,s=n.pageX-o,l=n.pageY-a;(null==t?void 0:t.onMove)&&t.onMove(s,l)}document.addEventListener("pointermove",n,{passive:!0}),document.addEventListener("pointerup",function e(){document.removeEventListener("pointermove",n),document.removeEventListener("pointerup",e),(null==t?void 0:t.onStop)&&t.onStop()}),(null==t?void 0:t.initialEvent)instanceof PointerEvent&&n(t.initialEvent)}var uo=()=>null,ho=class extends dt{constructor(){super(...arguments),this.isCollapsed=!1,this.localize=new ln(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=!1,this.disabled=!1,this.snapValue="",this.snapFunction=uo,this.snapThreshold=12}toSnapFunction(e){const t=e.split(" ");return({pos:n,size:r,snapThreshold:i,isRtl:o,vertical:a})=>{let s=n,l=Number.POSITIVE_INFINITY;return t.forEach(t=>{let c;if(t.startsWith("repeat(")){const t=e.substring(7,e.length-1),i=t.endsWith("%"),s=Number.parseFloat(t),l=i?r*(s/100):s;c=Math.round((o&&!a?r-n:n)/l)*l}else c=t.endsWith("%")?r*(Number.parseFloat(t)/100):Number.parseFloat(t);o&&!a&&(c=r-c);const u=Math.abs(n-c);u<=i&&u<l&&(s=c,l=u)}),s}}set snap(e){this.snapValue=null!=e?e:"",this.snapFunction=e?"string"==typeof e?this.toSnapFunction(e):e:uo}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>this.handleResize(e)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){var e;super.disconnectedCallback(),null==(e=this.resizeObserver)||e.unobserve(this)}detectSize(){const{width:e,height:t}=this.getBoundingClientRect();this.size=this.vertical?t:e}percentageToPixels(e){return this.size*(e/100)}pixelsToPercentage(e){return e/this.size*100}handleDrag(e){const t="rtl"===this.localize.dir();this.disabled||(e.cancelable&&e.preventDefault(),co(this,{onMove:(e,n)=>{var r;let i=this.vertical?n:e;"end"===this.primary&&(i=this.size-i),i=null!=(r=this.snapFunction({pos:i,size:this.size,snapThreshold:this.snapThreshold,isRtl:t,vertical:this.vertical}))?r:i,this.position=Bi(this.pixelsToPercentage(i),0,100)},initialEvent:e}))}handleKeyDown(e){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(e.key)){let t=this.position;const n=(e.shiftKey?10:1)*("end"===this.primary?-1:1);if(e.preventDefault(),("ArrowLeft"===e.key&&!this.vertical||"ArrowUp"===e.key&&this.vertical)&&(t-=n),("ArrowRight"===e.key&&!this.vertical||"ArrowDown"===e.key&&this.vertical)&&(t+=n),"Home"===e.key&&(t="end"===this.primary?100:0),"End"===e.key&&(t="end"===this.primary?0:100),"Enter"===e.key)if(this.isCollapsed)t=this.positionBeforeCollapsing,this.isCollapsed=!1;else{const e=this.position;t=0,requestAnimationFrame(()=>{this.isCollapsed=!0,this.positionBeforeCollapsing=e})}this.position=Bi(t,0,100)}}handleResize(e){const{width:t,height:n}=e[0].contentRect;this.size=this.vertical?n:t,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels))}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=!1,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition")}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels)}handleVerticalChange(){this.detectSize()}render(){const e=this.vertical?"gridTemplateRows":"gridTemplateColumns",t=this.vertical?"gridTemplateColumns":"gridTemplateRows",n="rtl"===this.localize.dir(),r=`\n      clamp(\n        0%,\n        clamp(\n          var(--min),\n          ${this.position}% - var(--divider-width) / 2,\n          var(--max)\n        ),\n        calc(100% - var(--divider-width))\n      )\n    `,i="auto";return"end"===this.primary?n&&!this.vertical?this.style[e]=`${r} var(--divider-width) ${i}`:this.style[e]=`${i} var(--divider-width) ${r}`:n&&!this.vertical?this.style[e]=`${i} var(--divider-width) ${r}`:this.style[e]=`${r} var(--divider-width) ${i}`,this.style[t]="",we`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${Gt(this.disabled?void 0:"0")}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term("resize")}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `}};ho.styles=[Be,lo],et([ct(".divider")],ho.prototype,"divider",2),et([ot({type:Number,reflect:!0})],ho.prototype,"position",2),et([ot({attribute:"position-in-pixels",type:Number})],ho.prototype,"positionInPixels",2),et([ot({type:Boolean,reflect:!0})],ho.prototype,"vertical",2),et([ot({type:Boolean,reflect:!0})],ho.prototype,"disabled",2),et([ot()],ho.prototype,"primary",2),et([ot({reflect:!0})],ho.prototype,"snap",1),et([ot({type:Number,attribute:"snap-threshold"})],ho.prototype,"snapThreshold",2),et([At("position")],ho.prototype,"handlePositionChange",1),et([At("positionInPixels")],ho.prototype,"handlePositionInPixelsChange",1),et([At("vertical")],ho.prototype,"handleVerticalChange",1);ho.define("sl-split-panel"),gt({tagName:"sl-split-panel",elementClass:ho,react:d,events:{onSlReposition:"sl-reposition"},displayName:"SlSplitPanel"});var po=F`
  :host {
    display: contents;
  }
`,fo=class extends dt{constructor(){super(...arguments),this.attrOldValue=!1,this.charData=!1,this.charDataOldValue=!1,this.childList=!1,this.disabled=!1,this.handleMutation=e=>{this.emit("sl-mutation",{detail:{mutationList:e}})}}connectedCallback(){super.connectedCallback(),this.mutationObserver=new MutationObserver(this.handleMutation),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}startObserver(){const e="string"==typeof this.attr&&this.attr.length>0,t=e&&"*"!==this.attr?this.attr.split(" "):void 0;try{this.mutationObserver.observe(this,{subtree:!0,childList:this.childList,attributes:e,attributeFilter:t,attributeOldValue:this.attrOldValue,characterData:this.charData,characterDataOldValue:this.charDataOldValue})}catch(e){}}stopObserver(){this.mutationObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}handleChange(){this.stopObserver(),this.startObserver()}render(){return we` <slot></slot> `}};fo.styles=[Be,po],et([ot({reflect:!0})],fo.prototype,"attr",2),et([ot({attribute:"attr-old-value",type:Boolean,reflect:!0})],fo.prototype,"attrOldValue",2),et([ot({attribute:"char-data",type:Boolean,reflect:!0})],fo.prototype,"charData",2),et([ot({attribute:"char-data-old-value",type:Boolean,reflect:!0})],fo.prototype,"charDataOldValue",2),et([ot({attribute:"child-list",type:Boolean,reflect:!0})],fo.prototype,"childList",2),et([ot({type:Boolean,reflect:!0})],fo.prototype,"disabled",2),et([At("disabled")],fo.prototype,"handleDisabledChange",1),et([At("attr",{waitUntilFirstUpdate:!0}),At("attr-old-value",{waitUntilFirstUpdate:!0}),At("char-data",{waitUntilFirstUpdate:!0}),At("char-data-old-value",{waitUntilFirstUpdate:!0}),At("childList",{waitUntilFirstUpdate:!0})],fo.prototype,"handleChange",1);fo.define("sl-mutation-observer"),gt({tagName:"sl-mutation-observer",elementClass:fo,react:d,events:{onSlMutation:"sl-mutation"},displayName:"SlMutationObserver"});var mo=F`
  :host {
    --height: 1rem;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);
    --label-color: var(--sl-color-neutral-0);

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset var(--sl-shadow-small);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition:
      400ms width,
      400ms background-color;
    user-select: none;
    -webkit-user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  .progress-bar--indeterminate.progress-bar--rtl .progress-bar__indicator {
    animation-name: indeterminate-rtl;
  }

  @media (forced-colors: active) {
    .progress-bar {
      outline: solid 1px SelectedItem;
      background-color: var(--sl-color-neutral-0);
    }

    .progress-bar__indicator {
      outline: solid 1px SelectedItem;
      background-color: SelectedItem;
    }
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }

  @keyframes indeterminate-rtl {
    0% {
      right: -50%;
      width: 50%;
    }
    75%,
    100% {
      right: 100%;
      width: 50%;
    }
  }
`,go=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.value=0,this.indeterminate=!1,this.label=""}render(){return we`
      <div
        part="base"
        class=${Ut({"progress-bar":!0,"progress-bar--indeterminate":this.indeterminate,"progress-bar--rtl":"rtl"===this.localize.dir()})}
        role="progressbar"
        title=${Gt(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?0:this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${Ki({width:`${this.value}%`})}>
          ${this.indeterminate?"":we` <slot part="label" class="progress-bar__label"></slot> `}
        </div>
      </div>
    `}};go.styles=[Be,mo],et([ot({type:Number,reflect:!0})],go.prototype,"value",2),et([ot({type:Boolean,reflect:!0})],go.prototype,"indeterminate",2),et([ot()],go.prototype,"label",2);go.define("sl-progress-bar"),gt({tagName:"sl-progress-bar",elementClass:go,react:d,events:{},displayName:"SlProgressBar"});var bo=F`
  :host {
    --size: 128px;
    --track-width: 4px;
    --track-color: var(--sl-color-neutral-200);
    --indicator-width: var(--track-width);
    --indicator-color: var(--sl-color-primary-600);
    --indicator-transition-duration: 0.35s;

    display: inline-flex;
  }

  .progress-ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .progress-ring__image {
    width: var(--size);
    height: var(--size);
    rotate: -90deg;
    transform-origin: 50% 50%;
  }

  .progress-ring__track,
  .progress-ring__indicator {
    --radius: calc(var(--size) / 2 - max(var(--track-width), var(--indicator-width)) * 0.5);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    fill: none;
    r: var(--radius);
    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
  }

  .progress-ring__track {
    stroke: var(--track-color);
    stroke-width: var(--track-width);
  }

  .progress-ring__indicator {
    stroke: var(--indicator-color);
    stroke-width: var(--indicator-width);
    stroke-linecap: round;
    transition-property: stroke-dashoffset;
    transition-duration: var(--indicator-transition-duration);
    stroke-dasharray: var(--circumference) var(--circumference);
    stroke-dashoffset: calc(var(--circumference) - var(--percentage) * var(--circumference));
  }

  .progress-ring__label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
  }
`,yo=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.value=0,this.label=""}updated(e){if(super.updated(e),e.has("value")){const e=parseFloat(getComputedStyle(this.indicator).getPropertyValue("r")),t=2*Math.PI*e,n=t-this.value/100*t;this.indicatorOffset=`${n}px`}}render(){return we`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-describedby="label"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style="--percentage: ${this.value/100}"
      >
        <svg class="progress-ring__image">
          <circle class="progress-ring__track"></circle>
          <circle class="progress-ring__indicator" style="stroke-dashoffset: ${this.indicatorOffset}"></circle>
        </svg>

        <slot id="label" part="label" class="progress-ring__label"></slot>
      </div>
    `}};yo.styles=[Be,bo],et([ct(".progress-ring__indicator")],yo.prototype,"indicator",2),et([at()],yo.prototype,"indicatorOffset",2),et([ot({type:Number,reflect:!0})],yo.prototype,"value",2),et([ot()],yo.prototype,"label",2);yo.define("sl-progress-ring"),gt({tagName:"sl-progress-ring",elementClass:yo,react:d,events:{},displayName:"SlProgressRing"});var vo=F`
  :host {
    display: inline-block;
  }
`;let wo=null;class ko{}ko.render=function(e,t){wo(e,t)},self.QrCreator=ko,function(e){function t(t,n,r,i){var o={},a=e(r,n);a.u(t),a.J(),i=i||0;var s=a.h(),l=a.h()+2*i;return o.text=t,o.level=n,o.version=r,o.O=l,o.a=function(e,t){return t-=i,!(0>(e-=i)||e>=s||0>t||t>=s)&&a.a(e,t)},o}function n(e,t,n,r,i,o,a,s,l,c){function u(t,n,r,i,a,s,l){t?(e.lineTo(n+s,r+l),e.arcTo(n,r,i,a,o)):e.lineTo(n,r)}a?e.moveTo(t+o,n):e.moveTo(t,n),u(s,r,n,r,i,-o,0),u(l,r,i,t,i,0,-o),u(c,t,i,t,n,o,0),u(a,t,n,r,n,0,o)}function r(e,t,n,r,i,o,a,s,l,c){function u(t,n,r,i){e.moveTo(t+r,n),e.lineTo(t,n),e.lineTo(t,n+i),e.arcTo(t,n,t+r,n,o)}a&&u(t,n,o,o),s&&u(r,n,-o,o),l&&u(r,i,-o,-o),c&&u(t,i,o,-o)}function i(e,i){e:{var o=i.text,a=i.v,s=i.N,l=i.K,c=i.P;for(s=Math.max(1,s||1),l=Math.min(40,l||40);s<=l;s+=1)try{var u=t(o,a,s,c);break e}catch(e){}u=void 0}if(!u)return null;for(o=e.getContext("2d"),i.background&&(o.fillStyle=i.background,o.fillRect(i.left,i.top,i.size,i.size)),a=u.O,l=i.size/a,o.beginPath(),c=0;c<a;c+=1)for(s=0;s<a;s+=1){var d=o,h=i.left+s*l,p=i.top+c*l,f=c,m=s,g=u.a,b=h+l,y=p+l,v=f-1,w=f+1,k=m-1,x=m+1,_=Math.floor(Math.min(.5,Math.max(0,i.R))*l),S=g(f,m),C=g(v,k),E=g(v,m);v=g(v,x);var z=g(f,x);x=g(w,x),m=g(w,m),w=g(w,k),f=g(f,k),h=Math.round(h),p=Math.round(p),b=Math.round(b),y=Math.round(y),S?n(d,h,p,b,y,_,!E&&!f,!E&&!z,!m&&!z,!m&&!f):r(d,h,p,b,y,_,E&&f&&C,E&&z&&v,m&&z&&x,m&&f&&w)}return function(e,t){var n=t.fill;if("string"==typeof n)e.fillStyle=n;else{var r=n.type,i=n.colorStops;if(n=n.position.map(e=>Math.round(e*t.size)),"linear-gradient"===r)var o=e.createLinearGradient.apply(e,n);else{if("radial-gradient"!==r)throw Error("Unsupported fill");o=e.createRadialGradient.apply(e,n)}i.forEach(([e,t])=>{o.addColorStop(e,t)}),e.fillStyle=o}}(o,i),o.fill(),e}var o={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};wo=function(e,t){var n={};Object.assign(n,o,e),n.N=n.minVersion,n.K=n.maxVersion,n.v=n.ecLevel,n.left=n.left,n.top=n.top,n.size=n.size,n.fill=n.fill,n.background=n.background,n.text=n.text,n.R=n.radius,n.P=n.quiet,t instanceof HTMLCanvasElement?(t.width===n.size&&t.height===n.size||(t.width=n.size,t.height=n.size),t.getContext("2d").clearRect(0,0,t.width,t.height),i(t,n)):((e=document.createElement("canvas")).width=n.size,e.height=n.size,n=i(e,n),t.appendChild(n))}}(function(){function e(i,a){function s(e,t){for(var n=-1;7>=n;n+=1)if(!(-1>=e+n||d<=e+n))for(var r=-1;7>=r;r+=1)-1>=t+r||d<=t+r||(u[e+n][t+r]=0<=n&&6>=n&&(0==r||6==r)||0<=r&&6>=r&&(0==n||6==n)||2<=n&&4>=n&&2<=r&&4>=r)}function l(e,n){for(var a=d=4*i+17,l=Array(a),f=0;f<a;f+=1){l[f]=Array(a);for(var m=0;m<a;m+=1)l[f][m]=null}for(u=l,s(0,0),s(d-7,0),s(0,d-7),a=r.G(i),l=0;l<a.length;l+=1)for(f=0;f<a.length;f+=1){m=a[l];var g=a[f];if(null==u[m][g])for(var b=-2;2>=b;b+=1)for(var y=-2;2>=y;y+=1)u[m+b][g+y]=-2==b||2==b||-2==y||2==y||0==b&&0==y}for(a=8;a<d-8;a+=1)null==u[a][6]&&(u[a][6]=0==a%2);for(a=8;a<d-8;a+=1)null==u[6][a]&&(u[6][a]=0==a%2);for(a=r.w(c<<3|n),l=0;15>l;l+=1)f=!e&&1==(a>>l&1),u[6>l?l:8>l?l+1:d-15+l][8]=f,u[8][8>l?d-l-1:9>l?15-l:14-l]=f;if(u[d-8][8]=!e,7<=i){for(a=r.A(i),l=0;18>l;l+=1)f=!e&&1==(a>>l&1),u[Math.floor(l/3)][l%3+d-8-3]=f;for(l=0;18>l;l+=1)f=!e&&1==(a>>l&1),u[l%3+d-8-3][Math.floor(l/3)]=f}if(null==h){for(e=o.I(i,c),a=function(){var e=[],t=0,n={B:function(){return e},c:function(t){return 1==(e[Math.floor(t/8)]>>>7-t%8&1)},put:function(e,t){for(var r=0;r<t;r+=1)n.m(1==(e>>>t-r-1&1))},f:function(){return t},m:function(n){var r=Math.floor(t/8);e.length<=r&&e.push(0),n&&(e[r]|=128>>>t%8),t+=1}};return n}(),l=0;l<p.length;l+=1)f=p[l],a.put(4,4),a.put(f.b(),r.f(4,i)),f.write(a);for(l=f=0;l<e.length;l+=1)f+=e[l].j;if(a.f()>8*f)throw Error("code length overflow. ("+a.f()+">"+8*f+")");for(a.f()+4<=8*f&&a.put(0,4);0!=a.f()%8;)a.m(!1);for(;!(a.f()>=8*f)&&(a.put(236,8),!(a.f()>=8*f));)a.put(17,8);var v=0;for(f=l=0,m=Array(e.length),g=Array(e.length),b=0;b<e.length;b+=1){var w=e[b].j,k=e[b].o-w;for(l=Math.max(l,w),f=Math.max(f,k),m[b]=Array(w),y=0;y<m[b].length;y+=1)m[b][y]=255&a.B()[y+v];for(v+=w,y=r.C(k),w=t(m[b],y.b()-1).l(y),g[b]=Array(y.b()-1),y=0;y<g[b].length;y+=1)k=y+w.b()-g[b].length,g[b][y]=0<=k?w.c(k):0}for(y=a=0;y<e.length;y+=1)a+=e[y].o;for(a=Array(a),y=v=0;y<l;y+=1)for(b=0;b<e.length;b+=1)y<m[b].length&&(a[v]=m[b][y],v+=1);for(y=0;y<f;y+=1)for(b=0;b<e.length;b+=1)y<g[b].length&&(a[v]=g[b][y],v+=1);h=a}for(e=h,a=-1,l=d-1,f=7,m=0,n=r.F(n),g=d-1;0<g;g-=2)for(6==g&&--g;;){for(b=0;2>b;b+=1)null==u[l][g-b]&&(y=!1,m<e.length&&(y=1==(e[m]>>>f&1)),n(l,g-b)&&(y=!y),u[l][g-b]=y,-1==--f&&(m+=1,f=7));if(0>(l+=a)||d<=l){l-=a,a=-a;break}}}var c=n[a],u=null,d=0,h=null,p=[],f={u:function(t){t=function(t){var n=e.s(t);return{S:function(){return 4},b:function(){return n.length},write:function(e){for(var t=0;t<n.length;t+=1)e.put(n[t],8)}}}(t),p.push(t),h=null},a:function(e,t){if(0>e||d<=e||0>t||d<=t)throw Error(e+","+t);return u[e][t]},h:function(){return d},J:function(){for(var e=0,t=0,n=0;8>n;n+=1){l(!0,n);var i=r.D(f);(0==n||e>i)&&(e=i,t=n)}l(!1,t)}};return f}function t(e,n){if(void 0===e.length)throw Error(e.length+"/"+n);var r=function(){for(var t=0;t<e.length&&0==e[t];)t+=1;for(var r=Array(e.length-t+n),i=0;i<e.length-t;i+=1)r[i]=e[i+t];return r}(),o={c:function(e){return r[e]},b:function(){return r.length},multiply:function(e){for(var n=Array(o.b()+e.b()-1),r=0;r<o.b();r+=1)for(var a=0;a<e.b();a+=1)n[r+a]^=i.i(i.g(o.c(r))+i.g(e.c(a)));return t(n,0)},l:function(e){if(0>o.b()-e.b())return o;for(var n=i.g(o.c(0))-i.g(e.c(0)),r=Array(o.b()),a=0;a<o.b();a+=1)r[a]=o.c(a);for(a=0;a<e.b();a+=1)r[a]^=i.i(i.g(e.c(a))+n);return t(r,0).l(e)}};return o}e.s=function(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);128>r?t.push(r):2048>r?t.push(192|r>>6,128|63&r):55296>r||57344<=r?t.push(224|r>>12,128|r>>6&63,128|63&r):(n++,r=65536+((1023&r)<<10|1023&e.charCodeAt(n)),t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r))}return t};var n={L:1,M:0,Q:3,H:2},r=function(){function e(e){for(var t=0;0!=e;)t+=1,e>>>=1;return t}var n=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],r={w:function(t){for(var n=t<<10;0<=e(n)-e(1335);)n^=1335<<e(n)-e(1335);return 21522^(t<<10|n)},A:function(t){for(var n=t<<12;0<=e(n)-e(7973);)n^=7973<<e(n)-e(7973);return t<<12|n},G:function(e){return n[e-1]},F:function(e){switch(e){case 0:return function(e,t){return 0==(e+t)%2};case 1:return function(e){return 0==e%2};case 2:return function(e,t){return 0==t%3};case 3:return function(e,t){return 0==(e+t)%3};case 4:return function(e,t){return 0==(Math.floor(e/2)+Math.floor(t/3))%2};case 5:return function(e,t){return 0==e*t%2+e*t%3};case 6:return function(e,t){return 0==(e*t%2+e*t%3)%2};case 7:return function(e,t){return 0==(e*t%3+(e+t)%2)%2};default:throw Error("bad maskPattern:"+e)}},C:function(e){for(var n=t([1],0),r=0;r<e;r+=1)n=n.multiply(t([1,i.i(r)],0));return n},f:function(e,t){if(4!=e||1>t||40<t)throw Error("mode: "+e+"; type: "+t);return 10>t?8:16},D:function(e){for(var t=e.h(),n=0,r=0;r<t;r+=1)for(var i=0;i<t;i+=1){for(var o=0,a=e.a(r,i),s=-1;1>=s;s+=1)if(!(0>r+s||t<=r+s))for(var l=-1;1>=l;l+=1)0>i+l||t<=i+l||(0!=s||0!=l)&&a==e.a(r+s,i+l)&&(o+=1);5<o&&(n+=3+o-5)}for(r=0;r<t-1;r+=1)for(i=0;i<t-1;i+=1)o=0,e.a(r,i)&&(o+=1),e.a(r+1,i)&&(o+=1),e.a(r,i+1)&&(o+=1),e.a(r+1,i+1)&&(o+=1),(0==o||4==o)&&(n+=3);for(r=0;r<t;r+=1)for(i=0;i<t-6;i+=1)e.a(r,i)&&!e.a(r,i+1)&&e.a(r,i+2)&&e.a(r,i+3)&&e.a(r,i+4)&&!e.a(r,i+5)&&e.a(r,i+6)&&(n+=40);for(i=0;i<t;i+=1)for(r=0;r<t-6;r+=1)e.a(r,i)&&!e.a(r+1,i)&&e.a(r+2,i)&&e.a(r+3,i)&&e.a(r+4,i)&&!e.a(r+5,i)&&e.a(r+6,i)&&(n+=40);for(i=o=0;i<t;i+=1)for(r=0;r<t;r+=1)e.a(r,i)&&(o+=1);return n+Math.abs(100*o/t/t-50)/5*10}};return r}(),i=function(){for(var e=Array(256),t=Array(256),n=0;8>n;n+=1)e[n]=1<<n;for(n=8;256>n;n+=1)e[n]=e[n-4]^e[n-5]^e[n-6]^e[n-8];for(n=0;255>n;n+=1)t[e[n]]=n;return{g:function(e){if(1>e)throw Error("glog("+e+")");return t[e]},i:function(t){for(;0>t;)t+=255;for(;256<=t;)t-=255;return e[t]}}}(),o=function(){function e(e,r){switch(r){case n.L:return t[4*(e-1)];case n.M:return t[4*(e-1)+1];case n.Q:return t[4*(e-1)+2];case n.H:return t[4*(e-1)+3]}}var t=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],r={I:function(t,n){var r=e(t,n);if(void 0===r)throw Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+n);t=r.length/3,n=[];for(var i=0;i<t;i+=1)for(var o=r[3*i],a=r[3*i+1],s=r[3*i+2],l=0;l<o;l+=1){var c=s,u={};u.o=a,u.j=c,n.push(u)}return n}};return r}();return e}());const xo=QrCreator;var _o=class extends dt{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H"}firstUpdated(){this.generate()}generate(){this.hasUpdated&&xo.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:2*this.size},this.canvas)}render(){var e;return we`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${(null==(e=this.label)?void 0:e.length)>0?this.label:this.value}
        style=${Ki({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};_o.styles=[Be,vo],et([ct("canvas")],_o.prototype,"canvas",2),et([ot()],_o.prototype,"value",2),et([ot()],_o.prototype,"label",2),et([ot({type:Number})],_o.prototype,"size",2),et([ot()],_o.prototype,"fill",2),et([ot()],_o.prototype,"background",2),et([ot({type:Number})],_o.prototype,"radius",2),et([ot({attribute:"error-correction"})],_o.prototype,"errorCorrection",2),et([At(["background","errorCorrection","fill","radius","size","value"])],_o.prototype,"generate",1);_o.define("sl-qr-code"),gt({tagName:"sl-qr-code",elementClass:_o,react:d,events:{},displayName:"SlQrCode"});var So=F`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`,Co=F`
  ${So}

  .button__prefix,
  .button__suffix,
  .button__label {
    display: inline-flex;
    position: relative;
    align-items: center;
  }

  /* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
    We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
  .hidden-input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: dotted 1px red;
    opacity: 0;
    z-index: -1;
  }
`,Eo=class extends dt{constructor(){super(...arguments),this.hasSlotController=new Vn(this,"[default]","prefix","suffix"),this.hasFocus=!1,this.checked=!1,this.disabled=!1,this.size="medium",this.pill=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleClick(e){if(this.disabled)return e.preventDefault(),void e.stopPropagation();this.checked=!0}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(e){this.input.focus(e)}blur(){this.input.blur()}render(){return Kt`
      <div part="base" role="presentation">
        <button
          part="${"button"+(this.checked?" button--checked":"")}"
          role="radio"
          aria-checked="${this.checked}"
          class=${Ut({button:!0,"button--default":!0,"button--small":"small"===this.size,"button--medium":"medium"===this.size,"button--large":"large"===this.size,"button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":!0,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
          aria-disabled=${this.disabled}
          type="button"
          value=${Gt(this.value)}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `}};Eo.styles=[Be,Co],et([ct(".button")],Eo.prototype,"input",2),et([ct(".hidden-input")],Eo.prototype,"hiddenInput",2),et([at()],Eo.prototype,"hasFocus",2),et([ot({type:Boolean,reflect:!0})],Eo.prototype,"checked",2),et([ot()],Eo.prototype,"value",2),et([ot({type:Boolean,reflect:!0})],Eo.prototype,"disabled",2),et([ot({reflect:!0})],Eo.prototype,"size",2),et([ot({type:Boolean,reflect:!0})],Eo.prototype,"pill",2),et([At("disabled",{waitUntilFirstUpdate:!0})],Eo.prototype,"handleDisabledChange",1);Eo.define("sl-radio-button"),gt({tagName:"sl-radio-button",elementClass:Eo,react:d,events:{onSlBlur:"sl-blur",onSlFocus:"sl-focus"},displayName:"SlRadioButton"});var zo=F`
  :host {
    display: block;
  }

  :host(:focus-visible) {
    outline: 0px;
  }

  .radio {
    display: inline-flex;
    align-items: top;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .radio--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .radio--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .radio__checked-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 50%;
    background-color: var(--sl-input-background-color);
    color: transparent;
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  :host(:focus-visible) .radio__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }
`,Ao=class extends dt{constructor(){super(),this.checked=!1,this.hasFocus=!1,this.size="medium",this.disabled=!1,this.handleBlur=()=>{this.hasFocus=!1,this.emit("sl-blur")},this.handleClick=()=>{this.disabled||(this.checked=!0)},this.handleFocus=()=>{this.hasFocus=!0,this.emit("sl-focus")},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}render(){return we`
      <span
        part="base"
        class=${Ut({radio:!0,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":"small"===this.size,"radio--medium":"medium"===this.size,"radio--large":"large"===this.size})}
      >
        <span part="${"control"+(this.checked?" control--checked":"")}" class="radio__control">
          ${this.checked?we` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};Ao.styles=[Be,zo],Ao.dependencies={"sl-icon":It},et([at()],Ao.prototype,"checked",2),et([at()],Ao.prototype,"hasFocus",2),et([ot()],Ao.prototype,"value",2),et([ot({reflect:!0})],Ao.prototype,"size",2),et([ot({type:Boolean,reflect:!0})],Ao.prototype,"disabled",2),et([At("checked")],Ao.prototype,"handleCheckedChange",1),et([At("disabled",{waitUntilFirstUpdate:!0})],Ao.prototype,"handleDisabledChange",1);Ao.define("sl-radio"),gt({tagName:"sl-radio",elementClass:Ao,react:d,events:{onSlBlur:"sl-blur",onSlFocus:"sl-focus"},displayName:"SlRadio"});var $o=F`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-active-offset: 0%;
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    --percent: 0%;
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
    margin: 0;

    background-image: linear-gradient(
      to right,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  .range--rtl .range__control {
    background-image: linear-gradient(
      to left,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-moz-range-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control:focus-visible {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }

  @media (forced-colors: active) {
    .range__control,
    .range__tooltip {
      border: solid 1px transparent;
    }

    .range__control::-webkit-slider-thumb {
      border: solid 1px transparent;
    }

    .range__control::-moz-range-thumb {
      border: solid 1px transparent;
    }

    .range__tooltip:after {
      display: none;
    }
  }
`,To=class extends dt{constructor(){super(...arguments),this.formControlController=new In(this),this.hasSlotController=new Vn(this,"help-text","label"),this.localize=new ln(this),this.hasFocus=!1,this.hasTooltip=!1,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=!1,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=e=>e.toString(),this.form="",this.defaultValue=0}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){var e;super.disconnectedCallback(),null==(e=this.resizeObserver)||e.unobserve(this.input)}handleChange(){this.emit("sl-change")}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange()}handleBlur(){this.hasFocus=!1,this.hasTooltip=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.hasTooltip=!0,this.emit("sl-focus")}handleThumbDragStart(){this.hasTooltip=!0}handleThumbDragEnd(){this.hasTooltip=!1}syncProgress(e){this.input.style.setProperty("--percent",100*e+"%")}syncTooltip(e){if(null!==this.output){const t=this.input.offsetWidth,n=this.output.offsetWidth,r=getComputedStyle(this.input).getPropertyValue("--thumb-size"),i=t*e;if("rtl"===this.localize.dir()){const o=`${t-i}px + ${e} * ${r}`;this.output.style.translate=`calc((${o} - ${n/2}px - ${r} / 2))`}else{const t=`${i}px - ${e} * ${r}`;this.output.style.translate=`calc(${t} - ${n/2}px + ${r} / 2)`}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}syncRange(){const e=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(e),"none"!==this.tooltip&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(e))}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}focus(e){this.input.focus(e)}blur(){this.input.blur()}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),n=!!this.label||!!e,r=!!this.helpText||!!t;return we`
      <div
        part="form-control"
        class=${Ut({"form-control":!0,"form-control--medium":!0,"form-control--has-label":n,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${n?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${Ut({range:!0,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":"rtl"===this.localize.dir(),"range--tooltip-visible":this.hasTooltip,"range--tooltip-top":"top"===this.tooltip,"range--tooltip-bottom":"bottom"===this.tooltip})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title}
              type="range"
              name=${Gt(this.name)}
              ?disabled=${this.disabled}
              min=${Gt(this.min)}
              max=${Gt(this.max)}
              step=${Gt(this.step)}
              .value=${Rn(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${"none"===this.tooltip||this.disabled?"":we`
                  <output part="tooltip" class="range__tooltip">
                    ${"function"==typeof this.tooltipFormatter?this.tooltipFormatter(this.value):this.value}
                  </output>
                `}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};To.styles=[Be,$n,$o],et([ct(".range__control")],To.prototype,"input",2),et([ct(".range__tooltip")],To.prototype,"output",2),et([at()],To.prototype,"hasFocus",2),et([at()],To.prototype,"hasTooltip",2),et([ot()],To.prototype,"title",2),et([ot()],To.prototype,"name",2),et([ot({type:Number})],To.prototype,"value",2),et([ot()],To.prototype,"label",2),et([ot({attribute:"help-text"})],To.prototype,"helpText",2),et([ot({type:Boolean,reflect:!0})],To.prototype,"disabled",2),et([ot({type:Number})],To.prototype,"min",2),et([ot({type:Number})],To.prototype,"max",2),et([ot({type:Number})],To.prototype,"step",2),et([ot()],To.prototype,"tooltip",2),et([ot({attribute:!1})],To.prototype,"tooltipFormatter",2),et([ot({reflect:!0})],To.prototype,"form",2),et([An()],To.prototype,"defaultValue",2),et([st({passive:!0})],To.prototype,"handleThumbDragStart",1),et([At("value",{waitUntilFirstUpdate:!0})],To.prototype,"handleValueChange",1),et([At("disabled",{waitUntilFirstUpdate:!0})],To.prototype,"handleDisabledChange",1),et([At("hasTooltip",{waitUntilFirstUpdate:!0})],To.prototype,"syncRange",1);To.define("sl-range"),gt({tagName:"sl-range",elementClass:To,react:d,events:{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlFocus:"sl-focus",onSlInput:"sl-input",onSlInvalid:"sl-invalid"},displayName:"SlRange"});var Po=F`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`,Mo=F`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,Lo=class extends dt{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(e){const t=Do(e.target);null==t||t.toggleAttribute("data-sl-button-group__button--focus",!0)}handleBlur(e){const t=Do(e.target);null==t||t.toggleAttribute("data-sl-button-group__button--focus",!1)}handleMouseOver(e){const t=Do(e.target);null==t||t.toggleAttribute("data-sl-button-group__button--hover",!0)}handleMouseOut(e){const t=Do(e.target);null==t||t.toggleAttribute("data-sl-button-group__button--hover",!1)}handleSlotChange(){const e=[...this.defaultSlot.assignedElements({flatten:!0})];e.forEach(t=>{const n=e.indexOf(t),r=Do(t);r&&(r.toggleAttribute("data-sl-button-group__button",!0),r.toggleAttribute("data-sl-button-group__button--first",0===n),r.toggleAttribute("data-sl-button-group__button--inner",n>0&&n<e.length-1),r.toggleAttribute("data-sl-button-group__button--last",n===e.length-1),r.toggleAttribute("data-sl-button-group__button--radio","sl-radio-button"===r.tagName.toLowerCase()))})}render(){return we`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};function Do(e){var t;const n="sl-button, sl-radio-button";return null!=(t=e.closest(n))?t:e.querySelector(n)}Lo.styles=[Be,Mo],et([ct("slot")],Lo.prototype,"defaultSlot",2),et([at()],Lo.prototype,"disableRole",2),et([ot()],Lo.prototype,"label",2);var Io=class extends dt{constructor(){super(...arguments),this.formControlController=new In(this),this.hasSlotController=new Vn(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=!1,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=!1}get validity(){const e=this.required&&!this.value;return""!==this.customValidityMessage?Fn:e?On:Nn}get validationMessage(){const e=this.required&&!this.value;return""!==this.customValidityMessage?this.customValidityMessage:e?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value}firstUpdated(){this.formControlController.updateValidity()}getAllRadios(){return[...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(e){const t=e.target.closest("sl-radio, sl-radio-button"),n=this.getAllRadios(),r=this.value;t&&!t.disabled&&(this.value=t.value,n.forEach(e=>e.checked=e===t),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")))}handleKeyDown(e){var t;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key))return;const n=this.getAllRadios().filter(e=>!e.disabled),r=null!=(t=n.find(e=>e.checked))?t:n[0],i=" "===e.key?0:["ArrowUp","ArrowLeft"].includes(e.key)?-1:1,o=this.value;let a=n.indexOf(r)+i;a<0&&(a=n.length-1),a>n.length-1&&(a=0),this.getAllRadios().forEach(e=>{e.checked=!1,this.hasButtonGroup||e.setAttribute("tabindex","-1")}),this.value=n[a].value,n[a].checked=!0,this.hasButtonGroup?n[a].shadowRoot.querySelector("button").focus():(n[a].setAttribute("tabindex","0"),n[a].focus()),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input")),e.preventDefault()}handleLabelClick(){this.focus()}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}async syncRadioElements(){var e,t;const n=this.getAllRadios();if(await Promise.all(n.map(async e=>{await e.updateComplete,e.checked=e.value===this.value,e.size=this.size})),this.hasButtonGroup=n.some(e=>"sl-radio-button"===e.tagName.toLowerCase()),n.length>0&&!n.some(e=>e.checked))if(this.hasButtonGroup){const t=null==(e=n[0].shadowRoot)?void 0:e.querySelector("button");t&&t.setAttribute("tabindex","0")}else n[0].setAttribute("tabindex","0");if(this.hasButtonGroup){const e=null==(t=this.shadowRoot)?void 0:t.querySelector("sl-button-group");e&&(e.disableRole=!0)}}syncRadios(){customElements.get("sl-radio")&&customElements.get("sl-radio-button")?this.syncRadioElements():(customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios()))}updateCheckedRadio(){this.getAllRadios().forEach(e=>e.checked=e.value===this.value),this.formControlController.setValidity(this.validity.valid)}handleSizeChange(){this.syncRadios()}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio()}checkValidity(){const e=this.required&&!this.value,t=""!==this.customValidityMessage;return!e&&!t||(this.formControlController.emitInvalidEvent(),!1)}getForm(){return this.formControlController.getForm()}reportValidity(){const e=this.validity.valid;return this.errorMessage=this.customValidityMessage||e?"":this.validationInput.validationMessage,this.formControlController.setValidity(e),this.validationInput.hidden=!0,clearTimeout(this.validationTimeout),e||(this.validationInput.hidden=!1,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=!0,1e4)),e}setCustomValidity(e=""){this.customValidityMessage=e,this.errorMessage=e,this.validationInput.setCustomValidity(e),this.formControlController.updateValidity()}focus(e){const t=this.getAllRadios(),n=t.find(e=>e.checked),r=t.find(e=>!e.disabled),i=n||r;i&&i.focus(e)}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),n=!!this.label||!!e,r=!!this.helpText||!!t,i=we`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return we`
      <fieldset
        part="form-control"
        class=${Ut({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--radio-group":!0,"form-control--has-label":n,"form-control--has-help-text":r})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${n?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup?we`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${i}
                </sl-button-group>
              `:i}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `}};Io.styles=[Be,$n,Po],Io.dependencies={"sl-button-group":Lo},et([ct("slot:not([name])")],Io.prototype,"defaultSlot",2),et([ct(".radio-group__validation-input")],Io.prototype,"validationInput",2),et([at()],Io.prototype,"hasButtonGroup",2),et([at()],Io.prototype,"errorMessage",2),et([at()],Io.prototype,"defaultValue",2),et([ot()],Io.prototype,"label",2),et([ot({attribute:"help-text"})],Io.prototype,"helpText",2),et([ot()],Io.prototype,"name",2),et([ot({reflect:!0})],Io.prototype,"value",2),et([ot({reflect:!0})],Io.prototype,"size",2),et([ot({reflect:!0})],Io.prototype,"form",2),et([ot({type:Boolean,reflect:!0})],Io.prototype,"required",2),et([At("size",{waitUntilFirstUpdate:!0})],Io.prototype,"handleSizeChange",1),et([At("value")],Io.prototype,"handleValueChange",1);Io.define("sl-radio-group"),gt({tagName:"sl-radio-group",elementClass:Io,react:d,events:{onSlChange:"sl-change",onSlInput:"sl-input",onSlInvalid:"sl-invalid"},displayName:"SlRadioGroup"});var No=F`
  :host {
    --divider-width: 2px;
    --handle-size: 2.5rem;

    display: inline-block;
    position: relative;
  }

  .image-comparer {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .image-comparer__before,
  .image-comparer__after {
    display: block;
    pointer-events: none;
  }

  .image-comparer__before::slotted(img),
  .image-comparer__after::slotted(img),
  .image-comparer__before::slotted(svg),
  .image-comparer__after::slotted(svg) {
    display: block;
    max-width: 100% !important;
    height: auto;
  }

  .image-comparer__after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .image-comparer__divider {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: var(--divider-width);
    height: 100%;
    background-color: var(--sl-color-neutral-0);
    translate: calc(var(--divider-width) / -2);
    cursor: ew-resize;
  }

  .image-comparer__handle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - (var(--handle-size) / 2));
    width: var(--handle-size);
    height: var(--handle-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: var(--sl-border-radius-circle);
    font-size: calc(var(--handle-size) * 0.5);
    color: var(--sl-color-neutral-700);
    cursor: inherit;
    z-index: 10;
  }

  .image-comparer__handle:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }
`,Oo=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.position=50}handleDrag(e){const{width:t}=this.base.getBoundingClientRect(),n="rtl"===this.localize.dir();e.preventDefault(),co(this.base,{onMove:e=>{this.position=parseFloat(Bi(e/t*100,0,100).toFixed(2)),n&&(this.position=100-this.position)},initialEvent:e})}handleKeyDown(e){const t="ltr"===this.localize.dir(),n="rtl"===this.localize.dir();if(["ArrowLeft","ArrowRight","Home","End"].includes(e.key)){const r=e.shiftKey?10:1;let i=this.position;e.preventDefault(),(t&&"ArrowLeft"===e.key||n&&"ArrowRight"===e.key)&&(i-=r),(t&&"ArrowRight"===e.key||n&&"ArrowLeft"===e.key)&&(i+=r),"Home"===e.key&&(i=0),"End"===e.key&&(i=100),i=Bi(i,0,100),this.position=i}}handlePositionChange(){this.emit("sl-change")}render(){const e="rtl"===this.localize.dir();return we`
      <div
        part="base"
        id="image-comparer"
        class=${Ut({"image-comparer":!0,"image-comparer--rtl":e})}
        @keydown=${this.handleKeyDown}
      >
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before"></slot>
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style=${Ki({clipPath:e?`inset(0 0 0 ${100-this.position}%)`:`inset(0 ${100-this.position}% 0 0)`})}
          >
            <slot name="after"></slot>
          </div>
        </div>

        <div
          part="divider"
          class="image-comparer__divider"
          style=${Ki({left:e?100-this.position+"%":`${this.position}%`})}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <div
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow=${this.position}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-controls="image-comparer"
            tabindex="0"
          >
            <slot name="handle">
              <sl-icon library="system" name="grip-vertical"></sl-icon>
            </slot>
          </div>
        </div>
      </div>
    `}};Oo.styles=[Be,No],Oo.scopedElement={"sl-icon":It},et([ct(".image-comparer")],Oo.prototype,"base",2),et([ct(".image-comparer__handle")],Oo.prototype,"handle",2),et([ot({type:Number,reflect:!0})],Oo.prototype,"position",2),et([At("position",{waitUntilFirstUpdate:!0})],Oo.prototype,"handlePositionChange",1);Oo.define("sl-image-comparer"),gt({tagName:"sl-image-comparer",elementClass:Oo,react:d,events:{onSlChange:"sl-change"},displayName:"SlImageComparer"});var Fo=F`
  :host {
    display: block;
  }
`,Vo=new Map;var Ro=class extends dt{constructor(){super(...arguments),this.mode="cors",this.allowScripts=!1}executeScript(e){const t=document.createElement("script");[...e.attributes].forEach(e=>t.setAttribute(e.name,e.value)),t.textContent=e.textContent,e.parentNode.replaceChild(t,e)}async handleSrcChange(){try{const e=this.src,t=await function(e,t="cors"){const n=Vo.get(e);if(void 0!==n)return Promise.resolve(n);const r=fetch(e,{mode:t}).then(async t=>{const n={ok:t.ok,status:t.status,html:await t.text()};return Vo.set(e,n),n});return Vo.set(e,r),r}(e,this.mode);if(e!==this.src)return;if(!t.ok)return void this.emit("sl-error",{detail:{status:t.status}});this.innerHTML=t.html,this.allowScripts&&[...this.querySelectorAll("script")].forEach(e=>this.executeScript(e)),this.emit("sl-load")}catch(e){this.emit("sl-error",{detail:{status:-1}})}}render(){return we`<slot></slot>`}};Ro.styles=[Be,Fo],et([ot()],Ro.prototype,"src",2),et([ot()],Ro.prototype,"mode",2),et([ot({attribute:"allow-scripts",type:Boolean})],Ro.prototype,"allowScripts",2),et([At("src")],Ro.prototype,"handleSrcChange",1);Ro.define("sl-include"),gt({tagName:"sl-include",elementClass:Ro,react:d,events:{onSlLoad:"sl-load",onSlError:"sl-error"},displayName:"SlInclude"});var Bo=F`
  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,Uo=class extends dt{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(e){const t=["menuitem","menuitemcheckbox"],n=e.composedPath(),r=n.find(e=>{var n;return t.includes((null==(n=null==e?void 0:e.getAttribute)?void 0:n.call(e,"role"))||"")});if(!r)return;if(n.find(e=>{var t;return"menu"===(null==(t=null==e?void 0:e.getAttribute)?void 0:t.call(e,"role"))})!==this)return;const i=r;"checkbox"===i.type&&(i.checked=!i.checked),this.emit("sl-select",{detail:{item:i}})}handleKeyDown(e){if("Enter"===e.key||" "===e.key){const t=this.getCurrentItem();e.preventDefault(),e.stopPropagation(),null==t||t.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(e.key)){const t=this.getAllItems(),n=this.getCurrentItem();let r=n?t.indexOf(n):0;t.length>0&&(e.preventDefault(),e.stopPropagation(),"ArrowDown"===e.key?r++:"ArrowUp"===e.key?r--:"Home"===e.key?r=0:"End"===e.key&&(r=t.length-1),r<0&&(r=t.length-1),r>t.length-1&&(r=0),this.setCurrentItem(t[r]),t[r].focus())}}handleMouseDown(e){const t=e.target;this.isMenuItem(t)&&this.setCurrentItem(t)}handleSlotChange(){const e=this.getAllItems();e.length>0&&this.setCurrentItem(e[0])}isMenuItem(e){var t;return"sl-menu-item"===e.tagName.toLowerCase()||["menuitem","menuitemcheckbox","menuitemradio"].includes(null!=(t=e.getAttribute("role"))?t:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>!(e.inert||!this.isMenuItem(e)))}getCurrentItem(){return this.getAllItems().find(e=>"0"===e.getAttribute("tabindex"))}setCurrentItem(e){this.getAllItems().forEach(t=>{t.setAttribute("tabindex",t===e?"0":"-1")})}render(){return we`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};Uo.styles=[Be,Bo],et([ct("slot")],Uo.prototype,"defaultSlot",2);Uo.define("sl-menu");var Ho=gt({tagName:"sl-menu",elementClass:Uo,react:d,events:{onSlSelect:"sl-select"},displayName:"SlMenu"}),jo=F`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,qo=class extends dt{constructor(){super(...arguments),this.formControlController=new In(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Vn(this,"help-text","label"),this.localize=new ln(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var e;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,(null==(e=this.input)?void 0:e.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(e){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=e,this.value=this.__dateInput.value}get valueAsNumber(){var e;return this.__numberInput.value=this.value,(null==(e=this.input)?void 0:e.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(e){this.__numberInput.valueAsNumber=e,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(e){e.preventDefault(),""!==this.value&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleKeyDown(e){const t=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;"Enter"!==e.key||t||setTimeout(()=>{e.defaultPrevented||e.isComposing||this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(e,t,n="none"){this.input.setSelectionRange(e,t,n)}setRangeText(e,t,n,r="preserve"){const i=null!=t?t:this.input.selectionStart,o=null!=n?n:this.input.selectionEnd;this.input.setRangeText(e,i,o,r),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),n=!!this.label||!!e,r=!!this.helpText||!!t,i=this.clearable&&!this.disabled&&!this.readonly&&("number"==typeof this.value||this.value.length>0);return we`
      <div
        part="form-control"
        class=${Ut({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":n,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${n?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${Ut({input:!0,"input--small":"small"===this.size,"input--medium":"medium"===this.size,"input--large":"large"===this.size,"input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${"password"===this.type&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${Gt(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${Gt(this.placeholder)}
              minlength=${Gt(this.minlength)}
              maxlength=${Gt(this.maxlength)}
              min=${Gt(this.min)}
              max=${Gt(this.max)}
              step=${Gt(this.step)}
              .value=${Rn(this.value)}
              autocapitalize=${Gt(this.autocapitalize)}
              autocomplete=${Gt(this.autocomplete)}
              autocorrect=${Gt(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${Gt(this.pattern)}
              enterkeyhint=${Gt(this.enterkeyhint)}
              inputmode=${Gt(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${i?we`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?we`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?we`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:we`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};qo.styles=[Be,$n,jo],qo.dependencies={"sl-icon":It},et([ct(".input__control")],qo.prototype,"input",2),et([at()],qo.prototype,"hasFocus",2),et([ot()],qo.prototype,"title",2),et([ot({reflect:!0})],qo.prototype,"type",2),et([ot()],qo.prototype,"name",2),et([ot()],qo.prototype,"value",2),et([An()],qo.prototype,"defaultValue",2),et([ot({reflect:!0})],qo.prototype,"size",2),et([ot({type:Boolean,reflect:!0})],qo.prototype,"filled",2),et([ot({type:Boolean,reflect:!0})],qo.prototype,"pill",2),et([ot()],qo.prototype,"label",2),et([ot({attribute:"help-text"})],qo.prototype,"helpText",2),et([ot({type:Boolean})],qo.prototype,"clearable",2),et([ot({type:Boolean,reflect:!0})],qo.prototype,"disabled",2),et([ot()],qo.prototype,"placeholder",2),et([ot({type:Boolean,reflect:!0})],qo.prototype,"readonly",2),et([ot({attribute:"password-toggle",type:Boolean})],qo.prototype,"passwordToggle",2),et([ot({attribute:"password-visible",type:Boolean})],qo.prototype,"passwordVisible",2),et([ot({attribute:"no-spin-buttons",type:Boolean})],qo.prototype,"noSpinButtons",2),et([ot({reflect:!0})],qo.prototype,"form",2),et([ot({type:Boolean,reflect:!0})],qo.prototype,"required",2),et([ot()],qo.prototype,"pattern",2),et([ot({type:Number})],qo.prototype,"minlength",2),et([ot({type:Number})],qo.prototype,"maxlength",2),et([ot()],qo.prototype,"min",2),et([ot()],qo.prototype,"max",2),et([ot()],qo.prototype,"step",2),et([ot()],qo.prototype,"autocapitalize",2),et([ot()],qo.prototype,"autocorrect",2),et([ot()],qo.prototype,"autocomplete",2),et([ot({type:Boolean})],qo.prototype,"autofocus",2),et([ot()],qo.prototype,"enterkeyhint",2),et([ot({type:Boolean,converter:{fromAttribute:e=>!(!e||"false"===e),toAttribute:e=>e?"true":"false"}})],qo.prototype,"spellcheck",2),et([ot()],qo.prototype,"inputmode",2),et([At("disabled",{waitUntilFirstUpdate:!0})],qo.prototype,"handleDisabledChange",1),et([At("step",{waitUntilFirstUpdate:!0})],qo.prototype,"handleStepChange",1),et([At("value",{waitUntilFirstUpdate:!0})],qo.prototype,"handleValueChange",1);qo.define("sl-input");var Wo=gt({tagName:"sl-input",elementClass:qo,react:d,events:{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlClear:"sl-clear",onSlFocus:"sl-focus",onSlInput:"sl-input",onSlInvalid:"sl-invalid"},displayName:"SlInput"}),Ko=F`
  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }

  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;const Go=(e,t)=>{const n=e._$AN;if(void 0===n)return!1;for(const e of n)e._$AO?.(t,!1),Go(e,t);return!0},Qo=e=>{let t,n;do{if(void 0===(t=e._$AM))break;n=t._$AN,n.delete(e),e=t}while(0===n?.size)},Yo=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(void 0===n)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Jo(t)}};function Xo(e){void 0!==this._$AN?(Qo(this),this._$AM=e,Yo(this)):this._$AM=e}function Zo(e,t=!1,n=0){const r=this._$AH,i=this._$AN;if(void 0!==i&&0!==i.size)if(t)if(Array.isArray(r))for(let e=n;e<r.length;e++)Go(r[e],!1),Qo(r[e]);else null!=r&&(Go(r,!1),Qo(r));else Go(this,e)}const Jo=e=>{e.type==Ot&&(e._$AP??=Zo,e._$AQ??=Xo)};class ea extends Bt{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Yo(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Go(this,e),Qo(this))}setValue(e){if($t(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}class ta{}const na=new WeakMap,ra=Rt(class extends ea{render(e){return xe}update(e,[t]){const n=t!==this.G;return n&&void 0!==this.G&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),xe}rt(e){if(this.isConnected||(e=void 0),"function"==typeof this.G){const t=this.ht??globalThis;let n=na.get(t);void 0===n&&(n=new WeakMap,na.set(t,n)),void 0!==n.get(this.G)&&this.G.call(this.ht,void 0),n.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?na.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var ia=class{constructor(e,t){this.popupRef=new ta,this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=e=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${e.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${e.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=e=>{switch(e.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":e.target!==this.host&&(e.preventDefault(),e.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(e)}},this.handleClick=e=>{var t;e.target===this.host?(e.preventDefault(),e.stopPropagation()):e.target instanceof Element&&("sl-menu-item"===e.target.tagName||(null==(t=e.target.role)?void 0:t.startsWith("menuitem")))&&this.disableSubmenu()},this.handleFocusOut=e=>{e.relatedTarget&&e.relatedTarget instanceof Element&&this.host.contains(e.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=e=>{e.stopPropagation()},this.handlePopupReposition=()=>{const e=this.host.renderRoot.querySelector("slot[name='submenu']"),t=null==e?void 0:e.assignedElements({flatten:!0}).filter(e=>"sl-menu"===e.localName)[0],n="rtl"===getComputedStyle(this.host).direction;if(!t)return;const{left:r,top:i,width:o,height:a}=t.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${n?r+o:r}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${i}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${n?r+o:r}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${i+a}px`)},(this.host=e).addController(this),this.hasSlotController=t}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(e){const t=this.host.renderRoot.querySelector("slot[name='submenu']");if(!t)return;let n=null;for(const e of t.assignedElements())if(n=e.querySelectorAll("sl-menu-item, [role^='menuitem']"),0!==n.length)break;if(n&&0!==n.length){n[0].setAttribute("tabindex","0");for(let e=1;e!==n.length;++e)n[e].setAttribute("tabindex","-1");this.popupRef.value&&(e.preventDefault(),e.stopPropagation(),this.popupRef.value.active?n[0]instanceof HTMLElement&&n[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then(()=>{n[0]instanceof HTMLElement&&n[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(e){this.popupRef.value&&this.popupRef.value.active!==e&&(this.popupRef.value.active=e,this.host.requestUpdate())}enableSubmenu(e=!0){e?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(!0)},this.submenuOpenDelay)):this.setSubmenuState(!0)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var e;if(!(null==(e=this.host.parentElement)?void 0:e.computedStyleMap))return;const t=this.host.parentElement.computedStyleMap(),n=["padding-top","border-top-width","margin-top"].reduce((e,n)=>{var r;const i=null!=(r=t.get(n))?r:new CSSUnitValue(0,"px");return e-(i instanceof CSSUnitValue?i:new CSSUnitValue(0,"px")).to("px").value},0);this.skidding=n}isExpanded(){return!!this.popupRef.value&&this.popupRef.value.active}renderSubmenu(){const e="rtl"===getComputedStyle(this.host).direction;return this.isConnected?we`
      <sl-popup
        ${ra(this.popupRef)}
        placement=${e?"left-start":"right-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `:we` <slot name="submenu" hidden></slot> `}},oa=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.hasSlotController=new Vn(this,"submenu"),this.submenuController=new ia(this,this.hasSlotController),this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handleMouseOver=e=>{this.focus(),e.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){const e=this.getTextLabel();void 0!==this.cachedTextLabel?e!==this.cachedTextLabel&&(this.cachedTextLabel=e,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1})):this.cachedTextLabel=e}handleCheckedChange(){this.checked&&"checkbox"!==this.type?this.checked=!1:"checkbox"===this.type?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){"checkbox"===this.type?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return function(e){if(!e)return"";const t=e.assignedNodes({flatten:!0});let n="";return[...t].forEach(e=>{e.nodeType===Node.TEXT_NODE&&(n+=e.textContent)}),n}(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){const e="rtl"===this.localize.dir(),t=this.submenuController.isExpanded();return we`
      <div
        id="anchor"
        part="base"
        class=${Ut({"menu-item":!0,"menu-item--rtl":e,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":t})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!t}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${e?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?we` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};oa.styles=[Be,Ko],oa.dependencies={"sl-icon":It,"sl-popup":yi,"sl-spinner":Ni},et([ct("slot:not([name])")],oa.prototype,"defaultSlot",2),et([ct(".menu-item")],oa.prototype,"menuItem",2),et([ot()],oa.prototype,"type",2),et([ot({type:Boolean,reflect:!0})],oa.prototype,"checked",2),et([ot()],oa.prototype,"value",2),et([ot({type:Boolean,reflect:!0})],oa.prototype,"loading",2),et([ot({type:Boolean,reflect:!0})],oa.prototype,"disabled",2),et([At("checked")],oa.prototype,"handleCheckedChange",1),et([At("disabled")],oa.prototype,"handleDisabledChange",1),et([At("type")],oa.prototype,"handleTypeChange",1);oa.define("sl-menu-item");var aa=gt({tagName:"sl-menu-item",elementClass:oa,react:d,events:{},displayName:"SlMenuItem"}),sa=F`
  :host {
    display: block;
  }

  .menu-label {
    display: inline-block;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-large);
    user-select: none;
    -webkit-user-select: none;
  }
`,la=class extends dt{render(){return we` <slot part="base" class="menu-label"></slot> `}};la.styles=[Be,sa];la.define("sl-menu-label"),gt({tagName:"sl-menu-label",elementClass:la,react:d,events:{},displayName:"SlMenuLabel"});var ca=F`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`,ua=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.isInitialized=!1,this.current=!1,this.selected=!1,this.hasHover=!1,this.value="",this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false")}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{const e=this.closest("sl-select");e&&e.handleDefaultSlotChange()}):this.isInitialized=!0}handleMouseEnter(){this.hasHover=!0}handleMouseLeave(){this.hasHover=!1}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleValueChange(){"string"!=typeof this.value&&(this.value=String(this.value)),this.value.includes(" ")&&(this.value=this.value.replace(/ /g,"_"))}getTextLabel(){const e=this.childNodes;let t="";return[...e].forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&(e.hasAttribute("slot")||(t+=e.textContent)),e.nodeType===Node.TEXT_NODE&&(t+=e.textContent)}),t.trim()}render(){return we`
      <div
        part="base"
        class=${Ut({option:!0,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};ua.styles=[Be,ca],ua.dependencies={"sl-icon":It},et([ct(".option__label")],ua.prototype,"defaultSlot",2),et([at()],ua.prototype,"current",2),et([at()],ua.prototype,"selected",2),et([at()],ua.prototype,"hasHover",2),et([ot({reflect:!0})],ua.prototype,"value",2),et([ot({type:Boolean,reflect:!0})],ua.prototype,"disabled",2),et([At("disabled")],ua.prototype,"handleDisabledChange",1),et([At("selected")],ua.prototype,"handleSelectedChange",1),et([At("value")],ua.prototype,"handleValueChange",1);ua.define("sl-option");var da=gt({tagName:"sl-option",elementClass:ua,react:d,events:{},displayName:"SlOption"});yi.define("sl-popup"),gt({tagName:"sl-popup",elementClass:yi,react:d,events:{onSlReposition:"sl-reposition"},displayName:"SlPopup"});var ha=F`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`,pa=class extends dt{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};pa.styles=[Be,ha],et([ot({type:Boolean,reflect:!0})],pa.prototype,"vertical",2),et([At("vertical")],pa.prototype,"handleVerticalChange",1);pa.define("sl-divider");var fa=gt({tagName:"sl-divider",elementClass:pa,react:d,events:{},displayName:"SlDivider"}),ma=F`
  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-large);
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .drawer__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .drawer__header-actions sl-icon-button,
  .drawer__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .drawer__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    display: none;
  }

  @media (forced-colors: active) {
    .drawer__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;function*ga(e=document.activeElement){var t,n,r,i,o;null!=e&&(yield e,"shadowRoot"in e&&e.shadowRoot&&"closed"!==e.shadowRoot.mode&&(yield*(t=ga(e.shadowRoot.activeElement),r=t[Qe("asyncIterator")],i=!1,o={},null==r?(r=t[Qe("iterator")](),n=e=>o[e]=t=>r[e](t)):(r=r.call(t),n=e=>o[e]=t=>{if(i){if(i=!1,"throw"===e)throw t;return t}return i=!0,{done:!1,value:new nt(new Promise(n=>{var i=r[e](t);i instanceof Object||Ye("Object expected"),n(i)}),1)}}),o[Qe("iterator")]=()=>o,n("next"),"throw"in r?n("throw"):o.throw=e=>{throw e},"return"in r&&n("return"),o)))}function ba(){return[...ga()].pop()}var ya=new WeakMap;function va(e){let t=ya.get(e);return t||(t=window.getComputedStyle(e,null),ya.set(e,t)),t}function wa(e){const t=e.tagName.toLowerCase(),n=Number(e.getAttribute("tabindex"));if(e.hasAttribute("tabindex")&&(isNaN(n)||n<=-1))return!1;if(e.hasAttribute("disabled"))return!1;if(e.closest("[inert]"))return!1;if("input"===t&&"radio"===e.getAttribute("type")){const t=e.getRootNode(),n=`input[type='radio'][name="${e.getAttribute("name")}"]`,r=t.querySelector(`${n}:checked`);if(r)return r===e;return t.querySelector(n)===e}if(!function(e){if("function"==typeof e.checkVisibility)return e.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const t=va(e);return"hidden"!==t.visibility&&"none"!==t.display}(e))return!1;if(("audio"===t||"video"===t)&&e.hasAttribute("controls"))return!0;if(e.hasAttribute("tabindex"))return!0;if(e.hasAttribute("contenteditable")&&"false"!==e.getAttribute("contenteditable"))return!0;return!!["button","input","select","textarea","a","audio","video","summary","iframe"].includes(t)||function(e){const t=va(e),{overflowY:n,overflowX:r}=t;return"scroll"===n||"scroll"===r||"auto"===n&&"auto"===r&&(e.scrollHeight>e.clientHeight&&"auto"===n||!(!(e.scrollWidth>e.clientWidth)||"auto"!==r))}(e)}function ka(e){const t=new WeakMap,n=[];return function r(i){if(i instanceof Element){if(i.hasAttribute("inert")||i.closest("[inert]"))return;if(t.has(i))return;t.set(i,!0),!n.includes(i)&&wa(i)&&n.push(i),i instanceof HTMLSlotElement&&function(e,t){var n;return(null==(n=e.getRootNode({composed:!0}))?void 0:n.host)!==t}(i,e)&&i.assignedElements({flatten:!0}).forEach(e=>{r(e)}),null!==i.shadowRoot&&"open"===i.shadowRoot.mode&&r(i.shadowRoot)}for(const e of i.children)r(e)}(e),n.sort((e,t)=>{const n=Number(e.getAttribute("tabindex"))||0;return(Number(t.getAttribute("tabindex"))||0)-n})}var xa=[],_a=class{constructor(e){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=e=>{var t;if("Tab"!==e.key||this.isExternalActivated)return;if(!this.isActive())return;const n=ba();if(this.previousFocus=n,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;e.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const r=ka(this.element);let i=r.findIndex(e=>e===n);this.previousFocus=this.currentFocus;const o="forward"===this.tabDirection?1:-1;for(;;){i+o>=r.length?i=0:i+o<0?i=r.length-1:i+=o,this.previousFocus=this.currentFocus;const n=r[i];if("backward"===this.tabDirection&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;if(n&&this.possiblyHasTabbableChildren(n))return;e.preventDefault(),this.currentFocus=n,null==(t=this.currentFocus)||t.focus({preventScroll:!1});const a=[...ga()];if(a.includes(this.currentFocus)||!a.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=e,this.elementsWithTabbableControls=["iframe"]}activate(){xa.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){xa=xa.filter(e=>e!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return xa[xa.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const e=ka(this.element);if(!this.element.matches(":focus-within")){const t=e[0],n=e[e.length-1],r="forward"===this.tabDirection?t:n;"function"==typeof(null==r?void 0:r.focus)&&(this.currentFocus=r,r.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(e){return this.elementsWithTabbableControls.includes(e.tagName.toLowerCase())||e.hasAttribute("controls")}},Sa=e=>{var t;const{activeElement:n}=document;n&&e.contains(n)&&(null==(t=document.activeElement)||t.blur())};function Ca(e){return e.charAt(0).toUpperCase()+e.slice(1)}var Ea=class extends dt{constructor(){super(...arguments),this.hasSlotController=new Vn(this,"footer"),this.localize=new ln(this),this.modal=new _a(this),this.open=!1,this.label="",this.placement="end",this.contained=!1,this.noHeader=!1,this.handleDocumentKeyDown=e=>{this.contained||"Escape"===e.key&&this.modal.isActive()&&this.open&&(e.stopImmediatePropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.drawer.hidden=!this.open,this.open&&(this.addOpenListeners(),this.contained||(this.modal.activate(),gn(this)))}disconnectedCallback(){super.disconnectedCallback(),bn(this),this.removeOpenListeners()}requestClose(e){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:e}}).defaultPrevented){const e=_i(this,"drawer.denyClose",{dir:this.localize.dir()});return void Ci(this.panel,e.keyframes,e.options)}this.hide()}addOpenListeners(){var e;"CloseWatcher"in window?(null==(e=this.closeWatcher)||e.destroy(),this.contained||(this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard"))):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var e;document.removeEventListener("keydown",this.handleDocumentKeyDown),null==(e=this.closeWatcher)||e.destroy()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.contained||(this.modal.activate(),gn(this));const e=this.querySelector("[autofocus]");e&&e.removeAttribute("autofocus"),await Promise.all([Ai(this.drawer),Ai(this.overlay)]),this.drawer.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(e?e.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),e&&e.setAttribute("autofocus","")});const t=_i(this,`drawer.show${Ca(this.placement)}`,{dir:this.localize.dir()}),n=_i(this,"drawer.overlay.show",{dir:this.localize.dir()});await Promise.all([Ci(this.panel,t.keyframes,t.options),Ci(this.overlay,n.keyframes,n.options)]),this.emit("sl-after-show")}else{Sa(this),this.emit("sl-hide"),this.removeOpenListeners(),this.contained||(this.modal.deactivate(),bn(this)),await Promise.all([Ai(this.drawer),Ai(this.overlay)]);const e=_i(this,`drawer.hide${Ca(this.placement)}`,{dir:this.localize.dir()}),t=_i(this,"drawer.overlay.hide",{dir:this.localize.dir()});await Promise.all([Ci(this.overlay,t.keyframes,t.options).then(()=>{this.overlay.hidden=!0}),Ci(this.panel,e.keyframes,e.options).then(()=>{this.panel.hidden=!0})]),this.drawer.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1;const n=this.originalTrigger;"function"==typeof(null==n?void 0:n.focus)&&setTimeout(()=>n.focus()),this.emit("sl-after-hide")}}handleNoModalChange(){this.open&&!this.contained&&(this.modal.activate(),gn(this)),this.open&&this.contained&&(this.modal.deactivate(),bn(this))}async show(){if(!this.open)return this.open=!0,Si(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Si(this,"sl-after-hide")}render(){return we`
      <div
        part="base"
        class=${Ut({drawer:!0,"drawer--open":this.open,"drawer--top":"top"===this.placement,"drawer--end":"end"===this.placement,"drawer--bottom":"bottom"===this.placement,"drawer--start":"start"===this.placement,"drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--rtl":"rtl"===this.localize.dir(),"drawer--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="drawer__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${Gt(this.noHeader?this.label:void 0)}
          aria-labelledby=${Gt(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":we`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="drawer__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="drawer__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click=${()=>this.requestClose("close-button")}
                    ></sl-icon-button>
                  </div>
                </header>
              `}

          <slot part="body" class="drawer__body"></slot>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};Ea.styles=[Be,ma],Ea.dependencies={"sl-icon-button":Qt},et([ct(".drawer")],Ea.prototype,"drawer",2),et([ct(".drawer__panel")],Ea.prototype,"panel",2),et([ct(".drawer__overlay")],Ea.prototype,"overlay",2),et([ot({type:Boolean,reflect:!0})],Ea.prototype,"open",2),et([ot({reflect:!0})],Ea.prototype,"label",2),et([ot({reflect:!0})],Ea.prototype,"placement",2),et([ot({type:Boolean,reflect:!0})],Ea.prototype,"contained",2),et([ot({attribute:"no-header",type:Boolean,reflect:!0})],Ea.prototype,"noHeader",2),et([At("open",{waitUntilFirstUpdate:!0})],Ea.prototype,"handleOpenChange",1),et([At("contained",{waitUntilFirstUpdate:!0})],Ea.prototype,"handleNoModalChange",1),xi("drawer.showTop",{keyframes:[{opacity:0,translate:"0 -100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}}),xi("drawer.hideTop",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 -100%"}],options:{duration:250,easing:"ease"}}),xi("drawer.showEnd",{keyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}}),xi("drawer.hideEnd",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],options:{duration:250,easing:"ease"}}),xi("drawer.showBottom",{keyframes:[{opacity:0,translate:"0 100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}}),xi("drawer.hideBottom",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 100%"}],options:{duration:250,easing:"ease"}}),xi("drawer.showStart",{keyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}}),xi("drawer.hideStart",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],options:{duration:250,easing:"ease"}}),xi("drawer.denyClose",{keyframes:[{scale:1},{scale:1.01},{scale:1}],options:{duration:250}}),xi("drawer.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}}),xi("drawer.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});Ea.define("sl-drawer"),gt({tagName:"sl-drawer",elementClass:Ea,react:d,events:{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide",onSlInitialFocus:"sl-initial-focus",onSlRequestClose:"sl-request-close"},displayName:"SlDrawer"});var za=F`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`,Aa=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=e=>{this.open&&"Escape"===e.key&&(e.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=e=>{var t;if("Escape"===e.key&&this.open&&!this.closeWatcher)return e.stopPropagation(),this.focusOnTrigger(),void this.hide();if("Tab"===e.key){if(this.open&&"sl-menu-item"===(null==(t=document.activeElement)?void 0:t.tagName.toLowerCase()))return e.preventDefault(),this.hide(),void this.focusOnTrigger();const n=(e,t)=>{if(!e)return null;const r=e.closest(t);if(r)return r;const i=e.getRootNode();return i instanceof ShadowRoot?n(i.host,t):null};setTimeout(()=>{var e;const t=(null==(e=this.containingElement)?void 0:e.getRootNode())instanceof ShadowRoot?ba():document.activeElement;this.containingElement&&n(t,this.containingElement.tagName.toLowerCase())===this.containingElement||this.hide()})}},this.handleDocumentMouseDown=e=>{const t=e.composedPath();this.containingElement&&!t.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=e=>{const t=e.target;this.stayOpenOnSelect||"sl-menu"!==t.tagName.toLowerCase()||(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const e=this.trigger.assignedElements({flatten:!0})[0];"function"==typeof(null==e?void 0:e.focus)&&e.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(e=>"sl-menu"===e.tagName.toLowerCase())}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(e){if([" ","Enter"].includes(e.key))return e.preventDefault(),void this.handleTriggerClick();const t=this.getMenu();if(t){const n=t.getAllItems(),r=n[0],i=n[n.length-1];["ArrowDown","ArrowUp","Home","End"].includes(e.key)&&(e.preventDefault(),this.open||(this.show(),await this.updateComplete),n.length>0&&this.updateComplete.then(()=>{"ArrowDown"!==e.key&&"Home"!==e.key||(t.setCurrentItem(r),r.focus()),"ArrowUp"!==e.key&&"End"!==e.key||(t.setCurrentItem(i),i.focus())}))}}handleTriggerKeyUp(e){" "===e.key&&e.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const e=this.trigger.assignedElements({flatten:!0}).find(e=>function(e){var t,n;const r=ka(e);return{start:null!=(t=r[0])?t:null,end:null!=(n=r[r.length-1])?n:null}}(e).start);let t;if(e){switch(e.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":t=e.button;break;default:t=e}t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,Si(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Si(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var e;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?(null==(e=this.closeWatcher)||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var e;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),null==(e=this.closeWatcher)||e.destroy()}async handleOpenChange(){if(this.disabled)this.open=!1;else if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await Ai(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:e,options:t}=_i(this,"dropdown.show",{dir:this.localize.dir()});await Ci(this.popup.popup,e,t),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await Ai(this);const{keyframes:e,options:t}=_i(this,"dropdown.hide",{dir:this.localize.dir()});await Ci(this.popup.popup,e,t),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return we`
      <sl-popup
        part="base"
        exportparts="popup:base__popup"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${Gt(this.sync?this.sync:void 0)}
        class=${Ut({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};Aa.styles=[Be,za],Aa.dependencies={"sl-popup":yi},et([ct(".dropdown")],Aa.prototype,"popup",2),et([ct(".dropdown__trigger")],Aa.prototype,"trigger",2),et([ct(".dropdown__panel")],Aa.prototype,"panel",2),et([ot({type:Boolean,reflect:!0})],Aa.prototype,"open",2),et([ot({reflect:!0})],Aa.prototype,"placement",2),et([ot({type:Boolean,reflect:!0})],Aa.prototype,"disabled",2),et([ot({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],Aa.prototype,"stayOpenOnSelect",2),et([ot({attribute:!1})],Aa.prototype,"containingElement",2),et([ot({type:Number})],Aa.prototype,"distance",2),et([ot({type:Number})],Aa.prototype,"skidding",2),et([ot({type:Boolean})],Aa.prototype,"hoist",2),et([ot({reflect:!0})],Aa.prototype,"sync",2),et([At("open",{waitUntilFirstUpdate:!0})],Aa.prototype,"handleOpenChange",1),xi("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}}),xi("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});Aa.define("sl-dropdown");var $a=gt({tagName:"sl-dropdown",elementClass:Aa,react:d,events:{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide"},displayName:"SlDropdown"}),Ta=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.date=new Date,this.hourFormat="auto"}render(){const e=new Date(this.date),t="auto"===this.hourFormat?void 0:"12"===this.hourFormat;if(!isNaN(e.getMilliseconds()))return we`
      <time datetime=${e.toISOString()}>
        ${this.localize.date(e,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:t})}
      </time>
    `}};et([ot()],Ta.prototype,"date",2),et([ot()],Ta.prototype,"weekday",2),et([ot()],Ta.prototype,"era",2),et([ot()],Ta.prototype,"year",2),et([ot()],Ta.prototype,"month",2),et([ot()],Ta.prototype,"day",2),et([ot()],Ta.prototype,"hour",2),et([ot()],Ta.prototype,"minute",2),et([ot()],Ta.prototype,"second",2),et([ot({attribute:"time-zone-name"})],Ta.prototype,"timeZoneName",2),et([ot({attribute:"time-zone"})],Ta.prototype,"timeZone",2),et([ot({attribute:"hour-format"})],Ta.prototype,"hourFormat",2);Ta.define("sl-format-date"),gt({tagName:"sl-format-date",elementClass:Ta,react:d,events:{},displayName:"SlFormatDate"});var Pa=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.value=0,this.unit="byte",this.display="short"}render(){if(isNaN(this.value))return"";const e="bit"===this.unit?["","kilo","mega","giga","tera"]:["","kilo","mega","giga","tera","peta"],t=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),e.length-1)),n=e[t]+this.unit,r=parseFloat((this.value/Math.pow(1e3,t)).toPrecision(3));return this.localize.number(r,{style:"unit",unit:n,unitDisplay:this.display})}};et([ot({type:Number})],Pa.prototype,"value",2),et([ot()],Pa.prototype,"unit",2),et([ot()],Pa.prototype,"display",2);Pa.define("sl-format-bytes"),gt({tagName:"sl-format-bytes",elementClass:Pa,react:d,events:{},displayName:"SlFormatBytes"});var Ma=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.value=0,this.type="decimal",this.noGrouping=!1,this.currency="USD",this.currencyDisplay="symbol"}render(){return isNaN(this.value)?"":this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.noGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};et([ot({type:Number})],Ma.prototype,"value",2),et([ot()],Ma.prototype,"type",2),et([ot({attribute:"no-grouping",type:Boolean})],Ma.prototype,"noGrouping",2),et([ot()],Ma.prototype,"currency",2),et([ot({attribute:"currency-display"})],Ma.prototype,"currencyDisplay",2),et([ot({attribute:"minimum-integer-digits",type:Number})],Ma.prototype,"minimumIntegerDigits",2),et([ot({attribute:"minimum-fraction-digits",type:Number})],Ma.prototype,"minimumFractionDigits",2),et([ot({attribute:"maximum-fraction-digits",type:Number})],Ma.prototype,"maximumFractionDigits",2),et([ot({attribute:"minimum-significant-digits",type:Number})],Ma.prototype,"minimumSignificantDigits",2),et([ot({attribute:"maximum-significant-digits",type:Number})],Ma.prototype,"maximumSignificantDigits",2);Ma.define("sl-format-number"),gt({tagName:"sl-format-number",elementClass:Ma,react:d,events:{},displayName:"SlFormatNumber"});It.define("sl-icon");var La=gt({tagName:"sl-icon",elementClass:It,react:d,events:{onSlLoad:"sl-load",onSlError:"sl-error"},displayName:"SlIcon"});Qt.define("sl-icon-button"),gt({tagName:"sl-icon-button",elementClass:Qt,react:d,events:{onSlBlur:"sl-blur",onSlFocus:"sl-focus"},displayName:"SlIconButton"});Lo.define("sl-button-group"),gt({tagName:"sl-button-group",elementClass:Lo,react:d,events:{},displayName:"SlButtonGroup"});var Da=class{constructor(e,t){this.timerId=0,this.activeInteractions=0,this.paused=!1,this.stopped=!0,this.pause=()=>{this.activeInteractions++||(this.paused=!0,this.host.requestUpdate())},this.resume=()=>{--this.activeInteractions||(this.paused=!1,this.host.requestUpdate())},e.addController(this),this.host=e,this.tickCallback=t}hostConnected(){this.host.addEventListener("mouseenter",this.pause),this.host.addEventListener("mouseleave",this.resume),this.host.addEventListener("focusin",this.pause),this.host.addEventListener("focusout",this.resume),this.host.addEventListener("touchstart",this.pause,{passive:!0}),this.host.addEventListener("touchend",this.resume)}hostDisconnected(){this.stop(),this.host.removeEventListener("mouseenter",this.pause),this.host.removeEventListener("mouseleave",this.resume),this.host.removeEventListener("focusin",this.pause),this.host.removeEventListener("focusout",this.resume),this.host.removeEventListener("touchstart",this.pause),this.host.removeEventListener("touchend",this.resume)}start(e){this.stop(),this.stopped=!1,this.timerId=window.setInterval(()=>{this.paused||this.tickCallback()},e)}stop(){clearInterval(this.timerId),this.stopped=!0,this.host.requestUpdate()}},Ia=F`
  :host {
    --slide-gap: var(--sl-spacing-medium, 1rem);
    --aspect-ratio: 16 / 9;
    --scroll-hint: 0px;

    display: flex;
  }

  .carousel {
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: 1fr min-content;
    grid-template-areas:
      '. slides .'
      '. pagination .';
    gap: var(--sl-spacing-medium);
    align-items: center;
    min-height: 100%;
    min-width: 100%;
    position: relative;
  }

  .carousel__pagination {
    grid-area: pagination;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--sl-spacing-small);
  }

  .carousel__slides {
    grid-area: slides;

    display: grid;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-items: center;
    overflow: auto;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    aspect-ratio: calc(var(--aspect-ratio) * var(--slides-per-page));
    border-radius: var(--sl-border-radius-small);

    --slide-size: calc((100% - (var(--slides-per-page) - 1) * var(--slide-gap)) / var(--slides-per-page));
  }

  @media (prefers-reduced-motion) {
    :where(.carousel__slides) {
      scroll-behavior: auto;
    }
  }

  .carousel__slides--horizontal {
    grid-auto-flow: column;
    grid-auto-columns: var(--slide-size);
    grid-auto-rows: 100%;
    column-gap: var(--slide-gap);
    scroll-snap-type: x mandatory;
    scroll-padding-inline: var(--scroll-hint);
    padding-inline: var(--scroll-hint);
    overflow-y: hidden;
  }

  .carousel__slides--vertical {
    grid-auto-flow: row;
    grid-auto-columns: 100%;
    grid-auto-rows: var(--slide-size);
    row-gap: var(--slide-gap);
    scroll-snap-type: y mandatory;
    scroll-padding-block: var(--scroll-hint);
    padding-block: var(--scroll-hint);
    overflow-x: hidden;
  }

  .carousel__slides--dragging {
  }

  :host([vertical]) ::slotted(sl-carousel-item) {
    height: 100%;
  }

  .carousel__slides::-webkit-scrollbar {
    display: none;
  }

  .carousel__navigation {
    grid-area: navigation;
    display: contents;
    font-size: var(--sl-font-size-x-large);
  }

  .carousel__navigation-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-small);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    appearance: none;
  }

  .carousel__navigation-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .carousel__navigation-button--disabled::part(base) {
    pointer-events: none;
  }

  .carousel__navigation-button--previous {
    grid-column: 1;
    grid-row: 1;
  }

  .carousel__navigation-button--next {
    grid-column: 3;
    grid-row: 1;
  }

  .carousel__pagination-item {
    display: block;
    cursor: pointer;
    background: none;
    border: 0;
    border-radius: var(--sl-border-radius-circle);
    width: var(--sl-spacing-small);
    height: var(--sl-spacing-small);
    background-color: var(--sl-color-neutral-300);
    padding: 0;
    margin: 0;
  }

  .carousel__pagination-item--active {
    background-color: var(--sl-color-neutral-700);
    transform: scale(1.2);
  }

  /* Focus styles */
  .carousel__slides:focus-visible,
  .carousel__navigation-button:focus-visible,
  .carousel__pagination-item:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }
`;var Na=class extends dt{constructor(){super(...arguments),this.loop=!1,this.navigation=!1,this.pagination=!1,this.autoplay=!1,this.autoplayInterval=3e3,this.slidesPerPage=1,this.slidesPerMove=1,this.orientation="horizontal",this.mouseDragging=!1,this.activeSlide=0,this.scrolling=!1,this.dragging=!1,this.autoplayController=new Da(this,()=>this.next()),this.dragStartPosition=[-1,-1],this.localize=new ln(this),this.pendingSlideChange=!1,this.handleMouseDrag=e=>{this.dragging||(this.scrollContainer.style.setProperty("scroll-snap-type","none"),this.dragging=!0,this.dragStartPosition=[e.clientX,e.clientY]),this.scrollContainer.scrollBy({left:-e.movementX,top:-e.movementY,behavior:"instant"})},this.handleMouseDragEnd=()=>{const e=this.scrollContainer;document.removeEventListener("pointermove",this.handleMouseDrag,{capture:!0});const t=e.scrollLeft,n=e.scrollTop;e.style.removeProperty("scroll-snap-type"),e.style.setProperty("overflow","hidden");const r=e.scrollLeft,i=e.scrollTop;e.style.removeProperty("overflow"),e.style.setProperty("scroll-snap-type","none"),e.scrollTo({left:t,top:n,behavior:"instant"}),requestAnimationFrame(async()=>{t===r&&n===i||(e.scrollTo({left:r,top:i,behavior:zi()?"auto":"smooth"}),await Si(e,"scrollend")),e.style.removeProperty("scroll-snap-type"),this.dragging=!1,this.dragStartPosition=[-1,-1],this.handleScrollEnd()})},this.handleSlotChange=e=>{e.some(e=>[...e.addedNodes,...e.removedNodes].some(e=>this.isCarouselItem(e)&&!e.hasAttribute("data-clone")))&&this.initializeSlides(),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","region"),this.setAttribute("aria-label",this.localize.term("carousel"))}disconnectedCallback(){var e;super.disconnectedCallback(),null==(e=this.mutationObserver)||e.disconnect()}firstUpdated(){this.initializeSlides(),this.mutationObserver=new MutationObserver(this.handleSlotChange),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}willUpdate(e){(e.has("slidesPerMove")||e.has("slidesPerPage"))&&(this.slidesPerMove=Math.min(this.slidesPerMove,this.slidesPerPage))}getPageCount(){const e=this.getSlides().length,{slidesPerPage:t,slidesPerMove:n,loop:r}=this,i=r?e/n:(e-t)/n+1;return Math.ceil(i)}getCurrentPage(){return Math.ceil(this.activeSlide/this.slidesPerMove)}canScrollNext(){return this.loop||this.getCurrentPage()<this.getPageCount()-1}canScrollPrev(){return this.loop||this.getCurrentPage()>0}getSlides({excludeClones:e=!0}={}){return[...this.children].filter(t=>this.isCarouselItem(t)&&(!e||!t.hasAttribute("data-clone")))}handleClick(e){if(this.dragging&&this.dragStartPosition[0]>0&&this.dragStartPosition[1]>0){const t=Math.abs(this.dragStartPosition[0]-e.clientX),n=Math.abs(this.dragStartPosition[1]-e.clientY);Math.sqrt(t*t+n*n)>=10&&e.preventDefault()}}handleKeyDown(e){if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)){const t=e.target,n="rtl"===this.localize.dir(),r=null!==t.closest('[part~="pagination-item"]'),i="ArrowDown"===e.key||!n&&"ArrowRight"===e.key||n&&"ArrowLeft"===e.key,o="ArrowUp"===e.key||!n&&"ArrowLeft"===e.key||n&&"ArrowRight"===e.key;e.preventDefault(),o&&this.previous(),i&&this.next(),"Home"===e.key&&this.goToSlide(0),"End"===e.key&&this.goToSlide(this.getSlides().length-1),r&&this.updateComplete.then(()=>{var e;const t=null==(e=this.shadowRoot)?void 0:e.querySelector('[part~="pagination-item--active"]');t&&t.focus()})}}handleMouseDragStart(e){this.mouseDragging&&0===e.button&&(e.preventDefault(),document.addEventListener("pointermove",this.handleMouseDrag,{capture:!0,passive:!0}),document.addEventListener("pointerup",this.handleMouseDragEnd,{capture:!0,once:!0}))}handleScroll(){this.scrolling=!0,this.pendingSlideChange||this.synchronizeSlides()}synchronizeSlides(){const e=new IntersectionObserver(t=>{e.disconnect();for(const e of t){const t=e.target;t.toggleAttribute("inert",!e.isIntersecting),t.classList.toggle("--in-view",e.isIntersecting),t.setAttribute("aria-hidden",e.isIntersecting?"false":"true")}const n=t.find(e=>e.isIntersecting);if(!n)return;const r=this.getSlides({excludeClones:!1}),i=this.getSlides().length,o=r.indexOf(n.target),a=this.loop?o-this.slidesPerPage:o;if(this.activeSlide=(Math.ceil(a/this.slidesPerMove)*this.slidesPerMove+i)%i,!this.scrolling&&this.loop&&n.target.hasAttribute("data-clone")){const e=Number(n.target.getAttribute("data-clone"));this.goToSlide(e,"instant")}},{root:this.scrollContainer,threshold:.6});this.getSlides({excludeClones:!1}).forEach(t=>{e.observe(t)})}handleScrollEnd(){this.scrolling&&!this.dragging&&(this.scrolling=!1,this.pendingSlideChange=!1,this.synchronizeSlides())}isCarouselItem(e){return e instanceof Element&&"sl-carousel-item"===e.tagName.toLowerCase()}initializeSlides(){this.getSlides({excludeClones:!1}).forEach((e,t)=>{e.classList.remove("--in-view"),e.classList.remove("--is-active"),e.setAttribute("role","group"),e.setAttribute("aria-label",this.localize.term("slideNum",t+1)),this.pagination&&(e.setAttribute("id",`slide-${t+1}`),e.setAttribute("role","tabpanel"),e.removeAttribute("aria-label"),e.setAttribute("aria-labelledby",`tab-${t+1}`)),e.hasAttribute("data-clone")&&e.remove()}),this.updateSlidesSnap(),this.loop&&this.createClones(),this.goToSlide(this.activeSlide,"auto"),this.synchronizeSlides()}createClones(){const e=this.getSlides(),t=this.slidesPerPage,n=e.slice(-t),r=e.slice(0,t);n.reverse().forEach((t,n)=>{const r=t.cloneNode(!0);r.setAttribute("data-clone",String(e.length-n-1)),this.prepend(r)}),r.forEach((e,t)=>{const n=e.cloneNode(!0);n.setAttribute("data-clone",String(t)),this.append(n)})}handleSlideChange(){const e=this.getSlides();e.forEach((e,t)=>{e.classList.toggle("--is-active",t===this.activeSlide)}),this.hasUpdated&&this.emit("sl-slide-change",{detail:{index:this.activeSlide,slide:e[this.activeSlide]}})}updateSlidesSnap(){const e=this.getSlides(),t=this.slidesPerMove;e.forEach((e,n)=>{(n+t)%t===0?e.style.removeProperty("scroll-snap-align"):e.style.setProperty("scroll-snap-align","none")})}handleAutoplayChange(){this.autoplayController.stop(),this.autoplay&&this.autoplayController.start(this.autoplayInterval)}previous(e="smooth"){this.goToSlide(this.activeSlide-this.slidesPerMove,e)}next(e="smooth"){this.goToSlide(this.activeSlide+this.slidesPerMove,e)}goToSlide(e,t="smooth"){const{slidesPerPage:n,loop:r}=this,i=this.getSlides(),o=this.getSlides({excludeClones:!1});if(!i.length)return;const a=r?(e+i.length)%i.length:Bi(e,0,i.length-n);this.activeSlide=a;const s=o[Bi(e+(r?n:0)+("rtl"===this.localize.dir()?n-1:0),0,o.length-1)];this.scrollToSlide(s,zi()?"auto":t)}scrollToSlide(e,t="smooth"){this.pendingSlideChange=!0,window.requestAnimationFrame(()=>{if(!this.scrollContainer)return;const n=this.scrollContainer,r=n.getBoundingClientRect(),i=e.getBoundingClientRect(),o=i.left-r.left,a=i.top-r.top;o||a?(this.pendingSlideChange=!0,n.scrollTo({left:o+n.scrollLeft,top:a+n.scrollTop,behavior:t})):this.pendingSlideChange=!1})}render(){const{slidesPerMove:e,scrolling:t}=this,n=this.getPageCount(),r=this.getCurrentPage(),i=this.canScrollPrev(),o=this.canScrollNext(),a="ltr"===this.localize.dir();return we`
      <div part="base" class="carousel">
        <div
          id="scroll-container"
          part="scroll-container"
          class="${Ut({carousel__slides:!0,"carousel__slides--horizontal":"horizontal"===this.orientation,"carousel__slides--vertical":"vertical"===this.orientation,"carousel__slides--dragging":this.dragging})}"
          style="--slides-per-page: ${this.slidesPerPage};"
          aria-busy="${t?"true":"false"}"
          aria-atomic="true"
          tabindex="0"
          @keydown=${this.handleKeyDown}
          @mousedown="${this.handleMouseDragStart}"
          @scroll="${this.handleScroll}"
          @scrollend=${this.handleScrollEnd}
          @click=${this.handleClick}
        >
          <slot></slot>
        </div>

        ${this.navigation?we`
              <div part="navigation" class="carousel__navigation">
                <button
                  part="navigation-button navigation-button--previous"
                  class="${Ut({"carousel__navigation-button":!0,"carousel__navigation-button--previous":!0,"carousel__navigation-button--disabled":!i})}"
                  aria-label="${this.localize.term("previousSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${i?"false":"true"}"
                  @click=${i?()=>this.previous():null}
                >
                  <slot name="previous-icon">
                    <sl-icon library="system" name="${a?"chevron-left":"chevron-right"}"></sl-icon>
                  </slot>
                </button>

                <button
                  part="navigation-button navigation-button--next"
                  class=${Ut({"carousel__navigation-button":!0,"carousel__navigation-button--next":!0,"carousel__navigation-button--disabled":!o})}
                  aria-label="${this.localize.term("nextSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${o?"false":"true"}"
                  @click=${o?()=>this.next():null}
                >
                  <slot name="next-icon">
                    <sl-icon library="system" name="${a?"chevron-right":"chevron-left"}"></sl-icon>
                  </slot>
                </button>
              </div>
            `:""}
        ${this.pagination?we`
              <div part="pagination" role="tablist" class="carousel__pagination">
                ${function*(e,t){if(void 0!==e){let n=0;for(const r of e)yield t(r,n++)}}(function*(e,t,n=1){const r=void 0===t?0:e;t??=e;for(let e=r;n>0?e<t:t<e;e+=n)yield e}(n),t=>{const i=t===r;return we`
                    <button
                      part="pagination-item ${i?"pagination-item--active":""}"
                      class="${Ut({"carousel__pagination-item":!0,"carousel__pagination-item--active":i})}"
                      role="tab"
                      id="tab-${t+1}"
                      aria-controls="slide-${t+1}"
                      aria-selected="${i?"true":"false"}"
                      aria-label="${i?this.localize.term("slideNum",t+1):this.localize.term("goToSlide",t+1,n)}"
                      tabindex=${i?"0":"-1"}
                      @click=${()=>this.goToSlide(t*e)}
                      @keydown=${this.handleKeyDown}
                    ></button>
                  `})}
              </div>
            `:""}
      </div>
    `}};Na.styles=[Be,Ia],Na.dependencies={"sl-icon":It},et([ot({type:Boolean,reflect:!0})],Na.prototype,"loop",2),et([ot({type:Boolean,reflect:!0})],Na.prototype,"navigation",2),et([ot({type:Boolean,reflect:!0})],Na.prototype,"pagination",2),et([ot({type:Boolean,reflect:!0})],Na.prototype,"autoplay",2),et([ot({type:Number,attribute:"autoplay-interval"})],Na.prototype,"autoplayInterval",2),et([ot({type:Number,attribute:"slides-per-page"})],Na.prototype,"slidesPerPage",2),et([ot({type:Number,attribute:"slides-per-move"})],Na.prototype,"slidesPerMove",2),et([ot()],Na.prototype,"orientation",2),et([ot({type:Boolean,reflect:!0,attribute:"mouse-dragging"})],Na.prototype,"mouseDragging",2),et([ct(".carousel__slides")],Na.prototype,"scrollContainer",2),et([ct(".carousel__pagination")],Na.prototype,"paginationContainer",2),et([at()],Na.prototype,"activeSlide",2),et([at()],Na.prototype,"scrolling",2),et([at()],Na.prototype,"dragging",2),et([st({passive:!0})],Na.prototype,"handleScroll",1),et([At("loop",{waitUntilFirstUpdate:!0}),At("slidesPerPage",{waitUntilFirstUpdate:!0})],Na.prototype,"initializeSlides",1),et([At("activeSlide")],Na.prototype,"handleSlideChange",1),et([At("slidesPerMove")],Na.prototype,"updateSlidesSnap",1),et([At("autoplay")],Na.prototype,"handleAutoplayChange",1);Na.define("sl-carousel"),gt({tagName:"sl-carousel",elementClass:Na,react:d,events:{onSlSlideChange:"sl-slide-change"},displayName:"SlCarousel"});var Oa=F`
  :host {
    --aspect-ratio: inherit;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    aspect-ratio: var(--aspect-ratio);
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  ::slotted(img) {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
`,Fa=class extends dt{connectedCallback(){super.connectedCallback()}render(){return we` <slot></slot> `}};Fa.styles=[Be,Oa];Fa.define("sl-carousel-item"),gt({tagName:"sl-carousel-item",elementClass:Fa,react:d,events:{},displayName:"SlCarouselItem"});Di.define("sl-checkbox");var Va=gt({tagName:"sl-checkbox",elementClass:Di,react:d,events:{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlFocus:"sl-focus",onSlInput:"sl-input",onSlInvalid:"sl-invalid"},displayName:"SlCheckbox"}),Ra=F`
  :host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
    -webkit-user-select: none;
  }

  .color-picker--inline {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
  }

  .color-picker--inline:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
    forced-color-adjust: none;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
    transition: var(--sl-transition-fast) scale;
  }

  .color-picker__grid-handle--dragging {
    cursor: none;
    scale: 1.5;
  }

  .color-picker__grid-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    forced-color-adjust: none;
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-border-radius-circle);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
    forced-color-adjust: none;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--sl-color-primary-500);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button-group {
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__user-input sl-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px var(--sl-color-neutral-200);
    padding: var(--sl-spacing-small);
    forced-color-adjust: none;
  }

  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: var(--sl-border-radius-small);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position:
      0 0,
      0 0,
      -5px -5px,
      5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    forced-color-adjust: none;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow:
      inset 0 0 0 2px var(--sl-input-border-color),
      inset 0 0 0 4px var(--sl-color-neutral-0);
  }

  .color-dropdown__trigger--empty:before {
    background-color: transparent;
  }

  .color-dropdown__trigger:focus-visible {
    outline: none;
  }

  .color-dropdown__trigger:focus-visible:not(.color-dropdown__trigger--disabled) {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Ba=class extends dt{constructor(){super(...arguments),this.formControlController=new In(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new Vn(this,"[default]","prefix","suffix"),this.localize=new ln(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:Nn}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){"submit"===this.type&&this.formControlController.submit(this),"reset"===this.type&&this.formControlController.reset(this)}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}checkValidity(){return!this.isButton()||this.button.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return!this.isButton()||this.button.reportValidity()}setCustomValidity(e){this.isButton()&&(this.button.setCustomValidity(e),this.formControlController.updateValidity())}render(){const e=this.isLink(),t=e?qt`a`:qt`button`;return Kt`
      <${t}
        part="base"
        class=${Ut({button:!0,"button--default":"default"===this.variant,"button--primary":"primary"===this.variant,"button--success":"success"===this.variant,"button--neutral":"neutral"===this.variant,"button--warning":"warning"===this.variant,"button--danger":"danger"===this.variant,"button--text":"text"===this.variant,"button--small":"small"===this.size,"button--medium":"medium"===this.size,"button--large":"large"===this.size,"button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":"rtl"===this.localize.dir(),"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${Gt(e?void 0:this.disabled)}
        type=${Gt(e?void 0:this.type)}
        title=${this.title}
        name=${Gt(e?void 0:this.name)}
        value=${Gt(e?void 0:this.value)}
        href=${Gt(e&&!this.disabled?this.href:void 0)}
        target=${Gt(e?this.target:void 0)}
        download=${Gt(e?this.download:void 0)}
        rel=${Gt(e?this.rel:void 0)}
        role=${Gt(e?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?Kt` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?Kt`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${t}>
    `}};function Ua(e,t){(function(e){return"string"==typeof e&&-1!==e.indexOf(".")&&1===parseFloat(e)})(e)&&(e="100%");const n=function(e){return"string"==typeof e&&-1!==e.indexOf("%")}(e);return e=360===t?e:Math.min(t,Math.max(0,parseFloat(e))),n&&(e=parseInt(String(e*t),10)/100),Math.abs(e-t)<1e-6?1:e=360===t?(e<0?e%t+t:e%t)/parseFloat(String(t)):e%t/parseFloat(String(t))}function Ha(e){return Math.min(1,Math.max(0,e))}function ja(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function qa(e){return Number(e)<=1?100*Number(e)+"%":e}function Wa(e){return 1===e.length?"0"+e:String(e)}function Ka(e,t,n){e=Ua(e,255),t=Ua(t,255),n=Ua(n,255);const r=Math.max(e,t,n),i=Math.min(e,t,n);let o=0,a=0;const s=(r+i)/2;if(r===i)a=0,o=0;else{const l=r-i;switch(a=s>.5?l/(2-r-i):l/(r+i),r){case e:o=(t-n)/l+(t<n?6:0);break;case t:o=(n-e)/l+2;break;case n:o=(e-t)/l+4}o/=6}return{h:o,s:a,l:s}}function Ga(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*n*(t-e):n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function Qa(e,t,n){e=Ua(e,255),t=Ua(t,255),n=Ua(n,255);const r=Math.max(e,t,n),i=Math.min(e,t,n);let o=0;const a=r,s=r-i,l=0===r?0:s/r;if(r===i)o=0;else{switch(r){case e:o=(t-n)/s+(t<n?6:0);break;case t:o=(n-e)/s+2;break;case n:o=(e-t)/s+4}o/=6}return{h:o,s:l,v:a}}function Ya(e,t,n,r){const i=[Wa(Math.round(e).toString(16)),Wa(Math.round(t).toString(16)),Wa(Math.round(n).toString(16))];return r&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function Xa(e,t,n){let r=1-e/255,i=1-t/255,o=1-n/255,a=Math.min(r,i,o);return 1===a?(r=0,i=0,o=0):(r=(r-a)/(1-a)*100,i=(i-a)/(1-a)*100,o=(o-a)/(1-a)*100),a*=100,{c:Math.round(r),m:Math.round(i),y:Math.round(o),k:Math.round(a)}}function Za(e){return Math.round(255*parseFloat(e)).toString(16)}function Ja(e){return es(e)/255}function es(e){return parseInt(e,16)}Ba.styles=[Be,So],Ba.dependencies={"sl-icon":It,"sl-spinner":Ni},et([ct(".button")],Ba.prototype,"button",2),et([at()],Ba.prototype,"hasFocus",2),et([at()],Ba.prototype,"invalid",2),et([ot()],Ba.prototype,"title",2),et([ot({reflect:!0})],Ba.prototype,"variant",2),et([ot({reflect:!0})],Ba.prototype,"size",2),et([ot({type:Boolean,reflect:!0})],Ba.prototype,"caret",2),et([ot({type:Boolean,reflect:!0})],Ba.prototype,"disabled",2),et([ot({type:Boolean,reflect:!0})],Ba.prototype,"loading",2),et([ot({type:Boolean,reflect:!0})],Ba.prototype,"outline",2),et([ot({type:Boolean,reflect:!0})],Ba.prototype,"pill",2),et([ot({type:Boolean,reflect:!0})],Ba.prototype,"circle",2),et([ot()],Ba.prototype,"type",2),et([ot()],Ba.prototype,"name",2),et([ot()],Ba.prototype,"value",2),et([ot()],Ba.prototype,"href",2),et([ot()],Ba.prototype,"target",2),et([ot()],Ba.prototype,"rel",2),et([ot()],Ba.prototype,"download",2),et([ot()],Ba.prototype,"form",2),et([ot({attribute:"formaction"})],Ba.prototype,"formAction",2),et([ot({attribute:"formenctype"})],Ba.prototype,"formEnctype",2),et([ot({attribute:"formmethod"})],Ba.prototype,"formMethod",2),et([ot({attribute:"formnovalidate",type:Boolean})],Ba.prototype,"formNoValidate",2),et([ot({attribute:"formtarget"})],Ba.prototype,"formTarget",2),et([At("disabled",{waitUntilFirstUpdate:!0})],Ba.prototype,"handleDisabledChange",1);const ts={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function ns(e){let t={r:0,g:0,b:0},n=1,r=null,i=null,o=null,a=!1,s=!1;return"string"==typeof e&&(e=function(e){if(e=e.trim().toLowerCase(),0===e.length)return!1;let t=!1;if(ts[e])e=ts[e],t=!0;else if("transparent"===e)return{r:0,g:0,b:0,a:0,format:"name"};let n=as.rgb.exec(e);if(n)return{r:n[1],g:n[2],b:n[3]};if(n=as.rgba.exec(e),n)return{r:n[1],g:n[2],b:n[3],a:n[4]};if(n=as.hsl.exec(e),n)return{h:n[1],s:n[2],l:n[3]};if(n=as.hsla.exec(e),n)return{h:n[1],s:n[2],l:n[3],a:n[4]};if(n=as.hsv.exec(e),n)return{h:n[1],s:n[2],v:n[3]};if(n=as.hsva.exec(e),n)return{h:n[1],s:n[2],v:n[3],a:n[4]};if(n=as.cmyk.exec(e),n)return{c:n[1],m:n[2],y:n[3],k:n[4]};if(n=as.hex8.exec(e),n)return{r:es(n[1]),g:es(n[2]),b:es(n[3]),a:Ja(n[4]),format:t?"name":"hex8"};if(n=as.hex6.exec(e),n)return{r:es(n[1]),g:es(n[2]),b:es(n[3]),format:t?"name":"hex"};if(n=as.hex4.exec(e),n)return{r:es(n[1]+n[1]),g:es(n[2]+n[2]),b:es(n[3]+n[3]),a:Ja(n[4]+n[4]),format:t?"name":"hex8"};if(n=as.hex3.exec(e),n)return{r:es(n[1]+n[1]),g:es(n[2]+n[2]),b:es(n[3]+n[3]),format:t?"name":"hex"};return!1}(e)),"object"==typeof e&&(ss(e.r)&&ss(e.g)&&ss(e.b)?(t=function(e,t,n){return{r:255*Ua(e,255),g:255*Ua(t,255),b:255*Ua(n,255)}}(e.r,e.g,e.b),a=!0,s="%"===String(e.r).substr(-1)?"prgb":"rgb"):ss(e.h)&&ss(e.s)&&ss(e.v)?(r=qa(e.s),i=qa(e.v),t=function(e,t,n){e=6*Ua(e,360),t=Ua(t,100),n=Ua(n,100);const r=Math.floor(e),i=e-r,o=n*(1-t),a=n*(1-i*t),s=n*(1-(1-i)*t),l=r%6;return{r:255*[n,a,o,o,s,n][l],g:255*[s,n,n,a,o,o][l],b:255*[o,o,s,n,n,a][l]}}(e.h,r,i),a=!0,s="hsv"):ss(e.h)&&ss(e.s)&&ss(e.l)?(r=qa(e.s),o=qa(e.l),t=function(e,t,n){let r,i,o;if(e=Ua(e,360),t=Ua(t,100),n=Ua(n,100),0===t)i=n,o=n,r=n;else{const a=n<.5?n*(1+t):n+t-n*t,s=2*n-a;r=Ga(s,a,e+1/3),i=Ga(s,a,e),o=Ga(s,a,e-1/3)}return{r:255*r,g:255*i,b:255*o}}(e.h,r,o),a=!0,s="hsl"):ss(e.c)&&ss(e.m)&&ss(e.y)&&ss(e.k)&&(t=function(e,t,n,r){const i=r/100;return{r:255*(1-e/100)*(1-i),g:255*(1-t/100)*(1-i),b:255*(1-n/100)*(1-i)}}(e.c,e.m,e.y,e.k),a=!0,s="cmyk"),Object.prototype.hasOwnProperty.call(e,"a")&&(n=e.a)),n=ja(n),{ok:a,format:e.format||s,r:Math.min(255,Math.max(t.r,0)),g:Math.min(255,Math.max(t.g,0)),b:Math.min(255,Math.max(t.b,0)),a:n}}const rs="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",is="[\\s|\\(]+("+rs+")[,|\\s]+("+rs+")[,|\\s]+("+rs+")\\s*\\)?",os="[\\s|\\(]+("+rs+")[,|\\s]+("+rs+")[,|\\s]+("+rs+")[,|\\s]+("+rs+")\\s*\\)?",as={CSS_UNIT:new RegExp(rs),rgb:new RegExp("rgb"+is),rgba:new RegExp("rgba"+os),hsl:new RegExp("hsl"+is),hsla:new RegExp("hsla"+os),hsv:new RegExp("hsv"+is),hsva:new RegExp("hsva"+os),cmyk:new RegExp("cmyk"+os),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function ss(e){return"number"==typeof e?!Number.isNaN(e):as.CSS_UNIT.test(e)}class ls{constructor(e="",t={}){if(e instanceof ls)return e;"number"==typeof e&&(e=function(e){return{r:e>>16,g:(65280&e)>>8,b:255&e}}(e)),this.originalInput=e;const n=ns(e);this.originalInput=e,this.r=n.r,this.g=n.g,this.b=n.b,this.a=n.a,this.roundA=Math.round(100*this.a)/100,this.format=t.format??n.format,this.gradientType=t.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=n.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){const e=this.toRgb();return(299*e.r+587*e.g+114*e.b)/1e3}getLuminance(){const e=this.toRgb();let t,n,r;const i=e.r/255,o=e.g/255,a=e.b/255;return t=i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4),n=o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4),r=a<=.03928?a/12.92:Math.pow((a+.055)/1.055,2.4),.2126*t+.7152*n+.0722*r}getAlpha(){return this.a}setAlpha(e){return this.a=ja(e),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){const{s:e}=this.toHsl();return 0===e}toHsv(){const e=Qa(this.r,this.g,this.b);return{h:360*e.h,s:e.s,v:e.v,a:this.a}}toHsvString(){const e=Qa(this.r,this.g,this.b),t=Math.round(360*e.h),n=Math.round(100*e.s),r=Math.round(100*e.v);return 1===this.a?`hsv(${t}, ${n}%, ${r}%)`:`hsva(${t}, ${n}%, ${r}%, ${this.roundA})`}toHsl(){const e=Ka(this.r,this.g,this.b);return{h:360*e.h,s:e.s,l:e.l,a:this.a}}toHslString(){const e=Ka(this.r,this.g,this.b),t=Math.round(360*e.h),n=Math.round(100*e.s),r=Math.round(100*e.l);return 1===this.a?`hsl(${t}, ${n}%, ${r}%)`:`hsla(${t}, ${n}%, ${r}%, ${this.roundA})`}toHex(e=!1){return Ya(this.r,this.g,this.b,e)}toHexString(e=!1){return"#"+this.toHex(e)}toHex8(e=!1){return function(e,t,n,r,i){const o=[Wa(Math.round(e).toString(16)),Wa(Math.round(t).toString(16)),Wa(Math.round(n).toString(16)),Wa(Za(r))];return i&&o[0].startsWith(o[0].charAt(1))&&o[1].startsWith(o[1].charAt(1))&&o[2].startsWith(o[2].charAt(1))&&o[3].startsWith(o[3].charAt(1))?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0)+o[3].charAt(0):o.join("")}(this.r,this.g,this.b,this.a,e)}toHex8String(e=!1){return"#"+this.toHex8(e)}toHexShortString(e=!1){return 1===this.a?this.toHexString(e):this.toHex8String(e)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){const e=Math.round(this.r),t=Math.round(this.g),n=Math.round(this.b);return 1===this.a?`rgb(${e}, ${t}, ${n})`:`rgba(${e}, ${t}, ${n}, ${this.roundA})`}toPercentageRgb(){const e=e=>`${Math.round(100*Ua(e,255))}%`;return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}}toPercentageRgbString(){const e=e=>Math.round(100*Ua(e,255));return 1===this.a?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`}toCmyk(){return{...Xa(this.r,this.g,this.b)}}toCmykString(){const{c:e,m:t,y:n,k:r}=Xa(this.r,this.g,this.b);return`cmyk(${e}, ${t}, ${n}, ${r})`}toName(){if(0===this.a)return"transparent";if(this.a<1)return!1;const e="#"+Ya(this.r,this.g,this.b,!1);for(const[t,n]of Object.entries(ts))if(e===n)return t;return!1}toString(e){const t=Boolean(e);e=e??this.format;let n=!1;const r=this.a<1&&this.a>=0;return t||!r||!e.startsWith("hex")&&"name"!==e?("rgb"===e&&(n=this.toRgbString()),"prgb"===e&&(n=this.toPercentageRgbString()),"hex"!==e&&"hex6"!==e||(n=this.toHexString()),"hex3"===e&&(n=this.toHexString(!0)),"hex4"===e&&(n=this.toHex8String(!0)),"hex8"===e&&(n=this.toHex8String()),"name"===e&&(n=this.toName()),"hsl"===e&&(n=this.toHslString()),"hsv"===e&&(n=this.toHsvString()),"cmyk"===e&&(n=this.toCmykString()),n||this.toHexString()):"name"===e&&0===this.a?this.toName():this.toRgbString()}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new ls(this.toString())}lighten(e=10){const t=this.toHsl();return t.l+=e/100,t.l=Ha(t.l),new ls(t)}brighten(e=10){const t=this.toRgb();return t.r=Math.max(0,Math.min(255,t.r-Math.round(-e/100*255))),t.g=Math.max(0,Math.min(255,t.g-Math.round(-e/100*255))),t.b=Math.max(0,Math.min(255,t.b-Math.round(-e/100*255))),new ls(t)}darken(e=10){const t=this.toHsl();return t.l-=e/100,t.l=Ha(t.l),new ls(t)}tint(e=10){return this.mix("white",e)}shade(e=10){return this.mix("black",e)}desaturate(e=10){const t=this.toHsl();return t.s-=e/100,t.s=Ha(t.s),new ls(t)}saturate(e=10){const t=this.toHsl();return t.s+=e/100,t.s=Ha(t.s),new ls(t)}greyscale(){return this.desaturate(100)}spin(e){const t=this.toHsl(),n=(t.h+e)%360;return t.h=n<0?360+n:n,new ls(t)}mix(e,t=50){const n=this.toRgb(),r=new ls(e).toRgb(),i=t/100,o={r:(r.r-n.r)*i+n.r,g:(r.g-n.g)*i+n.g,b:(r.b-n.b)*i+n.b,a:(r.a-n.a)*i+n.a};return new ls(o)}analogous(e=6,t=30){const n=this.toHsl(),r=360/t,i=[this];for(n.h=(n.h-(r*e>>1)+720)%360;--e;)n.h=(n.h+r)%360,i.push(new ls(n));return i}complement(){const e=this.toHsl();return e.h=(e.h+180)%360,new ls(e)}monochromatic(e=6){const t=this.toHsv(),{h:n}=t,{s:r}=t;let{v:i}=t;const o=[],a=1/e;for(;e--;)o.push(new ls({h:n,s:r,v:i})),i=(i+a)%1;return o}splitcomplement(){const e=this.toHsl(),{h:t}=e;return[this,new ls({h:(t+72)%360,s:e.s,l:e.l}),new ls({h:(t+216)%360,s:e.s,l:e.l})]}onBackground(e){const t=this.toRgb(),n=new ls(e).toRgb(),r=t.a+n.a*(1-t.a);return new ls({r:(t.r*t.a+n.r*n.a*(1-t.a))/r,g:(t.g*t.a+n.g*n.a*(1-t.a))/r,b:(t.b*t.a+n.b*n.a*(1-t.a))/r,a:r})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(e){const t=this.toHsl(),{h:n}=t,r=[this],i=360/e;for(let o=1;o<e;o++)r.push(new ls({h:(n+o*i)%360,s:t.s,l:t.l}));return r}equals(e){const t=new ls(e);return"cmyk"===this.format||"cmyk"===t.format?this.toCmykString()===t.toCmykString():this.toRgbString()===t.toRgbString()}}var cs="EyeDropper"in window,us=class extends dt{constructor(){super(),this.formControlController=new In(this),this.isSafeValue=!1,this.localize=new ln(this),this.hasFocus=!1,this.isDraggingGridHandle=!1,this.isEmpty=!1,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=!1,this.size="medium",this.noFormatToggle=!1,this.name="",this.disabled=!1,this.hoist=!1,this.opacity=!1,this.uppercase=!1,this.swatches="",this.form="",this.required=!1,this.handleFocusIn=()=>{this.hasFocus=!0,this.emit("sl-focus")},this.handleFocusOut=()=>{this.hasFocus=!1,this.emit("sl-blur")},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut)}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity()})}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied")})}handleFormatToggle(){const e=["hex","rgb","hsl","hsv"],t=(e.indexOf(this.format)+1)%e.length;this.format=e[t],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input")}handleAlphaDrag(e){const t=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),n=t.querySelector(".color-picker__slider-handle"),{width:r}=t.getBoundingClientRect();let i=this.value,o=this.value;n.focus(),e.preventDefault(),co(t,{onMove:e=>{this.alpha=Bi(e/r*100,0,100),this.syncValues(),this.value!==o&&(o=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"))},initialEvent:e})}handleHueDrag(e){const t=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),n=t.querySelector(".color-picker__slider-handle"),{width:r}=t.getBoundingClientRect();let i=this.value,o=this.value;n.focus(),e.preventDefault(),co(t,{onMove:e=>{this.hue=Bi(e/r*360,0,360),this.syncValues(),this.value!==o&&(o=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==i&&(i=this.value,this.emit("sl-change"))},initialEvent:e})}handleGridDrag(e){const t=this.shadowRoot.querySelector(".color-picker__grid"),n=t.querySelector(".color-picker__grid-handle"),{width:r,height:i}=t.getBoundingClientRect();let o=this.value,a=this.value;n.focus(),e.preventDefault(),this.isDraggingGridHandle=!0,co(t,{onMove:(e,t)=>{this.saturation=Bi(e/r*100,0,100),this.brightness=Bi(100-t/i*100,0,100),this.syncValues(),this.value!==a&&(a=this.value,this.emit("sl-input"))},onStop:()=>{this.isDraggingGridHandle=!1,this.value!==o&&(o=this.value,this.emit("sl-change"))},initialEvent:e})}handleAlphaKeyDown(e){const t=e.shiftKey?10:1,n=this.value;"ArrowLeft"===e.key&&(e.preventDefault(),this.alpha=Bi(this.alpha-t,0,100),this.syncValues()),"ArrowRight"===e.key&&(e.preventDefault(),this.alpha=Bi(this.alpha+t,0,100),this.syncValues()),"Home"===e.key&&(e.preventDefault(),this.alpha=0,this.syncValues()),"End"===e.key&&(e.preventDefault(),this.alpha=100,this.syncValues()),this.value!==n&&(this.emit("sl-change"),this.emit("sl-input"))}handleHueKeyDown(e){const t=e.shiftKey?10:1,n=this.value;"ArrowLeft"===e.key&&(e.preventDefault(),this.hue=Bi(this.hue-t,0,360),this.syncValues()),"ArrowRight"===e.key&&(e.preventDefault(),this.hue=Bi(this.hue+t,0,360),this.syncValues()),"Home"===e.key&&(e.preventDefault(),this.hue=0,this.syncValues()),"End"===e.key&&(e.preventDefault(),this.hue=360,this.syncValues()),this.value!==n&&(this.emit("sl-change"),this.emit("sl-input"))}handleGridKeyDown(e){const t=e.shiftKey?10:1,n=this.value;"ArrowLeft"===e.key&&(e.preventDefault(),this.saturation=Bi(this.saturation-t,0,100),this.syncValues()),"ArrowRight"===e.key&&(e.preventDefault(),this.saturation=Bi(this.saturation+t,0,100),this.syncValues()),"ArrowUp"===e.key&&(e.preventDefault(),this.brightness=Bi(this.brightness+t,0,100),this.syncValues()),"ArrowDown"===e.key&&(e.preventDefault(),this.brightness=Bi(this.brightness-t,0,100),this.syncValues()),this.value!==n&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputChange(e){const t=e.target,n=this.value;e.stopPropagation(),this.input.value?(this.setColor(t.value),t.value=this.value):this.value="",this.value!==n&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputInput(e){this.formControlController.updateValidity(),e.stopPropagation()}handleInputKeyDown(e){if("Enter"===e.key){const e=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0}}handleInputInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleTouchMove(e){e.preventDefault()}parseColor(e){const t=new ls(e);if(!t.isValid)return null;const n=t.toHsl(),r={h:n.h,s:100*n.s,l:100*n.l,a:n.a},i=t.toRgb(),o=t.toHexString(),a=t.toHex8String(),s=t.toHsv(),l={h:s.h,s:100*s.s,v:100*s.v,a:s.a};return{hsl:{h:r.h,s:r.s,l:r.l,string:this.setLetterCase(`hsl(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%)`)},hsla:{h:r.h,s:r.s,l:r.l,a:r.a,string:this.setLetterCase(`hsla(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%, ${r.a.toFixed(2).toString()})`)},hsv:{h:l.h,s:l.s,v:l.v,string:this.setLetterCase(`hsv(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%)`)},hsva:{h:l.h,s:l.s,v:l.v,a:l.a,string:this.setLetterCase(`hsva(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%, ${l.a.toFixed(2).toString()})`)},rgb:{r:i.r,g:i.g,b:i.b,string:this.setLetterCase(`rgb(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)})`)},rgba:{r:i.r,g:i.g,b:i.b,a:i.a,string:this.setLetterCase(`rgba(${Math.round(i.r)}, ${Math.round(i.g)}, ${Math.round(i.b)}, ${i.a.toFixed(2).toString()})`)},hex:this.setLetterCase(o),hexa:this.setLetterCase(a)}}setColor(e){const t=this.parseColor(e);return null!==t&&(this.hue=t.hsva.h,this.saturation=t.hsva.s,this.brightness=t.hsva.v,this.alpha=this.opacity?100*t.hsva.a:100,this.syncValues(),!0)}setLetterCase(e){return"string"!=typeof e?"":this.uppercase?e.toUpperCase():e.toLowerCase()}async syncValues(){const e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);null!==e&&("hsl"===this.format?this.inputValue=this.opacity?e.hsla.string:e.hsl.string:"rgb"===this.format?this.inputValue=this.opacity?e.rgba.string:e.rgb.string:"hsv"===this.format?this.inputValue=this.opacity?e.hsva.string:e.hsv.string:this.inputValue=this.opacity?e.hexa:e.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied")}handleEyeDropper(){if(!cs)return;(new EyeDropper).open().then(e=>{const t=this.value;this.setColor(e.sRGBHex),this.value!==t&&(this.emit("sl-change"),this.emit("sl-input"))}).catch(()=>{})}selectSwatch(e){const t=this.value;this.disabled||(this.setColor(e),this.value!==t&&(this.emit("sl-change"),this.emit("sl-input")))}getHexString(e,t,n,r=100){const i=new ls(`hsva(${e}, ${t}%, ${n}%, ${r/100})`);return i.isValid?i.toHex8String():""}stopNestedEventPropagation(e){e.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}handleValueChange(e,t){if(this.isEmpty=!t,t||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){const n=this.parseColor(t);null!==n?(this.inputValue=this.value,this.hue=n.hsva.h,this.saturation=n.hsva.s,this.brightness=n.hsva.v,this.alpha=100*n.hsva.a,this.syncValues()):this.inputValue=null!=e?e:""}}focus(e){this.inline?this.base.focus(e):this.trigger.focus(e)}blur(){var e;const t=this.inline?this.base:this.trigger;this.hasFocus&&(t.focus({preventScroll:!0}),t.blur()),(null==(e=this.dropdown)?void 0:e.open)&&this.dropdown.hide()}getFormattedValue(e="hex"){const t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(null===t)return"";switch(e){case"hex":return t.hex;case"hexa":return t.hexa;case"rgb":return t.rgb.string;case"rgba":return t.rgba.string;case"hsl":return t.hsl.string;case"hsla":return t.hsla.string;case"hsv":return t.hsv.string;case"hsva":return t.hsva.string;default:return""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.inline||this.validity.valid?this.input.reportValidity():(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:!0}),this.disabled||this.formControlController.emitInvalidEvent(),!1)}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.saturation,t=100-this.brightness,n=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(e=>""!==e.trim()),r=we`
      <div
        part="base"
        class=${Ut({"color-picker":!0,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-labelledby="label"
        tabindex=${this.inline?"0":"-1"}
      >
        ${this.inline?we`
              <sl-visually-hidden id="label">
                <slot name="label">${this.label}</slot>
              </sl-visually-hidden>
            `:null}

        <div
          part="grid"
          class="color-picker__grid"
          style=${Ki({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${Ut({"color-picker__grid-handle":!0,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${Ki({top:`${t}%`,left:`${e}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${Gt(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="color-picker__slider-handle"
                style=${Ki({left:(0===this.hue?0:100/(360/this.hue))+"%"})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${Gt(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?we`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${Ki({backgroundImage:`linear-gradient(\n                          to right,\n                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,\n                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%\n                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="color-picker__slider-handle"
                      style=${Ki({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${Gt(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${Ki({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input" aria-live="polite">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            value=${this.isEmpty?"":this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
            @sl-input=${this.handleInputInput}
            @sl-invalid=${this.handleInputInvalid}
            @sl-blur=${this.stopNestedEventPropagation}
            @sl-focus=${this.stopNestedEventPropagation}
          ></sl-input>

          <sl-button-group>
            ${this.noFormatToggle?"":we`
                  <sl-button
                    part="format-button"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                `}
            ${cs?we`
                  <sl-button
                    part="eye-dropper-button"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></sl-icon>
                  </sl-button>
                `:""}
          </sl-button-group>
        </div>

        ${n.length>0?we`
              <div part="swatches" class="color-picker__swatches">
                ${n.map(e=>{const t=this.parseColor(e);return t?we`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${Gt(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${e}
                      @click=${()=>this.selectSwatch(e)}
                      @keydown=${e=>!this.disabled&&"Enter"===e.key&&this.setColor(t.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${Ki({backgroundColor:t.hexa})}
                      ></div>
                    </div>
                  `:""})}
              </div>
            `:""}
      </div>
    `;return this.inline?r:we`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled?"true":"false"}
        .containingElement=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${Ut({"color-dropdown__trigger":!0,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":"small"===this.size,"color-dropdown__trigger--medium":"medium"===this.size,"color-dropdown__trigger--large":"large"===this.size,"color-dropdown__trigger--empty":this.isEmpty,"color-dropdown__trigger--focused":this.hasFocus,"color-picker__transparent-bg":!0})}
          style=${Ki({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${r}
      </sl-dropdown>
    `}};us.styles=[Be,Ra],us.dependencies={"sl-button-group":Lo,"sl-button":Ba,"sl-dropdown":Aa,"sl-icon":It,"sl-input":qo,"sl-visually-hidden":ht},et([ct('[part~="base"]')],us.prototype,"base",2),et([ct('[part~="input"]')],us.prototype,"input",2),et([ct(".color-dropdown")],us.prototype,"dropdown",2),et([ct('[part~="preview"]')],us.prototype,"previewButton",2),et([ct('[part~="trigger"]')],us.prototype,"trigger",2),et([at()],us.prototype,"hasFocus",2),et([at()],us.prototype,"isDraggingGridHandle",2),et([at()],us.prototype,"isEmpty",2),et([at()],us.prototype,"inputValue",2),et([at()],us.prototype,"hue",2),et([at()],us.prototype,"saturation",2),et([at()],us.prototype,"brightness",2),et([at()],us.prototype,"alpha",2),et([ot()],us.prototype,"value",2),et([An()],us.prototype,"defaultValue",2),et([ot()],us.prototype,"label",2),et([ot()],us.prototype,"format",2),et([ot({type:Boolean,reflect:!0})],us.prototype,"inline",2),et([ot({reflect:!0})],us.prototype,"size",2),et([ot({attribute:"no-format-toggle",type:Boolean})],us.prototype,"noFormatToggle",2),et([ot()],us.prototype,"name",2),et([ot({type:Boolean,reflect:!0})],us.prototype,"disabled",2),et([ot({type:Boolean})],us.prototype,"hoist",2),et([ot({type:Boolean})],us.prototype,"opacity",2),et([ot({type:Boolean})],us.prototype,"uppercase",2),et([ot()],us.prototype,"swatches",2),et([ot({reflect:!0})],us.prototype,"form",2),et([ot({type:Boolean,reflect:!0})],us.prototype,"required",2),et([st({passive:!1})],us.prototype,"handleTouchMove",1),et([At("format",{waitUntilFirstUpdate:!0})],us.prototype,"handleFormatChange",1),et([At("opacity",{waitUntilFirstUpdate:!0})],us.prototype,"handleOpacityChange",1),et([At("value")],us.prototype,"handleValueChange",1);us.define("sl-color-picker"),gt({tagName:"sl-color-picker",elementClass:us,react:d,events:{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlFocus:"sl-focus",onSlInput:"sl-input",onSlInvalid:"sl-invalid"},displayName:"SlColorPicker"});var ds=F`
  :host {
    --error-color: var(--sl-color-danger-600);
    --success-color: var(--sl-color-success-600);

    display: inline-block;
  }

  .copy-button__button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
  }

  .copy-button--success .copy-button__button {
    color: var(--success-color);
  }

  .copy-button--error .copy-button__button {
    color: var(--error-color);
  }

  .copy-button__button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .copy-button__button[disabled] {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  slot {
    display: inline-flex;
  }
`,hs=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top",this.hoist=!1}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let e=this.value;if(this.from){const t=this.getRootNode(),n=this.from.includes("."),r=this.from.includes("[")&&this.from.includes("]");let i=this.from,o="";n?[i,o]=this.from.trim().split("."):r&&([i,o]=this.from.trim().replace(/\]$/,"").split("["));const a="getElementById"in t?t.getElementById(i):null;a?e=r?a.getAttribute(o)||"":n?a[o]||"":a.textContent||"":(this.showStatus("error"),this.emit("sl-error"))}if(e)try{await navigator.clipboard.writeText(e),this.showStatus("success"),this.emit("sl-copy",{detail:{value:e}})}catch(e){this.showStatus("error"),this.emit("sl-error")}else this.showStatus("error"),this.emit("sl-error")}async showStatus(e){const t=this.copyLabel||this.localize.term("copy"),n=this.successLabel||this.localize.term("copied"),r=this.errorLabel||this.localize.term("error"),i="success"===e?this.successIcon:this.errorIcon,o=_i(this,"copy.in",{dir:"ltr"}),a=_i(this,"copy.out",{dir:"ltr"});this.tooltip.content="success"===e?n:r,await this.copyIcon.animate(a.keyframes,a.options).finished,this.copyIcon.hidden=!0,this.status=e,i.hidden=!1,await i.animate(o.keyframes,o.options).finished,setTimeout(async()=>{await i.animate(a.keyframes,a.options).finished,i.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await this.copyIcon.animate(o.keyframes,o.options).finished,this.tooltip.content=t,this.isCopying=!1},this.feedbackDuration)}render(){const e=this.copyLabel||this.localize.term("copy");return we`
      <sl-tooltip
        class=${Ut({"copy-button":!0,"copy-button--success":"success"===this.status,"copy-button--error":"error"===this.status})}
        content=${e}
        placement=${this.tooltipPlacement}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        exportparts="
          base:tooltip__base,
          base__popup:tooltip__base__popup,
          base__arrow:tooltip__base__arrow,
          body:tooltip__body
        "
      >
        <button
          class="copy-button__button"
          part="button"
          type="button"
          ?disabled=${this.disabled}
          @click=${this.handleCopy}
        >
          <slot part="copy-icon" name="copy-icon">
            <sl-icon library="system" name="copy"></sl-icon>
          </slot>
          <slot part="success-icon" name="success-icon" hidden>
            <sl-icon library="system" name="check"></sl-icon>
          </slot>
          <slot part="error-icon" name="error-icon" hidden>
            <sl-icon library="system" name="x-lg"></sl-icon>
          </slot>
        </button>
      </sl-tooltip>
    `}};hs.styles=[Be,ds],hs.dependencies={"sl-icon":It,"sl-tooltip":Ti},et([ct('slot[name="copy-icon"]')],hs.prototype,"copyIcon",2),et([ct('slot[name="success-icon"]')],hs.prototype,"successIcon",2),et([ct('slot[name="error-icon"]')],hs.prototype,"errorIcon",2),et([ct("sl-tooltip")],hs.prototype,"tooltip",2),et([at()],hs.prototype,"isCopying",2),et([at()],hs.prototype,"status",2),et([ot()],hs.prototype,"value",2),et([ot()],hs.prototype,"from",2),et([ot({type:Boolean,reflect:!0})],hs.prototype,"disabled",2),et([ot({attribute:"copy-label"})],hs.prototype,"copyLabel",2),et([ot({attribute:"success-label"})],hs.prototype,"successLabel",2),et([ot({attribute:"error-label"})],hs.prototype,"errorLabel",2),et([ot({attribute:"feedback-duration",type:Number})],hs.prototype,"feedbackDuration",2),et([ot({attribute:"tooltip-placement"})],hs.prototype,"tooltipPlacement",2),et([ot({type:Boolean})],hs.prototype,"hoist",2),xi("copy.in",{keyframes:[{scale:".25",opacity:".25"},{scale:"1",opacity:"1"}],options:{duration:100}}),xi("copy.out",{keyframes:[{scale:"1",opacity:"1"},{scale:".25",opacity:"0"}],options:{duration:100}});hs.define("sl-copy-button"),gt({tagName:"sl-copy-button",elementClass:hs,react:d,events:{onSlCopy:"sl-copy",onSlError:"sl-error"},displayName:"SlCopyButton"});var ps=F`
  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }

  .details__header::-webkit-details-marker {
    display: none;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(1px + var(--sl-focus-ring-offset));
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
  }

  .details--open .details__summary-icon {
    rotate: 90deg;
  }

  .details--open.details--rtl .details__summary-icon {
    rotate: -90deg;
  }

  .details--open slot[name='expand-icon'],
  .details:not(.details--open) slot[name='collapse-icon'] {
    display: none;
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    display: block;
    padding: var(--sl-spacing-medium);
  }
`,fs=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.open=!1,this.disabled=!1}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(e=>{for(const t of e)"attributes"===t.type&&"open"===t.attributeName&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}disconnectedCallback(){var e;super.disconnectedCallback(),null==(e=this.detailsObserver)||e.disconnect()}handleSummaryClick(e){e.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus())}handleSummaryKeyDown(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.open?this.hide():this.show()),"ArrowUp"!==e.key&&"ArrowLeft"!==e.key||(e.preventDefault(),this.hide()),"ArrowDown"!==e.key&&"ArrowRight"!==e.key||(e.preventDefault(),this.show())}async handleOpenChange(){if(this.open){this.details.open=!0;if(this.emit("sl-show",{cancelable:!0}).defaultPrevented)return this.open=!1,void(this.details.open=!1);await Ai(this.body);const{keyframes:e,options:t}=_i(this,"details.show",{dir:this.localize.dir()});await Ci(this.body,$i(e,this.body.scrollHeight),t),this.body.style.height="auto",this.emit("sl-after-show")}else{if(this.emit("sl-hide",{cancelable:!0}).defaultPrevented)return this.details.open=!0,void(this.open=!0);await Ai(this.body);const{keyframes:e,options:t}=_i(this,"details.hide",{dir:this.localize.dir()});await Ci(this.body,$i(e,this.body.scrollHeight),t),this.body.style.height="auto",this.details.open=!1,this.emit("sl-after-hide")}}async show(){if(!this.open&&!this.disabled)return this.open=!0,Si(this,"sl-after-show")}async hide(){if(this.open&&!this.disabled)return this.open=!1,Si(this,"sl-after-hide")}render(){const e="rtl"===this.localize.dir();return we`
      <details
        part="base"
        class=${Ut({details:!0,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":e})}
      >
        <summary
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary" class="details__summary">${this.summary}</slot>

          <span part="summary-icon" class="details__summary-icon">
            <slot name="expand-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot name="collapse-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </span>
        </summary>

        <div class="details__body" role="region" aria-labelledby="header">
          <slot part="content" id="content" class="details__content"></slot>
        </div>
      </details>
    `}};fs.styles=[Be,ps],fs.dependencies={"sl-icon":It},et([ct(".details")],fs.prototype,"details",2),et([ct(".details__header")],fs.prototype,"header",2),et([ct(".details__body")],fs.prototype,"body",2),et([ct(".details__expand-icon-slot")],fs.prototype,"expandIconSlot",2),et([ot({type:Boolean,reflect:!0})],fs.prototype,"open",2),et([ot()],fs.prototype,"summary",2),et([ot({type:Boolean,reflect:!0})],fs.prototype,"disabled",2),et([At("open",{waitUntilFirstUpdate:!0})],fs.prototype,"handleOpenChange",1),xi("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}}),xi("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});fs.define("sl-details");var ms=gt({tagName:"sl-details",elementClass:fs,react:d,events:{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide"},displayName:"SlDetails"}),gs=F`
  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`,bs=class extends dt{constructor(){super(...arguments),this.hasSlotController=new Vn(this,"footer"),this.localize=new ln(this),this.modal=new _a(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=e=>{"Escape"===e.key&&this.modal.isActive()&&this.open&&(e.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),gn(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),bn(this),this.removeOpenListeners()}requestClose(e){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:e}}).defaultPrevented){const e=_i(this,"dialog.denyClose",{dir:this.localize.dir()});return void Ci(this.panel,e.keyframes,e.options)}this.hide()}addOpenListeners(){var e;"CloseWatcher"in window?(null==(e=this.closeWatcher)||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var e;null==(e=this.closeWatcher)||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),gn(this);const e=this.querySelector("[autofocus]");e&&e.removeAttribute("autofocus"),await Promise.all([Ai(this.dialog),Ai(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(e?e.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),e&&e.setAttribute("autofocus","")});const t=_i(this,"dialog.show",{dir:this.localize.dir()}),n=_i(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([Ci(this.panel,t.keyframes,t.options),Ci(this.overlay,n.keyframes,n.options)]),this.emit("sl-after-show")}else{Sa(this),this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([Ai(this.dialog),Ai(this.overlay)]);const e=_i(this,"dialog.hide",{dir:this.localize.dir()}),t=_i(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([Ci(this.overlay,t.keyframes,t.options).then(()=>{this.overlay.hidden=!0}),Ci(this.panel,e.keyframes,e.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,bn(this);const n=this.originalTrigger;"function"==typeof(null==n?void 0:n.focus)&&setTimeout(()=>n.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,Si(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Si(this,"sl-after-hide")}render(){return we`
      <div
        part="base"
        class=${Ut({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${Gt(this.noHeader?this.label:void 0)}
          aria-labelledby=${Gt(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":we`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};bs.styles=[Be,gs],bs.dependencies={"sl-icon-button":Qt},et([ct(".dialog")],bs.prototype,"dialog",2),et([ct(".dialog__panel")],bs.prototype,"panel",2),et([ct(".dialog__overlay")],bs.prototype,"overlay",2),et([ot({type:Boolean,reflect:!0})],bs.prototype,"open",2),et([ot({reflect:!0})],bs.prototype,"label",2),et([ot({attribute:"no-header",type:Boolean,reflect:!0})],bs.prototype,"noHeader",2),et([At("open",{waitUntilFirstUpdate:!0})],bs.prototype,"handleOpenChange",1),xi("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),xi("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}}),xi("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}}),xi("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}}),xi("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});bs.define("sl-dialog"),gt({tagName:"sl-dialog",elementClass:bs,react:d,events:{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide",onSlInitialFocus:"sl-initial-focus",onSlRequestClose:"sl-request-close"},displayName:"SlDialog"});var ys=F`
  :host {
    --control-box-size: 3rem;
    --icon-size: calc(var(--control-box-size) * 0.625);

    display: inline-flex;
    position: relative;
    cursor: pointer;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  img[aria-hidden='true'] {
    display: none;
  }

  .animated-image__control-box {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: calc(50% - var(--control-box-size) / 2);
    right: calc(50% - var(--control-box-size) / 2);
    width: var(--control-box-size);
    height: var(--control-box-size);
    font-size: var(--icon-size);
    background: none;
    border: solid 2px currentColor;
    background-color: rgb(0 0 0 /50%);
    border-radius: var(--sl-border-radius-circle);
    color: white;
    pointer-events: none;
    transition: var(--sl-transition-fast) opacity;
  }

  :host([play]:hover) .animated-image__control-box {
    opacity: 1;
  }

  :host([play]:not(:hover)) .animated-image__control-box {
    opacity: 0;
  }

  :host([play]) slot[name='play-icon'],
  :host(:not([play])) slot[name='pause-icon'] {
    display: none;
  }
`,vs=class extends dt{constructor(){super(...arguments),this.isLoaded=!1}handleClick(){this.play=!this.play}handleLoad(){const e=document.createElement("canvas"),{width:t,height:n}=this.animatedImage;e.width=t,e.height=n,e.getContext("2d").drawImage(this.animatedImage,0,0,t,n),this.frozenFrame=e.toDataURL("image/gif"),this.isLoaded||(this.emit("sl-load"),this.isLoaded=!0)}handleError(){this.emit("sl-error")}handlePlayChange(){this.play&&(this.animatedImage.src="",this.animatedImage.src=this.src)}handleSrcChange(){this.isLoaded=!1}render(){return we`
      <div class="animated-image">
        <img
          class="animated-image__animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${this.play?"false":"true"}
          @click=${this.handleClick}
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded?we`
              <img
                class="animated-image__frozen"
                src=${this.frozenFrame}
                alt=${this.alt}
                aria-hidden=${this.play?"true":"false"}
                @click=${this.handleClick}
              />

              <div part="control-box" class="animated-image__control-box">
                <slot name="play-icon"><sl-icon name="play-fill" library="system"></sl-icon></slot>
                <slot name="pause-icon"><sl-icon name="pause-fill" library="system"></sl-icon></slot>
              </div>
            `:""}
      </div>
    `}};vs.styles=[Be,ys],vs.dependencies={"sl-icon":It},et([ct(".animated-image__animated")],vs.prototype,"animatedImage",2),et([at()],vs.prototype,"frozenFrame",2),et([at()],vs.prototype,"isLoaded",2),et([ot()],vs.prototype,"src",2),et([ot()],vs.prototype,"alt",2),et([ot({type:Boolean,reflect:!0})],vs.prototype,"play",2),et([At("play",{waitUntilFirstUpdate:!0})],vs.prototype,"handlePlayChange",1),et([At("src")],vs.prototype,"handleSrcChange",1);vs.define("sl-animated-image"),gt({tagName:"sl-animated-image",elementClass:vs,react:d,events:{onSlLoad:"sl-load",onSlError:"sl-error"},displayName:"SlAnimatedImage"});const ws={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",easeInSine:"cubic-bezier(0.47, 0, 0.745, 0.715)",easeOutSine:"cubic-bezier(0.39, 0.575, 0.565, 1)",easeInOutSine:"cubic-bezier(0.445, 0.05, 0.55, 0.95)",easeInQuad:"cubic-bezier(0.55, 0.085, 0.68, 0.53)",easeOutQuad:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",easeInOutQuad:"cubic-bezier(0.455, 0.03, 0.515, 0.955)",easeInCubic:"cubic-bezier(0.55, 0.055, 0.675, 0.19)",easeOutCubic:"cubic-bezier(0.215, 0.61, 0.355, 1)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1)",easeInQuart:"cubic-bezier(0.895, 0.03, 0.685, 0.22)",easeOutQuart:"cubic-bezier(0.165, 0.84, 0.44, 1)",easeInOutQuart:"cubic-bezier(0.77, 0, 0.175, 1)",easeInQuint:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",easeOutQuint:"cubic-bezier(0.23, 1, 0.32, 1)",easeInOutQuint:"cubic-bezier(0.86, 0, 0.07, 1)",easeInExpo:"cubic-bezier(0.95, 0.05, 0.795, 0.035)",easeOutExpo:"cubic-bezier(0.19, 1, 0.22, 1)",easeInOutExpo:"cubic-bezier(1, 0, 0, 1)",easeInCirc:"cubic-bezier(0.6, 0.04, 0.98, 0.335)",easeOutCirc:"cubic-bezier(0.075, 0.82, 0.165, 1)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.15, 0.86)",easeInBack:"cubic-bezier(0.6, -0.28, 0.735, 0.045)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",easeInOutBack:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},ks=Object.freeze(Object.defineProperty({__proto__:null,backInDown:[{offset:0,transform:"translateY(-1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],backInLeft:[{offset:0,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],backInRight:[{offset:0,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],backInUp:[{offset:0,transform:"translateY(1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],backOutDown:[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(700px) scale(0.7)",opacity:"0.7"}],backOutLeft:[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"}],backOutRight:[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"}],backOutUp:[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(-700px) scale(0.7)",opacity:"0.7"}],bounce:[{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.4,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.43,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.53,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.7,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -15px, 0) scaleY(1.05)"},{offset:.8,"transition-timing-function":"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0) scaleY(0.95)"},{offset:.9,transform:"translate3d(0, -4px, 0) scaleY(1.02)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"}],bounceIn:[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.2,transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.4,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.4,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"scale3d(1.03, 1.03, 1.03)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.8,transform:"scale3d(0.97, 0.97, 0.97)"},{offset:.8,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,opacity:"1",transform:"scale3d(1, 1, 1)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],bounceInDown:[{offset:0,opacity:"0",transform:"translate3d(0, -3000px, 0) scaleY(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, 25px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, -10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, 5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],bounceInLeft:[{offset:0,opacity:"0",transform:"translate3d(-3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(-10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],bounceInRight:[{offset:0,opacity:"0",transform:"translate3d(3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(-25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(-5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],bounceInUp:[{offset:0,opacity:"0",transform:"translate3d(0, 3000px, 0) scaleY(5)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, 10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, -5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],bounceOut:[{offset:.2,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.5,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.55,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:1,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"}],bounceOutDown:[{offset:.2,transform:"translate3d(0, 10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0) scaleY(3)"}],bounceOutLeft:[{offset:.2,opacity:"1",transform:"translate3d(20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0) scaleX(2)"}],bounceOutRight:[{offset:.2,opacity:"1",transform:"translate3d(-20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0) scaleX(2)"}],bounceOutUp:[{offset:.2,transform:"translate3d(0, -10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0) scaleY(3)"}],easings:ws,fadeIn:[{offset:0,opacity:"0"},{offset:1,opacity:"1"}],fadeInBottomLeft:[{offset:0,opacity:"0",transform:"translate3d(-100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInBottomRight:[{offset:0,opacity:"0",transform:"translate3d(100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInDown:[{offset:0,opacity:"0",transform:"translate3d(0, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInDownBig:[{offset:0,opacity:"0",transform:"translate3d(0, -2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInLeft:[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInLeftBig:[{offset:0,opacity:"0",transform:"translate3d(-2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInRight:[{offset:0,opacity:"0",transform:"translate3d(100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInRightBig:[{offset:0,opacity:"0",transform:"translate3d(2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInTopLeft:[{offset:0,opacity:"0",transform:"translate3d(-100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInTopRight:[{offset:0,opacity:"0",transform:"translate3d(100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInUp:[{offset:0,opacity:"0",transform:"translate3d(0, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInUpBig:[{offset:0,opacity:"0",transform:"translate3d(0, 2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeOut:[{offset:0,opacity:"1"},{offset:1,opacity:"0"}],fadeOutBottomLeft:[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, 100%, 0)"}],fadeOutBottomRight:[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, 100%, 0)"}],fadeOutDown:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 100%, 0)"}],fadeOutDownBig:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0)"}],fadeOutLeft:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-100%, 0, 0)"}],fadeOutLeftBig:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0)"}],fadeOutRight:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0)"}],fadeOutRightBig:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0)"}],fadeOutTopLeft:[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, -100%, 0)"}],fadeOutTopRight:[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, -100%, 0)"}],fadeOutUp:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -100%, 0)"}],fadeOutUpBig:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0)"}],flash:[{offset:0,opacity:"1"},{offset:.25,opacity:"0"},{offset:.5,opacity:"1"},{offset:.75,opacity:"0"},{offset:1,opacity:"1"}],flip:[{offset:0,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)",easing:"ease-out"},{offset:.4,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -190deg)",easing:"ease-out"},{offset:.5,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -170deg)",easing:"ease-in"},{offset:.8,transform:"perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)\n      rotate3d(0, 1, 0, 0deg)",easing:"ease-in"},{offset:1,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)",easing:"ease-in"}],flipInX:[{offset:0,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(1, 0, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(1, 0, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],flipInY:[{offset:0,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(0, 1, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(0, 1, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(0, 1, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],flipOutX:[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",opacity:"0"}],flipOutY:[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(0, 1, 0, -15deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",opacity:"0"}],headShake:[{offset:0,transform:"translateX(0)"},{offset:.065,transform:"translateX(-6px) rotateY(-9deg)"},{offset:.185,transform:"translateX(5px) rotateY(7deg)"},{offset:.315,transform:"translateX(-3px) rotateY(-5deg)"},{offset:.435,transform:"translateX(2px) rotateY(3deg)"},{offset:.5,transform:"translateX(0)"}],heartBeat:[{offset:0,transform:"scale(1)"},{offset:.14,transform:"scale(1.3)"},{offset:.28,transform:"scale(1)"},{offset:.42,transform:"scale(1.3)"},{offset:.7,transform:"scale(1)"}],hinge:[{offset:0,easing:"ease-in-out"},{offset:.2,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.4,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:.6,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.8,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:1,transform:"translate3d(0, 700px, 0)",opacity:"0"}],jackInTheBox:[{offset:0,opacity:"0",transform:"scale(0.1) rotate(30deg)","transform-origin":"center bottom"},{offset:.5,transform:"rotate(-10deg)"},{offset:.7,transform:"rotate(3deg)"},{offset:1,opacity:"1",transform:"scale(1)"}],jello:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.111,transform:"translate3d(0, 0, 0)"},{offset:.222,transform:"skewX(-12.5deg) skewY(-12.5deg)"},{offset:.33299999999999996,transform:"skewX(6.25deg) skewY(6.25deg)"},{offset:.444,transform:"skewX(-3.125deg) skewY(-3.125deg)"},{offset:.555,transform:"skewX(1.5625deg) skewY(1.5625deg)"},{offset:.6659999999999999,transform:"skewX(-0.78125deg) skewY(-0.78125deg)"},{offset:.777,transform:"skewX(0.390625deg) skewY(0.390625deg)"},{offset:.888,transform:"skewX(-0.1953125deg) skewY(-0.1953125deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],lightSpeedInLeft:[{offset:0,transform:"translate3d(-100%, 0, 0) skewX(30deg)",opacity:"0"},{offset:.6,transform:"skewX(-20deg)",opacity:"1"},{offset:.8,transform:"skewX(5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],lightSpeedInRight:[{offset:0,transform:"translate3d(100%, 0, 0) skewX(-30deg)",opacity:"0"},{offset:.6,transform:"skewX(20deg)",opacity:"1"},{offset:.8,transform:"skewX(-5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],lightSpeedOutLeft:[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(-100%, 0, 0) skewX(-30deg)",opacity:"0"}],lightSpeedOutRight:[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(100%, 0, 0) skewX(30deg)",opacity:"0"}],pulse:[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.5,transform:"scale3d(1.05, 1.05, 1.05)"},{offset:1,transform:"scale3d(1, 1, 1)"}],rollIn:[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],rollOut:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)"}],rotateIn:[{offset:0,transform:"rotate3d(0, 0, 1, -200deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],rotateInDownLeft:[{offset:0,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],rotateInDownRight:[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],rotateInUpLeft:[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],rotateInUpRight:[{offset:0,transform:"rotate3d(0, 0, 1, -90deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],rotateOut:[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 200deg)",opacity:"0"}],rotateOutDownLeft:[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"}],rotateOutDownRight:[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],rotateOutUpLeft:[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],rotateOutUpRight:[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 90deg)",opacity:"0"}],rubberBand:[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.3,transform:"scale3d(1.25, 0.75, 1)"},{offset:.4,transform:"scale3d(0.75, 1.25, 1)"},{offset:.5,transform:"scale3d(1.15, 0.85, 1)"},{offset:.65,transform:"scale3d(0.95, 1.05, 1)"},{offset:.75,transform:"scale3d(1.05, 0.95, 1)"},{offset:1,transform:"scale3d(1, 1, 1)"}],shake:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],shakeX:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],shakeY:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(0, -10px, 0)"},{offset:.2,transform:"translate3d(0, 10px, 0)"},{offset:.3,transform:"translate3d(0, -10px, 0)"},{offset:.4,transform:"translate3d(0, 10px, 0)"},{offset:.5,transform:"translate3d(0, -10px, 0)"},{offset:.6,transform:"translate3d(0, 10px, 0)"},{offset:.7,transform:"translate3d(0, -10px, 0)"},{offset:.8,transform:"translate3d(0, 10px, 0)"},{offset:.9,transform:"translate3d(0, -10px, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],slideInDown:[{offset:0,transform:"translate3d(0, -100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],slideInLeft:[{offset:0,transform:"translate3d(-100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],slideInRight:[{offset:0,transform:"translate3d(100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],slideInUp:[{offset:0,transform:"translate3d(0, 100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],slideOutDown:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, 100%, 0)"}],slideOutLeft:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(-100%, 0, 0)"}],slideOutRight:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(100%, 0, 0)"}],slideOutUp:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, -100%, 0)"}],swing:[{offset:.2,transform:"rotate3d(0, 0, 1, 15deg)"},{offset:.4,transform:"rotate3d(0, 0, 1, -10deg)"},{offset:.6,transform:"rotate3d(0, 0, 1, 5deg)"},{offset:.8,transform:"rotate3d(0, 0, 1, -5deg)"},{offset:1,transform:"rotate3d(0, 0, 1, 0deg)"}],tada:[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.1,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.2,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.3,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.4,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.5,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.6,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.7,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.8,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.9,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:1,transform:"scale3d(1, 1, 1)"}],wobble:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.15,transform:"translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)"},{offset:.3,transform:"translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)"},{offset:.45,transform:"translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)"},{offset:.6,transform:"translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)"},{offset:.75,transform:"translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],zoomIn:[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:.5,opacity:"1"}],zoomInDown:[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],zoomInLeft:[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],zoomInRight:[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],zoomInUp:[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],zoomOut:[{offset:0,opacity:"1"},{offset:.5,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:1,opacity:"0"}],zoomOutDown:[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],zoomOutLeft:[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(-2000px, 0, 0)"}],zoomOutRight:[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(2000px, 0, 0)"}],zoomOutUp:[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}]},Symbol.toStringTag,{value:"Module"}));var xs=F`
  :host {
    display: contents;
  }
`,_s=class extends dt{constructor(){super(...arguments),this.hasStarted=!1,this.name="none",this.play=!1,this.delay=0,this.direction="normal",this.duration=1e3,this.easing="linear",this.endDelay=0,this.fill="auto",this.iterations=1/0,this.iterationStart=0,this.playbackRate=1,this.handleAnimationFinish=()=>{this.play=!1,this.hasStarted=!1,this.emit("sl-finish")},this.handleAnimationCancel=()=>{this.play=!1,this.hasStarted=!1,this.emit("sl-cancel")}}get currentTime(){var e,t;return null!=(t=null==(e=this.animation)?void 0:e.currentTime)?t:0}set currentTime(e){this.animation&&(this.animation.currentTime=e)}connectedCallback(){super.connectedCallback(),this.createAnimation()}disconnectedCallback(){super.disconnectedCallback(),this.destroyAnimation()}handleSlotChange(){this.destroyAnimation(),this.createAnimation()}async createAnimation(){var e,t;const n=null!=(e=ws[this.easing])?e:this.easing,r=null!=(t=this.keyframes)?t:ks[this.name],i=(await this.defaultSlot).assignedElements()[0];return!(!i||!r)&&(this.destroyAnimation(),this.animation=i.animate(r,{delay:this.delay,direction:this.direction,duration:this.duration,easing:n,endDelay:this.endDelay,fill:this.fill,iterationStart:this.iterationStart,iterations:this.iterations}),this.animation.playbackRate=this.playbackRate,this.animation.addEventListener("cancel",this.handleAnimationCancel),this.animation.addEventListener("finish",this.handleAnimationFinish),this.play?(this.hasStarted=!0,this.emit("sl-start")):this.animation.pause(),!0)}destroyAnimation(){this.animation&&(this.animation.cancel(),this.animation.removeEventListener("cancel",this.handleAnimationCancel),this.animation.removeEventListener("finish",this.handleAnimationFinish),this.hasStarted=!1)}handleAnimationChange(){this.hasUpdated&&this.createAnimation()}handlePlayChange(){return!!this.animation&&(this.play&&!this.hasStarted&&(this.hasStarted=!0,this.emit("sl-start")),this.play?this.animation.play():this.animation.pause(),!0)}handlePlaybackRateChange(){this.animation&&(this.animation.playbackRate=this.playbackRate)}cancel(){var e;null==(e=this.animation)||e.cancel()}finish(){var e;null==(e=this.animation)||e.finish()}render(){return we` <slot @slotchange=${this.handleSlotChange}></slot> `}};_s.styles=[Be,xs],et([function(e){return(t,n)=>lt(t,n,{async get(){return await this.updateComplete,this.renderRoot?.querySelector(e)??null}})}("slot")],_s.prototype,"defaultSlot",2),et([ot()],_s.prototype,"name",2),et([ot({type:Boolean,reflect:!0})],_s.prototype,"play",2),et([ot({type:Number})],_s.prototype,"delay",2),et([ot()],_s.prototype,"direction",2),et([ot({type:Number})],_s.prototype,"duration",2),et([ot()],_s.prototype,"easing",2),et([ot({attribute:"end-delay",type:Number})],_s.prototype,"endDelay",2),et([ot()],_s.prototype,"fill",2),et([ot({type:Number})],_s.prototype,"iterations",2),et([ot({attribute:"iteration-start",type:Number})],_s.prototype,"iterationStart",2),et([ot({attribute:!1})],_s.prototype,"keyframes",2),et([ot({attribute:"playback-rate",type:Number})],_s.prototype,"playbackRate",2),et([At(["name","delay","direction","duration","easing","endDelay","fill","iterations","iterationsStart","keyframes"])],_s.prototype,"handleAnimationChange",1),et([At("play")],_s.prototype,"handlePlayChange",1),et([At("playbackRate")],_s.prototype,"handlePlaybackRateChange",1);_s.define("sl-animation"),gt({tagName:"sl-animation",elementClass:_s,react:d,events:{onSlCancel:"sl-cancel",onSlFinish:"sl-finish",onSlStart:"sl-start"},displayName:"SlAnimation"});var Ss=F`
  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`,Cs=class extends dt{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}handleImageLoadError(){this.hasError=!0,this.emit("sl-error")}render(){const e=we`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${this.handleImageLoadError}"
      />
    `;let t=we``;return t=this.initials?we`<div part="initials" class="avatar__initials">${this.initials}</div>`:we`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `,we`
      <div
        part="base"
        class=${Ut({avatar:!0,"avatar--circle":"circle"===this.shape,"avatar--rounded":"rounded"===this.shape,"avatar--square":"square"===this.shape})}
        role="img"
        aria-label=${this.label}
      >
        ${this.image&&!this.hasError?e:t}
      </div>
    `}};Cs.styles=[Be,Ss],Cs.dependencies={"sl-icon":It},et([at()],Cs.prototype,"hasError",2),et([ot()],Cs.prototype,"image",2),et([ot()],Cs.prototype,"label",2),et([ot()],Cs.prototype,"initials",2),et([ot()],Cs.prototype,"loading",2),et([ot({reflect:!0})],Cs.prototype,"shape",2),et([At("image")],Cs.prototype,"handleImageChange",1);Cs.define("sl-avatar"),gt({tagName:"sl-avatar",elementClass:Cs,react:d,events:{onSlError:"sl-error"},displayName:"SlAvatar"});var Es=F`
  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`,zs=class extends dt{constructor(){super(...arguments),this.localize=new ln(this),this.separatorDir=this.localize.dir(),this.label=""}getSeparator(){const e=this.separatorSlot.assignedElements({flatten:!0})[0].cloneNode(!0);return[e,...e.querySelectorAll("[id]")].forEach(e=>e.removeAttribute("id")),e.setAttribute("data-default",""),e.slot="separator",e}handleSlotChange(){const e=[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>"sl-breadcrumb-item"===e.tagName.toLowerCase());e.forEach((t,n)=>{const r=t.querySelector('[slot="separator"]');null===r?t.append(this.getSeparator()):r.hasAttribute("data-default")&&r.replaceWith(this.getSeparator()),n===e.length-1?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")})}render(){return this.separatorDir!==this.localize.dir()&&(this.separatorDir=this.localize.dir(),this.updateComplete.then(()=>this.handleSlotChange())),we`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <span hidden aria-hidden="true">
        <slot name="separator">
          <sl-icon name=${"rtl"===this.localize.dir()?"chevron-left":"chevron-right"} library="system"></sl-icon>
        </slot>
      </span>
    `}};zs.styles=[Be,Es],zs.dependencies={"sl-icon":It},et([ct("slot")],zs.prototype,"defaultSlot",2),et([ct('slot[name="separator"]')],zs.prototype,"separatorSlot",2),et([ot()],zs.prototype,"label",2);zs.define("sl-breadcrumb"),gt({tagName:"sl-breadcrumb",elementClass:zs,react:d,events:{},displayName:"SlBreadcrumb"});Ba.define("sl-button");var As=gt({tagName:"sl-button",elementClass:Ba,react:d,events:{onSlBlur:"sl-blur",onSlFocus:"sl-focus",onSlInvalid:"sl-invalid"},displayName:"SlButton"}),$s=F`
  :host {
    display: inline-flex;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-600);
    line-height: var(--sl-line-height-normal);
    white-space: nowrap;
  }

  .breadcrumb-item__label {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: var(--sl-transition-fast) --color;
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label {
    color: var(--sl-color-primary-600);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:hover {
    color: var(--sl-color-primary-500);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:active {
    color: var(--sl-color-primary-600);
  }

  .breadcrumb-item__label:focus {
    outline: none;
  }

  .breadcrumb-item__label:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .breadcrumb-item__prefix,
  .breadcrumb-item__suffix {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .breadcrumb-item--has-prefix .breadcrumb-item__prefix {
    display: inline-flex;
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .breadcrumb-item--has-suffix .breadcrumb-item__suffix {
    display: inline-flex;
    margin-inline-start: var(--sl-spacing-x-small);
  }

  :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  }

  .breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 var(--sl-spacing-x-small);
    user-select: none;
    -webkit-user-select: none;
  }
`,Ts=class extends dt{constructor(){super(...arguments),this.hasSlotController=new Vn(this,"prefix","suffix"),this.renderType="button",this.rel="noreferrer noopener"}setRenderType(){const e=this.defaultSlot.assignedElements({flatten:!0}).filter(e=>"sl-dropdown"===e.tagName.toLowerCase()).length>0;this.href?this.renderType="link":this.renderType=e?"dropdown":"button"}hrefChanged(){this.setRenderType()}handleSlotChange(){this.setRenderType()}render(){return we`
      <div
        part="base"
        class=${Ut({"breadcrumb-item":!0,"breadcrumb-item--has-prefix":this.hasSlotController.test("prefix"),"breadcrumb-item--has-suffix":this.hasSlotController.test("suffix")})}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix"></slot>
        </span>

        ${"link"===this.renderType?we`
              <a
                part="label"
                class="breadcrumb-item__label breadcrumb-item__label--link"
                href="${this.href}"
                target="${Gt(this.target?this.target:void 0)}"
                rel=${Gt(this.target?this.rel:void 0)}
              >
                <slot @slotchange=${this.handleSlotChange}></slot>
              </a>
            `:""}
        ${"button"===this.renderType?we`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </button>
            `:""}
        ${"dropdown"===this.renderType?we`
              <div part="label" class="breadcrumb-item__label breadcrumb-item__label--drop-down">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </div>
            `:""}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `}};Ts.styles=[Be,$s],et([ct("slot:not([name])")],Ts.prototype,"defaultSlot",2),et([at()],Ts.prototype,"renderType",2),et([ot()],Ts.prototype,"href",2),et([ot()],Ts.prototype,"target",2),et([ot()],Ts.prototype,"rel",2),et([At("href",{waitUntilFirstUpdate:!0})],Ts.prototype,"hrefChanged",1);Ts.define("sl-breadcrumb-item"),gt({tagName:"sl-breadcrumb-item",elementClass:Ts,react:d,events:{},displayName:"SlBreadcrumbItem"});var Ps=F`
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`,Ms=class extends dt{constructor(){super(...arguments),this.variant="primary",this.pill=!1,this.pulse=!1}render(){return we`
      <span
        part="base"
        class=${Ut({badge:!0,"badge--primary":"primary"===this.variant,"badge--success":"success"===this.variant,"badge--neutral":"neutral"===this.variant,"badge--warning":"warning"===this.variant,"badge--danger":"danger"===this.variant,"badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};Ms.styles=[Be,Ps],et([ot({reflect:!0})],Ms.prototype,"variant",2),et([ot({type:Boolean,reflect:!0})],Ms.prototype,"pill",2),et([ot({type:Boolean,reflect:!0})],Ms.prototype,"pulse",2);Ms.define("sl-badge");var Ls=gt({tagName:"sl-badge",elementClass:Ms,react:d,events:{},displayName:"SlBadge"}),Ds=F`
  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`,Is=class extends dt{constructor(){super(...arguments),this.hasSlotController=new Vn(this,"footer","header","image")}render(){return we`
      <div
        part="base"
        class=${Ut({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};Is.styles=[Be,Ds];Is.define("sl-card");var Ns=gt({tagName:"sl-card",elementClass:Is,react:d,events:{},displayName:"SlCard"}),Os=F`
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
    overflow: hidden;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--has-countdown {
    border-bottom: none;
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    margin-inline-end: var(--sl-spacing-medium);
    align-self: center;
  }

  .alert__countdown {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(var(--sl-panel-border-width) * 3);
    background-color: var(--sl-panel-border-color);
    display: flex;
  }

  .alert__countdown--ltr {
    justify-content: flex-end;
  }

  .alert__countdown .alert__countdown-elapsed {
    height: 100%;
    width: 0;
  }

  .alert--primary .alert__countdown-elapsed {
    background-color: var(--sl-color-primary-600);
  }

  .alert--success .alert__countdown-elapsed {
    background-color: var(--sl-color-success-600);
  }

  .alert--neutral .alert__countdown-elapsed {
    background-color: var(--sl-color-neutral-600);
  }

  .alert--warning .alert__countdown-elapsed {
    background-color: var(--sl-color-warning-600);
  }

  .alert--danger .alert__countdown-elapsed {
    background-color: var(--sl-color-danger-600);
  }

  .alert__timer {
    display: none;
  }
`,Fs=class e extends dt{constructor(){super(...arguments),this.hasSlotController=new Vn(this,"icon","suffix"),this.localize=new ln(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0,this.remainingTime=this.duration}static get toastStack(){return this.currentToastStack||(this.currentToastStack=Object.assign(document.createElement("div"),{className:"sl-toast-stack"})),this.currentToastStack}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){this.handleCountdownChange(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.duration),this.remainingTime=this.duration,this.remainingTimeInterval=window.setInterval(()=>{this.remainingTime-=100},100))}pauseAutoHide(){var e;null==(e=this.countdownAnimation)||e.pause(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval)}resumeAutoHide(){var e;this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.remainingTime),this.remainingTimeInterval=window.setInterval(()=>{this.remainingTime-=100},100),null==(e=this.countdownAnimation)||e.play())}handleCountdownChange(){if(this.open&&this.duration<1/0&&this.countdown){const{countdownElement:e}=this,t="100%",n="0";this.countdownAnimation=e.animate([{width:t},{width:n}],{duration:this.duration,easing:"linear"})}}handleCloseClick(){this.hide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await Ai(this.base),this.base.hidden=!1;const{keyframes:e,options:t}=_i(this,"alert.show",{dir:this.localize.dir()});await Ci(this.base,e,t),this.emit("sl-after-show")}else{Sa(this),this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),await Ai(this.base);const{keyframes:e,options:t}=_i(this,"alert.hide",{dir:this.localize.dir()});await Ci(this.base,e,t),this.base.hidden=!0,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=!0,Si(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Si(this,"sl-after-hide")}async toast(){return new Promise(t=>{this.handleCountdownChange(),null===e.toastStack.parentElement&&document.body.append(e.toastStack),e.toastStack.appendChild(this),requestAnimationFrame(()=>{this.show()}),this.addEventListener("sl-after-hide",()=>{e.toastStack.removeChild(this),t(),null===e.toastStack.querySelector("sl-alert")&&e.toastStack.remove()},{once:!0})})}render(){return we`
      <div
        part="base"
        class=${Ut({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-countdown":!!this.countdown,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":"primary"===this.variant,"alert--success":"success"===this.variant,"alert--neutral":"neutral"===this.variant,"alert--warning":"warning"===this.variant,"alert--danger":"danger"===this.variant})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mouseenter=${this.pauseAutoHide}
        @mouseleave=${this.resumeAutoHide}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable?we`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}

        <div role="timer" class="alert__timer">${this.remainingTime}</div>

        ${this.countdown?we`
              <div
                class=${Ut({alert__countdown:!0,"alert__countdown--ltr":"ltr"===this.countdown})}
              >
                <div class="alert__countdown-elapsed"></div>
              </div>
            `:""}
      </div>
    `}};Fs.styles=[Be,Os],Fs.dependencies={"sl-icon-button":Qt},et([ct('[part~="base"]')],Fs.prototype,"base",2),et([ct(".alert__countdown-elapsed")],Fs.prototype,"countdownElement",2),et([ot({type:Boolean,reflect:!0})],Fs.prototype,"open",2),et([ot({type:Boolean,reflect:!0})],Fs.prototype,"closable",2),et([ot({reflect:!0})],Fs.prototype,"variant",2),et([ot({type:Number})],Fs.prototype,"duration",2),et([ot({type:String,reflect:!0})],Fs.prototype,"countdown",2),et([at()],Fs.prototype,"remainingTime",2),et([At("open",{waitUntilFirstUpdate:!0})],Fs.prototype,"handleOpenChange",1),et([At("duration")],Fs.prototype,"handleDurationChange",1);var Vs=Fs;xi("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),xi("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});Vs.define("sl-alert"),gt({tagName:"sl-alert",elementClass:Vs,react:d,events:{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide"},displayName:"SlAlert"});var Rs=(e,t)=>{let n=0;return function(...r){window.clearTimeout(n),n=window.setTimeout(()=>{e.call(this,...r)},t)}},Bs=(e,t,n)=>{const r=e[t];e[t]=function(...e){r.call(this,...e),n.call(this,r,...e)}};(()=>{if("undefined"==typeof window)return;if(!("onscrollend"in window)){const e=new Set,t=new WeakMap,n=t=>{for(const n of t.changedTouches)e.add(n.identifier)},r=t=>{for(const n of t.changedTouches)e.delete(n.identifier)};document.addEventListener("touchstart",n,!0),document.addEventListener("touchend",r,!0),document.addEventListener("touchcancel",r,!0),Bs(EventTarget.prototype,"addEventListener",function(n,r){if("scrollend"!==r)return;const i=Rs(()=>{e.size?i():this.dispatchEvent(new Event("scrollend"))},100);n.call(this,"scroll",i,{passive:!0}),t.set(this,i)}),Bs(EventTarget.prototype,"removeEventListener",function(e,n){if("scrollend"!==n)return;const r=t.get(this);r&&e.call(this,"scroll",r,{passive:!0})})}})();const Us=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,Hs=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,js={};function qs(e,t){return(js.jsx?Hs:Us).test(e)}const Ws=/[ \t\n\f\r]/g;function Ks(e){return""===e.replace(Ws,"")}class Gs{constructor(e,t,n){this.normal=t,this.property=e,n&&(this.space=n)}}function Qs(e,t){const n={},r={};for(const t of e)Object.assign(n,t.property),Object.assign(r,t.normal);return new Gs(n,r,t)}function Ys(e){return e.toLowerCase()}Gs.prototype.normal={},Gs.prototype.property={},Gs.prototype.space=void 0;class Xs{constructor(e,t){this.attribute=t,this.property=e}}Xs.prototype.attribute="",Xs.prototype.booleanish=!1,Xs.prototype.boolean=!1,Xs.prototype.commaOrSpaceSeparated=!1,Xs.prototype.commaSeparated=!1,Xs.prototype.defined=!1,Xs.prototype.mustUseProperty=!1,Xs.prototype.number=!1,Xs.prototype.overloadedBoolean=!1,Xs.prototype.property="",Xs.prototype.spaceSeparated=!1,Xs.prototype.space=void 0;let Zs=0;const Js=al(),el=al(),tl=al(),nl=al(),rl=al(),il=al(),ol=al();function al(){return 2**++Zs}const sl=Object.freeze(Object.defineProperty({__proto__:null,boolean:Js,booleanish:el,commaOrSpaceSeparated:ol,commaSeparated:il,number:nl,overloadedBoolean:tl,spaceSeparated:rl},Symbol.toStringTag,{value:"Module"})),ll=Object.keys(sl);class cl extends Xs{constructor(e,t,n,r){let i=-1;if(super(e,t),ul(this,"space",r),"number"==typeof n)for(;++i<ll.length;){const e=ll[i];ul(this,ll[i],(n&sl[e])===sl[e])}}}function ul(e,t,n){n&&(e[t]=n)}function dl(e){const t={},n={};for(const[r,i]of Object.entries(e.properties)){const o=new cl(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(o.mustUseProperty=!0),t[r]=o,n[Ys(r)]=r,n[Ys(o.attribute)]=r}return new Gs(t,n,e.space)}cl.prototype.defined=!0;const hl=dl({properties:{ariaActiveDescendant:null,ariaAtomic:el,ariaAutoComplete:null,ariaBusy:el,ariaChecked:el,ariaColCount:nl,ariaColIndex:nl,ariaColSpan:nl,ariaControls:rl,ariaCurrent:null,ariaDescribedBy:rl,ariaDetails:null,ariaDisabled:el,ariaDropEffect:rl,ariaErrorMessage:null,ariaExpanded:el,ariaFlowTo:rl,ariaGrabbed:el,ariaHasPopup:null,ariaHidden:el,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:rl,ariaLevel:nl,ariaLive:null,ariaModal:el,ariaMultiLine:el,ariaMultiSelectable:el,ariaOrientation:null,ariaOwns:rl,ariaPlaceholder:null,ariaPosInSet:nl,ariaPressed:el,ariaReadOnly:el,ariaRelevant:null,ariaRequired:el,ariaRoleDescription:rl,ariaRowCount:nl,ariaRowIndex:nl,ariaRowSpan:nl,ariaSelected:el,ariaSetSize:nl,ariaSort:null,ariaValueMax:nl,ariaValueMin:nl,ariaValueNow:nl,ariaValueText:null,role:null},transform:(e,t)=>"role"===t?t:"aria-"+t.slice(4).toLowerCase()});function pl(e,t){return t in e?e[t]:t}function fl(e,t){return pl(e,t.toLowerCase())}const ml=dl({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:il,acceptCharset:rl,accessKey:rl,action:null,allow:null,allowFullScreen:Js,allowPaymentRequest:Js,allowUserMedia:Js,alt:null,as:null,async:Js,autoCapitalize:null,autoComplete:rl,autoFocus:Js,autoPlay:Js,blocking:rl,capture:null,charSet:null,checked:Js,cite:null,className:rl,cols:nl,colSpan:null,content:null,contentEditable:el,controls:Js,controlsList:rl,coords:nl|il,crossOrigin:null,data:null,dateTime:null,decoding:null,default:Js,defer:Js,dir:null,dirName:null,disabled:Js,download:tl,draggable:el,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:Js,formTarget:null,headers:rl,height:nl,hidden:tl,high:nl,href:null,hrefLang:null,htmlFor:rl,httpEquiv:rl,id:null,imageSizes:null,imageSrcSet:null,inert:Js,inputMode:null,integrity:null,is:null,isMap:Js,itemId:null,itemProp:rl,itemRef:rl,itemScope:Js,itemType:rl,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:Js,low:nl,manifest:null,max:null,maxLength:nl,media:null,method:null,min:null,minLength:nl,multiple:Js,muted:Js,name:null,nonce:null,noModule:Js,noValidate:Js,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:Js,optimum:nl,pattern:null,ping:rl,placeholder:null,playsInline:Js,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:Js,referrerPolicy:null,rel:rl,required:Js,reversed:Js,rows:nl,rowSpan:nl,sandbox:rl,scope:null,scoped:Js,seamless:Js,selected:Js,shadowRootClonable:Js,shadowRootDelegatesFocus:Js,shadowRootMode:null,shape:null,size:nl,sizes:null,slot:null,span:nl,spellCheck:el,src:null,srcDoc:null,srcLang:null,srcSet:null,start:nl,step:null,style:null,tabIndex:nl,target:null,title:null,translate:null,type:null,typeMustMatch:Js,useMap:null,value:el,width:nl,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:rl,axis:null,background:null,bgColor:null,border:nl,borderColor:null,bottomMargin:nl,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:Js,declare:Js,event:null,face:null,frame:null,frameBorder:null,hSpace:nl,leftMargin:nl,link:null,longDesc:null,lowSrc:null,marginHeight:nl,marginWidth:nl,noResize:Js,noHref:Js,noShade:Js,noWrap:Js,object:null,profile:null,prompt:null,rev:null,rightMargin:nl,rules:null,scheme:null,scrolling:el,standby:null,summary:null,text:null,topMargin:nl,valueType:null,version:null,vAlign:null,vLink:null,vSpace:nl,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:Js,disableRemotePlayback:Js,prefix:null,property:null,results:nl,security:null,unselectable:null},space:"html",transform:fl}),gl=dl({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:ol,accentHeight:nl,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:nl,amplitude:nl,arabicForm:null,ascent:nl,attributeName:null,attributeType:null,azimuth:nl,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:nl,by:null,calcMode:null,capHeight:nl,className:rl,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:nl,diffuseConstant:nl,direction:null,display:null,dur:null,divisor:nl,dominantBaseline:null,download:Js,dx:null,dy:null,edgeMode:null,editable:null,elevation:nl,enableBackground:null,end:null,event:null,exponent:nl,externalResourcesRequired:null,fill:null,fillOpacity:nl,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:il,g2:il,glyphName:il,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:nl,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:nl,horizOriginX:nl,horizOriginY:nl,id:null,ideographic:nl,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:nl,k:nl,k1:nl,k2:nl,k3:nl,k4:nl,kernelMatrix:ol,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:nl,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:nl,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:nl,overlineThickness:nl,paintOrder:null,panose1:null,path:null,pathLength:nl,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:rl,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:nl,pointsAtY:nl,pointsAtZ:nl,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:ol,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:ol,rev:ol,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:ol,requiredFeatures:ol,requiredFonts:ol,requiredFormats:ol,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:nl,specularExponent:nl,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:nl,strikethroughThickness:nl,string:null,stroke:null,strokeDashArray:ol,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:nl,strokeOpacity:nl,strokeWidth:null,style:null,surfaceScale:nl,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:ol,tabIndex:nl,tableValues:null,target:null,targetX:nl,targetY:nl,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:ol,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:nl,underlineThickness:nl,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:nl,values:null,vAlphabetic:nl,vMathematical:nl,vectorEffect:null,vHanging:nl,vIdeographic:nl,version:null,vertAdvY:nl,vertOriginX:nl,vertOriginY:nl,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:nl,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:pl}),bl=dl({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform:(e,t)=>"xlink:"+t.slice(5).toLowerCase()}),yl=dl({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:fl}),vl=dl({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform:(e,t)=>"xml:"+t.slice(3).toLowerCase()}),wl={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},kl=/[A-Z]/g,xl=/-[a-z]/g,_l=/^data[-\w.:]+$/i;function Sl(e){return"-"+e.toLowerCase()}function Cl(e){return e.charAt(1).toUpperCase()}const El=Qs([hl,ml,bl,yl,vl],"html"),zl=Qs([hl,gl,bl,yl,vl],"svg");var Al,$l,Tl,Pl={};var Ml=function(){if(Tl)return Pl;Tl=1;var e=Pl&&Pl.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Pl,"__esModule",{value:!0}),Pl.default=function(e,n){var r=null;if(!e||"string"!=typeof e)return r;var i=(0,t.default)(e),o="function"==typeof n;return i.forEach(function(e){if("declaration"===e.type){var t=e.property,i=e.value;o?n(t,i,e):i&&((r=r||{})[t]=i)}}),r};var t=e(function(){if($l)return Al;$l=1;var e=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,t=/\n/g,n=/^\s*/,r=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,i=/^:\s*/,o=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,a=/^[;\s]*/,s=/^\s+|\s+$/g,l="";function c(e){return e?e.replace(s,l):l}return Al=function(s,u){if("string"!=typeof s)throw new TypeError("First argument must be a string");if(!s)return[];u=u||{};var d=1,h=1;function p(e){var n=e.match(t);n&&(d+=n.length);var r=e.lastIndexOf("\n");h=~r?e.length-r:h+e.length}function f(){var e={line:d,column:h};return function(t){return t.position=new m(e),y(),t}}function m(e){this.start=e,this.end={line:d,column:h},this.source=u.source}function g(e){var t=new Error(u.source+":"+d+":"+h+": "+e);if(t.reason=e,t.filename=u.source,t.line=d,t.column=h,t.source=s,!u.silent)throw t}function b(e){var t=e.exec(s);if(t){var n=t[0];return p(n),s=s.slice(n.length),t}}function y(){b(n)}function v(e){var t;for(e=e||[];t=w();)!1!==t&&e.push(t);return e}function w(){var e=f();if("/"==s.charAt(0)&&"*"==s.charAt(1)){for(var t=2;l!=s.charAt(t)&&("*"!=s.charAt(t)||"/"!=s.charAt(t+1));)++t;if(t+=2,l===s.charAt(t-1))return g("End of comment missing");var n=s.slice(2,t-2);return h+=2,p(n),s=s.slice(t),h+=2,e({type:"comment",comment:n})}}function k(){var t=f(),n=b(r);if(n){if(w(),!b(i))return g("property missing ':'");var s=b(o),u=t({type:"declaration",property:c(n[0].replace(e,l)),value:s?c(s[0].replace(e,l)):l});return b(a),u}}return m.prototype.content=s,y(),function(){var e,t=[];for(v(t);e=k();)!1!==e&&(t.push(e),v(t));return t}()},Al}());return Pl}();const Ll=t(Ml),Dl=Ll.default||Ll,Il=n(Object.freeze(Object.defineProperty({__proto__:null,default:Dl},Symbol.toStringTag,{value:"Module"})));var Nl,Ol,Fl,Vl={};function Rl(){if(Nl)return Vl;Nl=1,Object.defineProperty(Vl,"__esModule",{value:!0}),Vl.camelCase=void 0;var e=/^--[a-zA-Z0-9_-]+$/,t=/-([a-z])/g,n=/^[^-]+$/,r=/^-(webkit|moz|ms|o|khtml)-/,i=/^-(ms)-/,o=function(e,t){return t.toUpperCase()},a=function(e,t){return"".concat(t,"-")};return Vl.camelCase=function(s,l){return void 0===l&&(l={}),function(t){return!t||n.test(t)||e.test(t)}(s)?s:(s=s.toLowerCase(),(s=l.reactCompat?s.replace(i,a):s.replace(r,a)).replace(t,o))},Vl}const Bl=t(function(){if(Fl)return Ol;Fl=1;var e=(Ol&&Ol.__importDefault||function(e){return e&&e.__esModule?e:{default:e}})(Il),t=Rl();function n(n,r){var i={};return n&&"string"==typeof n?((0,e.default)(n,function(e,n){e&&n&&(i[(0,t.camelCase)(e,r)]=n)}),i):i}return n.default=n,Ol=n}()),Ul=jl("end"),Hl=jl("start");function jl(e){return function(t){const n=t&&t.position&&t.position[e]||{};if("number"==typeof n.line&&n.line>0&&"number"==typeof n.column&&n.column>0)return{line:n.line,column:n.column,offset:"number"==typeof n.offset&&n.offset>-1?n.offset:void 0}}}function ql(e){return e&&"object"==typeof e?"position"in e||"type"in e?Kl(e.position):"start"in e||"end"in e?Kl(e):"line"in e||"column"in e?Wl(e):"":""}function Wl(e){return Gl(e&&e.line)+":"+Gl(e&&e.column)}function Kl(e){return Wl(e&&e.start)+"-"+Wl(e&&e.end)}function Gl(e){return e&&"number"==typeof e?e:1}class Ql extends Error{constructor(e,t,n){super(),"string"==typeof t&&(n=t,t=void 0);let r="",i={},o=!1;if(t&&(i="line"in t&&"column"in t||"start"in t&&"end"in t?{place:t}:"type"in t?{ancestors:[t],place:t.position}:{...t}),"string"==typeof e?r=e:!i.cause&&e&&(o=!0,r=e.message,i.cause=e),!i.ruleId&&!i.source&&"string"==typeof n){const e=n.indexOf(":");-1===e?i.ruleId=n:(i.source=n.slice(0,e),i.ruleId=n.slice(e+1))}if(!i.place&&i.ancestors&&i.ancestors){const e=i.ancestors[i.ancestors.length-1];e&&(i.place=e.position)}const a=i.place&&"start"in i.place?i.place.start:i.place;this.ancestors=i.ancestors||void 0,this.cause=i.cause||void 0,this.column=a?a.column:void 0,this.fatal=void 0,this.file="",this.message=r,this.line=a?a.line:void 0,this.name=ql(i.place)||"1:1",this.place=i.place||void 0,this.reason=this.message,this.ruleId=i.ruleId||void 0,this.source=i.source||void 0,this.stack=o&&i.cause&&"string"==typeof i.cause.stack?i.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}Ql.prototype.file="",Ql.prototype.name="",Ql.prototype.reason="",Ql.prototype.message="",Ql.prototype.stack="",Ql.prototype.column=void 0,Ql.prototype.line=void 0,Ql.prototype.ancestors=void 0,Ql.prototype.cause=void 0,Ql.prototype.fatal=void 0,Ql.prototype.place=void 0,Ql.prototype.ruleId=void 0,Ql.prototype.source=void 0;const Yl={}.hasOwnProperty,Xl=new Map,Zl=/[A-Z]/g,Jl=new Set(["table","tbody","thead","tfoot","tr"]),ec=new Set(["td","th"]),tc="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function nc(e,t){if(!t||void 0===t.Fragment)throw new TypeError("Expected `Fragment` in options");const n=t.filePath||void 0;let r;if(t.development){if("function"!=typeof t.jsxDEV)throw new TypeError("Expected `jsxDEV` in options when `development: true`");r=function(e,t){return n;function n(n,r,i,o){const a=Array.isArray(i.children),s=Hl(n);return t(r,i,o,a,{columnNumber:s?s.column-1:void 0,fileName:e,lineNumber:s?s.line:void 0},void 0)}}(n,t.jsxDEV)}else{if("function"!=typeof t.jsx)throw new TypeError("Expected `jsx` in production options");if("function"!=typeof t.jsxs)throw new TypeError("Expected `jsxs` in production options");r=function(e,t,n){return r;function r(e,r,i,o){const a=Array.isArray(i.children)?n:t;return o?a(r,i,o):a(r,i)}}(0,t.jsx,t.jsxs)}const i={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||"react",evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:!1!==t.passKeys,passNode:t.passNode||!1,schema:"svg"===t.space?zl:El,stylePropertyNameCase:t.stylePropertyNameCase||"dom",tableCellAlignToStyle:!1!==t.tableCellAlignToStyle},o=rc(i,e,void 0);return o&&"string"!=typeof o?o:i.create(e,i.Fragment,{children:o||void 0},void 0)}function rc(e,t,n){return"element"===t.type?function(e,t,n){const r=e.schema;let i=r;"svg"===t.tagName.toLowerCase()&&"html"===r.space&&(i=zl,e.schema=i);e.ancestors.push(t);const o=lc(e,t.tagName,!1),a=function(e,t){const n={};let r,i;for(i in t.properties)if("children"!==i&&Yl.call(t.properties,i)){const o=sc(e,i,t.properties[i]);if(o){const[i,a]=o;e.tableCellAlignToStyle&&"align"===i&&"string"==typeof a&&ec.has(t.tagName)?r=a:n[i]=a}}if(r){(n.style||(n.style={}))["css"===e.stylePropertyNameCase?"text-align":"textAlign"]=r}return n}(e,t);let s=ac(e,t);Jl.has(t.tagName)&&(s=s.filter(function(e){return"string"!=typeof e||!("object"==typeof(t=e)?"text"===t.type&&Ks(t.value):Ks(t));var t}));return ic(e,a,o,t),oc(a,s),e.ancestors.pop(),e.schema=r,e.create(t,o,a,n)}(e,t,n):"mdxFlowExpression"===t.type||"mdxTextExpression"===t.type?function(e,t){if(t.data&&t.data.estree&&e.evaluater){const n=t.data.estree.body[0];return e.evaluater.evaluateExpression(n.expression)}cc(e,t.position)}(e,t):"mdxJsxFlowElement"===t.type||"mdxJsxTextElement"===t.type?function(e,t,n){const r=e.schema;let i=r;"svg"===t.name&&"html"===r.space&&(i=zl,e.schema=i);e.ancestors.push(t);const o=null===t.name?e.Fragment:lc(e,t.name,!0),a=function(e,t){const n={};for(const r of t.attributes)if("mdxJsxExpressionAttribute"===r.type)if(r.data&&r.data.estree&&e.evaluater){const t=r.data.estree.body[0].expression.properties[0];Object.assign(n,e.evaluater.evaluateExpression(t.argument))}else cc(e,t.position);else{const i=r.name;let o;if(r.value&&"object"==typeof r.value)if(r.value.data&&r.value.data.estree&&e.evaluater){const t=r.value.data.estree.body[0];o=e.evaluater.evaluateExpression(t.expression)}else cc(e,t.position);else o=null===r.value||r.value;n[i]=o}return n}(e,t),s=ac(e,t);return ic(e,a,o,t),oc(a,s),e.ancestors.pop(),e.schema=r,e.create(t,o,a,n)}(e,t,n):"mdxjsEsm"===t.type?function(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);cc(e,t.position)}(e,t):"root"===t.type?function(e,t,n){const r={};return oc(r,ac(e,t)),e.create(t,e.Fragment,r,n)}(e,t,n):"text"===t.type?function(e,t){return t.value}(0,t):void 0}function ic(e,t,n,r){"string"!=typeof n&&n!==e.Fragment&&e.passNode&&(t.node=r)}function oc(e,t){if(t.length>0){const n=t.length>1?t:t[0];n&&(e.children=n)}}function ac(e,t){const n=[];let r=-1;const i=e.passKeys?new Map:Xl;for(;++r<t.children.length;){const o=t.children[r];let a;if(e.passKeys){const e="element"===o.type?o.tagName:"mdxJsxFlowElement"===o.type||"mdxJsxTextElement"===o.type?o.name:void 0;if(e){const t=i.get(e)||0;a=e+"-"+t,i.set(e,t+1)}}const s=rc(e,o,a);void 0!==s&&n.push(s)}return n}function sc(e,t,n){const r=function(e,t){const n=Ys(t);let r=t,i=Xs;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&"data"===n.slice(0,4)&&_l.test(t)){if("-"===t.charAt(4)){const e=t.slice(5).replace(xl,Cl);r="data"+e.charAt(0).toUpperCase()+e.slice(1)}else{const e=t.slice(4);if(!xl.test(e)){let n=e.replace(kl,Sl);"-"!==n.charAt(0)&&(n="-"+n),t="data"+n}}i=cl}return new i(r,t)}(e.schema,t);if(!(null==n||"number"==typeof n&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?function(e){const t={};return(""===e[e.length-1]?[...e,""]:e).join((t.padRight?" ":"")+","+(!1===t.padLeft?"":" ")).trim()}(n):n.join(" ").trim()),"style"===r.property){let t="object"==typeof n?n:function(e,t){try{return Bl(t,{reactCompat:!0})}catch(t){if(e.ignoreInvalidStyle)return{};const n=t,r=new Ql("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:n,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw r.file=e.filePath||void 0,r.url=tc+"#cannot-parse-style-attribute",r}}(e,String(n));return"css"===e.stylePropertyNameCase&&(t=function(e){const t={};let n;for(n in e)Yl.call(e,n)&&(t[uc(n)]=e[n]);return t}(t)),["style",t]}return["react"===e.elementAttributeNameCase&&r.space?wl[r.property]||r.property:r.attribute,n]}}function lc(e,t,n){let r;if(n)if(t.includes(".")){const e=t.split(".");let n,i=-1;for(;++i<e.length;){const t=qs(e[i])?{type:"Identifier",name:e[i]}:{type:"Literal",value:e[i]};n=n?{type:"MemberExpression",object:n,property:t,computed:Boolean(i&&"Literal"===t.type),optional:!1}:t}r=n}else r=qs(t)&&!/^[a-z]/.test(t)?{type:"Identifier",name:t}:{type:"Literal",value:t};else r={type:"Literal",value:t};if("Literal"===r.type){const t=r.value;return Yl.call(e.components,t)?e.components[t]:t}if(e.evaluater)return e.evaluater.evaluateExpression(r);cc(e)}function cc(e,t){const n=new Ql("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=e.filePath||void 0,n.url=tc+"#cannot-handle-mdx-estrees-without-createevaluater",n}function uc(e){let t=e.replace(Zl,dc);return"ms-"===t.slice(0,3)&&(t="-"+t),t}function dc(e){return"-"+e.toLowerCase()}const hc={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},pc={};function fc(e,t,n){if(function(e){return Boolean(e&&"object"==typeof e)}(e)){if("value"in e)return"html"!==e.type||n?e.value:"";if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return mc(e.children,t,n)}return Array.isArray(e)?mc(e,t,n):""}function mc(e,t,n){const r=[];let i=-1;for(;++i<e.length;)r[i]=fc(e[i],t,n);return r.join("")}const gc=document.createElement("i");function bc(e){const t="&"+e+";";gc.innerHTML=t;const n=gc.textContent;return(59!==n.charCodeAt(n.length-1)||"semi"===e)&&(n!==t&&n)}function yc(e,t,n,r){const i=e.length;let o,a=0;if(t=t<0?-t>i?0:i+t:t>i?i:t,n=n>0?n:0,r.length<1e4)o=Array.from(r),o.unshift(t,n),e.splice(...o);else for(n&&e.splice(t,n);a<r.length;)o=r.slice(a,a+1e4),o.unshift(t,0),e.splice(...o),a+=1e4,t+=1e4}function vc(e,t){return e.length>0?(yc(e,e.length,0,t),e):t}const wc={}.hasOwnProperty;function kc(e,t){let n;for(n in t){const r=(wc.call(e,n)?e[n]:void 0)||(e[n]={}),i=t[n];let o;if(i)for(o in i){wc.call(r,o)||(r[o]=[]);const e=i[o];xc(r[o],Array.isArray(e)?e:e?[e]:[])}}}function xc(e,t){let n=-1;const r=[];for(;++n<t.length;)("after"===t[n].add?e:r).push(t[n]);yc(e,0,0,r)}function _c(e,t){const n=Number.parseInt(e,t);return n<9||11===n||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||!(65535&~n)||65534==(65535&n)||n>1114111?"�":String.fromCodePoint(n)}function Sc(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Cc=Oc(/[A-Za-z]/),Ec=Oc(/[\dA-Za-z]/),zc=Oc(/[#-'*+\--9=?A-Z^-~]/);function Ac(e){return null!==e&&(e<32||127===e)}const $c=Oc(/\d/),Tc=Oc(/[\dA-Fa-f]/),Pc=Oc(/[!-/:-@[-`{-~]/);function Mc(e){return null!==e&&e<-2}function Lc(e){return null!==e&&(e<0||32===e)}function Dc(e){return-2===e||-1===e||32===e}const Ic=Oc(/\p{P}|\p{S}/u),Nc=Oc(/\s/);function Oc(e){return function(t){return null!==t&&t>-1&&e.test(String.fromCharCode(t))}}function Fc(e){const t=[];let n=-1,r=0,i=0;for(;++n<e.length;){const o=e.charCodeAt(n);let a="";if(37===o&&Ec(e.charCodeAt(n+1))&&Ec(e.charCodeAt(n+2)))i=2;else if(o<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o))||(a=String.fromCharCode(o));else if(o>55295&&o<57344){const t=e.charCodeAt(n+1);o<56320&&t>56319&&t<57344?(a=String.fromCharCode(o,t),i=1):a="�"}else a=String.fromCharCode(o);a&&(t.push(e.slice(r,n),encodeURIComponent(a)),r=n+i+1,a=""),i&&(n+=i,i=0)}return t.join("")+e.slice(r)}function Vc(e,t,n,r){const i=r?r-1:Number.POSITIVE_INFINITY;let o=0;return function(r){if(Dc(r))return e.enter(n),a(r);return t(r)};function a(r){return Dc(r)&&o++<i?(e.consume(r),a):(e.exit(n),t(r))}}const Rc={tokenize:function(e){const t=e.attempt(this.parser.constructs.contentInitial,function(n){if(null===n)return void e.consume(n);return e.enter("lineEnding"),e.consume(n),e.exit("lineEnding"),Vc(e,t,"linePrefix")},function(t){return e.enter("paragraph"),r(t)});let n;return t;function r(t){const r=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=r),n=r,i(t)}function i(t){return null===t?(e.exit("chunkText"),e.exit("paragraph"),void e.consume(t)):Mc(t)?(e.consume(t),e.exit("chunkText"),r):(e.consume(t),i)}}};const Bc={tokenize:function(e){const t=this,n=[];let r,i,o,a=0;return s;function s(r){if(a<n.length){const i=n[a];return t.containerState=i[1],e.attempt(i[0].continuation,l,c)(r)}return c(r)}function l(e){if(a++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,r&&y();const n=t.events.length;let i,o=n;for(;o--;)if("exit"===t.events[o][0]&&"chunkFlow"===t.events[o][1].type){i=t.events[o][1].end;break}b(a);let s=n;for(;s<t.events.length;)t.events[s][1].end={...i},s++;return yc(t.events,o+1,0,t.events.slice(n)),t.events.length=s,c(e)}return s(e)}function c(i){if(a===n.length){if(!r)return h(i);if(r.currentConstruct&&r.currentConstruct.concrete)return f(i);t.interrupt=Boolean(r.currentConstruct&&!r._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(Uc,u,d)(i)}function u(e){return r&&y(),b(a),h(e)}function d(e){return t.parser.lazy[t.now().line]=a!==n.length,o=t.now().offset,f(e)}function h(n){return t.containerState={},e.attempt(Uc,p,f)(n)}function p(e){return a++,n.push([t.currentConstruct,t.containerState]),h(e)}function f(n){return null===n?(r&&y(),b(0),void e.consume(n)):(r=r||t.parser.flow(t.now()),e.enter("chunkFlow",{_tokenizer:r,contentType:"flow",previous:i}),m(n))}function m(n){return null===n?(g(e.exit("chunkFlow"),!0),b(0),void e.consume(n)):Mc(n)?(e.consume(n),g(e.exit("chunkFlow")),a=0,t.interrupt=void 0,s):(e.consume(n),m)}function g(e,n){const s=t.sliceStream(e);if(n&&s.push(null),e.previous=i,i&&(i.next=e),i=e,r.defineSkip(e.start),r.write(s),t.parser.lazy[e.start.line]){let e=r.events.length;for(;e--;)if(r.events[e][1].start.offset<o&&(!r.events[e][1].end||r.events[e][1].end.offset>o))return;const n=t.events.length;let i,s,l=n;for(;l--;)if("exit"===t.events[l][0]&&"chunkFlow"===t.events[l][1].type){if(i){s=t.events[l][1].end;break}i=!0}for(b(a),e=n;e<t.events.length;)t.events[e][1].end={...s},e++;yc(t.events,l+1,0,t.events.slice(n)),t.events.length=e}}function b(r){let i=n.length;for(;i-- >r;){const r=n[i];t.containerState=r[1],r[0].exit.call(t,e)}n.length=r}function y(){r.write([null]),i=void 0,r=void 0,t.containerState._closeFlow=void 0}}},Uc={tokenize:function(e,t,n){return Vc(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}};function Hc(e){return null===e||Lc(e)||Nc(e)?1:Ic(e)?2:void 0}function jc(e,t,n){const r=[];let i=-1;for(;++i<e.length;){const o=e[i].resolveAll;o&&!r.includes(o)&&(t=o(t,n),r.push(o))}return t}const qc={name:"attention",resolveAll:function(e,t){let n,r,i,o,a,s,l,c,u=-1;for(;++u<e.length;)if("enter"===e[u][0]&&"attentionSequence"===e[u][1].type&&e[u][1]._close)for(n=u;n--;)if("exit"===e[n][0]&&"attentionSequence"===e[n][1].type&&e[n][1]._open&&t.sliceSerialize(e[n][1]).charCodeAt(0)===t.sliceSerialize(e[u][1]).charCodeAt(0)){if((e[n][1]._close||e[u][1]._open)&&(e[u][1].end.offset-e[u][1].start.offset)%3&&!((e[n][1].end.offset-e[n][1].start.offset+e[u][1].end.offset-e[u][1].start.offset)%3))continue;s=e[n][1].end.offset-e[n][1].start.offset>1&&e[u][1].end.offset-e[u][1].start.offset>1?2:1;const d={...e[n][1].end},h={...e[u][1].start};Wc(d,-s),Wc(h,s),o={type:s>1?"strongSequence":"emphasisSequence",start:d,end:{...e[n][1].end}},a={type:s>1?"strongSequence":"emphasisSequence",start:{...e[u][1].start},end:h},i={type:s>1?"strongText":"emphasisText",start:{...e[n][1].end},end:{...e[u][1].start}},r={type:s>1?"strong":"emphasis",start:{...o.start},end:{...a.end}},e[n][1].end={...o.start},e[u][1].start={...a.end},l=[],e[n][1].end.offset-e[n][1].start.offset&&(l=vc(l,[["enter",e[n][1],t],["exit",e[n][1],t]])),l=vc(l,[["enter",r,t],["enter",o,t],["exit",o,t],["enter",i,t]]),l=vc(l,jc(t.parser.constructs.insideSpan.null,e.slice(n+1,u),t)),l=vc(l,[["exit",i,t],["enter",a,t],["exit",a,t],["exit",r,t]]),e[u][1].end.offset-e[u][1].start.offset?(c=2,l=vc(l,[["enter",e[u][1],t],["exit",e[u][1],t]])):c=0,yc(e,n-1,u-n+3,l),u=n+l.length-c-2;break}u=-1;for(;++u<e.length;)"attentionSequence"===e[u][1].type&&(e[u][1].type="data");return e},tokenize:function(e,t){const n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=Hc(r);let o;return function(t){return o=t,e.enter("attentionSequence"),a(t)};function a(s){if(s===o)return e.consume(s),a;const l=e.exit("attentionSequence"),c=Hc(s),u=!c||2===c&&i||n.includes(s),d=!i||2===i&&c||n.includes(r);return l._open=Boolean(42===o?u:u&&(i||!d)),l._close=Boolean(42===o?d:d&&(c||!u)),t(s)}}};function Wc(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}const Kc={name:"autolink",tokenize:function(e,t,n){let r=0;return function(t){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(t),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),i};function i(t){return Cc(t)?(e.consume(t),o):64===t?n(t):l(t)}function o(e){return 43===e||45===e||46===e||Ec(e)?(r=1,a(e)):l(e)}function a(t){return 58===t?(e.consume(t),r=0,s):(43===t||45===t||46===t||Ec(t))&&r++<32?(e.consume(t),a):(r=0,l(t))}function s(r){return 62===r?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(r),e.exit("autolinkMarker"),e.exit("autolink"),t):null===r||32===r||60===r||Ac(r)?n(r):(e.consume(r),s)}function l(t){return 64===t?(e.consume(t),c):zc(t)?(e.consume(t),l):n(t)}function c(e){return Ec(e)?u(e):n(e)}function u(n){return 46===n?(e.consume(n),r=0,c):62===n?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(n),e.exit("autolinkMarker"),e.exit("autolink"),t):d(n)}function d(t){if((45===t||Ec(t))&&r++<63){const n=45===t?d:u;return e.consume(t),n}return n(t)}}};const Gc={partial:!0,tokenize:function(e,t,n){return function(t){return Dc(t)?Vc(e,r,"linePrefix")(t):r(t)};function r(e){return null===e||Mc(e)?t(e):n(e)}}};const Qc={continuation:{tokenize:function(e,t,n){const r=this;return function(t){if(Dc(t))return Vc(e,i,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(t);return i(t)};function i(r){return e.attempt(Qc,t,n)(r)}}},exit:function(e){e.exit("blockQuote")},name:"blockQuote",tokenize:function(e,t,n){const r=this;return function(t){if(62===t){const n=r.containerState;return n.open||(e.enter("blockQuote",{_container:!0}),n.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(t),e.exit("blockQuoteMarker"),i}return n(t)};function i(n){return Dc(n)?(e.enter("blockQuotePrefixWhitespace"),e.consume(n),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(n))}}};const Yc={name:"characterEscape",tokenize:function(e,t,n){return function(t){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(t),e.exit("escapeMarker"),r};function r(r){return Pc(r)?(e.enter("characterEscapeValue"),e.consume(r),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(r)}}};const Xc={name:"characterReference",tokenize:function(e,t,n){const r=this;let i,o,a=0;return function(t){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(t),e.exit("characterReferenceMarker"),s};function s(t){return 35===t?(e.enter("characterReferenceMarkerNumeric"),e.consume(t),e.exit("characterReferenceMarkerNumeric"),l):(e.enter("characterReferenceValue"),i=31,o=Ec,c(t))}function l(t){return 88===t||120===t?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(t),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),i=6,o=Tc,c):(e.enter("characterReferenceValue"),i=7,o=$c,c(t))}function c(s){if(59===s&&a){const i=e.exit("characterReferenceValue");return o!==Ec||bc(r.sliceSerialize(i))?(e.enter("characterReferenceMarker"),e.consume(s),e.exit("characterReferenceMarker"),e.exit("characterReference"),t):n(s)}return o(s)&&a++<i?(e.consume(s),c):n(s)}}};const Zc={partial:!0,tokenize:function(e,t,n){const r=this;return function(t){if(null===t)return n(t);return e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),i};function i(e){return r.parser.lazy[r.now().line]?n(e):t(e)}}},Jc={concrete:!0,name:"codeFenced",tokenize:function(e,t,n){const r=this,i={partial:!0,tokenize:function(e,t,n){let i=0;return a;function a(t){return e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),l}function l(t){return e.enter("codeFencedFence"),Dc(t)?Vc(e,c,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(t):c(t)}function c(t){return t===o?(e.enter("codeFencedFenceSequence"),u(t)):n(t)}function u(t){return t===o?(i++,e.consume(t),u):i>=s?(e.exit("codeFencedFenceSequence"),Dc(t)?Vc(e,d,"whitespace")(t):d(t)):n(t)}function d(r){return null===r||Mc(r)?(e.exit("codeFencedFence"),t(r)):n(r)}}};let o,a=0,s=0;return function(t){return function(t){const n=r.events[r.events.length-1];return a=n&&"linePrefix"===n[1].type?n[2].sliceSerialize(n[1],!0).length:0,o=t,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),l(t)}(t)};function l(t){return t===o?(s++,e.consume(t),l):s<3?n(t):(e.exit("codeFencedFenceSequence"),Dc(t)?Vc(e,c,"whitespace")(t):c(t))}function c(n){return null===n||Mc(n)?(e.exit("codeFencedFence"),r.interrupt?t(n):e.check(Zc,p,y)(n)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),u(n))}function u(t){return null===t||Mc(t)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),c(t)):Dc(t)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),Vc(e,d,"whitespace")(t)):96===t&&t===o?n(t):(e.consume(t),u)}function d(t){return null===t||Mc(t)?c(t):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),h(t))}function h(t){return null===t||Mc(t)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),c(t)):96===t&&t===o?n(t):(e.consume(t),h)}function p(t){return e.attempt(i,y,f)(t)}function f(t){return e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),m}function m(t){return a>0&&Dc(t)?Vc(e,g,"linePrefix",a+1)(t):g(t)}function g(t){return null===t||Mc(t)?e.check(Zc,p,y)(t):(e.enter("codeFlowValue"),b(t))}function b(t){return null===t||Mc(t)?(e.exit("codeFlowValue"),g(t)):(e.consume(t),b)}function y(n){return e.exit("codeFenced"),t(n)}}};const eu={name:"codeIndented",tokenize:function(e,t,n){const r=this;return function(t){return e.enter("codeIndented"),Vc(e,i,"linePrefix",5)(t)};function i(e){const t=r.events[r.events.length-1];return t&&"linePrefix"===t[1].type&&t[2].sliceSerialize(t[1],!0).length>=4?o(e):n(e)}function o(t){return null===t?s(t):Mc(t)?e.attempt(tu,o,s)(t):(e.enter("codeFlowValue"),a(t))}function a(t){return null===t||Mc(t)?(e.exit("codeFlowValue"),o(t)):(e.consume(t),a)}function s(n){return e.exit("codeIndented"),t(n)}}},tu={partial:!0,tokenize:function(e,t,n){const r=this;return i;function i(t){return r.parser.lazy[r.now().line]?n(t):Mc(t)?(e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),i):Vc(e,o,"linePrefix",5)(t)}function o(e){const o=r.events[r.events.length-1];return o&&"linePrefix"===o[1].type&&o[2].sliceSerialize(o[1],!0).length>=4?t(e):Mc(e)?i(e):n(e)}}};const nu={name:"codeText",previous:function(e){return 96!==e||"characterEscape"===this.events[this.events.length-1][1].type},resolve:function(e){let t,n,r=e.length-4,i=3;if(!("lineEnding"!==e[i][1].type&&"space"!==e[i][1].type||"lineEnding"!==e[r][1].type&&"space"!==e[r][1].type))for(t=i;++t<r;)if("codeTextData"===e[t][1].type){e[i][1].type="codeTextPadding",e[r][1].type="codeTextPadding",i+=2,r-=2;break}t=i-1,r++;for(;++t<=r;)void 0===n?t!==r&&"lineEnding"!==e[t][1].type&&(n=t):t!==r&&"lineEnding"!==e[t][1].type||(e[n][1].type="codeTextData",t!==n+2&&(e[n][1].end=e[t-1][1].end,e.splice(n+2,t-n-2),r-=t-n-2,t=n+2),n=void 0);return e},tokenize:function(e,t,n){let r,i,o=0;return function(t){return e.enter("codeText"),e.enter("codeTextSequence"),a(t)};function a(t){return 96===t?(e.consume(t),o++,a):(e.exit("codeTextSequence"),s(t))}function s(t){return null===t?n(t):32===t?(e.enter("space"),e.consume(t),e.exit("space"),s):96===t?(i=e.enter("codeTextSequence"),r=0,c(t)):Mc(t)?(e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),s):(e.enter("codeTextData"),l(t))}function l(t){return null===t||32===t||96===t||Mc(t)?(e.exit("codeTextData"),s(t)):(e.consume(t),l)}function c(n){return 96===n?(e.consume(n),r++,c):r===o?(e.exit("codeTextSequence"),e.exit("codeText"),t(n)):(i.type="codeTextData",l(n))}}};class ru{constructor(e){this.left=e?[...e]:[],this.right=[]}get(e){if(e<0||e>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+e+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return e<this.left.length?this.left[e]:this.right[this.right.length-e+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(e,t){const n=null==t?Number.POSITIVE_INFINITY:t;return n<this.left.length?this.left.slice(e,n):e>this.left.length?this.right.slice(this.right.length-n+this.left.length,this.right.length-e+this.left.length).reverse():this.left.slice(e).concat(this.right.slice(this.right.length-n+this.left.length).reverse())}splice(e,t,n){const r=t||0;this.setCursor(Math.trunc(e));const i=this.right.splice(this.right.length-r,Number.POSITIVE_INFINITY);return n&&iu(this.left,n),i.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(e){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(e)}pushMany(e){this.setCursor(Number.POSITIVE_INFINITY),iu(this.left,e)}unshift(e){this.setCursor(0),this.right.push(e)}unshiftMany(e){this.setCursor(0),iu(this.right,e.reverse())}setCursor(e){if(!(e===this.left.length||e>this.left.length&&0===this.right.length||e<0&&0===this.left.length))if(e<this.left.length){const t=this.left.splice(e,Number.POSITIVE_INFINITY);iu(this.right,t.reverse())}else{const t=this.right.splice(this.left.length+this.right.length-e,Number.POSITIVE_INFINITY);iu(this.left,t.reverse())}}}function iu(e,t){let n=0;if(t.length<1e4)e.push(...t);else for(;n<t.length;)e.push(...t.slice(n,n+1e4)),n+=1e4}function ou(e){const t={};let n,r,i,o,a,s,l,c=-1;const u=new ru(e);for(;++c<u.length;){for(;c in t;)c=t[c];if(n=u.get(c),c&&"chunkFlow"===n[1].type&&"listItemPrefix"===u.get(c-1)[1].type&&(s=n[1]._tokenizer.events,i=0,i<s.length&&"lineEndingBlank"===s[i][1].type&&(i+=2),i<s.length&&"content"===s[i][1].type))for(;++i<s.length&&"content"!==s[i][1].type;)"chunkText"===s[i][1].type&&(s[i][1]._isInFirstContentOfListItem=!0,i++);if("enter"===n[0])n[1].contentType&&(Object.assign(t,au(u,c)),c=t[c],l=!0);else if(n[1]._container){for(i=c,r=void 0;i--;)if(o=u.get(i),"lineEnding"===o[1].type||"lineEndingBlank"===o[1].type)"enter"===o[0]&&(r&&(u.get(r)[1].type="lineEndingBlank"),o[1].type="lineEnding",r=i);else if("linePrefix"!==o[1].type&&"listItemIndent"!==o[1].type)break;r&&(n[1].end={...u.get(r)[1].start},a=u.slice(r,c),a.unshift(n),u.splice(r,c-r+1,a))}}return yc(e,0,Number.POSITIVE_INFINITY,u.slice(0)),!l}function au(e,t){const n=e.get(t)[1],r=e.get(t)[2];let i=t-1;const o=[];let a=n._tokenizer;a||(a=r.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(a._contentTypeTextTrailing=!0));const s=a.events,l=[],c={};let u,d,h=-1,p=n,f=0,m=0;const g=[m];for(;p;){for(;e.get(++i)[1]!==p;);o.push(i),p._tokenizer||(u=r.sliceStream(p),p.next||u.push(null),d&&a.defineSkip(p.start),p._isInFirstContentOfListItem&&(a._gfmTasklistFirstContentOfListItem=!0),a.write(u),p._isInFirstContentOfListItem&&(a._gfmTasklistFirstContentOfListItem=void 0)),d=p,p=p.next}for(p=n;++h<s.length;)"exit"===s[h][0]&&"enter"===s[h-1][0]&&s[h][1].type===s[h-1][1].type&&s[h][1].start.line!==s[h][1].end.line&&(m=h+1,g.push(m),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(a.events=[],p?(p._tokenizer=void 0,p.previous=void 0):g.pop(),h=g.length;h--;){const t=s.slice(g[h],g[h+1]),n=o.pop();l.push([n,n+t.length-1]),e.splice(n,2,t)}for(l.reverse(),h=-1;++h<l.length;)c[f+l[h][0]]=f+l[h][1],f+=l[h][1]-l[h][0]-1;return c}const su={resolve:function(e){return ou(e),e},tokenize:function(e,t){let n;return function(t){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),r(t)};function r(t){return null===t?i(t):Mc(t)?e.check(lu,o,i)(t):(e.consume(t),r)}function i(n){return e.exit("chunkContent"),e.exit("content"),t(n)}function o(t){return e.consume(t),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,r}}},lu={partial:!0,tokenize:function(e,t,n){const r=this;return function(t){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),Vc(e,i,"linePrefix")};function i(i){if(null===i||Mc(i))return n(i);const o=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&o&&"linePrefix"===o[1].type&&o[2].sliceSerialize(o[1],!0).length>=4?t(i):e.interrupt(r.parser.constructs.flow,n,t)(i)}}};function cu(e,t,n,r,i,o,a,s,l){const c=l||Number.POSITIVE_INFINITY;let u=0;return function(t){if(60===t)return e.enter(r),e.enter(i),e.enter(o),e.consume(t),e.exit(o),d;if(null===t||32===t||41===t||Ac(t))return n(t);return e.enter(r),e.enter(a),e.enter(s),e.enter("chunkString",{contentType:"string"}),f(t)};function d(n){return 62===n?(e.enter(o),e.consume(n),e.exit(o),e.exit(i),e.exit(r),t):(e.enter(s),e.enter("chunkString",{contentType:"string"}),h(n))}function h(t){return 62===t?(e.exit("chunkString"),e.exit(s),d(t)):null===t||60===t||Mc(t)?n(t):(e.consume(t),92===t?p:h)}function p(t){return 60===t||62===t||92===t?(e.consume(t),h):h(t)}function f(i){return u||null!==i&&41!==i&&!Lc(i)?u<c&&40===i?(e.consume(i),u++,f):41===i?(e.consume(i),u--,f):null===i||32===i||40===i||Ac(i)?n(i):(e.consume(i),92===i?m:f):(e.exit("chunkString"),e.exit(s),e.exit(a),e.exit(r),t(i))}function m(t){return 40===t||41===t||92===t?(e.consume(t),f):f(t)}}function uu(e,t,n,r,i,o){const a=this;let s,l=0;return function(t){return e.enter(r),e.enter(i),e.consume(t),e.exit(i),e.enter(o),c};function c(d){return l>999||null===d||91===d||93===d&&!s||94===d&&!l&&"_hiddenFootnoteSupport"in a.parser.constructs?n(d):93===d?(e.exit(o),e.enter(i),e.consume(d),e.exit(i),e.exit(r),t):Mc(d)?(e.enter("lineEnding"),e.consume(d),e.exit("lineEnding"),c):(e.enter("chunkString",{contentType:"string"}),u(d))}function u(t){return null===t||91===t||93===t||Mc(t)||l++>999?(e.exit("chunkString"),c(t)):(e.consume(t),s||(s=!Dc(t)),92===t?d:u)}function d(t){return 91===t||92===t||93===t?(e.consume(t),l++,u):u(t)}}function du(e,t,n,r,i,o){let a;return function(t){if(34===t||39===t||40===t)return e.enter(r),e.enter(i),e.consume(t),e.exit(i),a=40===t?41:t,s;return n(t)};function s(n){return n===a?(e.enter(i),e.consume(n),e.exit(i),e.exit(r),t):(e.enter(o),l(n))}function l(t){return t===a?(e.exit(o),s(a)):null===t?n(t):Mc(t)?(e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),Vc(e,l,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),c(t))}function c(t){return t===a||null===t||Mc(t)?(e.exit("chunkString"),l(t)):(e.consume(t),92===t?u:c)}function u(t){return t===a||92===t?(e.consume(t),c):c(t)}}function hu(e,t){let n;return function r(i){if(Mc(i))return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),n=!0,r;if(Dc(i))return Vc(e,r,n?"linePrefix":"lineSuffix")(i);return t(i)}}const pu={name:"definition",tokenize:function(e,t,n){const r=this;let i;return function(t){return e.enter("definition"),function(t){return uu.call(r,e,o,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(t)}(t)};function o(t){return i=Sc(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),58===t?(e.enter("definitionMarker"),e.consume(t),e.exit("definitionMarker"),a):n(t)}function a(t){return Lc(t)?hu(e,s)(t):s(t)}function s(t){return cu(e,l,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(t)}function l(t){return e.attempt(fu,c,c)(t)}function c(t){return Dc(t)?Vc(e,u,"whitespace")(t):u(t)}function u(o){return null===o||Mc(o)?(e.exit("definition"),r.parser.defined.push(i),t(o)):n(o)}}},fu={partial:!0,tokenize:function(e,t,n){return function(t){return Lc(t)?hu(e,r)(t):n(t)};function r(t){return du(e,i,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(t)}function i(t){return Dc(t)?Vc(e,o,"whitespace")(t):o(t)}function o(e){return null===e||Mc(e)?t(e):n(e)}}};const mu={name:"hardBreakEscape",tokenize:function(e,t,n){return function(t){return e.enter("hardBreakEscape"),e.consume(t),r};function r(r){return Mc(r)?(e.exit("hardBreakEscape"),t(r)):n(r)}}};const gu={name:"headingAtx",resolve:function(e,t){let n,r,i=e.length-2,o=3;"whitespace"===e[o][1].type&&(o+=2);i-2>o&&"whitespace"===e[i][1].type&&(i-=2);"atxHeadingSequence"===e[i][1].type&&(o===i-1||i-4>o&&"whitespace"===e[i-2][1].type)&&(i-=o+1===i?2:4);i>o&&(n={type:"atxHeadingText",start:e[o][1].start,end:e[i][1].end},r={type:"chunkText",start:e[o][1].start,end:e[i][1].end,contentType:"text"},yc(e,o,i-o+1,[["enter",n,t],["enter",r,t],["exit",r,t],["exit",n,t]]));return e},tokenize:function(e,t,n){let r=0;return function(t){return e.enter("atxHeading"),function(t){return e.enter("atxHeadingSequence"),i(t)}(t)};function i(t){return 35===t&&r++<6?(e.consume(t),i):null===t||Lc(t)?(e.exit("atxHeadingSequence"),o(t)):n(t)}function o(n){return 35===n?(e.enter("atxHeadingSequence"),a(n)):null===n||Mc(n)?(e.exit("atxHeading"),t(n)):Dc(n)?Vc(e,o,"whitespace")(n):(e.enter("atxHeadingText"),s(n))}function a(t){return 35===t?(e.consume(t),a):(e.exit("atxHeadingSequence"),o(t))}function s(t){return null===t||35===t||Lc(t)?(e.exit("atxHeadingText"),o(t)):(e.consume(t),s)}}};const bu=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],yu=["pre","script","style","textarea"],vu={concrete:!0,name:"htmlFlow",resolveTo:function(e){let t=e.length;for(;t--&&("enter"!==e[t][0]||"htmlFlow"!==e[t][1].type););t>1&&"linePrefix"===e[t-2][1].type&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2));return e},tokenize:function(e,t,n){const r=this;let i,o,a,s,l;return function(t){return function(t){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(t),c}(t)};function c(s){return 33===s?(e.consume(s),u):47===s?(e.consume(s),o=!0,p):63===s?(e.consume(s),i=3,r.interrupt?t:D):Cc(s)?(e.consume(s),a=String.fromCharCode(s),f):n(s)}function u(o){return 45===o?(e.consume(o),i=2,d):91===o?(e.consume(o),i=5,s=0,h):Cc(o)?(e.consume(o),i=4,r.interrupt?t:D):n(o)}function d(i){return 45===i?(e.consume(i),r.interrupt?t:D):n(i)}function h(i){const o="CDATA[";return i===o.charCodeAt(s++)?(e.consume(i),6===s?r.interrupt?t:E:h):n(i)}function p(t){return Cc(t)?(e.consume(t),a=String.fromCharCode(t),f):n(t)}function f(s){if(null===s||47===s||62===s||Lc(s)){const l=47===s,c=a.toLowerCase();return l||o||!yu.includes(c)?bu.includes(a.toLowerCase())?(i=6,l?(e.consume(s),m):r.interrupt?t(s):E(s)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(s):o?g(s):b(s)):(i=1,r.interrupt?t(s):E(s))}return 45===s||Ec(s)?(e.consume(s),a+=String.fromCharCode(s),f):n(s)}function m(i){return 62===i?(e.consume(i),r.interrupt?t:E):n(i)}function g(t){return Dc(t)?(e.consume(t),g):S(t)}function b(t){return 47===t?(e.consume(t),S):58===t||95===t||Cc(t)?(e.consume(t),y):Dc(t)?(e.consume(t),b):S(t)}function y(t){return 45===t||46===t||58===t||95===t||Ec(t)?(e.consume(t),y):v(t)}function v(t){return 61===t?(e.consume(t),w):Dc(t)?(e.consume(t),v):b(t)}function w(t){return null===t||60===t||61===t||62===t||96===t?n(t):34===t||39===t?(e.consume(t),l=t,k):Dc(t)?(e.consume(t),w):x(t)}function k(t){return t===l?(e.consume(t),l=null,_):null===t||Mc(t)?n(t):(e.consume(t),k)}function x(t){return null===t||34===t||39===t||47===t||60===t||61===t||62===t||96===t||Lc(t)?v(t):(e.consume(t),x)}function _(e){return 47===e||62===e||Dc(e)?b(e):n(e)}function S(t){return 62===t?(e.consume(t),C):n(t)}function C(t){return null===t||Mc(t)?E(t):Dc(t)?(e.consume(t),C):n(t)}function E(t){return 45===t&&2===i?(e.consume(t),T):60===t&&1===i?(e.consume(t),P):62===t&&4===i?(e.consume(t),I):63===t&&3===i?(e.consume(t),D):93===t&&5===i?(e.consume(t),L):!Mc(t)||6!==i&&7!==i?null===t||Mc(t)?(e.exit("htmlFlowData"),z(t)):(e.consume(t),E):(e.exit("htmlFlowData"),e.check(wu,N,z)(t))}function z(t){return e.check(ku,A,N)(t)}function A(t){return e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),$}function $(t){return null===t||Mc(t)?z(t):(e.enter("htmlFlowData"),E(t))}function T(t){return 45===t?(e.consume(t),D):E(t)}function P(t){return 47===t?(e.consume(t),a="",M):E(t)}function M(t){if(62===t){const n=a.toLowerCase();return yu.includes(n)?(e.consume(t),I):E(t)}return Cc(t)&&a.length<8?(e.consume(t),a+=String.fromCharCode(t),M):E(t)}function L(t){return 93===t?(e.consume(t),D):E(t)}function D(t){return 62===t?(e.consume(t),I):45===t&&2===i?(e.consume(t),D):E(t)}function I(t){return null===t||Mc(t)?(e.exit("htmlFlowData"),N(t)):(e.consume(t),I)}function N(n){return e.exit("htmlFlow"),t(n)}}},wu={partial:!0,tokenize:function(e,t,n){return function(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),e.attempt(Gc,t,n)}}},ku={partial:!0,tokenize:function(e,t,n){const r=this;return function(t){if(Mc(t))return e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),i;return n(t)};function i(e){return r.parser.lazy[r.now().line]?n(e):t(e)}}};const xu={name:"htmlText",tokenize:function(e,t,n){const r=this;let i,o,a;return function(t){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(t),s};function s(t){return 33===t?(e.consume(t),l):47===t?(e.consume(t),w):63===t?(e.consume(t),y):Cc(t)?(e.consume(t),_):n(t)}function l(t){return 45===t?(e.consume(t),c):91===t?(e.consume(t),o=0,p):Cc(t)?(e.consume(t),b):n(t)}function c(t){return 45===t?(e.consume(t),h):n(t)}function u(t){return null===t?n(t):45===t?(e.consume(t),d):Mc(t)?(a=u,M(t)):(e.consume(t),u)}function d(t){return 45===t?(e.consume(t),h):u(t)}function h(e){return 62===e?P(e):45===e?d(e):u(e)}function p(t){const r="CDATA[";return t===r.charCodeAt(o++)?(e.consume(t),6===o?f:p):n(t)}function f(t){return null===t?n(t):93===t?(e.consume(t),m):Mc(t)?(a=f,M(t)):(e.consume(t),f)}function m(t){return 93===t?(e.consume(t),g):f(t)}function g(t){return 62===t?P(t):93===t?(e.consume(t),g):f(t)}function b(t){return null===t||62===t?P(t):Mc(t)?(a=b,M(t)):(e.consume(t),b)}function y(t){return null===t?n(t):63===t?(e.consume(t),v):Mc(t)?(a=y,M(t)):(e.consume(t),y)}function v(e){return 62===e?P(e):y(e)}function w(t){return Cc(t)?(e.consume(t),k):n(t)}function k(t){return 45===t||Ec(t)?(e.consume(t),k):x(t)}function x(t){return Mc(t)?(a=x,M(t)):Dc(t)?(e.consume(t),x):P(t)}function _(t){return 45===t||Ec(t)?(e.consume(t),_):47===t||62===t||Lc(t)?S(t):n(t)}function S(t){return 47===t?(e.consume(t),P):58===t||95===t||Cc(t)?(e.consume(t),C):Mc(t)?(a=S,M(t)):Dc(t)?(e.consume(t),S):P(t)}function C(t){return 45===t||46===t||58===t||95===t||Ec(t)?(e.consume(t),C):E(t)}function E(t){return 61===t?(e.consume(t),z):Mc(t)?(a=E,M(t)):Dc(t)?(e.consume(t),E):S(t)}function z(t){return null===t||60===t||61===t||62===t||96===t?n(t):34===t||39===t?(e.consume(t),i=t,A):Mc(t)?(a=z,M(t)):Dc(t)?(e.consume(t),z):(e.consume(t),$)}function A(t){return t===i?(e.consume(t),i=void 0,T):null===t?n(t):Mc(t)?(a=A,M(t)):(e.consume(t),A)}function $(t){return null===t||34===t||39===t||60===t||61===t||96===t?n(t):47===t||62===t||Lc(t)?S(t):(e.consume(t),$)}function T(e){return 47===e||62===e||Lc(e)?S(e):n(e)}function P(r){return 62===r?(e.consume(r),e.exit("htmlTextData"),e.exit("htmlText"),t):n(r)}function M(t){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),L}function L(t){return Dc(t)?Vc(e,D,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(t):D(t)}function D(t){return e.enter("htmlTextData"),a(t)}}};const _u={name:"labelEnd",resolveAll:function(e){let t=-1;const n=[];for(;++t<e.length;){const r=e[t][1];if(n.push(e[t]),"labelImage"===r.type||"labelLink"===r.type||"labelEnd"===r.type){const e="labelImage"===r.type?4:2;r.type="data",t+=e}}e.length!==n.length&&yc(e,0,e.length,n);return e},resolveTo:function(e,t){let n,r,i,o,a=e.length,s=0;for(;a--;)if(n=e[a][1],r){if("link"===n.type||"labelLink"===n.type&&n._inactive)break;"enter"===e[a][0]&&"labelLink"===n.type&&(n._inactive=!0)}else if(i){if("enter"===e[a][0]&&("labelImage"===n.type||"labelLink"===n.type)&&!n._balanced&&(r=a,"labelLink"!==n.type)){s=2;break}}else"labelEnd"===n.type&&(i=a);const l={type:"labelLink"===e[r][1].type?"link":"image",start:{...e[r][1].start},end:{...e[e.length-1][1].end}},c={type:"label",start:{...e[r][1].start},end:{...e[i][1].end}},u={type:"labelText",start:{...e[r+s+2][1].end},end:{...e[i-2][1].start}};return o=[["enter",l,t],["enter",c,t]],o=vc(o,e.slice(r+1,r+s+3)),o=vc(o,[["enter",u,t]]),o=vc(o,jc(t.parser.constructs.insideSpan.null,e.slice(r+s+4,i-3),t)),o=vc(o,[["exit",u,t],e[i-2],e[i-1],["exit",c,t]]),o=vc(o,e.slice(i+1)),o=vc(o,[["exit",l,t]]),yc(e,r,e.length,o),e},tokenize:function(e,t,n){const r=this;let i,o,a=r.events.length;for(;a--;)if(("labelImage"===r.events[a][1].type||"labelLink"===r.events[a][1].type)&&!r.events[a][1]._balanced){i=r.events[a][1];break}return function(t){if(!i)return n(t);if(i._inactive)return u(t);return o=r.parser.defined.includes(Sc(r.sliceSerialize({start:i.end,end:r.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(t),e.exit("labelMarker"),e.exit("labelEnd"),s};function s(t){return 40===t?e.attempt(Su,c,o?c:u)(t):91===t?e.attempt(Cu,c,o?l:u)(t):o?c(t):u(t)}function l(t){return e.attempt(Eu,c,u)(t)}function c(e){return t(e)}function u(e){return i._balanced=!0,n(e)}}},Su={tokenize:function(e,t,n){return function(t){return e.enter("resource"),e.enter("resourceMarker"),e.consume(t),e.exit("resourceMarker"),r};function r(t){return Lc(t)?hu(e,i)(t):i(t)}function i(t){return 41===t?c(t):cu(e,o,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(t)}function o(t){return Lc(t)?hu(e,s)(t):c(t)}function a(e){return n(e)}function s(t){return 34===t||39===t||40===t?du(e,l,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(t):c(t)}function l(t){return Lc(t)?hu(e,c)(t):c(t)}function c(r){return 41===r?(e.enter("resourceMarker"),e.consume(r),e.exit("resourceMarker"),e.exit("resource"),t):n(r)}}},Cu={tokenize:function(e,t,n){const r=this;return function(t){return uu.call(r,e,i,o,"reference","referenceMarker","referenceString")(t)};function i(e){return r.parser.defined.includes(Sc(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(e):n(e)}function o(e){return n(e)}}},Eu={tokenize:function(e,t,n){return function(t){return e.enter("reference"),e.enter("referenceMarker"),e.consume(t),e.exit("referenceMarker"),r};function r(r){return 93===r?(e.enter("referenceMarker"),e.consume(r),e.exit("referenceMarker"),e.exit("reference"),t):n(r)}}};const zu={name:"labelStartImage",resolveAll:_u.resolveAll,tokenize:function(e,t,n){const r=this;return function(t){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(t),e.exit("labelImageMarker"),i};function i(t){return 91===t?(e.enter("labelMarker"),e.consume(t),e.exit("labelMarker"),e.exit("labelImage"),o):n(t)}function o(e){return 94===e&&"_hiddenFootnoteSupport"in r.parser.constructs?n(e):t(e)}}};const Au={name:"labelStartLink",resolveAll:_u.resolveAll,tokenize:function(e,t,n){const r=this;return function(t){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(t),e.exit("labelMarker"),e.exit("labelLink"),i};function i(e){return 94===e&&"_hiddenFootnoteSupport"in r.parser.constructs?n(e):t(e)}}};const $u={name:"lineEnding",tokenize:function(e,t){return function(n){return e.enter("lineEnding"),e.consume(n),e.exit("lineEnding"),Vc(e,t,"linePrefix")}}};const Tu={name:"thematicBreak",tokenize:function(e,t,n){let r,i=0;return function(t){return e.enter("thematicBreak"),function(e){return r=e,o(e)}(t)};function o(o){return o===r?(e.enter("thematicBreakSequence"),a(o)):i>=3&&(null===o||Mc(o))?(e.exit("thematicBreak"),t(o)):n(o)}function a(t){return t===r?(e.consume(t),i++,a):(e.exit("thematicBreakSequence"),Dc(t)?Vc(e,o,"whitespace")(t):o(t))}}};const Pu={continuation:{tokenize:function(e,t,n){const r=this;return r.containerState._closeFlow=void 0,e.check(Gc,i,o);function i(n){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,Vc(e,t,"listItemIndent",r.containerState.size+1)(n)}function o(n){return r.containerState.furtherBlankLines||!Dc(n)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,a(n)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(Lu,t,a)(n))}function a(i){return r.containerState._closeFlow=!0,r.interrupt=void 0,Vc(e,e.attempt(Pu,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(i)}}},exit:function(e){e.exit(this.containerState.type)},name:"list",tokenize:function(e,t,n){const r=this,i=r.events[r.events.length-1];let o=i&&"linePrefix"===i[1].type?i[2].sliceSerialize(i[1],!0).length:0,a=0;return function(t){const i=r.containerState.type||(42===t||43===t||45===t?"listUnordered":"listOrdered");if("listUnordered"===i?!r.containerState.marker||t===r.containerState.marker:$c(t)){if(r.containerState.type||(r.containerState.type=i,e.enter(i,{_container:!0})),"listUnordered"===i)return e.enter("listItemPrefix"),42===t||45===t?e.check(Tu,n,l)(t):l(t);if(!r.interrupt||49===t)return e.enter("listItemPrefix"),e.enter("listItemValue"),s(t)}return n(t)};function s(t){return $c(t)&&++a<10?(e.consume(t),s):(!r.interrupt||a<2)&&(r.containerState.marker?t===r.containerState.marker:41===t||46===t)?(e.exit("listItemValue"),l(t)):n(t)}function l(t){return e.enter("listItemMarker"),e.consume(t),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||t,e.check(Gc,r.interrupt?n:c,e.attempt(Mu,d,u))}function c(e){return r.containerState.initialBlankLine=!0,o++,d(e)}function u(t){return Dc(t)?(e.enter("listItemPrefixWhitespace"),e.consume(t),e.exit("listItemPrefixWhitespace"),d):n(t)}function d(n){return r.containerState.size=o+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(n)}}},Mu={partial:!0,tokenize:function(e,t,n){const r=this;return Vc(e,function(e){const i=r.events[r.events.length-1];return!Dc(e)&&i&&"listItemPrefixWhitespace"===i[1].type?t(e):n(e)},"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5)}},Lu={partial:!0,tokenize:function(e,t,n){const r=this;return Vc(e,function(e){const i=r.events[r.events.length-1];return i&&"listItemIndent"===i[1].type&&i[2].sliceSerialize(i[1],!0).length===r.containerState.size?t(e):n(e)},"listItemIndent",r.containerState.size+1)}};const Du={name:"setextUnderline",resolveTo:function(e,t){let n,r,i,o=e.length;for(;o--;)if("enter"===e[o][0]){if("content"===e[o][1].type){n=o;break}"paragraph"===e[o][1].type&&(r=o)}else"content"===e[o][1].type&&e.splice(o,1),i||"definition"!==e[o][1].type||(i=o);const a={type:"setextHeading",start:{...e[n][1].start},end:{...e[e.length-1][1].end}};e[r][1].type="setextHeadingText",i?(e.splice(r,0,["enter",a,t]),e.splice(i+1,0,["exit",e[n][1],t]),e[n][1].end={...e[i][1].end}):e[n][1]=a;return e.push(["exit",a,t]),e},tokenize:function(e,t,n){const r=this;let i;return function(t){let a,s=r.events.length;for(;s--;)if("lineEnding"!==r.events[s][1].type&&"linePrefix"!==r.events[s][1].type&&"content"!==r.events[s][1].type){a="paragraph"===r.events[s][1].type;break}if(!r.parser.lazy[r.now().line]&&(r.interrupt||a))return e.enter("setextHeadingLine"),i=t,function(t){return e.enter("setextHeadingLineSequence"),o(t)}(t);return n(t)};function o(t){return t===i?(e.consume(t),o):(e.exit("setextHeadingLineSequence"),Dc(t)?Vc(e,a,"lineSuffix")(t):a(t))}function a(r){return null===r||Mc(r)?(e.exit("setextHeadingLine"),t(r)):n(r)}}};const Iu={tokenize:function(e){const t=this,n=e.attempt(Gc,function(r){if(null===r)return void e.consume(r);return e.enter("lineEndingBlank"),e.consume(r),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n},e.attempt(this.parser.constructs.flowInitial,r,Vc(e,e.attempt(this.parser.constructs.flow,r,e.attempt(su,r)),"linePrefix")));return n;function r(r){if(null!==r)return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),t.currentConstruct=void 0,n;e.consume(r)}}};const Nu={resolveAll:Ru()},Ou=Vu("string"),Fu=Vu("text");function Vu(e){return{resolveAll:Ru("text"===e?Bu:void 0),tokenize:function(t){const n=this,r=this.parser.constructs[e],i=t.attempt(r,o,a);return o;function o(e){return l(e)?i(e):a(e)}function a(e){if(null!==e)return t.enter("data"),t.consume(e),s;t.consume(e)}function s(e){return l(e)?(t.exit("data"),i(e)):(t.consume(e),s)}function l(e){if(null===e)return!0;const t=r[e];let i=-1;if(t)for(;++i<t.length;){const e=t[i];if(!e.previous||e.previous.call(n,n.previous))return!0}return!1}}}}function Ru(e){return function(t,n){let r,i=-1;for(;++i<=t.length;)void 0===r?t[i]&&"data"===t[i][1].type&&(r=i,i++):t[i]&&"data"===t[i][1].type||(i!==r+2&&(t[r][1].end=t[i-1][1].end,t.splice(r+2,i-r-2),i=r+2),r=void 0);return e?e(t,n):t}}function Bu(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||"lineEnding"===e[n][1].type)&&"data"===e[n-1][1].type){const r=e[n-1][1],i=t.sliceStream(r);let o,a=i.length,s=-1,l=0;for(;a--;){const e=i[a];if("string"==typeof e){for(s=e.length;32===e.charCodeAt(s-1);)l++,s--;if(s)break;s=-1}else if(-2===e)o=!0,l++;else if(-1!==e){a++;break}}if(t._contentTypeTextTrailing&&n===e.length&&(l=0),l){const i={type:n===e.length||o||l<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:a?s:r.start._bufferIndex+s,_index:r.start._index+a,line:r.end.line,column:r.end.column-l,offset:r.end.offset-l},end:{...r.end}};r.end={...i.start},r.start.offset===r.end.offset?Object.assign(r,i):(e.splice(n,0,["enter",i,t],["exit",i,t]),n+=2)}n++}return e}const Uu={42:Pu,43:Pu,45:Pu,48:Pu,49:Pu,50:Pu,51:Pu,52:Pu,53:Pu,54:Pu,55:Pu,56:Pu,57:Pu,62:Qc},Hu={91:pu},ju={[-2]:eu,[-1]:eu,32:eu},qu={35:gu,42:Tu,45:[Du,Tu],60:vu,61:Du,95:Tu,96:Jc,126:Jc},Wu={38:Xc,92:Yc},Ku={[-5]:$u,[-4]:$u,[-3]:$u,33:zu,38:Xc,42:qc,60:[Kc,xu],91:Au,92:[mu,Yc],93:_u,95:qc,96:nu},Gu={null:[qc,Nu]},Qu=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:{null:[42,95]},contentInitial:Hu,disable:{null:[]},document:Uu,flow:qu,flowInitial:ju,insideSpan:Gu,string:Wu,text:Ku},Symbol.toStringTag,{value:"Module"}));function Yu(e,t,n){let r={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0};const i={},o=[];let a=[],s=[];const l={attempt:g(function(e,t){b(e,t.from)}),check:g(m),consume:function(e){Mc(e)?(r.line++,r.column=1,r.offset+=-3===e?2:1,y()):-1!==e&&(r.column++,r.offset++);r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===a[r._index].length&&(r._bufferIndex=-1,r._index++));c.previous=e},enter:function(e,t){const n=t||{};return n.type=e,n.start=h(),c.events.push(["enter",n,c]),s.push(n),n},exit:function(e){const t=s.pop();return t.end=h(),c.events.push(["exit",t,c]),t},interrupt:g(m,{interrupt:!0})},c={code:null,containerState:{},defineSkip:function(e){i[e.line]=e.column,y()},events:[],now:h,parser:e,previous:null,sliceSerialize:function(e,t){return function(e,t){let n=-1;const r=[];let i;for(;++n<e.length;){const o=e[n];let a;if("string"==typeof o)a=o;else switch(o){case-5:a="\r";break;case-4:a="\n";break;case-3:a="\r\n";break;case-2:a=t?" ":"\t";break;case-1:if(!t&&i)continue;a=" ";break;default:a=String.fromCharCode(o)}i=-2===o,r.push(a)}return r.join("")}(d(e),t)},sliceStream:d,write:function(e){if(a=vc(a,e),p(),null!==a[a.length-1])return[];return b(t,0),c.events=jc(o,c.events,c),c.events}};let u=t.tokenize.call(c,l);return t.resolveAll&&o.push(t),c;function d(e){return function(e,t){const n=t.start._index,r=t.start._bufferIndex,i=t.end._index,o=t.end._bufferIndex;let a;if(n===i)a=[e[n].slice(r,o)];else{if(a=e.slice(n,i),r>-1){const e=a[0];"string"==typeof e?a[0]=e.slice(r):a.shift()}o>0&&a.push(e[i].slice(0,o))}return a}(a,e)}function h(){const{_bufferIndex:e,_index:t,line:n,column:i,offset:o}=r;return{_bufferIndex:e,_index:t,line:n,column:i,offset:o}}function p(){let e;for(;r._index<a.length;){const t=a[r._index];if("string"==typeof t)for(e=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===e&&r._bufferIndex<t.length;)f(t.charCodeAt(r._bufferIndex));else f(t)}}function f(e){u=u(e)}function m(e,t){t.restore()}function g(e,t){return function(n,i,o){let a,u,d,p;return Array.isArray(n)?f(n):"tokenize"in n?f([n]):function(e){return t;function t(t){const n=null!==t&&e[t],r=null!==t&&e.null;return f([...Array.isArray(n)?n:n?[n]:[],...Array.isArray(r)?r:r?[r]:[]])(t)}}(n);function f(e){return a=e,u=0,0===e.length?o:m(e[u])}function m(e){return function(n){p=function(){const e=h(),t=c.previous,n=c.currentConstruct,i=c.events.length,o=Array.from(s);return{from:i,restore:a};function a(){r=e,c.previous=t,c.currentConstruct=n,c.events.length=i,s=o,y()}}(),d=e,e.partial||(c.currentConstruct=e);if(e.name&&c.parser.constructs.disable.null.includes(e.name))return b();return e.tokenize.call(t?Object.assign(Object.create(c),t):c,l,g,b)(n)}}function g(t){return e(d,p),i}function b(e){return p.restore(),++u<a.length?m(a[u]):o}}}function b(e,t){e.resolveAll&&!o.includes(e)&&o.push(e),e.resolve&&yc(c.events,t,c.events.length-t,e.resolve(c.events.slice(t),c)),e.resolveTo&&(c.events=e.resolveTo(c.events,c))}function y(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function Xu(e){const t=function(e){const t={};let n=-1;for(;++n<e.length;)kc(t,e[n]);return t}([Qu,...(e||{}).extensions||[]]),n={constructs:t,content:r(Rc),defined:[],document:r(Bc),flow:r(Iu),lazy:{},string:r(Ou),text:r(Fu)};return n;function r(e){return function(t){return Yu(n,e,t)}}}const Zu=/[\0\t\n\r]/g;const Ju=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function ed(e,t,n){if(t)return t;if(35===n.charCodeAt(0)){const e=n.charCodeAt(1),t=120===e||88===e;return _c(n.slice(t?2:1),t?16:10)}return bc(n)||e}const td={}.hasOwnProperty;function nd(e,t,n){return"string"!=typeof t&&(n=t,t=void 0),function(e){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:o(te),autolinkProtocol:C,autolinkEmail:C,atxHeading:o(X),blockQuote:o(W),characterEscape:C,characterReference:C,codeFenced:o(K),codeFencedFenceInfo:a,codeFencedFenceMeta:a,codeIndented:o(K,a),codeText:o(G,a),codeTextData:C,data:C,codeFlowValue:C,definition:o(Q),definitionDestinationString:a,definitionLabelString:a,definitionTitleString:a,emphasis:o(Y),hardBreakEscape:o(Z),hardBreakTrailing:o(Z),htmlFlow:o(J,a),htmlFlowData:C,htmlText:o(J,a),htmlTextData:C,image:o(ee),label:a,link:o(te),listItem:o(re),listItemValue:h,listOrdered:o(ne,d),listUnordered:o(ne),paragraph:o(ie),reference:V,referenceString:a,resourceDestinationString:a,resourceTitleString:a,setextHeading:o(X),strong:o(oe),thematicBreak:o(se)},exit:{atxHeading:l(),atxHeadingSequence:k,autolink:l(),autolinkEmail:q,autolinkProtocol:j,blockQuote:l(),characterEscapeValue:E,characterReferenceMarkerHexadecimal:B,characterReferenceMarkerNumeric:B,characterReferenceValue:U,characterReference:H,codeFenced:l(g),codeFencedFence:m,codeFencedFenceInfo:p,codeFencedFenceMeta:f,codeFlowValue:E,codeIndented:l(b),codeText:l(P),codeTextData:E,data:E,definition:l(),definitionDestinationString:w,definitionLabelString:y,definitionTitleString:v,emphasis:l(),hardBreakEscape:l(A),hardBreakTrailing:l(A),htmlFlow:l($),htmlFlowData:E,htmlText:l(T),htmlTextData:E,image:l(L),label:I,labelText:D,lineEnding:z,link:l(M),listItem:l(),listOrdered:l(),listUnordered:l(),paragraph:l(),referenceString:R,resourceDestinationString:N,resourceTitleString:O,resource:F,setextHeading:l(S),setextHeadingLineSequence:_,setextHeadingText:x,strong:l(),thematicBreak:l()}};id(t,(e||{}).mdastExtensions||[]);const n={};return r;function r(e){let r={type:"root",children:[]};const o={stack:[r],tokenStack:[],config:t,enter:s,exit:c,buffer:a,resume:u,data:n},l=[];let d=-1;for(;++d<e.length;)if("listOrdered"===e[d][1].type||"listUnordered"===e[d][1].type)if("enter"===e[d][0])l.push(d);else{d=i(e,l.pop(),d)}for(d=-1;++d<e.length;){const n=t[e[d][0]];td.call(n,e[d][1].type)&&n[e[d][1].type].call(Object.assign({sliceSerialize:e[d][2].sliceSerialize},o),e[d][1])}if(o.tokenStack.length>0){const e=o.tokenStack[o.tokenStack.length-1];(e[1]||ad).call(o,void 0,e[0])}for(r.position={start:rd(e.length>0?e[0][1].start:{line:1,column:1,offset:0}),end:rd(e.length>0?e[e.length-2][1].end:{line:1,column:1,offset:0})},d=-1;++d<t.transforms.length;)r=t.transforms[d](r)||r;return r}function i(e,t,n){let r,i,o,a,s=t-1,l=-1,c=!1;for(;++s<=n;){const t=e[s];switch(t[1].type){case"listUnordered":case"listOrdered":case"blockQuote":"enter"===t[0]?l++:l--,a=void 0;break;case"lineEndingBlank":"enter"===t[0]&&(!r||a||l||o||(o=s),a=void 0);break;case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:a=void 0}if(!l&&"enter"===t[0]&&"listItemPrefix"===t[1].type||-1===l&&"exit"===t[0]&&("listUnordered"===t[1].type||"listOrdered"===t[1].type)){if(r){let a=s;for(i=void 0;a--;){const t=e[a];if("lineEnding"===t[1].type||"lineEndingBlank"===t[1].type){if("exit"===t[0])continue;i&&(e[i][1].type="lineEndingBlank",c=!0),t[1].type="lineEnding",i=a}else if("linePrefix"!==t[1].type&&"blockQuotePrefix"!==t[1].type&&"blockQuotePrefixWhitespace"!==t[1].type&&"blockQuoteMarker"!==t[1].type&&"listItemIndent"!==t[1].type)break}o&&(!i||o<i)&&(r._spread=!0),r.end=Object.assign({},i?e[i][1].start:t[1].end),e.splice(i||s,0,["exit",r,t[2]]),s++,n++}if("listItemPrefix"===t[1].type){const i={type:"listItem",_spread:!1,start:Object.assign({},t[1].start),end:void 0};r=i,e.splice(s,0,["enter",i,t[2]]),s++,n++,o=void 0,a=!0}}}return e[t][1]._spread=c,n}function o(e,t){return n;function n(n){s.call(this,e(n),n),t&&t.call(this,n)}}function a(){this.stack.push({type:"fragment",children:[]})}function s(e,t,n){this.stack[this.stack.length-1].children.push(e),this.stack.push(e),this.tokenStack.push([t,n||void 0]),e.position={start:rd(t.start),end:void 0}}function l(e){return t;function t(t){e&&e.call(this,t),c.call(this,t)}}function c(e,t){const n=this.stack.pop(),r=this.tokenStack.pop();if(!r)throw new Error("Cannot close `"+e.type+"` ("+ql({start:e.start,end:e.end})+"): it’s not open");if(r[0].type!==e.type)if(t)t.call(this,e,r[0]);else{(r[1]||ad).call(this,e,r[0])}n.position.end=rd(e.end)}function u(){return function(e){return fc(e,"boolean"!=typeof pc.includeImageAlt||pc.includeImageAlt,"boolean"!=typeof pc.includeHtml||pc.includeHtml)}(this.stack.pop())}function d(){this.data.expectingFirstListItemValue=!0}function h(e){if(this.data.expectingFirstListItemValue){this.stack[this.stack.length-2].start=Number.parseInt(this.sliceSerialize(e),10),this.data.expectingFirstListItemValue=void 0}}function p(){const e=this.resume();this.stack[this.stack.length-1].lang=e}function f(){const e=this.resume();this.stack[this.stack.length-1].meta=e}function m(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function g(){const e=this.resume();this.stack[this.stack.length-1].value=e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function b(){const e=this.resume();this.stack[this.stack.length-1].value=e.replace(/(\r?\n|\r)$/g,"")}function y(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=Sc(this.sliceSerialize(e)).toLowerCase()}function v(){const e=this.resume();this.stack[this.stack.length-1].title=e}function w(){const e=this.resume();this.stack[this.stack.length-1].url=e}function k(e){const t=this.stack[this.stack.length-1];if(!t.depth){const n=this.sliceSerialize(e).length;t.depth=n}}function x(){this.data.setextHeadingSlurpLineEnding=!0}function _(e){this.stack[this.stack.length-1].depth=61===this.sliceSerialize(e).codePointAt(0)?1:2}function S(){this.data.setextHeadingSlurpLineEnding=void 0}function C(e){const t=this.stack[this.stack.length-1].children;let n=t[t.length-1];n&&"text"===n.type||(n=ae(),n.position={start:rd(e.start),end:void 0},t.push(n)),this.stack.push(n)}function E(e){const t=this.stack.pop();t.value+=this.sliceSerialize(e),t.position.end=rd(e.end)}function z(e){const n=this.stack[this.stack.length-1];if(this.data.atHardBreak){return n.children[n.children.length-1].position.end=rd(e.end),void(this.data.atHardBreak=void 0)}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(n.type)&&(C.call(this,e),E.call(this,e))}function A(){this.data.atHardBreak=!0}function $(){const e=this.resume();this.stack[this.stack.length-1].value=e}function T(){const e=this.resume();this.stack[this.stack.length-1].value=e}function P(){const e=this.resume();this.stack[this.stack.length-1].value=e}function M(){const e=this.stack[this.stack.length-1];if(this.data.inReference){const t=this.data.referenceType||"shortcut";e.type+="Reference",e.referenceType=t,delete e.url,delete e.title}else delete e.identifier,delete e.label;this.data.referenceType=void 0}function L(){const e=this.stack[this.stack.length-1];if(this.data.inReference){const t=this.data.referenceType||"shortcut";e.type+="Reference",e.referenceType=t,delete e.url,delete e.title}else delete e.identifier,delete e.label;this.data.referenceType=void 0}function D(e){const t=this.sliceSerialize(e),n=this.stack[this.stack.length-2];n.label=function(e){return e.replace(Ju,ed)}(t),n.identifier=Sc(t).toLowerCase()}function I(){const e=this.stack[this.stack.length-1],t=this.resume(),n=this.stack[this.stack.length-1];if(this.data.inReference=!0,"link"===n.type){const t=e.children;n.children=t}else n.alt=t}function N(){const e=this.resume();this.stack[this.stack.length-1].url=e}function O(){const e=this.resume();this.stack[this.stack.length-1].title=e}function F(){this.data.inReference=void 0}function V(){this.data.referenceType="collapsed"}function R(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=Sc(this.sliceSerialize(e)).toLowerCase(),this.data.referenceType="full"}function B(e){this.data.characterReferenceType=e.type}function U(e){const t=this.sliceSerialize(e),n=this.data.characterReferenceType;let r;if(n)r=_c(t,"characterReferenceMarkerNumeric"===n?10:16),this.data.characterReferenceType=void 0;else{r=bc(t)}this.stack[this.stack.length-1].value+=r}function H(e){this.stack.pop().position.end=rd(e.end)}function j(e){E.call(this,e);this.stack[this.stack.length-1].url=this.sliceSerialize(e)}function q(e){E.call(this,e);this.stack[this.stack.length-1].url="mailto:"+this.sliceSerialize(e)}function W(){return{type:"blockquote",children:[]}}function K(){return{type:"code",lang:null,meta:null,value:""}}function G(){return{type:"inlineCode",value:""}}function Q(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function Y(){return{type:"emphasis",children:[]}}function X(){return{type:"heading",depth:0,children:[]}}function Z(){return{type:"break"}}function J(){return{type:"html",value:""}}function ee(){return{type:"image",title:null,url:"",alt:null}}function te(){return{type:"link",title:null,url:"",children:[]}}function ne(e){return{type:"list",ordered:"listOrdered"===e.type,start:null,spread:e._spread,children:[]}}function re(e){return{type:"listItem",spread:e._spread,checked:null,children:[]}}function ie(){return{type:"paragraph",children:[]}}function oe(){return{type:"strong",children:[]}}function ae(){return{type:"text",value:""}}function se(){return{type:"thematicBreak"}}}(n)(function(e){for(;!ou(e););return e}(Xu(n).document().write(function(){let e,t=1,n="",r=!0;return function(i,o,a){const s=[];let l,c,u,d,h;for(i=n+("string"==typeof i?i.toString():new TextDecoder(o||void 0).decode(i)),u=0,n="",r&&(65279===i.charCodeAt(0)&&u++,r=void 0);u<i.length;){if(Zu.lastIndex=u,l=Zu.exec(i),d=l&&void 0!==l.index?l.index:i.length,h=i.charCodeAt(d),!l){n=i.slice(u);break}if(10===h&&u===d&&e)s.push(-3),e=void 0;else switch(e&&(s.push(-5),e=void 0),u<d&&(s.push(i.slice(u,d)),t+=d-u),h){case 0:s.push(65533),t++;break;case 9:for(c=4*Math.ceil(t/4),s.push(-2);t++<c;)s.push(-1);break;case 10:s.push(-4),t=1;break;default:e=!0,t=1}u=d+1}return a&&(e&&s.push(-5),n&&s.push(n),s.push(null)),s}}()(e,t,!0))))}function rd(e){return{line:e.line,column:e.column,offset:e.offset}}function id(e,t){let n=-1;for(;++n<t.length;){const r=t[n];Array.isArray(r)?id(e,r):od(e,r)}}function od(e,t){let n;for(n in t)if(td.call(t,n))switch(n){case"canContainEols":{const r=t[n];r&&e[n].push(...r);break}case"transforms":{const r=t[n];r&&e[n].push(...r);break}case"enter":case"exit":{const r=t[n];r&&Object.assign(e[n],r);break}}}function ad(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+ql({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+ql({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+ql({start:t.start,end:t.end})+") is still open")}function sd(e){const t=this;t.parser=function(n){return nd(n,{...t.data("settings"),...e,extensions:t.data("micromarkExtensions")||[],mdastExtensions:t.data("fromMarkdownExtensions")||[]})}}function ld(e,t){const n=t.referenceType;let r="]";if("collapsed"===n?r+="[]":"full"===n&&(r+="["+(t.label||t.identifier)+"]"),"imageReference"===t.type)return[{type:"text",value:"!["+t.alt+r}];const i=e.all(t),o=i[0];o&&"text"===o.type?o.value="["+o.value:i.unshift({type:"text",value:"["});const a=i[i.length-1];return a&&"text"===a.type?a.value+=r:i.push({type:"text",value:r}),i}function cd(e){const t=e.spread;return null==t?e.children.length>1:t}function ud(e){const t=String(e),n=/\r?\n|\r/g;let r=n.exec(t),i=0;const o=[];for(;r;)o.push(dd(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return o.push(dd(t.slice(i),i>0,!1)),o.join("")}function dd(e,t,n){let r=0,i=e.length;if(t){let t=e.codePointAt(r);for(;9===t||32===t;)r++,t=e.codePointAt(r)}if(n){let t=e.codePointAt(i-1);for(;9===t||32===t;)i--,t=e.codePointAt(i-1)}return i>r?e.slice(r,i):""}const hd={blockquote:function(e,t){const n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)},break:function(e,t){const n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:"\n"}]},code:function(e,t){const n=t.value?t.value+"\n":"",r={};t.lang&&(r.className=["language-"+t.lang]);let i={type:"element",tagName:"code",properties:r,children:[{type:"text",value:n}]};return t.meta&&(i.data={meta:t.meta}),e.patch(t,i),i=e.applyData(t,i),i={type:"element",tagName:"pre",properties:{},children:[i]},e.patch(t,i),i},delete:function(e,t){const n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)},emphasis:function(e,t){const n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)},footnoteReference:function(e,t){const n="string"==typeof e.options.clobberPrefix?e.options.clobberPrefix:"user-content-",r=String(t.identifier).toUpperCase(),i=Fc(r.toLowerCase()),o=e.footnoteOrder.indexOf(r);let a,s=e.footnoteCounts.get(r);void 0===s?(s=0,e.footnoteOrder.push(r),a=e.footnoteOrder.length):a=o+1,s+=1,e.footnoteCounts.set(r,s);const l={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+i,id:n+"fnref-"+i+(s>1?"-"+s:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(a)}]};e.patch(t,l);const c={type:"element",tagName:"sup",properties:{},children:[l]};return e.patch(t,c),e.applyData(t,c)},heading:function(e,t){const n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)},html:function(e,t){if(e.options.allowDangerousHtml){const n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}},imageReference:function(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return ld(e,t);const i={src:Fc(r.url||""),alt:t.alt};null!==r.title&&void 0!==r.title&&(i.title=r.title);const o={type:"element",tagName:"img",properties:i,children:[]};return e.patch(t,o),e.applyData(t,o)},image:function(e,t){const n={src:Fc(t.url)};null!==t.alt&&void 0!==t.alt&&(n.alt=t.alt),null!==t.title&&void 0!==t.title&&(n.title=t.title);const r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)},inlineCode:function(e,t){const n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);const r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)},linkReference:function(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return ld(e,t);const i={href:Fc(r.url||"")};null!==r.title&&void 0!==r.title&&(i.title=r.title);const o={type:"element",tagName:"a",properties:i,children:e.all(t)};return e.patch(t,o),e.applyData(t,o)},link:function(e,t){const n={href:Fc(t.url)};null!==t.title&&void 0!==t.title&&(n.title=t.title);const r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)},listItem:function(e,t,n){const r=e.all(t),i=n?function(e){let t=!1;if("list"===e.type){t=e.spread||!1;const n=e.children;let r=-1;for(;!t&&++r<n.length;)t=cd(n[r])}return t}(n):cd(t),o={},a=[];if("boolean"==typeof t.checked){const e=r[0];let n;e&&"element"===e.type&&"p"===e.tagName?n=e:(n={type:"element",tagName:"p",properties:{},children:[]},r.unshift(n)),n.children.length>0&&n.children.unshift({type:"text",value:" "}),n.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),o.className=["task-list-item"]}let s=-1;for(;++s<r.length;){const e=r[s];(i||0!==s||"element"!==e.type||"p"!==e.tagName)&&a.push({type:"text",value:"\n"}),"element"!==e.type||"p"!==e.tagName||i?a.push(e):a.push(...e.children)}const l=r[r.length-1];l&&(i||"element"!==l.type||"p"!==l.tagName)&&a.push({type:"text",value:"\n"});const c={type:"element",tagName:"li",properties:o,children:a};return e.patch(t,c),e.applyData(t,c)},list:function(e,t){const n={},r=e.all(t);let i=-1;for("number"==typeof t.start&&1!==t.start&&(n.start=t.start);++i<r.length;){const e=r[i];if("element"===e.type&&"li"===e.tagName&&e.properties&&Array.isArray(e.properties.className)&&e.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const o={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,o),e.applyData(t,o)},paragraph:function(e,t){const n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)},root:function(e,t){const n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)},strong:function(e,t){const n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)},table:function(e,t){const n=e.all(t),r=n.shift(),i=[];if(r){const n={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],n),i.push(n)}if(n.length>0){const r={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},o=Hl(t.children[1]),a=Ul(t.children[t.children.length-1]);o&&a&&(r.position={start:o,end:a}),i.push(r)}const o={type:"element",tagName:"table",properties:{},children:e.wrap(i,!0)};return e.patch(t,o),e.applyData(t,o)},tableCell:function(e,t){const n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)},tableRow:function(e,t,n){const r=n?n.children:void 0,i=0===(r?r.indexOf(t):1)?"th":"td",o=n&&"table"===n.type?n.align:void 0,a=o?o.length:t.children.length;let s=-1;const l=[];for(;++s<a;){const n=t.children[s],r={},a=o?o[s]:void 0;a&&(r.align=a);let c={type:"element",tagName:i,properties:r,children:[]};n&&(c.children=e.all(n),e.patch(n,c),c=e.applyData(n,c)),l.push(c)}const c={type:"element",tagName:"tr",properties:{},children:e.wrap(l,!0)};return e.patch(t,c),e.applyData(t,c)},text:function(e,t){const n={type:"text",value:ud(String(t.value))};return e.patch(t,n),e.applyData(t,n)},thematicBreak:function(e,t){const n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)},toml:pd,yaml:pd,definition:pd,footnoteDefinition:pd};function pd(){}const fd="object"==typeof self?self:globalThis,md=e=>((e,t)=>{const n=(t,n)=>(e.set(n,t),t),r=i=>{if(e.has(i))return e.get(i);const[o,a]=t[i];switch(o){case 0:case-1:return n(a,i);case 1:{const e=n([],i);for(const t of a)e.push(r(t));return e}case 2:{const e=n({},i);for(const[t,n]of a)e[r(t)]=r(n);return e}case 3:return n(new Date(a),i);case 4:{const{source:e,flags:t}=a;return n(new RegExp(e,t),i)}case 5:{const e=n(new Map,i);for(const[t,n]of a)e.set(r(t),r(n));return e}case 6:{const e=n(new Set,i);for(const t of a)e.add(r(t));return e}case 7:{const{name:e,message:t}=a;return n(new fd[e](t),i)}case 8:return n(BigInt(a),i);case"BigInt":return n(Object(BigInt(a)),i);case"ArrayBuffer":return n(new Uint8Array(a).buffer,a);case"DataView":{const{buffer:e}=new Uint8Array(a);return n(new DataView(e),a)}}return n(new fd[o](a),i)};return r})(new Map,e)(0),gd="",{toString:bd}={},{keys:yd}=Object,vd=e=>{const t=typeof e;if("object"!==t||!e)return[0,t];const n=bd.call(e).slice(8,-1);switch(n){case"Array":return[1,gd];case"Object":return[2,gd];case"Date":return[3,gd];case"RegExp":return[4,gd];case"Map":return[5,gd];case"Set":return[6,gd];case"DataView":return[1,n]}return n.includes("Array")?[1,n]:n.includes("Error")?[7,n]:[2,n]},wd=([e,t])=>0===e&&("function"===t||"symbol"===t),kd=(e,{json:t,lossy:n}={})=>{const r=[];return((e,t,n,r)=>{const i=(e,t)=>{const i=r.push(e)-1;return n.set(t,i),i},o=r=>{if(n.has(r))return n.get(r);let[a,s]=vd(r);switch(a){case 0:{let t=r;switch(s){case"bigint":a=8,t=r.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+s);t=null;break;case"undefined":return i([-1],r)}return i([a,t],r)}case 1:{if(s){let e=r;return"DataView"===s?e=new Uint8Array(r.buffer):"ArrayBuffer"===s&&(e=new Uint8Array(r)),i([s,[...e]],r)}const e=[],t=i([a,e],r);for(const t of r)e.push(o(t));return t}case 2:{if(s)switch(s){case"BigInt":return i([s,r.toString()],r);case"Boolean":case"Number":case"String":return i([s,r.valueOf()],r)}if(t&&"toJSON"in r)return o(r.toJSON());const n=[],l=i([a,n],r);for(const t of yd(r))!e&&wd(vd(r[t]))||n.push([o(t),o(r[t])]);return l}case 3:return i([a,r.toISOString()],r);case 4:{const{source:e,flags:t}=r;return i([a,{source:e,flags:t}],r)}case 5:{const t=[],n=i([a,t],r);for(const[n,i]of r)(e||!wd(vd(n))&&!wd(vd(i)))&&t.push([o(n),o(i)]);return n}case 6:{const t=[],n=i([a,t],r);for(const n of r)!e&&wd(vd(n))||t.push(o(n));return n}}const{message:l}=r;return i([a,{name:s,message:l}],r)};return o})(!(t||n),!!t,new Map,r)(e),r},xd="function"==typeof structuredClone?(e,t)=>t&&("json"in t||"lossy"in t)?md(kd(e,t)):structuredClone(e):(e,t)=>md(kd(e,t));function _d(e,t){const n=[{type:"text",value:"↩"}];return t>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(t)}]}),n}function Sd(e,t){return"Back to reference "+(e+1)+(t>1?"-"+t:"")}const Cd=function(e){if(null==e)return zd;if("function"==typeof e)return Ed(e);if("object"==typeof e)return Array.isArray(e)?function(e){const t=[];let n=-1;for(;++n<e.length;)t[n]=Cd(e[n]);return Ed(r);function r(...e){let n=-1;for(;++n<t.length;)if(t[n].apply(this,e))return!0;return!1}}(e):function(e){const t=e;return Ed(n);function n(n){const r=n;let i;for(i in e)if(r[i]!==t[i])return!1;return!0}}(e);if("string"==typeof e)return function(e){return Ed(t);function t(t){return t&&t.type===e}}(e);throw new Error("Expected function, string, or object as test")};function Ed(e){return function(t,n,r){return Boolean(function(e){return null!==e&&"object"==typeof e&&"type"in e}(t)&&e.call(this,t,"number"==typeof n?n:void 0,r||void 0))}}function zd(){return!0}const Ad=[],$d=!0,Td=!1;function Pd(e,t,n,r){let i;"function"==typeof t&&"function"!=typeof n?(r=n,n=t):i=t;const o=Cd(i),a=r?-1:1;!function e(i,s,l){const c=i&&"object"==typeof i?i:{};if("string"==typeof c.type){const e="string"==typeof c.tagName?c.tagName:"string"==typeof c.name?c.name:void 0;Object.defineProperty(u,"name",{value:"node ("+i.type+(e?"<"+e+">":"")+")"})}return u;function u(){let c,u,d,h=Ad;if((!t||o(i,s,l[l.length-1]||void 0))&&(h=function(e){if(Array.isArray(e))return e;if("number"==typeof e)return[$d,e];return null==e?Ad:[e]}(n(i,l)),h[0]===Td))return h;if("children"in i&&i.children){const t=i;if(t.children&&"skip"!==h[0])for(u=(r?t.children.length:-1)+a,d=l.concat(t);u>-1&&u<t.children.length;){const n=t.children[u];if(c=e(n,u,d)(),c[0]===Td)return c;u="number"==typeof c[1]?c[1]:u+a}}return h}}(e,void 0,[])()}function Md(e,t,n,r){let i,o,a;"function"==typeof t&&"function"!=typeof n?(o=void 0,a=t,i=n):(o=t,a=n,i=r),Pd(e,o,function(e,t){const n=t[t.length-1],r=n?n.children.indexOf(e):void 0;return a(e,r,n)},i)}const Ld={}.hasOwnProperty,Dd={};function Id(e,t){e.position&&(t.position=function(e){const t=Hl(e),n=Ul(e);if(t&&n)return{start:t,end:n}}(e))}function Nd(e,t){let n=t;if(e&&e.data){const t=e.data.hName,r=e.data.hChildren,i=e.data.hProperties;if("string"==typeof t)if("element"===n.type)n.tagName=t;else{n={type:"element",tagName:t,properties:{},children:"children"in n?n.children:[n]}}"element"===n.type&&i&&Object.assign(n.properties,xd(i)),"children"in n&&n.children&&null!=r&&(n.children=r)}return n}function Od(e,t){const n=t.data||{},r=!("value"in t)||Ld.call(n,"hProperties")||Ld.call(n,"hChildren")?{type:"element",tagName:"div",properties:{},children:e.all(t)}:{type:"text",value:t.value};return e.patch(t,r),e.applyData(t,r)}function Fd(e,t){const n=[];let r=-1;for(t&&n.push({type:"text",value:"\n"});++r<e.length;)r&&n.push({type:"text",value:"\n"}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:"\n"}),n}function Vd(e){let t=0,n=e.charCodeAt(t);for(;9===n||32===n;)t++,n=e.charCodeAt(t);return e.slice(t)}function Rd(e,t){const n=function(e,t){const n=t||Dd,r=new Map,i=new Map,o=new Map,a={...hd,...n.handlers},s={all:function(e){const t=[];if("children"in e){const n=e.children;let r=-1;for(;++r<n.length;){const i=s.one(n[r],e);if(i){if(r&&"break"===n[r-1].type&&(Array.isArray(i)||"text"!==i.type||(i.value=Vd(i.value)),!Array.isArray(i)&&"element"===i.type)){const e=i.children[0];e&&"text"===e.type&&(e.value=Vd(e.value))}Array.isArray(i)?t.push(...i):t.push(i)}}}return t},applyData:Nd,definitionById:r,footnoteById:i,footnoteCounts:o,footnoteOrder:[],handlers:a,one:function(e,t){const n=e.type,r=s.handlers[n];if(Ld.call(s.handlers,n)&&r)return r(s,e,t);if(s.options.passThrough&&s.options.passThrough.includes(n)){if("children"in e){const{children:t,...n}=e,r=xd(n);return r.children=s.all(e),r}return xd(e)}return(s.options.unknownHandler||Od)(s,e,t)},options:n,patch:Id,wrap:Fd};return Md(e,function(e){if("definition"===e.type||"footnoteDefinition"===e.type){const t="definition"===e.type?r:i,n=String(e.identifier).toUpperCase();t.has(n)||t.set(n,e)}}),s}(e,t),r=n.one(e,void 0),i=function(e){const t="string"==typeof e.options.clobberPrefix?e.options.clobberPrefix:"user-content-",n=e.options.footnoteBackContent||_d,r=e.options.footnoteBackLabel||Sd,i=e.options.footnoteLabel||"Footnotes",o=e.options.footnoteLabelTagName||"h2",a=e.options.footnoteLabelProperties||{className:["sr-only"]},s=[];let l=-1;for(;++l<e.footnoteOrder.length;){const i=e.footnoteById.get(e.footnoteOrder[l]);if(!i)continue;const o=e.all(i),a=String(i.identifier).toUpperCase(),c=Fc(a.toLowerCase());let u=0;const d=[],h=e.footnoteCounts.get(a);for(;void 0!==h&&++u<=h;){d.length>0&&d.push({type:"text",value:" "});let e="string"==typeof n?n:n(l,u);"string"==typeof e&&(e={type:"text",value:e}),d.push({type:"element",tagName:"a",properties:{href:"#"+t+"fnref-"+c+(u>1?"-"+u:""),dataFootnoteBackref:"",ariaLabel:"string"==typeof r?r:r(l,u),className:["data-footnote-backref"]},children:Array.isArray(e)?e:[e]})}const p=o[o.length-1];if(p&&"element"===p.type&&"p"===p.tagName){const e=p.children[p.children.length-1];e&&"text"===e.type?e.value+=" ":p.children.push({type:"text",value:" "}),p.children.push(...d)}else o.push(...d);const f={type:"element",tagName:"li",properties:{id:t+"fn-"+c},children:e.wrap(o,!0)};e.patch(i,f),s.push(f)}if(0!==s.length)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:o,properties:{...xd(a),id:"footnote-label"},children:[{type:"text",value:i}]},{type:"text",value:"\n"},{type:"element",tagName:"ol",properties:{},children:e.wrap(s,!0)},{type:"text",value:"\n"}]}}(n),o=Array.isArray(r)?{type:"root",children:r}:r||{type:"root",children:[]};return i&&o.children.push({type:"text",value:"\n"},i),o}function Bd(e,t){return e&&"run"in e?async function(n,r){const i=Rd(n,{file:r,...t});await e.run(i,r)}:function(n,r){return Rd(n,{file:r,...e||t})}}function Ud(e){if(e)throw e}var Hd,jd;var qd=function(){if(jd)return Hd;jd=1;var e=Object.prototype.hasOwnProperty,t=Object.prototype.toString,n=Object.defineProperty,r=Object.getOwnPropertyDescriptor,i=function(e){return"function"==typeof Array.isArray?Array.isArray(e):"[object Array]"===t.call(e)},o=function(n){if(!n||"[object Object]"!==t.call(n))return!1;var r,i=e.call(n,"constructor"),o=n.constructor&&n.constructor.prototype&&e.call(n.constructor.prototype,"isPrototypeOf");if(n.constructor&&!i&&!o)return!1;for(r in n);return void 0===r||e.call(n,r)},a=function(e,t){n&&"__proto__"===t.name?n(e,t.name,{enumerable:!0,configurable:!0,value:t.newValue,writable:!0}):e[t.name]=t.newValue},s=function(t,n){if("__proto__"===n){if(!e.call(t,n))return;if(r)return r(t,n).value}return t[n]};return Hd=function e(){var t,n,r,l,c,u,d=arguments[0],h=1,p=arguments.length,f=!1;for("boolean"==typeof d&&(f=d,d=arguments[1]||{},h=2),(null==d||"object"!=typeof d&&"function"!=typeof d)&&(d={});h<p;++h)if(null!=(t=arguments[h]))for(n in t)r=s(d,n),d!==(l=s(t,n))&&(f&&l&&(o(l)||(c=i(l)))?(c?(c=!1,u=r&&i(r)?r:[]):u=r&&o(r)?r:{},a(d,{name:n,newValue:e(f,u,l)})):void 0!==l&&a(d,{name:n,newValue:l}));return d},Hd}();const Wd=t(qd);function Kd(e){if("object"!=typeof e||null===e)return!1;const t=Object.getPrototypeOf(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)}function Gd(){const e=[],t={run:function(...t){let n=-1;const r=t.pop();if("function"!=typeof r)throw new TypeError("Expected function as last argument, not "+r);!function i(o,...a){const s=e[++n];let l=-1;if(o)r(o);else{for(;++l<t.length;)null!==a[l]&&void 0!==a[l]||(a[l]=t[l]);t=a,s?function(e,t){let n;return r;function r(...t){const r=e.length>t.length;let a;r&&t.push(i);try{a=e.apply(this,t)}catch(e){if(r&&n)throw e;return i(e)}r||(a&&a.then&&"function"==typeof a.then?a.then(o,i):a instanceof Error?i(a):o(a))}function i(e,...r){n||(n=!0,t(e,...r))}function o(e){i(null,e)}}(s,i)(...a):r(null,...a)}}(null,...t)},use:function(n){if("function"!=typeof n)throw new TypeError("Expected `middelware` to be a function, not "+n);return e.push(n),t}};return t}const Qd={basename:function(e,t){if(void 0!==t&&"string"!=typeof t)throw new TypeError('"ext" argument must be a string');Yd(e);let n,r=0,i=-1,o=e.length;if(void 0===t||0===t.length||t.length>e.length){for(;o--;)if(47===e.codePointAt(o)){if(n){r=o+1;break}}else i<0&&(n=!0,i=o+1);return i<0?"":e.slice(r,i)}if(t===e)return"";let a=-1,s=t.length-1;for(;o--;)if(47===e.codePointAt(o)){if(n){r=o+1;break}}else a<0&&(n=!0,a=o+1),s>-1&&(e.codePointAt(o)===t.codePointAt(s--)?s<0&&(i=o):(s=-1,i=a));r===i?i=a:i<0&&(i=e.length);return e.slice(r,i)},dirname:function(e){if(Yd(e),0===e.length)return".";let t,n=-1,r=e.length;for(;--r;)if(47===e.codePointAt(r)){if(t){n=r;break}}else t||(t=!0);return n<0?47===e.codePointAt(0)?"/":".":1===n&&47===e.codePointAt(0)?"//":e.slice(0,n)},extname:function(e){Yd(e);let t,n=e.length,r=-1,i=0,o=-1,a=0;for(;n--;){const s=e.codePointAt(n);if(47!==s)r<0&&(t=!0,r=n+1),46===s?o<0?o=n:1!==a&&(a=1):o>-1&&(a=-1);else if(t){i=n+1;break}}if(o<0||r<0||0===a||1===a&&o===r-1&&o===i+1)return"";return e.slice(o,r)},join:function(...e){let t,n=-1;for(;++n<e.length;)Yd(e[n]),e[n]&&(t=void 0===t?e[n]:t+"/"+e[n]);return void 0===t?".":function(e){Yd(e);const t=47===e.codePointAt(0);let n=function(e,t){let n,r,i="",o=0,a=-1,s=0,l=-1;for(;++l<=e.length;){if(l<e.length)n=e.codePointAt(l);else{if(47===n)break;n=47}if(47===n){if(a===l-1||1===s);else if(a!==l-1&&2===s){if(i.length<2||2!==o||46!==i.codePointAt(i.length-1)||46!==i.codePointAt(i.length-2))if(i.length>2){if(r=i.lastIndexOf("/"),r!==i.length-1){r<0?(i="",o=0):(i=i.slice(0,r),o=i.length-1-i.lastIndexOf("/")),a=l,s=0;continue}}else if(i.length>0){i="",o=0,a=l,s=0;continue}t&&(i=i.length>0?i+"/..":"..",o=2)}else i.length>0?i+="/"+e.slice(a+1,l):i=e.slice(a+1,l),o=l-a-1;a=l,s=0}else 46===n&&s>-1?s++:s=-1}return i}(e,!t);0!==n.length||t||(n=".");n.length>0&&47===e.codePointAt(e.length-1)&&(n+="/");return t?"/"+n:n}(t)},sep:"/"};function Yd(e){if("string"!=typeof e)throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const Xd={cwd:function(){return"/"}};function Zd(e){return Boolean(null!==e&&"object"==typeof e&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&void 0===e.auth)}function Jd(e){if("string"==typeof e)e=new URL(e);else if(!Zd(e)){const t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if("file:"!==e.protocol){const e=new TypeError("The URL must be of scheme file");throw e.code="ERR_INVALID_URL_SCHEME",e}return function(e){if(""!==e.hostname){const e=new TypeError('File URL host must be "localhost" or empty on darwin');throw e.code="ERR_INVALID_FILE_URL_HOST",e}const t=e.pathname;let n=-1;for(;++n<t.length;)if(37===t.codePointAt(n)&&50===t.codePointAt(n+1)){const e=t.codePointAt(n+2);if(70===e||102===e){const e=new TypeError("File URL path must not include encoded / characters");throw e.code="ERR_INVALID_FILE_URL_PATH",e}}return decodeURIComponent(t)}(e)}const eh=["history","path","basename","stem","extname","dirname"];class th{constructor(e){let t;t=e?Zd(e)?{path:e}:"string"==typeof e||function(e){return Boolean(e&&"object"==typeof e&&"byteLength"in e&&"byteOffset"in e)}(e)?{value:e}:e:{},this.cwd="cwd"in t?"":Xd.cwd(),this.data={},this.history=[],this.messages=[];let n,r=-1;for(;++r<eh.length;){const e=eh[r];e in t&&void 0!==t[e]&&null!==t[e]&&(this[e]="history"===e?[...t[e]]:t[e])}for(n in t)eh.includes(n)||(this[n]=t[n])}get basename(){return"string"==typeof this.path?Qd.basename(this.path):void 0}set basename(e){rh(e,"basename"),nh(e,"basename"),this.path=Qd.join(this.dirname||"",e)}get dirname(){return"string"==typeof this.path?Qd.dirname(this.path):void 0}set dirname(e){ih(this.basename,"dirname"),this.path=Qd.join(e||"",this.basename)}get extname(){return"string"==typeof this.path?Qd.extname(this.path):void 0}set extname(e){if(nh(e,"extname"),ih(this.dirname,"extname"),e){if(46!==e.codePointAt(0))throw new Error("`extname` must start with `.`");if(e.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=Qd.join(this.dirname,this.stem+(e||""))}get path(){return this.history[this.history.length-1]}set path(e){Zd(e)&&(e=Jd(e)),rh(e,"path"),this.path!==e&&this.history.push(e)}get stem(){return"string"==typeof this.path?Qd.basename(this.path,this.extname):void 0}set stem(e){rh(e,"stem"),nh(e,"stem"),this.path=Qd.join(this.dirname||"",e+(this.extname||""))}fail(e,t,n){const r=this.message(e,t,n);throw r.fatal=!0,r}info(e,t,n){const r=this.message(e,t,n);return r.fatal=void 0,r}message(e,t,n){const r=new Ql(e,t,n);return this.path&&(r.name=this.path+":"+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}toString(e){if(void 0===this.value)return"";if("string"==typeof this.value)return this.value;return new TextDecoder(e||void 0).decode(this.value)}}function nh(e,t){if(e&&e.includes(Qd.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+Qd.sep+"`")}function rh(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function ih(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}const oh=function(e){const t=this.constructor.prototype,n=t[e],r=function(){return n.apply(r,arguments)};return Object.setPrototypeOf(r,t),r},ah={}.hasOwnProperty;class sh extends oh{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=Gd()}copy(){const e=new sh;let t=-1;for(;++t<this.attachers.length;){const n=this.attachers[t];e.use(...n)}return e.data(Wd(!0,{},this.namespace)),e}data(e,t){return"string"==typeof e?2===arguments.length?(dh("data",this.frozen),this.namespace[e]=t,this):ah.call(this.namespace,e)&&this.namespace[e]||void 0:e?(dh("data",this.frozen),this.namespace=e,this):this.namespace}freeze(){if(this.frozen)return this;const e=this;for(;++this.freezeIndex<this.attachers.length;){const[t,...n]=this.attachers[this.freezeIndex];if(!1===n[0])continue;!0===n[0]&&(n[0]=void 0);const r=t.call(e,...n);"function"==typeof r&&this.transformers.use(r)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(e){this.freeze();const t=fh(e),n=this.parser||this.Parser;return ch("parse",n),n(String(t),t)}process(e,t){const n=this;return this.freeze(),ch("process",this.parser||this.Parser),uh("process",this.compiler||this.Compiler),t?r(void 0,t):new Promise(r);function r(r,i){const o=fh(e),a=n.parse(o);function s(e,n){e||!n?i(e):r?r(n):t(void 0,n)}n.run(a,o,function(e,t,r){if(e||!t||!r)return s(e);const i=t,o=n.stringify(i,r);var a;"string"==typeof(a=o)||function(e){return Boolean(e&&"object"==typeof e&&"byteLength"in e&&"byteOffset"in e)}(a)?r.value=o:r.result=o,s(e,r)})}}processSync(e){let t,n=!1;return this.freeze(),ch("processSync",this.parser||this.Parser),uh("processSync",this.compiler||this.Compiler),this.process(e,function(e,r){n=!0,Ud(e),t=r}),ph("processSync","process",n),t}run(e,t,n){hh(e),this.freeze();const r=this.transformers;return n||"function"!=typeof t||(n=t,t=void 0),n?i(void 0,n):new Promise(i);function i(i,o){const a=fh(t);r.run(e,a,function(t,r,a){const s=r||e;t?o(t):i?i(s):n(void 0,s,a)})}}runSync(e,t){let n,r=!1;return this.run(e,t,function(e,t){Ud(e),n=t,r=!0}),ph("runSync","run",r),n}stringify(e,t){this.freeze();const n=fh(t),r=this.compiler||this.Compiler;return uh("stringify",r),hh(e),r(e,n)}use(e,...t){const n=this.attachers,r=this.namespace;if(dh("use",this.frozen),null==e);else if("function"==typeof e)s(e,t);else{if("object"!=typeof e)throw new TypeError("Expected usable value, not `"+e+"`");Array.isArray(e)?a(e):o(e)}return this;function i(e){if("function"==typeof e)s(e,[]);else{if("object"!=typeof e)throw new TypeError("Expected usable value, not `"+e+"`");if(Array.isArray(e)){const[t,...n]=e;s(t,n)}else o(e)}}function o(e){if(!("plugins"in e)&&!("settings"in e))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");a(e.plugins),e.settings&&(r.settings=Wd(!0,r.settings,e.settings))}function a(e){let t=-1;if(null==e);else{if(!Array.isArray(e))throw new TypeError("Expected a list of plugins, not `"+e+"`");for(;++t<e.length;){i(e[t])}}}function s(e,t){let r=-1,i=-1;for(;++r<n.length;)if(n[r][0]===e){i=r;break}if(-1===i)n.push([e,...t]);else if(t.length>0){let[r,...o]=t;const a=n[i][1];Kd(a)&&Kd(r)&&(r=Wd(!0,a,r)),n[i]=[e,r,...o]}}}}const lh=(new sh).freeze();function ch(e,t){if("function"!=typeof t)throw new TypeError("Cannot `"+e+"` without `parser`")}function uh(e,t){if("function"!=typeof t)throw new TypeError("Cannot `"+e+"` without `compiler`")}function dh(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function hh(e){if(!Kd(e)||"string"!=typeof e.type)throw new TypeError("Expected node, got `"+e+"`")}function ph(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function fh(e){return function(e){return Boolean(e&&"object"==typeof e&&"message"in e&&"messages"in e)}(e)?e:new th(e)}const mh=[],gh={allowDangerousHtml:!0},bh=/^(https?|ircs?|mailto|xmpp)$/i,yh=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function vh(e){const t=function(e){const t=e.rehypePlugins||mh,n=e.remarkPlugins||mh,r=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...gh}:gh,i=lh().use(sd).use(n).use(Bd,r).use(t);return i}(e),n=function(e){const t=e.children||"",n=new th;"string"==typeof t&&(n.value=t);return n}(e);return function(e,t){const n=t.allowedElements,r=t.allowElement,i=t.components,o=t.disallowedElements,a=t.skipHtml,s=t.unwrapDisallowed,l=t.urlTransform||wh;for(const e of yh);return Md(e,c),nc(e,{Fragment:M.Fragment,components:i,ignoreInvalidStyle:!0,jsx:M.jsx,jsxs:M.jsxs,passKeys:!0,passNode:!0});function c(e,t,i){if("raw"===e.type&&i&&"number"==typeof t)return a?i.children.splice(t,1):i.children[t]={type:"text",value:e.value},t;if("element"===e.type){let t;for(t in hc)if(Object.hasOwn(hc,t)&&Object.hasOwn(e.properties,t)){const n=e.properties[t],r=hc[t];(null===r||r.includes(e.tagName))&&(e.properties[t]=l(String(n||""),t,e))}}if("element"===e.type){let a=n?!n.includes(e.tagName):!!o&&o.includes(e.tagName);if(!a&&r&&"number"==typeof t&&(a=!r(e,t,i)),a&&i&&"number"==typeof t)return s&&e.children?i.children.splice(t,1,...e.children):i.children.splice(t,1),t}}}(t.runSync(t.parse(n),n),e)}function wh(e){const t=e.indexOf(":"),n=e.indexOf("?"),r=e.indexOf("#"),i=e.indexOf("/");return-1===t||-1!==i&&t>i||-1!==n&&t>n||-1!==r&&t>r||bh.test(e.slice(0,t))?e:""}const kh=[];for(let e=0;e<256;++e)kh.push((e+256).toString(16).slice(1));let xh;const _h=new Uint8Array(16);var Sh={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};function Ch(e,t,n){if(Sh.randomUUID&&!e)return Sh.randomUUID();const r=(e=e||{}).random??e.rng?.()??function(){if(!xh){if("undefined"==typeof crypto||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");xh=crypto.getRandomValues.bind(crypto)}return xh(_h)}();if(r.length<16)throw new Error("Random bytes length must be >= 16");return r[6]=15&r[6]|64,r[8]=63&r[8]|128,function(e,t=0){return(kh[e[t+0]]+kh[e[t+1]]+kh[e[t+2]]+kh[e[t+3]]+"-"+kh[e[t+4]]+kh[e[t+5]]+"-"+kh[e[t+6]]+kh[e[t+7]]+"-"+kh[e[t+8]]+kh[e[t+9]]+"-"+kh[e[t+10]]+kh[e[t+11]]+kh[e[t+12]]+kh[e[t+13]]+kh[e[t+14]]+kh[e[t+15]]).toLowerCase()}(r)}const Eh="current";function zh(e){if(!e.isConnected)throw new Error("You cannot call this API before having established a connection to the host!")}class Ah{onDataUpdate;onBroadcast;onLivereload;pendingMessages=new Map;targetOrigin="*";constructor({onDataUpdate:e,onBroadcast:t,onLivereload:n}={}){this.onDataUpdate=e,this.onBroadcast=t,this.onLivereload=n,window.addEventListener("message",this.handleMessageWrapper)}destroy(){window.removeEventListener("message",this.handleMessageWrapper)}setOrigin(e){this.targetOrigin=e}sendUnidirectionalMessage(e){const t={message:e,meta:{messageId:Ch(),version:Eh}};window.parent.postMessage(t,this.targetOrigin)}async postMessage(e){return new Promise((t,n)=>{const r=Ch();let i;const o=function(e){return"connect"===e.type?5e3:"api"===e.type?3e4:"navigateTo"===e.type?5e3:null}(e);null!==o&&(i=setTimeout(()=>{n(new Error(`Waiting for response from foundry host for "${e.type}" message (ID: ${r}) timed out after ${o}ms`))},o)),this.pendingMessages.set(r,e=>{i&&clearTimeout(i),t(e)});const a={message:e,meta:{messageId:r,version:Eh}};window.parent.postMessage(a,this.targetOrigin)})}handleMessageWrapper=e=>this.handleMessage(e);handleMessage=e=>{if(!function(e){return!!e?.data?.meta?.messageId}(e))return;const{message:t}=e.data;if("data"===t.type)return void this.onDataUpdate?.(t);if("broadcast"===t.type)return void this.onBroadcast?.(t);if("livereload"===t.type)return void this.onLivereload?.(t);const{messageId:n}=e.data.meta,r=this.pendingMessages.get(n);r?(this.pendingMessages.delete(n),r(t.payload)):this.throwError("Received unexpected message")};throwError(e){throw new Error(e)}}function $h(e,t,n,r){var i,o=arguments.length,a=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,n,a):i(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a}"function"==typeof SuppressedError&&SuppressedError;const Th=new WeakMap,Ph=new WeakMap,Mh=new WeakMap,Lh=Symbol("anyProducer"),Dh=Promise.resolve(),Ih=Symbol("listenerAdded"),Nh=Symbol("listenerRemoved");let Oh=!1,Fh=!1;const Vh=e=>"string"==typeof e||"symbol"==typeof e||"number"==typeof e;function Rh(e){if(!Vh(e))throw new TypeError("`eventName` must be a string, symbol, or number")}function Bh(e){if("function"!=typeof e)throw new TypeError("listener must be a function")}function Uh(e,t){const n=Ph.get(e);if(n.has(t))return n.get(t)}function Hh(e,t){const n=Vh(t)?t:Lh,r=Mh.get(e);if(r.has(n))return r.get(n)}function jh(e,t){t=Array.isArray(t)?t:[t];let n=!1,r=()=>{},i=[];const o={enqueue(e){i.push(e),r()},finish(){n=!0,r()}};for(const n of t){let t=Hh(e,n);if(!t){t=new Set;Mh.get(e).set(n,t)}t.add(o)}return{async next(){return i?0===i.length?n?(i=void 0,this.next()):(await new Promise(e=>{r=e}),this.next()):{done:!1,value:await i.shift()}:{done:!0}},async return(n){i=void 0;for(const n of t){const t=Hh(e,n);if(t&&(t.delete(o),0===t.size)){Mh.get(e).delete(n)}}return r(),arguments.length>0?{done:!0,value:await n}:{done:!0}},[Symbol.asyncIterator](){return this}}}function qh(e){if(void 0===e)return Qh;if(!Array.isArray(e))throw new TypeError("`methodNames` must be an array of strings");for(const t of e)if(!Qh.includes(t)){if("string"!=typeof t)throw new TypeError("`methodNames` element must be a string");throw new Error(`${t} is not Emittery method`)}return e}const Wh=e=>e===Ih||e===Nh;function Kh(e,t,n){if(Wh(t))try{Oh=!0,e.emit(t,n)}finally{Oh=!1}}class Gh{static mixin(e,t){return t=qh(t),n=>{if("function"!=typeof n)throw new TypeError("`target` must be function");for(const e of t)if(void 0!==n.prototype[e])throw new Error(`The property \`${e}\` already exists on \`target\``);Object.defineProperty(n.prototype,e,{enumerable:!1,get:function(){return Object.defineProperty(this,e,{enumerable:!1,value:new Gh}),this[e]}});const r=t=>function(...n){return this[e][t](...n)};for(const e of t)Object.defineProperty(n.prototype,e,{enumerable:!1,value:r(e)});return n}}static get isDebugEnabled(){if("object"!=typeof globalThis.process?.env)return Fh;const{env:e}=globalThis.process??{env:{}};return"emittery"===e.DEBUG||"*"===e.DEBUG||Fh}static set isDebugEnabled(e){Fh=e}constructor(e={}){Th.set(this,new Set),Ph.set(this,new Map),Mh.set(this,new Map),Mh.get(this).set(Lh,new Set),this.debug=e.debug??{},void 0===this.debug.enabled&&(this.debug.enabled=!1),this.debug.logger||(this.debug.logger=(e,t,n,r)=>{try{r=JSON.stringify(r)}catch{r=`Object with the following keys failed to stringify: ${Object.keys(r).join(",")}`}"symbol"!=typeof n&&"number"!=typeof n||(n=n.toString());const i=new Date;i.getHours(),i.getMinutes(),i.getSeconds(),i.getMilliseconds()})}logIfDebugEnabled(e,t,n){(Gh.isDebugEnabled||this.debug.enabled)&&this.debug.logger(e,this.debug.name,t,n)}on(e,t,{signal:n}={}){Bh(t),e=Array.isArray(e)?e:[e];for(const n of e){Rh(n);let e=Uh(this,n);if(!e){e=new Set;Ph.get(this).set(n,e)}e.add(t),this.logIfDebugEnabled("subscribe",n,void 0),Wh(n)||Kh(this,Ih,{eventName:n,listener:t})}const r=()=>{this.off(e,t),n?.removeEventListener("abort",r)};return n?.addEventListener("abort",r,{once:!0}),n?.aborted&&r(),r}off(e,t){Bh(t),e=Array.isArray(e)?e:[e];for(const n of e){Rh(n);const e=Uh(this,n);if(e&&(e.delete(t),0===e.size)){Ph.get(this).delete(n)}this.logIfDebugEnabled("unsubscribe",n,void 0),Wh(n)||Kh(this,Nh,{eventName:n,listener:t})}}once(e,t){if(void 0!==t&&"function"!=typeof t)throw new TypeError("predicate must be a function");let n;const r=new Promise(r=>{n=this.on(e,e=>{t&&!t(e)||(n(),r(e))})});return r.off=n,r}events(e){e=Array.isArray(e)?e:[e];for(const t of e)Rh(t);return jh(this,e)}async emit(e,t){if(Rh(e),Wh(e)&&!Oh)throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");this.logIfDebugEnabled("emit",e,t),function(e,t,n){const r=Mh.get(e);if(r.has(t))for(const e of r.get(t))e.enqueue(n);if(r.has(Lh)){const e=Promise.all([t,n]);for(const t of r.get(Lh))t.enqueue(e)}}(this,e,t);const n=Uh(this,e)??new Set,r=Th.get(this),i=[...n],o=Wh(e)?[]:[...r];await Dh,await Promise.all([...i.map(async e=>{if(n.has(e))return e(t)}),...o.map(async n=>{if(r.has(n))return n(e,t)})])}async emitSerial(e,t){if(Rh(e),Wh(e)&&!Oh)throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");this.logIfDebugEnabled("emitSerial",e,t);const n=Uh(this,e)??new Set,r=Th.get(this),i=[...n],o=[...r];await Dh;for(const e of i)n.has(e)&&await e(t);for(const n of o)r.has(n)&&await n(e,t)}onAny(e,{signal:t}={}){Bh(e),this.logIfDebugEnabled("subscribeAny",void 0,void 0),Th.get(this).add(e),Kh(this,Ih,{listener:e});const n=()=>{this.offAny(e),t?.removeEventListener("abort",n)};return t?.addEventListener("abort",n,{once:!0}),t?.aborted&&n(),n}anyEvent(){return jh(this)}offAny(e){Bh(e),this.logIfDebugEnabled("unsubscribeAny",void 0,void 0),Kh(this,Nh,{listener:e}),Th.get(this).delete(e)}clearListeners(e){e=Array.isArray(e)?e:[e];for(const t of e)if(this.logIfDebugEnabled("clear",t,void 0),Vh(t)){const e=Uh(this,t);e&&e.clear();const n=Hh(this,t);if(n){for(const e of n)e.finish();n.clear()}}else{Th.get(this).clear();for(const[e,t]of Ph.get(this).entries())t.clear(),Ph.get(this).delete(e);for(const[e,t]of Mh.get(this).entries()){for(const e of t)e.finish();t.clear(),Mh.get(this).delete(e)}}}listenerCount(e){e=Array.isArray(e)?e:[e];let t=0;for(const n of e)if(Vh(n))t+=Th.get(this).size+(Uh(this,n)?.size??0)+(Hh(this,n)?.size??0)+(Hh(this)?.size??0);else{void 0!==n&&Rh(n),t+=Th.get(this).size;for(const e of Ph.get(this).values())t+=e.size;for(const e of Mh.get(this).values())t+=e.size}return t}bindMethods(e,t){if("object"!=typeof e||null===e)throw new TypeError("`target` must be an object");t=qh(t);for(const n of t){if(void 0!==e[n])throw new Error(`The property \`${n}\` already exists on \`target\``);Object.defineProperty(e,n,{enumerable:!1,value:this[n].bind(this)})}}}const Qh=Object.getOwnPropertyNames(Gh.prototype).filter(e=>"constructor"!==e);function Yh(e){let t,n,r;return t=e,(e,i,o)=>{if(null!=o.value)o.value=Zh(o.value,t,n,r);else{if(null==o.get)throw"Only put a Memoize() decorator on a method or get accessor.";o.get=Zh(o.get,t,n,r)}}}Object.defineProperty(Gh,"listenerAdded",{value:Ih,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(Gh,"listenerRemoved",{value:Nh,writable:!1,enumerable:!0,configurable:!1});const Xh=new Map;function Zh(e,t,n=0,r){const i=Symbol("__memoized_map__");return function(...o){let a;this.hasOwnProperty(i)||Object.defineProperty(this,i,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let s=this[i];if(Array.isArray(r))for(const e of r)Xh.has(e)?Xh.get(e).push(s):Xh.set(e,[s]);if(t||o.length>0||n>0){let r;r=!0===t?o.map(e=>e.toString()).join("!"):t?t.apply(this,o):o[0];const i=`${r}__timestamp`;let l=!1;if(n>0)if(s.has(i)){let e=s.get(i);l=Date.now()-e>n}else l=!0;s.has(r)&&!l?a=s.get(r):(a=e.apply(this,o),s.set(r,a),n>0&&s.set(i,Date.now()))}else{const t=this;s.has(t)?a=s.get(t):(a=e.apply(this,o),s.set(t,a))}return a}}class Jh{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async deleteEntitiesSuppressedDevicesV1(e={}){const t={type:"api",api:"alerts",method:"deleteEntitiesSuppressedDevicesV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesAlertsV1(e={}){const t={type:"api",api:"alerts",method:"getQueriesAlertsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesAlertsV2(e={}){const t={type:"api",api:"alerts",method:"getQueriesAlertsV2",payload:{params:e}};return this.bridge.postMessage(t)}async patchCombinedAlertsV2(e,t={}){const n={type:"api",api:"alerts",method:"patchCombinedAlertsV2",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async patchCombinedAlertsV3(e,t={}){const n={type:"api",api:"alerts",method:"patchCombinedAlertsV3",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async patchEntitiesAlertsV2(e,t={}){const n={type:"api",api:"alerts",method:"patchEntitiesAlertsV2",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async patchEntitiesAlertsV3(e,t={}){const n={type:"api",api:"alerts",method:"patchEntitiesAlertsV3",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async patchEntitiesSuppressedDevicesV1(e,t={}){const n={type:"api",api:"alerts",method:"patchEntitiesSuppressedDevicesV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postAggregatesAlertsV1(e,t={}){const n={type:"api",api:"alerts",method:"postAggregatesAlertsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postAggregatesAlertsV2(e,t={}){const n={type:"api",api:"alerts",method:"postAggregatesAlertsV2",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesAlertsV1(e,t={}){const n={type:"api",api:"alerts",method:"postEntitiesAlertsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesAlertsV2(e,t={}){const n={type:"api",api:"alerts",method:"postEntitiesAlertsV2",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesSuppressedDevicesV1(e,t={}){const n={type:"api",api:"alerts",method:"postEntitiesSuppressedDevicesV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}}class ep{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async getAggregatesResourcesCountByManagedByV1(e={}){const t={type:"api",api:"cloudSecurityAssets",method:"getAggregatesResourcesCountByManagedByV1",payload:{params:e}};return this.bridge.postMessage(t)}}class tp{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async getCloudSecurityRegistrationAwsCombinedAccountsV1(e={}){const t={type:"api",api:"cloudregistration",method:"getCloudSecurityRegistrationAwsCombinedAccountsV1",payload:{params:e}};return this.bridge.postMessage(t)}}class np{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async getAggregatesClustersCountV1(e={}){const t={type:"api",api:"containerSecurity",method:"getAggregatesClustersCountV1",payload:{params:e}};return this.bridge.postMessage(t)}async getAggregatesContainersCountV1(e={}){const t={type:"api",api:"containerSecurity",method:"getAggregatesContainersCountV1",payload:{params:e}};return this.bridge.postMessage(t)}async getAggregatesContainersGroupByManagedV1(e={}){const t={type:"api",api:"containerSecurity",method:"getAggregatesContainersGroupByManagedV1",payload:{params:e}};return this.bridge.postMessage(t)}async getAggregatesContainersSensorCoverageV1(e={}){const t={type:"api",api:"containerSecurity",method:"getAggregatesContainersSensorCoverageV1",payload:{params:e}};return this.bridge.postMessage(t)}async getAggregatesImagesCountByStateV1(e={}){const t={type:"api",api:"containerSecurity",method:"getAggregatesImagesCountByStateV1",payload:{params:e}};return this.bridge.postMessage(t)}async getAggregatesNodesCountV1(e={}){const t={type:"api",api:"containerSecurity",method:"getAggregatesNodesCountV1",payload:{params:e}};return this.bridge.postMessage(t)}async getAggregatesPodsCountV1(e={}){const t={type:"api",api:"containerSecurity",method:"getAggregatesPodsCountV1",payload:{params:e}};return this.bridge.postMessage(t)}async getAggregatesUnidentifiedContainersCountV1(e={}){const t={type:"api",api:"containerSecurity",method:"getAggregatesUnidentifiedContainersCountV1",payload:{params:e}};return this.bridge.postMessage(t)}async getCombinedClustersV1(e={}){const t={type:"api",api:"containerSecurity",method:"getCombinedClustersV1",payload:{params:e}};return this.bridge.postMessage(t)}}class rp{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async getCspmregistrationCloudConnectCspmAzureCombinedAccountsV1(e={}){const t={type:"api",api:"cspmRegistration",method:"getCspmregistrationCloudConnectCspmAzureCombinedAccountsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getCspmregistrationCloudConnectCspmGcpCombinedAccountsV1(e={}){const t={type:"api",api:"cspmRegistration",method:"getCspmregistrationCloudConnectCspmGcpCombinedAccountsV1",payload:{params:e}};return this.bridge.postMessage(t)}}class ip{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async deleteV1CollectionsCollectionNameObjectsObjectKey(e={}){const t={type:"api",api:"customobjects",method:"deleteV1CollectionsCollectionNameObjectsObjectKey",payload:{params:e}};return this.bridge.postMessage(t)}async getV1Collections(e={}){const t={type:"api",api:"customobjects",method:"getV1Collections",payload:{params:e}};return this.bridge.postMessage(t)}async getV1CollectionsCollectionNameObjects(e={}){const t={type:"api",api:"customobjects",method:"getV1CollectionsCollectionNameObjects",payload:{params:e}};return this.bridge.postMessage(t)}async getV1CollectionsCollectionNameObjectsObjectKey(e={}){const t={type:"api",api:"customobjects",method:"getV1CollectionsCollectionNameObjectsObjectKey",payload:{params:e}};return this.bridge.postMessage(t)}async getV1CollectionsCollectionNameObjectsObjectKeyMetadata(e={}){const t={type:"api",api:"customobjects",method:"getV1CollectionsCollectionNameObjectsObjectKeyMetadata",payload:{params:e}};return this.bridge.postMessage(t)}async postV1CollectionsCollectionNameObjects(e,t={}){const n={type:"api",api:"customobjects",method:"postV1CollectionsCollectionNameObjects",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async putV1CollectionsCollectionNameObjectsObjectKey(e,t={}){const n={type:"api",api:"customobjects",method:"putV1CollectionsCollectionNameObjectsObjectKey",payload:{body:e,params:t}};return this.bridge.postMessage(n)}}class op{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async getEntitiesSuppressedDevicesV1(e={}){const t={type:"api",api:"detects",method:"getEntitiesSuppressedDevicesV1",payload:{params:e}};return this.bridge.postMessage(t)}async patchEntitiesDetectsV2(e,t={}){const n={type:"api",api:"detects",method:"patchEntitiesDetectsV2",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async patchQueriesDetectsV1(e,t={}){const n={type:"api",api:"detects",method:"patchQueriesDetectsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async patchQueriesDetectsV2(e,t={}){const n={type:"api",api:"detects",method:"patchQueriesDetectsV2",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postAggregatesDetectsGetV1(e,t={}){const n={type:"api",api:"detects",method:"postAggregatesDetectsGetV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesSummariesGetV1(e,t={}){const n={type:"api",api:"detects",method:"postEntitiesSummariesGetV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesSuppressedDevicesV1(e,t={}){const n={type:"api",api:"detects",method:"postEntitiesSuppressedDevicesV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}}class ap{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async deleteEntitiesGroupsV1(e){const t={type:"api",api:"devices",method:"deleteEntitiesGroupsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getAggregatesBucketsV1(e){const t={type:"api",api:"devices",method:"getAggregatesBucketsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getAggregatesFgaTagPrefixCountsV1(e){const t={type:"api",api:"devices",method:"getAggregatesFgaTagPrefixCountsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getAggregatesTagPrefixCountsV1(e){const t={type:"api",api:"devices",method:"getAggregatesTagPrefixCountsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesDevicesV1(e){const t={type:"api",api:"devices",method:"getEntitiesDevicesV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesFgaGroupsV1(e){const t={type:"api",api:"devices",method:"getEntitiesFgaGroupsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesGroupsV1(e){const t={type:"api",api:"devices",method:"getEntitiesGroupsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesAvailableGroupsV1(e={}){const t={type:"api",api:"devices",method:"getQueriesAvailableGroupsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesDevicesHiddenV2(e={}){const t={type:"api",api:"devices",method:"getQueriesDevicesHiddenV2",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesDevicesV1(e={}){const t={type:"api",api:"devices",method:"getQueriesDevicesV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesDevicesV2(e={}){const t={type:"api",api:"devices",method:"getQueriesDevicesV2",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesFgaGroupsV1(e={}){const t={type:"api",api:"devices",method:"getQueriesFgaGroupsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesGroupsV1(e={}){const t={type:"api",api:"devices",method:"getQueriesGroupsV1",payload:{params:e}};return this.bridge.postMessage(t)}async patchEntitiesDevicesTagsV2(e,t={}){const n={type:"api",api:"devices",method:"patchEntitiesDevicesTagsV2",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async patchEntitiesDevicesV1(e,t){const n={type:"api",api:"devices",method:"patchEntitiesDevicesV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async patchEntitiesGroupsV1(e,t={}){const n={type:"api",api:"devices",method:"patchEntitiesGroupsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postAggregatesDevicesGetV1(e,t={}){const n={type:"api",api:"devices",method:"postAggregatesDevicesGetV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postAggregatesFgaHostsGetV1(e,t={}){const n={type:"api",api:"devices",method:"postAggregatesFgaHostsGetV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postCombinedDevicesLoginHistoryV1(e,t={}){const n={type:"api",api:"devices",method:"postCombinedDevicesLoginHistoryV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postCombinedFgaHostsLoginHistoryV1(e,t={}){const n={type:"api",api:"devices",method:"postCombinedFgaHostsLoginHistoryV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesDevicesActionsV4(e,t={}){const n={type:"api",api:"devices",method:"postEntitiesDevicesActionsV4",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesDevicesHiddenActionsV4(e,t={}){const n={type:"api",api:"devices",method:"postEntitiesDevicesHiddenActionsV4",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesDevicesReportsV1(e,t={}){const n={type:"api",api:"devices",method:"postEntitiesDevicesReportsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesDevicesV1(e,t){const n={type:"api",api:"devices",method:"postEntitiesDevicesV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesDevicesV2(e,t={}){const n={type:"api",api:"devices",method:"postEntitiesDevicesV2",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesFgaHostsReportsV1(e,t={}){const n={type:"api",api:"devices",method:"postEntitiesFgaHostsReportsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesFgaHostsV1(e,t={}){const n={type:"api",api:"devices",method:"postEntitiesFgaHostsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesGroupActionsV1(e,t){const n={type:"api",api:"devices",method:"postEntitiesGroupActionsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesGroupsV1(e,t={}){const n={type:"api",api:"devices",method:"postEntitiesGroupsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}}class sp{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async getEntitiesExecutionV1(e){const t={type:"api",api:"faasGateway",method:"getEntitiesExecutionV1",payload:{params:e}};return this.bridge.postMessage(t)}async postEntitiesExecutionV1(e,t={}){const n={type:"api",api:"faasGateway",method:"postEntitiesExecutionV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}}class lp{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async deleteEntitiesNetworkLocationsV1(e){const t={type:"api",api:"fwmgr",method:"deleteEntitiesNetworkLocationsV1",payload:{params:e}};return this.bridge.postMessage(t)}async deleteEntitiesPoliciesV1(e){const t={type:"api",api:"fwmgr",method:"deleteEntitiesPoliciesV1",payload:{params:e}};return this.bridge.postMessage(t)}async deleteEntitiesRuleGroupsV1(e){const t={type:"api",api:"fwmgr",method:"deleteEntitiesRuleGroupsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesEventsV1(e){const t={type:"api",api:"fwmgr",method:"getEntitiesEventsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesFirewallFieldsV1(e){const t={type:"api",api:"fwmgr",method:"getEntitiesFirewallFieldsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesNetworkLocationsDetailsV1(e){const t={type:"api",api:"fwmgr",method:"getEntitiesNetworkLocationsDetailsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesNetworkLocationsV1(e){const t={type:"api",api:"fwmgr",method:"getEntitiesNetworkLocationsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesPlatformsV1(e){const t={type:"api",api:"fwmgr",method:"getEntitiesPlatformsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesPoliciesV1(e){const t={type:"api",api:"fwmgr",method:"getEntitiesPoliciesV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesRuleGroupsV1(e){const t={type:"api",api:"fwmgr",method:"getEntitiesRuleGroupsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesRulesV1(e){const t={type:"api",api:"fwmgr",method:"getEntitiesRulesV1",payload:{params:e}};return this.bridge.postMessage(t)}async getLibraryEntitiesRuleGroupsV1(e){const t={type:"api",api:"fwmgr",method:"getLibraryEntitiesRuleGroupsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getLibraryQueriesRuleGroupsV1(e={}){const t={type:"api",api:"fwmgr",method:"getLibraryQueriesRuleGroupsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesEventsV1(e={}){const t={type:"api",api:"fwmgr",method:"getQueriesEventsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesFirewallFieldsV1(e={}){const t={type:"api",api:"fwmgr",method:"getQueriesFirewallFieldsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesNetworkLocationsV1(e={}){const t={type:"api",api:"fwmgr",method:"getQueriesNetworkLocationsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesPlatformsV1(e={}){const t={type:"api",api:"fwmgr",method:"getQueriesPlatformsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesPolicyRulesV1(e={}){const t={type:"api",api:"fwmgr",method:"getQueriesPolicyRulesV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesRuleGroupsV1(e={}){const t={type:"api",api:"fwmgr",method:"getQueriesRuleGroupsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesRulesV1(e={}){const t={type:"api",api:"fwmgr",method:"getQueriesRulesV1",payload:{params:e}};return this.bridge.postMessage(t)}async patchEntitiesNetworkLocationsV1(e,t={}){const n={type:"api",api:"fwmgr",method:"patchEntitiesNetworkLocationsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async patchEntitiesRuleGroupsV1(e,t={}){const n={type:"api",api:"fwmgr",method:"patchEntitiesRuleGroupsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postAggregatesEventsGetV1(e,t={}){const n={type:"api",api:"fwmgr",method:"postAggregatesEventsGetV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postAggregatesPolicyRulesGetV1(e,t={}){const n={type:"api",api:"fwmgr",method:"postAggregatesPolicyRulesGetV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postAggregatesRuleGroupsGetV1(e,t={}){const n={type:"api",api:"fwmgr",method:"postAggregatesRuleGroupsGetV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postAggregatesRulesGetV1(e,t={}){const n={type:"api",api:"fwmgr",method:"postAggregatesRulesGetV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesNetworkLocationsMetadataV1(e,t={}){const n={type:"api",api:"fwmgr",method:"postEntitiesNetworkLocationsMetadataV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesNetworkLocationsPrecedenceV1(e,t={}){const n={type:"api",api:"fwmgr",method:"postEntitiesNetworkLocationsPrecedenceV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesNetworkLocationsV1(e,t={}){const n={type:"api",api:"fwmgr",method:"postEntitiesNetworkLocationsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesOntologyV1(e,t={}){const n={type:"api",api:"fwmgr",method:"postEntitiesOntologyV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesRuleGroupsV1(e,t={}){const n={type:"api",api:"fwmgr",method:"postEntitiesRuleGroupsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesRulesValidateFilepathV1(e,t={}){const n={type:"api",api:"fwmgr",method:"postEntitiesRulesValidateFilepathV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async putEntitiesNetworkLocationsV1(e,t={}){const n={type:"api",api:"fwmgr",method:"putEntitiesNetworkLocationsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async putEntitiesPoliciesV2(e,t={}){const n={type:"api",api:"fwmgr",method:"putEntitiesPoliciesV2",payload:{body:e,params:t}};return this.bridge.postMessage(n)}}class cp{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async getCombinedCrowdscoresV1(e={}){const t={type:"api",api:"incidents",method:"getCombinedCrowdscoresV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesBehaviorsV1(e={}){const t={type:"api",api:"incidents",method:"getQueriesBehaviorsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesIncidentsV1(e={}){const t={type:"api",api:"incidents",method:"getQueriesIncidentsV1",payload:{params:e}};return this.bridge.postMessage(t)}async postAggregatesBehaviorsGetV1(e,t={}){const n={type:"api",api:"incidents",method:"postAggregatesBehaviorsGetV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postAggregatesIncidentsGetV1(e,t={}){const n={type:"api",api:"incidents",method:"postAggregatesIncidentsGetV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesBehaviorsGetV1(e,t={}){const n={type:"api",api:"incidents",method:"postEntitiesBehaviorsGetV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesIncidentActionsV1(e,t={}){const n={type:"api",api:"incidents",method:"postEntitiesIncidentActionsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesIncidentsGetV1(e,t={}){const n={type:"api",api:"incidents",method:"postEntitiesIncidentsGetV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}}class up{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async getEntitiesSavedSearchesExecuteV1(e){const t={type:"api",api:"loggingapi",method:"getEntitiesSavedSearchesExecuteV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesSavedSearchesV1(e){const t={type:"api",api:"loggingapi",method:"getEntitiesSavedSearchesV1",payload:{params:e}};return this.bridge.postMessage(t)}async postEntitiesSavedSearchesExecuteV1(e,t={}){const n={type:"api",api:"loggingapi",method:"postEntitiesSavedSearchesExecuteV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}}class dp{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async getIntelMitreEntitiesMatrixV1(e={}){const t={type:"api",api:"mitre",method:"getIntelMitreEntitiesMatrixV1",payload:{params:e}};return this.bridge.postMessage(t)}}class hp{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async getEntitiesConfigsV1(e={}){const t={type:"api",api:"plugins",method:"getEntitiesConfigsV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesDefinitionsV1(e){const t={type:"api",api:"plugins",method:"getEntitiesDefinitionsV1",payload:{params:e}};return this.bridge.postMessage(t)}async postEntitiesExecuteDraftV1(e,t={}){const n={type:"api",api:"plugins",method:"postEntitiesExecuteDraftV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesExecuteV1(e,t={}){const n={type:"api",api:"plugins",method:"postEntitiesExecuteV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}}class pp{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async getAggregatesRegistriesCountByStateV1(e={}){const t={type:"api",api:"registryAssessment",method:"getAggregatesRegistriesCountByStateV1",payload:{params:e}};return this.bridge.postMessage(t)}}class fp{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async deleteEntitiesPutFilesV1(e){const t={type:"api",api:"remoteResponse",method:"deleteEntitiesPutFilesV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesAppCommandV1(e){const t={type:"api",api:"remoteResponse",method:"getEntitiesAppCommandV1",payload:{params:e}};return this.bridge.postMessage(t)}async getEntitiesPutFilesV2(e){const t={type:"api",api:"remoteResponse",method:"getEntitiesPutFilesV2",payload:{params:e}};return this.bridge.postMessage(t)}async getQueriesPutFilesV1(e={}){const t={type:"api",api:"remoteResponse",method:"getQueriesPutFilesV1",payload:{params:e}};return this.bridge.postMessage(t)}async postEntitiesAppCommandV1(e,t={}){const n={type:"api",api:"remoteResponse",method:"postEntitiesAppCommandV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesAppSessionsV1(e,t={}){const n={type:"api",api:"remoteResponse",method:"postEntitiesAppSessionsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}}class mp{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async getQueriesUsersV1(e={}){const t={type:"api",api:"userManagement",method:"getQueriesUsersV1",payload:{params:e}};return this.bridge.postMessage(t)}async postEntitiesUsersGetV1(e,t={}){const n={type:"api",api:"userManagement",method:"postEntitiesUsersGetV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}}class gp{bridge;constructor(e){this.bridge=e}getBridge(){return this.bridge}async getEntitiesExecutionResultsV1(e){const t={type:"api",api:"workflows",method:"getEntitiesExecutionResultsV1",payload:{params:e}};return this.bridge.postMessage(t)}async postEntitiesExecuteV1(e,t={}){const n={type:"api",api:"workflows",method:"postEntitiesExecuteV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}async postEntitiesExecutionActionsV1(e,t){const n={type:"api",api:"workflows",method:"postEntitiesExecutionActionsV1",payload:{body:e,params:t}};return this.bridge.postMessage(n)}}class bp{api;constructor(e){this.api=e}get alerts(){return zh(this.api),new Jh(this.api.bridge)}get detects(){return zh(this.api),new op(this.api.bridge)}get devices(){return zh(this.api),new ap(this.api.bridge)}get fwmgr(){return zh(this.api),new lp(this.api.bridge)}get incidents(){return zh(this.api),new cp(this.api.bridge)}get mitre(){return zh(this.api),new dp(this.api.bridge)}get plugins(){return zh(this.api),new hp(this.api.bridge)}get remoteResponse(){return zh(this.api),new fp(this.api.bridge)}get userManagement(){return zh(this.api),new mp(this.api.bridge)}get workflows(){return zh(this.api),new gp(this.api.bridge)}get cloudSecurityAssets(){return zh(this.api),new ep(this.api.bridge)}get cloudregistration(){return zh(this.api),new tp(this.api.bridge)}get containerSecurity(){return zh(this.api),new np(this.api.bridge)}get cspmRegistration(){return zh(this.api),new rp(this.api.bridge)}get customobjects(){return zh(this.api),new ip(this.api.bridge)}get faasGateway(){return zh(this.api),new sp(this.api.bridge)}get loggingapi(){return zh(this.api),new up(this.api.bridge)}get registryAssessment(){return zh(this.api),new pp(this.api.bridge)}}$h([Yh()],bp.prototype,"alerts",null),$h([Yh()],bp.prototype,"detects",null),$h([Yh()],bp.prototype,"devices",null),$h([Yh()],bp.prototype,"fwmgr",null),$h([Yh()],bp.prototype,"incidents",null),$h([Yh()],bp.prototype,"mitre",null),$h([Yh()],bp.prototype,"plugins",null),$h([Yh()],bp.prototype,"remoteResponse",null),$h([Yh()],bp.prototype,"userManagement",null),$h([Yh()],bp.prototype,"workflows",null),$h([Yh()],bp.prototype,"cloudSecurityAssets",null),$h([Yh()],bp.prototype,"cloudregistration",null),$h([Yh()],bp.prototype,"containerSecurity",null),$h([Yh()],bp.prototype,"cspmRegistration",null),$h([Yh()],bp.prototype,"customobjects",null),$h([Yh()],bp.prototype,"faasGateway",null),$h([Yh()],bp.prototype,"loggingapi",null),$h([Yh()],bp.prototype,"registryAssessment",null);class yp{falcon;definition;constructor(e,t){this.falcon=e,this.definition=t}async execute({request:e}={}){return this.falcon.api.plugins.postEntitiesExecuteV1({resources:[{definition_id:this.definition.definitionId,operation_id:this.definition.operationId,request:e}]})}}class vp{falcon;definition;static GET="GET";static POST="POST";static PATCH="PATCH";static PUT="PUT";static DELETE="DELETE";pollTimeout=500;intervalId;constructor(e,t){this.falcon=e,this.definition=t}async execute({path:e,method:t,body:n,params:r}){const i="id"in this.definition?{function_id:this.definition.id,function_version:this.definition.version}:{function_name:this.definition.name,function_version:this.definition.version},o=await this.falcon.api.faasGateway.postEntitiesExecutionV1({...i,payload:{path:e,method:t,body:n,params:r}});return new Promise((e,t)=>{const n=o?.resources?.[0];n?.execution_id?this.pollForResult({resolve:e,reject:t,executionId:n?.execution_id}):t(o?.errors)})}async getExecutionResult(e){const t=await this.falcon.api.faasGateway.getEntitiesExecutionV1({id:e}),n=t?.resources?.[0];return n?.payload}pollForResult({resolve:e,reject:t,executionId:n}){let r=2;this.intervalId=window.setInterval(async()=>{try{const t=await this.getExecutionResult(n);t&&(window.clearInterval(this.intervalId),e(t))}catch(e){r<=0&&(window.clearInterval(this.intervalId),t(e)),r--}},this.pollTimeout)}path(e){const t=new URL(e,"http://localhost"),n=t.pathname,r=[...t.searchParams.entries()].reduce((e,[t,n])=>({...e,[t]:[n]}),{});return{path:n,queryParams:r,get:async(e={})=>this.get({path:n,params:{query:e?.query??r??{},header:e?.header??{}}}),post:async(e,t={})=>this.post({path:n,params:{query:t?.query??r??{},header:t?.header??{}},body:e}),patch:async(e,t={})=>this.patch({path:n,params:{query:t?.query??r??{},header:t?.header??{}},body:e}),put:async(e,t={})=>this.put({path:n,params:{query:t?.query??r??{},header:t?.header??{}},body:e}),delete:async(e,t={})=>this.delete({path:n,params:{query:t?.query??r??{},header:t?.header??{}},body:e})}}async get({path:e,params:t}){return this.execute({path:e,method:vp.GET,params:t})}async post({path:e,params:t,body:n}){return this.execute({path:e,method:vp.POST,body:n,params:t})}async patch({path:e,params:t,body:n}){return this.execute({path:e,method:vp.PATCH,body:n,params:t})}async put({path:e,params:t,body:n}){return this.execute({path:e,method:vp.PUT,body:n,params:t})}async delete({path:e,params:t,body:n}){return this.execute({path:e,method:vp.DELETE,body:n,params:t})}destroy(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0)}}class wp{falcon;definition;constructor(e,t){this.falcon=e,this.definition=t}async write(e,t){return this.falcon.bridge.postMessage({type:"collection",payload:{type:"write",key:e,collection:this.definition.collection,data:t}})}async read(e){return this.falcon.bridge.postMessage({type:"collection",payload:{type:"read",key:e,collection:this.definition.collection}})}async delete(e){return this.falcon.bridge.postMessage({type:"collection",payload:{type:"delete",key:e,collection:this.definition.collection}})}async search({filter:e,offset:t,sort:n,limit:r}){return this.falcon.bridge.postMessage({type:"collection",payload:{type:"search",filter:e,limit:r,offset:t,sort:n,collection:this.definition.collection}})}async list(e){return this.falcon.bridge.postMessage({type:"collection",payload:{type:"list",collection:this.definition.collection,start:e?.start,end:e?.end,limit:e?.limit}})}}class kp{falcon;constructor(e){this.falcon=e}async write(e,t){return this.falcon.bridge.postMessage({type:"loggingapi",payload:{type:"ingest",data:e,tag:t?.tag,tagSource:t?.tagSource,testData:t?.testData}})}async query(e){return this.falcon.bridge.postMessage({type:"loggingapi",payload:{type:"dynamic-execute",data:e}})}async savedQuery(e){return this.falcon.bridge.postMessage({type:"loggingapi",payload:{type:"saved-query-execute",data:e}})}}const xp=["_self","_blank"];class _p{falcon;constructor(e){this.falcon=e}async navigateTo({path:e,type:t,target:n,metaKey:r,ctrlKey:i,shiftKey:o}){await this.falcon.bridge.postMessage({type:"navigateTo",payload:{path:e,type:t??"falcon",target:n??"_self",metaKey:r??!1,ctrlKey:i??!1,shiftKey:o??!1}})}async onClick(e,t="_self",n="falcon"){if(!(e instanceof Event))throw Error('"event" property should be subclass of Event');if(!("preventDefault"in e))return;if(!(e.target instanceof HTMLAnchorElement))return;e.preventDefault();const r=e.target.getAttribute("href");t=e.target.getAttribute("target")??t;const i=e.target.dataset?.type??n;if(null===t||!xp.includes(t))throw new Error("Target should be _self or _blank");const o=t;if(null==r)throw new Error("Navigation path is missing. Make sure you have added navigation.onClick on the `a` tag and `href` is present.");const{metaKey:a,ctrlKey:s,shiftKey:l}=e;await this.navigateTo({path:r,type:i,target:o,metaKey:a,ctrlKey:s,shiftKey:l})}}class Sp{bridge;observer;constructor(e){this.bridge=e,this.observer=new ResizeObserver(e=>this.handleResizeEvent(e)),this.observer.observe(document.body)}handleResizeEvent(e){const{height:t}=e[0].contentRect;this.bridge.sendUnidirectionalMessage({type:"resize",payload:{height:t}})}destroy(){this.observer.disconnect()}}class Cp{bridge;constructor(e){this.bridge=e}async openModal(e,t,n={}){const r=await this.bridge.postMessage({type:"openModal",payload:{extension:e,title:t,options:n}});if(r instanceof Error)throw r;return r}closeModal(e){this.bridge.sendUnidirectionalMessage({type:"closeModal",payload:e})}async uploadFile(e,t){return this.bridge.postMessage({type:"fileUpload",fileUploadType:e,payload:t})}}class Ep{isConnected=!1;events=new Gh;data;bridge=new Ah({onDataUpdate:e=>this.handleDataUpdate(e),onBroadcast:e=>this.handleBroadcastMessage(e),onLivereload:()=>this.handleLivereloadMessage()});api=new bp(this);ui=new Cp(this.bridge);resizeTracker;cloudFunctions=[];apiIntegrations=[];collections=[];async connect(){const e=await this.bridge.postMessage({type:"connect"});if(void 0!==e){const{data:t,origin:n}=e;this.bridge.setOrigin(n),this.data=t,this.updateTheme(t?.theme),this.isConnected=!0}return this.resizeTracker=new Sp(this.bridge),e}get appId(){return this.data?.app.id}sendBroadcast(e){this.bridge.sendUnidirectionalMessage({type:"broadcast",payload:e})}handleDataUpdate(e){this.data=e.payload,this.updateTheme(this.data.theme),this.events.emit("data",this.data)}handleBroadcastMessage(e){this.events.emit("broadcast",e.payload)}handleLivereloadMessage(){document.location.reload()}updateTheme(e){if(!e)return;const t="theme-dark"===e?"theme-light":"theme-dark";document.documentElement.classList.add(e),document.documentElement.classList.remove(t)}cloudFunction(e){zh(this);const t=new vp(this,e);return this.cloudFunctions.push(t),t}apiIntegration({definitionId:e,operationId:t}){if(zh(this),!this.data)throw Error("Data from console is missing");const n=new yp(this,{operationId:t,definitionId:e});return this.apiIntegrations.push(n),n}collection({collection:e}){zh(this);const t=new wp(this,{collection:e});return this.collections.push(t),t}get navigation(){return zh(this),new _p(this)}get logscale(){return zh(this),new kp(this)}destroy(){this.cloudFunctions.forEach(e=>e.destroy()),this.resizeTracker?.destroy(),this.bridge.destroy()}}$h([Yh()],Ep.prototype,"navigation",null),$h([Yh()],Ep.prototype,"logscale",null),Vi.define("sl-tree-item"),Ti.define("sl-tooltip"),Hi.define("sl-tree"),ht.define("sl-visually-hidden"),_n.define("sl-tab-panel"),En.define("sl-tag"),Bn.define("sl-textarea"),un.define("sl-tab"),vn.define("sl-tab-group"),oo.define("sl-skeleton"),ho.define("sl-split-panel"),so.define("sl-switch"),fn.define("sl-resize-observer"),to.define("sl-select"),Ni.define("sl-spinner"),To.define("sl-range"),Yi.define("sl-rating"),Zi.define("sl-relative-time"),Eo.define("sl-radio-button"),Io.define("sl-radio-group"),yo.define("sl-progress-ring"),_o.define("sl-qr-code"),Ao.define("sl-radio"),ua.define("sl-option"),yi.define("sl-popup"),go.define("sl-progress-bar"),la.define("sl-menu-label"),fo.define("sl-mutation-observer"),qo.define("sl-input"),Uo.define("sl-menu"),oa.define("sl-menu-item"),Oo.define("sl-image-comparer"),Ro.define("sl-include"),It.define("sl-icon"),Qt.define("sl-icon-button"),Pa.define("sl-format-bytes"),Ta.define("sl-format-date"),Ma.define("sl-format-number"),pa.define("sl-divider"),Ea.define("sl-drawer"),Aa.define("sl-dropdown"),hs.define("sl-copy-button"),fs.define("sl-details"),bs.define("sl-dialog"),Di.define("sl-checkbox"),us.define("sl-color-picker"),Is.define("sl-card"),Na.define("sl-carousel"),Fa.define("sl-carousel-item"),Ts.define("sl-breadcrumb-item"),Lo.define("sl-button-group"),Cs.define("sl-avatar"),zs.define("sl-breadcrumb"),Ba.define("sl-button"),vs.define("sl-animated-image"),Ms.define("sl-badge"),Vs.define("sl-alert"),_s.define("sl-animation");export{Ep as F,vh as M,u as R,Wo as a,As as b,Va as c,ms as d,Un as e,fa as f,Ls as g,Ns as h,La as i,M as j,ro as k,wn as l,dn as m,Sn as n,da as o,$a as p,Ho as q,c as r,no as s,Pi as t,aa as u,wt as v,z as w};