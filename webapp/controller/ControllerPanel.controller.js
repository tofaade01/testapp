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
     onGoPage(sTargetPage) {
        const app = this.getOwnerComponent().getRootControl().byId("myApp");
        console.log(app);
        app.to(sTargetPage);
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