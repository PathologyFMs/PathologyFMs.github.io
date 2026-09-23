// Supplemental catalog entry for PLUTO-4.
// Loaded after data.js so PLUTO-4 appears as a distinct next-generation entry.
(() => {
  const tileCategory = modelData.find(
    (category) => category.category === "Tile-Level Vision Foundation Models"
  );

  if (!tileCategory || tileCategory.models.some((model) => model.name === "PLUTO-4")) {
    return;
  }

  const pluto4 = {
    "name": "PLUTO-4",
    "year": 2025,
    "date": "2025-11-11",
    "data": "551,164 WSIs; ~640M tiles",
    "idea": "Next-generation PLUTO family from PathAI, trained at frontier scale on a highly diverse multi-institutional pathology corpus. PLUTO-4S is a compact FlexiViT-S with dynamic patch-token sizes and 2D-RoPE for efficient multi-scale deployment, while PLUTO-4G is a 1.1B-parameter ViT-G/14 optimized for maximal representation capacity and stability. Both use a DINOv2-derived self-supervised objective with multi-resolution sampling.",
    "stains": "H&E + IHC + special stains",
    "github": "",
    "hf": "",
    "paper": "https://arxiv.org/abs/2511.02826",
    "bibtex": "@misc{padigela2025pluto4,\n  title={PLUTO-4: Frontier Pathology Foundation Models},\n  author={Harshith Padigela and Shima Nofallah and Atchuth Naveen Chilaparasetti and Ryun Han and Andrew Walker and Judy Shen and Chintan Shah and Blake Martin and Aashish Sood and Elliot Miller and Ben Glass and Andy Beck and Harsha Pokkalla and Syed Ashar Javed},\n  year={2025},\n  eprint={2511.02826},\n  archivePrefix={arXiv},\n  primaryClass={cs.CV},\n  url={https://arxiv.org/abs/2511.02826}\n}",
    "audit_objective": "DINOv2-derived self-supervised learning with multi-resolution image sampling; stabilized large-scale ViT training with bfloat16 mixed precision, large batches, gradient clipping and register tokens for PLUTO-4G",
    "audit_wsis": "551,164 de-identified WSIs from 137,144 patients across >50 institutions",
    "audit_patches": "~640M training tiles sampled from 165M usable-tissue regions across 0.25, 0.5, 1.0 and 2.0 µm/px",
    "audit_organs": ">40 tissue/organ categories; >60 disease entities",
    "audit_downstream": "11 benchmark datasets across four task categories: tile-level classification, nuclei segmentation, spatial transcriptomics prediction and slide-level prediction",
    "audit_cohorts": "Large proprietary multi-institutional PathAI corpus; >50 sources, >10 scanner models, 137,144 patients",
    "audit_domain": "General-purpose multi-organ, multi-stain pathology foundation models",
    "audit_notes": "Training corpus includes ~396K H&E WSIs plus IHC and special stains (>100 stain variants), with frozen and FFPE material. PLUTO-4S is ViT-S (22M parameters) using FlexiViT with patch-token sizes [8, 16, 32] and 2D-RoPE. PLUTO-4G is ViT-G/14 (1.1B parameters), trained with a single patch-token size of 14 and four register tokens. PLUTO-4G used an effective global batch size of 1024; PLUTO-4S used 1536. Training scaled across four 8×H200 nodes. No official PLUTO-4 GitHub repository or Hugging Face checkpoint is stated in the paper.",
    "paper_title": "PLUTO-4: Frontier Pathology Foundation Models",
    "paper_author": "Padigela",
    "variants": [
      {
        "name": "PLUTO-4S",
        "year": 2025,
        "paper": "https://arxiv.org/abs/2511.02826",
        "note": "ViT-S, 22M parameters; FlexiViT with dynamic patch-token sizes [8, 16, 32] and 2D-RoPE; compact, high-throughput multi-scale encoder."
      },
      {
        "name": "PLUTO-4G",
        "year": 2025,
        "paper": "https://arxiv.org/abs/2511.02826",
        "note": "ViT-G/14, 1.1B parameters; single patch-token size 14 with 4 register tokens; frontier-scale model with strongest benchmark performance."
      }
    ],
    "audit_benchmark": "HEST-1k; EVA tile benchmarks MHIST, BreakHIS, BACH, Gleason, PCAM and CRC; EVA nuclei segmentation on MoNuSAC and CoNSep; slide-level PANDA-Small and proprietary Derm-2K",
    "audit_result": "PLUTO-4G reports state-of-the-art or best-in-class performance on most evaluated benchmarks, including HEST mean Pearson r=0.427, MoNuSAC Dice=70.4, CoNSep Dice=65.0, and an 11% relative macro-F1 improvement on the Derm-2K dermatopathology benchmark over the prior PLUTO-3 series."
  };

  const plutoIndex = tileCategory.models.findIndex((model) => model.name === "PLUTO");
  if (plutoIndex >= 0) {
    tileCategory.models.splice(plutoIndex + 1, 0, pluto4);
  } else {
    tileCategory.models.push(pluto4);
  }
})();
