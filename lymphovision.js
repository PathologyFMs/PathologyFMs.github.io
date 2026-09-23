// Supplemental Tile-Level Vision Foundation Model entry for LymphoVision.
(() => {
  const category = modelData.find(
    (section) => section.category === "Tile-Level Vision Foundation Models"
  );

  const entryName = "LymphoVision";
  if (!category || category.models.some((model) => model.name === entryName)) {
    return;
  }

  category.models.push({
    "name": entryName,
    "year": 2025,
    "date": "2025-11-03",
    "data": "31,211 H&E WSIs; >37M multi-resolution patches; 9,155 cases",
    "idea": "Lymphoma-specialized tile-level pathology foundation model. A ViT-Giant encoder is pretrained with DINOv2-style knowledge distillation and consistency on more than 37 million density-sampled H&E patches from 31,211 WSIs, spanning 5×, 10×, 20× and 40×. The foundation model itself produces patch embeddings; downstream WSI diagnosis is performed separately with clustering-constrained attention MIL.",
    "stains": "H&E",
    "tag": "disease-specific",
    "tag_color": "blue",
    "github": "",
    "hf": "",
    "paper": "https://doi.org/10.1182/blood-2025-117",
    "website": "https://www.sciencedirect.com/science/article/abs/pii/S0006497125026928",
    "bibtex": "@article{seheult2025lymphovision,\n  title={Lymphovision: A lymphoma-specialized foundation model for histology-based lymphoma classification and subtyping},\n  author={Seheult, Jansen and Han, Wenchao and Keser, Reyhan and Tavolara, Thomas and Sapkota, Nishchal and Kumar, Nilesh and Mwangi, Raphael and Dalland, Joanna and Larson, Daniel and Zhang, Chi and Gibson, Sarah and Dangott, Bryan and Horna, Pedro and McClintock, David and Reed, Katelyn and Schwartz, Kaitlin and Bjorheim, Annette and Lee, Jodi and Halvorson, Joseph and Nowakowski, Grzegorz and Witzig, Thomas and Ansell, Stephen and King, Rebecca and Maurer, Matthew and Cerhan, James and Hsi, Eric},\n  journal={Blood},\n  volume={146},\n  number={Supplement 1},\n  pages={117},\n  year={2025},\n  doi={10.1182/blood-2025-117}\n}",
    "audit_objective": "DINOv2 self-supervised pretraining using knowledge distillation and consistency, paired with graph-based clustering and density-aware sampling to prioritize morphologically informative patches",
    "audit_wsis": "31,211 H&E WSIs from 9,155 archival lymphoma and reactive lymphoproliferative cases",
    "audit_patches": ">37 million multi-resolution patches sampled at 5×, 10×, 20× and 40×",
    "audit_organs": "Lymphoid tissue / hematopathology; lymphoma and reactive lymphoproliferative disease",
    "audit_downstream": "Three WSI-level diagnostic tasks using frozen LymphoVision patch embeddings plus clustering-constrained attention MIL: DLBCL cell-of-origin classification, follicular lymphoma grading, and six-class lymphoma subtype classification",
    "audit_cohorts": "Mayo Clinic archival lymphoma and reactive lymphoproliferative cases for pretraining; evaluation cases were excluded from pretraining",
    "audit_domain": "Lymphoma-specialized tile representation learning for hematopathology",
    "audit_notes": "Tile-level classification is explicit in the paper's pipeline: the ViT-Giant LymphoVision backbone generates 20× patch embeddings, which are then aggregated by a separate MIL model for WSI-level predictions. The abstract does not report the exact ViT-Giant parameter count, embedding dimension or model-input pixel size, so those fields are intentionally not inferred. Published in Blood 146 (Supplement 1), page 117, as abstract 117; DOI 10.1182/blood-2025-117.",
    "paper_title": "Lymphovision: A lymphoma-specialized foundation model for histology-based lymphoma classification and subtyping",
    "paper_author": "Seheult",
    "audit_benchmark": "Compared against general-purpose pathology FMs including Virchow-v2 and UNI-v2 on the same evaluation cases; downstream evaluation uses clustering-constrained attention MIL",
    "audit_result": "Mean test AUC 0.93 for DLBCL cell-of-origin classification versus 0.85 for Virchow-v2 and 0.88 for UNI-v2; AUC 0.88 for follicular lymphoma grading; and mean AUC 0.98 with 87.1% accuracy for six-class lymphoma subtype classification."
  });
})();
