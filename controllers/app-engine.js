var async = require('async');
var _ = require('lodash');
var db = require('../models');
var logger = require("../logger");
var ussd_actions = require('../ussd-actions');

function getUssdAppByShortCode(shortcode,callback){
    db.UssdApp.find({where:{shortCode:shortcode}})
        .then(function(app){
            if(app){
                callback(null,app);
            }else{
                logger.error("Application not found for short code >>>"+shortcode);
                var msg = "Invalid short code. Please check and dial again";
                logger.error("Sending Error message >>>",msg);
                callback();
            }
   });
}

function getTopMenuItemsByAppId(appId,callback){
    db.UssdMenu.findAll({where:{parentFlowId:'0',appId:appId}})
    .then(function(menuItems){
        callback(menuItems);
    });
}

function getPreviousSessionInput(sessionId,callback){
    var currentTime = new Date();
    var fiveAgo =  new Date(currentTime.getTime() + -7 *60000);
    db.UssdSession.findAll({where:{sessionId:sessionId,createdAt:{
        $gte: fiveAgo
    },expired:false},order: 'id ASC'}).then(function(sessions){
            callback(sessions);
    });
}

function buildDisplayMenu(menuItems){
    var obj ={};
    var menuLen = menuItems.length;
    if(menuLen > 0){
        obj.headerText = menuItems[0].headerText;
        obj.footerText = menuItems[0].footerText;
        var array = [];
        if(menuItems.length > 1){
            menuItems.forEach(function(item){
                array.push(item.returnValue + '. '+item.displayText);
            });
        }else{
            array = [menuItems[0].displayText];
        }
        obj.displayMenu = array;
    }
    logger.info('buildDisplayMenu returns >>> ',obj);
    return obj;
}


function buildFlowFromSession(sessionList){
    var str = '';
    for(var k= 0,len=sessionList.length;k<len;k++){
       var item = sessionList[k];
        if(k==0){
            str =  item.returnValue;
        }else{
            str += '-' +  item.returnValue;
        }
    }
    return str;
}

function getChildMenusByFlowId(flowId,appId,callback){
    db.UssdMenu.findAll({where:{parentFlowId:flowId,appId:appId}})
     .then(function(menuItems){
           callback(menuItems);
    })
}

function setSessionExpired(sessionId){
    async.parallel([function(){
        var currentTime = new Date();
        var hourAgo =  new Date(currentTime.getTime() + -60 *60000);
        db.UssdSession.update( {
                expired:true
            },
            {
                where: { sessionId : sessionId,createdAt:{
                    $gte: hourAgo
                } }
            })
            .then(function () {

            })
            .error(function (err) {
                logger.error('Error setting session as expired >>>', err);
            });
    }])
}

function findMenuItemByFlowId(menuItems,flowId){
    for(var k= 0,len=menuItems.length;k<len;k++){
       if(menuItems[k].flowId == flowId){
           return menuItems[k];
       }
    }
    return null;
}

function findChildMenusByFlowId(menuItems,flowId){
    var list =[];
    for(var k= 0,len=menuItems.length;k<len;k++){
       if(menuItems[k].parentFlowId == flowId){
           list.push(menuItems[k]);
       }
    }
    return list;
}

function getMenuItemByFlowId(flowId,appId,callback){
    db.UssdMenu.find({where:{flowId:flowId,appId:appId}})
        .then(function(menuItem){
            callback(menuItem);
    });
}


function notNumericOrGreaterThan20(input){
    if(input == '' || isNaN(input)){
        return true;
    }else{
        if(Number(input) > 20){
            return true;
        }
        return false;
    }
}

/**
 * This function is called if an input was entered which was
 * not a list input. Its main task is the following
 * set session flowId
 * set returnValue
 * return menuList array
 * */
function processItemAsNonListInput(currentSession,list,callback){
    logger.info('PROCESSING ITEM AS NON LIST INPUT >>>');
    logger.info('Current Session INPUT >>>' + currentSession.input);
    logger.info('processItemAsNonListInput Number sessions returned >>> ' + list.length);
    db.UssdMenu.findAll({where:{appId:currentSession.appId}}).then(function(menuItems){
        var slen=list.length;
        logger.info('Session length >>>',slen);
//        for(var p=0;p<slen;p++){
//            var item = list[p];
//            logger.info('SESSION ITEM INDEX IS  >>> '+ p +' ITEM INPUT >> ' + item.input + ' FLOWID IS >>' + item.flowId);
//        }
        var previousSession;
        if(slen > 1){
            logger.info('Assigning previous session >> ');
            previousSession = list[slen-2];
            logger.info('Previous session assigned as >> ',previousSession.dataValues);
        }
        var childItems;
        var currentMenuItem;
        var ussdAction = null;
        var actionMenuItem = null;
        if(previousSession.processedAsSingle){
            logger.info('Finding findChildMenusByFlowId ONLY ONCE>>> ',previousSession.flowId);
            childItems = findChildMenusByFlowId(menuItems,previousSession.flowId);
            actionMenuItem = findMenuItemByFlowId(menuItems,previousSession.flowId);
            if(childItems.length > 0){
                currentMenuItem = childItems[0];
                logger.info('The current menu Item length >>> ',childItems.length);
                currentSession.returnValue= currentMenuItem.returnValue;
                if(actionMenuItem){
                    currentSession.inputHolder = actionMenuItem.inputHolder;
                }
                currentSession.flowId = currentMenuItem.flowId;
                currentSession.processedAsSingle = true;
                logger.info('CURRENT MENUITEM FLOW ID IS >>>'+currentMenuItem.flowId);
                logger.info('CURRENT MENUITEM DISPLAY TEXT >>>'+currentMenuItem.displayText);
                currentSession.save();
            }else{
                if(actionMenuItem != null){
                    logger.info('Found findMenuItemByFlowId >>>',actionMenuItem.displayText);
                    logger.info('The previous session flowId',actionMenuItem.flowId);
                    currentSession.inputHolder = actionMenuItem.inputHolder;
                    currentSession.save();
                    ussdAction = actionMenuItem;
                    ussdAction.finalInputHolder =currentSession.inputHolder;
                }
            }
        }else{
            logger.info('Finding findChildMenusByFlowId TWO TIMES AND TWO >>> ',previousSession.flowId);
            childItems = findChildMenusByFlowId(menuItems,previousSession.flowId);
            actionMenuItem = findMenuItemByFlowId(menuItems,childItems[0].flowId);
            childItems = findChildMenusByFlowId(menuItems,childItems[0].flowId);
            if(childItems.length > 0){
                currentMenuItem = childItems[0];
                currentSession.returnValue= currentMenuItem.returnValue;
                currentSession.flowId = currentMenuItem.flowId;
                currentSession.processedAsSingle = true;
                if(actionMenuItem){
                    currentSession.inputHolder = actionMenuItem.inputHolder;
                }
                logger.info('CURRENT MENUITEM FLOW ID IS >>>'+currentMenuItem.flowId);
                logger.info('CURRENT MENUITEM DISPLAY TEXT >>>'+currentMenuItem.displayText);
                currentSession.save();
            }else{
                if(actionMenuItem != null){
                    logger.info('Found findMenuItemByFlowId >>>',actionMenuItem.displayText);
                    logger.info('The previous session flowId',actionMenuItem.flowId);
                    currentSession.inputHolder = actionMenuItem.inputHolder;
                    currentSession.save();
                    ussdAction = actionMenuItem;
                    ussdAction.finalInputHolder =currentSession.inputHolder;
                }
            }

        }
        callback(childItems,ussdAction);
    });
}

function executeUssdAction(menuItem,sessionList,callback){
    var actionPayload ={};
    actionPayload.actionName = menuItem.actionName;
    actionPayload.sessionData = sessionList[0].dataValues;
    var inputValues = {};
    var slen =sessionList.length;
    if(slen >0){
        sessionList[slen - 1].inputHolder=menuItem.finalInputHolder;
    }
    sessionList.forEach(function(item){
       inputValues[item.inputHolder] = item.input;
    });
    actionPayload.inputValues = inputValues;
    logger.info('Final Session Data sen to action >>> ',actionPayload);
    if(actionPayload.actionName){
        ussd_actions.handlerRequest(actionPayload.sessionData,actionPayload.inputValues,actionPayload.actionName,function(response){
            console.log('Ussd Returned Response from action >> ',actionPayload.actionName);
            console.log(response);
            var result ={};
            result.displayMenu = [response.message];
            result.status = response.status;
            if(response.responseType){
                result.responseType = response.responseType
            }else{
                result.responseType = 'end';
            }
            callback(result);
        });
    }else{
        var result ={};
        result.displayMenu = ['Invalid menu item selected. Action has not been assigned to this menu.'];
        result.responseType = 'end';
        callback(result);
    }
}

function getNewEngineResponse(){
    return {
        sessionData : {},
        appData :{},
        error : false,
        errorMessage:"",
        response : {
            headerText :"",
            displayMenu : [],
            footerText : "",
            responseType : "list" // "list,input,end"
        }
    };
}



function processFirstDial(app,sessionData,callback){
    var engineResponse = getNewEngineResponse();
    async.waterfall([
        function(done){
            getTopMenuItemsByAppId(app.appId,function(menuItems){
                logger.info('getTopMenuItemsByAppId Menu items count ',menuItems.length);
                done(null,menuItems);
            });
        },
        function(menuItems,done){
           //save ussd session
            sessionData.appId = app.appId;
            sessionData.flowId = '0';
            db.UssdSession.create(sessionData)
                .then(function(session){
                    logger.info('Created ussd session ',session.dataValues);
                    done(null,menuItems,session);
            });
        },
        function(menuItems,session,done){
            //perform intermediate action specified on ussd if available app e.g. check if user is registered
            logger.info('App action Id is >>>',app.actionId);
            if(app.actionId == null || app.actionId == ''){
                done(null,menuItems,session);
            }else{
                var arr = [session];
                var menuItem ={};
                menuItem.actionName = app.actionId;
                executeUssdAction(menuItem,arr,function(result){
                    if(result.status == 'FAILED' || app.terminate){
                        logger.info('Ussd intermediate action failded >>>',app.actionId);
                        engineResponse.response.displayMenu = result.displayMenu;
                        engineResponse.response.headerText = result.headerText;
                        engineResponse.response.footerText = result.footerText;
                        engineResponse.sessionData=sessionData;
                        engineResponse.error = false;
                        engineResponse.responseType = 'end';
                        done(engineResponse);
                    }else{
                        logger.info('Ussd intermediate action passed action executed >>>',app.actionId);
                        done(null,menuItems,session);
                    }
                });
            }
        },
        function(menuItems,session,done){
            if(menuItems.length > 0){ // if menu items is more we are showing a list
                logger.info('building display Menu Items ',menuItems.length);
                var display =  buildDisplayMenu(menuItems);
                logger.info('Result from buildDisplayMenu >>> ',display);
                engineResponse.response.displayMenu = display.displayMenu;
                engineResponse.response.headerText = app.headerText;
                engineResponse.response.footerText = app.footerText;
                engineResponse.sessionData=sessionData;
                engineResponse.error = false;
                engineResponse.responseType = 'list';
                engineResponse.response.headerText = app.headerText;
                engineResponse.response.footerText = app.footerText;
                done(null,engineResponse);
            }else{
                var arr = [session];
                var menuItem ={};
                menuItem.actionName = app.actionId;
                executeUssdAction(menuItem,arr,function(result){
                    engineResponse.response.displayMenu = result.displayMenu;
                    engineResponse.response.headerText = result.headerText;
                    engineResponse.response.footerText = result.footerText;
                    engineResponse.sessionData=sessionData;
                    engineResponse.error = false;
                    engineResponse.responseType = result.responseType;
                    done(null,engineResponse)
                });
            }
        }
    ],function(done){
        logger.info('First Dial final callback response >>>> ',engineResponse);
        return callback(engineResponse);
    });
}


function handleRequest(requestData,callback){
    var engineResponse = getNewEngineResponse();
    logger.info("Ussd Request >>> ", requestData);
    async.waterfall([function(done){
       if(requestData.isFirstDial){
             getUssdAppByShortCode(requestData.input,function(err,app){
               if(err){
                   engineResponse.error = true;
                   engineResponse.errorMessage = err;
                   logger.info('Ussd short code error >>> ',err);
                   return callback(engineResponse);
               }else{
                 logger.info('Processing first dial ');
                   requestData.returnValue = '0';
                 return processFirstDial(app,requestData,function(response){
                     logger.info('First dial processed response >>>> ',response);
                      callback(response);
                  })
               }
           })
       }else{
           getUssdAppByShortCode(requestData.serviceCode,function(err,app){
               if(err){
                   engineResponse.error = true;
                   engineResponse.errorMessage = err;
                   logger.info('Ussd short code error >>> ',err);
                   setSessionExpired(requestData.sessionId);
                   return callback(engineResponse);
               }else{
                   requestData.returnValue = requestData.input;
                   requestData.appId = app.appId;
                   db.UssdSession.create(requestData)
                       .then(function(session){
                           done(null,session);
                       });
               }
           })

       }
    },
     function(currentSession,done) {
         getPreviousSessionInput(requestData.sessionId, function (list) {
             logger.info('getPreviousSessionInput count >> ', list.length);
             done(null,currentSession, list);
         });
     },
     function(currentSession,list,done){
         if(notNumericOrGreaterThan20(currentSession.input)){
             logger.info('notNumericOrGreaterThan20 >> processItemAsNonListInput ');
                processItemAsNonListInput(currentSession,list,function(childMenuList,ussdAction){
                    logger.info('Request processed as non-list input >>> ',childMenuList.length);
                    if(ussdAction || childMenuList.length > 0){
                        done(null,childMenuList,list,ussdAction);
                    } else{
                        engineResponse.error = true;
                        engineResponse.errorMessage = 'Invalid option selected';
                        logger.info('Invalid menu Item selected  >>> ');
                        setSessionExpired(requestData.sessionId);
                        return callback(engineResponse);
                    }
                });
         }else{
             var flowId = buildFlowFromSession(list);
             logger.info('BUILT FLOW ID VALUE  >> buildFlowFromSession ' +flowId);
             getMenuItemByFlowId(flowId,currentSession.appId,function(menuItem){
                 if(menuItem){
                     logger.info('MenuItem found for getMenuItemByFlowId >>>',menuItem.dataValues);
                     logger.info('Result from buildFlowFromSession >>> ',flowId);
                     currentSession.inputHolder = menuItem.inputHolder;
                     currentSession.flowId = flowId;
                     currentSession.save();
                     getChildMenusByFlowId(flowId,menuItem.appId,function(childMenuList){
                         logger.info('child menu list count >>> ',childMenuList.length);
                         if(childMenuList.length > 0){
                             done(null,childMenuList,list,null);
                         }else{
                             processItemAsNonListInput(currentSession,list,function(childMenuList,ussdAction){
                                 logger.info('Request processed as non-list input >>> ',childMenuList.length);
                                 logger.info('The ussd action to execute is afer fiding childmenus by flowid  >>> ',ussdAction);
                                 if(ussdAction || childMenuList.length > 0){
                                     done(null,childMenuList,list,ussdAction);
                                 } else{
                                     engineResponse.error = true;
                                     engineResponse.errorMessage = 'Invalid option selected';
                                     logger.info('Invalid menu Item selected  >>> ');
                                     setSessionExpired(requestData.sessionId);
                                     return callback(engineResponse);
                                 }
                             });
                         }
                     });
                 }else{
                     logger.info('NO MATCHING MENUITEM FOUND processing as non-list input >>> '+flowId);
                     processItemAsNonListInput(currentSession,list,function(childMenuList,ussdAction){
                         logger.info('Request processed as non-list input >>> ',childMenuList.length);
                         logger.info('The ussd action to execute is >>> ',ussdAction);
                         if(ussdAction || childMenuList.length > 0){
                             done(null,childMenuList,list,ussdAction);
                         } else{
                                 engineResponse.error = true;
                                 engineResponse.errorMessage = 'Invalid option selected';
                                 logger.info('Invalid menu Item selected  >>> ');
                                 setSessionExpired(requestData.sessionId);
                                 return callback(engineResponse);
                         }
                     });
                 }
             });
         }
     },
      function (childMenuList,sessionList,ussdAction,done){
          if(ussdAction){
              logger.info('Processing ussd Action  >>> ',ussdAction.actionName);

              if(ussdAction.actionName != null || ussdAction.actionName !== ''){
                  executeUssdAction(ussdAction,sessionList,function(result){
                      sendDisplayMenu(result,function(builtResponse){
                          done(null,builtResponse);
                      });
                  });
              }else{
                  var result ={};
                  result.displayMenu =['There is no action attached to this ussd Menu. Invalid menu item selected'];
                  result.error = false;
                  result.responseType='end';
              }
          }else{
            // if menu items is more we are showing a list
              if(childMenuList.length == 1 && (childMenuList[0].actionName != null && childMenuList[0].actionName === '')){
                  executeUssdAction(childMenuList[0],sessionList,function(result){
                      sendDisplayMenu(result,function(builtResponse){
                          done(null,builtResponse);
                      });
                  });
              }else{
                  var display =  buildDisplayMenu(childMenuList);
                  sendDisplayMenu(display,function(builtResponse){
                      done(null,builtResponse);
                  });
              }
          }
      }
    ],function(finalResponse){
        logger.info('Sending successful final response from engine >>> ',finalResponse);
        callback(engineResponse);
    });

    function sendDisplayMenu(display,callback){
        engineResponse.response.displayMenu = display.displayMenu;
        engineResponse.response.headerText = display.headerText;
        engineResponse.response.footerText = display.footerText;
        engineResponse.sessionData = requestData;
        engineResponse.error= false;
        engineResponse.responseType = 'list';
        callback(engineResponse);
    }

}


module.exports  ={
    handleRequest :handleRequest
};