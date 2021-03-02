sap.ui.define(["sap/ui/core/Control","sap/ui/model/Sorter","sap/ui/model/analytics/odata4analytics","sap/suite/ui/generic/template/AnalyticalListPage/util/FilterUtil","sap/ui/core/format/NumberFormat","sap/suite/ui/generic/template/AnalyticalListPage/util/V4Terms","sap/ui/core/format/DateFormat","sap/base/Log","sap/suite/ui/generic/template/AnalyticalListPage/util/AnnotationHelper","sap/suite/ui/generic/template/AnalyticalListPage/util/CriticalityUtil"],function(C,S,d,F,N,v,D,L,A,c){"use strict";var f="Donut";var g="Line";var h="Bar";var I="__IS_OTHER__";var j=C.extend("sap.suite.ui.generic.template.AnalyticalListPage.control.visualfilterbar.FilterItemMicroChart",{metadata:{properties:{selectFilters:{type:"any",group:"Misc",defaultValue:null},filterRestriction:{type:"string",group:"Misc",defaultValue:null},entitySet:{type:"string",group:"Misc",defaultValue:null},lazyLoadVisualFilter:{type:"boolean",group:"Misc",defaultValue:false},dimensionField:{type:"string",group:"Misc",defaultValue:null},dimensionFieldIsDateTime:{type:"boolean",group:"Misc",defaultValue:false},dimensionFieldIsDateTimeOffset:{type:"boolean",group:"Misc",defaultValue:false},dimensionFieldDisplay:{type:"string",group:"Misc",defaultValue:null},dimensionFilter:{type:"any",group:"Misc",defaultValue:null},dimensionFilterExternal:{type:"sap.ui.model.Filter",group:"Misc",defaultValue:null},measureField:{type:"string",group:"Misc",defaultValue:null},unitField:{type:"string",group:"Misc",defaultValue:null},isCurrency:{type:"boolean",group:"Misc",defaultValue:false},isMandatory:{type:"boolean",group:"Misc",defaultValue:false},isDropDown:{type:"boolean",group:"Misc",defaultValue:false},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},title:{type:"string",group:"Misc",defaultValue:""},outParameter:{type:"string",group:"Misc",defaultValue:null},inParameters:{type:"object[]",group:"Misc",defaultValue:null},parentProperty:{type:"string",group:"Misc",defaultValue:null},sortOrder:{type:"object[]",group:"Misc",defaultValue:null},scaleFactor:{type:"string",group:"Misc",defaultValue:null},numberOfFractionalDigits:{type:"string",group:"Misc",defaultValue:null},textArrangement:{type:"string",group:"Misc",defaultValue:sap.ui.comp.smartfilterbar.DisplayBehaviour.descriptionAndId},chartQualifier:{type:"string",group:"Misc",defaultValue:null},smartFilterId:{type:"string",group:"Misc",defaultValue:null}},aggregations:{control:{type:"sap.ui5.controls.microchart",multiple:false}},events:{filterChange:{},titleChange:{},beforeRebindVisualFilter:{}}},renderer:function(r,o){r.write("<div");r.writeControlData(o);r.writeClasses();r.addStyle("width","100%");jQuery(document.body).hasClass("sapUiSizeCozy")?r.addStyle("height","9.9rem"):r.addStyle("height","7.9rem");r.writeStyles();r.write(">");r.renderControl(o.getAggregation("control"));r.write("</div>");}});j.prototype._formattingId="__UI5__ShortIntegerMaxFraction2";j.prototype._maxFractionalDigits=2;j.prototype._maxFractionalDigitsValsLessThanZero=7;j.prototype._minFractionalDigits=0;j.prototype._shortRefNumber;j.prototype._isTriggeredBySync=false;j.prototype._multiUnit=false;j.prototype.technicalIssueMessage="TECHNICAL_ISSUES_OVERLAY_MESSAGE";j.prototype.noDataIssueMessage="NO_DATA_FOUND_OVERLAY_MESSAGE";j.prototype.requiredFilterMessage="REQUIRED_FIELDS_OVERLAY_MESSAGE";j.prototype.multipleCurrencyMessage="MULTIPLE_CURRENCY_OVERLAY_MESSAGE";j.prototype.multipleUnitMessage="MULTIPLE_UNIT_OVERLAY_MESSAGE";j.prototype.hiddenMeasureMessage="HIDDEN_MEASURE_OVERLAY_MESSAGE";j.prototype.invalidMeasureForDonutMessage="INVALID_MEASURE_DONUT_MESSAGE";j.prototype.valuehelpAllMandatoryFilters={};j.prototype.oDataQueryOptions=["$select","$top","$expand","$inlinecount","$orderby","$filter","$skip","$format"];j.prototype.init=function(){this._bAllowBindingUpdateOnPropertyChange=false;this._attachChartEvents();};j.prototype._attachChartEvents=function(){var m=this;this._chart.addEventDelegate({onAfterRendering:function(){if(m._getChartAggregations().length){if(m._multiUnit){m.applyOverlay(m.getIsCurrency()?m.multipleCurrencyMessage:m.multipleUnitMessage);if(m.data("isDialogFilterItem")==="true"){F._updateVisualFilterAria(m.getParent().getParent());}}}}});this._chart.attachSelectionChanged(this._onSelectionChanged,this);};j.prototype._getCurrentSelectedChart=function(r){if(this._chart.getPoints){return r?g:"point";}else if(this._chart.getSegments){return r?f:"segment";}else if(this._chart.getBars){return r?h:"bar";}};j.prototype._getCustomData=function(e){var s=this._getCurrentSelectedChart();var a=(s)?e.getParameter(s):undefined;if(s&&a){var b=a.getCustomData(),V=b[0].getValue();if(V instanceof Date){V=(this.getDimensionFieldIsDateTimeOffset())?V:F.convertLocalDatetoUTCDate(V);}var i={dimValue:V,dimValueDisplay:a.getLabel()};return i;}};j.prototype._getEntityParameters=function(m,e){var a={};if(this.getSmartFilterId()){var s=sap.ui.getCore().byId(this.getSmartFilterId());var b=A.resolveParameterStringValue(this.getSelectFilters()&&this.getSelectFilters().Parameters);var o=s.getEntitySet()===e?s.getAnalyticalParameters():[];var i=this.getSelectFilters()&&this.getSelectFilters().SelectOptions;var k=this.checkSearchable(m,e,s,b,i);if(!k){this.applyOverlay(this.requiredFilterMessage);return;}if(b){b.forEach(function(p){a[p.PropertyName.PropertyPath]=p.PropertyValue.String;});}if(o){var l=s.getFilterData(true);var n=JSON.parse(s.data('dateFormatSettings'));o.forEach(function(p){var V=l["$Parameter."+p.name];if(V){if(p.type==="Edm.Time"&&V instanceof Date){if(n&&!n.UTC){V=new Date(V.valueOf()+V.getTimezoneOffset()*60*1000);}V={__edmType:"Edm.Time",ms:(((V.getHours()*60)+V.getMinutes())*60+V.getSeconds())*1000+V.getMilliseconds()};}else if(n&&n.UTC&&V instanceof Date){V=this._getDateInUTCOffset(V);}a[p.name]=V;}}.bind(this));}return a;}return;};j.prototype._executeRebindVisualFilterExtension=function(e,a,m,b,E){var o={sEntityType:e,sDimension:a,sMeasure:m,oContext:{filters:b,queryParameters:{},sorters:this._sorters,entityParameters:E,groupId:undefined}};this.fireBeforeRebindVisualFilter(o);return o.oContext;};j.prototype._onSelectionChanged=function(e){var s=this.getFilterRestriction(),o=this._getCustomData(e),b=e.getParameter("selected"),a=(s==="single"&&o.dimValue===I&&b);if(o.dimValue===I&&b&&this.getIsDropDown()){e.getParameter("segment").setSelected(false);return;}if(a){e.getParameter("segment").setSelected(false);}if(b&&o.dimValue===I&&s==="multiple"||(b&&o.dimValue!==I)){this._onChartSelectData(e);}else if(!b){this._onChartDeselectData(e);}};j.prototype._onChartSelectData=function(e){var o,s=this.getFilterRestriction();if(s==="multiple"){o=jQuery.extend(true,{items:[],ranges:[],value:null},this.getDimensionFilter());var a=this._getCustomData(e),b=this._getCurrentSelectedChart(true);if(b===f){o=this._applyDonutChartSelections(a,o);}else if(a.dimValue instanceof Date){o.ranges.push({exclude:false,keyField:this.getDimensionField(),operation:"EQ",value1:a.dimValue,value2:null});}else{o.items.push({key:a.dimValue,text:a.dimValueDisplay});}}else{o=this.getDimensionFilter();if(o){o=null;var i=e.getParameter("bar")||e.getParameter("point")||e.getParameter("segment");this._setSelectedAggregation(i);i.setSelected(true);}var a=this._getCustomData(e);o=a.dimValue;}this.setDimensionFilter(o);this.fireFilterChange();};j.prototype._setSelectedAggregation=function(s){var a=this._chart.setSelectedBars||this._chart.setSelectedPoints||this._chart.setSelectedSegments;a.call(this._chart,s);};j.prototype._getChartAggregations=function(){var a=this._chart.getPoints||this._chart.getSegments||this._chart.getBars;return a.call(this._chart);};j.prototype._onChartDeselectData=function(e){var m=this;var o,s=this.getFilterRestriction(),a=this._getCustomData(e),u=[],U=[];if(s==="single"){o=null;}else{o=jQuery.extend(true,{},this.getDimensionFilter());var b=(o&&o.items)?o.items:undefined,i=(o&&o.ranges)?o.ranges:undefined,k=(o&&o.value)?o.value:null;if(b){b.forEach(function(l){var E=F.getResolvedDimensionValue(l.key),n=F.getResolvedDimensionValue(a.dimValue);if(E!==n){u.push(l);}});}o.items=u;if(k){if(a.dimValue===k){o.value=null;}}if(i){i.forEach(function(l){if(l.operation==="EQ"&&a.dimValue!==I&&l.exclude){U.push(l);}else if(l.operation==="EQ"&&!l.exclude){if(l.value1 instanceof Date&&a.dimValue instanceof Date){if(m.getDimensionFieldIsDateTimeOffset()){if(F.getDateTimeInMedium(l.value1)!==F.getDateTimeInMedium(a.dimValue)){U.push(l);}}else if(F.getDateInMedium(l.value1)!==F.getDateInMedium(a.dimValue)){U.push(l);}}else if(typeof l.value1==="string"&&a.dimValue instanceof Date){if(F.getDateTimeInMedium(new Date(l.value1))!==F.getDateTimeInMedium(a.dimValue)){U.push(l);}}else if(l.value1!==a.dimValue){U.push(l);}}else if(l.operation!=="EQ"&&!l.exclude&&l.value1!==a.dimValue){U.push(l);}});}o.ranges=U;}this.setDimensionFilter(o);this.fireFilterChange();};j.prototype._updateBinding=function(){if(F.isVisualFilterLazyLoaded(this)){return;}this.applyOverlay();this._chart.setBusyIndicatorDelay(0);this._chart.setBusy(true);var s=this._getCurrentSelectedChart(true);var i=s===f;if(s===g){this._chart.unbindPoints();}else if(s===h){this._chart.unbindBars();}else if(i){this._chart.unbindSegments();}var e=this.getEntitySet(),a=this.getDimensionField(),b=this.getDimensionFieldDisplay(),m=this.getMeasureField(),u=this.getUnitField(),k=this.getDimensionFilterExternal(),l=[],n=this.getSortOrder(),M=this.getModel(),o=M.getMetaModel(),p=this._getSorter(n);this._sorters=p.sorter;l=p.sortFields;if(!e||!m||!a||!b){return;}if(this._determineHiddenVisualFilter(o,e,m)){this.applyOverlay(this.hiddenMeasureMessage);return;}if(i){if(this._determineIfInvalidMeasure(o,e,m)){this.applyOverlay(this.invalidMeasureForDonutMessage);return;}}var q=[m,a],r=F.IsNavigationProperty(this.getModel(),e,b)?b.split("/")[0]:null,t=F.getKeysForNavigationEntitySet(o,this.getEntitySet(),r),q=F.getVisualFilterSelectFields(m,a,b,u,l,t);var w=(i&&this._inParameterFilterList&&this._inParameterFilterList.aFilters&&this._inParameterFilterList.aFilters.length)?[this._inParameterFilterList]:[];var x=[];if(k&&k.aFilters&&k.aFilters.length>0){x=[k];}var y=this;var z=(!i)&&this.getFixedCount();var M=this.getModel(),V=this.getModel("visualFilter")||M;var E=this._getEntityParameters(M,e);if(!(E instanceof Object)){return;}var B=this._executeRebindVisualFilterExtension(e,a,m,x,E),G=B.groupId,H="/"+e;if(M){var J=c.getDataPoint(M,this);if(J){(J.ValueFormat&&J.ValueFormat.ScaleFactor)?this.setScaleFactor(F.getPrimitiveValue(J.ValueFormat.ScaleFactor)):this.setScaleFactor(null);(J.ValueFormat&&J.ValueFormat.NumberOfFractionalDigits)?this.setNumberOfFractionalDigits(F.getPrimitiveValue(J.ValueFormat.NumberOfFractionalDigits)):this.setNumberOfFractionalDigits(null);var R=c.getCriticalityRefProperties(J);}H=this._getBindingPathforVisualFilter(M,e,E);if(!H){return;}if(this._oObject){this._oObject.abort();}if(this._oTop4ReadObject){this._oTop4ReadObject.abort();}if(this._oTotalReadObject){this._oTotalReadObject.abort();}var U={};var K={async:true,filters:x,urlParameters:U};if(G){K.groupId=G;}if(!i){jQuery.extend(K,{sorters:this._sorters,success:function(P,Q){y._oObject=null;P=J?c.CalculateCriticality(J,P,y.getMeasureField()):P;y._onDataReceived(P);},error:function(P){L.error("Error reading URL:"+P);if(P&&P.statusCode!==0&&P.statusText!=="abort"){y.applyOverlay(y.technicalIssueMessage);y._oObject=null;}}});this._updateBindingInfo(K,q,R,z,B,r,i);this._fetchData(V,H,K,i);}else{this._updateBindingInfo(K,[m],R,1,B,r,i,true,w);var T=this._fetchData(V,H,K,i,true,J);K.filters=x;this._updateBindingInfo(K,q,R,4,B,r,i,false);var O=this._fetchData(V,H,K,i,false,J);jQuery.when(O,T).then(function(P,Q){if(!P[1]){y.applyOverlay(y.noDataIssueMessage);}else if(P[1]<=3){y._onDataReceived(P[0]);}else if(P[1]>3){if(Q[1]){y._onDataReceived(P[0],Q[0]);}else{y.applyOverlay(y.noDataIssueMessage);}}},function(P,Q){if(!P||(P.statusCode!==0&&P.statusText!=="abort")){if(Q===true){y._oTotalReadObject=null;}else{y._oTop4ReadObject=null;}y.applyOverlay(y.technicalIssueMessage);}});}}};j.prototype._updateBindingInfo=function(o,s,r,a,e,n,i,t,b){o.urlParameters={"$select":r?[r].concat(s).join(","):s.join(","),"$top":a};if(Object.keys(e.queryParameters).length>0){Object.keys(e.queryParameters).forEach(function(k){if(this.oDataQueryOptions.indexOf(k)<0){o.urlParameters[k]=e.queryParameters[k];}}.bind(this));}if(i?(n&&!t):n){jQuery.extend(o.urlParameters,{"$expand":n});}if(i&&(!t)){o.sorters=this._sorters;}else if(i&&t){o.filters=b;}};j.prototype._fetchData=function(V,b,o,i,t,a){var m=this;if(i){var e=new jQuery.Deferred();if(!V){e.reject(null,t);return e.promise();}o.success=function(k,r){if(t===true){m._oTotalReadObject=null;}else{m._oTop4ReadObject=null;}k=a?c.CalculateCriticality(a,k,m.getMeasureField()):k;var l=(k&&k.results&&k.results.length)?k.results.length:0;e.resolve(k,l);};o.error=function(k,t){e.reject(k,t);};if(t){this._oTotalReadObject=V.read(b,o);}else{this._oTop4ReadObject=V.read(b,o);}return e.promise();}this._oObject=V.read(b,o);};j.prototype._getSorter=function(s){var a=[],b=[],e=[];for(var i=0;i<s.length;i++){a[i]=s[i].Field.String;b[i]=s[i].Descending.Boolean;e.push(new S(a[i],b[i]));}var o={sorter:e,sortFields:a};return o;};j.prototype._getNumberFormatter=function(s){var a=N.getIntegerInstance({style:"short",showScale:false,shortRefNumber:s});return a;};j.prototype.setWidth=function(w){this.setProperty("width",w);};j.prototype.setHeight=function(a){this.setProperty("height",a);};j.prototype.setEntitySet=function(e){this.setProperty("entitySet",e);};j.prototype.setDimensionField=function(a){this.setProperty("dimensionField",a);};j.prototype.setDimensionFieldIsDateTime=function(a){this.setProperty("dimensionFieldIsDateTime",a);};j.prototype.setDimensionFieldDisplay=function(a){this.setProperty("dimensionFieldDisplay",a);};j.prototype.setMeasureField=function(m){if(m&&m.constructor===Object){if(m.value){this.setProperty("measureField",m.value);}if(m.bUpdateBinding){this._updateBinding();}}else if(m&&m.constructor===Array){this.setProperty("measureField",m);}else{this.setProperty("measureField",m);}};j.prototype.setUnitField=function(u){this.setProperty("unitField",u);};j.prototype.setSortOrder=function(s){if(s&&s.constructor===Object){if(s.value){this.setProperty("sortOrder",s.value);}if(s.bUpdateBinding){this._updateBinding();}}else if(s&&s.constructor===Array){this.setProperty("sortOrder",s);}else{this.setProperty("sortOrder",s);}};j.prototype.setDimensionFilterExternal=function(a){this.setProperty("dimensionFilterExternal",a);if(this._bAllowBindingUpdateOnPropertyChange){this._updateBinding();}};j.prototype.getP13NConfig=function(){var p=["width","height","filterRestriction","isDropDown","sortOrder","measureField","scaleFactor","numberOfFractionalDigits","chartQualifier","entitySet","dimensionField","dimensionFieldDisplay","dimensionFieldIsDateTime","dimensionFilter","unitField","isCurrency","isMandatory","outParameter","inParameters","parentProperty"];var o={};for(var i=0;i<p.length;i++){var n=p[i];o[n]=this.getProperty(n);if((n=="outParameter"||n=="inParameters")&&o[n]==""){o[n]=undefined;}}return o;};j.prototype.setDimensionFilter=function(a,i){this.setProperty("dimensionFilter",a);};j.prototype._onDataReceived=function(a){if(!a){return;}this.data("sOverlay","none");if(!this.getParent()){this.data("needsToUpdateAria","true");}else{this.data("needsToUpdateAria","false");if(this.data("isDialogFilterItem")==="true"){F._updateVisualFilterAria(this.getParent().getParent());}}this._determineUnit(a);this._getShortRefNumber(a.slice(0));};j.prototype._determineUnit=function(a){this._multiUnit=false;var u=this.getUnitField();if(u){var p=a[0][u];for(var i=1;i<a.length;i++){if(a[i].dimensionValue!==I){var b=a[i][u];}if(b!=p){if(a.length>1){this._multiUnit=true;}break;}p=b;}this._applyUnitValue(this._multiUnit?"":p);}else{this._applyUnitValue("");}};j.prototype._applyUnitValue=function(a){if(this._lastUnitValue!=a){this._lastUnitValue=a;this.fireTitleChange();}};j.prototype._getShortRefNumber=function(o){this._scaleValue="";this._shortRefNumber=undefined;var s=this.getScaleFactor(),a;if(!s){var b=this._getScaleFactorFromMedian(o);s=b.iShortRefNumber;a=b.scale;}else{var e=this._getNumberFormatter(s);a=e.getScale()?e.getScale():"";}this._shortRefNumber=s;this._scaleValue=a;this.fireTitleChange();};j.prototype._getScaleFactorFromMedian=function(o){var m=this.getMeasureField();o.sort(function(a,b){if(Number(a[m])<Number(b[m])){return-1;}if(Number(a[m])>Number(b[m])){return 1;}return 0;});var M=o.length/2,e=M%1===0?(parseFloat(o[M-1][m])+parseFloat(o[M][m]))/2:parseFloat(o[Math.floor(M)][m]),k=e,s;for(var i=0;i<14;i++){s=Math.pow(10,i);if(Math.round(Math.abs(k)/s)<10){break;}}var l=this._getNumberFormatter(s);for(var i=0;i<o.length;i++){var n=o[i],p=l.format(n[m]),q=p.split(".");if((!q[1]&&parseInt(q[0],10)===0)||(q[1]&&parseInt(q[0],10)===0&&q[1].indexOf('0')===0)||(p/1000)>=1000){s=undefined;break;}}return{iShortRefNumber:s,scale:s?l.getScale():""};};j.prototype._getScaleFactor=function(a){var a=parseFloat(a);var p=this._minFractionalDigits;for(var i=0;i<14;i++){var s=Math.pow(10,i);if(Math.round(Math.abs(a)/s,p-1)<10){return s;}}return undefined;};j.prototype.getTitle=function(){var m=this.getModel();if(!m){return"";}var a=F.getPropertyNameDisplay(m,this.getEntitySet(),this.getMeasureField());var b=F.getPropertyNameDisplay(m,this.getEntitySet(),this.getDimensionField());var u=this._lastUnitValue?this._lastUnitValue:"";var s=this._scaleValue?this._scaleValue:"";var i=this.getModel("i18n");if(!i){return"";}var r=i.getResourceBundle();var t=r.getText("VIS_FILTER_TITLE_MD",[a,b]);var e=s+" "+u;e=e.trim();e=e.indexOf("%")>-1?"":e;var k={titleMD:t,titleUnitCurr:e};return k;};j.prototype.getFormattedNumber=function(a,s){var n=this.getNumberOfFractionalDigits();if(n===""||n===undefined){n="1";}else{if(Number(n)>1){n="1";}}var b=N.getFloatInstance({style:"short",decimals:Number(n),showScale:s,shortRefNumber:this._shortRefNumber,minFractionDigits:this._minFractionalDigits,maxFractionDigits:this._maxFractionalDigits});return b.format(parseFloat(a));};j.prototype._getFormattedNumberWithUoM=function(a,U){U=(U)?U:"";var l=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();var b=N.getFloatInstance({maxFractionDigits:2,groupingEnabled:true},l).format(a);return(U==="%")?b+"%":b+" "+U;};j.prototype._getDisplayedValue=function(a,u){var s=(this._scaleValue===""),n=this.getFormattedNumber(a,s),i=(u==="%");return(i)?n+"%":""+n;};j.prototype._getToolTip=function(a,b,u,e){var i=this.getModel("i18n");if(!i){return"";}var r=i.getResourceBundle();var s=r.getText("VIS_FILTER_TOOLTIP_STATUS");var n=this._getFormattedNumberWithUoM(b,u);if(e==="Neutral"){return a+" "+n;}else{return a+" "+n+"\n"+s+" : "+e;}};j.prototype._getSelected=function(o,s){var b=false,a=this.getFilterRestriction(),e=[];if(o){if(a==='multiple'){if(o.items){o.items.forEach(function(l){var m=F.getResolvedDimensionValue(l.key),n=F.getResolvedDimensionValue(s);if(m===n){b=true;}});}if(o.value&&o.value===s){b=true;return b;}if(o.ranges){for(var i=0;i<o.ranges.length;i++){var r=o.ranges[i];if((r.operation==="EQ"||r.operation==='Empty')&&(r.value1||r.value1==="")&&!r.exclude){if(r.value1 instanceof Date&&s instanceof Date){if(this.getDimensionFieldIsDateTimeOffset()){if(F.getDateTimeInMedium(r.value1)===F.getDateTimeInMedium(s)){b=true;break;}}else if(F.getDateInMedium(r.value1)===F.getDateInMedium(s)){b=true;break;}}else if(r.value1===s||this._isDateTimeFieldSelected(r.value1,s)){b=true;break;}}else if(r.exclude&&(r.operation==='EQ'||r.operation==='Empty')){e.push(r.value1);}}if(e.length===2&&s===I){var V=0,k=this._chart.getSegments();k.forEach(function(l){var m=l.getCustomData()[0].getValue();if(e.indexOf(m)>-1){V++;}});if(V===2){b=true;}}}}else if(o instanceof Date&&s instanceof Date){if(this.getDimensionFieldIsDateTimeOffset()){if(F.getDateTimeInMedium(o)===F.getDateTimeInMedium(s)){b=true;}}else if(F.getDateInMedium(o)===F.getDateInMedium(s)){b=true;}}else if(o&&o===s){b=true;}else if(this._isDateTimeFieldSelected(o,s)){b=true;}}return b;};j.prototype._isDateTimeFieldSelected=function(o,s){if(this.getDimensionFieldIsDateTime()){if(typeof o==="string"&&s instanceof Date){if(F.getDateInMedium(new Date(o))===F.getDateInMedium(s)){return true;}}else if(o instanceof Date&&typeof s==="string"){var a=D.getDateInstance({pattern:"yyyyMMdd"});var b=a.parse(s);if(F.getDateInMedium(b)===F.getDateInMedium(o)){return true;}}}else if(this.getDimensionFieldIsDateTimeOffset()){if(typeof o==="string"&&s instanceof Date){if(F.getDateTimeInMedium(new Date(o))===F.getDateTimeInMedium(s)){return true;}}}return false;};j.prototype._getLabel=function(o,s){if(this.getDimensionFieldIsDateTime()){if(o instanceof Date){return F.getDateInMedium(F.convertLocalDatetoUTCDate(o));}else if(this._isStringDateType()){return F.formatStringDate(o,s||"");}else{return o;}}else if(this.getDimensionFieldIsDateTimeOffset()){return F.getDateTimeInMedium(o);}else{var t=this.getTextArrangement();return F.getTextArrangement(o,s,t);}};j.prototype._getChartAggregationSettings=function(i){var s=sap.ui.getCore().byId(this.getSmartFilterId());var a=i?'dimensionValue':this.getDimensionField(),b=this.getDimensionFieldDisplay(),m=this.getMeasureField(),u=this.getUnitField(),l=(a===b)?[b]:[b,a],t=(a===b)?[b,m,""]:[b,m,a],U=u?t.push(u):t,e=this,o={label:{parts:l,formatter:function(k,a){return e._getLabel(k,a);}},value:{path:m,formatter:function(k){return parseFloat(k);}},color:"{color}",displayedValue:{parts:[m,u],formatter:function(k,n){return e._getDisplayedValue(k,n);}},tooltip:{parts:U.constructor===Array?U:t,formatter:function(k,n,a,p){k=k||k===""||k===0?k:"";a=a||a===""||a===0?a:"";a=a.constructor===Object?"":a;k=e._getLabel(k,a);return e._getToolTip(k,n,p,this.getColor());}},selected:{parts:s.isDialogOpen()?["_dialogFilter>/"+e.getParentProperty(),a]:["_filter>/"+e.getParentProperty(),a],formatter:function(k,n){if(n instanceof Date){n=e.getDimensionFieldIsDateTimeOffset()?n:F.convertLocalDatetoUTCDate(n);}return e._getSelected(k,n);}},customData:{Type:"sap.ui.core.CustomData",key:a,value:"{"+a+"}"}};return o;};j.prototype.applyOverlay=function(i){var p=this.data("sPath");if(p){var s=p+"/showChartOverlay";var a=this.getModel('_visualFilterDialogModel')?this.getModel('_visualFilterDialogModel'):this.getModel('_visualFilterConfigModel');a.setProperty(s,(i?true:false));if(i){var o=p+"/overlayMessage";a.setProperty(o,i);this.data("sOverlay","true");if(this.data("isDialogFilterItem")==="true"){this.data("needsToUpdateAria","true");}this.fireTitleChange();}}};j.prototype.considerAnalyticBinding=function(b,s){if(s&&s.getAnalyticBindingPath&&s.getConsiderAnalyticalParameters()){try{var a=s.getAnalyticBindingPath();if(a){return a;}}catch(e){L.warning("Mandatory parameters have no values","","AnalyticalListPage");}}return b;};j.prototype._getBindingPathforVisualFilter=function(o,e,E){var p="";var a=new d.Model(d.Model.ReferenceByModel(o));var q=a.findQueryResultByName(e);var b=new d.QueryResultRequest(q);var i=q&&q.getParameterization();if(i){b.setParameterizationRequest(new d.ParameterizationRequest(i));if(E){Object.keys(E).forEach(function(K){b.getParameterizationRequest().setParameterValue(K,E[K]);});}}try{p=b.getURIToQueryResultEntitySet();}catch(k){q=b.getQueryResult();p="/"+q.getEntitySet().getQName();L.error("getEntitySetPathWithParameters","binding path with parameters failed - "+k||k.message);}return p;};j.prototype.checkSearchable=function(o,e,s,p,a){var b=new d.Model(d.Model.ReferenceByModel(o));var q=b.findQueryResultByName(e);var i=q&&q.getParameterization(),k=[],l=true;if(i){var m=[];var n=i.getAllParameters();for(var r in n){if(!n[r].isOptional()){m.push(n[r].getName());}}m.forEach(function(P){p&&p.forEach(function(x){if(x.PropertyName.PropertyPath===P&&x.PropertyValue.String){k.push("$Parameter."+x.PropertyName.PropertyPath);}});});j.prototype.requiredFilterMessage="REQUIRED_VH_FIELDS_OVERLAY_MESSAGE";if(s.getEntitySet()===e){j.prototype.requiredFilterMessage="REQUIRED_FIELDS_OVERLAY_MESSAGE";var t=s.getFilterData(true);m.forEach(function(P){if(t["$Parameter."+P]&&k.indexOf("$Parameter."+P)<0){k.push("$Parameter."+P);}});}if(m.length!==k.length){l=false;return l;}}if(s.getEntitySet()===e){j.prototype.requiredFilterMessage="REQUIRED_FIELDS_OVERLAY_MESSAGE";var u=s.determineMandatoryFilterItems();var u=u.filter(function(x){return!x._bIsParameter;});l=u.every(function(x){return F.checkFilterHasValueFromSelectionVariantOrSmartFilterBar(x.getName(),x.getName(),a,s);});}else{j.prototype.requiredFilterMessage="REQUIRED_VH_FIELDS_OVERLAY_MESSAGE";var w;if(!j.prototype.valuehelpAllMandatoryFilters[e]){j.prototype.valuehelpAllMandatoryFilters[e]=F.getAllMandatoryFilters(o,e);}w=F.getAllMandatoryFiltersMapping(j.prototype.valuehelpAllMandatoryFilters[e],this.getInParameters());l=w.aMappedFilterList.every(function(x){return F.checkFilterHasValueFromSelectionVariantOrSmartFilterBar(x.valueListProperty,x.localDataProperty,a,s);});if(!l){return l;}l=w.aMappingMissingFilterList.every(function(x){var H=a&&F.checkFilterHasValueFromSelectionVariant(a,x);return H;});}return l;};j.prototype._getDateInUTCOffset=function(o){return new Date(o.valueOf()-o.getTimezoneOffset()*60*1000);};j.prototype._isStringDateType=function(){var o=this.getCustomData();var s=false;o.forEach(function(a){if(a.getKey()=='stringdate'){s=a.getValue();}});return s;};j.prototype._determineHiddenVisualFilter=function(m,e,a){var M=this._getMeasureProperty(m,e,a);if(M[v.Hidden]&&M[v.Hidden].Bool==="true"){return true;}};j.prototype._determineIfInvalidMeasure=function(m,e,a){var M=this._getMeasureProperty(m,e,a);if(M["com.sap.vocabularies.Analytics.v1.AccumulativeMeasure"]&&M["com.sap.vocabularies.Analytics.v1.AccumulativeMeasure"].Bool==="false"){return true;}return false;};j.prototype._getMeasureProperty=function(m,e,a){var E=m.getODataEntityType(m.getODataEntitySet(e).entityType);var p=m.getODataProperty(E,a);return p;};return j;},true);
