sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("Team2flix.ui.controller.View1", {
		onInit: function () {
			
			var that = this;
			var oModel = new sap.ui.model.odata.v2.ODataModel("/flix_dest/xsodata/serie.xsodata", false);
			
			oModel.read("/POHeader", {
				success: function (oRetrievedResult) {
					var results = oRetrievedResult;
					//var Model = new sap.ui.mode.json.JSONModel();
					that.getView().setModel(new sap.ui.model.JSON.JSONModel(results), "modello");
					if(results.titoloserie!==undefined) {
						that.getView().setModel(new sap.ui.model.JSON.JSONModel(results.titoloserie), "modello");
					}
				},
				error: function (oError) {
					MessageToast.show("View1 Error");
				}
			});
			//var oModel = new sap.ui.model.odata.v2.ODataModel("/flix_dest/xsodata/serie.xsodata", false);
			//oModel.read();
			//var Model = new sap.ui.mode.json.JSONModel(oModel);
			//var JsonModel = Model.getJSON();
			//this.getView().setModel(JsonModel, "modello");
			
		}
	});
});