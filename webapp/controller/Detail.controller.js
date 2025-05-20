sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
], (Controller, History, MessageToast) => {
    "use strict";

    return Controller.extend("testapp.controller.Detail", {
            onInit() {
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
            },

            onObjectMatched(oEvent) {
                    this.byId("rating").reset();
                    const isRemoteData = this.getOwnerComponent().getModel("view").getProperty("/isRemoteData");
                    const oModel = this.getOwnerComponent().getModel(isRemoteData ? "invoiceRemote" : "invoice");
                    this.getView().setModel(oModel, "invoice");
                    this.getView().bindElement({
                            path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoiceId),
                            model: "invoice"
                    });
            },
            onNavBack() {
                    const oHistory = History.getInstance();
                    const sPreviousHash = oHistory.getPreviousHash();

                    if (sPreviousHash !== undefined) {
                            window.history.go(-1);
                    } else {
                            const oRouter = this.getOwnerComponent().getRouter();
                            oRouter.navTo("overview", {}, true /*no history*/);
                    }
            },
            onRatingChange(oEvent) {
                    const fValue = oEvent.getParameter("value");
                    const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                    MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
            }
    });
});