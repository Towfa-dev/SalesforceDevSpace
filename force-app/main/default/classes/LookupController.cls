public with sharing class LookupController {
    @AuraEnabled(cacheable=true)
    public static List<Account> buscarCuentas(String searchTerm) {
        String searchStr = '%' + searchTerm + '%';
        return [SELECT Id, Name FROM Account WHERE Name LIKE :searchStr LIMIT 10];
    }
}