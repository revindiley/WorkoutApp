// Draws the finish screen as a 1080x1350 PNG. Every block is measured first,
// then the stack is centered above the footer so long headlines never collide.
function tok(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function wrapLines(ctx, text, maxW) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (ctx.measureText(t).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
  ctx.fill();
}

export async function buildCard(c) {
  try {
    await document.fonts.ready;
  } catch (e) {
    /* ignore */
  }
  const W = 1080, H = 1350;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const x = cv.getContext("2d");
  const disp = "Outfit, system-ui, sans-serif";
  const body = "Figtree, system-ui, sans-serif";
  const cx = W / 2;
  x.textAlign = "center";
  x.textBaseline = "top";
  x.fillStyle = tok("--lav");
  x.fillRect(0, 0, W, H);

  const s = 2.3;
  let tSize = 84;
  x.font = `500 ${tSize}px ${disp}`;
  let tLines = wrapLines(x, c.title, 880);
  if (tLines.length > 1) {
    tSize = 70;
    x.font = `500 ${tSize}px ${disp}`;
    tLines = wrapLines(x, c.title, 880);
  }
  x.font = `400 38px ${body}`;
  const mLines = wrapLines(x, c.msg, 800);

  const blocks = [
    { h: 105 * s, draw: (y) => {
      const cy = y + 58 * s;
      [[0, -22, "--petal1"], [19, 11, "--petal2"], [-19, 11, "--petal3"]].forEach(([dx, dy, t]) => {
        x.globalAlpha = 0.85;
        x.fillStyle = tok(t);
        x.beginPath();
        x.arc(cx + dx * s, cy + dy * s, 36 * s, 0, Math.PI * 2);
        x.fill();
      });
      x.globalAlpha = 1;
      x.fillStyle = tok("--surface");
      x.beginPath();
      x.arc(cx, cy, 9 * s, 0, Math.PI * 2);
      x.fill();
    } },
    { gap: 64 },
    { h: 40, draw: (y) => { x.fillStyle = tok("--muted"); x.font = `500 32px ${body}`; x.fillText(c.eyebrow, cx, y); } },
    { gap: 24 },
    { h: tLines.length * tSize * 1.12, draw: (y) => {
      x.fillStyle = tok("--ink");
      x.font = `500 ${tSize}px ${disp}`;
      tLines.forEach((l, i) => x.fillText(l, cx, y + i * tSize * 1.12));
    } },
    { gap: 24 },
    { h: mLines.length * 52, draw: (y) => {
      x.fillStyle = tok("--muted");
      x.font = `400 38px ${body}`;
      mLines.forEach((l, i) => x.fillText(l, cx, y + i * 52));
    } },
    { gap: 56 },
    { h: 150, draw: (y) => {
      const st = [[String(c.sets), "sets done"]];
      if (c.lb > 0) st.push([c.lb.toLocaleString(), "lb lifted"]);
      st.push([`${c.wk} of 3`, "this week"]);
      const bw = 260, bh = 150, g = 24;
      let bx = cx - (st.length * bw + (st.length - 1) * g) / 2;
      st.forEach(([v, l]) => {
        x.fillStyle = tok("--surface");
        roundRect(x, bx, y, bw, bh, 36);
        x.fillStyle = tok("--ink");
        x.font = `500 56px ${disp}`;
        x.fillText(v, bx + bw / 2, y + 26);
        x.fillStyle = tok("--muted");
        x.font = `400 28px ${body}`;
        x.fillText(l, bx + bw / 2, y + 94);
        bx += bw + g;
      });
    } },
  ];

  if (c.cmp) {
    const dots = Math.min(Math.ceil(c.cmp.n), 12);
    blocks.push(
      { gap: 64 },
      { h: 38, draw: (y) => { x.fillStyle = tok("--muted"); x.font = `400 30px ${body}`; x.fillText("That's about the weight of", cx, y); } },
      { gap: 14 },
      { h: 62, draw: (y) => { x.fillStyle = tok("--ink"); x.font = `500 52px ${disp}`; x.fillText(c.cmp.label, cx, y); } },
      { gap: 28 },
      { h: 40, draw: (y) => {
        const r = 20, dg = 14;
        let dx = cx - (dots * r * 2 + (dots - 1) * dg) / 2 + r;
        for (let i = 0; i < dots; i++) {
          x.fillStyle = tok("--surface");
          x.beginPath();
          x.arc(dx, y + r, r, 0, Math.PI * 2);
          x.fill();
          const frac = i === dots - 1 && c.cmp.n % 1 ? c.cmp.n % 1 : 1;
          x.save();
          x.beginPath();
          x.rect(dx - r, y, r * 2 * frac, r * 2);
          x.clip();
          x.fillStyle = tok("--done");
          x.beginPath();
          x.arc(dx, y + r, r, 0, Math.PI * 2);
          x.fill();
          x.restore();
          dx += r * 2 + dg;
        }
      } }
    );
  }

  const total = blocks.reduce((t, b) => t + (b.h || b.gap), 0);
  const top = 70, bottom = H - 140;
  let y = top + Math.max(0, (bottom - top - total) / 2);
  blocks.forEach((b) => {
    if (b.draw) b.draw(y);
    y += b.h || b.gap;
  });

  x.fillStyle = tok("--line");
  x.fillRect(cx - 60, H - 108, 120, 2);
  x.fillStyle = tok("--muted");
  x.font = `500 28px ${body}`;
  x.fillText(`Sam's Program · ${new Date(c.date).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}`, cx, H - 80);

  return new Promise((res) => cv.toBlob(res, "image/png"));
}
