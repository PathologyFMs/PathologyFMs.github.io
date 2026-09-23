// Supplemental catalog entry for scanner-induced covariate bias / fairness analysis.
// Loaded after data.js and inserted into the Robustness and Generalization category.
(() => {
  const category = modelData.find(
    (section) => section.category === "Robustness and Generalization"
  );

  const entryName = "How Fair are Foundation Models?";
  if (!category || category.models.some((model) => model.name === entryName)) {
    return;
  }

  category.models.push({
    "name": entryName,
    "year": 2026,
    "date": "2025-09-19",
    "data": "111 OICR WSIs + 559 UHN TMA cores; 6,993 paired tissue regions",
    "idea": "Fairness and robustness analysis of histopathology foundation models under scanner-induced covariate shift. Identical H&E tissue regions scanned on Aperio and Sakura VisionTek devices are spatially co-registered and passed through frozen models; scanner-driven representation shift is quantified with MSE, KL divergence and the Calinski-Harabasz (CH) index.",
    "stains": "H&E",
    "github": "",
    "hf": "",
    "paper": "https://doi.org/10.1007/978-3-032-05870-6_4",
    "bibtex": "@inproceedings{shafique2026fairfoundationmodels,\n  author={Abubakr Shafique and Amanda Dy and Xiaoli Qin and Najd Alshamlan and Susan J. Done and Dimitrios Androutsos and April Khademi},\n  title={How Fair are Foundation Models? Exploring the Role of Covariate Bias in Histopathology},\n  booktitle={Fairness of AI in Medical Imaging},\n  series={Lecture Notes in Computer Science},\n  volume={15976},\n  pages={32--42},\n  publisher={Springer Nature Switzerland},\n  year={2026},\n  doi={10.1007/978-3-032-05870-6_4}\n}",
    "audit_objective": "Quantify scanner-induced covariate bias as representation shift in zero-shot frozen-model embeddings from biologically identical, spatially co-registered tissue regions",
    "audit_wsis": "111 FFPE OICR breast-cancer glass slides plus 559 UHN breast-cancer TMA cores, each imaged on two scanner platforms",
    "audit_patches": "4,952 paired OICR tissue regions + 2,041 paired UHN tissue regions = 6,993 co-registered pairs (13,986 patch images total); 512×512 at 0.5 µm/px",
    "audit_organs": "Breast",
    "audit_downstream": "Scanner-bias / fairness evaluation of 9 pathology representation models: KimiaNet, PathDino, HIPT, iBOT-Path, Hibou-B, UNI, Virchow, Virchow2 and GigaPath",
    "audit_cohorts": "OICR and UHN; Aperio AT2 or ScanScope versus Sakura VisionTek",
    "audit_domain": "Scanner-induced covariate bias, representation robustness, domain generalization and fairness in histopathology foundation models",
    "audit_notes": "Formal publication: FAIMI 2025 proceedings, LNCS 15976, pp. 32–42, ©2026. OICR slides were scanned using Aperio AT2 at 40×/0.25 µm/px and Sakura VisionTek at 20×/0.27 µm/px; UHN TMA cores used Aperio ScanScope at 40×/0.25 µm/px and VisionTek at 20×/0.27 µm/px. VisionTek images were upsampled for alignment, then co-registered 512×512 patches were extracted at 0.5 µm/px. Embeddings are z-score normalized for MSE/CH; PCA to 384 dimensions is used before KL-divergence computation.",
    "paper_title": "How Fair are Foundation Models? Exploring the Role of Covariate Bias in Histopathology",
    "paper_author": "Shafique",
    "audit_benchmark": "MSE and KL divergence between paired scanner embeddings, Calinski-Harabasz scanner-clustering index, cross-dataset metric differences and t-SNE visualization on OICR and UHN",
    "audit_result": "No single model is uniformly scanner-invariant. HIPT yields the lowest MSE and KL divergence across both datasets, but not the lowest CH index; GigaPath has the lowest CH on OICR and Virchow2 on UHN. The study concludes that model size or pretraining scale alone does not determine scanner robustness."
  });
})();
