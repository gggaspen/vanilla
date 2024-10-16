import { initializeComponent } from "../core/load-resources.js";
import { Signal } from "../core/signal.js";
import Form from "./components/form/form.component.js";

const config = {
  style: `./app/app.component.css`,
  template: `./app/app.component.html`,
};

class App extends HTMLElement {
  title = "";
  showTitle = false;

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
      this.titleElement.addEventListener("click", () => this.onTitleClick());
    }
  }

  renderLoading() {
    this.shadow.innerHTML = `<p>Loading...</p>`;
  }

  renderError() {
    this.shadow.innerHTML = `<p>Error al cargar el contenido</p>`;
  }

  onTitleClick() {
    this.showTitle = !this.showTitle;
    if (this.showTitle) {
      this.showForm();
    } else {
      this.hideForm();
    }
  }

  showForm() {
    this.titleSignal.set("ggggggggaspen");
    const form = document.createElement("app-form");
    // <app-form data-boolean="true" data-config='{"key": "value"}' />
    form.setAttribute("title", this.titleSignal.get());
    form.setAttribute("config", JSON.stringify(this.config));
    form.setAttribute("boolean", true);
    const dash = this.shadow.getElementById("dashboard");
    dash.appendChild(form);
  }

  hideForm() {
    this.titleSignal.set("gggaspen");
    const form = this.shadow.querySelector("app-form");
    if (form) {
      this.shadow.getElementById("dashboard").removeChild(form);
    }
  }
}

customElements.define("app-root", App);

export default App;
