sap.ui.define(["/sap/ui/core/mvc/XMLView"], (XMLView) => {
	"use strict";
	// alert("UI5 is ready");
    XMLView.create({
        viewName: "testapp.view.App"
    }).then((oView) => { oView.placeAt("content"); });
    alert("HALO BANG");
});