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
    "year": 2025,
    "date": "2025-09-19",
    "data": "111 OICR WSIs + 559 UHN TMA cores; 6,993 co-registered tissue-patch pairs",
    "idea": "Fairness and robustness study of histopathology foundation models under scanner-induced covariate shift. Identical tissue regions scanned on Aperio and Sakura VisionTek devices are spatially co-registered and passed through frozen models; representation shift is quantified using MSE, KL divergence and the Calinski-Harabasz (CH) index.",
    "stains": "H&E",
    "github": "",
    "hf": "",
    "paper": "https://doi.org/10.1007/978-3-032-05870-6_4",
    "bibtex": "@inproceedings{shafique2026fairfoundationmodels,\n  author={Abubakr Shafique and Amanda Dy and Xiaoli Qin and Najd Alshamlan and Susan J. Done and Dimitrios Androutsos and April Khademi},\n  title={How Fair are Foundation Models? Exploring the Role of Covariate Bias in Histopathology},\n  booktitle={Fairness of AI in Medical Imaging},\n  series={Lecture Notes in Computer Science},\n  volume={15976},\n  pages={32--42},\n  publisher={Springer},\n  address={Cham},\n  year={2026},\n  doi={10.1007/978-3-032-05870-6_4}\n}",
    "audit_objective": "Measure scanner-induced representation shift / covariate bias in frozen histopathology models using paired, spatially co-registered tissue regions",
    "audit_wsis": "Evaluation data: 111 OICR FFPE breast-cancer WSIs + 559 UHN breast-cancer TMA cores, each digitized on two scanner platforms",
    "audit_patches": "4,952 paired OICR regions + 2,041 paired UHN regions = 6,993 co-registered tissue-patch pairs (13,986 patch images total), extracted at 512×512 and 0.5 µm/px",
    "audit_organs": "Breast",
    "audit_downstream": "Fairness / robustness analysis of 9 pathology representation models under scanner covariate shift",
    "audit_cohorts": "OICR and UHN; Aperio AT2/ScanScope versus Sakura VisionTek",
    "audit_domain": "Scanner-induced covariate bias, representation robustness and fairness in histopathology foundation models",
    "audit_notes": "Evaluates nine models spanning 7M to 1.135B parameters: KimiaNet, PathDino, HIPT, iBOT-Path, Hibou-B, UNI, Virchow, Virchow2 and GigaPath. OICR slides were scanned with Aperio AT2 (40×, 0.25 µm/px) and Sakura VisionTek (20×, 0.27 µm/px); UHN TMA cores used Aperio ScanScope and VisionTek. Images were aligned and normalized to matched resolution before extracting paired tissue regions. Springer lists the paper as first online on 19 September 2025, while the formal LNCS citation is ©2026.",
    "paper_title": "How Fair are Foundation Models? Exploring the Role of Covariate Bias in Histopathology",
    "paper_author": "Shafique",
    "audit_benchmark": "Representation shift measured with normalized-feature MSE, PCA-based KL divergence and Calinski-Harabasz clustering index, plus t-SNE visualization, across OICR and UHN paired-scanner data",
    "audit_result": "No model is uniformly scanner-invariant across all metrics. HIPT has the lowest MSE and KL divergence across both datasets; GigaPath has the lowest CH index on OICR and Virchow2 on UHN. Model scale alone does not determine robustness: smaller models can match or outperform much larger models under acquisition shift."
  });
})();
