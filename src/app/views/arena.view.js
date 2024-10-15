import { loadResources, renderContent } from "../../engine/load-resources.js";

const config = {
  style: `./app/views/arena.css`,
  template: `./app/views/arena.html`,
};
class Arena extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.title = this.getAttribute("title");
    this.renderLoading();
    this.loadComponentResources();
  }

  loadComponentResources() {
    const { style, template } = config;
    loadResources([style, template])
      .then(([css, html]) => {
        renderContent(css, html, this.shadow);
        this.updateTitle();
        this.addReactiveClick();
      })
      .catch((error) => {
        console.error("Error al cargar recursos:", error);
        this.renderError();
      });
  }

  renderLoading() {
    this.shadow.innerHTML = `<p>Loading...</p>`;
  }

  renderError() {
    this.shadow.innerHTML = `<p>Error al cargar el contenido</p>`;
  }

  updateTitle() {
    const h1 = this.shadow.querySelector("h1");
    if (h1) {
      h1.textContent = this.title;
    }
  }

  addReactiveClick() {
    const h1 = this.shadow.querySelector("h1");
    if (h1) {
      h1.addEventListener("click", () => this.toggleTitle());
    }
  }

  toggleTitle() {
    this.title =
      this.title === "Nuevo Título" ? "Título Original" : "Nuevo Título";
    this.updateTitle();
  }
}

customElements.define("app-arena", Arena);

export default Arena;
