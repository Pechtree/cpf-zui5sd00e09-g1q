// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define([],function(){"use strict";function T(){this._oValue=undefined;};T.prototype.getPersData=function(){var d;d=new jQuery.Deferred();d.resolve(this._oValue);return d.promise();};T.prototype.setPersData=function(v){var d;d=new jQuery.Deferred();this._oValue=v;d.resolve();return d.promise();};T.prototype.delPersData=function(){var d;d=new jQuery.Deferred();this._oValue=undefined;d.resolve();return d.promise();};T.prototype.setValue=function(v){this._oValue=v;};T.prototype.getValue=function(){return this._oValue;};return T;});
