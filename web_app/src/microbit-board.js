import { LitElement, html } from '@polymer/lit-element'; 

export class MicrobitBoard extends LitElement {
    static get properties() {
        return { };
    }
    
    constructor() {
        super(); 
    }
    
    render() {
        return html`
            <style>
                .microbit {
                    background-color: rgb(0,10,0);
                    color: white;
                    width: 100%;
                    padding-bottom: 66.66%;
                    border-radius: 10%/15%;
                }
            </style>
            <div class="microbit"></div>
        `;
    }
}
customElements.define('microbit-board', MicrobitBoard);