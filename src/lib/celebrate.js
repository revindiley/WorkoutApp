// Finish-screen messages, drawn like a shuffled deck so none repeats until all have shown.
export const CHEERS = [
  ["That's a wrap", "Every set you log today makes next week's weights feel lighter."],
  ["Session done", "Showing up is the hardest rep. You already did it."],
  ["Strong work", "Your glutes did the heavy lifting today. Now they get to rest and grow."],
  ["Look at you go", "Consistency beats intensity, and you just stacked another day."],
  ["One more in the books", "Future you is going to thank present you for this one."],
  ["Nailed it", "Hydrate, eat some protein, and enjoy the rest of your day."],
  ["You did the thing", "A month from now, today's weights will be your warm-up."],
  ["Proud of you", "Progress is quiet at first. Keep stacking sessions like this."],
  ["Workout complete", "Muscles grow during recovery. Sleep well tonight."],
  ["Way to go", "You chose yourself today. That counts for a lot."],
  ["Another one down", "Small wins every week add up to big changes."],
  ["Finished strong", "Take a second to notice how good that feels."],
];

// Returns [message, nextBag]. `bag` holds the remaining indices; `last` is the previous pick.
export function drawCheer(bag, last) {
  let b = Array.isArray(bag) ? bag.filter((i) => i >= 0 && i < CHEERS.length) : [];
  if (!b.length) {
    b = CHEERS.map((_, i) => i);
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    if (b[b.length - 1] === last) b.unshift(b.pop());
  }
  const i = b.pop();
  return { index: i, cheer: CHEERS[i], bag: b };
}

// Approximate weights in lb
export const OBJECTS = [
  { w: 10, s: "house cat", p: "house cats" },
  { w: 65, s: "golden retriever", p: "golden retrievers" },
  { w: 220, s: "giant panda", p: "giant pandas" },
  { w: 500, s: "baby grand piano", p: "baby grand pianos" },
  { w: 1000, s: "horse", p: "horses" },
  { w: 1400, s: "dairy cow", p: "dairy cows" },
  { w: 2700, s: "Mini Cooper", p: "Mini Coopers" },
  { w: 4500, s: "pickup truck", p: "pickup trucks" },
];

// Picks an object that comes out between 1.5 and 10 for this total, avoiding last time's.
export function compareWeight(lb, lastObj) {
  if (lb <= 0) return null;
  let c = OBJECTS.filter((o) => lb / o.w >= 1.5 && lb / o.w <= 10);
  if (c.length > 1) c = c.filter((o) => o.s !== lastObj);
  if (!c.length) {
    const fit = OBJECTS.filter((o) => lb / o.w >= 1);
    c = fit.length ? [fit[fit.length - 1]] : [OBJECTS[0]];
  }
  const o = c[Math.floor(Math.random() * c.length)];
  const exact = lb / o.w;
  const n = exact >= 3 ? Math.round(exact) : Math.round(exact * 2) / 2;
  const label = n === 1 ? `1 ${o.s}` : `${n % 1 ? n.toFixed(1) : n} ${o.p}`;
  return { obj: o.s, n, label };
}
