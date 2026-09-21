const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark-theme');
  if (themeToggle) themeToggle.checked = true;
}

document.documentElement.classList.add('theme-loaded');

if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  });
}
