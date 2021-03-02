sap.ui.define(["sap/ushell/services/CrossApplicationNavigation","sap/ushell/appRuntime/ui5/AppRuntimeService","sap/ushell/services/_AppState/AppState"],function(C,A,a){"use strict";function b(c,p,s){C.call(this,c,p,s);this.backToPreviousApp=function(){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.backToPreviousApp");};this.expandCompactHash=function(h){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.expandCompactHash",{"sHashFragment":h});};this.getDistinctSemanticObjects=function(){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getDistinctSemanticObjects");};this.getLinks=function(v){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getLinks",{"vArgs":v});};this.getPrimaryIntent=function(S,P){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getPrimaryIntent",{"sSemanticObject":S,"mParameters":P});};this.getSemanticObjectLinks=function(S,P,i,o,d,e){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getSemanticObjectLinks",{"sSemanticObject":S,"mParameters":P,"bIgnoreFormFactor":i,"sAppStateKey":d,"bCompactIntents":e});};this.historyBack=function(S){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.historyBack",{"iSteps":S});};this.isIntentSupported=function(i,o){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.isIntentSupported",{"aIntents":i});};this.isNavigationSupported=function(i,o){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.isNavigationSupported",{"aIntents":i});};this.toExternal=function(o,d){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.toExternal",{"oArgs":o});};this.getAppState=function(o,d){var D=new jQuery.Deferred();A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getAppState",{"sAppStateKey":d}).done(function(S){var e=new a(sap.ushell.Container.getService("AppState"),S._sKey,S._bModifiable,S._sData,S._sAppName,S._sACHComponent,S._bTransient);D.resolve(e);});return D.promise();};}b.prototype=Object.create(C.prototype);b.hasNoAdapter=C.hasNoAdapter;return b;},true);
