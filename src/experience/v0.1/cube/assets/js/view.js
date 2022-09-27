
var Url;
function openPreview(){
    window.open(Url, '_blank');
}

function initializePreview(experienceJSON, ExperienceName){
localStorage.setItem("ARjson",experienceJSON);
localStorage.setItem("ARExperienceName",ExperienceName);
Url = window.location.href;
Url=Url.replace("view", "preview");
alert(Url);

}