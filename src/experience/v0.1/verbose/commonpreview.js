window.onload = function() {
	var url=window.location.href;
	if(url.indexOf('?') != -1)
	{
		var splitedUrl=url.split("?");
		var parameters=splitedUrl[splitedUrl.length-1].split("&");
		var i = parameters[0].split("=")[1];
		if(parameters.length==1){
 			getPreviewData(i,false);
		}else{
			getPreviewData(i,true);
		}
		
	}
	};
	
	function getPreviewData(id,flag){
		//     var baseURL='https://alpha-dev.experizer.com/api/';
		// var baseURL='https://alpha-dev.experizer.com/api/';
		//var baseURL=' http://10.0.0.92:8764/';
		// var baseURL='https://betaapi.experizer.com:444/';
		 var baseURL = 'https://alpha-dev.experizer.com/api/';
      //   var baseURL='http://192.168.0.177:3000/';
        // var baseURL='https://betaapi.experizer.com:444/';
		
			 var xhttp = new XMLHttpRequest();
			 if(flag){
				xhttp.open("GET",baseURL+"experience/getExperience/"+id,true);
			 } else {
				xhttp.open("GET",baseURL+"experience/getPublishedExperienceById/"+id,true);
				xhttp.setRequestHeader("x-access-token", window.sessionStorage.getItem('token'));
			 }
			xhttp.setRequestHeader("Content-type", "application/json");
			xhttp.send();
			xhttp.onreadystatechange = function() {
				if(this.readyState == 4 && xhttp.response){
				var json = JSON.parse(xhttp.response);
				 if (json.status) {
						var data=json.data[0].ExperienceJSON;
						var experienceName = json.data[0].ExperienceName;
						initializePreview(data, experienceName);
				}
		}
		else{
			console.log('error while fetching data');
		}
		};
	}