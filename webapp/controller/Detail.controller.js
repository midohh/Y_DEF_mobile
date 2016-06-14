sap.ui.define([
	"de/dlh/lht/ydef/controller/BaseController",
	"sap/m/MessageToast"
], function(BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("de.dlh.lht.ydef.controller.Detail", {
		onInit : function () {
			var oRouter, oTarget;
			oRouter = this.getRouter();
			oTarget = oRouter.getTarget("detail");
			oTarget.attachDisplay(function (oEvent) {
				this._oData = oEvent.getParameter("data"); //store the data
			}, this);
			
//			var oModel = new sap.ui.model.odata.ODataModel([sServiceUrl], [mParameters]);
			
//			this.getView().setModel(oJsonModel, 'detailModel');
			
		},
		// override the parent's onNavBack (inherited from BaseController)
		onNavBackDetail : function (oEvent){
			 sap.m.MessageToast.show("Back pressed!");
			var oHistory, sPreviousHash, oRouter;
			// in some cases we could display a certain target when the back button is pressed
			if (this._oData && this._oData.fromTarget) {
				this.getRouter().getTargets().display(this._oData.fromTarget);
				delete this._oData.fromTarget;
				return;
			}
			// call the parent's onNavBack
			BaseController.prototype.onNavBack.apply(this, arguments);
		
		},
		
		onPressSave : function(oEvent){
			
		},
		
//~~~~~~~~~~~~~~~~~~~~~~~~~~~Value Help~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		handleATAF4 : function() {
			sap.m.MessageToast.show("Please Implement 'ATA' Value Help");
		},
		
		handleMarbplF4 : function() {
			sap.m.MessageToast.show("Please Implement 'Work center' Value Help");
		},
		
		handleQmgrpF4 : function() {
			sap.m.MessageToast.show("Please Implement 'Defect Tyüe' Value Help");
		},
		
		handleFinrefF4 : function() {
			sap.m.MessageToast.show("Please Implement 'Finding Reference' Value Help");
		},
		
		handlePhasF4 : function() {
			sap.m.MessageToast.show("Please Implement 'Phas' Value Help");
		},
		
		handleDayF4 : function() {
			sap.m.MessageToast.show("Please Implement 'Phas Day' Value Help");
		}
		
	});
});