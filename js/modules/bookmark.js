export default function changeBookmark(element) {
  const icon = document.getElementById(element);
  const btnImg = icon.firstChild;

  icon.addEventListener('click', handleBookmark);

  function handleBookmark() {
    btnImg.classList.toggle('filter');
  }
}
