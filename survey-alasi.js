// Supplemental Survey and Perspectives entry for Al-Asi et al. (2026).
(() => {
  const category = modelData.find(
    (section) => section.category === "Survey and Perspectives"
  );

  const entryName = "Al-Asi et al.";
  if (!category || category.models.some((model) => model.name === entryName)) {
    return;
  }

  category.models.push({
    "name": entryName,
    "tag": "review",
    "year": 2026,
    "date": "2026-05-19",
    "data": "Review of transformer-based pathology foundation models (2020–2025)",
    "idea": "Technical and clinically oriented review of pathology foundation models, tracing the field from weakly supervised and hierarchical WSI methods to large-scale vision and vision–language foundation models. It emphasizes model evolution, diagnostic and prognostic applications, multimodal integration, clinical translation barriers, benchmarking, and underexplored pathology domains.",
    "github": "",
    "hf": "",
    "paper": "https://www.mdpi.com/2306-5354/13/5/577",
    "bibtex": "@article{alasi2026pathologyfoundationmodels,\n  author = {Al-Asi, Hussien and Yilmaz, Ibrahim and Reynolds, Jordan and Agarwal, Shweta and Nassar, Aziza and Zubair, Abba and Horbinski, Craig and Dangott, Bryan and Akkus, Zeynettin},\n  title = {Pathology Foundation Models: Evolution, Current Landscape, Challenges and Opportunities from a Technical and Clinical Perspective},\n  journal = {Bioengineering},\n  volume = {13},\n  number = {5},\n  pages = {577},\n  year = {2026},\n  month = {May},\n  publisher = {MDPI},\n  doi = {10.3390/bioengineering13050577},\n  url = {https://www.mdpi.com/2306-5354/13/5/577}\n}",
    "paper_title": "Pathology Foundation Models: Evolution, Current Landscape, Challenges and Opportunities from a Technical and Clinical Perspective",
    "paper_author": "Al-Asi",
    "audit_domain": "Survey / clinical perspective on pathology foundation models, vision encoders, vision–language models, benchmarking, deployment, and multimodal integration",
    "audit_notes": "Peer-reviewed open-access review in Bioengineering 2026, 13(5), article 577. The review reports a structured PubMed search and considers relevant preprints because leading pathology FMs are often disseminated before peer review. Its transformer-model inclusion window spans 2020–2025; CNN-only models are excluded.",
    "audit_benchmark": "Synthesizes major pathology FM families including UNI, Virchow, Phikon, CONCH, GigaPath, H-optimus, TITAN and Mayo Atlas, while discussing benchmark design and clinical maturity rather than introducing a new benchmark.",
    "audit_result": "Identifies persistent barriers in cross-institution generalization, interpretability and routine clinical workflow integration, with cytopathology, transplant pathology, frozen sections and rare tumors highlighted as underdeveloped areas. The authors prioritize rigorous benchmarking, pathologist-in-the-loop deployment and multimodal fusion for clinical translation."
  });
})();
