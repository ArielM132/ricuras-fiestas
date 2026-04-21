const themeToggle = document.getElementById('theme-toggle');
const themeText = document.getElementById('theme-text');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true; 
    themeText.innerText = "Modo Oscuro"; 
}

themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeText.innerText = "Modo Oscuro";
        localStorage.setItem('theme', 'dark');
    } else {
        themeText.innerText = "Modo Claro";
        localStorage.setItem('theme', 'light');
    }
});