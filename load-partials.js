// Loads header and footer partials and their CSS files synchronously
(async function(){
  async function loadPartial(url, containerId, cssHref){
    try{
      const res = await fetch(url);
      if(!res.ok) throw new Error('Failed to load '+url);
      const html = await res.text();
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      const container = document.getElementById(containerId);
      if(container) container.replaceWith(wrapper);
      else document.body.insertAdjacentElement('afterbegin', wrapper);

      if(cssHref){
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssHref;
        document.head.appendChild(link);
      }
    }catch(e){
      console.error(e);
    }
  }

  await loadPartial('partials/header.html','siteHeader','header.css');
  await loadPartial('partials/footer.html','siteFooter','footer.css');
})();
