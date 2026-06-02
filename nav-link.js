document.addEventListener('DOMContentLoaded', () => {
    const pageLink = document.createElement('a');
    pageLink.href = 'queen.html';
    pageLink.className = 'page-link';
    pageLink.textContent = '👑 For The Queen';
    pageLink.setAttribute('aria-label', 'Open the Happy 19 Queen birthday surprise');
    document.body.appendChild(pageLink);
});
