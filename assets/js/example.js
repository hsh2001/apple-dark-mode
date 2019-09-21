const darkModedaiQuery = window.matchMedia('(prefers-color-scheme: dark)');

function updateForDarkModeChange() {
  if (darkModedaiQuery.matches) {
    // Dark mode is on.
  } else {
    // Dark mode is off.
  }
}

darkModedaiQuery.addListener(updateForDarkModeChange);
updateForDarkModeChange();
