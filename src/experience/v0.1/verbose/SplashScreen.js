 /*************************************************************************
 * 
 * EQUATIONS WORK CONFIDENTIAL
 * __________________
 * 
 *  [2018] - [2020] Equations Work IT Services Private Limited, India
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Equations Work IT Services Private Limited and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Equations Work IT Services Private Limited
 * and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Equations Work IT Services Private Limited.
*
 * Copyright (C) Equations Work IT Services Pvt. Ltd.
 * NOTE: Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Owned and written by the proprietors of Equations Work IT Private Limited, India, August 2018
 */
var startExperienteBtn = document.getElementById('start_experience');
var flag=0;
var ascene;
var camera;
 $('#start_experience').click( function(){
   
var userAgent = navigator.userAgent;
if ( userAgent.includes("ipad") || userAgent.includes("iPhone")) {

  if (typeof DeviceMotionEvent.requestPermission === 'function') {
      // iOS 13+
      DeviceMotionEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        window.addEventListener('devicemotion', (e) => {
          // do something with e
        })
      }
    })
    .catch(console.error)
    
    DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        window.addEventListener('deviceorientation', (e) => {
          // do something with 
        })
      }
    })
    .catch(console.error)
    
    } else {
      // non iOS 13+
    }
  }
    ascene.style.zIndex = 'auto';
	document.getElementById('container').style.display="none";
    document.getElementById('loaderq').style.display="none";
    experienceStarted=true;
    countdown();
    if(mode=='EXP'){
        document.querySelector('a-scene').enterVR();
    }
});
//var baseURL='https://betaapi.experizer.com:444/';
var baseURL='https://alpha-dev.experizer.com/api/';
var url=window.location.href;
var splitedUrl=url.split("?");
var splitedParameters=splitedUrl[splitedUrl.length-1].split("/");
var parameters=splitedParameters[0].split("--");

var mode = parameters[2]; 
var experienceID =parameters[0];
var userID =parameters[1];   
var token = parameters[3];
for(var i=4;i<parameters.length;i++){
    token=token+"--"+parameters[i];
}   
if(mode=="360")
    token=window.sessionStorage.getItem('token');
    
var url1 = baseURL+"experience/getExperienceJSONById/"+experienceID;   
    var jsonData={
         "token": token
    };
     var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function() {
        if(xhttp1.readyState === 4){
         if(xhttp1.response){
             var json = JSON.parse(xhttp1.response);
            if (json.status) {
                var responseJSON=Base64.decode(json.data);
                if(responseJSON!='[]'){
                var data=JSON.parse(JSON.parse(responseJSON)[0].ExperienceJSON); 
                loadExperience(data,JSON.parse(responseJSON)[0].ExperienceName);
            } else{
             var body= document.getElementById('info');
              $("#innerInfo").addClass("hidden-login");
             body.classList.add('content-blur');
             $("a-scene").remove();
             stop();  
             alert("Either the Experience or Room is Off.");
             $("#myDiv").css("display","block");
             window.close();             
            }
        }
         }
        }
    };
    xhttp1.open("GET",url1,true);
    xhttp1.setRequestHeader("Content-type", "application/json");
    xhttp1.send(JSON.stringify(jsonData));

$( document ).ready(function() {
      ascene=  document.querySelector('a-scene');
      camera= document.querySelector('[camera]');
});
        $("#loaderq").addClass("hidden-login");
        $("#innerInfo").removeClass("hidden-login");

	  document.getElementById("loginForm").style.display="none";

if(token=="0"|| token==undefined || userID=="0" || userID==undefined){
     var url1 = baseURL+"experience/getExperienceDataOfOpenExperience/"+experienceID;   
    var jsonData={
         "token": token
    };
     var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState === 4){
         if(xhttp.response){
             var json = JSON.parse(xhttp.response);
         if (json.status) {
			  var data=JSON.parse(json.data[0].ExperienceJSON);   
		  document.getElementById("loginForm").style.display="none";
        //  document.getElementById("info").style.display="flex";
		 
		 loggedin = true;
	
			 assignVerboseData(json.data[0]);
         }
        else{
            if(mode!='EXP' || mode!='360'){
            var loginBody= document.getElementById("logoTop");
            loginBody.classList.contains("logo-center-top");
            loginBody.classList.remove("logo-center-top");
            loginBody.classList.add("logo-center-top-login");
            buttonBody=document.getElementById("buttonTop");
            buttonBody.classList.contains("button-center-top");
            buttonBody.classList.remove("button-center-top");
            buttonBody.classList.add("button-center-top-login");
            document.getElementById("loginForm").style.display="flex";
            
         document.getElementById("start_experience").style.display="none";
			document.querySelector('[camera]').removeAttribute('wasd-controls');
	 		document.querySelector('[camera]').removeAttribute('keyboard-controls');
            }
                }
         }
        }
    };
    xhttp.open("GET",url1,true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(jsonData));
}
else{
      var url1 = baseURL+"experience/getPublishedExperienceByUserIdAndExperiencedId/"+experienceID+"/"+userID;   
     var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState === 4)
        {
        if(xhttp.response){
            var json = JSON.parse(xhttp.response);
         if (json.status) {
            var data=JSON.parse(json.data[0].ExperienceJSON);
      
         document.getElementById("loginForm").style.display="none";
	
		   loggedin = true;
			
			 assignVerboseData(json.data[0]);
             
         }else{   
            if(mode!='EXP' || mode!='360'){
            var loginBody= document.getElementById("logoTop");
            loginBody.classList.contains("logo-center-top");
            loginBody.classList.remove("logo-center-top");
            loginBody.classList.add("logo-center-top-login");
            buttonBody=document.getElementById("buttonTop");
            buttonBody.classList.contains("button-center-top");
            buttonBody.classList.remove("button-center-top");
            buttonBody.classList.add("button-center-top-login");
             $("#loaderq").addClass("hidden-login");
             $("#innerInfo").removeClass("hidden-login");
             document.getElementById("loginForm").style.display="flex";
             
         document.getElementById("start_experience").style.display="none";
			 document.querySelector('[camera]').removeAttribute('wasd-controls');
	 		document.querySelector('[camera]').removeAttribute('keyboard-controls');
            }
        }
        }
    }
    };
	    var jsonData={
         "token": token
    };
    xhttp.open("GET",url1,true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-access-token", token);
    xhttp.send(JSON.stringify(jsonData));
}
function UserLogin(loginType, email = null){
	
     var divhide= document.getElementById("loginForm");
     var url = baseURL+"user/patronWebLogin";
     if(loginType == 1) {
      var emaild =document.getElementById("email").value;
      var psw =document.getElementById("psw").value;
     } else if(loginType == 2) {
        var emaild =email;
        var psw ='';
     }
    
    var loginData={
         "UserName": emaild,
        "Password": psw,
        "ExperienceId":experienceID,
        "LoginType": loginType
    };
    
    
     var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
			var json = JSON.parse(xhttp.response);
			 if(json.status){
				var data=JSON.parse(json.data[0].ExperienceJSON);
          document.getElementById("loginForm").style.display="none";
          document.getElementById("start_experience").style.display="initial";
				// document.getElementById("info").style.display="flex";
				loggedin = true;
			
				assignVerboseData(json.data[0]);
			 } else {
				 alert(json.message);
			 }
         }else if(this.readyState == 4){
			 var json = JSON.parse(xhttp.response);
			 alert(json.message);
		 }
    };
    xhttp.open("POST",url,true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(loginData));
}

var startexp = function(){
    var start= document.getElementById("start_experience");
    if(assetsLoaded && loggedin){
      $("#loading").addClass("disabled");
               if(start.classList.contains("disabled")){
                    start.classList.remove("disabled");
                    // var urlParams=new URLSearchParams(window.location.href)
                    // var noSplash=urlParams.get('splash');
                    
                    // if(noSplash==0){
                    // start.click()
                    // }
                    clearTimeout(timer);

    }
    } 
}
    // }
 var timer =  setInterval(startexp,500);
    var assetsLoaded = false;
var loggedin = false;
 $(window).on('load', function() {
                setTimeout(function () { 
                 assetsLoaded = true;  
                 document.querySelector('[camera]').removeAttribute('keyboard-controls');
			    }, 3000);   

                /*var linkedIn = document.createElement("script");
                linkedIn.type = "text/javascript";
                linkedIn.src = "http://platform.linkedin.com/in.js";
                linkedIn.innerHTML = "\n"+
                    "api_key: 81ak63lvx88plu\n" +
                    "authorize: true\n" +
                    "scope: r_basicprofile r_emailaddress";
                document.head.appendChild(linkedIn);*/
})

var SocialLoginDetail = [];
//Google login
function onLoadGoogleCallback(){
  gapi.load('auth2', function() {
    auth2 = gapi.auth2.init({
      client_id: '227903861079-q9gj2q8n6p1qmfkoo6eec1esqhq6p9u7.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: 'profile'
    });

    auth2.attachClickHandler(element, {},
      function(googleUser) {
        SocialLoginDetail['name'] = googleUser.getBasicProfile().getName();
        SocialLoginDetail['email'] = googleUser.getBasicProfile().getEmail();
        SocialLoginDetail['token'] = googleUser.getAuthResponse(true).access_token;
        UserLogin(2, googleUser.getBasicProfile().getEmail());
      }, function(error) {
        console.log('Sign-in error', error);
      }
      );
  });

  element = document.getElementById('googleSignIn');
}


//LinkedIn login
function drawUserCustom(userData) {
  SocialLoginDetail['name'] = userData.firstName + ' ' + userData.lastName;
  SocialLoginDetail['email'] = userData.emailAddress;
  SocialLoginDetail['token'] = IN.ENV.auth.oauth_token;
  UserLogin(2, SocialLoginDetail['email']);
  return SocialLoginDetail;
}
function onLinkedInLoadCustom() {
  var _this = this;

  return new Promise(function (resolve, reject) {
    IN.User.authorize(function () {
      IN.API.Raw('/people/~:(id,first-name,last-name,email-address)').result(function (res) {
        resolve(_this.drawUserCustom(res));
      });
    });
  });
}

//Facebook Login
window.fbAsyncInit = function () {
  FB.init({
    appId: '508934892904302',
    status: true,
    cookie: true,
    xfbml: true
  });
};

(function (doc) {
  var js;
  var id = 'facebook-jssdk';
  var ref = doc.getElementsByTagName('script')[0];
  if (doc.getElementById(id)) {
    return;
  }
  js = doc.createElement('script');
  js.id = id;
  js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));

function facebookLogin() {
  FB.login(function (response) {
    if (response.authResponse) {
      var access_token =   FB.getAuthResponse()['accessToken'];
      FB.api('/me?fields=name,email,picture', function (response) {
        SocialLoginDetail['name'] = response.name;
        SocialLoginDetail['email'] = response.email;
        SocialLoginDetail['token'] = access_token;
        UserLogin(2, SocialLoginDetail['email']);      
      });
    } else {
      console.log("Login attempt failed!");
    }
  }, { scope: 'email,public_profile' });
}


