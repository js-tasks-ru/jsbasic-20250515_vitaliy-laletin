function toggleText() {
  document.querySelector(".toggle-text-button").onclick = function (event) {
    const textDiv = document.getElementById("text");

    if (!textDiv.hasAttribute("hidden")) {
      textDiv.hidden = true;
    }
    else {
      textDiv.hidden = false;
    }
  };
}
