public with sharing class UserSearchController {
    public UserSearchController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<User> searchUsers(String searchTerm) {
        String searchQuery = '%' + searchTerm + '%';
        return [SELECT Id, Name FROM User WHERE Name LIKE :searchQuery LIMIT 5];
    }
}