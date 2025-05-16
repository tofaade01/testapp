sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
	"use strict";

	return Controller.extend("testapp.controller.InvoiceList", {
		onInit() {
			const oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
            const oList = this.byId("invoiceList");
            const oSorter = new sap.ui.model.Sorter("ExtendedPrice", false, function (oContext) {
                return {
                key : oContext.getProperty("ExtendedPrice") > 50 ? "MAHAL COY" : "MURAH COY",
                text : oContext.getProperty("ExtendedPrice") > 50 ? "MAHAL COY" : "MURAH COY"
                }
            });
            oList.bindItems({
                path: "invoice>/Invoices",
                sorter: oSorter,
                template: new sap.m.ObjectListItem({
                    title: "{invoice>ProductName}",
                    number: "{invoice>ExtendedPrice}",
                    numberUnit: "{view>/currency}",
                    numberState: "{= ${invoice>ExtendedPrice} > 50 ? 'Error' : 'Success'}",
                })
            });
    	},
        onFilterInvoices(oEvent) {
			// build filter array
			const aFilter = [];
			const sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter({filters: [ new Filter({path:"ProductName", operator:FilterOperator.Contains, value1:sQuery}), new Filter({path:"Quantity", operator:FilterOperator.EQ, value1:sQuery}) ], or:true|false }));
			}

			// filter binding
			const oList = this.byId("invoiceList");
			const oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});
});