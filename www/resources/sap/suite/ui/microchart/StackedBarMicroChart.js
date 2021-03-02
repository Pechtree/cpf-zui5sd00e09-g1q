/*!
 * SAPUI5

(c) Copyright 2009-2019 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/ui/core/Control","sap/m/library","sap/ui/Device","sap/m/FlexBox","sap/suite/ui/microchart/MicroChartUtils","sap/ui/core/ResizeHandler","./StackedBarMicroChartRenderer"],function(q,l,C,M,D,F,c,R){"use strict";var S=M.Size;var V=M.ValueColor;var d=C.extend("sap.suite.ui.microchart.StackedBarMicroChart",{metadata:{library:"sap.suite.ui.microchart",properties:{size:{type:"sap.m.Size",group:"Appearance",defaultValue:S.Auto},maxValue:{type:"float",group:"Appearance",defaultValue:null},precision:{type:"int",group:"Appearance",defaultValue:1},width:{type:"sap.ui.core.CSSSize",group:"Misc"},height:{type:"sap.ui.core.CSSSize",group:"Misc"},showLabels:{type:"boolean",group:"Misc",defaultValue:true}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},defaultAggregation:"bars",aggregations:{bars:{type:"sap.suite.ui.microchart.StackedBarMicroChartBar",multiple:true,bindable:"bindable"}},events:{press:{}}}});d.THRESHOLD_SMALL_LOOK=1.125;d.BAR_COLOR_PARAM_DEFAULT="sapUiChartPaletteQualitativeHue";d.BAR_LABEL_CSSCLASS=".sapSuiteStackedMCBarLabel";d.BAR_CSSCLASS=".sapSuiteStackedMCBar";d.prototype.attachEvent=function(){C.prototype.attachEvent.apply(this,arguments);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapSuiteUiMicroChartPointer");}return this;};d.prototype.detachEvent=function(){C.prototype.detachEvent.apply(this,arguments);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapSuiteUiMicroChartPointer");}return this;};d.prototype.onclick=function(e){if(D.browser.msie||D.browser.edge){this.$().focus();}if(this.hasListeners("press")){e.stopPropagation();this.firePress();}};d.prototype.onsapspace=d.prototype.onclick;d.prototype.onsapenter=d.prototype.onclick;d.prototype.setMaxValue=function(m){var b=q.isNumeric(m);this.setProperty("maxValue",b?m:null);return this;};d.prototype.setTooltip=function(t){this._title=null;this.setAggregation("tooltip",t,true);return this;};d.prototype._getAccessibilityControlType=function(){return this._oRb.getText("ACC_CTR_TYPE_STACKEDBARMICROCHART");};d.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this.setAggregation("tooltip","((AltText))",true);this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this));}else{this._handleCoreInitialized();}};d.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this);};d.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this.invalidate();};d.prototype.onBeforeRendering=function(){if(this._sChartResizeHandlerId){R.deregister(this._sChartResizeHandlerId);}this.$().unbind("mouseenter");this.$().unbind("mouseleave");};d.prototype.onAfterRendering=function(){l._checkControlIsVisible(this,this._onControlIsVisible);};d.prototype._onControlIsVisible=function(){this._sChartResizeHandlerId=R.register(this,this._onResize.bind(this));this._onResize();this.$().bind("mouseenter",this._addTitleAttribute.bind(this));this.$().bind("mouseleave",this._removeTitleAttribute.bind(this));};d.prototype.exit=function(){R.deregister(this._sChartResizeHandlerId);};d.prototype._getLocalizedColorMeaning=function(a){return this._oRb.getText(("SEMANTIC_COLOR_"+a).toUpperCase());};d.prototype._calculateChartData=function(){var e=[];var f=this.getBars();var I=f.length;var g=12;var h=1;var p=this.getPrecision();var n=function(){if(g){if(h===g){h=1;}return d.BAR_COLOR_PARAM_DEFAULT+(h++);}};var t=0;var m=this.getMaxValue();var i=0;for(i;i<I;i++){if(!isNaN(f[i].getValue())){t=t+f[i].getValue();}}var T=Math.max(m,t);var v=m>=t;var P=0;var w=0;var o;for(i=0;i<I;i++){o={oBarData:f[i]};o.color=f[i].getValueColor();if(!o.color){o.color=n();}var j=isNaN(f[i].getValue())?0:f[i].getValue();var k=T===0?0:j*100/T;o.value=this._roundFloat(k,p);o.width=this._roundFloat(k,2);P=P+o.value;w=w+o.width;if(v){o.displayValue=f[i].getDisplayValue()||String(j);}else{o.displayValue=f[i].getDisplayValue()||String(o.value+"%");}e.push(o);}P=this._roundFloat(P,p);w=this._roundFloat(w,2);var r;if(w>100&&e.length>0){r=e.slice(0).sort(function(a,b){return b.width-a.width;})[0];r.width=this._roundFloat(r.width-w+100,2);}if(m>t){o={value:this._roundFloat(100-P,p),width:this._roundFloat(100-w,2)};e.push(o);}else if(e.length>0&&w<100){r=e.slice(0).sort(function(a,b){return b.width-a.width;})[0];r.width=this._roundFloat(r.width-w+100,2);}return e;};d.prototype._roundFloat=function(n,p){return parseFloat(n.toFixed(p));};d.prototype._onResize=function(){this._resizeVertically();this._resizeHorizontally();};d.prototype._resizeVertically=function(){var $=this.$();var i=parseFloat($.height());if(i<=this.convertRemToPixels(d.THRESHOLD_SMALL_LOOK)){$.addClass("sapSuiteStackedMCSmallLook");}else{$.removeClass("sapSuiteStackedMCSmallLook");}};d.prototype._resizeHorizontally=function(){this._hideTruncatedLabels(d.BAR_LABEL_CSSCLASS);};d.prototype._hideTruncatedLabels=function(a){var $=this.$();var L=$.find(a);L.removeClass("sapSuiteStackedMCBarLabelHidden");for(var i=0;i<L.length;i++){if(this._isLabelTruncated(L[i])){$.find(L[i]).addClass("sapSuiteStackedMCBarLabelHidden");}}};d.prototype._getAltHeaderText=function(I){var a=this._calculateChartData(),t=this._oRb.getText("STACKEDBARMICROCHART");if(I){t+=" "+this._oRb.getText("IS_ACTIVE");}t+="\n";if(!this._hasData()){t+=this._oRb.getText("NO_DATA");return t;}var o,b,B,A=false;for(var i=0;i<a.length;i++){o=a[i];b=o.oBarData;B=b&&b.getTooltip_AsString();if(b&&b._isTooltipSuppressed()){continue;}if(A){t+="\n";}A=true;if(B){t+=B;}else if(o.displayValue){t+=o.displayValue;if(V[o.color]){t+=" "+this._getLocalizedColorMeaning(o.color);}}}return t;};d.prototype._isTooltipSuppressed=function(){var t=this.getTooltip_AsString();return t&&q.trim(t).length===0;};d.prototype._addTitleAttribute=function(){if(this.$().attr("title")){return;}if(!this._title&&this._hasData()){this._title=this.getTooltip_AsString();}if(this._title){this.$().attr("title",this._title);}};d.prototype._removeTitleAttribute=function(){if(this.$().attr("title")){this._title=this.$().attr("title");this.$().removeAttr("title");}};d.prototype._hasData=function(){return this.getBars().length>0;};d.prototype.firePress=function(){if(this._hasData()){C.prototype.fireEvent.call(this,"press",arguments);}};c.extendMicroChart(d);return d;});
