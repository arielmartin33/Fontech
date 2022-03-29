window.addEventListener("load", function () {
  let bottonNewsletter = document.querySelector("body");
  alert("funciona");

  bottonNewsletter.addEventListener("click", function () {
    alert("funciona");
    bottonNewsletter.style.backgroundColor = "red";
  });
});
