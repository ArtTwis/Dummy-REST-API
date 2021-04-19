const apiendpoint = 'http://localhost:1818';
const bodyObject = {};

(function(){
  let requestBody_tag = document.querySelector('#requestBody_tag');
  setContainerSize(requestBody_tag);

  let responseBody_Tag = document.querySelector('#responseBody_tag');
  setContainerSize(responseBody_Tag);

  let JQuery_requestElement = document.querySelector('#JQuery_requestElement');
  let jQuery_requestCode = `$.ajax({
    url: "https://fakerestapi.in/api/users",
    type: "POST",
    data: {
      "name": "Pankaj Aggarwal",
      "job": "Team Leader"
    },
    success: function(response){
        console.log(response);
    }
  });`;
  setTextToPreTag(JQuery_requestElement, jQuery_requestCode);

  let JQuery_responseElement = document.querySelector('#JQuery_responseElement');
  let JQuery_responseCode = `
  {
    "name": "Pankaj Aggarwal",
    "job": "Team Leader",
    "status": "success",
    "message": "User created successfully",
    "createdAt": "Sat, 17 Apr 2021 20:36:23 GMT"
  }`;
  setTextToPreTag(JQuery_responseElement, JQuery_responseCode);

  let Javascript_requestElement = document.querySelector('#Javascript_requestElement');
  let Javascript_requestCode = `
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:1818/api/resources/todos/6", true);
  xhr.onload = function(){
      console.log(xhr.response);
  };
  xhr.send();`;
  setTextToPreTag(Javascript_requestElement, Javascript_requestCode);

  let Javascript_responseElement = document.querySelector('#Javascript_responseElement');
  let Javascript_responseCode = `
  {
    "total_todos": 1,
    "data": [
      {
        "id": 6,
        "userid": "11141XX14",
        "title": "Recharge dad's mobile",
        "isCompleted": "true"
      }
    ]
  }`;
  setTextToPreTag(Javascript_responseElement, Javascript_responseCode);  
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
        let count = 0;
        for(let resource of __response.data){
          resourceContainer.innerHTML += `
          <div data-method="${resource.method}" class="resourceMethod resourcesMethodDv">
            <label data-method="${resource.method}" class="resourceMethod flex justify-center align-center">${resource.method}</label>
          </div>
          `;

          (resource.list).forEach((__resource) => {
            if(__resource.id) bodyObject[__resource.id] = __resource.body;
            resourceContainer.innerHTML += `
            <div data-id="${setIdAttribute(__resource)}" data-method="${__resource.method}" data-endpoint="${__resource.endPoint}" data-resourcename="${__resource.resourceName}" class="${checkZero(count)} actual_resource resourcesContentParentDv flex justify-center align-center">
              <div data-id="${setIdAttribute(__resource)}" data-method="${__resource.method}" data-endpoint="${__resource.endPoint}" data-resourcename="${__resource.resourceName}" class="actual_resource  resourcesContentDv">
                <div data-id="${setIdAttribute(__resource)}" data-method="${__resource.method}" data-endpoint="${__resource.endPoint}" data-resourcename="${__resource.resourceName}" class="actual_resource  resourceMethodDv flex justify-center align-center">
                  <label data-id="${setIdAttribute(__resource)}" data-method="${__resource.method}" data-endpoint="${__resource.endPoint}" data-resourcename="${__resource.resourceName}" class="actual_resource  resourceMethodLabel">${__resource.method}</label>
                </div>
                <label data-id="${setIdAttribute(__resource)}" data-method="${__resource.method}" data-endpoint="${__resource.endPoint}" data-resourcename="${__resource.resourceName}" class="actual_resource  resourceLabel">${__resource.resourceName}</label>
              </div>
            </div>
            `;
          });

          count += 1;
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
    let id = event.target.getAttribute('data-id');
    document.querySelector('#labelRequest_Value').textContent = endpoint;
    document.querySelector('#labelRequest_Value').setAttribute('data-url', apiendpoint + endpoint);

    let requestBody_tag = document.querySelector('#requestBody_tag');
    if(id != "null"){
      requestBody_tag.classList.remove('hidden');
      requestBody_tag.textContent = JSON.stringify(bodyObject[id], undefined, 2);
    }else{
      requestBody_tag.classList.add('hidden');
      requestBody_tag.textContent = '';
    }

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      
      if (this.readyState == 4) {
        let statusCode_Element = document.querySelector('#labelResponse_Value');
        let responseBody_Element = document.querySelector('#responseBody_tag');
        statusCode_Element.textContent = '';
        responseBody_Element.textContent = '';

        let __statusCode = this.status;
        if(__statusCode >= 200 && __statusCode <= 300){
          statusCode_Element.classList.add('darkGreen');
          statusCode_Element.classList.remove('darkOrange');
          statusCode_Element.classList.remove('darkRed');
        }else if(__statusCode >= 300 && __statusCode <= 400){
          statusCode_Element.classList.add('darkOrange');
          statusCode_Element.classList.remove('darkGreen');
          statusCode_Element.classList.remove('darkRed');
        }else{
          statusCode_Element.classList.add('darkRed');
          statusCode_Element.classList.remove('darkGreen');
          statusCode_Element.classList.remove('darkOrange');
        }
        statusCode_Element.textContent = __statusCode;
        
        let __resp = JSON.parse(this.response);
        responseBody_Element.classList.remove('hidden');
        responseBody_Element.textContent = JSON.stringify(__resp, undefined, 2);
      }
    }
    xhr.open(`${method}`, `${apiendpoint}${endpoint}`, true);
    if(id != "null"){
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(bodyObject[`${id}`]));
    }else{
      xhr.send();
    }
  }

  if(event.target.id == "labelRequest_Value"){
    copyToClipboard('labelRequest_Value', 'data-url', true);
  }

  if(event.target.id == "responseBody_tag"){
    copyToClipboard('responseBody_tag', '', false);
  }

  if(event.target.id == "requestBody_tag"){
    copyToClipboard('requestBody_tag', '', false);
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

function copyToClipboard(elementID, dataAttribute, boolValue){
  if(boolValue)
   text = document.querySelector(`#${elementID}`).getAttribute(`${dataAttribute}`);
  else
    text = document.querySelector(`#${elementID}`).textContent;
  const randomElement = document.createElement('textarea');
  randomElement.classList.add('randomElement');
  randomElement.textContent = text;
  document.body.appendChild(randomElement);
  randomElement.select();
  document.execCommand('copy');
  document.body.removeChild(randomElement);
  document.querySelector('#messageBox').style.visibility = "visible";
  setTimeout(() => {
    document.querySelector('#messageBox').style.visibility = "hidden"; 
  }, 2000);
}

function setIdAttribute(__resp){
  if(__resp.id)
   return __resp.id;
  else
    return null;
}

function checkZero(count){
  if(count>0) return "hide";
}

function setTextToPreTag(elementId, code){
  elementId.textContent = code;
}