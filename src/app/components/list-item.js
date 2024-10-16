class ListItem extends HTMLElement {
  constructor() {
    super();
    const _id = this.getAttribute("_id");
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = `
        <div class="list-item">
            <div class="poke-item">
                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${_id}.png"/>
            </div>
        </div>`;
  }
}

customElements.define("list-item", ListItem);

export default ListItem;
