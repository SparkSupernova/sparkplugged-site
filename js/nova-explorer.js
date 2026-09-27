// Keep the full, labelled reading order when JavaScript is unavailable.
document.querySelectorAll("[data-nova-explorer]").forEach((explorer) => {
  const topics = explorer.querySelector(".nova-topics");
  const entries = Array.from(topics.querySelectorAll("button")).map((button) => ({
    button,
    panel: explorer.querySelector("#" + button.getAttribute("aria-controls")),
  }));

  if (entries.some(({ panel }) => !panel)) return;

  entries.forEach(({ button, panel }) => {
    panel.hidden = true;
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") !== "true";
      entries.forEach((entry) => {
        const selected = open && entry.button === button;
        entry.button.setAttribute("aria-expanded", String(selected));
        entry.panel.hidden = !selected;
      });
    });
  });

  topics.hidden = false;
});

// Manual browsing only: no automatic rotation, and every system stays listed without JS.
document.querySelectorAll("[data-tech-gallery]").forEach((gallery) => {
  const cards = Array.from(gallery.querySelectorAll(".tech-card"));
  const details = cards.map((card) => gallery.querySelector(card.getAttribute("href")));
  const controls = gallery.querySelector(".stack-controls");
  const position = controls?.querySelector(".stack-position");
  const previous = controls?.querySelector("[data-tech-previous]");
  const next = controls?.querySelector("[data-tech-next]");
  if (!cards.length || details.some((detail) => !detail) || !position || !previous || !next) return;

  let current = 0;
  const show = (index) => {
    current = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      card.setAttribute("aria-current", String(cardIndex === current));
      details[cardIndex].hidden = cardIndex !== current;
    });
    // Each system opens on its overview, with its topics closed.
    details[current].querySelectorAll(".nova-topics:not([hidden]) button").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      details[current].querySelector("#" + button.getAttribute("aria-controls")).hidden = true;
    });
    const title = details[current].querySelector("h3")?.textContent || "The technology";
    position.textContent = `${current + 1} of ${cards.length} · ${title}`;
  };

  cards.forEach((card, cardIndex) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      show(cardIndex);
    });
  });
  previous.addEventListener("click", () => show(current - 1));
  next.addEventListener("click", () => show(current + 1));
  gallery.classList.add("is-ready");
  controls.hidden = false;
  show(0);
});
