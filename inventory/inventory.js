const toggleSidebar = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');

toggleSidebar.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  mainContent.classList.toggle('open');
});

