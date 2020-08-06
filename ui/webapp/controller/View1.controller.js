sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast"], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("Team2flix.ui.controller.View1", {
		onInit: function () {

			var that = this,
				oModel = new sap.ui.model.odata.v2.ODataModel("/flix_dest/xsodata/serie.xsodata", false),
				oModelJson = new sap.ui.model.json.JSONModel();

			// var that = this;
			// var oModel = new sap.ui.model.odata.v2.ODataModel("/flix_dest/xsodata/serie.xsodata", false);

			oModel.read("/POHeader", {
				success: function (oRetrievedResult) {

					if (oRetrievedResult.results !== 0) {
						oModelJson.setData(oRetrievedResult.results);
						that.getView().setModel(oModelJson, "modello");

						var results = oRetrievedResult;
						//var Model = new sap.ui.mode.json.JSONModel();
						that.getView().setModel(new sap.ui.model.JSON.JSONModel(results), "modello");
						if (results.titoloserie !== undefined) {
							that.getView().setModel(new sap.ui.model.JSON.JSONModel(results.titoloserie), "modello");

						}
					}
				},
				error: function (oError) {
					MessageToast.show("View1 Error");
				}
			});

		},

		onListPressItem: function (oEvent) {

			this.getView().bindElement({
				path: oEvent.getParameter("listItem").getBindingContextPath(),
				model: "modello"
			});

			//var oModel = new sap.ui.model.odata.v2.ODataModel("/flix_dest/xsodata/serie.xsodata", false);
			//oModel.read();
			//var Model = new sap.ui.mode.json.JSONModel(oModel);
			//var JsonModel = Model.getJSON();
			//this.getView().setModel(JsonModel, "modello");

			var that = this;
			var title = oEvent.getParameter("listItem").getProperty("title");
			var path = "/POHeader" + "('" + title + "')" + "/POItem";
			//var key = oEvent.getParameter("listItem").getBindingContextPath(); 

			var oModelI = new sap.ui.model.odata.v2.ODataModel("/flix_dest/xsodata/serie.xsodata", false);
			var oModelJSONI = new sap.ui.model.json.JSONModel();

			oModelI.read(path, {
				success: function (oRetrievedResult) {
					if (oRetrievedResult.results.length !== 0) {
						oModelJSONI.setData(oRetrievedResult.results);
						that.getView().setModel(oModelJSONI, "puntate");
					}
				},
				error: function (oError) {
					MessageToast.show("View1 Error");
				}
			});
		},

		/**

		},
		/**
		 *@memberOf XSAprova.ui.controller.View1
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