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
      if (open) {
        const card = explorer.closest(".work-card");
        if (card) {
          card.scrollTop += panel.getBoundingClientRect().top - card.getBoundingClientRect().top - 24;
        }
      }
    });
  });

  topics.hidden = false;

  // A closed outer disclosure returns to the overview on the next visit.
  const details = explorer.closest("details");
  details?.addEventListener("toggle", () => {
    if (details.open) return;
    entries.forEach(({ button, panel }) => {
      button.setAttribute("aria-expanded", "false");
      panel.hidden = true;
    });
  });
});

// Manual browsing only: no automatic rotation, and no hidden projects without JS.
document.querySelectorAll("[data-project-stack]").forEach((stack) => {
  const cards = Array.from(stack.querySelectorAll(".work-card"));
  const controls = stack.querySelector(".stack-controls");
  const position = controls?.querySelector(".stack-position");
  const previous = controls?.querySelector("[data-project-previous]");
  const next = controls?.querySelector("[data-project-next]");
  if (!cards.length || !position || !previous || !next) return;

  let current = 0;
  const show = (index) => {
    current = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      card.querySelectorAll("details").forEach((details) => {
        details.open = false;
      });
      card.hidden = cardIndex !== current;
      card.scrollTop = 0;
    });
    const title = cards[current].querySelector("h3").textContent;
    position.textContent = (current + 1) + " of " + cards.length + " · " + title;
  };

  previous.addEventListener("click", () => show(current - 1));
  next.addEventListener("click", () => show(current + 1));
  show(0);
  stack.classList.add("is-ready");
  controls.hidden = false;
});
