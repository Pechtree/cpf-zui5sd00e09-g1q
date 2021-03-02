sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(q,B,F,a){"use strict";var A=new F({filters:[new F({path:"type",operator:a.EQ,value1:sap.ui.core.MessageType.Warning}),new F({path:"type",operator:a.EQ,value1:sap.ui.core.MessageType.Error})],and:false});var e=new F({path:"type",operator:a.EQ,value1:sap.ui.core.MessageType.Error});var l="model";function g(t,c,C){var y,n;var f;var I;var s=(function(){var o=c.getOwnerComponent();var r=t.componentRegistry[o.getId()];return!!(r.methods.showConfirmationOnDraftActivate&&r.methods.showConfirmationOnDraftActivate());})();function b(k){var m=t.oNavigationControllerProxy.getActiveComponents();var r;for(var i=0;i<m.length&&!r;i++){var o=m[i];var R=t.componentRegistry[o];r=R.viewLevel&&(R.methods.getScrollFunction||q.noop)(k);}return r||null;}function d(S){var r,L,m;r=C.getDialogFragment("sap.suite.ui.generic.template.fragments.MessagesBeforeSave",{itemSelected:function(){L.setProperty("/backbtnvisibility",true);},onBackButtonPress:function(){m.navigateBack();L.setProperty("/backbtnvisibility",false);},onAccept:function(){f=y;r.close();},onReject:function(){f=n;r.close();},isPositionable:function(x){return!!(x&&b(x));},titlePressed:function(E){r.close();var M=E.getParameter("item");var x=M.getBindingContext("msg").getObject();f=b(x.controlIds);r.close();},afterClose:function(){y=null;n=null;(f||q.noop)();f=null;}},l,function(x){m=x.getContent()[0];x.setModel(sap.ui.getCore().getMessageManager().getMessageModel(),"msg");I=x.getContent()[0].getBinding("items");});L=r.getModel(l);L.setProperty("/situation",S);L.setProperty("/backbtnvisibility",false);var k=[];var o=t.oNavigationControllerProxy.getActiveComponents();var O=(S<3);for(var i=0;i<o.length;i++){var u=o[i];var R=t.componentRegistry[u];if(R.oController===c||S!==2){var v=(R.methods.getMessageFilters||q.noop)(O);k=v?k.concat(v):k;}}if(k.length===0){return null;}var w=k.length===1?k[0]:new F({filters:k,and:false});if(S===3){e=new F({filters:[w,e],and:true});w=new F({filters:[w,A],and:true});if(I.filter(e).getLength()===0){L.setProperty("/situation",4);}}I.filter(w);return I.getLength()&&r;}function h(i){var v=d(i?1:2);if(v){v.open();return Promise.reject();}if(!(i&&s)){return Promise.resolve();}v=d(3);return v?new Promise(function(r,R){y=r;n=R;v.open();}):Promise.resolve();}function p(i,o){t.oApplicationProxy.performAfterSideEffectExecution(function(){if(!t.oBusyHelper.isBusy()){h(i).then(o);}});}function j(){return!!d(1);}return{prepareAndRunSaveOperation:p,hasValidationMessageOnDetailsViews:j};}return B.extend("sap.suite.ui.generic.template.lib.BeforeSaveHelper",{constructor:function(t,c,C){q.extend(this,g(t,c,C));}});});
