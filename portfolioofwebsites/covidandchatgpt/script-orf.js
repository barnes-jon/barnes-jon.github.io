const expandButtons = document.querySelectorAll('.btn-expand');
expandButtons.forEach(button => {
  button.addEventListener('click', event => {
    const card = event.target.closest('.card');
    card.classList.toggle('expanded');
  });
});

const collapseButtons = document.querySelectorAll('.btn-collapse');
collapseButtons.forEach(button => {
  button.addEventListener('click', event => {
    const card = event.target.closest('.card');
    card.classList.toggle('expanded');
  });
});

