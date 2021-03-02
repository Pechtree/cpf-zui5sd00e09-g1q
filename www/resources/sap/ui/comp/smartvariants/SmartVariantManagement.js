/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/thirdparty/jquery",'sap/ui/comp/library','./SmartVariantManagementAdapter','sap/ui/comp/variants/VariantItem','sap/ui/comp/variants/VariantManagement','sap/ui/comp/odata/MetadataAnalyser',"sap/base/Log",'sap/base/util/merge'],function(q,l,S,V,a,M,L,m){"use strict";var C=l.smartvariants.ChangeHandlerType;var b;var P;var F;var c=a.extend("sap.ui.comp.smartvariants.SmartVariantManagement",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/smartvariants/SmartVariantManagement.designtime",properties:{persistencyKey:{type:"string",group:"Misc",defaultValue:null},entitySet:{type:"string",group:"Misc",defaultValue:null}},aggregations:{personalizableControls:{type:"sap.ui.comp.smartvariants.PersonalizableInfo",multiple:true,singularName:"personalizableControl"}},events:{initialise:{},save:{parameters:{tile:{type:"boolean"}}},afterSave:{}}},renderer:function(r,o){a.getMetadata().getRenderer().render(r,o);}});c.prototype.init=function(){a.prototype.init.apply(this);this._bIsInitialized=false;this._oStandardVariant=null;this._oControlPersistence=null;this._oMetadataPromise=null;this._oControlPromise=null;this._oPersoControl=null;this._sAppStandardVariantKey=null;this._oSelectionVariantHandler={};this._oAppStdContent=null;this._aPersonalizableControls=[];if(this.setLifecycleSupport){this.setLifecycleSupport(true);}this._setBackwardCompatibility(false);this._oAdapter=null;this._bApplyingUIState=false;this.setSupportExecuteOnSelectOnSandardVariant(true);this._loadFlex();};c.prototype.propagateProperties=function(){a.prototype.propagateProperties.apply(this,arguments);this._initializeMetadata();};c.prototype._initializeMetadata=function(){var o=this.getModel();if(o&&!this._oMetadataPromise){this._oMetadataPromise=new Promise(function(r,d){if(!this.getEntitySet()){r();}else{o.getMetaModel().loaded().then(function(){this._onMetadataInitialised();r();}.bind(this));}}.bind(this));}};c.prototype._onMetadataInitialised=function(){var o,e=this.getEntitySet();o=new M(this.getModel());if(o&&e){this._oAdapter=new S({selectionPresentationVariants:o.getSelectionPresentationVariantAnnotationList(e)});}};c.prototype.applySettings=function(s){if(!s||!s.hasOwnProperty("useFavorites")){this.setUseFavorites(true);}a.prototype.applySettings.apply(this,arguments);};c.prototype._createControlWrapper=function(o){var d=null;var e=sap.ui.getCore().byId(o.getControl());if(e){d={control:e,type:o.getType(),dataSource:o.getDataSource(),keyName:o.getKeyName(),loaded:q.Deferred()};}return d;};c.prototype._getControlWrapper=function(o){var d=this._getAllPersonalizableControls();if(d&&d.length){for(var i=0;i<d.length;i++){if(d[i].control===o){return d[i];}}}return null;};c.prototype.addPersonalizableControl=function(o){var d,e=null,s=o.getControl();e=sap.ui.getCore().byId(s);if(!e){L.error("couldn't obtain the control with the id="+s);return this;}this.addAggregation("personalizableControls",o,true);d=this._createControlWrapper(o);if(d){this._aPersonalizableControls.push(d);}if(this.isPageVariant()){return this;}this.setPersControler(e);return this;};c.prototype.getTransportSelection=function(){return new Promise(function(r){sap.ui.require(["sap/ui/fl/transport/TransportSelection"],function(T){r(new T());});});};c.prototype._loadFlex=function(){var r=function(){return new Promise(function(R){sap.ui.require(["sap/ui/fl/registry/Settings","sap/ui/fl/Persistence","sap/ui/fl/Utils"],function(s,p,u){b=s;P=p;F=u;R();});});};if(!this._oFlLibrary){if(!this._oPersistencyPromise){this._oPersistencyPromise=new Promise(function(R,f){this._fResolvePersistencyPromise=R;this._fRejectPersistencyPromise=f;}.bind(this));}this._oFlLibrary=new Promise(function(R){sap.ui.getCore().loadLibrary('sap.ui.fl',{async:true}).then(function(){r().then(R);});});return this._oFlLibrary;}else{return r();}};c.prototype.setPersControler=function(o){if(b&&P&&F){this._setPersControler(o);}else{this._loadFlex().then(function(){this._setPersControler(o);}.bind(this));}};c.prototype._setPersControler=function(o){if(!this._oPersoControl){if(F.getComponentClassName(o)){this._oPersoControl=o;this._addPersistenceController(o);}}};c.prototype.setPersistencyKey=function(k){this.setProperty("persistencyKey",k);this.setPersControler(this);return this;};c.prototype._addPersistenceController=function(o){if(o){this._oControlPersistence=new P(o,"persistencyKey");this._handleGetChanges(o);}};c.prototype.isPageVariant=function(){if(this.getPersistencyKey()){return true;}return false;};c.prototype._getAdapter=function(){return this._oAdapter;};c.prototype._handleGetChanges=function(o){if(o&&this._oControlPersistence){this._oControlPromise=new Promise(function(r,d){this._oControlPersistence.getChanges().then(function(v){this._fResolvePersistencyPromise();r(v);}.bind(this),function(e){this._fRejectPersistencyPromise(e);d(e);}.bind(this));}.bind(this));}};c.prototype.getVariantContent=function(o,k){var p,d=this._getChangeContent(k);if(d&&this.isPageVariant()){p=this._getControlPersKey(o);if(p){d=this._retrieveContent(d,p);}}return d;};c.prototype._getChangeContent=function(k){var o=null;if(k===this.STANDARDVARIANTKEY){o=this.getStandardVariant();}else{o=this._getChange(k);if(o){o=o.getContent();if(o){o=m({},o);}}}return o;};c.prototype._getChange=function(i){var o=null;if(this._oControlPersistence){o=this._oControlPersistence.getChange(i);}return o;};c.prototype._getAllPersonalizableControls=function(){return this._aPersonalizableControls;};c.prototype.removeAllPersonalizableControls=function(){this.removeAllAggregation("personalizableControls");this._aPersonalizableControls=[];};c.prototype.removePersonalizableControl=function(o){var p=this.removeAggregation("personalizableControls",o);if(p){this._aPersonalizableControls.some(function(d,i){if(d.control.getId()===p.getControl()){this._aPersonalizableControls.splice(i,1);return true;}return false;}.bind(this));}return p;};c.prototype.removePersonalizableControlById=function(o){var p=this.getAggregation("personalizableControls");if(p){p.some(function(d,i){if(d.getControl()===o.getId()){this.removePersonalizableControl(d);return true;}return false;}.bind(this));}};c.prototype._createVariantEntries=function(v){var n=null;var s,d=null;var o,e;var f=[];var g=[];this.removeAllVariantItems();if(v){for(n in v){if(n){o=v[n];if(o.isVariant()){e=new V({key:o.getId(),global:!o.isUserDependent(),executeOnSelection:this._getExecuteOnSelection(o),lifecycleTransportId:o.getRequest(),lifecyclePackage:o.getPackage(),namespace:o.getNamespace(),readOnly:this._isReadOnly(o),labelReadOnly:o.isLabelReadOnly(),author:this._getLRepUser(o)});e.setText(o.getText("variantName"));if(this._hasStoredStandardVariant(o)){d=o.getId();}this.addVariantItem(e);f.push(o.getId());}else{if((o.getChangeType()===C.addFavorite)||(o.getChangeType()===C.removeFavorite)){g.push(o);}}}}}if(this._oPersoControl){s=this._getDefaultVariantKey();if(s){this.setInitialSelectionKey(s);}var h=this._isApplicationVariant(this._oPersoControl);if(h){this._setIndustrySolutionMode(h);h=F.isVendorLayer();this._setVendorLayer(h);}if(this._getIndustrySolutionMode()){if(d){this._sAppStandardVariantKey=d;this.setStandardVariantKey(d);}}if(this._oControlPersistence&&this._oControlPersistence.isVariantDownport()){this._enableManualVariantKey(true);}}this._aFavoriteChanges=g;this.applyDefaultFavorites(f);return f;};c.prototype.applyDefaultFavorites=function(v,s){if(this._aFavoriteChanges&&(this._aFavoriteChanges.length>0)){this._applyFavorites(this._aFavoriteChanges);}else{if(!s){this._applyDefaultFavorites(v);}else{this._applyDefaultFavoritesForSelectionVariants(v);}}};c.prototype._applyDefaultFavoritesForSelectionVariants=function(v){v.forEach(function(s){var o=this.getItemByKey(s);if(o){this._setFavorite(s);}}.bind(this));};c.prototype._applyDefaultFavorites=function(v){if(!this._sAppStandardVariantKey){this.setStandardFavorite(true);this._setFavorite(this.STANDARDVARIANTKEY);}v.forEach(function(s){var o=this._getChange(s);var d=this.getItemByKey(s);if(o&&d){if(!this._isReadOnly(o)){this._setFavorite(s);}else if(o.getLayer()==="VENDOR"){this._setFavorite(s);}}}.bind(this));};c.prototype._applyFavorites=function(f){f.forEach(function(o){var v,d=o.getContent();if(d&&d.key){if(d.key===this.STANDARDVARIANTKEY){this.setStandardFavorite(d.visible);}else{v=this.getItemByKey(d.key);if(v){v.setFavorite(d.visible);}}}}.bind(this));};c.prototype._addFavorites=function(d){var A=d.filter(function(f){return f.visible===true;});var r=d.filter(function(f){return f.visible===false;});this._createFavoriteTypeChanges(A,r);};c.prototype._createFavoriteTypeChanges=function(A,r){if(!A.length&&!r.length){return;}this._createFavoriteChanges(A,C.addFavorite);this._createFavoriteChanges(r,C.removeFavorite);};c.prototype._createFavoriteChanges=function(f,s){var o=this._oControlPersistence;if(!o||!f.length){return;}if(!s){throw new Error("sChangeType should be filled");}f.forEach(function(d){o.addChange({type:s,content:d,isUserDependent:true});});};c.prototype._isReadOnly=function(o){var r=o.isReadOnly();if(r){var u=this._getUser();if(u){return!(u.getId().toUpperCase()===o.getOwnerId().toUpperCase());}}return r;};c.prototype._getUser=function(){var u=null;if(sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getUser){u=sap.ushell.Container.getUser();}return u;};c.prototype.getVariantsInfo=function(f){if(!f){L.error("'getVariantsInfo' failed. Expecting callBack not passed.");return;}var n=null;var v;var d=[];var t=this;try{if(this._oControlPersistence){this._oControlPersistence.getChanges().then(function(g){if(g){for(n in g){if(n){v=g[n];if(v.isVariant()){d.push({key:v.getId(),text:v.getText("variantName")});}}}}f(d);},function(g){var E="'getChanges' failed:";if(g&&g.message){E+=(' '+g.message);}t._setErrorValueState(t.oResourceBundle.getText("VARIANT_MANAGEMENT_READ_FAILED"),E);f(d);});}}catch(e){this._setErrorValueState(this.oResourceBundle.getText("VARIANT_MANAGEMENT_READ_FAILED"),"'getChanges' throws an exception");}};c.prototype.getCurrentVariantId=function(){var k=this._getCurrentVariantId();if(k===this.STANDARDVARIANTKEY){k="";}return k;};c.prototype._getCurrentVariantId=function(){var k=this.getSelectionKey();return k;};c.prototype.setCurrentVariantId=function(v,d){var i=this._determineVariantId(v);if(this._oPersoControl){if(!this._oStandardVariant){this._setSelectionByKey(i);}else{this._applyCurrentVariantId(i,d);}}};c.prototype._applyCurrentVariantId=function(v,d){var o;if(this._oPersoControl){o=this._getChangeContent(v);if(o){this._setSelectionByKey(v);if(!d){if(this.isPageVariant()){this._applyVariants(o,"SET_VM_ID");}else{this._applyVariant(this._oPersoControl,o,"SET_VM_ID");}}}}};c.prototype._determineVariantId=function(v){var i=v;if(!i){i=this.getStandardVariantKey();}else{if(!this.getItemByKey(i)){i=this.getStandardVariantKey();}}return i;};c.prototype.initialise=function(f,p){var o,e;try{if(p&&f){o=this._getControlWrapper(p);if(!o){L.error("initialise on an unknown control.");return;}if(o.bInitialized){L.error("initialise on "+p.getId()+" already executed");return;}o.fInitCallback=f;}else if(!this.isPageVariant()){o=this._getControlWrapper(this._oPersoControl);}if(this._oPersistencyPromise){this._oPersistencyPromise.then(function(){if(this._oControlPromise&&this._oPersoControl&&o){Promise.all([this._oMetadataPromise,this._oControlPromise,b.getInstance()]).then(function(v){this._dataReceived(v[1],v[2],o);}.bind(this),function(g){e="'getChanges' failed:";if(g&&g.message){e+=(' '+g.messages);}this._errorHandling(e,f,p);}.bind(this),function(g){if(g&&g.message){e=g.message;}else{e="accessing either flexibility functionality or odata metadata.";}this._errorHandling("'initialise' failed: "+e,f,p);}.bind(this));}else{this._errorHandling("'initialise' no personalizable component available",f,p);}}.bind(this),function(g){if(g&&g.message){e=g.message;}else{e="accessing the flexibility functionality.";}this._errorHandling("'initialise' failed: "+e,f,p);}.bind(this));}else{this._errorHandling("'initialise' no '_oPersistencyPromise'  available",f,p);}}catch(d){this._errorHandling("'getChanges' throws an exception",f,p);}};c.prototype._errorHandling=function(e,f,p){var d={variantKeys:[]};this._setErrorValueState(this.oResourceBundle.getText("VARIANT_MANAGEMENT_READ_FAILED"),e);if(f&&p){f.call(p);}else{this.fireEvent("initialise",d);}if(p.variantsInitialized){p.variantsInitialized();}};c.prototype._dataReceived=function(v,s,o){var d,k,f,p={variantKeys:[]};var A=this._getAdapter();if(this._bIsBeingDestroyed){return;}if(!this._bIsInitialized){if(s&&s.isVariantSharingEnabled){this.setShowShare(s.isVariantSharingEnabled());}this._bIsInitialized=true;p.variantKeys=this._createVariantEntries(v);if(A){A.createSelectionPresentationVariants(this);}f=this._getExecuteOnSelectOnStandardVariant();if(f!==null){this._executeOnSelectForStandardVariantByUser(f);}k=this._getDefaultVariantKey();if(k){d=this._getChangeContent(k);if(d){this.setDefaultVariantKey(k);this.setInitialSelectionKey(k);}}if(this._sAppStandardVariantKey){var e=this._getChange(this._sAppStandardVariantKey);if(e){e=e.getContent();if(e){e=m({},e);}}this._oAppStdContent=e;}}this._initialize(p,o);};c.prototype._initialize=function(p,o){var k,d=null,i=this.isPageVariant();if(this._oAppStdContent){if((o.type==="table")||(o.type==="chart")){if(i){this._applyControlVariant(o.control,this._oAppStdContent,"STANDARD",true);}else{this._applyVariant(o.control,this._oAppStdContent,"STANDARD",true);}}}if(o.fInitCallback){o.fInitCallback.call(o.control);delete o.fInitCallback;o.bInitialized=true;}else{this.fireEvent("initialise",p);}k=this.getSelectionKey();if(k&&(k!==this.getStandardVariantKey())){d=this._getChangeContent(k);}else if(this._oAppStdContent){d=this._oAppStdContent;if((o.type==="table")||(o.type==="chart")){d=null;}}if(this._sAppStandardVariantKey){this._updateStandardVariant(o,this._oAppStdContent);}else{this._setStandardVariant(o);}o.loaded.resolve();if(d){if(i){this._applyControlVariant(o.control,d,"INIT",true);}else{this._applyVariant(o.control,d,"INIT",true);}}if(o.control.variantsInitialized){o.control.variantsInitialized();}if((this._getCurrentVariantId()===this.getStandardVariantKey())&&this.getExecuteOnSelectForStandardVariant()){if(o.control.search){o.control.search();}}};c.prototype.setInitialState=function(){var k=this._getDefaultVariantKey()||this.getStandardVariantKey();if(k){this.setInitialSelectionKey(k);this._triggerSelectVariant(k,"INIT_STATE");}};c.prototype._updateVariant=function(v){if(this._isIndustrySolutionModeAndVendorLayer()||(v.key!==this.getStandardVariantKey())){if(v){var o=this._getChange(v.key);if(o){try{if((v.lifecycleTransportId!==null)&&(v.lifecycleTransportId!==undefined)){o.setRequest(v.lifecycleTransportId);}var d=this._fetchContent();if(d){var i=this.getItemByKey(v.key);if(i){d.executeOnSelection=i.getExecuteOnSelection();}if(d.standardvariant!==undefined){delete d.standardvariant;}if(this._isIndustrySolutionModeAndVendorLayer()&&(v.key===this.getStandardVariantKey())){d.standardvariant=true;}o.setContent(d);}}catch(e){L.error("'_updateVariant' throws an exception");}}}}};c.prototype._createChangeHeader=function(){if(this.isPageVariant()){return{type:"page",dataService:"n/a"};}var d=this._getAllPersonalizableControls();if(d&&d.length>0){return{type:d[0].type,dataService:d[0].dataSource};}};c.prototype._newVariant=function(v){var i,o,d,I=false;if(v&&this._oControlPersistence){var t=this._createChangeHeader();var u=!v.global;var p="";if((v.lifecyclePackage!==null)&&(v.lifecyclePackage!==undefined)){p=v.lifecyclePackage;}var T="";if((v.lifecycleTransportId!==null)&&(v.lifecycleTransportId!==undefined)){T=v.lifecycleTransportId;}i=this._isVariantDownport()?v.key:null;if(this._isIndustrySolutionModeAndVendorLayer()&&(this.getStandardVariantKey()===this.STANDARDVARIANTKEY)){if((T||p)&&(v.name===this.oResourceBundle.getText("VARIANT_MANAGEMENT_STANDARD"))){this.setStandardVariantKey(i);I=true;}}o=this._fetchContent();if(o){if(v.exe){o.executeOnSelection=v.exe;}if(v.tile){o.tile=v.tile;}if(o.standardvariant!==undefined){delete o.standardvariant;}if(I){o.standardvariant=true;}}var e={type:t.type,ODataService:t.dataSource,texts:{variantName:v.name},content:o,isVariant:true,packageName:p,isUserDependent:u,id:i};i=this._oControlPersistence.addChange(e);this.replaceKey(v.key,i);this.setInitialSelectionKey(i);if(this._isIndustrySolutionModeAndVendorLayer()&&((v.key===this.STANDARDVARIANTKEY)||this._isVariantDownport())){this.setStandardVariantKey(i);}d=this._getChange(i);if(d){d.setRequest(T);var f=this.getItemByKey(i);if(f){f.setNamespace(d.getNamespace());}}if(v.def===true){this._setDefaultVariantKey(i);}this._setFavorite(i);}};c.prototype._setFavorite=function(i){var I=this.getItemByKey(i);if(I){I.setFavorite(true);}this._addFavorites([{key:i,visible:true}]);};c.prototype._fetchContent=function(){var o,p,d,e={};var f=this._getAllPersonalizableControls();for(var i=0;i<f.length;i++){o=f[i];if(o&&o.control&&o.control.fetchVariant){d=o.control.fetchVariant();if(d){d=m({},d);if(this.isPageVariant()){p=this._getControlPersKey(o);if(p){e=this._assignContent(e,d,p);}else{L.error("no persistancy key retrieved");}}else{e=d;break;}}}}return e;};c.prototype._getControlPersKey=function(o){var p=null;if(o.keyName){if(o.keyName==="id"){p=o.control.getId();}else{p=o.control.getProperty(o.keyName);}}else{var d=this._getControlWrapper(o);if(d&&d.keyName){if(d.keyName==="id"){p=d.control.getId();}else{p=d.control.getProperty(d.keyName);}}}return p;};c.prototype._newVariantContent=function(o){var d=null,e,p;if(o&&o.control&&o.control.fetchVariant){e=o.control.fetchVariant();if(e){e=m({},e);if(this.isPageVariant()){p=this._getControlPersKey(o);if(p){d={};d=this._assignContent(d,e,p);}else{L.error("no persistancy key retrieved");}}else{d=e;}}}return d;};c.prototype._appendLifecycleInformation=function(v,i){var t;var I=this.getItemByKey(i);if(I){t=I.getLifecycleTransportId();if(t===null||t===undefined){t="";}if(v){v.setRequest(t);}}};c.prototype._renameVariant=function(v){if(v.key!==this.getStandardVariantKey()){if(v){var o=this._getChange(v.key);if(o){o.setText("variantName",v.name);this._appendLifecycleInformation(o,v.key);}}}};c.prototype._deleteVariants=function(v){var i;if(v&&v.length){var s=this._getDefaultVariantKey();for(i=0;i<v.length;i++){if(v[i]===this.getStandardVariantKey()){if(!this._isIndustrySolutionModeAndVendorLayer()){continue;}else{this.setStandardVariantKey(this.STANDARDVARIANTKEY);}}var o=this._getChange(v[i]);if(o){o.markForDeletion();if(s&&s===v[i]){this._setDefaultVariantKey("");}this._appendLifecycleInformation(o,v[i]);}}}};c.prototype._getDefaultVariantKey=function(){var d="";if(this._oControlPersistence){d=this._oControlPersistence.getDefaultVariantIdSync();}return d;};c.prototype._setDefaultVariantKey=function(v){if(this._oControlPersistence){this._oControlPersistence.setDefaultVariantIdSync(v);}};c.prototype._getExecuteOnSelectOnStandardVariant=function(){var e=null;if(this._oControlPersistence){e=this._oControlPersistence.getExecuteOnSelectSync();}return e;};c.prototype._setExecuteOnSelectOnStandardVariant=function(f){if(this._oControlPersistence){this._oControlPersistence.setExecuteOnSelectSync(f);}};c.prototype._isVariantDownport=function(){var d=false;if(this._oControlPersistence){d=this._oControlPersistence.isVariantDownport();}return d;};c.prototype._getExecuteOnSelection=function(v){var o;if(v){o=v.getContent();if(o&&(o.executeOnSelection!==undefined)){return o.executeOnSelection;}}return false;};c.prototype._hasStoredStandardVariant=function(v){var o;if(v){o=v.getContent();if(o&&o.standardvariant){return o.standardvariant;}}return false;};c.prototype._isComponentTemplate=function(o){var i=false;var d=F.getComponentForControl(o);if(d&&d.getAppComponent){d=d.getAppComponent();if(d){i=true;}}return i;};c.prototype._isApplicationVariant=function(o){if(F.isApplicationVariant(o)){return true;}if(this._isComponentTemplate(o)){return true;}return false;};c.prototype._setExecuteOnSelections=function(v){var i;if(v&&v.length){for(i=0;i<v.length;i++){if(v[i].key===this.STANDARDVARIANTKEY){this._setExecuteOnSelectOnStandardVariant(v[i].exe);continue;}var o=this._getChange(v[i].key);if(o){var j=o.getContent();if(j){j.executeOnSelection=v[i].exe;o.setContent(j);}this._appendLifecycleInformation(o,v[i].key);}}}};c.prototype._save=function(n,i){var t=this;if(this._oControlPersistence){try{this._oControlPersistence.saveAll().then(function(){if(!i){if(n){t._updateUser();}t.fireEvent("afterSave");}},function(d){var E="'_save' failed:";if(d&&d.message){E+=(' '+d.message);}t._setErrorValueState(t.oResourceBundle.getText("VARIANT_MANAGEMENT_SAVE_FAILED"),E);});}catch(e){this._setErrorValueState(this.oResourceBundle.getText("VARIANT_MANAGEMENT_SAVE_FAILED"),"'_save' throws an exception");}}};c.prototype._updateUser=function(){var i=this.getInitialSelectionKey();var u=this._getLRepUser(this._getChange(i));if(u){this._assignUser(i,u);}};c.prototype._getLRepUser=function(o){var u=null;if(o&&o.getDefinition()&&o.getDefinition().support){u=o.getDefinition().support.user?o.getDefinition().support.user:"";}return u;};c.prototype.fireSave=function(v){var s=false,n=true;var e={};if(v){if(v.hasOwnProperty("tile")){e.tile=v.tile;}if(v.overwrite){if(this._isIndustrySolutionModeAndVendorLayer()||(v.key!==this.getStandardVariantKey())){this.fireEvent("save",e);if(v.key===this.STANDARDVARIANTKEY){this._newVariant(v);}else{this._updateVariant(v);n=false;}s=true;}}else{this.fireEvent("save",e);this._newVariant(v);s=true;}if(s){this._save(n);}}};c.prototype.fireManage=function(v){var i;if(v){if(v.renamed){for(i=0;i<v.renamed.length;i++){this._renameVariant(v.renamed[i]);}}if(v.deleted){this._deleteVariants(v.deleted);}if(v.exe){this._setExecuteOnSelections(v.exe);}if(v.def){var d=this._getDefaultVariantKey();if(d!==v.def){this._setDefaultVariantKey(v.def);}}if(v.fav&&(v.fav.length>0)){this._addFavorites(v.fav);}if((v.deleted&&v.deleted.length>0)||(v.renamed&&v.renamed.length>0)||(v.exe&&v.exe.length>0)||v.def){this._save();}else if(v.fav&&(v.fav.length>0)){this._save(false,true);}this.fireEvent("manage",v);}};c.prototype.fireSelect=function(v,s){if(this._oPersoControl&&v&&v.key){this._triggerSelectVariant(v.key,s);this.fireEvent("select",v);}};c.prototype._selectVariant=function(v,s){this.fireSelect({key:v},s);};c.prototype._checkForSelectionHandler=function(v){var h=null,H=Object.keys(this._oSelectionVariantHandler);if(H.length>-1){H.some(function(k){if(v.indexOf(k)===0){h=this._oSelectionVariantHandler[k];return true;}return false;}.bind(this));}return h;};c.prototype._triggerSelectVariant=function(v,s){var o,h=this._checkForSelectionHandler(v);if(this._getAdapter()&&(v.substring(0,1)==="#")){this._applyUiState(v,s);return;}if(h){o=this._triggerSpecialSelectVariant(v,s,h);}else{o=this._triggerGeneralSelectVariant(v,s);}if(o){if(this.isPageVariant()){this._applyVariants(o,s);}else{this._applyVariant(this._oPersoControl,o,s);}}};c.prototype._triggerSpecialSelectVariant=function(v,s,h){return h.callback.call(h.handler,v,s);};c.prototype._triggerGeneralSelectVariant=function(v,s){var o=this._getChangeContent(v);if(o){o=m({},o);if((v===this.STANDARDVARIANTKEY)&&this.getExecuteOnSelectForStandardVariant()){o.executeOnSelection=this.getExecuteOnSelectForStandardVariant();}}return o;};c.prototype.currentVariantSetModified=function(f){if(!this._bApplyingUIState){a.prototype.currentVariantSetModified.apply(this,arguments);}};c.prototype._applyControlUiState=function(o,d){if(o&&d){o.loaded.then(function(){this._bApplyingUIState=true;if(o.control.setUiStateAsVariant){o.control.setUiStateAsVariant(d);}this._bApplyingUIState=false;}.bind(this));}};c.prototype._applyUiState=function(v,s){var i,A=this._getAdapter(),o=null,d=this._getAllPersonalizableControls();if(A){o=A.getUiState(v);for(i=0;i<d.length;i++){if(d[i]&&d[i].control&&d[i].loaded){this._applyControlUiState(d[i],o,s);}}}};c.prototype._applyControlWrapperVariants=function(o,d,s){var t=this;if(o){o.loaded.then(function(){t._applyControlVariant(o.control,d,s);});}};c.prototype._applyVariants=function(o,s){var i,d=this._getAllPersonalizableControls();for(i=0;i<d.length;i++){if(d[i]&&d[i].control&&d[i].loaded){this._applyControlWrapperVariants(d[i],o,s);}}};c.prototype._setStandardVariant=function(o){var d=o.control;if(d){if(d.fireBeforeVariantSave){d.fireBeforeVariantSave(a.STANDARD_NAME);}this._assignStandardVariant(o);}};c.prototype._retrieveContent=function(o,p){var r=o;if(this.isPageVariant()&&o){r=o[p];if(!r&&(p===this.getPersistencyKey())&&this._aPersonalizableControls&&this._aPersonalizableControls.length===1){r=o;}}return r;};c.prototype._assignContent=function(t,o,p){if(this.isPageVariant()){if(!((p===this.getPersistencyKey())&&this._aPersonalizableControls&&this._aPersonalizableControls.length===1)){t[p]=o;}else{t=o;}}else{t=o;}return t;};c.prototype._updateStandardVariant=function(o,d){if(o.control){var e=d;if(this.isPageVariant()){var p=this._getControlPersKey(o);if(p){e=this._retrieveContent(d,p);}}this._assignStandardVariantForControl(o,e);}};c.prototype._assignStandardVariant=function(o){var s=null;if(o.control){if(o.control.fetchVariant){s=o.control.fetchVariant();}this._assignStandardVariantForControl(o,s);}};c.prototype._assignStandardVariantForControl=function(o,s){var d=s;if(o){if(this.isPageVariant()){var p=this._getControlPersKey(o.control);if(p){if(!this._oStandardVariant){this._oStandardVariant={};}this._oStandardVariant=this._assignContent(this._oStandardVariant,d,p);}}else{this._oStandardVariant=d;}}};c.prototype.getStandardVariant=function(o){var p,d,e=null;if(this._oStandardVariant){if(!o){e=this._oStandardVariant;}else{if(this.isPageVariant()){d=this._getControlWrapper(o);if(d){p=this._getControlPersKey(o);if(p){e=this._retrieveContent(this._oStandardVariant,p);}}}else{if((o===this._oPersoControl)){e=this._oStandardVariant;}}}}return e;};c.prototype._applyVariant=function(o,d,s,i){if(o&&o.applyVariant){o.applyVariant(d,s,i);}};c.prototype._applyControlVariant=function(o,d,s,i){var e,p;p=this._getControlPersKey(o);if(p){e=this._retrieveContent(d,p);if(e){e.executeOnSelection=d.executeOnSelection;this._applyVariant(o,e,s,i);}}};c.prototype.registerSelectionVariantHandler=function(h,k){this._oSelectionVariantHandler[k]=h;};c.prototype.unregisterSelectionVariantHandler=function(h){var e=null;if(!this._oSelectionVariantHandler){return;}if(typeof h==='string'){e=h;}else{Object.keys(this._oSelectionVariantHandler).some(function(k){if(this._oSelectionVariantHandler[k].handler===h){e=k;return true;}return false;}.bind(this));}if(e){delete this._oSelectionVariantHandler[e];}};c.prototype._setErrorValueState=function(t,s){this.setInErrorState(true);if(s){L.error(s);}};c.prototype.exit=function(){a.prototype.exit.apply(this,arguments);this._aPersonalizableControls=null;this._oControlPersistence=null;this._fResolvePersistencyPromise=null;this._fRejectPersistencyPromise=null;this._oMetadataPromise=null;this._oControlPromise=null;this._oFlLibrary=null;this._oPersistencyPromise=null;this._oPersoControl=null;this._oAppStdContent=null;this._sAppStandardVariantKey=null;this._oSelectionVariantHandler=null;this._aFavoriteChanges=null;if(this._oAdapter){this._oAdapter.destroy();this._oAdapter=null;}};return c;},true);
