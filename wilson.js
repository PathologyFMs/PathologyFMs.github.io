// Supplemental catalog entry for WILSON.
// Loaded after data.js and inserted into the Vision-Language Foundation Models category.
(() => {
  const category = modelData.find(
    (section) => section.category === "Vision-Language Foundation Models"
  );

  const entryName = "WILSON";
  if (!category || category.models.some((model) => model.name === entryName)) {
    return;
  }

  category.models.push({
    "name": "WILSON",
    "year": 2026,
    "date": "2026-09-20",
    "data": "189,291 H&E WSIs; 1.76M composites; 5.28M image-caption pairs",
    "idea": "Patient- and slide-level vision-language foundation model that replaces conventional tile-and-aggregate WSI processing with fixed-size multi-magnification composite images. A compact ConvNeXt-based encoder jointly captures multi-scale morphology, supports multi-slide case representations, aligns composites with pathology-report text, and can generate diagnostic captions while remaining end-to-end fine-tunable.",
    "stains": "H&E",
    "github": "",
    "hf": "",
    "paper": "https://arxiv.org/abs/2609.25123",
    "bibtex": "@misc{alfasly2026wilsonpathologyfoundationmodel,\n  title={WILSON - a pathology foundation model framework for patient-level analysis and diagnostic text generation},\n  author={Saghir Alfasly and Wataru Uegami and Sobhan Hemati and Wenchao Han and Xiaojia Tang and Kevin Thompson and Daniel Stone and Ghazal Alabtah and Saba Yasir and Michael R. Lucas and Eric W. Klee and Cheryl L. Willman and Judy C. Boughey and Matthew P. Goetz and Krishna R. Kalari and H. R. Tizhoosh},\n  year={2026},\n  eprint={2609.25123},\n  archivePrefix={arXiv},\n  primaryClass={q-bio.QM},\n  url={https://arxiv.org/abs/2609.25123}\n}",
    "audit_objective": "DINOv3-initialized ConvNeXt self-supervision + DINO-style pathology SSL, followed by report-supervised vision-language alignment via SigLIP-style Gemini-embedding distillation, keyword regression or CLIP; CoCa-style multimodal decoder for free-text caption generation",
    "audit_wsis": "Mayo189K: 189,291 H&E permanent-section WSIs sampled from >10M archived WSIs; 178,088 WSIs have rendered multi-magnification composites and 178,020 have caption records",
    "audit_patches": "SSL stage 1: 224×224 tissue tiles; SSL stage 2: 512×512 four-tile composites from 2.5×/10×/20× views (~10M composite tiles); VLM stage: 2048×2048 WSI composites built as 8×8 grids of 256×256 regions",
    "audit_organs": "Abstract reports 42 organs and 829 diagnostic entities. The supplementary corpus-construction section states that 36 of 42 predefined organ categories remained after filtering and that the final Mayo189K corpus spans 838 organ-disease combinations.",
    "audit_downstream": "Case-level diagnostic retrieval; WSI-level disease classification and treatment-response retrieval; end-to-end TNBC histology and sTIL grading; image-to-text and text-to-image retrieval; pathology caption/report generation",
    "audit_cohorts": "Training: Mayo Clinic Mayo189K. Evaluation includes internal MayoBreast, MayoSkin, MayoCaseBreast, MayoCaseSkin, MayoBreastSubtype, MayoTNBC and MayoCaption plus external TCGA-BRCA/Brain/Kidney, CPTAC-BRCA, BCTherapy and HistAI cohorts",
    "audit_domain": "General-purpose patient-level and WSI-level pathology vision-language modeling from multi-magnification H&E composites and pathology reports",
    "audit_notes": "Shared vision encoder: ConvNeXtV3Extended = ConvNeXt-Base (87.57M) + three stride-2 extension blocks (46.15M), 133.7M parameters total. A 2048×2048 composite yields 64 spatial tokens of dimension 3072 and a 3072-D global slide embedding. The composite corpus contains 1,760,461 images; 1,759,787 captioned composites paired with three caption variants yield 5,279,361 realized image-caption pairs. The paper states that WILSON will be released upon publication subject to Mayo Clinic Ethics Office clearance; no official model checkpoint or project repository is provided in v1.",
    "paper_title": "WILSON - a pathology foundation model framework for patient-level analysis and diagnostic text generation",
    "paper_author": "Alfasly",
    "audit_image_text": "1,759,787 captioned composites × 3 report-derived caption variants = 5,279,361 image-caption pairs; frozen Gemini text embeddings are 3072-D",
    "audit_wsi_report": "178,020 WSIs have matching LLM-generated caption records; captions are derived from organ-specific pathology-report text using Gemini 2.5 Pro",
    "audit_benchmark": "Case-level retrieval against MOOZY; WSI-level retrieval against Prov-GigaPath, TITAN and PRISM; end-to-end MayoTNBC adaptation; bidirectional image-text retrieval; caption generation against PRISM and PRISM2; computational-efficiency comparison",
    "audit_result": "WILSON-distill averages macro-F1 0.52 versus 0.38 for MOOZY across four case-level benchmarks; mean image-text R@1 is 75.6% versus 58.1% for PRISM; end-to-end MayoTNBC tuning improves histologic-subtyping and sTIL macro-F1 by 0.156 and 0.106. The 133.7M-parameter encoder processes a WSI composite at ~2.58 TFLOPs, reported as 272–2,155× less compute than major slide-level baselines while remaining competitive on WSI retrieval."
  });
})();
