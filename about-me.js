const layout = document.querySelector(".tabs-layout");
const tabs = layout ? layout.querySelector(".tabs") : null;
const panels = layout ? layout.querySelector(".tab-panels") : null;
const sections = Array.from(document.querySelectorAll(".collapsible-section"));

if (layout && tabs && panels && sections.length) {
  const activateTab = (tabId) => {
    sections.forEach((section, index) => {
      const currentTabId = section.getAttribute("id");
      const isActive = currentTabId === tabId;
      section.classList.toggle("is-active", isActive);
      section.setAttribute("aria-hidden", String(!isActive));

      const button = tabs.querySelector(`[data-tab="${currentTabId}"]`);
      if (!button) return;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  };

  sections.forEach((section, index) => {
    const toggle = section.querySelector("h2.section-toggle");
    const content = section.querySelector(".section-content");
    if (!toggle || !content) return;

    const tabId = `tab-${index + 1}`;
    section.classList.add("tab-panel");
    section.classList.remove("is-collapsed");
    section.setAttribute("id", tabId);
    section.setAttribute("role", "tabpanel");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "tab-button";
    button.innerHTML = toggle.innerHTML;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", tabId);
    button.setAttribute("aria-selected", "false");
    button.setAttribute("tabindex", "-1");
    button.setAttribute("data-tab", tabId);
    button.id = `tab-btn-${index + 1}`;

    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-controls", tabId);

    button.addEventListener("click", () => activateTab(tabId));

    tabs.appendChild(button);
    panels.appendChild(section);
  });

  const firstSection = sections[0];
  if (firstSection) {
    activateTab(firstSection.getAttribute("id"));
  }
}
