import { LightningElement, track } from 'lwc';
import searchUsers from '@salesforce/apex/UserSearchController.searchUsers';
import getUserPermissions from '@salesforce/apex/UserPermissionController.getUserPermissions';




export default class UserPermissionCompare extends LightningElement {
    @track searchTerm1;
    @track searchTerm2;
    @track user1;
    @track user2;
    @track user1Options = [];
    @track user2Options = [];
    @track comparisonResults;
    
    columns = [
        { label: 'Permiso', fieldName: 'permission' },
        { label: 'Usuario 1', fieldName: 'user1' },
        { label: 'Usuario 2', fieldName: 'user2' },
    ];

    handleSearchTerm1Change(event) {
        this.searchTerm1 = event.detail.value;
        if(this.searchTerm1 && this.searchTerm1.length > 1) {
            this.populateUserOptions(this.searchTerm1, 1);
        }
    }

    handleSearchTerm2Change(event) {
        this.searchTerm2 = event.detail.value;
        if(this.searchTerm2 && this.searchTerm2.length > 1) {
            this.populateUserOptions(this.searchTerm2, 2);
        }
    }

    handleUser1Change(event) {
        this.user1 = event.detail.value;
    }

    handleUser2Change(event) {
        this.user2 = event.detail.value;
    }

    async populateUserOptions(searchTerm, userNumber) {
        const userRecords = await searchUsers({ searchTerm: searchTerm });
        const userOptions = userRecords.map(user => {
            return { label: user.Name, value: user.Id };
        });

        if(userNumber === 1) {
            this.user1Options = userOptions;
        } else if(userNumber === 2) {
            this.user2Options = userOptions;
        }
    }

    async compareUsers() {
        if (!this.user1 || !this.user2) {
            // mostrar algún tipo de error si uno o ambos usuarios no están seleccionados
            return;
        }

        try {
            const [user1Permissions, user2Permissions] = await Promise.all([
                getUserPermissions({ userId: this.user1 }),
                getUserPermissions({ userId: this.user2 })
            ]);

            this.comparisonResults = this.comparePermissions(user1Permissions, user2Permissions);

            // Ahora, "comparisonResults" contiene los permisos que son iguales y los que son diferentes para ambos usuarios
            // Puedes usar "comparisonResults" para mostrar los resultados de la comparación en tu componente LWC
        } catch (error) {
            // manejar errores
        }
    }

    comparePermissions(user1Permissions, user2Permissions) {
        // Inicializamos dos mapas para almacenar los permisos de los dos usuarios
        let user1PermissionMap = this.buildPermissionMap(user1Permissions);
        let user2PermissionMap = this.buildPermissionMap(user2Permissions);

        // Inicializamos un objeto que mantendrá el resultado de la comparación
        let comparisonResults = {
            equal: [],
            different: []
        };

        // Comparamos los permisos de los usuarios
        for(let key in user1PermissionMap) {
            if(user2PermissionMap[key]) {
                if(JSON.stringify(user1PermissionMap[key]) === JSON.stringify(user2PermissionMap[key])) {
                    comparisonResults.equal.push({ permission: key, user1: "Aplica", user2: "Aplica"});
                } else {
                    comparisonResults.different.push({ permission: key, user1: "Aplica", user2: "Aplica"});
                }
            } else {
                comparisonResults.different.push({ permission: key, user1: "Aplica", user2: "N/A" });
            }
        }
    
        for(let key in user2PermissionMap) {
            if(!user1PermissionMap[key]) {
                comparisonResults.different.push({ permission: key, user1: "N/A", user2: "Aplica" });
            }
        }

        return comparisonResults;
    }

    buildPermissionMap(userPermissions) {
        let permissionMap = {};
        let objectPermissions = userPermissions.objectPermissions;
        let fieldPermissions = userPermissions.fieldPermissions;

        objectPermissions.forEach(op => {
            permissionMap[op.SObjectType] = {
                PermissionsRead: op.PermissionsRead,
                PermissionsCreate: op.PermissionsCreate,
                PermissionsEdit: op.PermissionsEdit,
                PermissionsDelete: op.PermissionsDelete,
                PermissionsViewAllRecords: op.PermissionsViewAllRecords,
                PermissionsModifyAllRecords: op.PermissionsModifyAllRecords
            };
        });

        fieldPermissions.forEach(fp => {
            let key = fp.SObjectType + '.' + fp.Field;
            permissionMap[key] = {
                PermissionsRead: fp.PermissionsRead,
                PermissionsEdit: fp.PermissionsEdit
            };
        });

        return permissionMap;
    }
}