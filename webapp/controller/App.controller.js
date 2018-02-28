sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("zfinder01.controller.App", {
		onPressProductShow: function (){
			
			
			var sProductId = this.getView().byId("idSearchInput").getValue();
			var oContainer = (sap.ushell && sap.ushell.Container) ? sap.ushell.Container : null;
			
			if (oContainer !== null){
				var sRoute = oContainer.getService("CrossApplicationNavigation").hrefForExternal({
					target: {
						semanticObject: "ZPRODUCT01",
						action: "display"
					},
					params: {
						productId: sProductId
					}
				});
				sap.m.URLHelper.redirect(sRoute, false);
			}
		},
		
		onPressTestTarget: function (oEvent){
			var oContainer = (sap.ushell && sap.ushell.Container) ? sap.ushell.Container : null;
			if(oContainer !== null){
				
				var sSemObj = this.getView().byId("idSemObjInput").getValue();
				var sAction = this.getView().byId("idActionInput").getValue();
				
				var oNavTargetService = oContainer.getService("NavTargetResolution");
				var aIntents = [{
					target: {
						semanticObject: sSemObj,
						action: sAction
					}
				}];
				oNavTargetService.isNavigationSupported(aIntents).then(function (oResult){
					var bSupported = oResult[0].supported;
				});
			}
		}
	});
});