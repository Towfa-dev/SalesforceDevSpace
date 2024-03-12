public with sharing class UserPermissionController {
    public UserPermissionController() {

    }

    @AuraEnabled
    public static Map<String, Object> getUserPermissions(Id userId) {
        List<PermissionSetAssignment> userPermissionSets = [SELECT PermissionSetId FROM PermissionSetAssignment WHERE AssigneeId = :userId];

        Set<Id> permissionSetIds = new Set<Id>();
        for (PermissionSetAssignment psa : userPermissionSets) {
            permissionSetIds.add(psa.PermissionSetId);
        }

        List<ObjectPermissions> objectPermissions = [SELECT SObjectType, PermissionsRead, PermissionsCreate, PermissionsEdit, PermissionsDelete, PermissionsViewAllRecords, PermissionsModifyAllRecords FROM ObjectPermissions WHERE ParentId IN :permissionSetIds AND (PermissionsRead = true OR PermissionsCreate = true OR PermissionsEdit = true OR PermissionsDelete = true OR PermissionsViewAllRecords = true OR PermissionsModifyAllRecords = true)];

        List<FieldPermissions> fieldPermissions = [SELECT SObjectType, Field, PermissionsRead, PermissionsEdit FROM FieldPermissions WHERE ParentId IN :permissionSetIds AND (PermissionsRead = true OR PermissionsEdit = true)];

        Map<String, Object> userPermissions = new Map<String, Object>();
        userPermissions.put('objectPermissions', objectPermissions);
        userPermissions.put('fieldPermissions', fieldPermissions);

        return userPermissions;
    }
}