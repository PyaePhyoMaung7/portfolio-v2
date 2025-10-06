setTimeout(() => {
  document.querySelector<HTMLBodyElement>("#cloak")!.style.display = "none";
  document.querySelector<HTMLBodyElement>("#content")!.style.display = "block";
}, 3000);
