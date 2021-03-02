// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/GenericTile","sap/m/Link"],function(G,L){"use strict";sap.ui.jsview("sap.ushell.components.tiles.applauncherdynamic.DynamicTile",{getControllerName:function(){return"sap.ushell.components.tiles.applauncherdynamic.DynamicTile";},createContent:function(c){this.setHeight('100%');this.setWidth('100%');return this.getTileControl();},getTileControl:function(){var c=this.getController();return new G({mode:'{/mode}',header:'{/data/display_title_text}',subheader:'{/data/display_subtitle_text}',size:"Auto",sizeBehavior:'{/sizeBehavior}',wrappingType:'{/wrappingType}',tileContent:[new sap.m.TileContent({size:"Auto",footer:'{/data/display_info_text}',footerColor:{path:"/data/display_info_state",formatter:function(f){if(!sap.m.ValueColor[f]){f=sap.m.ValueColor.Neutral;}return f;}},unit:'{/data/display_number_unit}',content:[new sap.m.NumericContent({scale:'{/data/display_number_factor}',value:'{/data/display_number_value}',truncateValueTo:5,indicator:'{/data/display_state_arrow}',valueColor:{path:"/data/display_number_state",formatter:function(v){if(!sap.m.ValueColor[v]){v=sap.m.ValueColor.Neutral;}return v;}},icon:'{/data/display_icon_url}',width:'100%'})]})],press:[c.onPress,c]});},onAfterRendering:function(){var m=this.getModel(),d=m.getProperty('/data/display_info_state'),e=this.getDomRef(),a=e?e.getElementsByClassName('sapMTileCntFtrTxt')[0]:null;if(a){switch(d){case'Negative':a.classList.add('sapUshellTileFooterInfoNegative');break;case'Neutral':a.classList.add('sapUshellTileFooterInfoNeutral');break;case'Positive':a.classList.add('sapUshellTileFooterInfoPositive');break;case'Critical':a.classList.add('sapUshellTileFooterInfoCritical');break;default:return;}}},getMode:function(){return this.getModel().getProperty("/mode");}});},false);