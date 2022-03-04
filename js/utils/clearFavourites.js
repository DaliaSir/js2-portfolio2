export function clearList(renderFavs) {
  if (confirm(`Remove all the favourites?`)) {
    localStorage.removeItem("favourite-articles");
    renderFavs();
  }
}