import { initializeComponent } from "../../engine/load-resources.js";
import { Signal } from "../../engine/signal.js"; // Importamos la implementación de Signal

const config = {
  style: `./app/views/arena.css`,
  template: `./app/views/arena.html`,
};

class Arena extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.titleSignal = Signal(
      this.getAttribute("title") || "Título predeterminado"
    );
    this.renderLoading();
    this.initialize();
  }

  initialize() {
    initializeComponent(this, config, {
      onAfterRender: () => {
        this.checkElements();
        this.titleSignal.subscribe((newTitle) => {
          if (this.titleElement) {
            this.titleElement.textContent = newTitle;
          }
        });
        this.titleSignal.set("Holis");
      },
      onError: () => this.renderError(),
    });
  }
  checkElements() {
    this.titleElement = this.shadow.querySelector("h1");
    if (this.titleElement) {
      this.titleElement.addEventListener("click", () => this.toggleTitle());
    }
  }

  renderLoading() {
    this.shadow.innerHTML = `<p>Loading...</p>`;
  }

  renderError() {
    this.shadow.innerHTML = `<p>Error al cargar el contenido</p>`;
  }

  toggleTitle() {
    const newTitle =
      this.titleSignal.get() === "Nuevo Título"
        ? "Título Original"
        : "Nuevo Título";

    this.titleSignal.set(newTitle);
  }
}

customElements.define("app-arena", Arena);

export default Arena;
