// Keep entries in each category ordered chronologically by publication/model year.
// JavaScript's stable sort preserves the existing curated order within the same year.
(() => {
  modelData.forEach((section) => {
    if (!Array.isArray(section.models)) return;

    section.models.sort((a, b) => {
      const yearA = Number.isFinite(Number(a.year)) ? Number(a.year) : Number.POSITIVE_INFINITY;
      const yearB = Number.isFinite(Number(b.year)) ? Number(b.year) : Number.POSITIVE_INFINITY;
      return yearA - yearB;
    });
  });
})();
