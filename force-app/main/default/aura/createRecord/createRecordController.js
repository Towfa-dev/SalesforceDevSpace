({
    clickNuevo : function (component, event, helper) {
		var createRecordEvent = $A.get("e.force:createRecord");
		createRecordEvent.setParams({
			"entityApiName": "Contact",
			"navigationLocation": "LOOKUP",
			"defaultFieldValues": {
				'Account': component.get("v.recordId"),
			}
		});
		createRecordEvent.fire();
	}
})