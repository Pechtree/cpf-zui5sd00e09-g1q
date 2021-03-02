sap.ui.define(["sap/suite/ui/generic/template/changeHandler/util/AnnotationChangeUtilsV2","sap/suite/ui/generic/template/changeHandler/util/ChangeHandlerUtils","sap/suite/ui/generic/template/designtime/utils/DesigntimeUtils"],function(A,C,D){"use strict";var a={};var b="com.sap.vocabularies.UI.v1.DataFieldForAction";var c="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation";var d="DataFieldForAction";var e="DataFieldForIntentBasedNavigation";a.getActionTypeValues=function(){return{DataFieldForAction:{displayName:"DataField For Action"},DataFieldForIntentBasedNavigation:{displayName:"DataField For IBN"}};};a.get=function(E){var t=C.getTemplatingInfo(E);var r=t&&t.annotationContext;var s;if(r){switch(r.RecordType){case b:s=d;break;case c:s=e;break;default:break;}}return s;};a.createNewRecordForFooterAction=function(r,o){var p,f={Label:{},Action:{}},R={};if(r===b){R[b]=jQuery.extend({},f,{InvocationGrouping:{EnumMember:"com.sap.vocabularies.UI.v1.OperationGroupingType/Isolated"}});}else{R[c]=jQuery.extend({},f,{SemanticObject:{String:""}});}var n={"com.sap.vocabularies.UI.v1.Importance":{EnumMember:"com.sap.vocabularies.UI.v1.ImportanceType/High"},RecordType:r,Determining:{Bool:"true"}};jQuery.extend(true,n,R[r]);for(p in n){if(p!=="Determining"&&p!=="RecordType"&&o[p]){jQuery.extend(n[p],o[p]);}if(jQuery.isEmptyObject(n[p])){delete n[p];}}return n;};a.set=function(o,n,f){var O=a.get(o);if(O===n){return;}var r="";var m={};var t={};var E={};var g=[];var h=[];var s="";var i=-1;var j={};var k=[];switch(n){case d:r=b;break;case e:r=c;break;default:break;}if(!r){return;}var M=o.getModel();m=M&&M.getMetaModel();t=C.getTemplatingInfo(o);E=m.getODataEntityType(t.target);s=t.annotation;g=E[s];h=JSON.parse(JSON.stringify(g));i=C.getIndexFromInstanceMetadataPath(o);if(i===-1){throw"invalid index for old determining action";}var l=t&&t.annotationContext;var N=a.createNewRecordForFooterAction(r,l);var p={"annotation":s,"annotationContext":N,"path":t.path,"target":E.namespace+"."+E.name,"value":t.value};o.data("sap-ui-custom-settings")["sap.ui.dt"].annotation=p;g.splice(i,1,N);j=A.createCustomAnnotationTermChange(t.target,g,h,s);k.push(j);f.noRefreshOnChange=true;return k;};return a;});
