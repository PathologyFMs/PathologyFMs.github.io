// Supplemental catalog entry for PathBot.
// Loaded after data.js so the entry can be added without duplicating the main catalog.
(() => {
  const tileCategory = modelData.find(
    (category) => category.category === "Tile-Level Vision Foundation Models"
  );

  if (!tileCategory || tileCategory.models.some((model) => model.name === "PathBot")) {
    return;
  }

  const pathBot = {
    "name": "PathBot",
    "year": 2025,
    "date": "2025-10-10",
    "data": "11,765 WSIs, >30M patches",
    "idea": "General-purpose pan-cancer pathology foundation model built around a 1B-parameter ViT-Giant encoder. Introduces a Masked Distillation Network (MDN) with an integrated self-supervised learning strategy combining contrastive and generative objectives; pretrained entirely on public TCGA pathology data and evaluated across 20 downstream tasks spanning classification, segmentation, detection and regression",
    "stains": "Not explicitly stated",
    "github": "",
    "hf": "",
    "paper": "https://ieeexplore.ieee.org/document/11198904/",
    "bibtex": "@article{Lu2025PathBot,\n  author = {Mengkang Lu and Tianyi Wang and Qingjie Zeng and Zilin Lu and Zhe Li and Yong Xia},\n  title = {PathBot: A Foundation Model for Pathological Image Analysis},\n  journal = {IEEE Journal of Biomedical and Health Informatics},\n  year = {2025},\n  volume = {29},\n  number = {12},\n  pages = {8976--8987},\n  doi = {10.1109/JBHI.2025.3619967}\n}",
    "audit_objective": "Masked Distillation Network (MDN) with integrated contrastive and generative self-supervised learning objectives",
    "audit_wsis": "11,765 TCGA WSIs",
    "audit_patches": ">30M pathology image patches",
    "audit_organs": "Pan-cancer; 32 TCGA cancer types",
    "audit_downstream": "20 downstream tasks spanning pathological image classification, segmentation, detection and regression",
    "audit_cohorts": "TCGA; public-only pretraining corpus",
    "audit_domain": "General-purpose pan-cancer pathology image representation learning",
    "audit_notes": "ViT-Giant encoder with 1B parameters. The authors describe PathBot as the largest model at publication time trained on publicly available pathology data. The paper states that code and models will be released; no official GitHub repository or Hugging Face checkpoint was verified as of September 2026. The accessible authoritative metadata does not explicitly state the stain, input resolution or embedding dimension.",
    "paper_title": "PathBot: A Foundation Model for Pathological Image Analysis",
    "paper_author": "Lu",
    "audit_benchmark": "Twenty downstream tasks using task-specific decoders across four major task families: classification, segmentation, detection and regression",
    "audit_result": "Reported state-of-the-art performance on most of the 20 evaluated downstream tasks, demonstrating broad transferability across cancer types and pathology-analysis settings"
  };

  const insertBefore = tileCategory.models.findIndex(
    (model) => model.name === "GenBio-PathFM"
  );

  if (insertBefore >= 0) {
    tileCategory.models.splice(insertBefore, 0, pathBot);
  } else {
    tileCategory.models.push(pathBot);
  }
})();
