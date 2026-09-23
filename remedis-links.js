// Supplemental links for REMEDIS.
(() => {
  for (const section of modelData) {
    const remedis = section.models?.find((model) => model.name === "REMEDIS");
    if (!remedis) continue;

    remedis.github = "https://github.com/google-research/medical-ai-research-foundations";
    remedis.website = "https://research.google/blog/robust-and-efficient-medical-imaging-with-self-supervision/";
    break;
  }
})();
