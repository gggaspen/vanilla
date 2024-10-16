import { initializeComponent } from "../../../core/load-resources.js";
import InputComponent from "./input/input.component.js";
import ButtonComponent from "./button/button.component.js";

const config = {
  style: `./app/components/form/form.component.css`,
  template: `./app/components/form/form.component.html`,
};

class Form extends HTMLElement {
  config = {};
  inputs = [];
  buttons = [];

  constructor() {
    super();
    this.onInit();
  }

  onInit() {
    this.shadow = this.attachShadow({ mode: "open" });

    initializeComponent(this, config, {
      onAfterRender: () => {
        this.formElement = this.shadow.querySelector("form");
        if (this.formElement) {
          this.formElement.addEventListener("submit-form", (event) => {
            this.submit(event);
          });
        }
        this.inputs.push(new InputComponent());
        this.buttons.push(new ButtonComponent());
        this.buttons.push(new ButtonComponent());
      },
    });
  }

  submit(event) {
    event.preventDefault();
    console.log(event);
  }
}

customElements.define("app-form", Form);

export default Form;
