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
var TrackingData = function() { };
TrackingData.prototype = {

  setData(xApiEnabled, trackingEnabled) {
    this.xApiEnabled = xApiEnabled;
    this.trackingEnabled = trackingEnabled;
  },
  setActorText(actor) {
    this.actor = actor;
  },
  setVerbText(verb) {
    this.verb = verb;
  },
  setObjectText(objectText) {
    this.objectText = objectText;
  },
  setVerbId(verbId){
	  this.verbId=verbId;
  },
  getVerbId() {
    return this.verbId;
  },
  setObjectId(objectId){
	  this.objectId=objectId;
  },
  getObjectId() {
    return this.objectId;
  },
  getDataXApiEnabled() {
    return this.xApiEnabled;
  },
  getDataTrackingEnabled() {
    return this.trackingEnabled;
  },
  getActorText() {
    return this.actor;
  },
  getVerbText() {
    return this.verb;
  },
  getObjectText() {
    return this.objectText;
  },
  callToApi(data) {
    if (this.xApiEnabled == true) {
      
    }
    if (this.trackingEnabled == true) {
      var http = new XMLHttpRequest();
     // var url = 'https://betaapi.experizer.com:444/verbose/add';
      var url = 'https://alpha-dev.experizer.com/api/verbose/add';
      var paramaters = JSON.stringify(data);
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.onreadystatechange = function() {//Call a function when the state changes.
          if(http.readyState == 4 && http.status == 200) {
              //alert(http.responseText);
          }
      }
      http.send(paramaters);
    }
  }

};

let xApiEnabledFlag = true;
let trackingEnabledFlag = true;
var callToTacking = new TrackingData();
callToTacking.setData(xApiEnabledFlag, trackingEnabledFlag);
callToTacking.setActorText("sanket tikam");
let xApiEnabled = callToTacking.getDataXApiEnabled();
let trackingEnabled = callToTacking.getDataTrackingEnabled();
if (callToTacking.getDataXApiEnabled() == false) {
  callToTacking.callToApi();
}



/*let xApiEnabled = true;
let trackingEnabled = true;
var callToTacking = new TrackingData();
callToTacking.setData(xApiEnabled, trackingEnabled);
callToTacking.callToApi();*/