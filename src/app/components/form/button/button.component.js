import { initializeComponent } from "../../../../core/load-resources.js";

const config = {
  style: `./app/components/form/button/button.component.css`,
  template: `./app/components/form/button/button.component.html`,
};

class ButtonComponent extends HTMLElement {
  type = "button";
  text = "-";

  constructor() {
    super();
    this.type = this.getAttribute("type") || this.type;
    this.text = this.getAttribute("text") || this.text;
    this.onInit();
  }

  onInit() {
    this.shadow = this.attachShadow({ mode: "open" });
    initializeComponent(this, config, {
      onAfterRender: () => {
        this.buttonElement = this.shadow.querySelector("button");

        if (this.buttonElement) {
          this.buttonElement.setAttribute("type", this.type);
          this.buttonElement.innerHTML = this.text;

          this.buttonElement.addEventListener("click", (event) => {
            if (this.type === "submit") {
              event.preventDefault();
              // Acá llamamos al submit del formulario
              // const form = this.closest("form"); // Obtiene el formulario más cercano
              // if (form) {
              //   form.dispatchEvent(new Event("submit-form", { bubbles: true }));
              // }
              this.dispatchEvent(new Event("submit-form", { bubbles: true }));
              return;
            }
            this.click(event);
          });
        }
      },
    });
  }

  click(event) {
    event.preventDefault();
    console.log(this.type);
  }
}

customElements.define("app-button", ButtonComponent);

export default ButtonComponent;
