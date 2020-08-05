sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("Team2flix.ui.controller.View1", {
		onInit: function () {
			
			var oModel = new sap.ui.model.odata.v2.ODataModel("/flix_dest/xsodata/serie.xsodata", false);
			var Model = new sap.ui.mode.json.JSONModel();
			oModel.read("/POHeader", {
				success: function (oRetrievedResult) {
					Model.setData(oRetrievedResult);
				},
				error: function (oError) {
					MessageToast.show("View1 Error");
				}
			});
			this.getView().setModel(Model, "modello");
			//var oModel = new sap.ui.model.odata.v2.ODataModel("/flix_dest/xsodata/serie.xsodata", false);
			//oModel.read();
			//var Model = new sap.ui.mode.json.JSONModel(oModel);
			//var JsonModel = Model.getJSON();
			//this.getView().setModel(JsonModel, "modello");
			
		}
	});
});