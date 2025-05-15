sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
 ], (Controller, MessageToast) => {
    "use strict";
 
    return Controller.extend("testapp.controller.ControllerPanel", {
      onShowHello() {
         const oBundle = this.getView().getModel("i18n").getResourceBundle();
         const sRecipient = this.getView().getModel().getProperty("/recipient/name");
         const sRecipient2 = this.getView().getModel().getProperty("/recipient2/name");
         const sMsg = oBundle.getText("helloMsg", [sRecipient, sRecipient2]);
         // const sMsg = oBundle.getText("helloMsg", [sRecipient] + " " + sRecipient2);
         MessageToast.show(sMsg, {
             duration: 2000,
             at: "right top",
             my: "right top",
             animationTimingFunction: "ease",
             width: "20em"
         });
     },
     onShowHi() {
         const oBundle = this.getView().getModel("i18n2").getResourceBundle();
         const sRecipient = this.getView().getModel("model2").getProperty("/recipient/name");
         const sRecipient2 = this.getView().getModel("model2").getProperty("/recipient2/name");
         const sMsg = oBundle.getText("hiMsg", [sRecipient, sRecipient2]);
         // const sMsg = oBundle.getText("helloMsg", [sRecipient] + " " + sRecipient2);
         MessageToast.show(sMsg, {
             duration: 2000,
             at: "right top",
             my: "right top",
             animationTimingFunction: "ease",
             width: "20em"
         });
     },
     onGoPage() {
        const app = this.getOwnerComponent().getRootControl().byId("myApps");
        console.log(app);
        if (app.getCurrentPage().getId() === "container-testapp---app--pages1") {
            app.to("container-testapp---app--pages2");
        } else {
            app.to("container-testapp---app--pages1");
        }
    },
    async onOpenDialog() {
        // create dialog lazily
        this.oDialog ??= await this.loadFragment({
            name: "testapp.view.HelloDialog"
        });
    
        this.oDialog.open();
    },
    onCloseDialog() {
        this.oDialog.close();
    }
    });
 });