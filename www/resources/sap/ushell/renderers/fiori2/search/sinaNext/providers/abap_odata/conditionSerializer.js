sinaDefine(['../../core/core','../../sina/ComplexCondition','../../sina/ComparisonOperator','./typeConverter'],function(c,C,a,t){"use strict";var b=c.defineClass({_init:function(d){this.dataSource=d;},convertSinaToOdataOperator:function(s){switch(s){case a.Eq:return'EQ';case a.Lt:return'LT';case a.Gt:return'GT';case a.Le:return'LE';case a.Ge:return'GE';case a.Co:return'EQ';case a.Bw:return'EQ';case a.Ew:return'EQ';case'And':return"AND";case'Or':return"OR";default:throw new c.Exception('unknow comparison operator '+s);}},serializeComplexCondition:function(d){var r={"Id":1,"OperatorType":this.convertSinaToOdataOperator(d.operator),"SubFilters":[]};var s=d.conditions;for(var i=0;i<s.length;++i){var e=s[i];r.SubFilters.push(this.serialize(e));}return r;},serializeSimpleCondition:function(d){var m;var e;var f;m=this.dataSource.getAttributeMetadata(d.attribute);e=m.type;f={"ConditionAttribute":d.attribute,"ConditionOperator":this.convertSinaToOdataOperator(d.operator),"ConditionValue":t.sina2Odata(e,d.value,{operator:d.operator})};return f;},serializeBetweenCondition:function(d){var m;var e;var f;var v;var g;m=this.dataSource.getAttributeMetadata(d.conditions[0].attribute);e=m.type;if(d.conditions[0].operator==="Ge"){v=d.conditions[0].value;g=d.conditions[1].value;}else{v=d.conditions[1].value;g=d.conditions[0].value;}f={"ConditionAttribute":d.conditions[0].attribute,"ConditionOperator":"BT","ConditionValue":t.sina2Odata(e,v),"ConditionValueHigh":t.sina2Odata(e,g)};return f;},serialize:function(d){if(d instanceof C){if(d.operator==="And"&&d.conditions[0]&&(d.conditions[0].operator==="Ge"||d.conditions[0].operator==="Gt"||d.conditions[0].operator==="Le"||d.conditions[0].operator==="Lt")){if(d.conditions.length===1){return this.serializeSimpleCondition(d.conditions[0]);}return this.serializeBetweenCondition(d);}return this.serializeComplexCondition(d);}return this.serializeSimpleCondition(d);}});return{serialize:function(d,e){var s=new b(d);return s.serialize(e);}};});