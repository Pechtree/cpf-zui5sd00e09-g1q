/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./List','./library','sap/ui/model/ChangeReason','sap/ui/model/Filter','./FacetFilterListRenderer','./FacetFilterItem',"sap/base/Log"],function(L,l,C,F,a,b,c){"use strict";var d=l.ListMode;var e=l.FacetFilterListDataType;var f=L.extend("sap.m.FacetFilterList",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:null},wordWrap:{type:"boolean",group:"Appearance",defaultValue:false},multiSelect:{type:"boolean",group:"Behavior",defaultValue:true,deprecated:true},active:{type:"boolean",group:"Behavior",defaultValue:true},enableCaseInsensitiveSearch:{type:"boolean",group:"Behavior",defaultValue:false,deprecated:false},allCount:{type:"int",group:"Appearance",defaultValue:null},sequence:{type:"int",group:"Behavior",defaultValue:-1},key:{type:"string",group:"Identification",defaultValue:null},showRemoveFacetIcon:{type:"boolean",group:"Misc",defaultValue:true},retainListSequence:{type:"boolean",group:"Misc",defaultValue:false},dataType:{type:"sap.m.FacetFilterListDataType",group:"Misc",defaultValue:e.String}},events:{listOpen:{},listClose:{parameters:{selectedItems:{type:"sap.m.FacetFilterItem[]"},allSelected:{type:"boolean"},selectedKeys:{type:"object"}}}}}});f.prototype.setTitle=function(t){this.setProperty("title",t,true);this._updateFacetFilterButtonText();return this;};f.prototype.setMultiSelect=function(v){this.setProperty("multiSelect",v,true);var m=v?d.MultiSelect:d.SingleSelectMaster;this.setMode(m);return this;};f.prototype.setMode=function(m){if(m===d.MultiSelect||m===d.SingleSelectMaster){L.prototype.setMode.call(this,m);this.setProperty("multiSelect",m===d.MultiSelect?true:false,true);}return this;};f.prototype._applySearch=function(){var s=this._getSearchValue();if(s!=null){this._search(s,true);this._updateSelectAllCheckBox();}};f.prototype.getSelectedItems=function(){var s=[];var o={};var g=L.prototype.getSelectedItems.apply(this,arguments);g.forEach(function(i){s.push(new b({text:i.getText(),key:i.getKey(),selected:true}));o[i.getKey()]=true;});var S=this.getSelectedKeys();var h=Object.getOwnPropertyNames(S);if(g.length<h.length){h.forEach(function(k){if(!o[k]){s.push(new b({text:S[k],key:k,selected:true}));}});}return s;};f.prototype.getSelectedItem=function(){var i=L.prototype.getSelectedItem.apply(this,arguments);var s=Object.getOwnPropertyNames(this.getSelectedKeys());if(!i&&s.length>0){i=new b({text:this.getSelectedKeys()[s[0]],key:s[0],selected:true});}return i;};f.prototype.removeSelections=function(A){if(this._allowRemoveSelections){A?this.setSelectedKeys():L.prototype.removeSelections.call(this,A);}return this;};f.prototype.getSelectedKeys=function(){var r={};var k=this._oSelectedKeys;Object.getOwnPropertyNames(k).forEach(function(g){r[g]=k[g];});return r;};f.prototype.setSelectedKeys=function(k){this._oSelectedKeys={};var K=false;k&&Object.getOwnPropertyNames(k).forEach(function(g){this._addSelectedKey(g,k[g]);K=true;},this);if(K){if(this.getMode()===d.MultiSelect){this.setActive(true);}this._selectItemsByKeys();}else{L.prototype.removeSelections.call(this);}};f.prototype._getNonGroupItems=function(){var i=[];this.getItems().forEach(function(I){if(I.getMode()!==d.None){i.push(I);}});return i;};f.prototype.removeSelectedKey=function(k,t){if(this._removeSelectedKey(k,t)){this._getNonGroupItems().forEach(function(i){var I=i.getKey()||i.getText();k===I&&i.setSelected(false);});}};f.prototype.removeSelectedKeys=function(){this._oSelectedKeys={};L.prototype.removeSelections.call(this,true);};f.prototype.removeItem=function(i){var I=L.prototype.removeItem.apply(this,arguments);if(!this._filtering){I&&I.getSelected()&&this.removeSelectedKey(I.getKey(),I.getText());return I;}};f.prototype.init=function(){this._firstTime=true;this._saveBindInfo;this._oSelectedKeys={};L.prototype.init.call(this);this.setMode(d.MultiSelect);this.setIncludeItemInSelection(true);this.setGrowing(true);this.setRememberSelections(false);this._searchValue="";this.attachUpdateFinished(function(E){var u=E.getParameter("reason");u=u?u.toLowerCase():u;if(u==="change"){var B=this.getBinding("items"),m=B?B.getModel():null;if(m&&m.getProperty(B.getPath())){this._iAllItemsCount=m.getProperty(B.getPath()).length||0;}}if(u!=="growing"&&u!==C.Filter.toLowerCase()){this._oSelectedKeys={};this._getNonGroupItems().forEach(function(i){if(i.getSelected()){this._addSelectedKey(i.getKey(),i.getText());}},this);}if(u!==C.Filter.toLowerCase()){this._selectItemsByKeys();}this._updateFacetFilterButtonText();this._updateSelectAllCheckBox();});this._allowRemoveSelections=true;this._bOriginalActiveState;this._iAllItemsCount;};f.prototype._resetItemsBinding=function(){if(this.isBound("items")){this._searchValue="";this._allowRemoveSelections=false;L.prototype._resetItemsBinding.apply(this,arguments);this._allowRemoveSelections=true;}};f.prototype._fireListCloseEvent=function(){var s=this.getSelectedItems();var S=this.getSelectedKeys();var A=s.length===0;this._firstTime=true;this.fireListClose({selectedItems:s,selectedKeys:S,allSelected:A});};f.prototype._updateActiveState=function(){var o=sap.ui.getCore().byId(this.getAssociation("allcheckbox"));if(Object.getOwnPropertyNames(this._oSelectedKeys).length>0||(o&&o.getSelected())){this.setActive(true);}};f.prototype._handleSearchEvent=function(E){var s=E.getParameters()["query"];if(s===undefined){s=E.getParameters()["newValue"];}this._search(s);this._updateSelectAllCheckBox();};f.prototype._search=function(s,g){var h;var n=0;function j(M){return M instanceof sap.ui.model.odata.ODataModel||M instanceof sap.ui.model.odata.v2.ODataModel;}if(g||(s!==this._searchValue)){this._searchValue=s;var B=this.getBinding("items");var o=this.getBindingInfo("items");if(o&&o.binding){h=o.binding.aFilters;if(h.length>0){n=h[0].aFilters.length;if(this._firstTime){this._saveBindInfo=h[0].aFilters[0][0];this._firstTime=false;}}}if(B){if(s||n>0){var k=this.getBindingInfo("items").template.getBindingInfo("text").parts;var p=k[0].path;if(p||p===""){var u=new F(p,sap.ui.model.FilterOperator.Contains,s);var U=[u];for(var i=1;i<k.length;i++){U.push(new F(k[i].path,sap.ui.model.FilterOperator.Contains,s));}if(this.getEnableCaseInsensitiveSearch()&&j(B.getModel())){var E="'"+String(s).replace(/'/g,"''")+"'";E=E.toLowerCase();u=new F("tolower("+p+")",sap.ui.model.FilterOperator.Contains,E);U=[u];for(var i=1;i<k.length;i++){U.push(new F("tolower("+k[i].path+")",sap.ui.model.FilterOperator.Contains,s));}}var P=new F(U,false);if(n>1){var m=new F([P,this._saveBindInfo],true);}else{if(this._saveBindInfo>""&&u.sPath!=this._saveBindInfo.sPath){var m=new F([P,this._saveBindInfo],true);}else{if(s==""){var m=[];}else{var m=new F([P],true);}}}B.filter(m,sap.ui.model.FilterType.Control);}}else{B.filter([],sap.ui.model.FilterType.Control);}}else{c.warning("No filtering performed","The list must be defined with a binding for search to work",this);}}};f.prototype._getSearchValue=function(){return this._searchValue;};f.prototype._updateSelectAllCheckBox=function(){var i=this._getNonGroupItems(),I=i.length,o,A,s;function g(h){return h.getSelected();}if(this.getMultiSelect()){o=sap.ui.getCore().byId(this.getAssociation("allcheckbox"));A=I>0&&I===i.filter(g).length;s=this.getActive()&&A;o&&o.setSelected(s);}};f.prototype._addSelectedKey=function(k,t){if(!k&&!t){c.error("Both sKey and sText are not defined. At least one must be defined.");return;}if(this.getMode()===d.SingleSelectMaster){this.removeSelectedKeys();}if(!k){k=t;}this._oSelectedKeys[k]=t||k;};f.prototype._removeSelectedKey=function(k,t){if(!k&&!t){c.error("Both sKey and sText are not defined. At least one must be defined.");return false;}if(!k){k=t;}delete this._oSelectedKeys[k];return true;};f.prototype._setSearchValue=function(v){this._searchValue=v;};f.prototype._isItemSelected=function(i){return!!(this._oSelectedKeys[i&&(i.getKey()||i.getText())]);};f.prototype._updateFacetFilterButtonText=function(){if(this.getParent()&&this.getParent()._setButtonText){this.getParent()._setButtonText(this);}};f.prototype._selectItemsByKeys=function(){this._getNonGroupItems().forEach(function(i){i.setSelected(this._isItemSelected(i));},this);this._updateFacetFilterButtonText();};f.prototype._handleSelectAllClick=function(s){var A;this._getNonGroupItems().forEach(function(i){if(s){this._addSelectedKey(i.getKey(),i.getText());}else{this._removeSelectedKey(i.getKey(),i.getText());}i.setSelected(s,true);},this);if(this.getMode()===d.MultiSelect){A=this._getOriginalActiveState()||s;this.setActive(A);}setTimeout(this._updateSelectAllCheckBox.bind(this),0);};f.prototype.onItemTextChange=function(i,n){var k=i.getKey();if(this._oSelectedKeys[k]&&n&&!this._filtering){this._oSelectedKeys[k]=n;}};f.prototype.onItemSelectedChange=function(i,s){var A;if(s){this._addSelectedKey(i.getKey(),i.getText());}else{this._removeSelectedKey(i.getKey(),i.getText());}L.prototype.onItemSelectedChange.apply(this,arguments);if(this.getMode()===d.MultiSelect){A=this._getOriginalActiveState()||s||this.getSelectedItems().length>1;this.setActive(A);}!this.getDomRef()&&this.getParent()&&this.getParent().getDomRef()&&this.getParent().invalidate();setTimeout(this._updateSelectAllCheckBox.bind(this),0);};f.prototype.updateItems=function(r){this._filtering=r===C.Filter;L.prototype.updateItems.apply(this,arguments);this._filtering=false;if(!this.getGrowing()||r===C.Filter){this._selectItemsByKeys();}};f.prototype._getOriginalActiveState=function(){return this._bOriginalActiveState;};f.prototype._preserveOriginalActiveState=function(){this._bOriginalActiveState=this.getActive();};return f;});
