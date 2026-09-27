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
    const title = cards[current].querySelector("h3")?.textContent || "Selected work";
    position.textContent = `${current + 1} of ${cards.length} · ${title}`;
  };

  previous.addEventListener("click", () => show(current - 1));
  next.addEventListener("click", () => show(current + 1));
  stack.classList.add("is-ready");
  controls.hidden = false;
  show(0);
});
