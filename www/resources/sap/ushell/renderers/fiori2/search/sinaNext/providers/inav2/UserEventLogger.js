sinaDefine(['../../core/core','../../core/util','./ajaxTemplates'],function(c,u,a){"use strict";return c.defineClass({_init:function(p){this.provider=p;this.sina=p.sina;this.eventLoggingActive=false;this.clickCounterActive=false;this.delayedConsumer=new u.DelayedConsumer({timeDelay:2000,consumer:this.processEvents,consumerContext:this});},delayedInit:function(){this.eventLoggingActive=this.provider.supports('SearchInteractionLogging','SearchInteractionLogging');this.clickCounterActive=this.provider.supports('PersonalizedSearch');},logUserEvent:function(e){e.timeStamp=u.generateTimestamp();if(this.eventLoggingActive&&e.type!=='ITEM_NAVIGATE'){this.delayedConsumer.add(e);}if(this.clickCounterActive&&e.type==='ITEM_NAVIGATE'&&e.sourceUrlArray.length!==0){this.incrementClickCounter(e.sourceUrlArray,e.targetUrl,e.systemAndClient);}},processEvents:function(e){var r={SearchInteractionLogging:{SessionID:this.provider.sessionId,EventList:[]}};for(var i=0;i<e.length;++i){var b=e[i];var d={Type:b.type,Timestamp:b.timeStamp,ParameterList:[]};for(var n in b){if(n==='type'||n==='timeStamp'){continue;}var v=b[n];d.ParameterList.push({Name:n,Value:v});}r.SearchInteractionLogging.EventList.push(d);}return this.provider.ajaxClient.postJson(this.provider.getResponseUrl,r);},incrementClickCounter:function(s,t,b){if(!t){return undefined;}if(t.indexOf("#")===-1){return undefined;}if(!this.provider.supports('PersonalizedSearch','SetUserStatus')){return undefined;}var g=function(H){return H.split("-")[0];};var d=function(H){return H.split("-")[1].split("&")[0];};var e=function(p){var o=p;var q=[];for(var i=0,r=o.length;i<r;i++){var v=o[i];if(v.indexOf("sap-system")!==-1){continue;}var w=v.split("=")[0];var x=v.split("=")[1];q.push({Name:w,Value:x});}return q;};var N=a.incrementClickCounterRequest.SearchConfiguration.ClientEvent.NavigationEventList;var h=s;var f=g(h[0]);N[0].SourceApplication.SemanticObjectType=f;var j=d(h[0]);N[0].SourceApplication.Intent=j;var k=h[1]!==undefined?e(h[1].split("&")):[];N[0].SourceApplication.ParameterList=k;h=t.split("?");var l=g(h[0]).split("#")[1];N[1].TargetApplication.SemanticObjectType=l;var m=d(h[0]);N[1].TargetApplication.Intent=m;var n=h[1]!==undefined?e(h[1].split("&")):[];N[1].TargetApplication.ParameterList=n;var S={"System":b.systemId,"Client":b.client};delete N[1].TargetApplication.System;delete N[1].TargetApplication.Client;N[1].TargetApplication=jQuery.extend(N[1].TargetApplication,S);return this.provider.ajaxClient.postJson(this.provider.getResponseUrl,a.incrementClickCounterRequest);}});});
