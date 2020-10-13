$(function() {
  const container = document.querySelector('.container-fluid');
  window.addEventListener('scroll',() => {
    const header = document.querySelector('header');
    if (window.pageYOffset >= 150) {
      header.classList.add('sticky');
      header.style.transform = 'translateY(150px)'
      container.classList.add('container-padding');
    } else {
      header.classList.remove('sticky');
      header.style.transform = 'translateY(0px)';
      container.classList.remove('container-padding');
    }
  });
  
});