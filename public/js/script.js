const resultsPerPage = 15;
let results = [];

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('resultsContainer');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const themeToggle = document.getElementById('themeToggle');

//Thème clair/sombre
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

//fetch avec gestion d’erreur
async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erreur réseau');
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data;
}

function getPosterImage(url) {
    return url !== 'N/A' ? url : 'https://via.placeholder.com/300x450?text=No+Image';
}

// Recherche de séries
async function searchSeries() {
    const query = searchInput.value.trim();
    if (!query) {
        showError('Veuillez entrer un terme de recherche');
        return;
    }
    try {
        results = await fetchJSON(`/api/search?query=${encodeURIComponent(query)}`);
        displayResults();
    } catch (error) {
        showError(error.message);
        results = [];
        displayResults();
    }
}

// Affichage des résultats
function displayResults() {
    if (!results.length) {
        resultsContainer.innerHTML = '<p class="no-results">Aucun résultat trouvé</p>';
        return;
    }
    resultsContainer.innerHTML = results.map(show => `
        <div class="show-card">
            <img src="${getPosterImage(show.Poster)}" alt="${show.Title}" loading="lazy">
            <div class="show-info">
                <h3 class="show-title">${show.Title}</h3>
                <p><strong>Année:</strong> ${show.Year}</p>
                <button class="details-btn" onclick="showDetails('${show.imdbID}')">Plus de détails</button>
            </div>
        </div>
    `).join('');
}

// Détails d'une série
async function showDetails(imdbID) {
    try {
        const show = await fetchJSON(`/api/details?id=${imdbID}`);
        modalContent.innerHTML = `
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <div class="modal-header">
                <img src="${getPosterImage(show.Poster)}" alt="${show.Title}">
                <div class="modal-info">
                    <h2>${show.Title}</h2>
                    <p><strong>Année:</strong> ${show.Year}</p>
                    <p><strong>Genre:</strong> ${show.Genre}</p>
                    <p><strong>Note IMDb:</strong> ${show.imdbRating}</p>
                    <p><strong>Durée:</strong> ${show.Runtime}</p>
                    <p><strong>Acteurs:</strong> ${show.Actors}</p>
                </div>
            </div>
            <div class="modal-body">
                <h3>Synopsis</h3>
                <p>${show.Plot}</p>
                ${show.Ratings?.length ? `
                    <div class="modal-ratings">
                        ${show.Ratings.map(r => `<div class="rating"><strong>${r.Source}:</strong> ${r.Value}</div>`).join('')}
                    </div>` : ''}
            </div>
        `;
        modal.classList.add('active');
    } catch (error) {
        showError(error.message);
    }
}
// Erreur
function showError(message) {
    resultsContainer.innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
}
// Fermeture page (modal)
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Événements
searchButton.addEventListener('click', searchSeries);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
