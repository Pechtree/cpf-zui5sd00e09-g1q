/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','./library','sap/ui/core/LabelEnablement','sap/ui/core/library','sap/ui/Device','./FileUploaderRenderer','sap/ui/dom/containsOrEquals','sap/ui/events/KeyCodes','sap/base/Log','sap/base/security/encodeXML',"sap/ui/thirdparty/jquery",'sap/ui/dom/jquery/Aria'],function(C,a,L,c,D,F,b,K,d,f,q){"use strict";var V=c.ValueState;var g=C.extend("sap.ui.unified.FileUploader",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.ui.unified.IProcessableBlobs"],library:"sap.ui.unified",designtime:"sap/ui/unified/designtime/FileUploader.designtime",properties:{value:{type:"string",group:"Data",defaultValue:''},enabled:{type:"boolean",group:"Behavior",defaultValue:true},uploadUrl:{type:"sap.ui.core.URI",group:"Data",defaultValue:''},name:{type:"string",group:"Data",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:''},uploadOnChange:{type:"boolean",group:"Behavior",defaultValue:false},additionalData:{type:"string",group:"Data",defaultValue:null},sameFilenameAllowed:{type:"boolean",group:"Behavior",defaultValue:false},buttonText:{type:"string",group:"Misc",defaultValue:null},fileType:{type:"string[]",group:"Data",defaultValue:null},multiple:{type:"boolean",group:"Behavior",defaultValue:false},maximumFileSize:{type:"float",group:"Data",defaultValue:null},mimeType:{type:"string[]",group:"Data",defaultValue:null},sendXHR:{type:"boolean",group:"Behavior",defaultValue:false},placeholder:{type:"string",group:"Appearance",defaultValue:null},style:{type:"string",group:"Appearance",defaultValue:null},buttonOnly:{type:"boolean",group:"Appearance",defaultValue:false},useMultipart:{type:"boolean",group:"Behavior",defaultValue:true},maximumFilenameLength:{type:"int",group:"Data",defaultValue:null},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:V.None},valueStateText:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''},iconHovered:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''},iconSelected:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''},iconFirst:{type:"boolean",group:"Appearance",defaultValue:true},iconOnly:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{parameters:{type:"sap.ui.unified.FileUploaderParameter",multiple:true,singularName:"parameter"},headerParameters:{type:"sap.ui.unified.FileUploaderParameter",multiple:true,singularName:"headerParameter"},xhrSettings:{type:"sap.ui.unified.FileUploaderXHRSettings",multiple:false}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{newValue:{type:"string"},files:{type:"object[]"}}},uploadComplete:{parameters:{fileName:{type:"string"},response:{type:"string"},readyStateXHR:{type:"string"},status:{type:"string"},responseRaw:{type:"string"},headers:{type:"object"},requestHeaders:{type:"object[]"}}},typeMissmatch:{parameters:{fileName:{type:"string"},fileType:{type:"string"},mimeType:{type:"string"}}},fileSizeExceed:{parameters:{fileName:{type:"string"},fileSize:{type:"string"}}},fileAllowed:{},uploadProgress:{parameters:{lengthComputable:{type:"boolean"},loaded:{type:"float"},total:{type:"float"},fileName:{type:"string"},requestHeaders:{type:"object[]"}}},uploadAborted:{parameters:{fileName:{type:"string"},requestHeaders:{type:"object[]"}}},filenameLengthExceed:{parameters:{fileName:{type:"string"}}},uploadStart:{parameters:{fileName:{type:"string"},requestHeaders:{type:"object[]"}}}}}});g.prototype.init=function(){var t=this;this.oFilePath=a.FileUploaderHelper.createTextField(this.getId()+"-fu_input").addEventDelegate({onAfterRendering:function(){if(t.getWidth()){t._resizeDomElements();}}});this.oBrowse=a.FileUploaderHelper.createButton();this.oFilePath.setParent(this);this.oBrowse.setParent(this);this.oFileUpload=null;this.bMobileLib=this.oBrowse.getMetadata().getName()=="sap.m.Button";if(!this.getIconOnly()){this.oBrowse.setText(this.getBrowseText());}else{this.oBrowse.setTooltip(this.getBrowseText());}if(sap.ui.getCore().getConfiguration().getAccessibility()){if(!g.prototype._sAccText){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");g.prototype._sAccText=r.getText("FILEUPLOAD_ACC");}if(this.oBrowse.addAriaDescribedBy){this.oBrowse.addAriaDescribedBy(this.getId()+"-AccDescr");}}};g.prototype.setButtonText=function(t){this.setProperty("buttonText",t,false);if(!this.getIconOnly()){this.oBrowse.setText(t||this.getBrowseText());}else{this.oBrowse.setTooltip(t||this.getBrowseText());}return this;};g.prototype.setIcon=function(i){this.oBrowse.setIcon(i);this.setProperty("icon",i,false);return this;};g.prototype.setIconHovered=function(i){this.setProperty("iconHovered",i,false);if(this.oBrowse.setIconHovered){this.oBrowse.setIconHovered(i);}return this;};g.prototype.setIconSelected=function(i){this.setProperty("iconSelected",i,false);if(this.oBrowse.setIconSelected){this.oBrowse.setIconSelected(i);}else{this.oBrowse.setActiveIcon(i);}return this;};g.prototype.setIconFirst=function(i){this.oBrowse.setIconFirst(i);this.setProperty("iconFirst",i,false);return this;};g.prototype.setIconOnly=function(i){this.setProperty("iconOnly",i,false);if(i){this.oBrowse.setText("");this.oBrowse.setTooltip(this.getButtonText()||this.getBrowseText());}else{this.oBrowse.setText(this.getButtonText()||this.getBrowseText());this.oBrowse.setTooltip("");}return this;};g.prototype.getIdForLabel=function(){return this.oBrowse.getId();};g.prototype._ensureBackwardsReference=function(){var i=this.oBrowse,I=i.getAriaLabelledBy(),r=L.getReferencingLabels(this);if(I){r.forEach(function(l){if(I.indexOf(l)===-1){i.addAriaLabelledBy(l);}});}return this;};g.prototype.setFileType=function(t){var T=this._convertTypesToArray(t);this.setProperty("fileType",T,false);return this;};g.prototype.setMimeType=function(t){var T=this._convertTypesToArray(t);this.setProperty("mimeType",T,false);return this;};g.prototype.setTooltip=function(t){var T,s;this._refreshTooltipBaseDelegate(t);this.setAggregation("tooltip",t,true);this._updateAccDescription();if(this.oFileUpload){T=this.getTooltip_AsString();s=this.$().find(".sapUiFupInputMask")[0];if(T){this.oFileUpload.setAttribute("title",T);s&&s.setAttribute("title",T);}else{this.oFileUpload.removeAttribute("title");s&&s.removeAttribute("title");}}return this;};g.prototype._generateAccDescriptionText=function(){var t=this.getTooltip_AsString(),p=this.getPlaceholder(),v=this.getValue(),A="";if(t){A+=t+" ";}if(v){A+=v+" ";}else if(p){A+=p+" ";}A+=this._sAccText;return A;};g.prototype._updateAccDescription=function(){var A=document.getElementById(this.getId()+"-AccDescr"),n=this._generateAccDescriptionText();if(A){A.innerHTML=f(n);}};g.prototype.setXhrSettings=function(x){this.setAggregation("xhrSettings",x,true);return this;};g.prototype._convertTypesToArray=function(t){if(typeof t==="string"){if(t===""){return[];}else{return t.split(",").map(function(T){return T.trim();});}}return t;};g.prototype.exit=function(){this.oFilePath.destroy();this.oBrowse.destroy();if(this.oIFrameRef){q(this.oIFrameRef).unbind();sap.ui.getCore().getStaticAreaRef().removeChild(this.oIFrameRef);this.oIFrameRef=null;}};g.prototype.onBeforeRendering=function(){var s=sap.ui.getCore().getStaticAreaRef();q(this.oFileUpload).appendTo(s);q(this.oFileUpload).unbind();};g.prototype.onAfterRendering=function(){this.prepareFileUploadAndIFrame();this._cacheDOMEls();this._addLabelFeaturesToBrowse();q(this.oFileUpload).change(q.proxy(this.handlechange,this));if(!this.bMobileLib){this.oFilePath.$().attr("tabindex","-1");}else{this.oFilePath.$().find('input').attr("tabindex","-1");}if((!!D.browser.internet_explorer&&D.browser.version==9)){this.oBrowse.$().attr("tabindex","-1");}if(L.isRequired(this)){this.oBrowse.$().attr("aria-required","true");}setTimeout(this._recalculateWidth.bind(this),0);this.oFilePath.$().find('input').removeAttr("role").attr("aria-live","polite");if(this.getValueState()==V.Error){this.oBrowse.$().attr("aria-invalid","true");}};g.prototype._cacheDOMEls=function(){this.FUEl=this.getDomRef("fu");this.FUDataEl=this.getDomRef("fu_data");};g.prototype.onfocusin=function(e){if(!this.oFilePath.shouldValueStateMessageBeOpened||this.oFilePath.shouldValueStateMessageBeOpened()){this.openValueStateMessage();}};g.prototype.onsapfocusleave=function(e){if(!e.relatedControlId||!b(this.getDomRef(),sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())){this.closeValueStateMessage();}};g.prototype._recalculateWidth=function(){if(this.getWidth()){if(this.getButtonOnly()&&this.oBrowse.getDomRef()){this.oBrowse.getDomRef().style.width=this.getWidth();}this._resizeDomElements();}};g.prototype.getFocusDomRef=function(){return this.$("fu").get(0);};g.prototype._resizeDomElements=function(){var i=this.getId();this._oBrowseDomRef=this.oBrowse.getDomRef();var $=q(this._oBrowseDomRef);var _=$.parent().outerWidth(true);this._oFilePathDomRef=this.oFilePath.getDomRef();var o=this._oFilePathDomRef;var w=this.getWidth();if(w.substr(-1)=="%"&&o){while(o.id!=i){o.style.width="100%";o=o.parentNode;}o.style.width=w;}else{if(o){o.style.width=w;var e=q(this._oFilePathDomRef);var h=e.outerWidth()-_;if(h<0){this.oFilePath.getDomRef().style.width="0px";if(this.oFileUpload&&!D.browser.internet_explorer){this.oFileUpload.style.width=$.outerWidth(true);}}else{this.oFilePath.getDomRef().style.width=h+"px";}}}};g.prototype.onresize=function(){this._recalculateWidth();};g.prototype.onThemeChanged=function(){this._recalculateWidth();};g.prototype.setEnabled=function(e){var $=q(this.oFileUpload);this.setProperty("enabled",e,true);this.oFilePath.setEnabled(e);this.oBrowse.setEnabled(e);e?$.removeAttr('disabled'):$.attr('disabled','disabled');this.$().toggleClass("sapUiFupDisabled",!e);return this;};g.prototype.setValueState=function(v){this.setProperty("valueState",v,true);if(this.oFilePath.setValueState){this.oFilePath.setValueState(v);}else{d.warning("Setting the valueState property with the combination of libraries used is not supported.",this);}if(this.oBrowse.getDomRef()){if(v==V.Error){this.oBrowse.$().attr("aria-invalid","true");}else{this.oBrowse.$().removeAttr("aria-invalid");}}if(b(this.getDomRef(),document.activeElement)){switch(v){case V.Error:case V.Warning:case V.Success:this.openValueStateMessage();break;default:this.closeValueStateMessage();}}return this;};g.prototype.setValueStateText=function(v){if(this.oFilePath.setValueStateText){this.oFilePath.setValueStateText(v);}else{d.warning("Setting the valueStateText property with the combination of libraries used is not supported.",this);}return this.setProperty("valueStateText",v,true);};g.prototype.setUploadUrl=function(v,e){this.setProperty("uploadUrl",v,true);var $=this.$("fu_form");$.attr("action",this.getUploadUrl());return this;};g.prototype.setPlaceholder=function(p){this.setProperty("placeholder",p,true);this.oFilePath.setPlaceholder(p);this._updateAccDescription();return this;};g.prototype.setStyle=function(s){this.setProperty("style",s,true);if(s){if(s=="Transparent"){if(this.oBrowse.setLite){this.oBrowse.setLite(true);}else{this.oBrowse.setType("Transparent");}}else{if(this.oBrowse.setType){this.oBrowse.setType(s);}else{if(s=="Emphasized"){s="Emph";}this.oBrowse.setStyle(s);}}}return this;};g.prototype.setValue=function(v,e,s){var o=this.getValue();var h;if((o!=v)||this.getSameFilenameAllowed()){var u=this.getUploadOnChange()&&v;this.setProperty("value",v,u);if(this.oFilePath){this.oFilePath.setValue(v);if(this.oBrowse.getDomRef()&&!s&&b(this.getDomRef(),document.activeElement)){this.oBrowse.focus();}}var i=this.getDomRef("fu_form"),j=this.getDomRef("fu_input-inner");if(this.oFileUpload&&i&&!v){i.reset();this.getDomRef("fu_input").value="";if(j){j.value="";}q(this.FUDataEl).val(this.getAdditionalData());}if(e){if(window.File){h=this.FUEl.files;}if(!this.getSameFilenameAllowed()||v){this.fireChange({id:this.getId(),newValue:v,files:h});}}if(u){this.upload();}}return this;};g.prototype.clear=function(){var u=this.getDomRef("fu_form");if(u){u.reset();}return this.setValue("",false,true);};g.prototype.onmousedown=function(e){if(!this.bMobileLib){this.oBrowse.onmousedown(e);}};g.prototype.onmouseup=function(e){if(!this.bMobileLib){this.oBrowse.onmouseup(e);}};g.prototype.onmouseover=function(e){if(!this.bMobileLib){q(this.oBrowse.getDomRef()).addClass('sapUiBtnStdHover');this.oBrowse.onmouseover(e);}};g.prototype.onmouseout=function(e){if(!this.bMobileLib){q(this.oBrowse.getDomRef()).removeClass('sapUiBtnStdHover');this.oBrowse.onmouseout(e);}};g.prototype.setAdditionalData=function(A){this.setProperty("additionalData",A,true);var o=this.FUDataEl;if(o){A=this.getAdditionalData()||"";o.value=A;}return this;};g.prototype.sendFiles=function(x,I){var t=this;var A=true;for(var i=0;i<x.length;i++){if(!x[i].bPosted){A=false;break;}}if(A){if(this.getSameFilenameAllowed()&&this.getUploadOnChange()){t.setValue("",true);}return;}var X=x[I];var s=X.file.name?X.file.name:"MultipartFile";if((D.browser.edge||D.browser.internet_explorer)&&X.file.type&&X.xhr.readyState==1){var e=X.file.type;X.xhr.setRequestHeader("Content-Type",e);X.requestHeaders.push({name:"Content-Type",value:e});}var r=X.requestHeaders;var p=function(P){var o={lengthComputable:!!P.lengthComputable,loaded:P.loaded,total:P.total};t.fireUploadProgress({"lengthComputable":o.lengthComputable,"loaded":o.loaded,"total":o.total,"fileName":s,"requestHeaders":r});};X.xhr.upload.addEventListener("progress",p);X.xhr.onreadystatechange=function(){var R;var h;var H={};var P;var j;var k;var l;l=X.xhr.readyState;var S=X.xhr.status;if(X.xhr.readyState==4){if(X.xhr.responseXML){R=X.xhr.responseXML.documentElement.textContent;}h=X.xhr.response;P=X.xhr.getAllResponseHeaders();if(P){j=P.split("\u000d\u000a");for(var i=0;i<j.length;i++){if(j[i]){k=j[i].indexOf("\u003a\u0020");H[j[i].substring(0,k)]=j[i].substring(k+2);}}}t.fireUploadComplete({"fileName":s,"headers":H,"response":R,"responseRaw":h,"readyStateXHR":l,"status":S,"requestHeaders":r});}t._bUploading=false;};if(X.xhr.readyState===0||X.bPosted){I++;t.sendFiles(x,I);}else{X.xhr.send(X.file);X.bPosted=true;I++;t.sendFiles(x,I);}};g.prototype.upload=function(p){if(!this.getEnabled()){return;}var u=this.getDomRef("fu_form");try{this._bUploading=true;if(this.getSendXHR()&&window.File){var e=this.FUEl.files;if(p){this._sendProcessedFilesWithXHR(e);}else{this._sendFilesWithXHR(e);}}else if(u){u.submit();this._resetValueAfterUploadStart();}}catch(E){d.error("File upload failed:\n"+E.message);}};g.prototype.abort=function(h,H){if(!this.getUseMultipart()){var s=this._aXhr.length-1;for(var i=s;i>-1;i--){if(h&&H){for(var j=0;j<this._aXhr[i].requestHeaders.length;j++){var e=this._aXhr[i].requestHeaders[j].name;var v=this._aXhr[i].requestHeaders[j].value;if(e==h&&v==H){this._aXhr[i].xhr.abort();this.fireUploadAborted({"fileName":this._aXhr[i].fileName,"requestHeaders":this._aXhr[i].requestHeaders});this._aXhr.splice(i,1);d.info("File upload aborted.");break;}}}else{this._aXhr[i].xhr.abort();this.fireUploadAborted({"fileName":this._aXhr[i].fileName,"requestHeaders":this._aXhr[i].requestHeaders});this._aXhr.splice(i,1);d.info("File upload aborted.");}}}else if(this._uploadXHR&&this._uploadXHR.abort){this._uploadXHR.abort();this.fireUploadAborted({"fileName":null,"requestHeaders":null});d.info("File upload aborted.");}};g.prototype.onkeypress=function(e){this.onkeydown(e);};g.prototype.onclick=function(e){if(this.getSameFilenameAllowed()&&this.getEnabled()){this.setValue("",true);}if(this.oBrowse.getDomRef()&&b(this.getDomRef(),document.activeElement)){this.oBrowse.focus();}};g.prototype.onkeydown=function(e){if(!this.getEnabled()){return;}if(this.getSameFilenameAllowed()&&this.getUploadOnChange()){this.setValue("",true);}var k=e.keyCode,h=K;if(k==h.DELETE||k==h.BACKSPACE){if(this.oFileUpload){this.setValue("",true);}}else if(k==h.SPACE||k==h.ENTER){if(!(!!D.browser.internet_explorer&&D.browser.version<=9)&&this.oFileUpload){this.oFileUpload.click();e.preventDefault();e.stopPropagation();}}else if(k!=h.TAB&&k!=h.SHIFT&&k!=h.F6&&k!=h.PAGE_UP&&k!=h.PAGE_DOWN&&k!=h.ESCAPE&&k!=h.END&&k!=h.HOME&&k!=h.ARROW_LEFT&&k!=h.ARROW_UP&&k!=h.ARROW_RIGHT&&k!=h.ARROW_DOWN){e.preventDefault();e.stopPropagation();}};g.prototype._isFilenameTooLong=function(s){var m=this.getMaximumFilenameLength();if(m!==0&&s.length>m){d.info("The filename of "+s+" ("+s.length+" characters)  is longer than the maximum of "+m+" characters.");return true;}return false;};g.prototype.handlechange=function(e){if(this.oFileUpload&&this.getEnabled()){var h=this.getFileType();var s='';var w,n,i,j;var u=this.getDomRef("fu_form");if(window.File){var k=e.target.files;if(this._areFilesAllowed(k)){this.fireFileAllowed();s=this._generateInputValue(k);}else{u.reset();this.setValue("",true,true);return;}}else if(h&&h.length>0){w=true;n=this.oFileUpload.value||"";i=n.lastIndexOf(".");j=(i===-1)?"":n.substring(i+1);for(var l=0;l<h.length;l++){if(j==h[l]){w=false;}}if(w){d.info("File: "+n+" is of type "+j+". Allowed types are: "+h+".");this.fireTypeMissmatch({fileName:n,fileType:j});u.reset();this.setValue("",true,true);return;}if(this._isFilenameTooLong(n)){this.fireFilenameLengthExceed({fileName:n});u.reset();this.setValue("",true,true);return;}if(n){this.fireFileAllowed();}}var v=this.oFileUpload.value||"";var I=v.lastIndexOf("\\");if(I>=0){v=v.substring(I+1);}if(this.getMultiple()){if(!(D.browser.internet_explorer&&D.browser.version<=9)){v=s;}}if(v||D.browser.chrome){this.setValue(v,true);}}};g.prototype._sendFilesWithXHR=function(e){var h,H,v,x,X=this.getXhrSettings();if(e.length>0){if(this.getUseMultipart()){h=1;}else{h=e.length;}this._aXhr=this._aXhr||[];for(var j=0;j<h;j++){this._uploadXHR=new window.XMLHttpRequest();x={xhr:this._uploadXHR,requestHeaders:[]};this._aXhr.push(x);x.xhr.open("POST",this.getUploadUrl(),true);if(X){x.xhr.withCredentials=X.getWithCredentials();}if(this.getHeaderParameters()){var n=this.getHeaderParameters();for(var i=0;i<n.length;i++){H=n[i].getName();v=n[i].getValue();x.requestHeaders.push({name:H,value:v});}}var s=e[j].name;var r=x.requestHeaders;x.fileName=s;x.file=e[j];this.fireUploadStart({"fileName":s,"requestHeaders":r});for(var k=0;k<r.length;k++){if(x.xhr.readyState===0){break;}H=r[k].name;v=r[k].value;x.xhr.setRequestHeader(H,v);}}if(this.getUseMultipart()){var o=new window.FormData();var p=this.FUEl.name;for(var l=0;l<e.length;l++){this._appendFileToFormData(o,p,e[l]);}o.append("_charset_","UTF-8");var t=this.FUDataEl.name;if(this.getAdditionalData()){var u=this.getAdditionalData();o.append(t,u);}else{o.append(t,"");}if(this.getParameters()){var P=this.getParameters();for(var m=0;m<P.length;m++){var N=P[m].getName();v=P[m].getValue();o.append(N,v);}}x.file=o;this.sendFiles(this._aXhr,0);}else{this.sendFiles(this._aXhr,0);}this._bUploading=false;this._resetValueAfterUploadStart();}return this;};g.prototype._appendFileToFormData=function(o,s,e){if(e instanceof window.Blob&&e.name){o.append(s,e,e.name);}else{o.append(s,e);}};g.prototype._sendProcessedFilesWithXHR=function(e){this.getProcessedBlobsFromArray(e).then(function(B){this._sendFilesWithXHR(B);}.bind(this)).catch(function(r){d.error("File upload failed: "+r&&r.message?r.message:"no details available");});return this;};g.prototype._areFilesAllowed=function(e){var n,w,I,s,t,m=this.getMaximumFileSize(),M=this.getMimeType(),h=this.getFileType();for(var i=0;i<e.length;i++){n=e[i].name;t=e[i].type;if(!t){t="unknown";}var S=((e[i].size/1024)/1024);if(m&&(S>m)){d.info("File: "+n+" is of size "+S+" MB which exceeds the file size limit of "+m+" MB.");this.fireFileSizeExceed({fileName:n,fileSize:S});return false;}if(this._isFilenameTooLong(n)){this.fireFilenameLengthExceed({fileName:n});return false;}if(M&&M.length>0){var W=true;for(var j=0;j<M.length;j++){if(t==M[j]||M[j]=="*/*"||t.match(M[j])){W=false;}}if(W&&!(t==="unknown"&&(D.browser.edge||D.browser.msie))){d.info("File: "+n+" is of type "+t+". Allowed types are: "+M+".");this.fireTypeMissmatch({fileName:n,mimeType:t});return false;}}if(h&&h.length>0){w=true;I=n.lastIndexOf(".");s=(I===-1)?"":n.substring(I+1);for(var k=0;k<h.length;k++){if(s.toLowerCase()==h[k].toLowerCase()){w=false;}}if(w){d.info("File: "+n+" is of type "+s+". Allowed types are: "+h+".");this.fireTypeMissmatch({fileName:n,fileType:s});return false;}}}return true;};g.prototype._sendFilesFromDragAndDrop=function(e){if(this._areFilesAllowed(e)){this._sendFilesWithXHR(e);}return this;};g.prototype._generateInputValue=function(e){var s="";for(var i=0;i<e.length;i++){s=s+'"'+e[i].name+'" ';}return s;};g.prototype.getBrowseText=function(){if(!g.prototype._sBrowseText){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");g.prototype._sBrowseText=r.getText("FILEUPLOAD_BROWSE");}return g.prototype._sBrowseText?g.prototype._sBrowseText:"Browse...";};g.prototype.getShortenValue=function(){return this.getValue();};g.prototype.prepareFileUploadAndIFrame=function(){if(!this.oFileUpload){var e=[];e.push('<input ');e.push('type="file" ');e.push('aria-hidden="true" ');if(this.getName()){if(this.getMultiple()){if(!(D.browser.internet_explorer&&D.browser.version<=9)){e.push('name="'+f(this.getName())+'[]" ');}}else{e.push('name="'+f(this.getName())+'" ');}}else{if(this.getMultiple()){if(!(D.browser.internet_explorer&&D.browser.version<=9)){e.push('name="'+this.getId()+'[]" ');}}else{e.push('name="'+this.getId()+'" ');}}e.push('id="'+this.getId()+'-fu" ');if(!(!!D.browser.internet_explorer&&D.browser.version==9)){e.push('tabindex="-1" ');}e.push('size="1" ');if(this.getTooltip_AsString()){e.push('title="'+f(this.getTooltip_AsString())+'" ');}else if(this.getValue()!==""){e.push('title="'+f(this.getValue())+'" ');}if(!this.getEnabled()){e.push('disabled="disabled" ');}if(this.getMultiple()){if(!(D.browser.internet_explorer&&D.browser.version<=9)){e.push('multiple ');}}if((this.getMimeType()||this.getFileType())&&window.File){var m=this.getMimeType()||[];var h=this.getFileType()||[];h=h.map(function(j){return j.indexOf(".")===0?j:"."+j;});var A=h.concat(m).join(",");e.push('accept="'+f(A)+'" ');}e.push('>');this.oFileUpload=q(e.join("")).prependTo(this.$().find(".sapUiFupInputMask")).get(0);}else{q(this.oFileUpload).prependTo(this.$().find(".sapUiFupInputMask"));}if(!this.oIFrameRef){var i=document.createElement("iframe");i.style.display="none";i.id=this.sId+"-frame";sap.ui.getCore().getStaticAreaRef().appendChild(i);i.contentWindow.name=this.sId+"-frame";var t=this;this._bUploading=false;q(i).load(function(E){if(t._bUploading){d.info("File uploaded to "+t.getUploadUrl());var r;try{r=t.oIFrameRef.contentWindow.document.body.innerHTML;}catch(j){}t.fireUploadComplete({"response":r});t._bUploading=false;}});this.oIFrameRef=i;}};g.prototype.openValueStateMessage=function(){if(this.oFilePath.openValueStateMessage){this.oFilePath.openValueStateMessage();this.oBrowse.$().addAriaDescribedBy(this.oFilePath.getId()+"-message");}};g.prototype.closeValueStateMessage=function(){if(this.oFilePath.closeValueStateMessage){this.oFilePath.closeValueStateMessage();this.oBrowse.$().removeAriaDescribedBy(this.oFilePath.getId()+"-message");}};g.prototype._resetValueAfterUploadStart=function(){d.info("File uploading to "+this.getUploadUrl());if(this.getSameFilenameAllowed()&&this.getUploadOnChange()&&this.getUseMultipart()){this.setValue("",true);}};g.prototype._addLabelFeaturesToBrowse=function(){var $;if(this.oBrowse&&this.oBrowse.$().length){$=this.oBrowse.$();$.attr("type', 'button");$.click(function(e){e.preventDefault();this.FUEl.click();}.bind(this));}};g.prototype.getProcessedBlobsFromArray=function(B){return new Promise(function(r){r(B);});};return g;});
