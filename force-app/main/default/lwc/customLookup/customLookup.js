import { LightningElement, track, wire } from 'lwc';
import buscarCuentas from '@salesforce/apex/LookupController.buscarCuentas';

export default class CustomLookup extends LightningElement {
    @track resultados;
    searchTerm = '';

    connectedCallback() {
        // Añade un manejador global de clics cuando el componente se conecta
        window.addEventListener('click', this.handleWindowClick.bind(this));
    }

    disconnectedCallback() {
        // Asegúrate de eliminar el manejador global cuando el componente se desconecta
        window.removeEventListener('click', this.handleWindowClick.bind(this));
    }

    handleInputChange(event) {
        this.searchTerm = event.target.value;
        this.buscar();
    }

    handleWindowClick(event) {
        // Si el clic no fue dentro de este componente, cierra el desplegable
        if (!this.template.contains(event.target)) {
            this.resultados = null;
        }
    }

    handleRecordSelection(event) {
        const selectedRecordId = event.currentTarget.dataset.id;
        // Haz algo con el ID del registro seleccionado
        this.resultados = null;
    }

    buscar() {
        buscarCuentas({ searchTerm: this.searchTerm })
            .then(result => {
                this.resultados = result;
            })
            .catch(error => {
                console.error('Ha ocurrido un error en la búsqueda', error);
            });
    }
}