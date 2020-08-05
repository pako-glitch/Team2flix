/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Team2flix/ui/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});