sinaDefine(['../../../sina/SinaObject'],function(S){"use strict";var g=function(){var t=[];$.each(document.styleSheets,function(i,c){if(c.href){var f=c.href.toString();var r=/themes\/(.+)\/library.css/;var m=r.exec(f);if(m!==null){t.push(m[1]);return false;}}return true;});return t[0];};var a=function(u){var r=u;var t=g();if(!t){return r;}t="sap-theme="+t+"&";if(u.indexOf("sap-theme=")===-1){if(u.indexOf("?")!==-1){r=u.replace("?","?"+t);}}return r;};return S.derive({_init:function(){this.suvMimeType="application/vnd.sap.universal-viewer+suv";this.suvViewerBasePath="/sap/bc/ui5_ui5/ui2/ushell/resources/sap/fileviewer/viewer/web/viewer.html?file=";},addHighlightTermsToUrl:function(u,h){if(!h){return u;}u+='&searchTerms='+encodeURIComponent(JSON.stringify({'terms':h}));return u;},resolveSuvNavTargets:function(d,s,b){for(var c in s){var o;var e=s[c];var t=e.suvThumbnailAttribute;if(e.suvTargetMimeTypeAttribute.value===this.suvMimeType){o=this.suvViewerBasePath+encodeURIComponent(e.suvTargetUrlAttribute.value);o=this.addHighlightTermsToUrl(o,b);o=a(o);t.defaultNavigationTarget=this.sina._createNavigationTarget({label:e.suvTargetUrlAttribute.value,targetUrl:o,target:'_blank'});}else{o=e.suvTargetUrlAttribute.value;t.defaultNavigationTarget=this.sina._createNavigationTarget({label:e.suvTargetUrlAttribute.value,targetUrl:o,target:'_blank'});}}}});});