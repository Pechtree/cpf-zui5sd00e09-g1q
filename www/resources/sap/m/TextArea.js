/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./InputBase','./Text','sap/ui/core/ResizeHandler','./library','sap/ui/core/library','sap/ui/events/KeyCodes','sap/ui/Device','./TextAreaRenderer',"sap/ui/thirdparty/jquery"],function(I,T,R,l,c,K,D,a,q){"use strict";var W=c.Wrapping;var b=I.extend("sap.m.TextArea",{metadata:{library:"sap.m",designtime:"sap/m/designtime/TextArea.designtime",properties:{rows:{type:"int",group:"Appearance",defaultValue:2},cols:{type:"int",group:"Appearance",defaultValue:20},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},maxLength:{type:"int",group:"Behavior",defaultValue:0},showExceededText:{type:"boolean",group:"Behavior",defaultValue:false},wrapping:{type:"sap.ui.core.Wrapping",group:"Behavior",defaultValue:W.None},valueLiveUpdate:{type:"boolean",group:"Behavior",defaultValue:false},growing:{type:"boolean",group:"Behavior",defaultValue:false},growingMaxLines:{type:"int",group:"Behavior",defaultValue:0}},aggregations:{_counter:{type:"sap.m.Text",multiple:false,visibility:"hidden"}},events:{liveChange:{parameters:{value:{type:"string"}}}},dnd:{draggable:false,droppable:true}}});b.prototype.init=function(){var C;I.prototype.init.call(this);this.sResizeListenerId=null;this._bPasteIsTriggered=false;C=new T(this.getId()+'-counter',{}).addStyleClass("sapMTextAreaCounter").setVisible(false);this.setAggregation("_counter",C);};b.prototype.setShowExceededText=function(v){var C=this.getAggregation("_counter"),V;if(v){if(this.getAriaLabelledBy().indexOf(C.getId())<0){this.addAriaLabelledBy(C.getId());}}else{C=this.getAggregation("_counter");C&&this.removeAriaLabelledBy(C.getId());V=this.getValue();if(this.getMaxLength()){V=V.substring(0,this.getMaxLength());this.setValue(V);}}C.setVisible(v);this.setProperty("showExceededText",v);this._updateMaxLengthAttribute();return this;};b.prototype.exit=function(){I.prototype.exit.call(this);q(window).off("resize.sapMTextAreaGrowing");this._detachResizeHandler();};b.prototype.onBeforeRendering=function(){I.prototype.onBeforeRendering.call(this);var C=this.getAggregation("_counter");if((this.getMaxLength()<=0||!this.getShowExceededText())&&C.getVisible()){C.setVisible(false);}this._detachResizeHandler();};b.prototype.onAfterRendering=function(){I.prototype.onAfterRendering.call(this);if(this.getGrowing()){this._sResizeListenerId=R.register(this,this._resizeHandler.bind(this));if(this.getGrowingMaxLines()>0){this._setGrowingMaxHeight();}this._adjustHeight();}this._updateMaxLengthAttribute();if(!D.support.touch){return;}var t=this.$("inner");if(this._behaviour.INSIDE_SCROLLABLE_WITHOUT_FOCUS){t.on("touchstart",q.proxy(this._onTouchStart,this));t.on("touchmove",q.proxy(this._onTouchMove,this));}else if(this._behaviour.PAGE_NON_SCROLLABLE_AFTER_FOCUS){t.on("touchmove",function(e){if(t.is(":focus")){e.stopPropagation();}});}};b.prototype._setGrowingMaxHeight=function(){var h=this.getDomRef('hidden'),C=sap.ui.getCore(),L=C.getLoadedLibraries(),f,m,s;if(!L||!L['sap.m']){C.attachThemeChanged(this._setGrowingMaxHeight.bind(this));return;}C.detachThemeChanged(this._setGrowingMaxHeight);s=window.getComputedStyle(h);f=this._getLineHeight();m=(f*this.getGrowingMaxLines())+parseFloat(s.getPropertyValue("padding-top"))+parseFloat(s.getPropertyValue("border-top-width"))+parseFloat(s.getPropertyValue("border-bottom-width"));if(D.browser.firefox){m+=parseFloat(s.getPropertyValue("padding-bottom"));}h.style.maxHeight=m+"px";};b.prototype._getLineHeight=function(){var t=this.getFocusDomRef(),s;if(!t){return;}s=window.getComputedStyle(t);return isNaN(parseFloat(s.getPropertyValue("line-height")))?1.4*parseFloat(s.getPropertyValue("font-size")):parseFloat(s.getPropertyValue("line-height"));};b.prototype._resizeHandler=function(e){this._adjustHeight();};b.prototype._detachResizeHandler=function(){if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}};b.prototype.onsapenter=function(e){e.setMarked();};b.prototype.onValueRevertedByEscape=function(v){if(this.getValueLiveUpdate()){this.setProperty("value",v,true);v=this.getValue();}this.fireLiveChange({value:v,newValue:v});};b.prototype.getValue=function(){var t=this.getFocusDomRef();return t?t.value:this.getProperty("value");};b.prototype.setValue=function(v){I.prototype.setValue.call(this,v);this._handleShowExceededText();if(this.getGrowing()){this._adjustHeight();}return this;};b.prototype.onsapnext=function(e){e.setMarked();};b.prototype.onsapprevious=function(e){e.setMarked();};b.prototype.oninput=function(e){I.prototype.oninput.call(this,e);if(this._bPasteIsTriggered){this._bPasteIsTriggered=false;this._selectExceededText();}if(e.isMarked("invalid")){return;}var t=this.getFocusDomRef(),v=t.value,m=this.getMaxLength();if(this.getShowExceededText()===false&&this._getInputValue().length<this.getMaxLength()){if(m>0&&v.length>m){v=v.substring(0,m);t.value=v;}}if(this.getValueLiveUpdate()){this.setProperty("value",v,true);v=this.getValue();}this._handleShowExceededText();if(this.getGrowing()){this._adjustHeight();}this.fireLiveChange({value:v,newValue:v});};b.prototype.onpaste=function(e){if(this.getShowExceededText()){this._bPasteIsTriggered=true;}};b.prototype.setGrowing=function(g){this.setProperty("growing",g);if(this.getGrowing()){q(window).on("resize.sapMTextAreaGrowing",this._updateOverflow.bind(this));}else{q(window).off("resize.sapMTextAreaGrowing");}return this;};b.prototype._adjustHeight=function(){var t=this.getFocusDomRef(),h=this.getDomRef("hidden"),H,n;if(!t||!h){return;}H=h.style["min-height"];n=this.getRows()*this._getLineHeight()+"px";if(!H||n!==H){h.style["min-height"]=n;}h.innerHTML=q.sap.escapeHTML(t.value)+'&nbsp;';this._updateOverflow();};b.prototype._updateOverflow=function(){var t=this.getFocusDomRef(),h=this.getDomRef("hidden"),m;if(t){m=parseFloat(window.getComputedStyle(h)["max-height"]);t.style.overflowY=(h.scrollHeight>m)?"auto":"";}};b.prototype._getInputValue=function(v){v=(v===undefined)?this.$("inner").val()||"":v.toString();if(this.getMaxLength()>0&&!this.getShowExceededText()){v=v.substring(0,this.getMaxLength());}return v.replace(/\r\n/g,"\n");};b.prototype._selectExceededText=function(){var v=this.getValue().length;if(v>this.getMaxLength()){this.selectText(this.getMaxLength(),v);}};b.prototype._updateMaxLengthAttribute=function(){var t=this.getFocusDomRef();if(!t){return;}if(this.getShowExceededText()){t.removeAttribute("maxlength");this._handleShowExceededText();}else{this.getMaxLength()&&t.setAttribute("maxlength",this.getMaxLength());}};b.prototype._handleShowExceededText=function(){var C=this.getAggregation("_counter"),m=this.getMaxLength(),s;if(!this.getDomRef()||!this.getShowExceededText()||!m){return;}s=this._getCounterValue();C.setText(s);};b.prototype._maxLengthIsExceeded=function(v){var r=false;if(this.getMaxLength()>0&&this.getShowExceededText()&&this.getValue().length>this.getMaxLength()){r=true;}return r;};b.prototype._getCounterValue=function(){var B=sap.ui.getCore().getLibraryResourceBundle("sap.m"),C=this.getMaxLength()-this.getValue().length,e=(C<0?true:false),m="TEXTAREA_CHARACTER"+(Math.abs(C)===1?"":"S")+"_"+(e?"EXCEEDED":"LEFT");return B.getText(m,[Math.abs(C)]);};b.prototype._behaviour=(function(d){return{INSIDE_SCROLLABLE_WITHOUT_FOCUS:d.os.ios||d.os.blackberry||d.browser.chrome,PAGE_NON_SCROLLABLE_AFTER_FOCUS:d.os.android&&d.os.version>=4.1};}(D));b.prototype._onTouchStart=function(e){var t=e.touches[0];this._iStartY=t.pageY;this._iStartX=t.pageX;this._bHorizontalScroll=undefined;e.setMarked("swipestartHandled");};b.prototype._onTouchMove=function(e){var t=this.getFocusDomRef(),p=e.touches[0].pageY,s=t.scrollTop,d=s<=0,B=s+t.clientHeight>=t.scrollHeight,g=this._iStartY>p,G=this._iStartY<p,o=d&&G||B&&g;if(this._bHorizontalScroll===undefined){this._bHorizontalScroll=Math.abs(this._iStartY-p)<Math.abs(this._iStartX-e.touches[0].pageX);}if(this._bHorizontalScroll||!o){e.setMarked();}};var _=D.os.windows_phone&&(/MSAppHost/i).test(navigator.appVersion);b.prototype.onfocusin=function(e){var s,$=this.$();I.prototype.onfocusin.apply(this,arguments);function d(){q(window).scrollTop(0);s.scrollTop($.offset().top-s.offset().top+s.scrollTop());}if(_&&$.height()+$.offset().top>260){for(s=$.parent();s[0];s=s.parent()){if(s.css("overflow-y")=="auto"){s.children().last().css("padding-bottom",q(window).height()+"px");window.setTimeout(d,100);return;}}}};b.prototype.onkeyup=function(e){if(e.keyCode===K.ENTER){e.setMarked("enterKeyConsumedAsContent");}};return b;});
