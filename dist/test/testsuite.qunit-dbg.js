sap.ui.define(() => {
    "use strict";
    return {
        name: "QUnit test suite for 47823",
        defaults: {
            page: "ui5://test-resources/testapp/Test.qunit.html?testsuite={suite}&test={name}",
            qunit: {
                version: 2
            },
            ui5: {
                theme: "sap_horizon"
            },
            loader: {
                paths: {
                    "testapp": "../"
                }
            }
        },
        tests: {
            "unit/unitTests": {
                title: "UI5 Fiori - Unit Tests"
            },
            "integration/opaTests": {
                title: "UI5 Fiori - Integration Tests"
            }
        }
    };
});