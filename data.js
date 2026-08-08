const modelData = [
  {
    category: "Tile-level Vision Encoders (Self-supervised)",
    models: [
      { name: "CTransPath", year: 2022, data: "32K+ WSIs", idea: "SRCL with hybrid CNN-ViT", github: "https://github.com/Xiyue-Wang/TransPath", hf: "", paper: "https://www.sciencedirect.com/science/article/pii/S1361841522002043" },
      { name: "REMEDIS", year: 2023, data: "29K+ WSIs", idea: "BiT + SimCLR Pretraining", github: "", hf: "", paper: "https://doi.org/10.1038/s41551-023-01049-7" },
      { name: "Lunit", year: 2023, data: "36K+ WSI", idea: "Pathology-Specific SSL Pretraining", github: "https://github.com/lunit-io/benchmark-ssl-pathology", hf: "https://huggingface.co/1aurent/vit_small_patch8_224.lunit_dino", paper: "https://arxiv.org/abs/2212.04690" },
      { name: "Phikon", year: 2023, data: "6,093 WSIs", idea: "iBOT Masked Image Pretraining", github: "https://github.com/owkin/HistoSSLscaling/", hf: "https://huggingface.co/owkin/phikon", paper: "https://www.medrxiv.org/content/10.1101/2023.07.21.23292757v2" },
      { name: "PathoDuet", year: 2024, data: "11K WSIs", idea: "Cross-Scale Cross-Stain Pretraining", github: "https://github.com/openmedlab/PathoDuet", hf: "", paper: "https://www.sciencedirect.com/science/article/pii/S1361841524002147" },
      { name: "RudolfV", year: 2024, data: "134K WSIs, 58 tissue types", idea: "Pathologist-curated data and expertise", github: "", hf: "", paper: "https://arxiv.org/abs/2401.04079" },
      { name: "PLUTO", year: 2024, data: "195M tiles", idea: "Lightweight multi-scale representation", github: "", hf: "", paper: "https://arxiv.org/abs/2405.07905" },
      { name: "UNI", year: 2024, data: "100M tiles, 100K WSIs", idea: "General-purpose DINOv2 on 100K WSIs", github: "https://github.com/mahmoodlab/UNI", hf: "", paper: "https://doi.org/10.1038/s41591-024-02857-3" },
      { name: "Virchow", year: 2024, data: "1.5M WSIs, 100K patients", idea: "Clinical-grade pan-cancer detection", github: "", hf: "https://huggingface.co/paige-ai/Virchow", paper: "https://doi.org/10.1038/s41591-024-03141-0" },
      { name: "Virchow2", year: 2024, data: "3.1M WSIs", idea: "1.9B parameters, mixed magnification", github: "", hf: "https://huggingface.co/paige-ai/Virchow2", paper: "https://arxiv.org/abs/2408.00738" },
      { name: "Hibou", year: 2024, data: "1M WSIs", idea: "Open-source DINOv2 architecture", github: "https://github.com/histai/hibou", hf: "", paper: "https://arxiv.org/abs/2406.05074" },
      { name: "Prov-GigaPath", year: 2024, data: "1.3B tiles, 171K WSIs", idea: "LongNet for ultra-large context", github: "https://github.com/prov-gigapath/prov-gigapath", hf: "", paper: "https://doi.org/10.1038/s630-024-0181-8" },
      { name: "BEPH", year: 2024, data: "11M tiles", idea: "BEiT-based masked image modeling", github: "https://github.com/Zhcyoung/BEPH", hf: "", paper: "https://www.nature.com/articles/s41467-025-57587-y" },
      { name: "Atlas", year: 2025, data: "1.2M WSIs (Mayo + Charité)", idea: "Efficient RudolfV-based model", github: "", hf: "", paper: "https://arxiv.org/abs/2501.05409" },
      { name: "GPFM", year: 2025, data: "190M tiles, 96K WSIs", idea: "Unified knowledge distillation", github: "https://github.com/birkhoffkiki/GPFM/", hf: "", paper: "https://arxiv.org/abs/2407.18449" },
      { name: "Midnight", year: 2025, data: "12K / 92K WSIs", idea: "Data-efficient DINOv2 optimization", github: "https://github.com/kaiko-ai/midnight", hf: "", paper: "https://arxiv.org/abs/2504.05186" },
      { name: "H-optimus-0, H0-mini", year: 2025, data: "500K WSIs", idea: "SSL Pretraining, FM Distillation", github: "https://github.com/bioptimus/releases/tree/main/models/h-optimus/v0", hf: "https://huggingface.co/bioptimus/H-optimus-0", paper: "https://arxiv.org/abs/2501.16239v1" },
      { name: "PathOrchestra", year: 2025, data: "27K WSIs, 100 tasks", idea: "Evaluated on 112 clinical tasks", github: "", hf: "https://huggingface.co/AI4Pathology/PathOrchestra", paper: "https://doi.org/10.1038/s41591-024-03200-4" },
      { name: "GenBio-PathFM", year: 2026, data: "177K WSIs", idea: "JEDI (JEPA+DINO) dual-stage learning", github: "https://github.com/genbio-ai/genbio-pathfm", hf: "", paper: "https://www.biorxiv.org/content/10.64898/2026.03.17.712534v1" },
      { name: "Phaet", year: 2026, data: "---", idea: "Robustness-tuned Phikon-v2", github: "", hf: "https://huggingface.co/wearewaiv/phaet", paper: "https://arxiv.org/abs/2607.22861" },
      { name: "Mascaret", year: 2026, data: "---", idea: "Robustness-tuned Midnight-12k", github: "", hf: "https://huggingface.co/wearewaiv/mascaret", paper: "https://arxiv.org/abs/2607.22861" },
      { name: "Rudolfv2", year: 2026, data: "300K+ WSIs", idea: "Robust Multi-Scale SSL Pretraining", github: "", hf: "https://huggingface.co/Aignostics/RudolfV-2", paper: "https://cdn.prod.website-files.com/67adb01f31489469b513304a/6a74e2f9f1d4aef06489a3f1_RudolfV_2_260806.pdf" },
      { name: "Atlas 2", year: 2026, data: "5.5M WSIs", idea: "2B params, robust evaluation on 80 benchmarks", github: "", hf: "", paper: "https://arxiv.org/pdf/2601.05148" }
    ]
  },
  {
    category: "Slide-level / Multimodal Foundation Models",
    models: [
      { name: "Tangle", year: 2024, data: "8.6K paired (slide + RNA-seq)", idea: "Transcriptomics-aligned slide representation", github: "https://github.com/mahmoodlab/Tangle", hf: "", paper: "https://arxiv.org/abs/2405.11618" },
      { name: "PRISM", year: 2024, data: "Virchow tiles + reports", idea: "Generative model via Virchow tiles", github: "", hf: "https://huggingface.co/paige-ai/Prism", paper: "https://arxiv.org/abs/2405.10254" },
      { name: "CHIEF", year: 2024, data: "60K WSIs, 19 sites", idea: "Weakly supervised slide pattern recognition", github: "https://github.com/hms-dbmi/CHIEF", hf: "", paper: "https://www.nature.com/articles/s41586-024-07894-z" },
      { name: "TITAN", year: 2025, data: "335K WSIs + reports", idea: "Whole-slide alignment with reports", github: "https://github.com/mahmoodlab/TITAN", hf: "https://huggingface.co/MahmoodLab/TITAN", paper: "https://www.nature.com/articles/s41591-025-03982-3" },
      { name: "Threads", year: 2025, data: "47K paired (H&E + multi-omics)", idea: "Multi-omics driven representation", github: "", hf: "", paper: "https://arxiv.org/html/2501.16652v1" },
      { name: "mSTAR", year: 2025, data: "26K paired triplets", idea: "Slide, report, and RNA-seq integration", github: "https://github.com/Innse/mSTAR", hf: "https://huggingface.co/Wangyh/mSTAR", paper: "https://www.nature.com/articles/s41467-025-66220-x" },
      { name: "CPath-Omni", year: 2025, data: "700k image-caption + WSI report", idea: "Unified Patch–Slide Multimodal Model", github: "https://github.com/PathFoundation/CPath-Omni", hf: "", paper: "https://arxiv.org/pdf/2412.12077" },
      { name: "Feather", year: 2025, data: "3,499 WSIs", idea: "Transferable Pretrained MIL Models", github: "https://github.com/mahmoodlab/MIL-Lab", hf: "https://huggingface.co/collections/MahmoodLab/feather", paper: "https://arxiv.org/abs/2506.09022" },
      { name: "Madeleine", year: 2025, data: "4,211 WSIs (Paired Multi-Stain)", idea: "Multistain Cross-Stain Slide Pretraining", github: "https://github.com/mahmoodlab/MADELEINE", hf: "https://huggingface.co/MahmoodLab/madeleine", paper: "https://arxiv.org/pdf/2408.02859" },
      { name: "CARE", year: 2026, data: "34K WSIs", idea: "Molecular-Guided Adaptive Region Modeling", github: "https://github.com/zdipath/CARE", hf: "https://huggingface.co/Zipper-1/CARE", paper: "https://arxiv.org/abs/2602.21637" },
      { name: "PRISM2", year: 2026, data: "2.3M WSIs", idea: "Clinical Dialogue Multimodal Pretraining", github: "", hf: "https://huggingface.co/paige-ai/Prism2", paper: "https://arxiv.org/abs/2506.13063" },
      { name: "EXAONE Path 2.0", year: 2025, data: "37K WSIs", idea: "End-to-end hierarchical learning with direct slide-level supervision", github: "", hf: "", paper: "https://arxiv.org/pdf/2507.06639" },
      { name: "MOOZY", year: 2026, data: "77K WSIs", idea: "Patient-first case-level aggregator via explicit inter-slide modeling", github: "https://github.com/AtlasAnalyticsLab/MOOZY", hf: "", paper: "https://arxiv.org/abs/2603.27048" },
      { name: "GigaPath-Flash", year: 2026, data: "Real-world Providence cohort", idea: "Efficient 43M ViT-S+LongNet whole-slide foundation model", github: "", hf: "", paper: "https://arxiv.org/abs/2607.18218" },
      { name: "GigaTIME-Flash", year: 2026, data: "Real-world Providence cohort", idea: "Efficient spatial proteomics prediction from H&E", github: "", hf: "", paper: "https://arxiv.org/abs/2607.18218" }
    ]
  },
  {
    category: "Vision-Language Foundation Models",
    models: [
      { name: "PLIP", year: 2023, data: "208K image-text pairs", idea: "Pretrained on medical Twitter", github: "https://github.com/pathologyfoundation/plip", hf: "https://huggingface.co/vinid/plip", paper: "https://doi.org/10.1038/s41591-023-02504-3" },
      { name: "CONCH", year: 2024, data: "1.17M image-text pairs", idea: "CoCa-based task-agnostic pretraining", github: "https://github.com/mahmoodlab/CONCH", hf: "https://huggingface.co/MahmoodLab/CONCH", paper: "https://doi.org/10.1038/s41591-024-02856-4" },
      { name: "MUSK", year: 2025, data: "50M images + 1B text tokens", idea: "Unified masked modeling", github: "https://github.com/lilab-stanford/MUSK", hf: "", paper: "https://www.nature.com/articles/s41586-024-08378-w" },
      { name: "KEEP", year: 2026, data: "143K knowledge-grouped pairs", idea: "Disease knowledge graph integration", github: "https://github.com/MAGIC-AI4Med/KEEP", hf: "https://huggingface.co/Astaxanthin/KEEP", paper: "https://arxiv.org/abs/2412.13126" },
      { name: "VISTA-PATH", year: 2026, data: "1.65M triplets (Image + Mask + Text)", idea: "Interactive Class-Aware Segmentation", github: "https://github.com/zhihuanglab/VISTA-PATH", hf: "", paper: "https://arxiv.org/abs/2601.16451" }
    ]
  },
  {
    category: "Generative Foundation Models",
    models: [
      { name: "MuPD", year: 2026, data: "100M patches", idea: "Multimodal Pathology Diffusion Model", github: "https://github.com/lilab-stanford/MUPAD", hf: "https://huggingface.co/collections/xiangjx/mupad-multimodal-pathology-diffusion-model", paper: "https://arxiv.org/abs/2604.03635" }
    ]
  },
  {
    category: "Foundation Model Distillation/Fusion/Ensemble",
    models: [
      { name: "ALICE", year: 2026, data: "24.9M tiles + 155K high-res images", idea: "Agglomerative distillation from 8 teachers", github: "https://github.com/WonderLandxD/ALICE", hf: "", paper: "https://arxiv.org/pdf/2607.09526" },
      { name: "Shazam", year: 2026, data: "Fuses 5 models (UNI 2, Virchow2, H-optimus-1, Prov-Gigapath, Phikon-v2)", idea: "Online integration and distillation of multiple PFMs via adaptive expert weighting", github: "", hf: "", paper: "https://arxiv.org/abs/2503.00736" },
      { name: "ELF", year: 2025, data: "53K WSIs (20 anatomical sites)", idea: "Ensemble learning of 5 foundation models to generate unified slide-level representations", github: "https://github.com/lilab-stanford/ELF", hf: "", paper: "https://arxiv.org/abs/2508.16085" },
      { name: "ASTRA", year: 2026, data: "10.3K WSIs (CHTN cohort)", idea: "Integrates heterogeneous foundation-model representations via sparse mixture-of-experts and contrastive alignment", github: "", hf: "", paper: "https://arxiv.org/abs/2604.22846" }
    ]
  },
  {
    category: "Foundation Model Benchmarking",
    models: [
      { name: "EVA", year: 2024, data: "Slide & Patch", idea: "Standardized framework for systematic evaluation and comparison of PFMs", github: "https://github.com/kaiko-ai/eva", hf: "", paper: "https://openreview.net/forum?id=FNBQOPj18N" },
      { name: "Patho-Bench", year: 2025, data: "Slide", idea: "Open-source benchmarking toolkit with standardized datasets and reproducible evaluation pipelines", github: "https://github.com/mahmoodlab/Patho-Bench", hf: "", paper: "https://arxiv.org/pdf/2502.06750" },
      { name: "QuIIL-PathBench", year: 2025, data: "Patch", idea: "Systematically benchmarks PFMs by evaluating patch-level representations", github: "https://github.com/QuIIL/BenchmarkingPathologyFoundationModels", hf: "", paper: "https://arxiv.org/abs/2410.16038" },
      { name: "Clinical Benchmark", year: 2025, data: "Slide", idea: "Clinical benchmark with MSHS and MSKCC datasets covering disease detection and biomarker prediction", github: "https://github.com/sinai-computational-pathology/SSL_tile_benchmarks#automated-external-benchmarking", hf: "", paper: "https://www.nature.com/articles/s41467-025-58796-1.pdf" },
      { name: "PathBench", year: 2025, data: "Slide & Patch", idea: "Leakage-free multi-center clinical benchmark spanning multiple tasks, with a live public leaderboard", github: "https://github.com/birkhoffkiki/PathBench", hf: "", paper: "https://arxiv.org/abs/2505.20202" },
      { name: "Standford PathBench", year: 2026, data: "Slide & Patch", idea: "Comprehensive benchmark of 32 PFMs across 41 tasks with a public leaderboard", github: "", hf: "", paper: "https://www.nature.com/articles/s41467-026-76004-6" }
    ]
  }
];
