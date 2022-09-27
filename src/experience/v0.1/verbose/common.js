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
var analyticId=0;

function addExperienceResult(UserId,PatronId,PublishedExperienceRoomMappingId,Score){
	var divhide= document.getElementById("loginForm");
     var url = baseURL+"analytics/add";
    var resultData={
        "UserId": UserId,
        "PatronId": PatronId,
        "PublishedExperienceRoomMappingId":PublishedExperienceRoomMappingId,
		"LoginType":1,
		"Score":Score
    };
 
     var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
			 var json = JSON.parse(xhttp.response);
			 analyticId=json.InsertedId;
         }
    };
    xhttp.open("POST",url,true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(resultData));
}

function addExperienceView(PatronId,PublishedExperienceRoomMappingId){
     var url = baseURL+"view";
    var resultData={
        "UserId": PatronId,
        "PublishedExperienceRoomMappingId":PublishedExperienceRoomMappingId,
		"DeviceType":1,
		"Location":""
    };
 
     var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
		
         }
    };
    xhttp.open("POST",url,true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(resultData));
}

function updateExperienceResult(StatusId,Score,TotalMarks,Result){
    var url = baseURL+"analytics/"+analyticId;
    var resultData={
		"StatusId":StatusId,
        "Score":Score,
        "TotalMarks":TotalMarks,
        "Result":Result
    };
 
     var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
         }
    };
    xhttp.open("PUT",url,true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(resultData));
}