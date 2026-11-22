"use strict";

const cover = document.querySelector(".cover");
const invitation = document.querySelector("#invitation");
const openButtons = document.querySelectorAll(".seal, .open-invitation");
const dialog = document.querySelector("dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogText = document.querySelector("#dialog-text");
const directionsAddress = document.querySelector("#directions-address");
const dialogEyebrow = document.querySelector("#dialog-eyebrow");
const dialogOk = document.querySelector(".dialog-ok");
const rsvpContent = document.querySelector("#rsvp-content");
const generalContent = document.querySelector("#general-content");
const directionsContent = document.querySelector("#directions-content");
const locationMap = document.querySelector("#location-map");
const mapButtons = document.querySelectorAll("[data-map]");

const destination = "Rua Visconde de Guaratiba, 250, São Paulo - SP";
const metroStation = "Estação Santos-Imigrantes, São Paulo - SP";
const maps = {
  venue: {
    title: "Mapa interativo da recepção",
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.4158804457793!2d-46.622092725414!3d-23.599978678773546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5b00001cd1dd%3A0x57eb8817ee0e3de9!2sUnik%20Studios%20by%20Tecnisa!5e1!3m2!1spt-BR!2sbr!4v1795361625185!5m2!1spt-BR!2sbr",
  },
  metro: {
    title: "Mapa interativo da estação Santos-Imigrantes",
    url: `https://www.google.com/maps?q=${encodeURIComponent(metroStation)}&output=embed`,
  },
};

function directionsUrl(travelmode, options = {}) {
  const parameters = new URLSearchParams({
    api: "1",
    destination,
    travelmode,
    ...options,
  });
  return `https://www.google.com/maps/dir/?${parameters}`;
}

const navigationLinks = {
  maps: directionsUrl("driving"),
  waze: `https://www.waze.com/ul?${new URLSearchParams({ ll: "-23.5999787,-46.6195178", navigate: "yes" })}`,
  jafet: directionsUrl("driving", { waypoints: "Avenida Doutor Ricardo Jafet, São Paulo - SP" }),
  vergueiro: directionsUrl("driving", { waypoints: "Rua Vergueiro, São Paulo - SP" }),
  walking: directionsUrl("walking", { origin: metroStation }),
  transit: directionsUrl("transit"),
};

document.querySelectorAll("[data-navigation]").forEach((link) => {
  link.href = navigationLinks[link.dataset.navigation];
});

function showMap(name) {
  locationMap.title = maps[name].title;
  locationMap.src = maps[name].url;
  mapButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.map === name));
  });
}

mapButtons.forEach((button) => {
  button.addEventListener("click", () => showMap(button.dataset.map));
});

const messages = {
  rsvp: {
    title: "Prazo para confirmação",
    text: "Pedimos que a confirmação de presença seja realizada até o dia 30/11/2026.",
  },
  directions: {
    title: "Como chegar",
    text: "",
  },
  gifts: {
    title: "Lista de presentes",
    text: "A lista de presentes ainda não está disponível. Assim que o link for definido, você poderá acessá-lo por aqui.",
  },
  details: {
    title: "Informações gerais",
    text: "Alguns detalhes para aproveitarmos juntos esse momento.",
  },
};

invitation.hidden = true;
cover.hidden = false;

let opening = false;

async function openInvitation() {
  if (opening) return;
  opening = true;
  openButtons.forEach((button) => { button.disabled = true; });
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  cover.classList.add("is-opening");
  if (!reducedMotion) {
    await new Promise((resolve) => setTimeout(resolve, 550));
    cover.classList.add("is-leaving");
    await new Promise((resolve) => setTimeout(resolve, 450));
  }
  cover.hidden = true;
  invitation.hidden = false;
  document.querySelector("#couple").focus({ preventScroll: true });
  scrollTo({ top: 0, behavior: "instant" });
}

openButtons.forEach((button) => button.addEventListener("click", openInvitation));

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const message = messages[button.dataset.action];
    dialogTitle.textContent = message.title;
    dialogText.textContent = message.text;
    const showingDirections = button.dataset.action === "directions";
    const showingGeneral = button.dataset.action === "details";
    const showingRsvp = button.dataset.action === "rsvp";
    dialogText.hidden = showingDirections;
    directionsAddress.hidden = !showingDirections;
    dialog.setAttribute("aria-describedby", showingDirections ? "directions-address" : "dialog-text");
    dialogEyebrow.textContent = showingGeneral ? "NOSSO DIA • 19.12.2026" : "THAINA & GUILHERME";
    dialogOk.textContent = showingRsvp ? "Voltar ao convite" : "Entendi";
    rsvpContent.hidden = !showingRsvp;
    generalContent.hidden = !showingGeneral;
    directionsContent.hidden = !showingDirections;
    dialog.classList.toggle("general-dialog", showingGeneral || showingRsvp);
    dialog.classList.toggle("rsvp-dialog", showingRsvp);
    dialog.classList.toggle("directions-dialog", showingDirections);
    dialog.showModal();
    dialog.scrollTop = 0;
    if (showingDirections) showMap("venue");
  });
});

dialog.addEventListener("close", () => {
  if (!dialog.open) locationMap.removeAttribute("src");
});
dialogOk.addEventListener("click", () => dialog.close());
dialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    dialog.close();
  }
});
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (
    event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom
  ) {
    dialog.close();
  }
});
