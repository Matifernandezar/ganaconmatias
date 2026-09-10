(() => {
  "use strict";

  const body = document.body;
  const menuButton = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");

  const closeMenu = () => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    body.classList.remove("menu-open");
  };

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("is-open", !isOpen);
      body.classList.toggle("menu-open", !isOpen);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const ageGate = document.querySelector("[data-age-gate]");
  const ageConfirm = document.querySelector("[data-age-confirm]");
  const ageExit = document.querySelector("[data-age-exit]");

  if (ageGate) {
    let hasConfirmedAge = false;
    try {
      hasConfirmedAge = sessionStorage.getItem("gm_age_confirmed") === "true";
    } catch (_) {
      hasConfirmedAge = false;
    }

    if (!hasConfirmedAge) {
      ageGate.hidden = false;
      body.classList.add("modal-open");
      ageConfirm?.focus();
    }

    ageConfirm?.addEventListener("click", () => {
      try {
        sessionStorage.setItem("gm_age_confirmed", "true");
      } catch (_) {
        // The gate still closes if storage is unavailable.
      }
      ageGate.hidden = true;
      body.classList.remove("modal-open");
    });

    ageExit?.addEventListener("click", () => {
      window.location.replace("https://www.google.com/");
    });
  }

  const campaign = (() => {
    const params = new URLSearchParams(window.location.search);
    const data = {
      source: params.get("utm_source") || "direct",
      medium: params.get("utm_medium") || "none",
      campaign: params.get("utm_campaign") || "none",
    };

    try {
      const hasUtm = params.has("utm_source") || params.has("utm_medium") || params.has("utm_campaign");
      if (hasUtm) sessionStorage.setItem("gm_attribution", JSON.stringify(data));
      const saved = sessionStorage.getItem("gm_attribution");
      return saved ? JSON.parse(saved) : data;
    } catch (_) {
      return data;
    }
  })();

  document.querySelectorAll("[data-wa-cta]").forEach((link) => {
    link.addEventListener("click", () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "whatsapp_click",
        cta_location: link.dataset.waCta,
        page_path: window.location.pathname,
        campaign_source: campaign.source,
        campaign_medium: campaign.medium,
        campaign_name: campaign.campaign,
      });
    });
  });
})();
