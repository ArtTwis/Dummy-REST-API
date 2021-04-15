const apiendpoint = 'http://localhost:1818';

(function(){
  let responseBody_Tag = document.querySelector('#responseBody_tag');
  setContainerSize(responseBody_Tag);
})();

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
          <div data-method="${resource.method}" class="resourceMethod resourcesMethodDv">
            <label data-method="${resource.method}" class="resourceMethod flex justify-center align-center">${resource.method}</label>
          </div>
          `;

          (resource.list).forEach((__resource) => {
            resourceContainer.innerHTML += `
            <div data-method="${__resource.method}" data-endpoint="${__resource.endPoint}" data-resourcename="${__resource.resourceName}" class="hide actual_resource resourcesContentParentDv flex justify-center align-center">
              <div data-method="${__resource.method}" data-endpoint="${__resource.endPoint}" data-resourcename="${__resource.resourceName}" class="actual_resource  resourcesContentDv">
                <div data-method="${__resource.method}" data-endpoint="${__resource.endPoint}" data-resourcename="${__resource.resourceName}" class="actual_resource  resourceMethodDv flex justify-center align-center">
                  <label data-method="${__resource.method}" data-endpoint="${__resource.endPoint}" data-resourcename="${__resource.resourceName}" class="actual_resource  resourceMethodLabel">${__resource.method}</label>
                </div>
                <label data-method="${__resource.method}" data-endpoint="${__resource.endPoint}" data-resourcename="${__resource.resourceName}" class="actual_resource  resourceLabel">${__resource.resourceName}</label>
              </div>
            </div>
            `;
          });
        }
      }
    }
  }
  xhr.open('GET', `${apiendpoint}/api/resources`, true);
  xhr.send();
})();

document.addEventListener('click', (event) => {
  if(event.target.classList.contains('resourceMethod')){
    let __method = event.target.getAttribute('data-method');
    let resourceElements = document.querySelectorAll(`.resourcesContentParentDv`);
    resourceElements.forEach((element) => {
      if(element.getAttribute('data-method') == __method) element.classList.toggle('hide');
      else element.classList.add('hide');
    });
  }

  if(event.target.classList.contains('actual_resource')){
    let method = event.target.getAttribute('data-method');
    let endpoint = event.target.getAttribute('data-endpoint');
    let resourceName = event.target.getAttribute('data-resourcename');
    document.querySelector('#labelRequest_Value').textContent = endpoint;

    // TODO: if request body/headers than show in request_contentDv work pending .....
    document.querySelector('#request_contentDv').innerHTML = ``;

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        let __statusCode = this.status;
        let statusCode_Element = document.querySelector('#labelResponse_Value');
        
        if(__statusCode >= 200 && __statusCode <= 300){
          statusCode_Element.classList.add('darkGreen');
        }else if(__statusCode >= 300 && __statusCode <= 400){
          statusCode_Element.classList.add('darkOrange');
        }else{
          statusCode_Element.classList.add('darkRed');
        }
        statusCode_Element.textContent = __statusCode;
        
        let __resp = JSON.parse(this.response);
        let responseBody_Element = document.querySelector('#responseBody_tag');
        responseBody_Element.textContent = JSON.stringify(__resp, undefined, 2);
      }
    }
    xhr.open(`${method}`, `${apiendpoint}${endpoint}`, true);
    xhr.send();
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