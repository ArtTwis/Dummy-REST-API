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
          <div data-methodName="${resource.method}" class="resourcesMethodDv resourceMethod">
          <label data-methodName="${resource.method}" class="resourceMethod flex justify-center align-center">${resource.method}</label>
          </div>
          `;

          (resource.list).forEach((__resource) => {
            resourceContainer.innerHTML += `
            <div data-resourceContent-method="${__resource.method}" class="hide resourcesContentParentDv flex justify-center align-center">
            <div class="resourcesContentDv">
              <div class="resourceMethodDv flex justify-center align-center">
                <label class="resourceMethodLabel">${__resource.method}</label>
              </div>
              <label class="resourceLabel">${__resource.resourceName}</label>
            </div>
            </div>
            `;
          });
        }
      }
    }
  }
  xhr.open('GET', 'http://localhost:1818/resources', true);
  xhr.send();
})();

document.addEventListener('click', (event) => {
  if(event.target.classList.contains('resourceMethod')){
    let __method = event.target.getAttribute('data-methodName');
    let resourceElements = document.querySelectorAll(`div[data-resourceContent-method="${__method}"]`);
    resourceElements.forEach((element) => {
      element.classList.toggle('hide');
    });
  }
});

function setContainerSize(element){
  let height = element.offsetHeight;
  let width = element.offsetWidth;
  element.style.minHeight = height + "px";
  element.style.maxHeight = height + "px";
  element.style.minWidth = width + "px";
  element.style.maxWidth = width + "px";
}