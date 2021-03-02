/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/comp/library','sap/m/library','sap/base/util/merge'],function(C,M,m){"use strict";var c=C.personalization.ChangeType;var A=C.personalization.AggregationRole;var T=C.personalization.TableType;var d=C.personalization.ColumnType;var U={getColumnKeys:function(a){if(!a||!a.length){return[];}return a.map(function(o){return this.getColumnKey(o);},this);},sortItemsByText:function(i,k){var l;try{var l=sap.ui.getCore().getConfiguration().getLocale().toString();if(typeof window.Intl!=='undefined'){var o=window.Intl.Collator(l,{numeric:true});i.sort(function(a,b){return o.compare(a[k],b[k]);});}else{i.sort(function(a,b){return a[k].localeCompare(b[k],l,{numeric:true});});}}catch(e){}},getUnionOfAttribute:function(s,a){var u=[];var f=function(b){if(u.indexOf(b)<0){u.push(b);}};for(var n in s){var N=s[n];if(!N[a]){continue;}N[a].forEach(f);}return u;},getUnionOfColumnKeys:function(j){var u=[];var f=function(I){u=u.concat(I.map(function(o){return o.columnKey;}));u=u.filter(function(s,a){return u.indexOf(s)===a;});};for(var t in j){for(var i in j[t]){if(!Array.isArray(j[t][i])){continue;}f(j[t][i]);}}return u;},copy:function(o){if(o instanceof Array){return jQuery.extend(true,[],o);}else{return jQuery.extend(true,{},o);}},sort:function(k,e){var r=this.copy(e);r.sort(function(a,b){var t=a[k].toLocaleLowerCase();var f=b[k].toLocaleLowerCase();if(t<f){return-1;}if(t>f){return 1;}return 0;});return r;},removeEmptyProperty:function(j){for(var t in j){if(j[t]===null||j[t]===undefined){delete j[t];}}return j;},semanticEqual:function(i,I){if(!i||!I){return false;}for(var p in i){if(i[p]!==I[p]){return false;}}return true;},hasChangedType:function(o){for(var t in o){if(o[t]===c.ModelChanged||o[t]===c.TableChanged){return true;}}return false;},isNamespaceChanged:function(o,n){if(o[n]){return o[n]===c.ModelChanged||o[n]===c.TableChanged;}return false;},createArrayFromString:function(e){if(!e){return[];}var E=[];var r=e.split(",");r.forEach(function(f){if(f!==""){E.push(f.trim());}});return E;},getIndexByKey:function(k,K,a){if(!a||!a.length){return-1;}var I=-1;a.some(function(e,i){if(e[k]!==undefined&&e[k]===K){I=i;return true;}});return I;},getColumnKey:function(o){return this._getCustomProperty(o,"columnKey")||o.getId();},getColumnType:function(o){return this._getCustomProperty(o,"type");},hasSortableColumns:function(o){for(var s in o){if(U.isSortable(o[s])){return true;}}return false;},hasGroupableColumns:function(o){for(var s in o){if(U.isGroupable(o[s])){return true;}}return false;},hasFilterableColumns:function(o){for(var s in o){if(U.isFilterable(o[s])){return true;}}return false;},hasAggregatableColumns:function(o){for(var s in o){if(U.isAggregatable(o[s])){return true;}}return false;},isGroupable:function(o){if(o&&o.isA("sap.ui.table.AnalyticalColumn")){return o.isGroupable()||this._getCustomProperty(o,"isGroupable");}if(o&&o.isA("sap.m.Column")){return this.isSortable(o);}return false;},isSortable:function(o){if(o.getSortProperty){return!!o.getSortProperty();}return!!this._getCustomProperty(o,"sortProperty");},isFilterable:function(o){if(o.getFilterProperty){return!!o.getFilterProperty();}return!!this._getCustomProperty(o,"filterProperty");},isAggregatable:function(o){if(o.getAggregationRole){return o.getAggregationRole()===A.Dimension||o.getAggregationRole()===A.Measure;}return false;},getArrayElementByKey:function(k,K,a){if(!a||!a.length){return null;}var e=null;a.some(function(E){if(E[k]!==undefined&&E[k]===K){e=E;return true;}});return e;},isColumnIgnored:function(o,i){if(!i){return false;}return i.indexOf(this.getColumnKey(o))>-1;},createSort2Json:function(t,D,i){if(this.getTableBaseType(t)!==T.Table&&this.getTableType(t)!==T.ChartWrapper){return;}this.addSortPersistentData(this._mapTable2P13nSortJson(t),{sort:{sortItems:D}},i);},addSortPersistentData:function(s,D,i){s.sort.sortItems.forEach(function(S){if(!S.isSorted||i.indexOf(S.columnKey)>-1){return;}D.sort.sortItems.push({columnKey:S.columnKey,operation:S.operation});});},_mapTable2P13nSortJson:function(t){return{sort:{sortItems:t.getColumns().map(function(o){return{columnKey:U.getColumnKey(o),isSorted:o.getSorted(),operation:o.getSortOrder()};})}};},getTableType:function(t){switch(t&&t.getMetadata().getName()){case"sap.ui.comp.personalization.ChartWrapper":return T.ChartWrapper;case"sap.ui.comp.personalization.SelectionWrapper":return T.SelectionWrapper;case"sap.m.Table":return T.ResponsiveTable;case"sap.ui.table.AnalyticalTable":return T.AnalyticalTable;case"sap.ui.table.TreeTable":return T.TreeTable;case"sap.ui.table.Table":return T.Table;}return null;},getTableBaseType:function(t){switch(this.getTableType(t)){case T.ChartWrapper:return T.ChartWrapper;case T.SelectionWrapper:return T.SelectionWrapper;case T.ResponsiveTable:return T.ResponsiveTable;case T.AnalyticalTable:case T.Table:case T.TreeTable:return T.Table;}return null;},getColumnBaseType:function(o){switch(o&&o.getMetadata().getName()){case"sap.ui.comp.personalization.ColumnWrapper":return d.ColumnWrapper;case"sap.m.Column":return d.ResponsiveColumn;case"sap.ui.table.AnalyticalColumn":case"sap.ui.table.Column":return d.TableColumn;}return null;},_getCustomProperty:function(o,p){var a=this._getCustomData(o);if(!a||!p){return null;}return a[p];},_getCustomData:function(o){if(!o){return null;}var a=o.data("p13nData");if(typeof a==="string"){try{a=JSON.parse(a);o.data("p13nData",a);}catch(e){}}return a;},getColumnKeysOfType:function(t,o){var a=[];for(var s in o){if(this.getColumnType(o[s])===t){a.push(s);}}return a;},convertFilters:function(p,o){if(p&&p.filter&&p.filter.filterItems){var a=this.getColumnKeysOfType("date",o);var b=this.getColumnKeysOfType("time",o);var e=this.getColumnKeysOfType("datetime",o);p.filter.filterItems.forEach(function(f){if(a.indexOf(f.columnKey)>-1||b.indexOf(f.columnKey)>-1||e.indexOf(f.columnKey)>-1){if(f.value1&&typeof(f.value1)==="string"){f.value1=new Date(f.value1);}if(f.value2&&typeof(f.value2)==="string"){f.value2=new Date(f.value2);}}});}},convertSelectOptions:function(r,o){if(r&&r.SelectOptions){var a=this.getColumnKeysOfType("date",o);var b=this.getColumnKeysOfType("time",o);var e=this.getColumnKeysOfType("datetime",o);r.SelectOptions.forEach(function(s){s.Ranges.forEach(function(R){if(a.indexOf(s.PropertyName)>-1||b.indexOf(s.PropertyName)>-1||e.indexOf(s.PropertyName)>-1){if(R.Low&&typeof(R.Low)==="string"){R.Low=new Date(R.Low);}if(R.High&&typeof(R.High)==="string"){R.High=new Date(R.High);}}});});}}};return U;},true);
