// =====================================================================
// EXAMREADY — NOTES MODULE
// Add this entire block to the BOTTOM of shared.js
// =====================================================================

// ── Default sample notes ──────────────────────────────────────────────
const DEFAULT_NOTES = [
  {
    id: 'note_1',
    title: 'Class 9 Maths: Real Numbers — Key Concepts',
    classNum: '9', subjectKey: 'math',
    summary: 'Essential properties of rational and irrational numbers, Euclid\'s lemma, and decimal expansions for quick revision.',
    content: `Every real number is either rational or irrational. Rational numbers have terminating or repeating decimal expansions; irrationals do not.

Euclid's Division Lemma: For any two positive integers a and b, we can write a = bq + r where 0 ≤ r < b. This is the base for finding HCF.

[TIP] To prove a number is irrational, assume it is rational and arrive at a contradiction.

Key facts to remember:
- sqrt(2), sqrt(3), sqrt(5) are all irrational
- Sum or product of a rational and an irrational is always irrational
- The product of two irrationals can be rational (e.g. sqrt(2) × sqrt(2) = 2)

[IMPORTANT] The Fundamental Theorem of Arithmetic: Every composite number can be expressed as a product of primes in exactly one way (order doesn't matter).`,
    tags: ['important', 'formula', 'exam-tips'],
    author: 'ExamReady Team', updatedAt: '2026-04-17', chapterId: ''
  },
  {
    id: 'note_2',
    title: 'Class 10 Science: Chemical Reactions — Quick Notes',
    classNum: '10', subjectKey: 'science',
    summary: 'Types of chemical reactions, balancing equations, and key observations for board exam answers.',
    content: `A chemical reaction involves breaking and forming of chemical bonds. Always identify reactants and products first.

Types of reactions you must know:
- Combination: A + B → AB
- Decomposition: AB → A + B
- Displacement: A + BC → AC + B
- Double Displacement: AB + CD → AD + CB
- Oxidation-Reduction (Redox): transfer of electrons

[TIP] Write observations before drawing conclusions in CBSE answers.

Balancing tip — balance in this order:
1. Balance metals first
2. Balance non-metals next
3. Balance hydrogen
4. Balance oxygen last

[IMPORTANT] Exothermic reactions release energy; endothermic reactions absorb energy. Respiration is exothermic, photosynthesis is endothermic.`,
    tags: ['exam-tips', 'formula'],
    author: 'ExamReady Team', updatedAt: '2026-04-17', chapterId: ''
  },
  {
    id: 'note_3',
    title: 'Class 12 Physics: Electrostatics Summary Notes',
    classNum: '12', subjectKey: 'physics',
    summary: 'Coulomb\'s law, electric field, potential, and capacitance formulas for rapid board exam revision.',
    content: `Coulomb's Law: F = k·q₁q₂/r² where k = 9×10⁹ N·m²/C²
Electric force acts along the line joining two point charges.

Electric Field (E) = F/q₀ = kQ/r² (due to point charge)
Direction: away from positive, towards negative.

Electric Potential (V) = W/q = kQ/r
V is a scalar quantity. SI unit: Volt.

[FORMULA] Energy stored in capacitor: U = ½CV² = Q²/2C = QV/2

Capacitors in series: 1/C = 1/C₁ + 1/C₂ + ...
Capacitors in parallel: C = C₁ + C₂ + ...

[TIP] Electric field lines never cross each other. They start on positive charges and end on negative charges.

[IMPORTANT] Conductors in electrostatic equilibrium: E inside = 0, all charge resides on surface, potential is same throughout the conductor.`,
    tags: ['formula', 'important'],
    author: 'ExamReady Team', updatedAt: '2026-04-17', chapterId: ''
  }
];

// ── Core notes API ───────────────────────────────────────────────────
function getAllNotes() {
  const stored = getData('notes');
  const notes  = Array.isArray(stored) ? stored : DEFAULT_NOTES;
  return JSON.parse(JSON.stringify(notes)).sort((a, b) =>
    new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
  );
}

function saveAllNotes(notes) {
  setData('notes', Array.isArray(notes) ? notes : []);
}

function getNotesByClassAndSubject(cls, subjectKey) {
  return getAllNotes().filter(n => n.classNum === cls && n.subjectKey === subjectKey);
}

function findNoteById(noteId) {
  if (!noteId) return null;
  return getAllNotes().find(n => n.id === noteId) || null;
}

function getNoteUrl(noteOrId) {
  const id = typeof noteOrId === 'string' ? noteOrId : noteOrId?.id;
  return `note-post.html?id=${encodeURIComponent(id || '')}`;
}

function getNoteExcerpt(note, maxLength = 160) {
  const raw = (note?.summary || note?.content || '').replace(/\[.*?\]/g, '').replace(/\s+/g, ' ').trim();
  if (!raw) return '';
  return raw.length > maxLength ? raw.slice(0, maxLength - 1) + '...' : raw;
}
