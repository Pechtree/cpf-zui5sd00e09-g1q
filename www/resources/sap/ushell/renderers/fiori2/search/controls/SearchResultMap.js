sap.ui.define(['sap/ushell/renderers/fiori2/search/SearchConfiguration','sap/base/Log'],function(S,L){"use strict";var b=true;var f=function(u){var i=false;$.ajax({url:u,type:"get",async:false,success:function(){i=true;return i;},error:function(){i=false;return i;}});return i;};var m=function(){var i=false;i=f("/sap/hana/spatial/mapClient/map.xsjs?col=32&row=32&level=6");return i;};var g=m();var k=function(c){var r=null;if(c.getModel()&&c.getModel().config&&c.getModel().config.mapsAppId){var s="https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{LOD}/{X}/{Y}/256/png8?";var a="https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{LOD}/{X}/{Y}/256/png8?";var d,e,i,u,h;d='app_id='+c.getModel().config.mapsAppId;e='app_code='+c.getModel().config.mapsAppCode;d=d.replace('mapsAppId','app_id');e=e.replace('mapsAppCode','app_code');i="?"+d+"&"+e;u=s.replace("?",i);h=a.replace("?",i);r=[[u,h]];}return r;};var l=function(u){var a=null;var U=[];try{U=sap.ushell.renderers.fiori2.search.getModelSingleton().config.mapTileLocation.URLPairs;}catch(e){}if(g){a="/sap/hana/spatial/mapClient/map.xsjs?col={X}&row={Y}&level={LOD}";}else if(U&&U.length>0){if(u===0){a=U[0][0];}else{a=U[0][1];}}else{b=false;}if(typeof a!=="string"||a.length<0){b=false;}return a;};return sap.ui.core.Control.extend('sap.ushell.renderers.fiori2.search.controls.SearchResultMap',{teststring:'',ContainerContent:null,MapContainer:null,minLat:0,minLon:0,maxLat:0,maxLon:0,centerLat:0,centerLon:0,iNrLocations:0,myMap:null,myMapContainer:null,metadata:{aggregations:{"_map":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}},init:function(){var t=this;var M={"MapProvider":[{"name":"HEREMAPS","type":"terrain","description":"","tileX":"256","tileY":"256","maxLOD":"20","copyright":"Tiles Courtesy of HERE Maps","Source":[{"id":"s1","url":l(0)},{"id":"s2","url":l(1)}]}],"MapLayerStacks":[{"name":"DEFAULT","MapLayer":{"name":"layer1","refMapProvider":"HEREMAPS","opacity":"0.9","colBkgnd":"RGB(255,255,255)"}}]};try{jQuery.sap.require("sap.ui.vk.MapContainer","sap.ui.vk.ContainerContent");t.MapContainer=sap.ui.vk.MapContainer;t.ContainerContent=sap.ui.vk.ContainerContent;}catch(e){}var a=new sap.ui.vbm.GeoMap({legendVisible:false,scaleVisible:false,refMapLayerStack:'DEFAULT',mapConfiguration:M,width:'100%',height:'100%',zoomlevel:6,zoomChanged:this.zoomChanged.bind(this),centerChanged:this.centerChanged.bind(this)});if(this.MapContainer){var c=new t.ContainerContent({content:a});this.MapContainer.prototype._onNavbarHome=function(){t.resizeMap();t.centerMap();t.setZoomLevelAfterRendering();};this.myMapContainer=new t.MapContainer({content:[c],showRectangularZoom:true,showHome:true,showFullScreen:false,showSettings:false,showSelection:false});t.myMap=t.myMapContainer.getContent()[0].getAggregation('content');t.setAggregation('_map',this.myMapContainer);}else{t.setAggregation('_map',a);t.myMap=t.getAggregation('_map');}},ifMissingTilesCheckUrlParams:function(c){var U=k(c);if(U&&U.length>0){b=true;var M=c.myMap.getMapConfiguration();M.MapProvider[0].Source[0].url=U[0][0];M.MapProvider[0].Source[1].url=U[0][1];c.myMap.setMapConfiguration(M);}},renderer:function(r,c){c.loadObjects(c);if(!b){c.ifMissingTilesCheckUrlParams(c);}r.write('<div ');r.writeControlData(c);r.addClass('sapUshellSearchResultMap');r.writeClasses();r.write('>');var e;if(!b){e=new sap.m.Label({text:sap.ushell.resources.i18n.getText("mapsNoTiles")});r.renderControl(e);}else if(c.iNrLocations===0){e=new sap.m.Label({text:sap.ushell.resources.i18n.getText("mapsNoCoordinates")});r.renderControl(e);}else{if(c.MapContainer){r.renderControl(c.myMapContainer);}else{r.renderControl(c.myMap);}}r.write('</div>');},splitCoordinates:function(c){var a=c.split(';');return[parseFloat(a[0]),parseFloat(a[1])];},deg2rad:function(d){return Math.PI*d/180;},rad2deg:function(r){return 180*r/Math.PI;},getDistanceFromLatLonInKm:function(e,h,i,j){var R=6371;var n=this.deg2rad(i-e);var o=this.deg2rad(j-h);var a=Math.sin(n/2)*Math.sin(n/2)+Math.cos(this.deg2rad(e))*Math.cos(this.deg2rad(i))*Math.sin(o/2)*Math.sin(o/2);var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));var d=R*c;return d;},getLatLonDiff:function(v){var a,c,d,e,h,i,j,n;var o,p,q,r;a=v.upperLeft.split(";");c=v.lowerRight.split(";");d=parseFloat(a[1],10);e=parseFloat(c[1],10);n=(d+e)/2;o=d-e;q=o*111;q=Math.floor(q);h=parseFloat(a[0],10);i=parseFloat(c[0],10);if((h<0&&i>0)|(h>0&&i<0)){p=Math.abs(h)+Math.abs(i);}else{p=Math.abs(i-h);}r=this.getDistanceFromLatLonInKm(n,h,n,i);r=Math.floor(r);j="lat= "+o+" ("+q+" km); lon= "+p+" ("+r+" km)";return j;},calculateZoomLevel:function(s,K){if(K===0){K=1;}var e=40075004;var w=s;var a=e/256;var z=0;while((a*w)>(K*1000)&&(z<20)){a=a/2.5;z=z+1;}L.debug('zoomLevel calc: '+z);return z;},getSpotList:function(){var t=this;var s=new sap.ui.vbm.Containers();var r=t.getModel().oData.boResults;var n=0;var R,o,T,c,a,d,e,h,p,q,u,i;for(i=0;i<r.length;i++){R=r[i];o={};if(!R.geoJson){continue;}if(typeof R.geoJson.value==='string'){o=JSON.parse(R.geoJson.value);}else{o.coordinates=R.geoJson.value.coordinates;}T=R.geoJson.label;if(T==="LOC_4326"||T==="LOCATION"||T===undefined){T=R.title;}if(T==="LOC_4326"||T==="LOCATION"||T===undefined){for(var j=0;j<R.itemattributes.length;j++){if(R.itemattributes[j].isTitle===true){T=R.itemattributes[j].value;break;}}}if(T===undefined||typeof T!=='string'){T="unlabeled location";}else{T=T.replace(/<[^>]*>/g,"");}c=o.coordinates;if(!c||c.length===0){continue;}a=c[0];d=c[1];if(isNaN(d)||isNaN(a)){continue;}n++;if(n===1){h=a;p=a;q=d;u=d;}else{if(a<h){h=a;}if(a>p){p=a;}if(d<q){q=d;}if(d>u){u=d;}}t.minLon=h;t.maxLon=p;t.minLat=q;t.maxLat=u;var v=new sap.m.Button({text:T});var B=new sap.m.Button({icon:"sap-icon://map",type:sap.m.ButtonType.Emphasized});var w=new sap.ui.layout.HorizontalLayout({content:[B,v]});e=new sap.ui.vbm.Container({position:a+';'+d+';0',item:w,alignment:6});s.addItem(e);}t.iNrLocations=n;if(n===0){s=t.getSpotList2();}return s;},getSpotList2:function(c){var t=this;var r=t.getModel().oData.origBoResults.elements;var R,o,T,C,a,d,s;var h=new sap.ui.vbm.Containers();var n=0;var i,p,q,u;var v=0;for(var w in r){if(!r.hasOwnProperty(w)){continue;}R=r[w];if(!R.LOC_4326){continue;}o=R.LOC_4326;for(var x in R){if(!R.hasOwnProperty(x)){continue;}var A=R[x];T="";var y=false;if(A.$$MetaData$$){var z=A.$$MetaData$$.presentationUsage;if(z&&typeof z.length!=="undefined"){for(var j=0;j<z.length;j++){if(z[j]=="Title"){T=A.value;T=T.replace(/<[^>]*>/g,"");y=true;break;}}}}if(y){break;}}C=null;try{C=JSON.parse(o.value).coordinates;}catch(e){}if(!C||C.length===0){continue;}n++;a=C[0];d=C[1];if(isNaN(d)||isNaN(a)){continue;}v++;if(v===1){i=a;p=a;q=d;u=d;}else{if(a<i){i=a;}if(a>p){p=a;}if(d<q){q=d;}if(d>u){u=d;}}t.minLon=i;t.maxLon=p;t.minLat=q;t.maxLat=u;var B=new sap.m.Button({text:T});var D=new sap.m.Button({icon:"sap-icon://map",type:sap.m.ButtonType.Emphasized});var E=new sap.ui.layout.HorizontalLayout({content:[D,B]});s=new sap.ui.vbm.Container({position:a+';'+d+';0',item:E,alignment:6});h.addItem(s);}t.iNrLocations=n;return h;},loadObjects:function(c){var t=this;var s=t.getSpotList();L.debug("++++++");L.debug("number of locations: "+t.iNrLocations);t.myMap.removeAllVos();t.myMap.addVo(s);t.centerMap();var p=S.prototype.parseUrlParameters();for(var a in p){if(a==='box'&&p[a]!=="false"){t.showBoundariesAndCenter();}}},centerMap:function(){var t=this;t.centerLon=t.minLon+(t.maxLon-t.minLon)/2;t.centerLat=t.minLat+(t.maxLat-t.minLat)/2;L.debug("centerMap() returns: centerLat, centerLon: "+t.centerLat+";"+t.centerLon);t.myMap.setCenterPosition(t.centerLon+";"+t.centerLat);},setVisualFrame:function(){var t=this;var v={};v.minLon=t.minLon*0.5;v.maxLon=t.maxLon*1.2;v.minLat=t.minLat*0.8;v.maxLat=t.maxLat*1.2;t.myMap.setVisualFrame(v);},showBoundariesAndCenter:function(){var t=this;var c=new sap.ui.vbm.Spots({items:[new sap.ui.vbm.Spot({type:"Error",text:"center",position:(t.centerLon+" ;  "+t.centerLat+";0")}),new sap.ui.vbm.Spot({type:"Error",text:"TLeft",position:(t.minLon+" ;  "+t.maxLat+";0")}),new sap.ui.vbm.Spot({type:"Error",text:"TRight",position:(t.maxLon+" ;  "+t.maxLat+";0")}),new sap.ui.vbm.Spot({type:"Error",text:"BLeft",position:(t.minLon+" ;  "+t.minLat+";0")}),new sap.ui.vbm.Spot({type:"Error",text:"BRight",position:(t.maxLon+" ;  "+t.minLat+";0")})]});t.myMap.addVo(c);},zoomChanged:function(e){var v=e.getParameter('viewportBB');var z=e.getParameter('zoomLevel');L.debug('zoomLevel ',z,'LatLonDiff:',this.getLatLonDiff(v));},centerChanged:function(e){var c=e.getParameter('centerPoint');L.debug('centerPoint: '+c);},setZoomLevelAfterRendering:function(){var t=this;var i=$(".sapUshellSearchResultMap")[0].id;var s=$("#"+i).width();s=s*0.8;var K=this.getDistanceFromLatLonInKm(this.minLat,this.minLon,this.maxLat,this.maxLon);L.debug('iScreenWidth for zoomLevel calc: '+s);var z=this.calculateZoomLevel(s,K);z=z-1;if(K>599&&K<701){z=6;}if(this.iNrLocations===1||K<2){z=9;}window.setTimeout(function(){t.myMap.setZoomlevel(z);},200);},setZoomLevelAfterRenderingOld:function(s){var t=this;var K=this.getDistanceFromLatLonInKm(this.minLat,this.minLon,this.maxLat,this.maxLon);K=Math.floor(K);L.debug("BOX minLat, minLon, maxLat, maxLon: ",this.minLat,this.minLon,this.maxLat,this.maxLon);L.debug('iKm for zoomLevel calc: '+K);L.debug('iScreenWidth for zoomLevel calc: '+s);var z=this.calculateZoomLevel(s,K);if(z>7){}if(this.iNrLocations===1){this.getAggregation('_map').setZoomlevel(9);}else{window.setTimeout(function(){t.myMap.setZoomlevel(z);},200);}},resizeMap:function(e){var h=$(".sapUshellSearchResultMap").parent().parent().parent().css("height");h=parseInt(h,10);h=0.85*h;h=""+h+"px";$(".sapUshellSearchResultMap").css("height",h);$(".sapUshellSearchResultMap").css("vertical-align","middle");},onAfterRendering:function(e){var t=this;t.resizeMap();t.centerMap();window.onresize=t.resizeMap;t.setZoomLevelAfterRendering();}});});
