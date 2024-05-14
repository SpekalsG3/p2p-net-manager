class EntitiesMenu {
  // private
  elements = [
    ["Network Node", NetworkNode],
    ["Line Element", LineElement],
  ];

  // public
  label = "Entities"

  // public
  constructor() {
  }

  getContent() {
    const list = document.createElement("div");
    list.classList.add("list");

    for (const [label, element] of this.elements) {
      const el = document.createElement("div");
      list.appendChild(el);
      el.classList.add("listElement");

      const preview = document.createElement("div");
      el.appendChild(preview);
      preview.classList.add("listElementPreview");

      const previewInner = document.createElement("div");
      previewInner.appendChild(element.generateDiv());
      preview.appendChild(previewInner);
      previewInner.classList.add("listElementPreviewInner");

      const name = document.createElement("div");
      el.appendChild(name);
      name.classList.add("listElementName");
      name.innerHTML = label;
    }

    return list;
  }
}
