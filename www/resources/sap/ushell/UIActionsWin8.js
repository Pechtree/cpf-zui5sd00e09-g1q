sap.ui.define(function(){"use strict";function n(){}var U=function(){};U.prototype={init:function(c){this.cfg=c;this.type=this.cfg.type;this.wrapper=jQuery(c.wrapperSelector).get(0);this.container=jQuery(c.containerSelector).get(0);this.dragAndScrollCallback=c.dragAndScrollCallback||n;this.dragAndScrollDuration=100;this.dragCallback=c.dragCallback||n;this.draggableSelector=c.draggableSelector;this.endCallback=typeof c.endCallback==='function'?c.endCallback:n;this.onBeforeCreateClone=c.onBeforeCreateClone||n;this.placeHolderClass=c.placeHolderClass||"";this.cloneClass=c.cloneClass||"";this.$root=jQuery(c.rootSelector);this.startCallback=typeof c.startCallback==='function'?c.startCallback:n;this.onDragStartUIHandler=typeof c.onDragStartUIHandler==='function'?c.onDragStartUIHandler:n;this.onDragEndUIHandler=typeof c.onDragEndUIHandler==='function'?c.onDragEndUIHandler:n;this._publishAsync=typeof c._publishAsync==='function'?c._publishAsync:n;},enable:function(){if(this.enabled){return this;}this.enabled=true;this.$root.on('dragstart',this.draggableSelector,this,this.dragStartHandler).on('dragend',this.draggableSelector,this,this.dragEndHandler);return this;},disable:function disable(){this.enabled=false;this.$root.off('dragstart',this.draggableSelector).off('dragend',this.draggableSelector);return this;},dragLeaveHandler:function(e){var c=window.getComputedStyle(e.data.container).transform;e.data.container.style.transform=c;e.data.container.style.transition='';var t;var b=c.split(",");if(c.substr(0,8)=="matrix3d"){t=parseInt(b[13],10);}else if(c.substr(0,6)=="matrix"){t=parseInt(b[5],10);}if(isNaN(t)){return;}e.data.container.style.transform="none";e.data.wrapper.scrollTop+=~t+1;},dragEnterScrollHandler:function dragEnterScrollHandler(e){if(e.target==e.data.$bottomScroller.get(0)){e.data.startScroll("down");}if(e.target==e.data.$topScroller.get(0)){e.data.startScroll("up");}},startScroll:function(d){var l;if(d=="up"){l=this.wrapper.scrollTop;if(l<=0){return;}}else{l=this.wrapper.scrollHeight-this.wrapper.offsetHeight-this.wrapper.scrollTop;if(l<=0){return;}}var s=l*3;var t=(d=="up")?l:~l+1;this.container.style.transition='transform '+s+'ms linear';this.container.style.transform='translate(0px, '+t+'px) scale(1) translateZ(0px)';},initScrollRegions:function(){this.$topScroller=jQuery("<div class='UiActionsTopScroller' style='position:absolute; top: 0; height: 70px; left:0; right:0;'></div>");this.$bottomScroller=jQuery("<div class='UiActionsBottomScroller' style='position:absolute; bottom: 0; height: 70px; left:0; right:0;'></div>");jQuery(document.body).append(this.$topScroller).append(this.$bottomScroller);this.$topScroller.add(this.$bottomScroller).on('dragenter',this,this.dragEnterScrollHandler).on('dragleave',this,this.dragLeaveHandler);},removeScrollRegions:function(){jQuery('.UiActionsTopScroller, .UiActionsBottomScroller').remove();}};function G(c){this.init(c);}G.prototype=new U();jQuery.extend(G.prototype,{dragOverTimeout:null,dragStartHandler:function(e){var _=e.data;if(sap.ui.Device.system.phone){_.$root.find(".sapUshellTilesContainer-sortable").addClass("sapUshellTileContainerRemoveContent");_.$root.find(".sapUshellTileContainerBeforeContent").addClass("sapUshellTileContainerRemoveContent");_.$root.find(".sapUshellContainerHeaderActions").addClass("sapUshellTileContainerHidden");}else{_.$root.find(".sapUshellTileContainerBeforeContent").addClass("sapUshellTileContainerHidden");}_.$originalElement=jQuery(e.target).closest(".sapUshellDashboardGroupsContainerItem");_.originalIndex=_.$originalElement.index();_.$element=_.$originalElement.clone().css("display","none").addClass('sapUshellDashboardGroupsContainerItem-placeholder');_.$element.insertAfter(_.$originalElement);_.$originalElement.addClass("sapUshellDashboardGroupsContainerItem-orignal");_.$root.find('.sapUshellTileContainerAfterContent').last().addClass("sapUshellTileContainerRemoveContent");_.initScrollRegions();setTimeout(function(){_.$originalElement.css("display","none");_.$element.css("display","block");},0);_.$root.on('dragover',".sapUshellDashboardGroupsContainerItem:not(.sapUshellDisableDragAndDrop)",_,_.dragOverHandler);},dragEndHandler:function(e){var _=e.data;_.removeScrollRegions();_.$root.off('dragover',".sapUshellDashboardGroupsContainerItem:not(.sapUshellDisableDragAndDrop)");_.$root.find(".sapUshellTilesContainer-sortable").removeClass("sapUshellTileContainerRemoveContent");_.$root.find(".sapUshellTileContainerBeforeContent").removeClass("sapUshellTileContainerRemoveContent");_.$root.find(".sapUshellContainerHeaderActions").removeClass("sapUshellTileContainerHidden");_.$root.find(".sapUshellTileContainerBeforeContent").removeClass("sapUshellTileContainerHidden");_.$element.replaceWith(_.$originalElement);var b=_.$originalElement.index();_.$originalElement.css('display','block').removeClass("sapUshellDashboardGroupsContainerItem-orignal");var B=sap.ui.getCore().getEventBus(),f=_.$originalElement.children().eq(0).attr("id"),g=sap.ui.getCore().byId(f),d=sap.ui.getCore().byId("dashboardGroups"),D={group:g,groupChanged:false,focus:false};d.removeAggregation('groups',g,true);d.insertAggregation('groups',g,b,true);_._publishAsync("launchpad","moveGroup",{fromIndex:_.originalIndex,toIndex:b});window.setTimeout(jQuery.proxy(B.publish,B,"launchpad","scrollToGroup",D),1);},dragOverHandler:function dragOverHandler(e){if(e.data.dragOverTimeout){return;}e.data.dragOverTimeout=setTimeout(function(){e.data.dragOverTimeout=null;var o=e.currentTarget;if(e.data.$element.get(0)===o){return;}var b=e.data.isOverAboveMiddle(o,e.originalEvent.pageY);if(o===e.data.overElement&&b===e.data.overAboveMiddle){return;}e.data.overElement=o;e.data.overAboveMiddle=b;e.data.movePlaceholder(e.data.$element,o,b);},50);},isOverAboveMiddle:function(e,p){var m=true;var r=e.getBoundingClientRect();if(r.top+r.height/2<p){m=false;}return m;},movePlaceholder:function(p,e,i){if(i){jQuery(p).insertBefore(jQuery(e));}else{jQuery(p).insertAfter(jQuery(e));}}});function T(c){this.init(c);}T.prototype=new U();jQuery.extend(T.prototype,{dragOverTimeout:null,dragStartHandler:function dragStartHandler(e){var _=e.data;if(!e.target.id){e.target=jQuery(e.target).closest(".sapUshellTile")[0];}_.element=e.target;_.$root.on('dragenter',_.draggableSelector+", .sapUshellTileContainer",_,_.dragEnterTileHandler);var i=e.target.getAttribute("id");_.oTile=sap.ui.getCore().byId(i);_.oTile.addStyleClass(_.cloneClass);if(_.oTile.getParent().getIsGroupLocked()){_.onDragStartUIHandler();e.preventDefault();var m=function m(){_.onDragEndUIHandler();document.removeEventListener("mouseup",m);};document.addEventListener("mouseup",m);return false;}_.initScrollRegions();var $=jQuery(e.target).clone();$.addClass(_.placeHolderClass).css('z-index',"-1");var c=$.get(0);_.$cloned=$;jQuery(e.target).after($);_.getDomRefOriginal=_.oTile.getDomRef;_.oTile.getDomRef=function(){return c;};_.startCallback(e,_.element);_.onDragStartUIHandler();_.dragCallback(e,_.element);setTimeout(function(){jQuery(e.target).css("visibility","hidden");},0);},dragEndHandler:function dragEndHandler(e){var _=e.data;_.$root.off('dragenter',_.draggableSelector+", .sapUshellTileContainer",_.dragEnterTileHandler);_.removeScrollRegions();_.oTile.getDomRef=_.getDomRefOriginal;_.oTile.removeStyleClass(_.cloneClass);jQuery(_.element).css('visibility','visible');_.$cloned.remove();_.endCallback(e,_.element);_.onDragEndUIHandler();_.element=null;},dragEnterTileHandler:function dragEnterTileHandler(e){e.preventDefault();if(this.tileDragEnterTimeout){window.clearTimeout(this.tileDragEnterTimeout);}this.tileDragEnterTimeout=setTimeout(function(){e.data.dragOverTimeout=null;e.data.overElement=this;e.data.dragAndScrollCallback({moveX:e.originalEvent.pageX,moveY:e.originalEvent.pageY});},50);}});function L(c){this.init(c);}L.prototype=new U();jQuery.extend(L.prototype,{dragOverTimeout:null,dragStartHandler:function dragStartHandler(e){var _=e.data;if(!e.target.id){e.target=jQuery(e.target).closest(".sapUshellLinkTile")[0];}_.element=e.target;_.onBeforeCreateClone(e,_.element);_.$root.on('dragenter',".sapUshellTileContainer",_,_.dragEnterLinkHandler);var i=e.target.getAttribute("id");_.oTile=sap.ui.getCore().byId(i);if(_.oTile.getParent().getIsGroupLocked()&&_.oTile.getParent().getDefaultGroup()){e.preventDefault();_.onDragStartUIHandler();var m=function m(){_.onDragEndUIHandler();document.removeEventListener("mouseup",m);};document.addEventListener("mouseup",m);return false;}jQuery(e.target).addClass(_.placeHolderClass);_.initScrollRegions();_.startCallback(e,_.element);_.onDragStartUIHandler();_.dragCallback(e,_.element);},dragEndHandler:function dragEndHandler(e){var _=e.data;_.$root.off('dragenter',".sapUshellTileContainer",_.dragEnterLinkHandler);_.removeScrollRegions();jQuery(_.element).css('visibility','visible');_.endCallback(e,_.element);_.onDragEndUIHandler();_.element=null;},dragEnterLinkHandler:function dragEnterLinkHandler(e){e.preventDefault();if(this.linkDragEnterTimeout){window.clearTimeout(this.linkDragEnterTimeout);}this.linkDragEnterTimeout=setTimeout(function(){e.data.dragOverTimeout=null;e.data.overElement=this;e.data.dragAndScrollCallback({moveX:e.originalEvent.pageX,moveY:e.originalEvent.pageY});},10);}});var a={getInstance:function(c){switch(c.type){case"groups":return new G(c);case"links":return new L(c);default:return new T(c);}}};return a;},true);
