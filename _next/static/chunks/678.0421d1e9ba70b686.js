"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[678],{9678:function(a,b,c){c.a(a,async function(a,d){try{c.r(b),c.d(b,{"__wbindgen_string_new":function(){return e.h},wasm_interpret:function(){return e._}});var e=c(8174),f=a([e]);e=(f.then?(await f)():f)[0],d()}catch(g){d(g)}})},8174:function(a,b,c){c.a(a,async function(d,e){try{c.d(b,{"_":function(){return r},h:function(){return s}});var f=c(8662);a=c.hmd(a);var g=d([f]);f=(g.then?(await g)():g)[0];let h="undefined"==typeof TextDecoder?(0,a.require)("util").TextDecoder:TextDecoder,i=new h("utf-8",{ignoreBOM:!0,fatal:!0});i.decode();let j;function k(){return 0===j.byteLength&&(j=new Uint8Array(f.memory.buffer)),j}let l=Array(32).fill(void 0);l.push(void 0,null,!0,!1);let m=l.length,n=0,o="undefined"==typeof TextEncoder?(0,a.require)("util").TextEncoder:TextEncoder,p=new o("utf-8"),q="function"==typeof p.encodeInto?function(a,b){return p.encodeInto(a,b)}:function(a,b){let c=p.encode(a);return b.set(c),{read:a.length,written:c.length}};function r(a){let b=function(a,b,c){if(void 0===c){let d=p.encode(a),e=b(d.length);return k().subarray(e,e+d.length).set(d),n=d.length,e}let f=a.length,g=b(f),h=k(),i=0;for(;i<f;i++){let j=a.charCodeAt(i);if(j>127)break;h[g+i]=j}if(i!==f){0!==i&&(a=a.slice(i)),g=c(g,f,f=i+3*a.length);let l=k().subarray(g+i,g+f),m=q(a,l);i+=m.written}return n=i,g}(a,f.__wbindgen_malloc,f.__wbindgen_realloc),c=n,d=f.wasm_interpret(b,c);return function(a){var b,c;let d=l[b=a];return(c=a)<36||(l[c]=m,m=c),d}(d)}function s(a,b){var c,d;let e=(c=a,d=b,i.decode(k().subarray(c,c+d)));return function(a){m===l.length&&l.push(l.length+1);let b=m;return m=l[b],l[b]=a,b}(e)}j=new Uint8Array(f.memory.buffer),e()}catch(t){e(t)}})},8662:function(a,b,c){c.a(a,async function(d,e){try{var f=c(8174),g=d([f]),[f]=g.then?(await g)():g;await c.v(b,a.id,"1216ebe51efe12ba",{"./nakjs_bg.js":{"__wbindgen_string_new":f.h}}),e()}catch(h){e(h)}},1)}}])