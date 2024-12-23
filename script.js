hue.addEventListener('input', renderAll)

function renderAll() {
  result.innerHTML = toHTML(getColorThemes(hue.value))
}
renderAll();
/*
"monochromatic": {
    "description": "Generates a theme based on different shades of a single color.",
    "colors": [
      "hsla(240, 50%, 40%, 0.5)",
      "hsla(240, 50%, 50%, 0.5)",
      "hsla(240, 50%, 60%, 0.5)",
      "hsla(240, 50%, 70%, 0.5)",
      "hsla(240, 50%, 80%, 0.5)"
    ]
  },
*/
function toHTML(colorObject) {
	const systems = Object.keys(colorObject);
	const html = systems.reduce((sum, key, i) => {
		const data = colorObject[key];
		const colors = data.colors;
		const colHtml = colors.reduce((s, c, i) => {
			return `${s}<div class="color" style="--hue: ${c.hue}; --lightness: ${c.lightness}"></div>`
		}, '');
		const css = colors.reduce((s, c, i) => {
			return `${s}.col${i} { --hue: ${c.hue}; --lightness: ${c.lightness};}\n`
		}, '')
		const system = `<label class="system">
		<input name="current" type="radio" style="display: none" />
		<h2>${key}</h2>
		<blockquote>${data.description}</blockquote>
		<div class="colors">${colHtml}</div>
		<pre>${css}</pre>
		</label>`;
		return `${sum}${system}`
  }, '');

  return html;
}

function hueSort(a, b) { return a.hue - b.hue;}

function getColorThemes(hue) {
  const themes = {};

  // Monochromatic
  themes.monochromatic = {
    description: "Generates a theme based on different shades of a single color.",
    colors: []
  };
  for (let i = 0; i < 6; i++) {
    const lightness = 30 + (i * 10) + '%';
    themes.monochromatic.colors.push({ hue: hue, lightness });
  }
  themes.monochromatic.colors.sort(hueSort);

  // Complementary
  themes.complementary = {
    description: "Finds the complementary color of a base color.",
    colors: []
  };
  const complementaryHue = (hue + 180) % 360;
  for (let i = 0; i < 6; i++) {
    const lightness = 30 + (i * 10) + '%';
    themes.complementary.colors.push({ hue: complementaryHue, lightness });
  }
  themes.complementary.colors.sort(hueSort);

  // Analogous
  themes.analogous = {
    description: "Creates a theme with colors adjacent to each other on the color wheel.",
    colors: []
  };
  for (let i = 0; i <= 2; i++) {
    const adjacentHue = (hue + (i * 30)) % 360;
    themes.analogous.colors.push({ hue: adjacentHue, lightness: '50%' });
  }
  themes.analogous.colors.sort(hueSort);

  // Triadic
  themes.triadic = {
    description: "Generates a theme with three colors equally spaced from each other on the color wheel.",
    colors: []
  };
  for (let i = 0; i < 3; i++) {
    const triadicHue = (hue + (i * 120)) % 360;
    for (let j = 0; j < 2; j++) {
      const lightness = 30 + (j * 10) + '%';
      themes.triadic.colors.push({ hue: triadicHue, lightness });
    }
  }
  themes.triadic.colors.sort(hueSort);

  // Split-Complementary
  themes.splitComplementary = {
    description: "Combines a base color with the two colors on either side of its complementary color.",
    colors: []
  };
  const splitComplementaryHue1 = (hue + 150) % 360;
  const splitComplementaryHue2 = (hue + 210) % 360;
  for (let i = 0; i < 2; i++) {
    const lightness = 30 + (i * 10) + '%';
    themes.splitComplementary.colors.push({ hue: hue, lightness });
    themes.splitComplementary.colors.push({ hue: splitComplementaryHue1, lightness });
    themes.splitComplementary.colors.push({ hue: splitComplementaryHue2, lightness });
  }
  themes.splitComplementary.colors.sort(hueSort);
  return themes;
}