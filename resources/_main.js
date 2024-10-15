document.addEventListener("DOMContentLoaded", () => {});

/**
 * CUSTOM ELEMENTS
 */

class Pokemon extends HTMLElement {
  constructor() {
    super();
    const { name } = this.dataset;
    /**
     * Shadow DOM:
     */
    this.root = this.attachShadow({ mode: "open" });
  }
}

customElements.define("pokemon", Pokemon);

/**
 * TEMPLATES
 */

connectedCallback() {
    const template = document.getElementById("template1");
    const clone = template.content.cloneNode(true);
    this.appendChild(clone);
}

/**
 * Crear motores de template usando tagged literal strings:
*/

// nerd `<h1>${name}</h1>` 

/**
 * Programación reactiva con Proxy:
 */

const original =  {
  name: "pikachu",
  age: 9
}

const proxy = new Proxy(original, handler)

const handler = {
    set: function(target, prop, value) {
        target[prop] = value;
        if (prop === "age") {
            console.log("Updating age");
            // UPDATE UI
        }
    }
}
proxy.age = 10;

/**
 * 
 * 1. web.dev/learn/pwa
 * 2. baseline 2024
 */

/**
 * 
 * HISTORY API:
 */

// history.pushState({ name: "pikachu" }, "", "?name=pikachu");
// history.go(1);
// history.back();
// history.forward();
// history.replaceState({ name: "pikachu" }, "", "?name=pikachu");
// history.go(1);
history.pushState(optional_state, null, "/home");

window.addEventListener("popstate", (event) => {
    console.log("popstate", event);
    let url = location.href
    console.log(url)
})