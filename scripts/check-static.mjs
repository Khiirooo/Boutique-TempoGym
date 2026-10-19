import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const source = html.replace(/<!--[\s\S]*?-->/g, '');
const scripts = [...source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(([, attrs]) => !/\bsrc\s*=|application\/(?:ld\+)?json/i.test(attrs))
  .map(([, , code]) => code);
for (const [, attrs] of source.matchAll(/<script\b([^>]*)>/gi)) {
  const src = attrs.match(/\bsrc="([^"]+)"/i)?.[1];
  if (src && !/^https?:/.test(src)) scripts.push(readFileSync(new URL('../' + src, import.meta.url), 'utf8'));
}
scripts.forEach((code, i) => new vm.Script(code, { filename: `inline-${i}.js` }));

function storage() {
  const values = new Map();
  return { getItem: k => values.get(k) ?? null, setItem: (k, v) => values.set(k, String(v)), removeItem: k => values.delete(k), values };
}
const localStorage = storage(), sessionStorage = storage();
const demo = { TG_DEMO_MODE: true, TG_STATIC_PAGES: true, localStorage, sessionStorage, console };
demo.window = demo;
vm.createContext(demo);
const engine = scripts.find(s => s.includes('window.TGDemoAPI=async function'));
assert.ok(engine, 'Le moteur local doit être identifiable');
vm.runInContext(engine, demo);
const before = JSON.stringify([...localStorage.values]);
await assert.rejects(demo.TGDemoAPI('/api/orders', 'POST', {
  sku: 'vedette-tshirt', size: 'M', first: 'Test', last: 'Livraison',
  group: 'Parkour', email: 'test@example.invalid', privacyAccepted: true
}), /commandes en ligne ne sont pas disponibles/);
assert.equal(JSON.stringify([...localStorage.values]), before, 'La vitrine ne doit écrire ni commande ni stock');
assert.equal((await demo.TGDemoAPI('/api/orders')).length, 0);

const panels = {};
const config = {
  baby: { lignes: [{ groupe: 'Baby', age: '4', horaires: '', prix: '310 €', dispo: '✓ Ouvert' }] },
  parkour: { lignes: [{ groupe: 'Loisir', dispo: '✓ Ouvert' }, { groupe: 'Compétition', dispo: 'Sur sélection', selection: true }] },
  fungym: { lignes: [{ groupe: 'Fun Gym', dispo: '✓ Ouvert' }] }
};
function render(open) {
  const document = { getElementById(id) {
    const tbody = { innerHTML: '' }; panels[id] = tbody;
    return { querySelector: selector => selector === 'tbody' ? tbody : null };
  }};
  const start = html.indexOf('// Tarifs — rendu des tableaux depuis TARIFS');
  const end = html.indexOf('// Boutique — rendu des cartes', start);
  assert.ok(start !== -1 && end > start);
  vm.runInNewContext(html.slice(start, end), { TARIFS: config, INSCRIPTIONS_OUVERTES: open, document });
}
render(false);
assert.match(panels['panel-baby'].innerHTML, /Inscriptions clôturées/);
assert.doesNotMatch(panels['panel-baby'].innerHTML, /✓ Ouvert/);
assert.match(panels['panel-parkour'].innerHTML, /Inscriptions clôturées/);
assert.match(panels['panel-parkour'].innerHTML, /Sur sélection/);
assert.match(panels['panel-fungym'].innerHTML, /✓ Ouvert/);
render(true);
assert.match(panels['panel-baby'].innerHTML, /✓ Ouvert/);

assert.doesNotMatch(html.match(/<nav[\s\S]*?<\/nav>/)[0], /<img/, 'L’en-tête doit rester textuel');
console.log(`${scripts.length} scripts JavaScript valides ; vitrine sans enregistrement de commande ; tarifs fermés/ouverts et exceptions vérifiés ; en-tête textuel.`);
