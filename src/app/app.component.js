import { initializeComponent } from "../core/load-resources.js";
import { Signal } from "../core/signal.js";
import Form from "./components/form/form.component.js";

const config = {
  style: `./app/app.component.css`,
  template: `./app/app.component.html`,
};

class App extends HTMLElement {
  title = "";

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.title = this.getAttribute("title");

    this.titleSignal = Signal(this.title);
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
        this.titleSignal.set(this.title);
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

customElements.define("app-root", App);

export default App;
