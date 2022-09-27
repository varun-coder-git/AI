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
var tincan="";
function IntializeXapi(){   
if (xApiEnabled == true) {
       if (! window.JSON) {
        window.JSON = {
          parse: function (sJSON) {
            /*jslint evil: true */
            return eval("(" + sJSON + ")");
          },
          stringify: function (vContent) {
            var sOutput = "",
            nId,
            sProp
            ;
            if (vContent instanceof Object) {
              if (vContent.constructor === Array) {
                for (nId = 0; nId < vContent.length; nId += 1) {
                  sOutput += this.stringify(vContent[nId]) + ",";
                }
                return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
              }
              if (vContent.toString !== Object.prototype.toString) { return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\""; }
              for (sProp in vContent) {
                if (vContent.hasOwnProperty(sProp)) {
                  sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ",";
                }
              }
              return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
            }
            return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
          }
        };
      }

      /* Set up TinCanJS */
       tincan = new TinCan (
      {
        recordStores: [
        {
          endpoint: Config.endpoint,
          username: Config.authUser,
          password: Config.authPassword,
          allowFail: false
        }
        ]
      }
      );
    }
  }
	function sendVerboseToXapi(verbText,verbId, objectText,objectType,activityId, objectType, objectTypeText){
      if (xApiEnabled == true) {
		  IntializeXapi();
        var PROTOTYPE_SHOW_CONFIG_INFO = true;
        var PROTOTYPE_DEFAULT_NAME = Config.actor.name;
        var PROTOTYPE_DEFAULT_MBOX = Config.actor.mbox;
        var PROTOTYPE_ENDPOINT = Config.endpoint;
        var PROTOTYPE_AUTH = 'Basic ' + Base64.encode(Config.authUser + ':' + Config.authPassword);
        var PROTOTYPE_REGISTRATION = Config.registration || TinCan.Utils.getUUID();
        var nm = Config.actor.name;
        var em = Config.actor.mbox;
        var mbox = (em.indexOf('mailto:') == 0) ? em : 'mailto:' + em;
        var actor = {'mbox' : mbox, 'name' : nm};
        PROTOTYPE_REGISTRATION = TinCan.Utils.getUUID();
		  sendLaunchedStatement(actor, verbText, verbId, objectType, objectText, activityId, objectType, objectTypeText, PROTOTYPE_REGISTRATION);
          $(this).attr('href',$(this).attr('data-baseref')
            + "endpoint=" + encodeURIComponent(PROTOTYPE_ENDPOINT)
            + "&auth=" + encodeURIComponent(PROTOTYPE_AUTH)
            + "&actor=" +encodeURIComponent(JSON.stringify(actor))
            + "&registration=" +encodeURIComponent(PROTOTYPE_REGISTRATION));

          return true;
        }
      }

    function sendLaunchedStatement (actor, verbText, verbId, objectType, objectText, activityId, objectType, objectTypeText, registration) {
      if (xApiEnabled == true) { 
		   tincan.sendStatement(
        {
          actor: actor,
          verb: {
            id: verbId,
            display: {
              "en-US": verbText
            }
          },
          object: {
			objectType: objectTypeText,
            id: activityId,
			  definition: {
				type: objectType,
				name: {
				  "en-US": objectText
				},
				description: {
				  "en-US": objectText
				}
			  }
          },
          context: {
            registration: registration
          }
        }, 
        function (err, xhr) {}
        );
      }
    }

// record the results of a question

function sendQuestionAnswerVerboseToXapi(verbText,verbId , objectId, questionText, questionChoices, questionType, learnerResponse, correctAnswer, wasCorrect){

      if (xApiEnabled == true) {
		  IntializeXapi();
        var PROTOTYPE_SHOW_CONFIG_INFO = true;
        var PROTOTYPE_DEFAULT_NAME = Config.actor.name;
        var PROTOTYPE_DEFAULT_MBOX = Config.actor.mbox;
        var PROTOTYPE_ENDPOINT = Config.endpoint;
        var PROTOTYPE_AUTH = 'Basic ' + Base64.encode(Config.authUser + ':' + Config.authPassword);
        var PROTOTYPE_REGISTRATION = Config.registration || TinCan.Utils.getUUID();
        var nm = Config.actor.name;
        var em = Config.actor.mbox;
        var mbox = (em.indexOf('mailto:') == 0) ? em : 'mailto:' + em;
        var actor = {'mbox' : mbox, 'name' : nm};
        PROTOTYPE_REGISTRATION = TinCan.Utils.getUUID();
		  GetQuestionAnswerStatement(actor, verbText, verbId , objectId, questionText, questionChoices, questionType, learnerResponse, correctAnswer, wasCorrect, PROTOTYPE_REGISTRATION);
          $(this).attr('href',$(this).attr('data-baseref')
            + "endpoint=" + encodeURIComponent(PROTOTYPE_ENDPOINT)
            + "&auth=" + encodeURIComponent(PROTOTYPE_AUTH)
            + "&actor=" +encodeURIComponent(JSON.stringify(actor))
            + "&registration=" +encodeURIComponent(PROTOTYPE_REGISTRATION));

          return true;
        }
      }

        function GetQuestionAnswerStatement(actor, verbText, verbId, objectId, questionText, questionChoices, questionType, learnerResponse, correctAnswer, wasCorrect, registration){
            if (typeof console !== 'undefined') {
           
            }
            strCorrectAnswer = String(correctAnswer);
            //send question info
            var qObj = {
                id: objectId,
                definition: {
                    type: "http://adlnet.gov/expapi/activities/cmi.interaction",
					name: {
					  "en-US": questionText
					},
                    description: {
                        "en-US": questionText
                    },
                    interactionType: questionType,
                    correctResponsesPattern: [
                        strCorrectAnswer
                    ]
                }
            };
            //format numeric response pattern.
            if (qObj.definition.interactionType == "numeric"){
                qObj.definition.correctResponsesPattern[0] = strCorrectAnswer + "[:]" + strCorrectAnswer;
            }
            if (questionChoices !== null && questionChoices.length > 0) {
                var choices = [];
			
                for (var i = 0; i < questionChoices.length; i++) {
                    var choice = questionChoices[i].option;
                    choices.push(
                        {
                            id: choice.replace(/\s+/g, '-'),
                            description: {
                                "en-US": choice
                            }
                        }
                    );
                }
                if (typeof console !== 'undefined') {

                }
                qObj.definition.choices = choices;
                qObj.definition.correctResponsesPattern = [
                    correctAnswer.replace(/\s+/g, '-')
                ];
                learnerResponse = learnerResponse.replace(/\s+/g, '-');
            }
             tincan.sendStatement({
				actor: actor,
			  	verb: {
					id: verbId,
					display: {
					"en-US": verbText
					}
				},
                object: qObj,
                result: {
                    response: learnerResponse,
                    success: wasCorrect
                },
			    context: {
				 registration: registration
			   }
            }, 
        	function (err, xhr) {});
        }