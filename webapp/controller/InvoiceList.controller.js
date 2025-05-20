sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], (Controller, JSONModel, Filter, FilterOperator, MessageToast) => {
	"use strict";

	return Controller.extend("testapp.controller.InvoiceList", {
		onInit() {
			const oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getOwnerComponent().setModel(oViewModel, "view");
			this.getOwnerComponent().getModel("view").setProperty("/isRemoteData", false);
            // const oList = this.byId("invoiceList");
            // const oSorter = new sap.ui.model.Sorter("ExtendedPrice", false, function (oContext) {
            //     return {
            //     key : oContext.getProperty("ExtendedPrice") > 20 ? "MAHAL COY" : "MURAH COY",
            //     text : oContext.getProperty("ExtendedPrice") > 20 ? "MAHAL COY" : "MURAH COY"
            //     }
            // });

            // oList.bindItems({
            //     path: "invoice>/Invoices",
            //     sorter: oSorter,
            //     template: new sap.m.ObjectListItem({
            //         title: "{invoice>ProductName}",
            //         number: "{invoice>ExtendedPrice}",
            //         numberUnit: "{view>/currency}",
            //         numberState: "{= ${invoice>ExtendedPrice} > 20 ? 'Error' : 'Success'}",
			// 		type: "Navigation",
			// 		press: this.onPress.bind(this)
            //     })
            // });
    	},
        onFilterInvoices(oEvent) {
			// build filter array
			const aFilter = [];
			const sQuery = oEvent.getParameter("query");
			if (sQuery) {
				// aFilter.push(new Filter({filters: [ new Filter({path:"ProductName", operator:FilterOperator.Contains, value1:sQuery}), new Filter({path:"Quantity", operator:FilterOperator.EQ, value1:sQuery}) ], or:true }));
				const aFilters = [new Filter({path:"ProductName", operator:FilterOperator.Contains, value1:sQuery})];
				if (!isNaN(parseFloat(sQuery)) && isFinite(sQuery)) {
					aFilters.push(new Filter({path:"Quantity", operator:FilterOperator.EQ, value1:sQuery}));
				}
				aFilter.push(new Filter({filters: aFilters, or:true }));
			}

			// filter binding
			const oList = this.byId("invoiceList");
			const oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		onLocalData() {
			this.onInit();
			this._clearFilter();
			const oModel = this.getOwnerComponent().getModel("invoice");
			const oViewModel = this.getOwnerComponent().getModel("view");
			if (oModel) {
				this.getView().setModel(oModel, "invoice");
				oViewModel.setProperty("/isRemoteData", false);
				MessageToast.show("Local data loaded successfully!");
			}
            // const oList = this.byId("invoiceList");
            // const oSorter = new sap.ui.model.Sorter("ExtendedPrice", false, function (oContext) {
            //     return {
            //     key : oContext.getProperty("ExtendedPrice") > 20 ? "MAHAL COY" : "MURAH COY",
            //     text : oContext.getProperty("ExtendedPrice") > 20 ? "MAHAL COY" : "MURAH COY"
            //     }
            // });

            // oList.bindItems({
            //     path: "invoice>/Invoices",
            //     sorter: oSorter,
            //     template: new sap.m.ObjectListItem({
            //         title: "{invoice>ProductName}",
            //         number: "{invoice>ExtendedPrice}",
            //         numberUnit: "{view>/currency}",
            //         numberState: "{= ${invoice>ExtendedPrice} > 20 ? 'Error' : 'Success'}",
            //     })
            // });
    	},
		onRemoteData() {
			this.onInit();
			this._clearFilter();
			const oModel = this.getOwnerComponent().getModel("invoiceRemote");
			const oViewModel = this.getOwnerComponent().getModel("view");
			if (oModel) {
				this.getView().setModel(oModel, "invoice");
				oViewModel.setProperty("/isRemoteData", true);
				MessageToast.show("Remote data loaded successfully!");
			}
            // const oList = this.byId("invoiceList");
            // const oSorter = new sap.ui.model.Sorter("ExtendedPrice", false, function (oContext) {
            //     return {
            //     key : oContext.getProperty("ExtendedPrice") > 20 ? "MAHAL COY" : "MURAH COY",
            //     text : oContext.getProperty("ExtendedPrice") > 20 ? "MAHAL COY" : "MURAH COY"
            //     }
            // });

            // oList.bindItems({
            //     path: "invoiceRemote>/Invoices",
            //     sorter: oSorter,
            //     template: new sap.m.ObjectListItem({
            //         title: "{invoice>ProductName}",
            //         number: "{invoice>ExtendedPrice}",
            //         numberUnit: "{view>/currency}",
            //         numberState: "{= ${invoice>ExtendedPrice} > 20 ? 'Error' : 'Success'}",
            //     })
            // });
		},
		_clearFilter() {
			const sField = this.byId("searchField");
			sField.setValue("");
		},
		onPress(oEvent) {
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			// console.log(oRouter);
			oRouter.navTo("detail", {
				invoiceId: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
			});
		}
	});
});