// Supplemental website link for Phikon.
(() => {
  for (const section of modelData) {
    const phikon = section.models?.find((model) => model.name === "Phikon");
    if (!phikon) continue;

    phikon.website = "https://www.owkin.com/publications/scaling-self-supervised-learning-for-histopathology-with-masked-image-modeling";
    break;
  }
})();
