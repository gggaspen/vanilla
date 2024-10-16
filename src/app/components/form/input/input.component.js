import { initializeComponent } from "../../../../core/load-resources.js";

const config = {
  style: `./app/components/form/input/input.component.css`,
  template: `./app/components/form/input/input.component.html`,
};

class InputComponent extends HTMLElement {
  type = "";
  value = "";
  placeholder = "";

  constructor() {
    super();
    this.type = this.getAttribute("type") || this.type;
    this.value = this.getAttribute("value") || this.value;
    this.placeholder = this.getAttribute("placeholder") || this.value;
    this.onInit();
  }

  onInit() {
    this.shadow = this.attachShadow({ mode: "open" });
    initializeComponent(this, config, {
      onAfterRender: () => {
        this.inputElement = this.shadow.querySelector("input");

        if (this.inputElement) {
          this.inputElement.setAttribute("type", this.type);
          this.inputElement.setAttribute("value", this.value);
          this.inputElement.setAttribute("placeholder", this.placeholder);

          this.inputElement.addEventListener("input", (event) => {
            this.input(event);
          });
        }
      },
    });
  }

  input(event) {
    console.log(event.target.value);
  }
}

customElements.define("app-input", InputComponent);

export default InputComponent;
