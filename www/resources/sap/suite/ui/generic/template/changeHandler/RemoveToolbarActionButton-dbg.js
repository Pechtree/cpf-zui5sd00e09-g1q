/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define([
	"jquery.sap.global",
	"sap/suite/ui/generic/template/changeHandler/util/ChangeHandlerUtils",
	"sap/suite/ui/generic/template/changeHandler/generic/RemoveElement"
], function(
	jQuery,
	Utils,
	RemoveElement
) {
	"use strict";
	/**
	 * Change handler for removing a toolbar action button.
	 *
	 * @alias sap.suite.ui.generic.template.changeHandler.RemoveToolbarActionButton
	 * @author SAP SE
	 * @version 1.65.1
	 * @experimental
	 */

	var RemoveToolbarActionButton = {};

	var LINEITEM = "com.sap.vocabularies.UI.v1.LineItem";

	RemoveToolbarActionButton.applyChange = function (oChange, oControl, mPropertyBag) {
		RemoveElement.applyChange(oChange, oControl, mPropertyBag);
	};

	RemoveToolbarActionButton.completeChangeContent = function (oChange, oSpecificChangeInfo, mPropertyBag) {
		oSpecificChangeInfo.custom = {};
		oSpecificChangeInfo.custom.annotation = LINEITEM;
		oSpecificChangeInfo.custom.fnGetAnnotationIndex = Utils.getLineItemRecordIndexForButton;
		RemoveElement.completeChangeContent(oChange, oSpecificChangeInfo, mPropertyBag);
	};

	return RemoveToolbarActionButton;
},
/* bExport= */true);