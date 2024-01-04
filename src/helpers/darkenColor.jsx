function darkenColor(hexColor, percent) {
  // HEX rengi parçalara ayır
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Her bir renk bileşenini belirtilen yüzde kadar düşür
  const darkenedR = Math.round(r * (1 - percent));
  const darkenedG = Math.round(g * (1 - percent));
  const darkenedB = Math.round(b * (1 - percent));

  // Yeni HEX rengini oluştur
  const darkenedHexColor = `#${darkenedR.toString(16)}${darkenedG.toString(
    16
  )}${darkenedB.toString(16)}`;

  return darkenedHexColor;
}
export default darkenColor;
