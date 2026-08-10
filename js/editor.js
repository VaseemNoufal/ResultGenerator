const canvas = document.getElementById("posterCanvas");
const ctx = canvas.getContext("2d");
const background = new Image();

const inputs = {
  programName: document.getElementById("programName"),
  firstPrize: document.getElementById("firstPrize"),
  secondPrize: document.getElementById("secondPrize"),
  thirdPrize: document.getElementById("thirdPrize")
};

// IMPORTANT:
// These values are in the poster's real 1254 x 1254 pixel coordinate system.
// Increase fontSize if you want the text even larger.
const POSITIONS = {
  program: { x: 165, y: 660, maxWidth: 560, fontSize: 105 },
  first:   { x: 205, y: 755, maxWidth: 560, fontSize: 78 },
  second:  { x: 205, y: 855, maxWidth: 560, fontSize: 78 },
  third:   { x: 205, y: 955, maxWidth: 560, fontSize: 78 }
};

background.src = "assets/poster-model-1.png";

function drawText(text, position, color = "#263238") {
  text = text.trim();
  if (!text) return;

  let fontSize = position.fontSize;
  const fontFamily = "Arial, sans-serif";

  ctx.save();
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillStyle = color;
  ctx.font = `800 ${fontSize}px ${fontFamily}`;

  // Only shrink the text when it genuinely exceeds the allowed width.
  while (ctx.measureText(text).width > position.maxWidth && fontSize > 24) {
    fontSize -= 1;
    ctx.font = `800 ${fontSize}px ${fontFamily}`;
  }

  // Draw at the real font size. No canvas maxWidth scaling.
  ctx.fillText(text, position.x, position.y);

  ctx.restore();
}

function drawPoster() {
  if (!background.complete || background.naturalWidth === 0) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  drawText(inputs.programName.value, POSITIONS.program, "#263238");
  drawText(inputs.firstPrize.value, POSITIONS.first, "#263238");
  drawText(inputs.secondPrize.value, POSITIONS.second, "#263238");
  drawText(inputs.thirdPrize.value, POSITIONS.third, "#263238");
}

background.onload = drawPoster;

Object.values(inputs).forEach((input) => {
  input.addEventListener("input", drawPoster);
});

document.getElementById("resetBtn").addEventListener("click", () => {
  Object.values(inputs).forEach((input) => {
    input.value = "";
  });
  drawPoster();
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  drawPoster();

  const safeName = (inputs.programName.value.trim() || "result-poster")
    .replace(/[^\w\-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const link = document.createElement("a");
  link.download = `${safeName || "result-poster"}.png`;
  link.href = canvas.toDataURL("image/png");
  document.body.appendChild(link);
  link.click();
  link.remove();
});
