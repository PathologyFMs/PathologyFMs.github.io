# Pathology Foundation Models (PFMs)

A comprehensive, curated summary of state-of-the-art foundation models mapping the latent space of pathology. This repository contains the source code for an interactive web viewer of this taxonomy.

## 🔬 Tile-level Vision Encoders (Self-supervised)

| Model | Year | Pretraining Data | Key Idea | Resources |
|---|---|---|---|---|
| **CTransPath** | 2022 | 32K+ WSIs | SRCL with hybrid CNN-ViT | [Paper](https://www.sciencedirect.com/science/article/pii/S1361841522002043) • [Code](https://github.com/Xiyue-Wang/TransPath) |
| **REMEDIS** | 2023 | 29K+ WSIs | BiT + SimCLR Pretraining | [Paper](https://doi.org/10.1038/s41551-023-01049-7) |
| **Lunit** | 2023 | 36K+ WSI | Pathology-Specific SSL Pretraining | [Paper](https://arxiv.org/abs/2212.04690) • [Code](https://github.com/lunit-io/benchmark-ssl-pathology) • [Model](https://huggingface.co/1aurent/vit_small_patch8_224.lunit_dino) |
| **Phikon** | 2023 | 6,093 WSIs | iBOT Masked Image Pretraining | [Paper](https://www.medrxiv.org/content/10.1101/2023.07.21.23292757v2) • [Code](https://github.com/owkin/HistoSSLscaling/) • [Model](https://huggingface.co/owkin/phikon) |
| **PathoDuet** | 2024 | 11K WSIs | Cross-Scale Cross-Stain Pretraining | [Paper](https://www.sciencedirect.com/science/article/pii/S1361841524002147) • [Code](https://github.com/openmedlab/PathoDuet) |
| **RudolfV** | 2024 | 134K WSIs, 58 tissue types | Pathologist-curated data and expertise | [Paper](https://arxiv.org/abs/2401.04079) |
| **PLUTO** | 2024 | 195M tiles | Lightweight multi-scale representation | [Paper](https://arxiv.org/abs/2405.07905) |
| **UNI** | 2024 | 100M tiles, 100K WSIs | General-purpose DINOv2 on 100K WSIs | [Paper](https://doi.org/10.1038/s41591-024-02857-3) • [Code](https://github.com/mahmoodlab/UNI) |
| **Virchow** | 2024 | 1.5M WSIs, 100K patients | Clinical-grade pan-cancer detection | [Paper](https://doi.org/10.1038/s41591-024-03141-0) • [Model](https://huggingface.co/paige-ai/Virchow) |
| **Virchow2** | 2024 | 3.1M WSIs | 1.9B parameters, mixed magnification | [Paper](https://arxiv.org/abs/2408.00738) • [Model](https://huggingface.co/paige-ai/Virchow2) |
| **Hibou** | 2024 | 1M WSIs | Open-source DINOv2 architecture | [Paper](https://arxiv.org/abs/2406.05074) • [Code](https://github.com/histai/hibou) • [Model](https://huggingface.co/histai/hibou-L) |
| **Prov-GigaPath** | 2024 | 1.3B tiles, 171K WSIs | LongNet for ultra-large context | [Paper](https://www.nature.com/articles/s41586-024-07441-w) • [Code](https://github.com/prov-gigapath/prov-gigapath) • [Model](https://huggingface.co/prov-gigapath/prov-gigapath) |
| **BEPH** | 2024 | 11M tiles | BEiT-based masked image modeling | [Paper](https://www.nature.com/articles/s41467-025-57587-y) • [Code](https://github.com/Zhcyoung/BEPH) |
| **Atlas** | 2025 | 1.2M WSIs | Efficient RudolfV-based model | [Paper](https://arxiv.org/abs/2501.05409) |
| **Midnight** | 2025 | 12K / 92K WSIs | Data-efficient DINOv2 optimization | [Paper](https://arxiv.org/abs/2504.05186) • [Code](https://github.com/kaiko-ai/midnight) |
| **H-optimus-0** | 2025 | 500K WSIs | SSL Pretraining, FM Distillation | [Paper](https://arxiv.org/abs/2501.16239v1) • [Code](https://github.com/bioptimus/releases/tree/main/models/h-optimus/v0) • [Model](https://huggingface.co/bioptimus/H-optimus-0) |
| **PathOrchestra** | 2025 | 27K WSIs, 100 tasks | Evaluated on 112 clinical tasks | [Paper](https://arxiv.org/abs/2503.24345) • [Model](https://huggingface.co/AI4Pathology/PathOrchestra) |
| **GenBio-PathFM** | 2026 | 177K WSIs | JEDI (JEPA+DINO) dual-stage learning | [Paper](https://www.biorxiv.org/content/10.64898/2026.03.17.712534v1) • [Code](https://github.com/genbio-ai/genbio-pathfm) |
| **Phaet** | 2026 | --- | Robustness-tuned Phikon-v2 | [Paper](https://arxiv.org/abs/2607.22861) • [Model](https://huggingface.co/wearewaiv/phaet) |
| **Mascaret** | 2026 | --- | Robustness-tuned Midnight-12k | [Paper](https://arxiv.org/abs/2607.22861) • [Model](https://huggingface.co/wearewaiv/mascaret) |
| **Rudolfv2** | 2026 | 300K+ WSIs | Robust Multi-Scale SSL Pretraining | [Paper](https://cdn.prod.website-files.com/67adb01f31489469b513304a/6a74e2f9f1d4aef06489a3f1_RudolfV_2_260806.pdf) • [Model](https://huggingface.co/Aignostics/RudolfV-2) |
| **Atlas 2** | 2026 | 5.5M WSIs | 2B params, robust evaluation on 80 benchmarks | [Paper](https://arxiv.org/pdf/2601.05148) |
| **GRACE** | 2026 | 48K WSIs | Gastric-specific foundation model for Real-world Assessment and Clinical dEcision support | [Paper](https://arxiv.org/abs/2606.04792) |
| **KRONOS** | 2025 | 47M patches | Foundation model built for spatial proteomics via segmentation-free patch-level processing | [Paper](https://arxiv.org/abs/2506.03373) • [Code](https://github.com/mahmoodlab/KRONOS) • [Model](https://huggingface.co/MahmoodLab/KRONOS) |

---

## 🧬 Slide-level / Multimodal Foundation Models

| Model | Year | Pretraining Data | Key Idea | Resources |
|---|---|---|---|---|
| **Tangle** | 2024 | 8.6K paired | Transcriptomics-aligned slide representation | [Paper](https://arxiv.org/abs/2405.11618) • [Code](https://github.com/mahmoodlab/Tangle) |
| **PRISM** | 2024 | Virchow tiles + reports | Generative model via Virchow tiles | [Paper](https://arxiv.org/abs/2405.10254) • [Model](https://huggingface.co/paige-ai/Prism) |
| **CHIEF** | 2024 | 60K WSIs, 19 sites | Weakly supervised slide pattern recognition | [Paper](https://www.nature.com/articles/s41586-024-07894-z) • [Code](https://github.com/hms-dbmi/CHIEF) |
| **TITAN** | 2025 | 335K WSIs + reports | Whole-slide alignment with reports | [Paper](https://www.nature.com/articles/s41591-025-03982-3) • [Code](https://github.com/mahmoodlab/TITAN) • [Model](https://huggingface.co/MahmoodLab/TITAN) |
| **Threads** | 2025 | 47K paired | Multi-omics driven representation | [Paper](https://arxiv.org/html/2501.16652v1) |
| **mSTAR** | 2025 | 26K paired triplets | Slide, report, and RNA-seq integration | [Paper](https://www.nature.com/articles/s41467-025-66220-x) • [Code](https://github.com/Innse/mSTAR) • [Model](https://huggingface.co/Wangyh/mSTAR) |
| **CPath-Omni** | 2025 | 700k image-caption + WSI report | Unified Patch–Slide Multimodal Model | [Paper](https://arxiv.org/pdf/2412.12077) • [Code](https://github.com/PathFoundation/CPath-Omni) |
| **Feather** | 2025 | 3,499 WSIs | Transferable Pretrained MIL Models | [Paper](https://arxiv.org/abs/2506.09022) • [Code](https://github.com/mahmoodlab/MIL-Lab) • [Model](https://huggingface.co/collections/MahmoodLab/feather) |
| **Madeleine** | 2025 | 4,211 WSIs | Multistain Cross-Stain Slide Pretraining | [Paper](https://arxiv.org/pdf/2408.02859) • [Code](https://github.com/mahmoodlab/MADELEINE) • [Model](https://huggingface.co/MahmoodLab/madeleine) |
| **CARE** | 2026 | 34K WSIs | Molecular-Guided Adaptive Region Modeling | [Paper](https://arxiv.org/abs/2602.21637) • [Code](https://github.com/zdipath/CARE) • [Model](https://huggingface.co/Zipper-1/CARE) |
| **PRISM2** | 2026 | 2.3M WSIs | Clinical Dialogue Multimodal Pretraining | [Paper](https://arxiv.org/abs/2506.13063) • [Model](https://huggingface.co/paige-ai/Prism2) |
| **EXAONE Path 2.0** | 2025 | 37K WSIs | End-to-end hierarchical learning with direct slide-level supervision | [Paper](https://arxiv.org/pdf/2507.06639) |
| **MOOZY** | 2026 | 77K WSIs | Patient-first case-level aggregator via explicit inter-slide modeling | [Paper](https://arxiv.org/abs/2603.27048) • [Code](https://github.com/AtlasAnalyticsLab/MOOZY) |
| **GigaPath-Flash** | 2026 | Real-world Providence cohort | Efficient 43M ViT-S+LongNet whole-slide foundation model | [Paper](https://arxiv.org/abs/2607.18218) • [Model](https://huggingface.co/prov-gigapath/prov-gigapath-flash) |
| **GigaTIME-Flash** | 2026 | Real-world Providence cohort | Efficient spatial proteomics prediction from H&E | [Paper](https://arxiv.org/abs/2607.18218) • [Model](https://huggingface.co/prov-gigatime/gigatime-flash) |

---

## 👁️‍🗨️ Vision-Language Foundation Models

| Model | Year | Pretraining Data | Key Idea | Resources |
|---|---|---|---|---|
| **PLIP** | 2023 | 208K image-text pairs | Pretrained on medical Twitter | [Paper](https://doi.org/10.1038/s41591-023-02504-3) • [Code](https://github.com/pathologyfoundation/plip) • [Model](https://huggingface.co/vinid/plip) |
| **CONCH** | 2024 | 1.17M image-text pairs | CoCa-based task-agnostic pretraining | [Paper](https://doi.org/10.1038/s41591-024-02856-4) • [Code](https://github.com/mahmoodlab/CONCH) • [Model](https://huggingface.co/MahmoodLab/CONCH) |
| **MUSK** | 2025 | 50M images + 1B text tokens | Unified masked modeling | [Paper](https://www.nature.com/articles/s41586-024-08378-w) • [Code](https://github.com/lilab-stanford/MUSK) |
| **KEEP** | 2026 | 143K knowledge-grouped pairs | Disease knowledge graph integration | [Paper](https://arxiv.org/abs/2412.13126) • [Code](https://github.com/MAGIC-AI4Med/KEEP) • [Model](https://huggingface.co/Astaxanthin/KEEP) |
| **VISTA-PATH** | 2026 | 1.65M triplets | Interactive Class-Aware Segmentation | [Paper](https://arxiv.org/abs/2601.16451) • [Code](https://github.com/zhihuanglab/VISTA-PATH) |

---

## 🎨 Generative Foundation Models

| Model | Year | Pretraining Data | Key Idea | Resources |
|---|---|---|---|---|
| **MuPD** | 2026 | 100M patches | Multimodal Pathology Diffusion Model | [Paper](https://arxiv.org/abs/2604.03635) • [Code](https://github.com/lilab-stanford/MUPAD) • [Model](https://huggingface.co/collections/xiangjx/mupad-multimodal-pathology-diffusion-model) |

## ⚗️ Foundation Model Distillation/Fusion/Ensemble

| Model | Year | Pretraining Data | Key Idea | Resources |
|---|---|---|---|---|
| **GPFM** | 2025 | 190M tiles, 96K WSIs | Unified knowledge distillation | [Paper](https://arxiv.org/abs/2407.18449) • [Code](https://github.com/birkhoffkiki/GPFM/) |
| **ALICE** | 2026 | 24.9M tiles + 155K high-res images | Agglomerative distillation from 8 teachers | [Paper](https://arxiv.org/pdf/2607.09526) • [Code](https://github.com/WonderLandxD/ALICE) |
| **Shazam** | 2026 | Fuses 5 models (UNI 2, Virchow2, H-optimus-1, Prov-Gigapath, Phikon-v2) | Online integration and distillation of multiple PFMs via adaptive expert weighting | [Paper](https://arxiv.org/abs/2503.00736) |
| **ELF** | 2025 | 53K WSIs (20 anatomical sites) | Ensemble learning of 5 foundation models to generate unified slide-level representations | [Paper](https://arxiv.org/abs/2508.16085) • [Code](https://github.com/lilab-stanford/ELF) |
| **ASTRA** | 2026 | 10.3K WSIs (CHTN cohort) | Integrates heterogeneous foundation-model representations via sparse mixture-of-experts and contrastive alignment | [Paper](https://arxiv.org/abs/2604.22846) |


## 📊 Foundation Model Benchmarking

| Name | Year | Scope | Key Contribution | Resources |
|---|---|---|---|---|
| **EVA** | 2024 | Slide & Patch | Standardized framework for systematic evaluation and comparison of PFMs | [Paper](https://openreview.net/forum?id=FNBQOPj18N) • [Code](https://github.com/kaiko-ai/eva) |
| **Patho-Bench** | 2025 | Slide | Open-source benchmarking toolkit with standardized datasets and reproducible evaluation pipelines | [Paper](https://arxiv.org/pdf/2502.06750) • [Code](https://github.com/mahmoodlab/Patho-Bench) |
| **QuIIL-PathBench** | 2025 | Patch | Systematically benchmarks PFMs by evaluating patch-level representations | [Paper](https://arxiv.org/abs/2410.16038) • [Code](https://github.com/QuIIL/BenchmarkingPathologyFoundationModels) |
| **Clinical Benchmark** | 2025 | Slide | Clinical benchmark with MSHS and MSKCC datasets covering disease detection and biomarker prediction | [Paper](https://www.nature.com/articles/s41467-025-58796-1.pdf) • [Code](https://github.com/sinai-computational-pathology/SSL_tile_benchmarks#automated-external-benchmarking) |
| **PathBench** | 2025 | Slide & Patch | Leakage-free multi-center clinical benchmark spanning multiple tasks, with a live public leaderboard | [Paper](https://arxiv.org/abs/2505.20202) • [Code](https://github.com/birkhoffkiki/PathBench) • [Website](https://birkhoffkiki.github.io/PathBench/) |
| **Standford PathBench** | 2026 | Slide & Patch | Comprehensive benchmark of 32 PFMs across 41 tasks with a public leaderboard | [Paper](https://www.nature.com/articles/s41467-026-76004-6) |

---

## 📝 Citation

If you find this repository useful in your research, please consider citing it using the following BibTeX:

```bibtex
@misc{pfms2026,
  author = {Chanda, Dibaloke},
  title = {Pathology Foundation Models (PFMs)},
  year = {2026},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{https://github.com/dibalokechanda/PFMs}}
}
```
