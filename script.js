window.addEventListener('scroll', () => {
  const nav = document.querySelector('header nav');
  if (window.scrollY > 50) {
    nav.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
  } else {
    nav.style.backgroundColor = 'transparent';
    nav.style.boxShadow = 'none';
  }
});
