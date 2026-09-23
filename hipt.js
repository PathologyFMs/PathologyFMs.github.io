// Supplemental Tile-Level Vision Foundation Model entry for HIPT.
(() => {
  const category = modelData.find(
    (section) => section.category === "Tile-Level Vision Foundation Models"
  );

  const entryName = "HIPT";
  if (!category || category.models.some((model) => model.name === entryName)) {
    return;
  }

  category.models.push({
    "name": entryName,
    "year": 2022,
    "date": "2022-06-06",
    "data": "10,678 TCGA WSIs; 104M 256×256 patches + 408,218 4096×4096 regions",
    "idea": "Hierarchical Image Pyramid Transformer (HIPT) models the natural nested structure of whole-slide images with two levels of DINO self-supervised pretraining: a ViT-S/16 encodes 256×256 patches and a ViT-XS/256 aggregates those patch representations within 4096×4096 regions, enabling hierarchical pathology representations that transfer to slide-level cancer subtyping and survival prediction.",
    "stains": "H&E",
    "github": "https://github.com/mahmoodlab/HIPT",
    "hf": "",
    "website": "https://openaccess.thecvf.com/content/CVPR2022/html/Chen_Scaling_Vision_Transformers_to_Gigapixel_Images_via_Hierarchical_Self-Supervised_Learning_CVPR_2022_paper.html",
    "paper": "https://openaccess.thecvf.com/content/CVPR2022/papers/Chen_Scaling_Vision_Transformers_to_Gigapixel_Images_via_Hierarchical_Self-Supervised_Learning_CVPR_2022_paper.pdf",
    "bibtex": "@inproceedings{chen2022scaling,\n  author    = {Chen, Richard J. and Chen, Chengkuan and Li, Yicong and Chen, Tiffany Y. and Trister, Andrew D. and Krishnan, Rahul G. and Mahmood, Faisal},\n  title     = {Scaling Vision Transformers to Gigapixel Images via Hierarchical Self-Supervised Learning},\n  booktitle = {Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},\n  month     = {June},\n  year      = {2022},\n  pages     = {16144--16155}\n}",
    "audit_objective": "Hierarchical DINO self-supervised learning at 256×256 patch level and 4096×4096 region level",
    "audit_wsis": "10,678 TCGA gigapixel H&E WSIs spanning 33 cancer types",
    "audit_patches": "104M 256×256 images plus 408,218 4096×4096 regions",
    "audit_organs": "Pan-cancer TCGA; 33 cancer types",
    "audit_downstream": "9 slide-level tasks covering cancer subtyping and survival prediction",
    "audit_cohorts": "TCGA",
    "audit_domain": "Hierarchical multi-scale representation learning for gigapixel whole-slide images",
    "audit_notes": "HIPT is a hierarchical vision encoder rather than a single flat tile encoder. The released HIPT_4K pipeline uses ViT-S/16 patch features (384-D) and a ViT-XS/256 region encoder whose default CLS representation is 192-D; the paper reports 20× WSI processing. It is included in the tile-level vision section because its foundation representations are learned self-supervised at patch and region levels before downstream slide-level aggregation.",
    "paper_title": "Scaling Vision Transformers to Gigapixel Images via Hierarchical Self-Supervised Learning",
    "paper_author": "Chen",
    "audit_benchmark": "Nine TCGA slide-level tasks for cancer subtyping and survival prediction",
    "audit_result": "Hierarchical pretraining improves cancer subtyping and survival prediction over contemporary weakly supervised baselines, and pretrained HIPT region embeddings show strong label-free k-NN performance."
  });
})();
