const root = document.documentElement;
const codeThemes = {
  light: 'github-light',
  dark: 'github-dark'
};

function currentColorMode() {
  return root.classList.contains('dark') ? 'dark' : 'light';
}

function syncCodeTheme() {
  const theme = codeThemes[currentColorMode()];
  document.querySelectorAll<HTMLElement>('.expressive-code').forEach((block) => {
    block.dataset.theme = theme;
  });
}

function syncDisplayState() {
  const activeTheme = root.dataset.theme || 'default';
  document.querySelectorAll<HTMLElement>('[data-theme-value]').forEach((button) => {
    const active = button.dataset.themeValue === activeTheme;
    button.setAttribute('aria-pressed', String(active));
    button.querySelector<HTMLElement>('[data-theme-indicator]')?.classList.toggle('hidden', !active);
  });
  document.querySelector<HTMLElement>('[data-color-mode]')?.setAttribute('aria-pressed', String(root.classList.contains('dark')));
}

function notifyColorModeChange() {
  document.dispatchEvent(
    new CustomEvent('astro-narrow:color-mode-change', {
      detail: { mode: currentColorMode() }
    })
  );
}

function setExpanded(button: HTMLElement | null, expanded: boolean) {
  button?.setAttribute('aria-expanded', String(expanded));
}

function setPanel(panel: HTMLElement | null, button: HTMLElement | null, open: boolean) {
  panel?.classList.toggle('hidden', !open);
  setExpanded(button, open);
}

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;

  const displayButton = target.closest<HTMLElement>('[data-display-menu]');
  const mobileButton = target.closest('[data-mobile-menu]');
  const displayPanel = document.querySelector<HTMLElement>('[data-display-panel]');
  const mobilePanel = document.querySelector<HTMLElement>('[data-mobile-panel]');
  const mobileMenu = document.querySelector<HTMLElement>('[data-mobile-menu]');

  if (displayButton) {
    const willOpen = displayPanel?.classList.contains('hidden') ?? false;
    setPanel(displayPanel, displayButton, willOpen);
    setPanel(mobilePanel, mobileMenu, false);
    return;
  }

  if (target.closest('[data-display-close]')) {
    setPanel(displayPanel, document.querySelector('[data-display-menu]'), false);
    return;
  }

  if (mobileButton) {
    const willOpen = mobilePanel?.classList.contains('hidden') ?? false;
    setPanel(mobilePanel, mobileMenu, willOpen);
    setPanel(displayPanel, document.querySelector('[data-display-menu]'), false);
    return;
  }

  const themeValue = target.closest<HTMLElement>('[data-theme-value]');
  if (themeValue?.dataset.themeValue) {
    root.dataset.theme = themeValue.dataset.themeValue;
    localStorage.setItem('theme', themeValue.dataset.themeValue);
    syncDisplayState();
    return;
  }

  if (target.closest('[data-color-mode]')) {
    root.classList.toggle('dark');
    localStorage.setItem('color-mode', root.classList.contains('dark') ? 'dark' : 'light');
    syncCodeTheme();
    syncDisplayState();
    notifyColorModeChange();
    return;
  }

  if (!target.closest('[data-display-panel]')) setPanel(displayPanel, document.querySelector('[data-display-menu]'), false);
  if (!target.closest('[data-mobile-panel]')) setPanel(mobilePanel, mobileMenu, false);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  setPanel(document.querySelector('[data-display-panel]'), document.querySelector('[data-display-menu]'), false);
  setPanel(document.querySelector('[data-mobile-panel]'), document.querySelector('[data-mobile-menu]'), false);
});

syncCodeTheme();
syncDisplayState();
