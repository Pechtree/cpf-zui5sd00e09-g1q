/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ObjectPageHeaderRenderer","./ObjectImageHelper"],function(O,a){"use strict";var b={};b.render=function(r,c){var p=c.getParent(),P=p&&p.isA("sap.uxap.ObjectPageLayout"),h=(p&&P)?p.getHeaderTitle():undefined,R=(p&&P)?(p.isA("sap.uxap.ObjectPageLayout")&&p.getShowTitleInHeaderContent()):false,d=P&&p.getShowEditHeaderButton()&&c.getContent()&&c.getContent().length>0;if(d){r.write("<div ");r.writeControlData(c);r.addClass("sapUxAPObjectPageHeaderContentFlexBox");r.addClass("sapUxAPObjectPageHeaderContentDesign-"+c.getContentDesign());if(h){r.addClass('sapUxAPObjectPageContentObjectImage-'+h.getObjectImageShape());}r.writeClasses();r.write(">");}r.write("<div ");if(d){r.addClass("sapUxAPObjectPageHeaderContentCellLeft");}else{r.writeControlData(c);r.addClass("sapUxAPObjectPageHeaderContentDesign-"+c.getContentDesign());if(h){r.addClass('sapUxAPObjectPageContentObjectImage-'+h.getObjectImageShape());}}r.addClass("sapContrastPlus");r.addClass("ui-helper-clearfix");r.addClass("sapUxAPObjectPageHeaderContent");if(!c.getVisible()){r.addClass("sapUxAPObjectPageHeaderContentHidden");}r.writeClasses();r.write(">");if(P&&p.getIsChildPage()){r.write("<div");r.addClass('sapUxAPObjectChildPage');r.writeClasses();r.write("></div>");}if(R){this._renderTitleImage(r,c,h);if(c.getContent().length==0){r.write("<span class=\"sapUxAPObjectPageHeaderContentItem\">");this._renderTitle(r,h);r.write("</span>");}}c.getContent().forEach(function(i,I){this._renderHeaderContentItem(i,I,r,R,h,c);},this);r.write("</div>");if(d){this._renderEditButton(r,c);r.write("</div>");}};b._renderHeaderContentItem=function(h,i,r,R,t,c){var H=false,d=false,l=c._getLayoutDataForControl(h),I=i===0;if(l){H=l.getShowSeparatorBefore();d=l.getShowSeparatorAfter();r.write("<span ");r.addClass("sapUxAPObjectPageHeaderWidthContainer");r.addClass("sapUxAPObjectPageHeaderContentItem");r.addStyle("width",l.getWidth());r.writeStyles();if(d||H){r.addClass("sapUxAPObjectPageHeaderSeparatorContainer");}if(!l.getVisibleL()){r.addClass("sapUxAPObjectPageHeaderLayoutHiddenL");}if(!l.getVisibleM()){r.addClass("sapUxAPObjectPageHeaderLayoutHiddenM");}if(!l.getVisibleS()){r.addClass("sapUxAPObjectPageHeaderLayoutHiddenS");}r.writeClasses();r.write(">");if(H){r.write("<span class=\"sapUxAPObjectPageHeaderSeparatorBefore\"></span>");}if(I&&R){this._renderTitle(r,t);}}else{if(I&&R){r.write("<span class=\"sapUxAPObjectPageHeaderContentItem\">");this._renderTitle(r,t);}else{h.addStyleClass("sapUxAPObjectPageHeaderContentItem");}}r.renderControl(h);if(d){r.write("<span class=\"sapUxAPObjectPageHeaderSeparatorAfter\"></span>");}if(l||(I&&R)){r.write("</span>");}};b._renderTitleImage=function(r,c,h){a._renderImageAndPlaceholder(r,{oHeader:h,oObjectImage:c._getObjectImage(),oPlaceholder:c._getPlaceholder(),bIsObjectIconAlwaysVisible:false,bAddSubContainer:false,sBaseClass:'sapUxAPObjectPageHeaderContentImageContainer'});};b._renderTitle=function(r,h){O._renderObjectPageTitle(r,h,true);};b._renderEditButton=function(r,h){r.write("<div class=\"sapUxAPObjectPageHeaderContentCellRight\">");r.renderControl(h.getAggregation("_editHeaderButton"));r.write("</div>");};return b;},true);
