/*!
 * SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/fl/changeHandler/BaseRename',"sap/ui/fl/Utils"],function(B,U){"use strict";var P="label";var C="fieldLabel";var T="XFLD";var R=B.createRenameChangeHandler({changePropertyName:C,translationTextType:T});R.applyChange=function(c,o,p){var m=p.modifier;var a=c.getDefinition();var t=a.texts[C];var v=t.value;if(a.texts&&t&&typeof(v)==="string"){var s=this.setLabelPropertyOnControl(o,v,m,P);c.setRevertData(s);return true;}else{U.log.error("Change does not contain sufficient information to be applied: ["+a.layer+"]"+a.namespace+"/"+a.fileName+"."+a.fileType);}};R.revertChange=function(c,o,p){var O=c.getRevertData();if(O||O===""){var m=p.modifier;if(O==="$$Handled_Internally$$"){O=undefined;}this.setLabelPropertyOnControl(o,O,m,P);c.resetRevertData();return true;}else{U.log.error("Change doesn't contain sufficient information to be reverted. Most Likely the Change didn't go through applyChange.");}};R.setLabelPropertyOnControl=function(c,v,m,p){var g="getProperty";var l=m[g](c,p);var s;var a;if(U.isBinding(v)){s="setPropertyBinding";g="getPropertyBinding";}else{s="setProperty";}if(l&&(typeof l!=="string")){a=m[g](l,"text");m[s](l,"text",v);}else{a=m[g](c,p);m[s](c,p,v);}return a?a:"$$Handled_Internally$$";};R.getPreviousLabelPropertyOnControl=function(c,m,p){var l=m.getProperty(c,p);var s;if(l&&(typeof l!=="string")){s=m.getProperty(l,"text");}else{s=m.getProperty(c,p);}return s?s:"$$Handled_Internally$$";};return R;},true);
