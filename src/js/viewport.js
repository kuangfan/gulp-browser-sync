(function(w){
  var r = 1/w.devicePixelRatio, h = document.documentElement;
  function resize() {
    var b = h.getBoundingClientRect().width;
    b * r > 540 && (b = 540 / r);
    var c = b / 10;
    h.style.fontSize = c + "px";
  }
  resize();
  window.addEventListener("resize", function(){
    resize();
  })
  if (g = document.createElement("meta"), g.setAttribute("name", "viewport"), g.setAttribute("content", "initial-scale=" + r + ", maximum-scale=" + r + ", minimum-scale=" + r + ", user-scalable=no"),h.firstElementChild) h.firstChild.appendChild(g);
})(window)
