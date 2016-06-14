sap.ui.define([
	"de/dlh/lht/ydef/controller/BaseController",
	'sap/ui/model/json/JSONModel',
	'sap/m/MessageBox',
	"sap/m/MessageToast"
], function(BaseController, JSONModel, MessageBox, MessageToast) {
	"use strict";

	return BaseController.extend("de.dlh.lht.ydef.controller.Main", {
		onInit : function () {
			this.getView().setModel(new JSONModel({
				Pernr : "",
				Aufnr : "",
				Kdauf : "",
				Vornr : "",
				Kdpos : ""
			}),
			"mainModel");
			
			// attach handlers for validation errors
			sap.ui.getCore().attachValidationError(function (evt) {
				var control = evt.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("Error");
				}
			});
			sap.ui.getCore().attachValidationSuccess(function (evt) {
				var control = evt.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("None");
				}
			});
		},
		
		onPressNext: function (oEvent) {
						// collect input controls
			var view = this.getView();
			var inputs = [
				view.byId("persNumbInput"),
				view.byId("origOrdInput"),
				view.byId("salOrdInput"),
				view.byId("operInput"),
				view.byId("itemInput")
			];
 
			// check that inputs are not empty
			// this does not happen during data binding as this is only triggered by changes
			jQuery.each(inputs, function (i, input) {
				if (!input.getValue() || input.getValue() == 0) {
					input.setValueState("Error");
				}
			});
 
			// check states of inputs
			var canContinue = true;
			jQuery.each(inputs, function (i, input) {
				if ("Error" === input.getValueState()) {
					canContinue = false;
					return false;
				}
			});
 
			// output result
			if (canContinue) {
				//display the "detail" target without changing the hash
				this.getRouter().navTo("detail");
			} else {
				jQuery.sap.require("sap.m.MessageBox");
				MessageBox.alert("Complete your input first.");
			}
		},
		
		onPressTest: function (oEvent) {
			//display the "notFound" target without changing the hash
			this.getRouter().getTargets().display("notFound", {	fromTarget : "main"	});
			
		},
//~~~~~~~~~~~~~~~~~~~~~~~ Value Help~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~				
		handleOrigOrdF4: function (){
				var that= this;
			    console.log("ValueHelp");
			
			    var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
			      title: "Order Number",
			      modal: true,
			      supportMultiselect: false,
			      supportRanges: false,
			      supportRangesOnly: false,
			      
			      ok: function(oControlEvent) {
			//      Get index of selected row
					  var index = oValueHelpDialog.theTable.getSelectedIndex();
			//		Get Element by Index
					  var oContext = oValueHelpDialog.theTable.getContextByIndex(index);
			//		Get Data        
					  var data = oRowsModel.getProperty(oContext.sPath);
					    
			//		Bind Data to the screen		    
					   var ordNum = data.Aufnr;
					   that.getView().byId("origOrdInput").setValue(ordNum);
		    	      oValueHelpDialog.close();
				   },
			
				   cancel: function(oControlEvent) {
				        sap.m.MessageToast.show("Cancel pressed!");
				        oValueHelpDialog.close();
				   },
				      
				   afterClose: function() {
				        oValueHelpDialog.destroy();
				   }
				});
					
					//~~~~~~~~~~~~~~~~~oData Model~~~~~~~~~~~~~~~~~~	    
				/*	var url = "/sap/opu/odata/sap/ZUI5_NOTIFICATION_SRV/"; 			

					var oModel = new sap.ui.model.odata.ODataModel(url);
				    var properties = oModel.getServiceMetadata().dataServices.schema[0].entityType[0].property;
					var cols = [];
				    
			//	    Dynamic binding from metadata
				    for (var i in properties){
				     cols[i] = {label: properties[i].extensions[0].value, template: properties[i].name};
					}
			
				    var oMetaModel = new sap.ui.model.json.JSONModel();
				    oMetaModel.setData({cols: cols});
				    oValueHelpDialog.setModel(oMetaModel, "columns");
				
				    
			//~~~~~~~~~~~~~~~bind Rows~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	    	    
				    var oRowsModel = new sap.ui.model.json.JSONModel();
				    
					oModel.read("/NotiTypeF4Set", null, null, true,
							function(oData, response) {
								JSON.stringify(oData);
								oRowsModel.setData(oData);
							});
					
					oValueHelpDialog.getTable().setModel(oRowsModel);
					
				    oValueHelpDialog.getTable().bindRows("/results");
						*/
			//~~~~~~~~~~~~~~ Search~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  	    
				    var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
						advancedMode:  false,
						filterBarExpanded: false,
						showGoOnFB: !sap.ui.Device.system.phone,
						search: function() {
							sap.m.MessageToast.show("Search pressed '"+arguments[0].mParameters.selectionSet[0].getValue()+"''");
						}
					});			
							
					if (oFilterBar.setBasicSearch) {
						oFilterBar.setBasicSearch(new sap.m.SearchField({
							showSearchButton: sap.ui.Device.system.phone, 
							placeholder: "Search",
							search: function(event) {
								oValueHelpDialog.getFilterBar().search();
							} 
						}));  
					}
					
					oValueHelpDialog.setFilterBar(oFilterBar);
			//~~~~~~~~~~~~~~~open Value Help~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~		    
				    oValueHelpDialog.open();
					console.log("handleValueHelp");
			},
			
			
			handleSalOrdF4: function (){
					var that= this;
				    console.log("ValueHelp");
			
				    var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
				      title: "Order Number",
				      modal: true,
				      supportMultiselect: false,
				      supportRanges: false,
				      supportRangesOnly: false,
				      
				      ok: function(oControlEvent) {
			//	    	Get index of selected row
				    	var index = oValueHelpDialog.theTable.getSelectedIndex();
			//	    	Get Element by Index
				        var oContext = oValueHelpDialog.theTable.getContextByIndex(index);
			//	        Get Data        
					    var data = oRowsModel.getProperty(oContext.sPath);
					    
			//			Bind Data to the screen		    
					    var ordNum = data.Aufnr;
					    that.getView().byId("origOrdInput").setValue(ordNum);

				        oValueHelpDialog.close();
				      },
			
				      cancel: function(oControlEvent) {
				        sap.m.MessageToast.show("Cancel pressed!");
				        oValueHelpDialog.close();
				      },
				      
				      afterClose: function() {
				        oValueHelpDialog.destroy();
				      }
				    });
					
					//~~~~~~~~~~~~~~~~~oData Model~~~~~~~~~~~~~~~~~~	    
				/*	var url = "/sap/opu/odata/sap/ZUI5_NOTIFICATION_SRV/"; 			

					var oModel = new sap.ui.model.odata.ODataModel(url);
				    var properties = oModel.getServiceMetadata().dataServices.schema[0].entityType[0].property;
					var cols = [];
				    
			//	    Dynamic binding from metadata
				    for (var i in properties){
				     cols[i] = {label: properties[i].extensions[0].value, template: properties[i].name};
					}
			
				    var oMetaModel = new sap.ui.model.json.JSONModel();
				    oMetaModel.setData({cols: cols});
				    oValueHelpDialog.setModel(oMetaModel, "columns");
				
				    
			//~~~~~~~~~~~~~~~bind Rows~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	    	    
				    var oRowsModel = new sap.ui.model.json.JSONModel();
				    
					oModel.read("/NotiTypeF4Set", null, null, true,
							function(oData, response) {
								JSON.stringify(oData);
								oRowsModel.setData(oData);
							});
					
					oValueHelpDialog.getTable().setModel(oRowsModel);
					
				    oValueHelpDialog.getTable().bindRows("/results");
						*/
			//~~~~~~~~~~~~~~ Search~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  	    
				    var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
						advancedMode:  false,
						filterBarExpanded: false,
						showGoOnFB: !sap.ui.Device.system.phone,
						search: function() {
							sap.m.MessageToast.show("Search pressed '"+arguments[0].mParameters.selectionSet[0].getValue()+"''");
						}
					});			
							
					if (oFilterBar.setBasicSearch) {
						oFilterBar.setBasicSearch(new sap.m.SearchField({
							showSearchButton: sap.ui.Device.system.phone, 
							placeholder: "Search",
							search: function(event) {
								oValueHelpDialog.getFilterBar().search();
							} 
						}));  
					}
					
					oValueHelpDialog.setFilterBar(oFilterBar);
			//~~~~~~~~~~~~~~~open Value Help~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~		    
				    oValueHelpDialog.open();
					console.log("handleValueHelp");				
			}

		

	});

});