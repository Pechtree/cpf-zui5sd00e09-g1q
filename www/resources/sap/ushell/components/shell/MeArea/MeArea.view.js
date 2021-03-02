// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/AppType","sap/m/Button","sap/m/List","sap/m/Text","sap/m/VBox","sap/m/HBox","sap/m/Image","sap/m/Popover","sap/m/OverflowToolbar","sap/m/ScrollContainer","sap/ushell/renderers/fiori2/AccessKeysHandler","sap/ushell/resources","sap/ushell/ui/launchpad/UserStatusItem","sap/ushell/ui/launchpad/AccessibilityCustomData","sap/m/library","sap/ui/Device","sap/ui/core/Icon","sap/ui/core/IconPool","sap/ui/core/service/ServiceFactoryRegistry"],function(a,B,L,T,V,H,I,P,O,S,A,r,U,b,m,D,c,d,e){"use strict";var f=m.BackgroundDesign,g=m.ButtonType,h=m.ListSeparators,j=m.ListType,k=m.PlacementType,l=m.ToolbarDesign;sap.ui.jsview("sap.ushell.components.shell.MeArea.MeArea",{createContent:function(C){this.addStyleClass('sapUshellMeAreaView');this.aDanglingControls=[];var u=sap.ushell.Container.getUser().getFullName(),p,t=r.i18n,o=(this.getViewData()?this.getViewData().config:{})||{},s=o.appState,n=(s==='embedded'||s==='embedded-home'||s==='standalone'||s==='blank-home'||s==='blank'),q,w=e.get("sap.ushell.ui5service.UserStatus"),x;if(w){var y=w.createInstance();x=function(i){y.then(function(w){w.setStatus(i);p.close();});};}q=[new U({status:U.prototype.STATUS_ENUM.AVAILABLE,id:"userStatusItem1",isOpener:false,press:function(i){x(sap.ushell.ui5service.UserStatus.prototype.AvailableStatus.AVAILABLE);}.bind(this)}).addStyleClass('sapUserStatusContainer'),new U({status:U.prototype.STATUS_ENUM.AWAY,id:"userStatusItem2",isOpener:false,press:function(i){x(sap.ushell.ui5service.UserStatus.prototype.AvailableStatus.AWAY);}.bind(this)}).addStyleClass('sapUserStatusContainer'),new U({status:U.prototype.STATUS_ENUM.BUSY,id:"userStatusItem3",isOpener:false,press:function(i){x(sap.ushell.ui5service.UserStatus.prototype.AvailableStatus.BUSY);}.bind(this)}).addStyleClass('sapUserStatusContainer'),new U({status:U.prototype.STATUS_ENUM.APPEAR_OFFLINE,id:"userStatusItem4",isOpener:false,press:function(i){x(sap.ushell.ui5service.UserStatus.prototype.AvailableStatus.APPEAR_OFFLINE);}.bind(this)}).addStyleClass('sapUserStatusContainer')];if(!o.disableSignOut){q.push(new U({status:U.prototype.STATUS_ENUM.SIGNOUT,id:"userStatusLogout",isOpener:false,press:[C.logout,C]}).addStyleClass('sapUserStatusSignOutContainer'));}var z=new L({id:"sapUshellUserStatusItemList",showSeparators:"None",items:q});z.addCustomData(new b({key:"aria-labelledBy",value:"userStatusItem1",writeToDom:true}));p=new P("statuses",{placement:k.Bottom,showArrow:false,showHeader:false,content:z}).addStyleClass('sapUserStatusPopOver');p.addStyleClass("sapContrastPlus");p.setOffsetX(-3);q=[new T({text:u}).addStyleClass('sapUshellMeAreaUserName')];var E=new U({id:"userStatusOpener",visible:{parts:["/userStatusEnabled","/userStatusUserEnabled"],formatter:function(i,v){if(i&&v){return true;}return false;}.bind(this)},status:{path:"/userStatus",formatter:function(i){return U.prototype.STATUS_ENUM[i];}.bind(this)},tooltip:t.getText("userStatus_tooltip"),image:d.getIconURI("account"),press:function(i){var v=sap.ui.getCore().byId(i.mParameters.id);if(p.isOpen()){p.close();}else{p.openBy(v);}}.bind(this),contentList:p}).addStyleClass('sapUserStatusOpener');E.addCustomData(new b({key:"tabindex",value:"0",writeToDom:true}));E.addCustomData(new b({key:"aria-label",value:r.i18n.getText("OnlineStatus")+" "+t.getText("userStatus_tooltip"),writeToDom:true}));E.addCustomData(new b({key:"role",value:"listbox",writeToDom:true}));var F=new L({items:[E],backgroundDesign:f.Transparent});q.push(F);if(!o.disableSignOut){var G;if(!n){G=new B("logoutBtn",{visible:{parts:["/userStatusEnabled","/userStatusUserEnabled"],formatter:function(i,v){if(i&&v){return false;}return true;}.bind(this)},type:g.Transparent,icon:'sap-icon://log',text:r.i18n.getText("signoutBtn_title"),press:[C.logout,C]});q.push(G);}else{G=new sap.ushell.ui.launchpad.ActionItem("logoutBtn",{visible:true,type:g.Transparent,icon:'sap-icon://log',text:r.i18n.getText("signoutBtn_title"),press:[C.logout,C]});}}var J=new V({items:[q]}).addStyleClass("sapUshellUserArea");var K=sap.ushell.Container.getUser(),M=K.getImage(),N;if(!M){N=this.createPlaceHolderIcon();}else{N=this.createNewImage();}N.addStyleClass("sapUshellMeAreaUserImage");var Q=new H({items:[N,J]});K.attachOnSetImage(this._updateUserImage.bind({origScope:this,oUserHBox:Q,userBoxItem:N}));Q.addStyleClass('sapUshellMeAreaUserInfo');Q.addStyleClass('sapContrastPlus');Q.addEventDelegate({onsapskipback:function(i){i.preventDefault();A.setIsFocusHandledByAnotherHandler(true);A.sendFocusBackToShell(i);},onsaptabprevious:function(i){i.preventDefault();A.setIsFocusHandledByAnotherHandler(true);A.sendFocusBackToShell(i);}});var R=new O({id:"overflowActions",design:l.Transparent,content:{path:"/currentState/actions",factory:function(i,v){var _=sap.ui.getCore().byId(v.getObject());if(_){var a1=_.isA("sap.ushell.ui.shell.ShellHeadItem");if(a1){return undefined;}if(_.setActionType){_.setActionType("action");_.addStyleClass('sapContrastPlus');}C._addPressHandlerToActions(_);}return _;}}});R._getOverflowButtonSize=function(){return 82.4;};R.addCustomData(new b({key:"aria-label",value:r.i18n.getText("overflowActions_AriaLabel"),writeToDom:true}));if(R._getOverflowButton){var W=R._getOverflowButton();if(W){var X=W.onAfterRendering;W.onAfterRendering=function(){if(X){X.apply(this,arguments);}this.addStyleClass('sapUshellActionItem').addStyleClass('sapContrastPlus');this.setText(r.i18n.getText('meAreaMoreActions'));};}}R.updateAggregation=function(_){var a1=this.mBindingInfos[_],b1=this.getMetadata().getJSONKeys()[_],c1;jQuery.each(this[b1._sGetter](),jQuery.proxy(function(i,v){this[b1._sRemoveMutator](v);},this));jQuery.each(a1.binding.getContexts(),jQuery.proxy(function(i,v){c1=a1.factory(this.getId()+"-"+i,v);if(c1){this[b1._sMutator](c1.setBindingContext(v,a1.model));}},this));};var Y=new V("sapUshellMeAreaContent",{});this.actionBox=R;Y.addItem(Q);Y.addItem(R);if(o.enableRecentActivity){var Z=sap.ushell.Container.getRenderer("fiori2").oShellModel.getModel().getProperty('/currentState/showRecentActivity');if(Z===true){var $=this.createIconTabBar(C);$.done(function(i){Y.addItem(i);var v=sap.ushell.Container.getRenderer("fiori2").oShellModel.getModel().getProperty("/enableTrackingActivity");i.setVisible(v);});}}this.actionBox.addEventDelegate({onsaptabnext:function(i){var v=i.originalEvent,_=v.srcElement,a1=jQuery('.sapUshellActionItem:last')[0].id,b1,c1;c1=sap.ui.getCore().byId('meAreaIconTabBar').getVisible();b1=a1===_.id;if(b1===true&&!c1){i.preventDefault();A.setIsFocusHandledByAnotherHandler(true);A.sendFocusBackToShell(i);}},onsapskipforward:function(i){var v=sap.ui.getCore().byId('meAreaIconTabBar').getVisible();if(!v){i.preventDefault();A.setIsFocusHandledByAnotherHandler(true);A.sendFocusBackToShell(i);}}});return new S({vertical:true,horizontal:false,height:"100%",content:Y});},createIconTabBar:function(C){var R=new jQuery.Deferred(),t=this,i,o,n;sap.ui.require(['sap/m/IconTabBar','sap/m/CustomListItem','sap/m/IconTabFilter','sap/m/Text','sap/m/HBox'],function(p,q,s,T,H){i=new p('meAreaIconTabBar',{backgroundDesign:f.Transparent,expandable:false,items:[t.createIconTab("recentActivities",true,C,q,s,T,H),t.createIconTab("frequentActivities",false,C,q,s,T,H)]}).addStyleClass('sapUshellMeAreaTabBar');i.addEventDelegate({onsaptabnext:function(E){var u=E.originalEvent,v=u.srcElement,w=v.classList,x;x=jQuery.inArray('sapUshellMeAreaActivityItem',w)>-1;if(x===true){E.preventDefault();A.setIsFocusHandledByAnotherHandler(true);A.sendFocusBackToShell(E);}},onsapskipforward:function(E){E.preventDefault();A.setIsFocusHandledByAnotherHandler(true);A.sendFocusBackToShell(E);}});o=i.onAfterRendering;i.onAfterRendering=function(){if(o){o.apply(t,arguments);}n=sap.ui.getCore().byId('meAreaIconTabBar--header');if(n){n.addStyleClass('sapContrastPlus');n.addStyleClass('sapUshellTabBarHeader');}};R.resolve(i);});return R.promise();},createIconTab:function(i,s,C,n,o,T,H){var p,q,t,u,v,w,x,M,y,z;p=function(E,F){q=F.getProperty("icon");t=F.getProperty("title");u=a.getDisplayName(F.getProperty("appType"));var G=new T({text:t}).addStyleClass('sapUshellMeAreaActivityItemTitle'),J=q?new c({src:q}).addStyleClass('sapUshellMeAreaActivityItemIcon'):null,K=new T({text:u}).addStyleClass('sapUshellMeAreaActivityItemDescription'),N=new T({text:s?F.getProperty("timestamp"):""}).addStyleClass('sapUshellMeAreaActivityItemInfo'),Q=new H({items:J?[J,K]:[K],justifyContent:"SpaceBetween"}),R=new H({items:s?[Q,N]:[Q],justifyContent:"SpaceBetween"}).addStyleClass('sapUshellMeAreaActivityItemContainer');v=new n({content:[G,R],type:j.Active}).addStyleClass('sapUshellMeAreaActivityItem');v.addCustomData(new b({key:"aria-describedby",value:w.getId(),writeToDom:true}));return v;};w=new o({id:"sapUshellIconTabBar"+i,text:r.i18n.getText(i)});x=new L({id:"sapUshellActivityList"+i,showSeparators:h.All,items:{path:"meAreaModel>/apps/"+i,factory:p.bind(this)},noDataText:r.i18n.getText(i+'NoDataText'),itemPress:function(E){M=this.getModel('meAreaModel');z=sap.ui.getCore().byId("viewPortContainer");if(z){z.switchState("Center");}y=E.getParameter('listItem').getBindingContextPath();C.setLastVisited(M.getProperty(y).url);setTimeout(function(){if(M.getProperty(y).url[0]==='#'){hasher.setHash(M.getProperty(y).url);}else{var F=this.getViewData()?this.getViewData().config:{};if(F.enableRecentActivity&&F.enableRecentActivityLogging){var R={title:M.getProperty(y).title,appType:"App",url:M.getProperty(y).url,appId:M.getProperty(y).url};sap.ushell.Container.getRenderer("fiori2").logRecentActivity(R);}window.open(M.getProperty(y).url,'_blank');}},200);}});w.addContent(x);return w;},onViewStateShow:function(){this.getController().refreshRecentActivities();this.getController().refreshFrequentActivities();if(this.actionBox){this.actionBox.updateAggregation("content");}this.getController().updateScrollBar(hasher.getHash());},createNewImage:function(){return new I({src:'{/userImage/personPlaceHolder}'});},createPlaceHolderIcon:function(){return new c({src:'{/userImage/personPlaceHolder}',size:'4rem'});},getControllerName:function(){return"sap.ushell.components.shell.MeArea.MeArea";},_updateUserImage:function(o){var u=(typeof o)==='string'?o:o.mParameters;this.oUserHBox.removeItem(this.userBoxItem);if((typeof u)==='string'){this.userBoxItem=this.origScope.createNewImage();}else{this.userBoxItem=this.origScope.createPlaceHolderIcon();}if(this.oUserHBox){this.oUserHBox.insertItem(this.userBoxItem,0);if(this.userBoxItem){this.userBoxItem.addStyleClass("sapUshellMeAreaUserImage");}}}});},false);
