sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("Team2flix.ui.controller.View3", {

		onInit: function () {
			
			var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("View3").attachPatternMatched(this._onObjectMatched, this);
			
		},

		_onObjectMatched: function (oEvent) {

			/*var that = this;
			var titolo = JSON.parse(oEvent.getParameter("arguments").titolo);
			this.getView().setModel(new JSONModel(titolo), "titolo");
			this.getView().bindElement({
				path: "titolo>/",
				dataRequested: function () {
					that.getView().setBusy(true);
				},
				dataReceived: function () {
					that.getView().setBusy(false);
				}
			});*/
			
			var key = this.getView().bindElement({
				path: oEvent.getParameter("arguments").data,
				model: "modello"
			});
			
			var that = this;
			var	oModel = new sap.ui.model.odata.v2.ODataModel("/flix_dest/xsodata/serie.xsodata", false);
			var	oModelJson = new sap.ui.model.json.JSONModel();
			oModel.read("/POHeader('"+key.path+"')", {
				success: function (oRetrievedResult) {

					if (oRetrievedResult.results !== 0) {
						oModelJson.setData(oRetrievedResult.results);
						that.getView().setModel(oModelJson, "modello");
						var results = oRetrievedResult;
						that.getView().setModel(new sap.ui.model.JSON.JSONModel(results), "modello");

					}
				}
			});
			
		},

		updateSeriesDetails: function () {
			
			
			
		}
		
	});
});