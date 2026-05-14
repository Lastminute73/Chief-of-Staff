/**
 * Chief of Staff — shared cross-app state
 *
 * All apps deployed under the Chief-of-Staff domain share a single
 * localStorage key. Each app owns its own private state for app-specific
 * data; this shared store holds facts that more than one app cares about.
 *
 * STORAGE KEY:  "cos-shared-v1"
 *
 * SCHEMA:
 * {
 *   version: 1,
 *   days: {
 *     "YYYY-MM-DD": {
 *       workout: { completed: bool, type: "Bike"|"Lift"|"Rest", loggedAt: ISO },
 *       // future fields any app can add — examples:
 *       // meditation: { minutes: number, completedAt: ISO },
 *       // reading:    { pages: number },
 *       // outreach:   { count: number, last: ISO },
 *     }
 *   }
 * }
 *
 * API:
 *   cosShared.getDay(dateKey)              → returns the day record or null
 *   cosShared.get(dateKey, field)          → returns one field's value or null
 *   cosShared.set(dateKey, field, value)   → write any field. value=null deletes it.
 *   cosShared.setWorkout(dateKey, {…})     → typed helper for the workout slice
 *   cosShared.subscribe(callback)          → fires on cross-tab updates
 *
 * Adding a new app:
 *   1. Load this script: <script src="../shared.js"></script>
 *   2. Read what you need with cosShared.get / getDay
 *   3. Write your slice with cosShared.set(date, "yourField", value)
 *   4. Subscribe to changes so you re-render when other apps write
 *
 * dateKey format: "YYYY-MM-DD" (e.g. "2026-05-14"). Use UTC-stable formatting:
 *   const d = new Date();
 *   const k = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
 */
(function () {
  const KEY = "cos-shared-v1";

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { version: 1, days: {} };
      const s = JSON.parse(raw);
      if (!s.days) s.days = {};
      return s;
    } catch {
      return { version: 1, days: {} };
    }
  }

  function save(s) {
    s.version = 1;
    localStorage.setItem(KEY, JSON.stringify(s));
  }

  function getDay(dateKey) {
    const s = load();
    return s.days[dateKey] || null;
  }

  function get(dateKey, field) {
    const day = getDay(dateKey);
    return day ? (day[field] ?? null) : null;
  }

  function set(dateKey, field, value) {
    const s = load();
    if (!s.days[dateKey]) s.days[dateKey] = {};
    if (value === null || value === undefined) {
      delete s.days[dateKey][field];
      if (Object.keys(s.days[dateKey]).length === 0) delete s.days[dateKey];
    } else {
      s.days[dateKey][field] = value;
    }
    save(s);
  }

  function setWorkout(dateKey, workout) {
    set(dateKey, "workout", workout);
  }

  function subscribe(cb) {
    window.addEventListener("storage", (e) => {
      if (e.key === KEY) cb(load());
    });
  }

  window.cosShared = { getDay, get, set, setWorkout, subscribe, _KEY: KEY };
})();
