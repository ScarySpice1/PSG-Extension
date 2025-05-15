const API_KEY = 'YOUR_API_KEY_HERE';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const teamId = 524; // PSG

function createMatchDiv(match, showScore = false) {
  const div = document.createElement('div');
  div.className = 'match';

  const home = match.homeTeam.name;
  const away = match.awayTeam.name;
  const date = new Date(match.utcDate).toLocaleString();

  const isHome = home === "Paris Saint-Germain FC";
  const opponent = isHome ? away : home;

  const isLive = match.status === "LIVE";

  div.innerHTML = `
    <div><strong>vs ${opponent}</strong></div>
    <div class="date">${date}${isLive ? ' 🟢' : ''}</div>
    ${showScore && match.score.fullTime.home !== null ? `
      <div class="score">${home} ${match.score.fullTime.home} - ${match.score.fullTime.away} ${away}</div>
    ` : ''}
  `;

  return div;
}

async function loadMatches() {
  try {
    const baseURL = `https://api.football-data.org/v4/teams/${teamId}/matches`;
    const headers = { 'X-Auth-Token': API_KEY };

    const [next, live, past] = await Promise.all([
      fetch(proxy + `${baseURL}?status=SCHEDULED&limit=3`, { headers }).then(res => res.json()),
      fetch(proxy + `${baseURL}?status=LIVE`, { headers }).then(res => res.json()),
      fetch(proxy + `${baseURL}?status=FINISHED&limit=3`, { headers }).then(res => res.json())
    ]);

    const liveDiv = document.getElementById('live');
    const nextDiv = document.getElementById('next');
    const pastDiv = document.getElementById('past');

    liveDiv.innerHTML = '';
    nextDiv.innerHTML = '';
    pastDiv.innerHTML = '';

    if (live.matches.length > 0) {
      liveDiv.innerHTML += '<h2>🔴 En cours</h2>';
      live.matches.forEach(match => liveDiv.appendChild(createMatchDiv(match, true)));
    }

    nextDiv.innerHTML += '<h2>🗓 À venir</h2>';
    next.matches.forEach(match => nextDiv.appendChild(createMatchDiv(match)));

    pastDiv.innerHTML += '<h2>✅ Derniers</h2>';
    past.matches.forEach(match => pastDiv.appendChild(createMatchDiv(match, true)));

  } catch (err) {
    document.body.innerHTML = `<p>❌ Erreur de chargement : ${err}</p>`;
  }
}

// Chargement initial
loadMatches();

// Actualisation toutes les 30 secondes
setInterval(loadMatches, 30000);

