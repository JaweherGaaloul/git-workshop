// Participants wall: lists participants/*.md from GitHub and shows one card per file.
// On GitHub Pages it reads the repository it is served from (so it also works on your fork).

const DEFAULT_OWNER = 'amine-mosbah';
const DEFAULT_REPO = 'git-workshop';
const CACHE_MS = 2 * 60 * 1000; // the GitHub API allows 60 requests per hour without signing in

function whichRepo() {
  const host = location.hostname;
  if (host.endsWith('.github.io')) {
    const owner = host.replace('.github.io', '');
    const repo = location.pathname.split('/').filter(Boolean)[0] || DEFAULT_REPO;
    return { owner, repo };
  }
  return { owner: DEFAULT_OWNER, repo: DEFAULT_REPO };
}

const { owner, repo } = whichRepo();
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

$('repoLink').href = `https://github.com/${owner}/${repo}`;
$('howLink').href = `https://github.com/${owner}/${repo}#step-1-fork-the-repo`;

// "# Name" then "- Key: value" lines
function parse(md, file) {
  const lines = md.split(/\r?\n/);
  const heading = lines.find((l) => l.startsWith('# '));
  const name = heading ? heading.slice(2).trim() : file.replace(/\.md$/, '');
  const facts = [];
  for (const l of lines) {
    const m = /^\s*[-*]\s*([^:]+):\s*(.+)$/.exec(l);
    if (m) facts.push([m[1].trim(), m[2].trim()]);
  }
  return { name, facts };
}

function card({ name, facts }) {
  const gh = facts.find(([k]) => k.toLowerCase() === 'github');
  const user = gh && /^[A-Za-z0-9-]{1,39}$/.test(gh[1]) ? gh[1] : null;
  const rest = facts.filter((f) => f !== gh);
  const initials = name.split(/\s+/).map((w) => w[0] || '').join('').slice(0, 2).toUpperCase();
  const avatar = user
    ? `<img src="https://github.com/${user}.png?size=96" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'ph',textContent:'${esc(initials)}'}))">`
    : `<div class="ph">${esc(initials)}</div>`;
  return `<li class="card">
    <div class="who">${avatar}<div><h3>${esc(name)}</h3>${user ? `<a href="https://github.com/${user}">@${esc(user)}</a>` : ''}</div></div>
    <ul class="facts">${rest.map(([k, v]) => `<li><span>${esc(k)}:</span> ${esc(v)}</li>`).join('')}</ul>
  </li>`;
}

function readCache() {
  try {
    const c = JSON.parse(sessionStorage.getItem('wall') || 'null');
    if (c && c.key === `${owner}/${repo}` && Date.now() - c.at < CACHE_MS) return c.people;
  } catch (e) { /* storage blocked */ }
  return null;
}
function writeCache(people) {
  try { sessionStorage.setItem('wall', JSON.stringify({ key: `${owner}/${repo}`, at: Date.now(), people })); } catch (e) { /* ignore */ }
}

async function load(force = false) {
  const status = $('status');
  status.className = 'status';
  status.textContent = 'Loading participants…';
  try {
    let people = force ? null : readCache();
    if (!people) {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/participants`);
      if (res.status === 403 || res.status === 429) throw new Error('GitHub is limiting requests from this network. Wait a minute and press Refresh.');
      if (!res.ok) throw new Error(`Could not read the participants folder (HTTP ${res.status}).`);
      const files = (await res.json()).filter((f) => f.type === 'file' && f.name.endsWith('.md') && !f.name.startsWith('_'));
      people = await Promise.all(files.map(async (f) => {
        const r = await fetch(f.download_url);
        return parse(r.ok ? await r.text() : '', f.name);
      }));
      people.sort((a, b) => a.name.localeCompare(b.name));
      writeCache(people);
    }
    $('wall').innerHTML = people.map(card).join('');
    $('count').textContent = people.length;
    status.textContent = people.length ? `Showing ${owner}/${repo}. Merged pull requests appear here.` : 'No participants yet. Be the first to open a pull request!';
  } catch (e) {
    status.className = 'status error';
    status.textContent = e.message || 'Could not load participants.';
  }
}

$('refresh').addEventListener('click', () => load(true));
load();
setInterval(() => load(), CACHE_MS + 1000);
