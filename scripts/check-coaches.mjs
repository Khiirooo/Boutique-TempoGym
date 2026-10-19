import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

class Target {
  listeners = new Map();
  constructor() { this.style = {}; const set = new Set(); this.classList = { add: x => set.add(x), remove: x => set.delete(x), contains: x => set.has(x) }; }
  addEventListener(type, callback) { if (!this.listeners.has(type)) this.listeners.set(type, []); this.listeners.get(type).push(callback); }
  emit(type, event = {}) { for (const callback of this.listeners.get(type) || []) callback(event); }
}
const carousel = new Target(), track = new Target(), dialogs = new Target(), doc = new Target(), win = new Target();
let time = 1000, openings = 0;
const modal = new Target(); modal.id = 'modal-coach-Lucas';
const card = { dataset: { coach: 'Lucas' }, focus() { doc.activeElement = card; }, closest: selector => selector === '.coach-card' ? card : null };
const close = { closest: selector => selector === '.modal-overlay' ? modal : selector === '.modal-close' ? close : null };
track.children = [{ offsetLeft: 0 }, { offsetLeft: 120 }]; track.scrollWidth = 240;
carousel.contains = value => value === card;
dialogs.querySelector = () => modal.classList.contains('active') ? modal : null;
doc.getElementById = id => ({ 'coaches-track': track, coachesCarousel: carousel, 'coaches-modals': dialogs, 'modal-coach-Lucas': modal })[id];
win.ENTRAINEURS = [{ id: 'Lucas', nom: 'Lucas', role: 'Entraîneur', initiale: 'L', groupes: ['Parkour'], bio: '', depuis: 'à définir' }];
win.matchMedia = () => ({ matches: true, addEventListener() {} });
win.openModal = () => { openings++; modal.classList.add('active'); };
win.closeModal = () => modal.classList.remove('active');
vm.runInNewContext(readFileSync(new URL('../assets/coach-carousel.js', import.meta.url), 'utf8'), { window: win, document: doc, Date: { now: () => time }, requestAnimationFrame: () => 1, cancelAnimationFrame() {}, MutationObserver: class { observe() {} }, Set });
const event = (x = 0, y = 0) => ({ target: card, button: 0, isPrimary: true, pointerId: 1, clientX: x, clientY: y });
const reset = () => { dialogs.emit('click', { target: close }); time += 400; };
carousel.emit('click', event()); assert.equal(openings, 1, 'Le clic ouvre le profil'); reset();
carousel.emit('pointerdown', event()); doc.emit('pointerup', event()); carousel.emit('click', event()); assert.equal(openings, 2, 'Un tap ouvre une seule fenêtre'); reset();
carousel.emit('pointerdown', event()); doc.emit('pointermove', event(4, 3)); doc.emit('pointerup', event(4, 3)); assert.equal(openings, 3, 'Une petite imprécision reste un clic'); reset();
carousel.emit('pointerdown', event()); doc.emit('pointermove', event(30, 0)); doc.emit('pointerup', event(30, 0)); carousel.emit('click', event()); assert.equal(openings, 3, 'Un glissement horizontal ne déclenche pas le profil');
time += 400; carousel.emit('click', event()); assert.equal(openings, 4, 'Un glissement ne bloque pas le prochain clic'); reset();
carousel.emit('pointerdown', event()); doc.emit('pointermove', event(0, 30)); doc.emit('pointerup', event(0, 30)); carousel.emit('click', event()); assert.equal(openings, 4, 'Le défilement vertical tactile ne déclenche pas le profil'); reset();
carousel.emit('pointerdown', event()); doc.emit('pointercancel', event()); carousel.emit('click', event()); assert.equal(openings, 4, 'Un geste annulé n’ouvre pas de profil'); reset();
carousel.emit('click', event()); assert.equal(openings, 5, 'Le clic fonctionne après un geste annulé');
assert.match(track.innerHTML, /<button type="button"/);
assert.match(dialogs.innerHTML, /aria-labelledby="coach-title-Lucas"/);
assert.doesNotMatch(dialogs.innerHTML, /à définir|Biographie à venir/);
console.log('Profils : clic, tap, petite imprécision, glissements, annulation, réouverture et nom accessible vérifiés.');
