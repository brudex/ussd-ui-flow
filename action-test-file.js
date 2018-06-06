**
 /* Created by 2016015 on 18/07/2016.
 */
var ussd_actions = require('./ussd-actions');

var testActions = {
    'airtimeTopup':{
        sessionData:{ mobile:'233246583910' },
        inputValues:{
         network:'1',
         mobile:'233246583910',
         amount:10,
         pin:'2123'
        },
        actionName: 'airtimeTopup'
    },
    'billPayment':{
        sessionData:{
            mobile:'233246583910'
        },
        inputValues:{
            network:'1',
            billAccount:'1236',
            amount:'2',
            pin:'1234'
        },
        actionName: 'billPayment'
    },
    'changePin':{
        sessionData:{ mobile:'233246583910' },
        inputValues:{
            oldpin:'1234',
            newpin1:'9632',
            newpin2:'9632'
        },
        actionName: 'changePin'
    },
    'chequeBookRequest':{
        sessionData:{ mobile:'233246583910' },
        inputValues:{
            account:'12325893',
            leaflets:'1'
        },
        actionName: 'chequeBookRequest'
    },
    'stopChequePayment':{
        sessionData:{ mobile:'233246583910' },
        inputValues:{
            chequeNo:'c123692',
            pin:'9632'
        },
        actionName: 'stopChequePayment'
    },
    'transferMobile':{
        sessionData:{
            mobile:'233246583910'
        },
        inputValues:{
            network:'1',
            mobile:'233145683910',
            amount:'2',
            pin:'9632'
        },
        actionName: 'transferMobile'
    },
    'transferZenith':{
        sessionData:{
            mobile:'233246583910'
        },
        inputValues:{
            account:'123',
            amount:'2',
            pin:'9632'
        },
        actionName: 'transferZenith'
    },
    'bankStatement':{
        sessionData:{
            mobile:'233246583910'
        },
        inputValues:{
            pin:'9632'
        },
        actionName: 'bankStatement'
    },
    'balanceEnquiry':{
        sessionData:{  mobile:'233246583910'},
        inputValues:{
            pin:'9632'
        },
        actionName: 'balanceEnquiry'
    } ,
    'atmCardRequest':{
        sessionData:{  mobile:'233246583910'},
        inputValues:{
            account:'1236985',
            cardType:'1'
        },
        actionName: 'atmCardRequest'
    },
    'openAccount':{
        sessionData:{ mobile:'233246583910'},
        inputValues: {

        },
        actionName: 'openAccount'
    },
    'registerUssdBanking':{
        sessionData:{  mobile:'233246583910'},
        inputValues: {
            account:'6090111368',
            pin1:'2123',
            pin2:'2123'
        },
        actionName: 'registerUssdBanking'
    }
};
///todo test ussd-banking registration action >>>
var testAction = testActions.registerUssdBanking;
console.log('Test action is >>>>');
console.log(testAction);
ussd_actions.handlerRequest(testAction.sessionData,testAction.inputValues,testAction.actionName,function(response){
    console.log('Ussd Response called at ...................................>>>>>>>>>>> '+ new Date() );
    console.log(response);
});