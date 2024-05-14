class NetworkMenu {
  // public
  div;

  // private
  tabs = [
    new EntitiesMenu(),
  ];

  // public
  constructor() {
    this.div = document.createElement("div");
    this.div.id = "networkMenu";

    const tabs = document.createElement("div");
    this.div.appendChild(tabs);

    tabs.classList.add("tabs");

    for (const tabClass of this.tabs) {
      const tab = document.createElement("div");
      tabs.appendChild(tab);

      tab.classList.add("tabsOne");
      tab.innerHTML = tabClass.label;
    }

    tabs.firstElementChild?.classList.add("tabsSelected");

    const content = document.createElement("div");
    this.div.appendChild(content);

    content.classList.add("content");
    content.appendChild(this.tabs[0]?.getContent())
  }

  handleClick(e) {}
}
