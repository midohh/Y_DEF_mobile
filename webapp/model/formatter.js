sap.ui.define([
	'sap/ui/model/SimpleType',
	'sap/ui/model/ValidateException'
	] , function (SimpleType, ValidateException) {
		"use strict";
		
		return {
			typePerson : SimpleType.extend("person", {
				formatValue: function (oValue) {
					return oValue;
				},
				parseValue: function (oValue) {
					//parsing step takes place before validating step, value can be altered
					return oValue;
				},
				validateValue: function (oValue) {
					// The following Regex is NOT a completely correct one and only used for demonstration purposes.
					// RFC 5322 cannot even checked by a Regex and the Regex for RFC 822 is very long and complex.
					var personregex = /^[0-9]*$/;
					if (!oValue.match(personregex)) {
						throw new ValidateException("'" + oValue + "' is not a valid person number");
					}
				}
		})

		};
	}
);