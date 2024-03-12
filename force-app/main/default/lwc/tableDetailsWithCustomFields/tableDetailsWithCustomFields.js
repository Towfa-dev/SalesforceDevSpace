import { LightningElement, track } from 'lwc';

export default class TableDetailsWithCustomFields extends LightningElement {
    @track registros = [
        {
            id: 1,
            texto: 'Ejemplo Texto 1',
            numero: 123,
            picklist: {
                seleccionado: 'Opción 1',
                opciones: ['Opción 1', 'Opción 2', 'Opción 3']
            },
            busqueda: '',  // aquí puedes guardar un valor buscado o un ID de registro, según lo que quieras hacer
            checkbox: false
        },
        {
            id: 2,
            texto: 'Ejemplo Texto 2',
            numero: 456,
            picklist: {
                seleccionado: 'Opción 2',
                opciones: ['Opción 1', 'Opción 2', 'Opción 3']
            },
            busqueda: '',
            checkbox: true
        }
        // ... agregar más registros según sea necesario
    ];

    manejarOpcionSeleccionada(event) {
        const valorSeleccionado = event.detail;
        // Haz algo con el valor seleccionado
    }

   // miTablaLWC.js
    handleRegistroSeleccionado(event) {
        const selectedRecordId = event.detail;
        // Aquí puedes hacer algo con el ID del registro seleccionado, como actualizar el registro actual en la tabla
    }

}