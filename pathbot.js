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
    "data": "11,765 TCGA WSIs; >30M 512×512 source patches",
    "idea": "General-purpose pan-cancer pathology foundation model using a 1B-parameter ViT-G/14 encoder and Masked Distillation Network (MDN). MDN combines teacher-student self-distillation at class-token and patch-feature levels with masked pixel reconstruction, jointly learning discriminative and generative representations. The model is evaluated on 20 downstream tasks spanning segmentation, detection, classification, regression, few-shot learning and multimodal fusion.",
    "stains": "H&E",
    "github": "",
    "hf": "",
    "paper": "https://ieeexplore.ieee.org/document/11198904/",
    "bibtex": "@article{Lu2025PathBot,\n  author = {Mengkang Lu and Tianyi Wang and Qingjie Zeng and Zilin Lu and Zhe Li and Yong Xia},\n  title = {PathBot: A Foundation Model for Pathological Image Analysis},\n  journal = {IEEE Journal of Biomedical and Health Informatics},\n  year = {2025},\n  volume = {29},\n  number = {12},\n  pages = {8976--8987},\n  doi = {10.1109/JBHI.2025.3619967}\n}",
    "audit_objective": "Masked Distillation Network (MDN): class-token distillation + patch-feature distillation + masked pixel reconstruction; EMA teacher-student learning with multi-crop views",
    "audit_wsis": "11,765 diagnostic TCGA WSIs across 32 cancer types",
    "audit_patches": ">30M source patches (512×512); ViT pre-training input 224×224 with 14×14 patch tokens",
    "audit_organs": "Pan-cancer; 32 TCGA cancer types",
    "audit_downstream": "20 tasks across segmentation, detection, WSI/patch classification, survival regression, few-shot classification and multimodal fusion",
    "audit_cohorts": "TCGA for pre-training; external downstream evaluation includes CPTAC-LUNG, CPTAC-KIDNEY, GlaS, CRAG, NCT-CRC-HE, MHIST, MedFMC and multimodal datasets",
    "audit_domain": "General-purpose pan-cancer pathology image representation learning",
    "audit_notes": "ViT-G/14 encoder with 1B parameters, 40 transformer blocks, 16 attention heads, hidden/feature dimension 1408 and MLP dimension 6144. Pre-training uses 224×224 model inputs derived from >30M 512×512 TCGA source patches. The paper reports ~7,200 GPU-hours on 32 NVIDIA A100 GPUs. No official PathBot GitHub repository or Hugging Face checkpoint was verified as of September 2026. The pre-training section identifies diagnostic TCGA WSIs; H&E is used throughout the histopathology evaluations, although the stain is not separately restated in the pre-training-dataset paragraph.",
    "paper_title": "PathBot: A Foundation Model for Pathological Image Analysis",
    "paper_author": "Lu",
    "audit_benchmark": "Twenty downstream tasks covering pixel-level segmentation/detection, patch- and WSI-level classification, survival regression, few-shot learning and multimodal H&E fusion",
    "audit_result": "Reported state-of-the-art performance on most evaluated tasks, including strong external-cohort performance on CPTAC-LUNG and CPTAC-KIDNEY and gains across segmentation, detection and regression benchmarks"
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
