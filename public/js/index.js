(function(){
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let resourceContainer = document.querySelector('#resources_contentDv');
      resourceContainer.innerHTML = '';
      setContainerSize(resourceContainer);
      let __response = JSON.parse(this.response);
      if(__response){
        for(let resource of __response.data){
          resourceContainer.innerHTML += `
          <div class="resourcesContentDv">
            <div class="resourceMethodDv flex justify-center align-center">
              <label class="resourceMethodLabel">${resource.method}</label>
            </div>
            <label class="resourceLabel">${resource.resourceName}</label>
          </div>
          `;
        }
      }
    }
  }
  xhr.open('GET', 'http://localhost:1818/resources', true);
  xhr.send();
})();

function setContainerSize(element){
  let height = element.offsetHeight;
  let width = element.offsetWidth;
  element.style.minHeight = height + "px";
  element.style.maxHeight = height + "px";
  element.style.minWidth = width + "px";
  element.style.maxWidth = width + "px";
}