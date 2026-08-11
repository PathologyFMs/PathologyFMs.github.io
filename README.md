# Pathology Foundation Models (PFMs)

A comprehensive, curated summary of state-of-the-art foundation models mapping the latent space of pathology. This repository contains the source code for an interactive web viewer of this taxonomy.

## 🔬 Tile-Level Vision Foundation Models

| Model | Year | Pretraining Data | Key Idea | Resources |
|---|---|---|---|---|
| **BRAVE** | 2026 | 57,271 WSIs | Breast-adaptive pathology foundation model | [Paper](https://arxiv.org/abs/2605.08207) |
| **CTransPath** | 2022 | 32K+ WSIs | SRCL with hybrid CNN-ViT | [Paper](https://www.sciencedirect.com/science/article/pii/S1361841522002043) • [Code](https://github.com/Xiyue-Wang/TransPath) • [Model](https://drive.google.com/file/d/1DoDx_70_TLj98gTf6YTXnu4tFhsFocDX/view) |
| **REMEDIS** | 2023 | 29K+ WSIs | BiT + SimCLR Pretraining | [Paper](https://doi.org/10.1038/s41551-023-01049-7) |
| **Lunit** | 2023 | 36K+ WSI | Pathology-Specific SSL Pretraining | [Paper](https://arxiv.org/abs/2212.04690) • [Code](https://github.com/lunit-io/benchmark-ssl-pathology) • [Model](https://huggingface.co/1aurent/vit_small_patch8_224.lunit_dino) |
| **Phikon** | 2023 | 6,093 WSIs | iBOT Masked Image Pretraining | [Paper](https://www.medrxiv.org/content/10.1101/2023.07.21.23292757v2) • [Code](https://github.com/owkin/HistoSSLscaling/) • [Model](https://huggingface.co/owkin/phikon) • [Phikon-v2](https://huggingface.co/owkin/phikon-v2) |
| **PathoDuet** | 2024 | 11K WSIs | Cross-Scale Cross-Stain Pretraining | [Paper](https://www.sciencedirect.com/science/article/pii/S1361841524002147) • [Code](https://github.com/openmedlab/PathoDuet) |
| **RudolfV** | 2024 | 134K WSIs, 58 tissue types | Pathologist-curated data and expertise | [Paper](https://arxiv.org/abs/2401.04079) |
| **PLUTO** | 2024 | 195M tiles | Lightweight multi-scale representation | [Paper](https://arxiv.org/abs/2405.07905) |
| **UNI** | 2024 | 100M tiles, 100K WSIs | General-purpose DINOv2 on 100K WSIs | [Paper](https://doi.org/10.1038/s41591-024-02857-3) • [Code](https://github.com/mahmoodlab/UNI) • [Model](https://huggingface.co/MahmoodLab/UNI) • [UNI2-h](https://huggingface.co/MahmoodLab/UNI2-h) |
| **Virchow** | 2024 | 1.5M WSIs, 100K patients | Clinical-grade pan-cancer detection | [Paper](https://doi.org/10.1038/s41591-024-03141-0) • [Model](https://huggingface.co/paige-ai/Virchow) |
| **Virchow2** | 2024 | 3.1M WSIs | 1.9B parameters, mixed magnification | [Paper](https://arxiv.org/abs/2408.00738) • [Model](https://huggingface.co/paige-ai/Virchow2) |
| **Hibou** | 2024 | 1M WSIs | Open-source DINOv2 architecture | [Paper](https://arxiv.org/abs/2406.05074) • [Code](https://github.com/histai/hibou) • [Model](https://huggingface.co/histai/hibou-L) • [Hibou-B](https://huggingface.co/histai/hibou-b) |
| **BEPH** | 2024 | 11M tiles | BEiT-based masked image modeling | [Paper](https://www.nature.com/articles/s41467-025-57587-y) • [Code](https://github.com/Zhcyoung/BEPH) • [Model](https://drive.google.com/file/d/19Fu3dw3G4i2gPXijzrxfaQ2D_xcqNdNz/view) |
| **Atlas** | 2025 | 1.2M WSIs (Mayo + Charité) | Efficient RudolfV-based model | [Paper](https://arxiv.org/abs/2501.05409) |
| **Midnight** | 2025 | 12K / 92K WSIs | Data-efficient DINOv2 optimization | [Paper](https://arxiv.org/abs/2504.05186) • [Code](https://github.com/kaiko-ai/midnight) |
| **H-optimus-0** | 2025 | 500K WSIs | SSL Pretraining, FM Distillation | [Paper](https://arxiv.org/abs/2501.16239v1) • [Code](https://github.com/bioptimus/releases/tree/main/models/h-optimus/v0) • [Model](https://huggingface.co/bioptimus/H-optimus-0) • [H-optimus-1](https://huggingface.co/bioptimus/H-optimus-1) |
| **PathOrchestra** | 2025 | 27K WSIs, 100 tasks | Evaluated on 112 clinical tasks | [Paper](https://arxiv.org/abs/2503.24345) • [Model](https://huggingface.co/AI4Pathology/PathOrchestra) |
| **GenBio-PathFM** | 2026 | 177K WSIs | JEDI (JEPA+DINO) dual-stage learning | [Paper](https://www.biorxiv.org/content/10.64898/2026.03.17.712534v1) • [Code](https://github.com/genbio-ai/genbio-pathfm) • [Model](https://huggingface.co/genbio-ai/genbio-pathfm) |
| **RudolfV2** | 2026 | 300K+ WSIs | Robust Multi-Scale SSL Pretraining | [Paper](https://cdn.prod.website-files.com/67adb01f31489469b513304a/6a74e2f9f1d4aef06489a3f1_RudolfV_2_260806.pdf) • [Model](https://huggingface.co/Aignostics/RudolfV-2) |
| **Atlas 2** | 2026 | 5.5M WSIs | 2B params, robust evaluation on 80 benchmarks | [Paper](https://arxiv.org/pdf/2601.05148) |
| **GRACE** | 2026 | 48K WSIs | Gastric-specific foundation model | [Paper](https://arxiv.org/abs/2606.04792) |

---

## 🧬 Slide-Level & Patient-Level Foundation Models

| Model | Year | Pretraining Data | Key Idea | Resources |
|---|---|---|---|---|
| **Prov-GigaPath** | 2024 | 1.3B tiles, 171K WSIs | LongNet for ultra-large context | [Paper](https://www.nature.com/articles/s41586-024-07441-w) • [Code](https://github.com/prov-gigapath/prov-gigapath) • [Model](https://huggingface.co/prov-gigapath/prov-gigapath) |
| **CHIEF** | 2024 | 60K WSIs, 19 sites | Weakly supervised slide pattern recognition | [Paper](https://www.nature.com/articles/s41586-024-07894-z) • [Code](https://github.com/hms-dbmi/CHIEF) |
| **Feather** | 2025 | 3,499 WSIs | Transferable Pretrained MIL Models | [Paper](https://arxiv.org/abs/2506.09022) • [Code](https://github.com/mahmoodlab/MIL-Lab) • [Model](https://huggingface.co/collections/MahmoodLab/feather) |
| **EXAONE Path 2.0** | 2025 | 37K WSIs | End-to-end hierarchical learning | [Paper](https://arxiv.org/pdf/2507.06639) |
| **MOOZY** | 2026 | 77K WSIs | Patient-first case-level aggregator | [Paper](https://arxiv.org/abs/2603.27048) • [Code](https://github.com/AtlasAnalyticsLab/MOOZY) |
| **GigaPath-Flash** | 2026 | Real-world Providence cohort | Efficient 43M ViT-S+LongNet whole-slide foundation model | [Paper](https://arxiv.org/abs/2607.18218) • [Model](https://huggingface.co/prov-gigapath/prov-gigapath-flash) |

---

## 👁️‍🗨️ Vision-Language Foundation Models

| Model | Year | Pretraining Data | Key Idea | Resources |
|---|---|---|---|---|
| **PLIP** | 2023 | 208K image-text pairs | Pretrained on medical Twitter | [Paper](https://doi.org/10.1038/s41591-023-02504-3) • [Code](https://github.com/pathologyfoundation/plip) • [Model](https://huggingface.co/vinid/plip) |
| **CONCH** | 2024 | 1.17M image-text pairs | CoCa-based task-agnostic pretraining | [Paper](https://doi.org/10.1038/s41591-024-02856-4) • [Code](https://github.com/mahmoodlab/CONCH) • [Model](https://huggingface.co/MahmoodLab/CONCH) • [CONCH v1.5](https://huggingface.co/MahmoodLab/conchv1_5) |
| **PRISM** | 2024 | Virchow tiles + reports | Generative model via Virchow tiles | [Paper](https://arxiv.org/abs/2405.10254) • [Model](https://huggingface.co/paige-ai/Prism) |
| **MUSK** | 2025 | 50M images + 1B text tokens | Unified masked modeling | [Paper](https://www.nature.com/articles/s41586-024-08378-w) • [Code](https://github.com/lilab-stanford/MUSK) |
| **TITAN** | 2025 | 335K WSIs + reports | Whole-slide alignment with reports | [Paper](https://www.nature.com/articles/s41591-025-03982-3) • [Code](https://github.com/mahmoodlab/TITAN) • [Model](https://huggingface.co/MahmoodLab/TITAN) |
| **CPath-Omni** | 2025 | 700k image-caption + WSI report | Unified Patch–Slide Multimodal Model | [Paper](https://arxiv.org/pdf/2412.12077) • [Code](https://github.com/PathFoundation/CPath-Omni) |
| **KEEP** | 2026 | 143K knowledge-grouped pairs | Disease knowledge graph integration | [Paper](https://arxiv.org/abs/2412.13126) • [Code](https://github.com/MAGIC-AI4Med/KEEP) • [Model](https://huggingface.co/Astaxanthin/KEEP) |
| **PRISM2** | 2026 | 2.3M WSIs | Clinical Dialogue Multimodal Pretraining | [Paper](https://arxiv.org/abs/2506.13063) • [Model](https://huggingface.co/paige-ai/Prism2) |

---

## 🧪 Multimodal & Molecular Foundation Models

| Model | Year | Pretraining Data | Key Idea | Resources |
|---|---|---|---|---|
| **Tangle** | 2024 | 8.6K paired (slide + RNA-seq) | Transcriptomics-aligned slide representation | [Paper](https://arxiv.org/abs/2405.11618) • [Code](https://github.com/mahmoodlab/Tangle) |
| **Madeleine** | 2025 | 4,211 WSIs (Paired Multi-Stain) | Multistain Cross-Stain Slide Pretraining | [Paper](https://arxiv.org/pdf/2408.02859) • [Code](https://github.com/mahmoodlab/MADELEINE) • [Model](https://huggingface.co/MahmoodLab/madeleine) |
| **Threads** | 2025 | 47K paired (H&E + multi-omics) | Multi-omics driven representation | [Paper](https://arxiv.org/html/2501.16652v1) |
| **mSTAR** | 2025 | 26K paired triplets | Slide, report, and RNA-seq integration | [Paper](https://www.nature.com/articles/s41467-025-66220-x) • [Code](https://github.com/Innse/mSTAR) • [Model](https://huggingface.co/Wangyh/mSTAR) |
| **KRONOS** | 2025 | 47M patches | Foundation model built for spatial proteomics via segmentation-free patch-level processing | [Paper](https://arxiv.org/abs/2506.03373) • [Code](https://github.com/mahmoodlab/KRONOS) • [Model](https://huggingface.co/MahmoodLab/KRONOS) |
| **EXAONE Path 2.5** | 2025 | 37K WSIs | End-to-end hierarchical learning with direct slide-level supervision | [Paper](https://arxiv.org/abs/2512.14019) • [Model](https://huggingface.co/LGAI-EXAONE/EXAONE-Path-2.5) |
| **CARE** | 2026 | 34K WSIs | Molecular-Guided Adaptive Region Modeling | [Paper](https://arxiv.org/abs/2602.21637) • [Code](https://github.com/zdipath/CARE) • [Model](https://huggingface.co/Zipper-1/CARE) |
| **KRONOS2** | 2026 | SPM56M patches; 268 markers | Marker-aware DINOv2 successor to KRONOS (268 markers) | [Paper](https://arxiv.org/abs/2506.03373) • [Model](https://huggingface.co/MahmoodLab/KRONOS2) |
| **GigaTIME-Flash** | 2026 | Real-world Providence cohort | Efficient spatial proteomics prediction from H&E | [Paper](https://arxiv.org/abs/2607.18218) • [Model](https://huggingface.co/prov-gigatime/gigatime-flash) |

---

## 🧩 Foundation Model Adaptation & Distillation

| Model | Year | Pretraining Data | Key Idea | Resources |
|---|---|---|---|---|
| **H0-mini** | 2025 | 43 million tiles, 6,093 WSIs | Lightweight foundation model distilled from H-optimus-0 with DINOv2 | [Paper](https://arxiv.org/abs/2501.16239) • [Model](https://huggingface.co/bioptimus/H0-mini) |
| **SEAL** | 2026 | --- | --- | [Paper](https://arxiv.org/abs/2602.14177) • [Code](https://github.com/mahmoodlab/SEAL/) • [Model](https://huggingface.co/MahmoodLab/SEAL) |
| **Phaet** | 2026 | --- | Robustness-tuned Phikon-v2 | [Paper](https://arxiv.org/abs/2607.22861) • [Model](https://huggingface.co/wearewaiv/phaet) |
| **Mascaret** | 2026 | --- | Robustness-tuned Midnight-12k | [Paper](https://arxiv.org/abs/2607.22861) • [Model](https://huggingface.co/wearewaiv/mascaret) |
| **SmartStu** | 2026 | Breast (distilled) | Adversarial distillation of multiple teacher PFMs into a compact, debiased breast-cancer-specific student; mitigates site-specific and prevalence confounding | [Paper](https://arxiv.org/abs/2608.01356) |

---

## ⚗️ Multi-FM Integration & Distillation

| Model | Year | Pretraining Data | Key Idea | Resources |
|---|---|---|---|---|
| **GPFM** | 2025 | 190M tiles, 96K WSIs | Multi-teacher distillation | [Paper](https://arxiv.org/abs/2407.18449) • [Code](https://github.com/birkhoffkiki/GPFM/) |
| **COBRA** | 2025 | 3048 WSIs | Multi-FM representation integration | [Paper](https://arxiv.org/abs/2411.13623) • [Code](https://github.com/KatherLab/COBRA) • [Model](https://huggingface.co/KatherLab/COBRA) |
| **ELF** | 2025 | 53K WSIs (20 anatomical sites) | Ensemble learning | [Paper](https://arxiv.org/abs/2508.16085) • [Code](https://github.com/lilab-stanford/ELF) |
| **Shazam** | 2026 | Fuses 5 models (UNI 2, Virchow2, H-optimus-1, Prov-Gigapath, Phikon-v2) | Adaptive integration/distillation | [Paper](https://arxiv.org/abs/2503.00736) |
| **ALICE** | 2026 | 24.9M tiles + 155K high-res images | Agglomerative distillation | [Paper](https://arxiv.org/pdf/2607.09526) • [Code](https://github.com/WonderLandxD/ALICE) |
| **ASTRA** | 2026 | 10.3K WSIs (CHTN cohort) | MoE fusion/alignment | [Paper](https://arxiv.org/abs/2604.22846) |

---

## 🎯 Segmentation & Interactive Foundation Models

| Model | Year | Pretraining Data | Key Idea | Resources |
|---|---|---|---|---|
| **VISTA-PATH** | 2026 | 1.65M triplets (Image + Mask + Text) | Interactive Class-Aware Segmentation | [Paper](https://arxiv.org/abs/2601.16451) • [Code](https://github.com/zhihuanglab/VISTA-PATH) |

---

## 🎨 Generative Foundation Models

| Model | Year | Pretraining Data | Key Idea | Resources |
|---|---|---|---|---|
| **MuPD** | 2026 | 100M patches | Multimodal Pathology Diffusion Model | [Paper](https://arxiv.org/abs/2604.03635) • [Code](https://github.com/lilab-stanford/MUPAD) • [Model](https://huggingface.co/collections/xiangjx/mupad-multimodal-pathology-diffusion-model) |

---

## 📊 Foundation Model Benchmarking

| Name | Year | Scope | Key Contribution | Resources |
|---|---|---|---|---|
| **EVA** | 2024 | Slide & Patch | Standardized framework for systematic evaluation and comparison of PFMs | [Paper](https://openreview.net/forum?id=FNBQOPj18N) • [Code](https://github.com/kaiko-ai/eva) |
| **Patho-Bench** | 2025 | Slide | Open-source benchmarking toolkit with standardized datasets and reproducible evaluation pipelines | [Paper](https://arxiv.org/pdf/2502.06750) • [Code](https://github.com/mahmoodlab/Patho-Bench) |
| **QuIIL-PathBench** | 2025 | Patch | Systematically benchmarks PFMs by evaluating patch-level representations | [Paper](https://arxiv.org/abs/2410.16038) • [Code](https://github.com/QuIIL/BenchmarkingPathologyFoundationModels) |
| **Clinical Benchmark** | 2025 | Slide | Clinical benchmark with MSHS and MSKCC datasets covering disease detection and biomarker prediction | [Paper](https://www.nature.com/articles/s41467-025-58796-1.pdf) • [Code](https://github.com/sinai-computational-pathology/SSL_tile_benchmarks#automated-external-benchmarking) |
| **Feature-Extractor Benchmark** | 2025 | Slide | Benchmarks 19 FMs as feature extractors for weakly-supervised slide tasks; CONCH best, CONCH+Virchow2 ensemble tops 55% of tasks | [Paper](https://www.nature.com/articles/s41551-025-01516-3) • [Code](https://github.com/KatherLab/STAMP) • [Website](https://zenodo.org/records/15749283) |
| **PathBench** | 2025 | Slide & Patch | Leakage-free multi-center clinical benchmark spanning multiple tasks, with a live public leaderboard | [Paper](https://arxiv.org/abs/2505.20202) • [Code](https://github.com/birkhoffkiki/PathBench) • [Website](https://birkhoffkiki.github.io/PathBench/) |
| **Stanford PathBench** | 2026 | Slide & Patch | Comprehensive benchmark of 32 PFMs across 41 tasks with a public leaderboard | [Paper](https://www.nature.com/articles/s41467-026-76004-6) |
| **SpaPath-Bench** | 2026 | Patch (spatial) | Tests 19 encoders on paired histology-spatial-transcriptomics to assess whether embeddings distinguish biologically meaningful tissue domains and their spatial organization | [Paper](https://arxiv.org/abs/2605.25764) • [Code](https://github.com/Bokai-Zhao/SpaPath-bench) • [Website](https://bokai-zhao.github.io/SpaPath-benchboard/) |
| **Prostate FM Benchmark** | 2025 | Slide (prostate) | Critical PFM vs task-specific comparison on >100K prostate biopsies (15 sites, 11 countries); PFMs help most under limited labels, but well-trained task-specific models can match or outperform them with far less compute | [Paper](https://arxiv.org/abs/2502.21264) |
| **Kidney FM Benchmark** | 2026 | Slide & Patch (kidney) | Benchmarks 11 PFMs on 11 kidney histopathology tasks; PFMs encode coarse/meso-scale morphology well but struggle with subtle microstructure, complex phenotypes and prognosis | [Paper](https://arxiv.org/abs/2603.15967) |
| **Breast Survival Benchmark** | 2026 | Slide (breast) | Benchmarks PFMs for breast cancer survival across 3 cohorts (>5,400 patients); second-gen models improve but recent models differ modestly, and H0-mini can slightly beat its larger teacher (diminishing scaling returns) | [Paper](https://arxiv.org/abs/2604.24679) |
| **Segmentation FM Benchmark** | 2026 | Patch (segmentation) | Benchmarks 10 FMs on 4 semantic-segmentation datasets using attention heads as pixel representations; differently-trained PFMs are complementary - fusing CONCH, PathDino and CellViT improves performance | [Paper](https://arxiv.org/abs/2602.18747) |
| **WSI Retrieval Benchmark** | 2025 | Slide (retrieval) | Zero-shot WSI retrieval testing whether embedding geometry supports retrieval across 23 organs and 117 cancer subtypes; UNI, Virchow and GigaPath differ meaningfully | [Paper](https://www.nature.com/articles/s41598-025-88545-9) |
| **HistoVL** | 2025 | Patch (VLM) | Holistic benchmark for histopathology VLMs across 26 organs, 31 cancer types, >5M patches from 41K+ WSIs (11 scanners); tests text-change sensitivity, adversarial robustness and calibration | [Paper](https://arxiv.org/abs/2503.12990) |

---

## 🔎 Interpretability and Analysis

| Paper | Year | Focus | Resources |
|---|---|---|---|
| **Mishra et al.** — *Comparing Computational Pathology Foundation Models using Representational Similarity Analysis* | 2025 | Comparing Computational Pathology Foundation Models using Representational Similarity Analysis | [Paper](https://arxiv.org/abs/2509.15482) |
| **Le et al.** — *Interpretability analysis on a pathology foundation model reveals biologically relevant embeddings across modalities* | 2024 | Interpretability analysis on a pathology foundation model reveals biologically relevant embeddings across modalities | [Paper](https://arxiv.org/abs/2407.10785v1) |
| **Vig et al.** — *Do Pathology Foundation Models Encode Disease Progression? A Pseudotime Analysis of Visual Representations* | 2026 | Applies diffusion pseudotime to PFM embeddings; 5 models recover continuous cancer-progression trajectories, and trajectory fidelity predicts few-shot generalization | [Paper](https://arxiv.org/abs/2601.21334) |
| **Kim et al.** — *Dissecting and Directing Pathology Foundation Models* | 2026 | Sparse representation learning decomposes PFM embeddings into interpretable histomorphological concepts, producing a pathology concept atlas (bioRxiv preprint) | [Paper](https://www.biorxiv.org/content/10.64898/2026.06.12.731496v1) |
| **Srikanthan et al.** — *Do Foundation Models See Biology? Evaluating Attention Coherence with Spatial Transcriptomics in Glioblastoma* | 2026 | Evaluates attention coherence of 5 PFMs via spatial transcriptomics in glioblastoma; attention aligns with transcriptional pathways, and models attend to different biological compartments | [Paper](https://arxiv.org/abs/2606.04764) |
| **Ndubuisi** — *What Carries the Signal in Pathology Foundation-Model Atlases? A Patient-Level Controlled Benchmark in Breast Cancer* | 2026 | Patient-controlled TCGA-BRCA analysis across 11 frozen backbones; some molecular signal is genuine, but much is explained by interpretable morphology | [Paper](https://arxiv.org/abs/2608.00105) |
| **Cui et al.** — *Translating Histopathology Foundation Model Embeddings into Cellular and Molecular Features for Clinical Studies* | 2026 | Maps PFM embeddings to cell composition and gene-expression features via spatial transcriptomics, decoding latent features into interpretable biology | [Paper](https://www.biorxiv.org/content/10.64898/2026.03.17.711896v1) |

---

## 🛡️ Robustness and Generalization

| Paper | Year | Focus | Resources |
|---|---|---|---|
| **PathoROB** — *Towards robust foundation models for digital pathology* | 2026 | Robustness benchmark: 20 PFMs, 99,392 patches, 28 biological classes, 34 centers; compares biological information vs technical confounding and finds substantial robustness deficits | [Paper](https://www.nature.com/articles/s41467-026-73923-2) |
| **de Jong et al.** — *Current Pathology Foundation Models are Unrobust to Medical Center Differences* | 2025 | Introduces a Robustness Index; across 10 PFMs, medical-center information is often represented more strongly than tissue/cancer information, tying downstream errors to center confounding | [Paper](https://arxiv.org/abs/2501.18055) |
| **Kömen et al.** — *Do Histopathological Foundation Models Eliminate Batch Effects? A Comparative Study* | 2024 | Shows histopathology FM embeddings still carry hospital-specific batch signatures that bias predictions; not removed by stain normalization | [Paper](https://arxiv.org/abs/2411.05489) |
| **Elphick et al.** — *Are the Latent Representations of Foundation Models for Pathology Invariant to Rotation?* | 2024 | Tests rotation invariance of 12 PFMs via mutual-kNN alignment; models trained with rotation augmentation are substantially more invariant | [Paper](https://arxiv.org/abs/2412.11938) |
| **Gustafsson et al.** — *Evaluating Computational Pathology Foundation Models for Prostate Cancer Grading under Distribution Shifts* | 2026 | UNI and CONCH outperform older baselines for prostate grading, but large-scale diverse pretraining does not guarantee robustness to real-world distribution shifts | [Paper](https://arxiv.org/abs/2410.06723) |
| **Carloni et al.** — *Pathology Foundation Models are Scanner Sensitive: Benchmark and Mitigation with Contrastive ScanGen Loss* | 2025 | Shows scanner bias in existing PFMs and proposes ScanGen, a contrastive loss that improves scanner robustness during downstream training | [Paper](https://arxiv.org/abs/2507.22092) |
| **Thiringer et al.** — *Scanner-Induced Domain Shifts Undermine the Robustness of Pathology Foundation Models* | 2026 | Evaluates 14 PFMs on the same breast tissue scanned on 5 scanners; embeddings contain substantial scanner-specific structure, and AUC can stay stable while calibration becomes scanner-dependent | [Paper](https://arxiv.org/abs/2601.04163) |
| **Chai et al.** — *Impact of tissue staining and scanner variation on the performance of pathology foundation models: a study of sarcomas and their mimics* | 2026 | Investigates the sensitivity of PFM-based analysis to histologic staining and scanner variability in sarcomas and their mimics | [Paper](https://doi.org/10.1002/2056-4538.70080) |
| **Yajnik et al.** — *The Good, the Bad, and the Brittle: Benchmarking Robustness and Generalisation of Histopathology Foundation Models* | 2026 | Tests 12 PFMs against 11 clinically realistic perturbations; larger models are not automatically more robust, and UNI2/Virchow2-sized models can match or exceed larger ones | [Paper](https://arxiv.org/abs/2607.04401) |
| **Wang et al.** — *Universal and transferable attacks on pathology foundation models using microscopic perturbations* | 2026 | A single weak, transferable microscopic perturbation degrades multiple black-box PFMs across datasets, revealing common vulnerabilities in their feature spaces | [Paper](https://www.nature.com/articles/s41377-026-02347-w) |
| **Liu et al.** — *The Butterfly Effect in Pathology: Exploring Security in Pathology Foundation Models* | 2025 | First systematic study of adversarial vulnerability in PFMs: modifying just 0.1% of patches with imperceptible noise degrades accuracy by up to 20% (label-free attack; 3 PFMs, 5 datasets, 6 tasks) | [Paper](https://arxiv.org/abs/2505.24141) |
| **CRoMa** — *Beyond Counts: A Distributional Robustness Margin For Pathology Foundation Models* | 2026 | Introduces the Cross-confounder Robustness Margin (CRoMa), a sample-level measure of whether representations are driven by biology vs non-biological variation (e.g., staining); every tile encoder retained a confounder-dominated lower tail | [Paper](https://arxiv.org/abs/2607.25497) |

---

## 📚 Survey and Perspectives

| Paper | Year | Focus | Resources |
|---|---|---|---|
| **Xiong et al.** — *A Survey of Pathology Foundation Model: Progress and Future Directions* | 2025 | Comprehensive survey of progress and future directions in pathology foundation models | [Paper](https://arxiv.org/abs/2504.04045) |
| **Chanda et al.** — *A New Era in Computational Pathology: A Survey on Foundation and Vision-Language Models* | 2024 | Survey on Foundation and Vision-Language Models | [Paper](https://arxiv.org/abs/2408.14496) |
| **Li et al.** — *A survey on computational pathology foundation models: datasets, adaptation strategies, and evaluation tasks* | 2025 | Survey covering datasets, adaptation strategies, and evaluation tasks | [Paper](https://link.springer.com/article/10.1007/s10115-026-02806-1) |
| **Lin et al.** — *Revealing Ethical Risks in Pathology Foundation Models: A Quantitative Perspective* | 2025 | Quantitative perspective on ethical risks in pathology foundation models | [Paper](https://arxiv.org/abs/2502.16889) |
| **Bilal et al.** — *Foundation Models in Computational Pathology: A Review of Challenges, Opportunities, and Impact* | 2025 | Review of challenges, opportunities, and impact of Foundation Models in CPath | [Paper](https://arxiv.org/abs/2502.08333) |
| **Tizhoosh et al.** — *Rethinking foundation models in pathology* | 2026 | Perspective on rethinking foundation models in pathology | [Paper](https://www.nature.com/articles/s41551-026-01696-6) |

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
