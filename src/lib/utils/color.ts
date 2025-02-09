interface RGB {
  r: number,
  g: number,
  b: number,
}

export function contrastColorToHex(d: number) {
  return rgbToHex({ r: d, g: d, b: d})
}
export function contrastColor(color: RGB)
{
  // Counting the perceptive luminance - human eye favors green color...      
  const luminance = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;
  if (luminance > 0.5)
    return 0; // bright colors - black font
  return 255; // dark colors - white font
}

export function numberToHex(n: number)
{
  const hex = n.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex(color: RGB)
{
  return "#" + numberToHex(color.r) + numberToHex(color.g) + numberToHex(color.b);
}

export function hexToRgb(hex: string) {
  if(hex.startsWith("#"))
    hex = hex.substring(1)
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b } as RGB
}