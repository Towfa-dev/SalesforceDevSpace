import { LightningElement, track } from 'lwc';

    export default class TableDetailsModalView extends LightningElement {
    @track data = [
        {
            "Id": "a01B0000001abcD",
            "Name": "Laptop XYZ",
            "Price": 1200.50,
            "Description": "Laptop de alta gama con 16GB de RAM y 1TB SSD.",
            "errorIcon": '',
            "errorIconName": '',
            "errorMessage": ''

        },
        {
            "Id": "a01B0000002defE",
            "Name": "Teléfono ABC",
            "Price": 800.99,
            "Description": "Teléfono inteligente con cámara de 12MP y 64GB de almacenamiento.",
            "errorIcon": '',
            "errorIconName": '',
            "errorMessage": ''
        },
        {
            "Id": "a01B0000003ghiF",
            "Name": "Audífonos JKL",
            "Price": 150.75,
            "Description": "Audífonos inalámbricos con cancelación de ruido.",
            "errorIcon": '',
            "errorIconName": '',
            "errorMessage": ''
        }
    ];

    columns = [
        {
            type: 'button-icon', 
            initialWidth: 50,
            typeAttributes: { 
                iconName: { fieldName: 'errorIconName' },
                title: { fieldName: 'errorMessage' },  // <-- Agrega esta línea
                variant: 'bare',
                iconClass: 'slds-text-color_error'
            }
        },
        { label: 'Nombre', fieldName: 'Name' },
        {
            type: 'button',
            typeAttributes: {
                label: 'Visualizar',
                name: 'view',
                title: 'Click para visualizar detalles',
                variant: 'base'
            }
        }
    ];

    @track isTableView = true; 
    @track recordDetail = {};
    picklistOptions = [ 
        { label: 'Opción 1', value: 'opt1' },
        { label: 'Opción 2', value: 'opt2' },
    ];

    handleRowAction(event) {
        const action = event.detail.action;
        if (action.name === 'view') {
            this.recordDetail = event.detail.row; 
            this.isTableView = false; 
        }
    }

    showTable() {
        this.isTableView = true;
    }

    saveDetails() {
        let indexToUpdate = this.data.findIndex(item => item.Id === this.recordDetail.Id);
        if (indexToUpdate > -1) {
            this.data[indexToUpdate].Name = this.recordDetail.Name;
            this.data[indexToUpdate].Price = this.recordDetail.Price;
            this.data[indexToUpdate].Date = this.recordDetail.Date;  
            this.data[indexToUpdate].PicklistValue = this.recordDetail.PicklistValue; 

            if (!this.data[indexToUpdate].Date) {
                this.data[indexToUpdate].errorIconName = 'utility:error';
                this.data[indexToUpdate].errorMessage = '¡Falta la fecha!';
            } else {
                this.data[indexToUpdate].errorIconName = '';
            }
        }
        this.isTableView = true;
    }

    handleRowSelection(event) {
        this.selectedRows = event.detail.selectedRows.map(row => row.Id);
    }

    generateJSON() {
        let selectedData = this.data.filter(row => this.selectedRows.includes(row.Id));
        let jsonData = JSON.stringify(selectedData);
        console.log(jsonData);
    }

    handleNameChange(event) {
        this.recordDetail.Name = event.target.value;
    }

    handlePriceChange(event) {
        this.recordDetail.Price = parseFloat(event.target.value);
    }

    handleDateChange(event) {
        this.recordDetail.Date = event.target.value;
    }


    handlePicklistChange(event) {
        this.recordDetail.PicklistValue = event.detail.value;
    }

    /*toggleSection() {
        const section = this.template.querySelector('.slds-section');
        const content = this.template.querySelector('.slds-section__content');

        // Comprobamos si la sección está abierta o cerrada
        if (section.classList.contains('slds-is-open')) {
            section.classList.remove('slds-is-open');
            section.classList.add('slds-is-closed');
            content.setAttribute('aria-hidden', "true");
        } else {
            section.classList.remove('slds-is-closed');
            section.classList.add('slds-is-open');
            content.setAttribute('aria-hidden', "false");
        }
    }*/

    @track isCheckboxChecked = false;
    @track isSectionOpen = false;

    // Calcula si la sección está oculta o no en función de si está abierta
    get isSectionHidden() {
        return !this.isSectionOpen;
    }

    // Calcula la clase de la sección en función de si está abierta o no
    get sectionClass() {
        return this.isSectionOpen ? 'slds-section slds-is-open' : 'slds-section slds-is-closed';
    }

    handleCheckboxChange(event) {
        this.isCheckboxChecked = event.target.checked;
        // Si el checkbox no está seleccionado, colapsa la sección
        if (!this.isCheckboxChecked) {
            this.isSectionOpen = false;
        }
    }

    toggleSection() {
        // Solo permite expandir/colapsar si el checkbox está seleccionado
        if (this.isCheckboxChecked) {
            this.isSectionOpen = !this.isSectionOpen;
        }
    }


}