// Supplemental catalog entry for the 2026 Scientific Reports FM-selection benchmark.
// Loaded after data.js and inserted into the General Benchmarking & Leaderboards category.
(() => {
  const category = modelData.find(
    (section) => section.category === "General Benchmarking & Leaderboards"
  );

  const entryName = "FM Selection Benchmark";
  if (!category || category.models.some((model) => model.name === entryName)) {
    return;
  }

  category.models.push({
    "name": entryName,
    "year": 2026,
    "date": "2026-08-29",
    "data": "6 FMs; 6 downstream tasks across WSI, survival, and ROI evaluation",
    "idea": "Practical model-selection benchmark comparing six pathology foundation models across predictive performance, statistical uncertainty, low-data stability, embedding-extraction efficiency, and deployment cost. The study explicitly tests whether larger model tiers consistently outperform smaller models and includes a within-family Kaiko-Base vs Kaiko-Midnight comparison.",
    "stains": "Primarily H&E",
    "github": "",
    "hf": "",
    "paper": "https://doi.org/10.1038/s41598-026-69731-9",
    "bibtex": "@article{maleki2026navigating,\n  author={Danial Maleki and Nazim Shaikh and Xiao Li and Yao Nie and Raghavan Venugopal and Uday Kurkure},\n  title={Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis},\n  journal={Scientific Reports},\n  year={2026},\n  doi={10.1038/s41598-026-69731-9}\n}",
    "audit_objective": "Benchmark task-specific accuracy, survival performance, data efficiency, stability, and deployment efficiency across pathology foundation-model tiers",
    "audit_wsis": "Downstream WSI cohorts: Camelyon16 (398 WSIs), proprietary NSCLC subtype cohort (608 WSIs), and proprietary NSCLC survival cohort (286 WSIs); ROI benchmarks use BACH (400 ROIs), UNITOPATHO (9,536 ROIs), and TCGA-UT (271,710 ROIs)",
    "audit_patches": "Frozen FM patch embeddings; WSI pipelines use 224×224 model inputs after task-specific tissue patch extraction. ROI datasets are resized/cropped to 224×224 for feature extraction.",
    "audit_organs": "Breast, lung, colorectal, and pan-cancer",
    "audit_downstream": "6 tasks: Camelyon16 lymph-node metastasis detection; NSCLC LUAD/LUSC classification; NSCLC overall-survival prediction; BACH breast histology classification; UNITOPATHO colorectal-polyp classification; TCGA-UT pan-cancer tissue classification",
    "audit_cohorts": "Public: Camelyon16, BACH, UNITOPATHO, TCGA-UT. Proprietary: 608-WSI NSCLC subtype cohort and 286-WSI NSCLC survival cohort",
    "audit_domain": "General pathology foundation-model benchmarking and practical model selection across performance, data regime, and deployment cost",
    "audit_notes": "Evaluates Lunit, Kaiko-Base, Phikon-v2, UNI2, Virchow2, and Kaiko-Midnight. WSI tasks use frozen FM features with a standardized AMIL downstream model; ROI tasks use L2-regularized logistic-regression linear probing. Training-data fraction ablations use 10%, 25%, 50%, 75%, and 100% of training data with 50 random seeds per fraction. Embedding-extraction throughput is benchmarked on an NVIDIA L40S GPU using 224×224 UNITOPATHO tiles. The paper is an Article in Press in Scientific Reports; 29 August 2026 is the acceptance date and is used here for ordering because the provided article does not state a later final publication date. No official code repository is stated in the paper.",
    "paper_title": "Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis",
    "paper_author": "Maleki",
    "audit_benchmark": "Six FMs spanning ~22M to 1.1B parameters; WSI classification and survival with AMIL, ROI classification with linear probing, 50-seed low-data ablations, paired statistical testing, and standardized L40S throughput/memory benchmarking",
    "audit_result": "Performance is strongly task-specific rather than monotonic with model scale. Virchow2 has the highest observed Camelyon16 AUROC (100.0); Phikon-v2 leads NSCLC subtype AUROC (98.7) without significant superiority over UNI2; Lunit has the highest observed NSCLC survival mean C-index (70.6±8.3); Kaiko-Midnight leads UNITOPATHO (85.6 AUROC, significantly above Lunit) and TCGA-UT (99.2 AUROC, not significantly above UNI2). Lunit reaches 2120.3 tiles/s versus 43.9 tiles/s for Kaiko-Midnight on the L40S benchmark, making Midnight ~48.3× slower under the tested maximum-batch setup."
  });
})();
