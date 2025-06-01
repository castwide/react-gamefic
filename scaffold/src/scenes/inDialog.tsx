function currentIsDialog(element: Element | null): boolean {
  if (!element) return false;
  return element.role === "dialog";
}

export default function inDialog(): boolean {
  let activeElement = document.activeElement;
  while (activeElement) {
    if (currentIsDialog(activeElement)) return true;
    activeElement = activeElement.parentElement;
  }
  return false;
}
