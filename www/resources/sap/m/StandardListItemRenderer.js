/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/Renderer","sap/ui/core/IconPool","sap/ui/Device","./library","./ListItemBaseRenderer"],function(c,R,I,D,l,L){"use strict";var T=c.TextDirection;var S=R.extend(L);S.renderLIAttributes=function(r,o){var i=o.getIcon(),t=o.getTitle();r.addClass("sapMSLI");if(i&&!I.isIconURI(i)){r.addClass("sapMSLIThumbnail");}if(!o.getIconInset()){r.addClass("sapMSLINoIconInset");}if(t&&o.getDescription()){r.addClass("sapMSLIWithDescription");}if(t&&!o.getAdaptTitleSize()){r.addClass("sapMSLINoTitleAdapt");}if(t&&o.getWrapping()){r.addClass("sapMSLIWrapping");}};S.renderLIContent=function(r,o){var i=o.getInfo(),t=o.getTitle(),d=o.getDescription(),a=o.getAdaptTitleSize(),s=!t&&i;if(o.getIcon()){r.renderControl(o._getImage());}r.write("<div");r.addClass("sapMSLIDiv");if((!d&&a&&i)||s){r.addClass("sapMSLIInfoMiddle");}r.writeClasses();r.write(">");this.renderTitleWrapper(r,o);if(t&&d){this.renderDescription(r,o);}if(s&&!o.getWrapping()){this.renderInfo(r,o);}r.write("</div>");};S.renderTitleWrapper=function(r,o){var t=o.getTitleTextDirection(),s=o.getTitle(),d=o.getDescription(),i=o.getInfo(),w=o.getWrapping(),b=!s&&i;r.write("<div");if(!b&&d){r.addClass("sapMSLITitle");}else{r.addClass("sapMSLITitleOnly");}r.writeClasses();if(t!==T.Inherit){r.writeAttribute("dir",t.toLowerCase());}r.write(">");if(w){this.renderWrapping(r,o,"title");if(s&&i&&!d){this.renderInfo(r,o);}}else{this.renderTitle(r,o);}r.write("</div>");if(i&&!d&&!w&&!b){this.renderInfo(r,o);}};S.renderTitle=function(r,o){r.writeEscaped(o.getTitle());};S.renderDescription=function(r,o){var w=o.getWrapping(),d=o.getDescription(),i=o.getInfo();r.write("<div");r.addClass("sapMSLIDescription");if(i){r.addClass("sapMSLIDescriptionAndInfo");}r.writeClasses();r.write(">");if(i){r.write("<div");r.addClass("sapMSLIDescriptionText");r.writeClasses();r.write(">");if(w){this.renderWrapping(r,o,"description");this.renderInfo(r,o);}else{r.writeEscaped(d);}r.write("</div>");if(!w){this.renderInfo(r,o);}}else if(w){this.renderWrapping(r,o,"description");}else{r.writeEscaped(d);}r.write("</div>");};S.renderInfo=function(r,o){var i=o.getInfoTextDirection();r.write("<div");r.writeAttribute("id",o.getId()+"-info");if(i!==T.Inherit){r.writeAttribute("dir",i.toLowerCase());}r.addClass("sapMSLIInfo");r.addClass("sapMSLIInfo"+o.getInfoState());r.writeClasses();r.write(">");r.writeEscaped(o.getInfo());r.write("</div>");};S.renderExpandCollapse=function(r,o,w){var i=o.getId(),t=w==="title"?true:false,b=t?o._bTitleTextExpanded:o._bDescriptionTextExpanded,a=sap.ui.getCore().getLibraryResourceBundle("sap.m");r.write("<span");r.writeAttribute("id",i+"-"+w+"ThreeDots");r.write(">");if(!b){r.write(" ... ");}else{r.write(" ");}r.write("</span>");r.write("<span");r.writeAttribute("id",t?i+"-titleButton":i+"-descriptionButton");r.addClass("sapMSLIExpandCollapse");r.writeClasses();r.writeAttribute("tabindex","0");r.writeAttribute("role","button");r.writeAttribute("aria-live","polite");r.write(">");if(!b){r.writeEscaped(a.getText("TEXT_SHOW_MORE"));}else{r.writeEscaped(a.getText("TEXT_SHOW_LESS"));}r.write("</span>");};S.renderWrapping=function(r,o,w){var i=o.getId(),t=w==="title"?true:false,s=t?o.getTitle():o.getDescription(),b=t?o._bTitleTextExpanded:o._bDescriptionTextExpanded,m=D.system.phone?100:300;r.write("<span");r.writeAttribute("id",i+"-"+w+"Text");r.writeAttribute("aria-live","polite");r.write(">");if(!b){var C=o._getCollapsedText(s);r.writeEscaped(C);}else if(t){this.renderTitle(r,o);}else{r.writeEscaped(o.getDescription());}r.write("</span>");if(s.length>m){this.renderExpandCollapse(r,o,w);}};return S;},true);