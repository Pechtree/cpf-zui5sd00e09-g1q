// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/ushell/resources'],function(r){"use strict";var T={};var t=r.i18n;T.highlight=function(h,s){var i,a,e=jQuery.sap.encodeHTML(s).replace(/&#xa;/g,"<br/>");if(h&&h.length&&h.length>0){for(i=0;i<h.length;i=i+1){a=new RegExp("("+jQuery.sap.encodeHTML(h[i]).replace(/([.*+?\^=!:${}()|\[\]\/\\])/g,"\\$1")+")","gi");e=e.replace(a,"<b>$1</b>");}}return e;};T.render=function(R,c){var i,I;R.write("<div");R.writeControlData(c);if(c.getTargetURL()){R.writeAttributeEscaped("data-targeturl",c.getTargetURL());}R.addClass("sapUshellTileBase");R.writeClasses();R.write(">");R.write("<div");R.addClass("sapUshellTileBaseHeader");R.writeClasses();R.write(">");R.write("<h3");R.addClass("sapUshellTileBaseTitle");R.writeClasses();R.writeAccessibilityState(c,{label:t.getText("tileTypeListItem")+t.getText("TileDetails_lable")+t.getText("TileTitle_lable")+c.getTitle()});R.write(">");R.write(this.highlight(c.getHighlightTerms(),c.getTitle()||""));R.write("</h3>");if(c.getSubtitle()){R.write("<h4");R.addClass("sapUshellTileBaseSubtitle");R.writeClasses();R.writeAccessibilityState(c,{label:t.getText("TileSubTitle_lable")+c.getSubtitle()});R.write(">");R.write(this.highlight(c.getHighlightTerms(),c.getSubtitle()));R.write("</h4>");}R.write("</div>");if(typeof(this.renderPart)==='function'){this.renderPart(R,c);}if(c.getIcon()){I=new sap.ui.core.Icon({src:c.getIcon()});I.addStyleClass("sapUshellTileBaseIcon");R.renderControl(I);}if(c.getInfo()||((typeof(this.getInfoPrefix)==='function'))&&this.getInfoPrefix(c)){R.write("<div");R.addClass("sapUshellTileBaseInfo");R.addClass(c.getInfoState()?"sapUshellTileBase"+c.getInfoState():"sapUshellTileBase"+sap.ushell.ui.tile.State.Neutral);R.writeClasses();R.writeAccessibilityState(c,{label:t.getText("TileInfo_lable")+c.getInfo()});R.write(">");if(typeof(this.getInfoPrefix)==='function'){i=this.getInfoPrefix(c);R.writeEscaped(i);}if(c.getInfo()){if(i){R.write(", ");}R.write(this.highlight(c.getHighlightTerms(),c.getInfo()));}R.write("</div>");}R.write("</div>");};return T;},true);
