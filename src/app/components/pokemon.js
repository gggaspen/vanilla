class Pokemon extends HTMLElement {
  constructor() {
    super();

    const id = this.getAttribute("id");

    this.shadow = this.attachShadow({ mode: "open" });

    this.shadow.innerHTML = `
      <div>
        <h1>Poke ${id}</h1>
      </div>
      `;
  }
}

customElements.define("poke-mon", Pokemon);

export default Pokemon;
