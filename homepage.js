//removing text body emphasis to get heading red 

const element = document.querySelector('.text-body-emphasis');
element.classList.remove('text-body-emphasis');

//reservation button 
const button = document.querySelector('.reservation-button');

button.addEventListener('mouseover', () => {
  button.style.backgroundColor = '#C75B7A';
});

button.addEventListener('mouseout', () => {
    button.style.backgroundColor = '#921A40';
});
//reservation button 

//navbar
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.color = '#D14D72'; // Change the hover color to red
  });

  link.addEventListener('mouseout', () => {
    link.style.color = '#921A40'; // Reset the text color to the default
  });
});