import { LitElement, html, css } from "lit-element";

import "./nrf52-dongle";

export class MainApp extends LitElement {
  static get styles() { 
    return [
      css`
        .flex-container {
          display: flex;
          height: 100%;
        }
        .content {
          margin: auto;
          position: relative;
          width: 95%;
          max-width: 800px;
        }
        .col {
          display: flex;
          flex-direction: column;
        }
      `
    ];
  }

  render() {
    return html`
      <div class="flex-container">
        <div class="content">
          <div class="col">
            <h1>WebUSB, WebBluetooth & Zephyr with nRF52840</h1>
            <nrf52-dongle></nrf52-dongle>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("main-app", MainApp);
