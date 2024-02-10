import{i as c,S as u}from"./assets/vendor-7659544d.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const f=document.querySelector(".form"),a=document.querySelector(".gallery"),i=document.querySelector(".loader");i.style.display="none";f.addEventListener("submit",p);function p(s){s.preventDefault();const r=d();r!==""&&(a.innerHTML="",i.style.display="inline-block",m(r).then(o=>y(o)).catch(o=>{console.log(o),i.style.display="none"}),s.target.reset())}function d(){return document.querySelector("input").value.trim()}function m(s){const r=new URLSearchParams({key:"42110229-d56f9063956695e15527c98fc",q:s,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`https://pixabay.com/api/?${r}`).then(o=>{if(!o.ok)throw new Error(o.status);return o.json()})}function y(s){if(s.hits.length===0)c.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#B51B1B",color:"#FAFAFB",position:"topRight"});else{const r=s.hits.map(n=>`<li class="gallery-item">
      <a class="gallery-link" href="${n.largeImageURL}">
        <img
          class="gallery-image"
          src="${n.webformatURL}"
              alt="${n.tags}"
        />
      </a>
      <div class="img-info">
      <p>Likes: ${n.likes}</p>
      <p>Views: ${n.views}</p>
      <p>Comments: ${n.comments}</p>
      <p>Downloads: ${n.downloads}</p>
      </div>
      </li>`).join("");a.insertAdjacentHTML("beforeend",r),new u(".gallery a",{captions:!0,captionDelay:250,captionsData:"alt"}).refresh()}i.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
