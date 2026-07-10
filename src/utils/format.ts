export function titleCase(text: string) {
  return text
    .replaceAll("-", " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}