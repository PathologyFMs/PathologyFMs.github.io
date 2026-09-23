// Supplemental Tile-Level Vision Foundation Model entry for HistoEncoder.
(() => {
  const category = modelData.find(
    (section) => section.category === "Tile-Level Vision Foundation Models"
  );

  const entryName = "HistoEncoder";
  if (!category || category.models.some((model) => model.name === entryName)) {
    return;
  }

  category.models.push({
    "name": entryName,
    "year": 2026,
    "date": "2026-08-31",
    "data": "48M prostate tiles from 11,226 slides / 1,307 patients",
    "idea": "Prostate-specific tile-level foundation model built with XCiT-S12 and XCiT-M24 backbones and DINO self-supervision. HistoEncoder is pretrained on 48 million prostate tissue tiles selected from a much larger HelsinkiProstate archive and is designed to produce morphology-sensitive tile embeddings that can be used directly with KNN/clustering or lightly fine-tuned for downstream prostate pathology tasks.",
    "stains": "H&E",
    "tag": "domain-specific",
    "tag_color": "blue",
    "github": "https://github.com/jopo666/HistoEncoder",
    "hf": "",
    "paper": "https://doi.org/10.1016/j.jpi.2026.100715",
    "website": "https://www.sciencedirect.com/science/article/pii/S215335392600177X",
    "bibtex": "@article{Batouche2026JPI,\n  title = {{HistoEncoder}: A digital pathology foundation model for prostate cancer},\n  author = {Pohjonen, Joona and Batouche, Oussama and Kantola, Janne and Rannikko, Antti and Sandeman, Kevin and Erickson, Andrew and Pitkänen, Esa and Mirtti, Tuomas},\n  journal = {Journal of Pathology Informatics},\n  year = {2026},\n  pages = {100715},\n  doi = {10.1016/j.jpi.2026.100715},\n  url = {https://doi.org/10.1016/j.jpi.2026.100715}\n}",
    "audit_objective": "DINO self-supervised learning on XCiT backbones (XCiT-S12 and XCiT-M24)",
    "audit_wsis": "HelsinkiProstate: 11,226 prostate needle-biopsy and radical-prostatectomy slides from 1,307 patients treated at Helsinki University Hospital between 2013 and 2021",
    "audit_patches": "48M selected pretraining tiles: all 16M tiles with prostate-cancer classifier score >0.2 plus 32M randomly sampled tiles with score <=0.2. The underlying HelsinkiProstate archive contains about 898.4M tissue tiles before balancing.",
    "audit_organs": "Prostate only",
    "audit_downstream": "Tile-level prostate cancer classification / tissue annotation using frozen embeddings or light fine-tuning, plus patient-level prostate-cancer-specific mortality prediction using HistoEncoder-derived histomic features combined with clinical nomograms",
    "audit_cohorts": "Pretraining: HelsinkiProstate. Evaluation includes PESO, PANDA Karolinska and Radboud cohorts, Helsinki30, Helsinki60, and HelsinkiTMA",
    "audit_domain": "Domain-specific prostate histopathology representation learning",
    "audit_notes": "Two released encoders: prostate-s = XCiT-S12 (25.9M parameters) and prostate-m = XCiT-M24 (83.9M). For HelsinkiProstate pretraining-data construction, slides were cut into 640×640 tiles at 5×, 10× and 20× with 20% overlap, then filtered and balanced to 48M training tiles. The paper's dataset table separately reports non-overlapping 256×256 tissue-tile counts for dataset-size accounting; these should not be conflated with the 48M selected pretraining images. The peer-reviewed Journal of Pathology Informatics paper became available online on 31 August 2026.",
    "paper_title": "HistoEncoder: A digital pathology foundation model for prostate cancer",
    "paper_author": "Pohjonen",
    "audit_benchmark": "Cross-cohort prostate cancer classification with KNN and fine-tuning on PESO, PANDA-Karolinska/Radboud and Helsinki subsets, plus long-term prognostic evaluation on HelsinkiTMA",
    "audit_result": "HistoEncoder consistently outperforms natural-image-pretrained baselines, including in zero-/low-fine-tuning regimes; the paper reports comparable downstream performance with up to roughly 1000× less task-specific training data and shows that HistoEncoder histomic features add prognostic information beyond standard clinical nomograms.",
    "audit_training": "XCiT-S12 (25.9M) / XCiT-M24 (83.9M), DINO, 48M selected prostate tiles",
    "audit_publication": "Peer-reviewed Journal of Pathology Informatics article, 2026, article 100715, DOI 10.1016/j.jpi.2026.100715"
  });
})();
