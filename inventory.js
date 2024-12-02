const sidebar = document.querySelector('.sidebar');
const toggleButton = document.createElement('div');
toggleButton.classList.add('toggle-button');
toggleButton.textContent = '☰';
sidebar.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});