// Add Prov-GigaPath-Flash as a variant of Prov-GigaPath.
(() => {
  for (const section of modelData) {
    const provGigaPath = section.models?.find((model) => model.name === "Prov-GigaPath");
    if (!provGigaPath) continue;

    if (!Array.isArray(provGigaPath.variants)) {
      provGigaPath.variants = [];
    }

    const variantName = "Prov-GigaPath-Flash";
    if (!provGigaPath.variants.some((variant) => variant.name === variantName)) {
      provGigaPath.variants.push({
        "name": variantName,
        "year": 2026,
        "hf": "https://huggingface.co/prov-gigapath/prov-gigapath-flash",
        "paper": "https://arxiv.org/abs/2607.18218",
        "note": "Lightweight whole-slide variant of Prov-GigaPath retaining the same two-stage tile-encoder + slide-encoder design. Uses a ~22M-parameter DINOv2-small ViT-S/16 tile encoder and ~21M-parameter 12-layer LongNet slide encoder, both with 384-D representations, for substantially faster and more memory-efficient inference and finetuning."
      });
    }
    break;
  }
})();
