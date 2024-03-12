import { LightningElement, track } from 'lwc';

export default class CustomPicklist extends LightningElement {
    @track seleccionado = '';
    
    // Suponiendo que tus opciones son estáticas. Si vienen de Apex, tendrías que adaptar este código.
    opciones = [
        { label: 'Opción 1', value: 'opcion1' },
        { label: 'Opción 2', value: 'opcion2' },
        { label: 'Opción 3', value: 'opcion3' }
    ];
    
    handleOptionChange(event) {
        this.seleccionado = event.target.value;
        // Emitir el evento con el valor seleccionado para que otros componentes puedan escucharlo
        const selectedEvent = new CustomEvent('opcionseleccionada', {
            detail: this.seleccionado
        });
        this.dispatchEvent(selectedEvent);
    }
}