sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
 ], (UIComponent, JSONModel, ResourceModel) => {
    "use strict";
 
    return UIComponent.extend("testapp/Component", {
        metadata : {
            interfaces: ["sap.ui.core.IAsyncContentCreation"],
            manifest: "json"
         },
       init() {
          // call the init function of the parent
          UIComponent.prototype.init.apply(this, arguments);
          const oData = {
            recipient: {
                name: "Bang"
            },
            recipient2: {
                name: "47823"
            }
         };
         const oData2 = {
            recipient: {
                name: "Bang2"
            },
            recipient2: {
                name: "47823 (2)"
            }
        }; 
          const oModel = new JSONModel(oData);
          const oModel2 = new JSONModel(oData2);
          this.setModel(oModel2, "model2");
          this.setModel(oModel);
          const i18nModel = new ResourceModel({
              bundleName: "testapp.i18n.i18n"
          });
          const i18nModel2 = new ResourceModel({
            bundleName: "testapp.i18n.i18n"
        });
          this.setModel(i18nModel2, "i18n2");
          this.setModel(i18nModel, "i18n");
          // create the views based on the url/hash
          this.getRouter().initialize();
         }
    });
 });