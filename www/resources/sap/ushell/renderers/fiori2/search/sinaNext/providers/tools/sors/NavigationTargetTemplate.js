sinaDefine(['../../../core/core'],function(c){"use strict";return c.defineClass({_init:function(p){this.sina=p.sina;this.navigationTargetGenerator=p.navigationTargetGenerator;this.label=p.label;this.sourceObjectType=p.sourceObjectType;this.targetObjectType=p.targetObjectType;this.conditions=p.conditions;},generate:function(d){var a=this.sina.getDataSource(this.targetObjectType);var f=this.sina.createFilter({dataSource:a,searchTerm:'*'});for(var i=0;i<this.conditions.length;++i){var b=this.conditions[i];var e=this.sina.createSimpleCondition({attribute:b.targetPropertyName,attributeLabel:a.getAttributeMetadata(b.targetPropertyName).label,operator:this.sina.ComparisonOperator.Eq,value:d[b.sourcePropertyName].value,valueLabel:d[b.sourcePropertyName].valueFormatted});f.autoInsertCondition(e);}return this.sina._createNavigationTarget({label:this.label,targetUrl:this.navigationTargetGenerator.urlPrefix+encodeURIComponent(JSON.stringify(f.toJson()))});}});});