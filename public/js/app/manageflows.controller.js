(function () {
    'use strict';
    angular
        .module('ach.app')
        .controller('ManageUssdFlowController', ManageUssdFlowController);
    ManageUssdFlowController.$inject = ['brudexservices', '$stateParams','$scope'];
    function ManageUssdFlowController(services, stateParams,$scope) {
        console.clear();
        var vm = this;
        vm.flows = [];
        vm.appId = stateParams.id;
        vm.menuItem = {};
        vm.menuItem.displayType = 'display-text';
        vm.menuItems = [];
        vm.modalHeader = 'Add New Menu Item';
        var menuItemClickedId = "";
        var editIndex = -1;
        vm.submitMenuItem = function () {

            if(vm.menuItem.displayText ==null || vm.menuItem.displayText == ''){
                toastr.warning("Please enter display text");
                return;
            }
            if(vm.menuItem.returnValue ==null || vm.menuItem.returnValue == ''){
                toastr.warning("Please enter return value");
                return;
            }
            if(vm.menuItem.inputHolder ==null || vm.menuItem.inputHolder == ''){
                toastr.warning("Please enter input holder");
                return;
            }

            vm.menuItem.uniqueId = guid();
            var li = buildItemHtml(vm.menuItem);
            if (menuItemClickedId === '') {
                $("#menu-flow").append(li);
                vm.menuItems.push(vm.menuItem);
            } else {
                if (editIndex > -1) {
                    vm.menuItem.uniqueId = menuItemClickedId;
                    vm.menuItems.splice(editIndex, 1, vm.menuItem);
                    updateLiHtml('li-' + menuItemClickedId,vm.menuItem)
                } else {
                    var lid = 'li-' + menuItemClickedId;
                    $("#" + lid).after(li);
                    vm.menuItems.push(vm.menuItem);
                }
            }
            menuItemClickedId = "";
            vm.menuItem = {};
            setTimeout(function () {
                bindCrudButtons();
            }, 1000);
        };

        vm.addMenuItem = function(){
            vm.modalHeader = 'Add New Menu Item';
            editIndex = -1;
            $('#newMenuItemModal').modal('show');
        };

        vm.clearAll = function(){
            var doIt = confirm("Are you sure you want to delete all menu items, This action cannot be undone");
            if(doIt){
                services.clearUssdFlow(vm.appId,function(result){
                    if(result.status=='00'){
                        toastr.info(result.message);
                        initData();
                    }
                })
            }
        };

        vm.saveMenus = function(){
            var data ={};
            var nestable =  $('#nestable3');
            data.menuItems = vm.menuItems;
            var output = nestable.nestable('serialize');
            data.menuFlow = output;
            data.appId=vm.appId;
            services.saveUssdFlow(data, function (result) {
                if(result.status =='00'){
                    toastr.success(result.message);
                }
            });
        };

        vm.toggleAdvanceOptions = function () {
            $("#advancedOptions").slideToggle();
        };

        function initData() {
            services.getUssdFlows(vm.appId, function (result) {
                vm.menuItems = result.list;
                var topMenuItems = findChildItems(vm.menuItems ,'0');
                var htmlList = buildListTreeFromMenuList(topMenuItems);
                $('#menu-flow').html(htmlList);
            });
        }

        function updateLiHtml(id,data){
            var displaytext = data.headerText;
            if(displaytext==null || displaytext == ''){
                displaytext = data.displayText;
            }
            var target = "#"+id + " b:first";
            var html = '<b><em>' + data.returnValue + '</em> ' + displaytext +'</b>';
            $(target ).html(html);
        }
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        function initNestable() {
            $('#nestable3').nestable()
                .on('change', function () {
                    var _newform = $('#nestable3').nestable('serialize');
                    console.log(_newform);
                });
            bindCrudButtons();
        }

        function bindCrudButtons() {
            $(".crud-buttons .add").click(function (event) {
                vm.modalHeader = 'Add New Menu Item';
                editIndex= -1 ;
                vm.menuItem ={};
                vm.menuItem.displayType = 'display-text';
                $scope.$apply();
                var tid = $(event.target).parent().parent();
                var clickedId = tid.data('id');
                 menuItemClickedId = clickedId;
                $('#newMenuItemModal').modal('show');
            });
            $(".crud-buttons .edit").click(function (event) {
                var tid = $(event.target).parent().parent();
                var clickedId = tid.data('id');
                menuItemClickedId = clickedId;
                vm.menuItem ={};
                vm.menuItem.displayType = 'display-text';
                console.log("The clicked id is >> "+menuItemClickedId);
                for (var i = 0, count = vm.menuItems.length; i < count; i++) {
                    var item = vm.menuItems[i];

                    if (item.uniqueId === clickedId) {
                        console.log('Assigning item >>');
                        vm.menuItem = item;
                        vm.menuItem.displayType = 'display-text';
                        editIndex = i;
                        var display = item.displayText;
                        if(item.headerText != null && item.headerText != ''){
                            display = item.headerText;
                            vm.menuItem.displayType = 'display-list';
                        }
                        vm.modalHeader = 'Edit Menu Item  : ' + display;
                        break;
                    }
                }
                $scope.$apply();
                setTimeout(function(){
                    $('#newMenuItemModal').modal('show');
                },1000);
            });
            $(".crud-buttons .delete").click(function (event) {
                var tid = $(event.target).parent().parent();
                var clickedId = tid.data('id');
                var itemclicked = 'li-' + clickedId;
                $('#' + itemclicked).remove();
                deleteMenuItemById(clickedId);
                $scope.$apply();
            });
        }

        function deleteMenuItemById(id){
            var index = -1;
            for(var k= 0,len=vm.menuItems.length;k<len;k++){
                if(vm.menuItems[k].uniqueId == id){
                    index = k;
                }
            }
           if(index >=0){
               vm.menuItems.splice(index,1);
           }
        }


        function buildItemHtml(data) {
            var displaytext = data.headerText;
            if(displaytext==null || displaytext == ''){
                displaytext = data.displayText;
            }
           var s = '<li class="dd-item dd3-item" id="li-' + data.uniqueId + '" data-id="'+ data.uniqueId +'">' +
                ' <div class="dd-handle dd3-handle">Drag</div><div class="dd3-content"><b><em>' + data.returnValue + '</em> ' + displaytext +
                '</b><span class="crud-buttons pull-right" style="margin-top: -4px;" data-id="' + data.uniqueId + '">' +
                '<span class="btn btn-xs btn-warning add"><i class="glyphicon glyphicon-plus"></i></span> ' +
                '<span class="btn btn-xs btn-primary edit"><i class="glyphicon glyphicon-pencil"></i></span> ' +
                '<span class="btn btn-xs btn-danger delete"><i class="glyphicon glyphicon-remove"></i></span> ' +
                ' </span>' +
                '</div>' +
                '</li>';
           return s;
        }

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
            var li ='<ol>';
            for(var k= 0,len=menulist.length;k<len;k++){
                var item = menulist[k];
                li= li + buildListItemHtml(item);
                var children = findChildItems(vm.menuItems, item.flowId);
                if(children.length > 0) {
                    li = li + buildChildHtml(children);
                }
                li= li + '</li>';
            }
            li+='</ol>';
            return li;
        }

        function buildListTreeFromMenuList(menuItems){
            console.log(menuItems);
            var tree=[];
            for(var k= 0,len=menuItems.length;k<len;k++){
                var item = menuItems[k];
                console.log("Item Id is >>> " + item.uniqueId);
                var li = buildListItemHtml(item);
                var children = findChildItems(vm.menuItems, item.flowId);
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
            var displaytext = data.headerText;
            if(displaytext==null || displaytext == ''){
                displaytext = data.displayText;
            }
            var s = '<li class="dd-item dd3-item" id="li-' + data.uniqueId + '" data-id="'+ data.uniqueId +'">' +
                ' <div class="dd-handle dd3-handle">Drag</div><div class="dd3-content"><b><em>' + data.returnValue + '</em> ' + displaytext +
                '</b><span class="crud-buttons pull-right" style="margin-top: -4px;" data-id="' + data.uniqueId + '">' +
                '<span class="btn btn-xs btn-warning add"><i class="glyphicon glyphicon-plus"></i></span> ' +
                '<span class="btn btn-xs btn-primary edit"><i class="glyphicon glyphicon-pencil"></i></span> ' +
                '<span class="btn btn-xs btn-danger delete"><i class="glyphicon glyphicon-remove"></i></span> ' +
                '</span>' +
                '</div>' ;
            return s;
        }

        initData();
        setTimeout(function () {
            initNestable();
        }, 2000)
    }

})();
 