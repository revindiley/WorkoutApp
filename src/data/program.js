// The 3-day glute-focused program. `g: 1` marks glute work, `uni: 1` one side at a time,
// `bw: 1` bodyweight by default. Rep ranges drive the progression hint.
export const DAYS = {
  A: {
    name: "Day A",
    title: "Hinge & Pull",
    focus: "Glutes and hamstrings, plus back",
    ex: [
      { id: "hipthrust", n: "DB hip thrust", sets: 4, lo: 8, hi: 12, rest: 120, g: 1, eq: "One DB across hips, back on bench",
        cue: "Shoulder blades on the bench edge, feet flat about hip width. Tuck the chin and ribs, drive through heels, squeeze 1 second at the top. Stop when hips are level with knees. Fold a towel under the dumbbell handle." },
      { id: "rdl", n: "DB Romanian deadlift", sets: 3, lo: 8, hi: 12, rest: 90, g: 1, eq: "Two DBs",
        cue: "Soft knees, push hips straight back, DBs slide down the thighs. Stop when the hamstrings are tight (usually mid-shin) with a flat back, then drive hips forward." },
      { id: "bss", n: "Bulgarian split squat", sets: 3, lo: 8, hi: 10, rest: 90, g: 1, uni: 1, eq: "Two DBs, rear foot on bench",
        cue: "Front foot far enough out that the front shin stays fairly vertical. Lean the torso slightly forward to bias the glute. Lower until the back knee is near the floor." },
      { id: "row1", n: "One-arm DB row", sets: 3, lo: 10, hi: 12, rest: 60, uni: 1, eq: "One DB, hand and knee on bench",
        cue: "Pull the elbow toward the hip pocket, not the armpit. Pause at the top, lower slowly." },
      { id: "swing", n: "Kettlebell swing", sets: 3, lo: 15, hi: 15, rest: 60, g: 1, eq: "One 35 lb KB",
        cue: "It is a hip hinge, not a squat. Hike the bell back, snap the hips forward and squeeze the glutes. Arms just guide it to chest height." },
      { id: "deadbug", n: "Dead bug", sets: 3, lo: 8, hi: 8, rest: 45, uni: 1, bw: 1, eq: "Bodyweight",
        cue: "Low back pressed into the floor the whole time. Extend opposite arm and leg slowly, exhale fully." },
    ],
  },
  B: {
    name: "Day B",
    title: "Squat & Push",
    focus: "Quads and side glutes, plus chest and shoulders",
    ex: [
      { id: "goblet", n: "Goblet squat", sets: 3, lo: 10, hi: 12, rest: 90, g: 1, eq: "One KB or DB at chest",
        cue: "Elbows inside the knees, sit between the heels, knees track over the toes. Go as deep as you can with a neutral back. Use a 3 second lowering when it gets easy." },
      { id: "stepup", n: "DB step-up", sets: 3, lo: 10, hi: 10, rest: 90, g: 1, uni: 1, eq: "Two DBs, bench at lowest height",
        cue: "Whole foot on the bench, lean forward a little and drive through the heel of the top leg. Do not push off the bottom foot. Lower slowly." },
      { id: "incpress", n: "Incline DB press", sets: 3, lo: 8, hi: 12, rest: 90, eq: "Two DBs, bench at 30 degrees",
        cue: "Shoulder blades pulled back and down. Lower to the upper chest with elbows about 45 degrees from the body." },
      { id: "latlunge", n: "Lateral lunge", sets: 3, lo: 8, hi: 8, rest: 60, g: 1, uni: 1, eq: "One DB or KB held at chest",
        cue: "Big step to the side, sit the hips back over that foot, keep the other leg straight. Push back to standing through the bent leg." },
      { id: "ohp", n: "Seated DB shoulder press", sets: 3, lo: 8, hi: 12, rest: 60, eq: "Two DBs, bench upright",
        cue: "Ribs down, press up and slightly in. Stop just short of the DBs touching." },
      { id: "sideplank", n: "Side plank", sets: 3, lo: 30, hi: 30, rest: 45, uni: 1, bw: 1, unit: "sec", eq: "Bodyweight",
        cue: "Elbow under shoulder, body in one line. Push the top hip toward the ceiling. This trains the side glute too." },
    ],
  },
  C: {
    name: "Day C",
    title: "Glute Pump & Upper",
    focus: "Single-leg glute work, plus back and arms",
    ex: [
      { id: "slhipthrust", n: "Single-leg hip thrust", sets: 3, lo: 10, hi: 12, rest: 60, g: 1, uni: 1, eq: "Bench, DB on the working hip when easy",
        cue: "Same setup as the hip thrust. Lift one foot, drive through the planted heel, keep hips level. Start with bodyweight." },
      { id: "sumo", n: "Kettlebell sumo deadlift", sets: 3, lo: 10, hi: 12, rest: 90, g: 1, eq: "Both 35 lb KBs (70 lb)",
        cue: "Wide stance, toes out, bells between the feet. Hinge, grip, chest up, then stand by pushing the floor away and squeezing the glutes." },
      { id: "revlunge", n: "DB reverse lunge", sets: 3, lo: 10, hi: 10, rest: 60, g: 1, uni: 1, eq: "Two DBs",
        cue: "Step back, lower until the back knee nearly touches, slight forward lean. Drive up through the front heel." },
      { id: "csrow", n: "Chest-supported DB row", sets: 3, lo: 10, hi: 12, rest: 60, eq: "Two DBs, lie face down on incline bench",
        cue: "Chest stays on the pad. Pull both elbows back and squeeze the shoulder blades together." },
      { id: "latraise", n: "DB lateral raise", sets: 3, lo: 12, hi: 15, rest: 45, eq: "Two light DBs",
        cue: "Slight bend in the elbows, raise to shoulder height leading with the elbows. Use light weight and control." },
      { id: "frogpump", n: "Frog pump", sets: 2, lo: 20, hi: 25, rest: 45, g: 1, bw: 1, eq: "Bodyweight, DB on hips optional",
        cue: "Lying on your back, soles of the feet together, knees out. Drive hips up fast and squeeze hard at the top. Finish with a burn." },
    ],
  },
};

export const ORDER = ["A", "B", "C"];

// Weeks 1-2: easier versions while she learns the movements
export const LEARN = {
  bss: { id: "splitsquat", n: "Split squat", sets: 3, lo: 8, hi: 10, rest: 90, g: 1, uni: 1, eq: "Bodyweight first, then two light DBs",
    cue: "Long stance, back foot on the floor on its toes. Drop the back knee straight down toward the floor, keep the front heel planted. Hold a wall or the bench for balance at first." },
  swing: { id: "kbdl", n: "Kettlebell deadlift", sets: 3, lo: 10, hi: 12, rest: 60, g: 1, eq: "One 35 lb KB between the feet",
    cue: "This teaches the hip hinge for swings later. Push the hips back, flat back, grab the bell, then stand up tall and squeeze the glutes." },
  slhipthrust: { id: "bwhipthrust", n: "Hip thrust, bodyweight", sets: 3, lo: 12, hi: 15, rest: 60, g: 1, eq: "Bench only",
    cue: "Same setup as Day A with no weight. Use it to practice the 1 second squeeze at the top and keeping the ribs down." },
};

// Suggested first weights for a newer lifter (per hand when two DBs)
export const START = {
  hipthrust: "20 to 30 lb DB", rdl: "15 to 20 lb each hand", bss: "bodyweight or 10 lb each hand", row1: "15 to 20 lb",
  goblet: "20 to 25 lb", stepup: "bodyweight, then 10 lb each hand", incpress: "10 to 15 lb each hand", latlunge: "bodyweight, then 10 to 15 lb",
  ohp: "8 to 10 lb each hand", sumo: "one 35 lb KB, both once easy", revlunge: "bodyweight or 10 lb each hand", csrow: "10 to 15 lb each hand",
  latraise: "5 lb each hand", splitsquat: "bodyweight", kbdl: "35 lb KB", swing: "35 lb KB once the deadlift feels solid",
};

// YouTube search terms for the "Watch form videos" button
export const YT_QUERY = {
  hipthrust: "dumbbell hip thrust on bench form", rdl: "dumbbell romanian deadlift form women",
  bss: "dumbbell bulgarian split squat glute focus form", row1: "one arm dumbbell row bench form",
  swing: "kettlebell swing for beginners form", deadbug: "dead bug exercise form", goblet: "goblet squat form beginners",
  stepup: "dumbbell step up glutes form", incpress: "incline dumbbell press form", latlunge: "lateral lunge goblet form",
  ohp: "seated dumbbell shoulder press form", sideplank: "side plank proper form", slhipthrust: "single leg hip thrust bench form",
  sumo: "kettlebell sumo deadlift form", revlunge: "dumbbell reverse lunge form", csrow: "chest supported dumbbell row incline bench",
  latraise: "dumbbell lateral raise form", frogpump: "frog pump glute exercise", splitsquat: "split squat beginners form",
  kbdl: "kettlebell deadlift beginners form", bwhipthrust: "bodyweight hip thrust bench form",
};

export const ALLEX = {};
ORDER.forEach((d) => DAYS[d].ex.forEach((e) => (ALLEX[e.id] = e)));
Object.values(LEARN).forEach((e) => (ALLEX[e.id] = e));

export const WARMUP = ["20 glute bridges", "10 bodyweight squats", "10 walking lunges per side", "1 light set of the first exercise"];
