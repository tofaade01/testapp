sap.ui.define(["sap/ui/core/ComponentContainer"], (ComponentContainer) => {
	"use strict";
	// alert("UI5 is ready");
    new ComponentContainer({
        name: "testapp",
        settings: {
            id: "testapp"
        },
        async: true
    }).placeAt("content");
    alert("HALO BANG");
});