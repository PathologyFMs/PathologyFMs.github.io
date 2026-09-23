// Supplemental catalog entry for automatic FM pretraining-data curation.
// Creates a dedicated Data Curation & Pretraining Strategies category if needed.
(() => {
  let category = modelData.find(
    (section) => section.category === "Data Curation & Pretraining Strategies"
  );

  if (!category) {
    category = { category: "Data Curation & Pretraining Strategies", models: [] };
    modelData.push(category);
  }

  const entryName = "Chen et al.";
  if (category.models.some((model) => model.name === entryName)) {
    return;
  }

  category.models.push({
    "name": entryName,
    "year": 2025,
    "date": "2025-03-24",
    "data": "37,096 WSIs; ~350M tiles",
    "idea": "Fully automated tile-level data curation for pathology foundation-model pretraining. Hierarchical clustering is applied to UNI embeddings from ~350M tiles to sample more balanced and diverse subsets; the study shows that curation alone is insufficient and pairs it with cluster-stratified batch sampling to improve downstream representation quality.",
    "stains": "H&E",
    "tag": "data curation",
    "tag_color": "blue",
    "github": "https://github.com/swiss-ai/patho-ssl-data-curation",
    "hf": "https://huggingface.co/datasets/swiss-ai/patho-ssl-data-curation",
    "paper": "https://doi.org/10.1007/978-3-032-04978-0_53",
    "website": "https://papers.miccai.org/miccai-2025/0783-Paper1975.html",
    "bibtex": "@InProceedings{CheBoq_Revisiting_MICCAI2025,\n  author = {Chen, Boqi and Vincent-Cuaz, Cédric and Schoenpflug, Lydia A. and Madeira, Manuel and Fournier, Lisa and Subramanian, Vaishnavi and Andani, Sonali and Ruiperez-Campillo, Samuel and Vogt, Julia E. and Luisier, Raphaëlle and Thanou, Dorina and Koelzer, Viktor H. and Frossard, Pascal and Campanella, Gabriele and Rätsch, Gunnar},\n  title = {Revisiting Automatic Data Curation for Vision Foundation Models in Digital Pathology},\n  booktitle = {Medical Image Computing and Computer Assisted Intervention -- MICCAI 2025},\n  year = {2025},\n  publisher = {Springer Nature Switzerland},\n  volume = {15965},\n  series = {Lecture Notes in Computer Science},\n  pages = {554--564},\n  doi = {10.1007/978-3-032-04978-0_53}\n}",
    "audit_objective": "Automatic hierarchical-clustering data curation over pretrained UNI tile embeddings + DINOv2 self-supervised training with cluster-stratified batch sampling",
    "audit_wsis": "37,096 WSIs total: 11,666 TCGA WSIs spanning 32 cancer types + 25,430 GTEx WSIs spanning 40 healthy tissue sites",
    "audit_patches": "~350M non-overlapping 224×224 H&E tiles extracted at 20× (0.5 µm/px); primary FM experiments train on curated 10% subsets (~35M tiles)",
    "audit_organs": "Pan-cancer TCGA plus 40 healthy GTEx tissue sites",
    "audit_downstream": "17 downstream tasks: 8 RoI-level tasks (LUAD, CRC, UniToPatho, Chaoyang, BRACS, BACH, BreakHis, PCAM) + 9 WSI-level tasks covering breast cancer detection, ER/PR/HER2/HRD, lung EGFR and immunotherapy response, and IBD detection",
    "audit_cohorts": "Pretraining: TCGA + GTEx. WSI evaluation includes Mount Sinai Health System (MSHS) and Memorial Sloan Kettering Cancer Center (MSKCC) cohorts; RoI evaluation uses eight independent public cohorts",
    "audit_domain": "Foundation-model pretraining data curation, dataset balancing, diversity-aware sampling, and efficient self-supervised pathology representation learning",
    "audit_notes": "The trained encoder is a ViT-L using DINOv2. Experiments use a global batch size of 2048 and 170K iterations on the 10% curated subset, approximately one full-data-equivalent pass over 350M tiles. Two hierarchical trees (T1/T2) are evaluated. The key finding is that automatic curation must be combined with stratified batch sampling: T1-BS is the best average method on both RoI and WSI benchmarks, whereas curation with random batching can underperform the full uncurated baseline.",
    "paper_title": "Revisiting Automatic Data Curation for Vision Foundation Models in Digital Pathology",
    "paper_author": "Chen",
    "audit_benchmark": "Compares full-data random batching, supervised metadata curation, and automatic hierarchical-clustering curation with random versus cluster-stratified batching; evaluation spans 8 RoI and 9 WSI tasks",
    "audit_result": "T1-BS achieves the strongest average performance: 82.0% mean balanced accuracy over the eight RoI tasks versus 79.9% for the full-data baseline, and 83.3% mean AUC over the nine WSI tasks versus 82.6% for the full-data baseline. The gains are obtained while training on only 10% of the ~350M-tile corpus.",
    "audit_training": "DINOv2 ViT-L; 10% curated subset; 170K iterations; global batch 2048",
    "audit_publication": "Peer-reviewed MICCAI 2025 paper, LNCS 15965, pp. 554–564"
  });
})();
