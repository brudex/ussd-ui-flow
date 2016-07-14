var _ = require('lodash');

var html = '<li class="dd-item dd3-item" id="li-ca1e3939-d8d9-2841-9d09-01c972c5919f" ' +
    'data-id="ca1e3939-d8d9-2841-9d09-01c972c5919f"><button data-action="collapse" type="button">' +
    'Collapse</button><button data-action="expand" type="button" style="display: none;">Expand</button>' +
    ' <div class="dd-handle dd3-handle">Drag</div><div class="dd3-content"><b><em>1</em> undefined</b>' +
    '<span class="crud-buttons pull-right" style="margin-top: -4px;" data-id="ca1e3939-d8d9-2841-9d09-01c972c5919f">' +
    '<span class="btn btn-xs btn-warning add"><i class="glyphicon glyphicon-plus"></i></span> ' +
    '<span class="btn btn-xs btn-primary edit"><i class="glyphicon glyphicon-pencil"></i></span> ' +
    '<span class="btn btn-xs btn-danger delete"><i class="glyphicon glyphicon-remove"></i></span>  ' +
    '</span></div>' +
    '<ol class="dd-list"><li class="dd-item dd3-item" id="li-2e489e68-43fe-c110-c338-b9621ff212e9" ' +
    'data-id="2e489e68-43fe-c110-c338-b9621ff212e9"> <div class="dd-handle dd3-handle">Drag</div><div ' +
    'class="dd3-content"><b><em>2</em> undefined</b><span class="crud-buttons pull-right" ' +
    'style="margin-top: -4px;" data-id="2e489e68-43fe-c110-c338-b9621ff212e9"><span class="btn btn-xs btn-warning add">' +
    '<i class="glyphicon glyphicon-plus"></i></span> <span class="btn btn-xs btn-primary edit">' +
    '<i class="glyphicon glyphicon-pencil"></i></span> <span class="btn btn-xs btn-danger delete">' +
    '<i class="glyphicon glyphicon-remove"></i></span>  </span></div></li>' +
    '</ol></li>';

/**
 * Created by 2016015 on 16/06/2016.
 */
var menuItems =[
    {
        "displayItem":"level 1",
        "returnValue":1,
        "variableHolder":"another1",
        "uniqueId":"cdb3f179-0f87-77e5-fb9d-ad25187aea3e"
    },
    {
        "displayItem":"level 2",
        "returnValue":2,
        "variableHolder":"another2",
        "uniqueId":"d2093c6e-a019-55eb-87ca-80194a0e3a0e"
    },
    {
        "displayItem":"level 3",
        "returnValue":3,
        "variableHolder":"another3",
        "uniqueId":"599eb2b3-40e2-1834-09ed-05b0b601e868"
    },
    {
        "displayItem":"level 4",
        "returnValue":4,
        "variableHolder":"another4",
        "uniqueId":"68a901bb-4707-1d75-48e1-8ff4749bf810"
    },
    {
        "displayItem":"level 1",
        "returnValue":5,
        "variableHolder":"another5",
        "uniqueId":"ec26c46b-0f09-2651-3f81-f0746c696b33"
    },
    {
        "displayItem":"level 1",
        "returnValue":6,
        "variableHolder":"another6",
        "uniqueId":"4c4f4820-f821-2640-44e1-3b67b8823b8e"
    },
    {
        "displayItem":"level 2",
        "returnValue":7,
        "variableHolder":"another7",
        "uniqueId":"aa2ac7bc-ed9c-b238-bb23-4e7f71636968"
    }
];
 var  menuFlow=[
    {
        "id":"cdb3f179-0f87-77e5-fb9d-ad25187aea3e",
        "children":[
            {
                "id":"d2093c6e-a019-55eb-87ca-80194a0e3a0e",
                "children":[
                    {
                        "id":"599eb2b3-40e2-1834-09ed-05b0b601e868",
                        "children":[
                            {
                                "id":"68a901bb-4707-1d75-48e1-8ff4749bf810"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id":"ec26c46b-0f09-2651-3f81-f0746c696b33"
    },
    {
        "id":"4c4f4820-f821-2640-44e1-3b67b8823b8e",
        "children":[
            {
                "id":"aa2ac7bc-ed9c-b238-bb23-4e7f71636968"
            }
        ]
    }
];

//
//var modifiedItems =[];
//var levelTree='0';
//traverse(levelTree,menuFlow);


function traverse(str,menuFlow){

    for( var p= 0,len=menuFlow.length;p<len;p++){
        var obj =menuFlow[p];
//        console.log("Object is >>>");
//        console.log(obj);
        var item = _.find(menuItems, { 'uniqueId': obj.id });
//        console.log("Item found for >>>> "+obj.id);
        item.parentFlowId=str;
        item.flowId=str+'-'+item.returnValue;
        modifiedItems.push(item);
        if(obj.children){
            console.log('Iterating chidren');
            console.log('Children are >>');
            console.log(obj.children);
            console.log("Passing Str of value >>>"+str);
            console.log('Traversing childreing of >>'+obj.id);
            console.log('Traversing childreing of >>'+item.displayItem);
            traverse(item.flowId,obj.children);
        }
    }
}


var savedMenuItems = [ { displayItem: 'level 1',
    returnValue: 1,
    variableHolder: 'another1',
    uniqueId: 'cdb3f179-0f87-77e5-fb9d-ad25187aea3e',
    parentFlowId: '0',
    flowId: '0-1' },
    { displayItem: 'level 2',
        returnValue: 2,
        variableHolder: 'another2',
        uniqueId: 'd2093c6e-a019-55eb-87ca-80194a0e3a0e',
        parentFlowId: '0-1',
        flowId: '0-1-2' },
    { displayItem: 'level 3',
        returnValue: 3,
        variableHolder: 'another3',
        uniqueId: '599eb2b3-40e2-1834-09ed-05b0b601e868',
        parentFlowId: '0-1-2',
        flowId: '0-1-2-3' },
    { displayItem: 'level 4',
        returnValue: 4,
        variableHolder: 'another4',
        uniqueId: '68a901bb-4707-1d75-48e1-8ff4749bf810',
        parentFlowId: '0-1-2-3',
        flowId: '0-1-2-3-4' },
    { displayItem: 'level 1',
        returnValue: 5,
        variableHolder: 'another5',
        uniqueId: 'ec26c46b-0f09-2651-3f81-f0746c696b33',
        parentFlowId: '0',
        flowId: '0-5' },
    { displayItem: 'level 1',
        returnValue: 6,
        variableHolder: 'another6',
        uniqueId: '4c4f4820-f821-2640-44e1-3b67b8823b8e',
        parentFlowId: '0',
        flowId: '0-6' },
    { displayItem: 'level 2',
        returnValue: 7,
        variableHolder: 'another7',
        uniqueId: 'aa2ac7bc-ed9c-b238-bb23-4e7f71636968',
        parentFlowId: '0-6',
        flowId: '0-6-7' } ];



function findChildItems(menuItems,flowId){
    var arr = [];
    menuItems.forEach(function(item){
        console.log("Flow Id is >>> "+flowId + " Parent flowId is >>>"+item.parentFlowId);
        if(item.parentFlowId==flowId){
            arr.push(item);
        }
    }) ;
    return arr;
}

function buildChildHtml(menulist){
    console.log("Menulist for children >>>> ");
    console.log(menulist);
    var li ='<ol>';
    for(var k= 0,len=menulist.length;k<len;k++){
        var item = menulist[k];
        console.log("BuildChildHtml >>>>>");
        console.log(item);
        li= li + buildListItemHtml(item);
        var children = findChildItems(savedMenuItems, item.flowId);
        if(children.length > 0) {
            li = li + buildChildHtml(children);
        }
        li= li + '</li>';
    }
    li+='</ol>';
    return li;
}

function buildTreeFromMenu(menuItems){
    console.log(menuItems);
    var tree=[];
  for(var k= 0,len=menuItems.length;k<len;k++){
//    for(var k= 0,len=1;k<len;k++){
        var item = menuItems[k];
        console.log("Item Id is >>> " + item.uniqueId);
        var li = buildListItemHtml(item);
        var children = findChildItems(savedMenuItems, item.flowId);
        console.log("Children are >>>");
        console.log(children);
        if(children.length > 0) {
            var childHtml = buildChildHtml(children);
            console.log("Child Html is >>>>");
            console.log(childHtml);
            li = li + childHtml;
        }
        li= li + '</li>';
        tree.push(li);
    }
    return tree;
}

function buildListItemHtml(data) {
    var s = '<li class="dd-item dd3-item" id="li-' + data.flowId + '" data-id="'+ data.flowId +'">' +
        ' <div class="dd-handle dd3-handle">Drag</div><div class="dd3-content"><b><em>' + data.returnValue + '</em> ' + data.displayItem +
        '</b><span class="crud-buttons pull-right" style="margin-top: -4px;" data-id="' + data.uniqueId + '">' +
        '<span class="btn btn-xs btn-warning add"><i class="glyphicon glyphicon-plus"></i></span> ' +
        '<span class="btn btn-xs btn-primary edit"><i class="glyphicon glyphicon-pencil"></i></span> ' +
        '<span class="btn btn-xs btn-danger delete"><i class="glyphicon glyphicon-remove"></i></span> ' +
        ' </span>' +
        '</div>' ;
    return s;
}



//console.log("Modified items are >>> ");
//console.log(modifiedItems);
//[{id:"cdb3f179-0f87-77e5-fb9d-ad25187aea3e",children:[{id:{ id: "d2093c6e-a019-55eb-87ca-80194a0e3a0e" }
//
//}]}

var topMenuItems = findChildItems(savedMenuItems,'0');

var htmlList = buildTreeFromMenu(topMenuItems);
console.log("Number of top menu items >>> "+htmlList.length);
console.log(htmlList.join(''));
