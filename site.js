// Yes, I Can Fix That — shared site script
// Runs on every page. Gallery filters and photo viewer only activate on the Our Work page.
(function () {
  // Footer year stays current automatically
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

(function(){
  if(!document.getElementById("gallery")) return;
  var btns=document.querySelectorAll('.filter'), jobs=document.querySelectorAll('.job');
  btns.forEach(function(b){ b.addEventListener('click',function(){
    var f=b.dataset.filter;
    btns.forEach(function(x){x.setAttribute('aria-pressed', x===b?'true':'false');});
    jobs.forEach(function(j){ j.hidden = !(f==='all' || j.dataset.cat===f); });
  }); });
  var dlg=document.getElementById('viewer'), vi=document.getElementById('viewer-img'), vc=document.getElementById('viewer-cap');
  document.querySelectorAll('.job-open').forEach(function(o){ o.addEventListener('click',function(){
    vi.src=o.dataset.src; var cap=o.closest('figure').querySelector('figcaption');
    vc.textContent=cap.lastChild.textContent; vi.alt=o.querySelector('img').alt;
    if(dlg.showModal) dlg.showModal();
  }); });
  dlg.addEventListener('click',function(e){ if(e.target===dlg) dlg.close(); });
})();
