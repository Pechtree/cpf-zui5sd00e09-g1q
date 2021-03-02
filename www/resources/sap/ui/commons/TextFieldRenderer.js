/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Renderer','sap/ui/core/ValueStateSupport','sap/ui/core/library','sap/ui/Device'],function(R,V,c,D){"use strict";var a=c.ValueState;var b=c.Design;var I=c.ImeMode;var T={};T.render=function(r,t){var w=t.getWidth();var d=V.enrichTooltip(t,t.getTooltip_AsString());var e=t._getRenderOuter();if(e){r.write("<div");r.writeControlData(t);r.addClass("sapUiTfBack");this.renderStyles(r,t);if(d){r.writeAttributeEscaped('title',d);}var s;if(w&&w!=''){s='width: '+w+';';}if(this.renderOuterAttributes){this.renderOuterAttributes(r,t);}if(s){r.writeAttribute('style',s);}r.writeStyles();r.writeClasses();r.write(">");if(this.renderOuterContentBefore){this.renderOuterContentBefore(r,t);}}if(this.getInnerTagName){r.write('<'+this.getInnerTagName());}else{r.write("<input");}r.addClass("sapUiTf");if(!e){r.writeControlData(t);r.addClass("sapUiTfBack");this.renderStyles(r,t);if(w&&w!=''){r.addStyle("width",w);}}else{r.writeAttribute('id',t.getId()+'-input');r.addClass("sapUiTfInner");r.addStyle("width",'100%');}if(d){r.writeAttributeEscaped('title',d);}if(t.getName()){r.writeAttributeEscaped('name',t.getName());}if(!t.getEditable()&&t.getEnabled()){r.writeAttribute('readonly','readonly');}if(this.renderTextFieldEnabled){this.renderTextFieldEnabled(r,t);}else if(!t.getEnabled()){r.writeAttribute('disabled','disabled');r.writeAttribute('tabindex','-1');}else if(!t.getEditable()){r.writeAttribute('tabindex','0');}else{r.writeAttribute('tabindex','0');}var f=t.getTextDirection();if(f){r.addStyle("direction",f.toLowerCase());}var g=T.getTextAlign(t.getTextAlign(),f);if(g){r.addStyle("text-align",g);}switch(t.getImeMode()){case I.Inactive:r.addStyle('ime-mode','inactive');break;case I.Active:r.addStyle('ime-mode','active');break;case I.Disabled:r.addStyle('ime-mode','disabled');break;}if(t.getDesign()==b.Monospace){r.addClass('sapUiTfMono');}if(t.getMaxLength()){r.writeAttribute("maxlength",t.getMaxLength());}if(this.renderInnerAttributes){this.renderInnerAttributes(r,t);}if(this.renderARIAInfo){this.renderARIAInfo(r,t);}var p=t.getPlaceholder();if(p){if(this.convertPlaceholder){p=this.convertPlaceholder(t);}if(D.support.input.placeholder){r.writeAttributeEscaped('placeholder',p);}}r.writeStyles();r.writeClasses();if(this.getInnerTagName){r.write(">");}else{r.write(" value=\"");if(!D.support.input.placeholder&&p&&!t.getValue()){r.writeEscaped(p);}else{r.writeEscaped(t.getValue());}r.write("\"");r.write("/>");}if(this.getInnerTagName){if(this.renderInnerContent){this.renderInnerContent(r,t);}r.write('</'+this.getInnerTagName()+'>');}if(e){if(this.renderOuterContent){this.renderOuterContent(r,t);}r.write("</div>");}};T.renderStyles=function(r,t){r.addClass('sapUiTfBrd');if(t.getEnabled()){if(!t.getEditable()){r.addClass("sapUiTfRo");}else{r.addClass("sapUiTfStd");}}else{r.addClass("sapUiTfDsbl");}switch(t.getValueState()){case(a.Error):r.addClass('sapUiTfErr');break;case(a.Success):r.addClass('sapUiTfSucc');break;case(a.Warning):r.addClass('sapUiTfWarn');break;}if(t.getRequired()){r.addClass('sapUiTfReq');}if(t.getPlaceholder()&&!D.support.input.placeholder){r.addClass('sapUiTfPlace');}};T.onfocus=function(t){var o=t.$();var d;o.addClass("sapUiTfFoc");if(!D.support.input.placeholder&&!t.getValue()&&t.getPlaceholder()){if(t._getRenderOuter()){d=t.$("input");}else{d=o;}o.removeClass("sapUiTfPlace");d.val("");}};T.onblur=function(t){var o=t.$();var d;o.removeClass("sapUiTfFoc");var p=t.getPlaceholder();if(!D.support.input.placeholder){if(t._getRenderOuter()){d=t.$("input");}else{d=o;}if(!d.val()&&p){o.addClass("sapUiTfPlace");if(this.convertPlaceholder){p=this.convertPlaceholder(t);}d.val(p);}}};T.setValueState=function(t,o,n){var d=t.$();var e;var r=t._getRenderOuter();if(r){e=t.$("input");}else{e=d;}switch(o){case(a.Error):d.removeClass('sapUiTfErr');e.removeAttr('aria-invalid');break;case(a.Success):d.removeClass('sapUiTfSucc');break;case(a.Warning):d.removeClass('sapUiTfWarn');break;}switch(n){case(a.Error):d.addClass('sapUiTfErr');e.attr('aria-invalid',true);break;case(a.Success):d.addClass('sapUiTfSucc');break;case(a.Warning):d.addClass('sapUiTfWarn');break;}var f=V.enrichTooltip(t,t.getTooltip_AsString());if(f){d.attr('title',f);if(r){t.$("input").attr('title',f);}}else{d.removeAttr('title');if(r){t.$("input").removeAttr('title');}}};T.setEditable=function(t,e){if(!t.getEnabled()){return;}var o=t.$();var d;if(t._getRenderOuter()){d=t.$("input");}else{d=o;}if(e){o.removeClass('sapUiTfRo').addClass('sapUiTfStd');d.removeAttr('readonly');d.removeAttr('aria-readonly');}else{o.removeClass('sapUiTfStd').addClass('sapUiTfRo');d.attr('readonly','readonly');d.attr('aria-readonly',true);}};T.setEnabled=function(t,e){var o=t.$();var d;if(t._getRenderOuter()){d=t.$("input");}else{d=o;}if(e){if(t.getEditable()){o.removeClass('sapUiTfDsbl').addClass('sapUiTfStd').removeAttr('aria-disabled');d.removeAttr('disabled').removeAttr('aria-disabled').attr('tabindex','0');}else{o.removeClass('sapUiTfDsbl').addClass('sapUiTfRo').removeAttr('aria-disabled');d.removeAttr('disabled').removeAttr('aria-disabled').attr('tabindex','0').attr('readonly','readonly').attr('aria-readonly',true);}}else{if(t.getEditable()){o.removeClass('sapUiTfStd').addClass('sapUiTfDsbl').attr('aria-disabled','true');d.attr('disabled','disabled').attr('aria-disabled','true').attr('tabindex','-1');}else{o.removeClass('sapUiTfRo').addClass('sapUiTfDsbl').attr('aria-disabled','true');d.removeAttr('readonly').removeAttr('aria-readonly').attr('disabled','disabled').attr('aria-disabled','true').attr('tabindex','-1');}}};T.removeValidVisualization=function(t){var o=t.$();if(o){o.removeClass("sapUiTfSucc");}else{setTimeout(function(){T.removeValidVisualization(t);},1000);}};T.setDesign=function(t,d){t.$().toggleClass('sapUiTfMono',(d==b.Monospace));};T.setRequired=function(t,r){var o;if(t._getRenderOuter()){o=t.$("input");}else{o=t.$();}t.$().toggleClass('sapUiTfReq',r);if(r){o.attr("aria-required",true);}else{o.removeAttr("aria-required");}};T.renderARIAInfo=function(r,t){var p={role:t.getAccessibleRole().toLowerCase(),multiline:false,autocomplete:'none'};if(t.getValueState()==a.Error){p["invalid"]=true;}r.writeAccessibilityState(t,p);};T.getTextAlign=R.getTextAlign;return T;},true);