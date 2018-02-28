sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"zfinder01/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("zfinder01.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			var oJSONModel = new sap.ui.model.json.JSONModel(	{
				NavSupported: false
			});
			
			this.setModel(oJSONModel, "VM");
			
			var oCtx = this;
			
			var oContainer = (sap.ushell && sap.ushell.Container) ? sap.ushell.Container : null;
			if(oContainer !== null){
				
				var oNavTargetService = oContainer.getService("NavTargetResolution");
				var aIntents = [{
					target: {
						semanticObject: "zproduct05",
						action: "display"
					}
				}];
				oNavTargetService.isNavigationSupported(aIntents).then(function (oResult){
					var bSupported = oResult[0].supported;
					oCtx.getModel("VM").setProperty("/NavSupported", bSupported);
				});
			}
		}
	});
});