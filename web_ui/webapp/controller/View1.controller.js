sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast"], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("web_ui.web_ui.controller.View1", {
		onInit: function () {
			var oModel = new sap.ui.model.odata.v2.ODataModel("/my_dest/xsodata/serietv.xsodata", false);
			//my_dest è la destinazione che avrei creato in dev->destinations con l'URL ottenuto da core_xsjs after deploy (xs-app resources)
			oModel.read("/Serie", {
				success: function (oRetrievedResult) {
					var Model = new sap.ui.mode.json.JSONModel();
					oModel.setData(oRetrievedResult);
					this.getView().setModel(Model, "Modello");
				},
				error: function (oError) {
					MessageToast.show("Error");
				}
			});
		},
		/**
		 *@memberOf web_ui.web_ui.controller.View1
		 */
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
	});
});