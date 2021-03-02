/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','./library','sap/ui/Device','sap/ui/core/ResizeHandler','sap/ui/base/ManagedObjectObserver',"./GridRenderer","sap/ui/thirdparty/jquery"],function(C,l,D,R,M,G,q){"use strict";var a=C.extend("sap.ui.layout.Grid",{metadata:{library:"sap.ui.layout",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},vSpacing:{type:"float",group:"Dimension",defaultValue:1},hSpacing:{type:"float",group:"Dimension",defaultValue:1},position:{type:"sap.ui.layout.GridPosition",group:"Dimension",defaultValue:"Left"},defaultSpan:{type:"sap.ui.layout.GridSpan",group:"Behavior",defaultValue:"XL3 L3 M6 S12"},defaultIndent:{type:"sap.ui.layout.GridIndent",group:"Behavior",defaultValue:"XL0 L0 M0 S0"},containerQuery:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},designtime:"sap/ui/layout/designtime/Grid.designtime"}});(function(){a.prototype.init=function(){var c=l.GridHelper.getLibrarySpecificClass();if(c){this.addStyleClass(c);}this._iBreakPointTablet=D.media._predefinedRangeSets[D.media.RANGESETS.SAP_STANDARD_EXTENDED].points[0];this._iBreakPointDesktop=D.media._predefinedRangeSets[D.media.RANGESETS.SAP_STANDARD_EXTENDED].points[1];this._iBreakPointLargeDesktop=D.media._predefinedRangeSets[D.media.RANGESETS.SAP_STANDARD_EXTENDED].points[2];this._indentXLChanged=false;this._spanXLChanged=false;this._oObserver=new M(a.prototype._observeChanges.bind(this));this._oObserver.observe(this,{aggregations:["content"]});};a.prototype.onAfterRendering=function(){if(this.getContainerQuery()){this._sContainerResizeListener=R.register(this,q.proxy(this._onParentResize,this));this._onParentResize();}else{this._attachMediaContainerWidthChange(this._handleMediaChange,this,D.media.RANGESETS.SAP_STANDARD_EXTENDED);}};a.prototype.onBeforeRendering=function(){this._cleanup();};a.prototype.exit=function(){this._cleanup();if(this._oObserver){this._oObserver.disconnect();this._oObserver=null;}};a.prototype._cleanup=function(){if(this._sContainerResizeListener){R.deregister(this._sContainerResizeListener);this._sContainerResizeListener=null;}this._detachMediaContainerWidthChange(this._handleMediaChange,this,D.media.RANGESETS.SAP_STANDARD_EXTENDED);};a.prototype._observeVisibility=function(c){this._oObserver.observe(c,{properties:["visible"]});};a.prototype._unobserveVisibility=function(c){this._oObserver.unobserve(c,{properties:["visible"]});};a.prototype._observeChanges=function(c){var o=c.object,s=c.name,m=c.mutation,b=c.child;if(o===this){if(m==="insert"){this._observeVisibility(b);}else if(m==="remove"){this._unobserveVisibility(b);}}else if(s==="visible"){var e=this.getContent().indexOf(o);q(this.$().children()[e]).toggleClass("sapUiRespGridSpanInvisible",!c.current);}};a.prototype._handleMediaChange=function(p){this._toggleClass(p.name);};a.prototype._setBreakPointTablet=function(b){this._iBreakPointTablet=b;};a.prototype._setBreakPointDesktop=function(b){this._iBreakPointDesktop=b;};a.prototype._setBreakPointLargeDesktop=function(b){this._iBreakPointLargeDesktop=b;};a.prototype.setDefaultIndent=function(d){if(/XL/gi.test(d)){this._setIndentXLChanged(true);}return this.setProperty("defaultIndent",d);};a.prototype._setIndentXLChanged=function(c){this._indentXLChanged=c;};a.prototype._getIndentXLChanged=function(){return this._indentXLChanged;};a.prototype.setDefaultSpan=function(d){if(/XL/gi.test(d)){this._setSpanXLChanged(true);}return this.setProperty("defaultSpan",d);};a.prototype._setSpanXLChanged=function(c){this._spanXLChanged=c;};a.prototype._getSpanXLChanged=function(){return this._spanXLChanged;};a.prototype._onParentResize=function(){var d=this.getDomRef();if(!d){this._cleanup();return;}if(!q(d).is(":visible")){return;}var c=d.clientWidth;if(c<=this._iBreakPointTablet){this._toggleClass("Phone");}else if((c>this._iBreakPointTablet)&&(c<=this._iBreakPointDesktop)){this._toggleClass("Tablet");}else if((c>this._iBreakPointDesktop)&&(c<=this._iBreakPointLargeDesktop)){this._toggleClass("Desktop");}else{this._toggleClass("LargeDesktop");}};a.prototype._toggleClass=function(m){var d=this.$();if(!d){return;}if(d.hasClass("sapUiRespGridMedia-Std-"+m)){return;}d.toggleClass("sapUiRespGridMedia-Std-"+m,true);if(m==="Phone"){d.toggleClass("sapUiRespGridMedia-Std-Desktop",false).toggleClass("sapUiRespGridMedia-Std-Tablet",false).toggleClass("sapUiRespGridMedia-Std-LargeDesktop",false);}else if(m==="Tablet"){d.toggleClass("sapUiRespGridMedia-Std-Desktop",false).toggleClass("sapUiRespGridMedia-Std-Phone",false).toggleClass("sapUiRespGridMedia-Std-LargeDesktop",false);}else if(m==="LargeDesktop"){d.toggleClass("sapUiRespGridMedia-Std-Desktop",false).toggleClass("sapUiRespGridMedia-Std-Phone",false).toggleClass("sapUiRespGridMedia-Std-Tablet",false);}else{d.toggleClass("sapUiRespGridMedia-Std-Phone",false).toggleClass("sapUiRespGridMedia-Std-Tablet",false).toggleClass("sapUiRespGridMedia-Std-LargeDesktop",false);}this.fireEvent("mediaChanged",{media:m});};a.prototype._getLayoutDataForControl=function(c){var L=c.getLayoutData();if(!L){return undefined;}else if(L instanceof sap.ui.layout.GridData){return L;}else if(L.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){var b=L.getMultipleLayoutData();for(var i=0;i<b.length;i++){var o=b[i];if(o instanceof sap.ui.layout.GridData){return o;}}}};a.prototype.onLayoutDataChange=function(e){if(this.getDomRef()){this.invalidate();}};a.prototype._getAccessibleRole=function(){return null;};a.prototype.getAccessibilityInfo=function(){return{children:this.getContent().filter(function(c){return c.$().is(':visible');})};};}());return a;});