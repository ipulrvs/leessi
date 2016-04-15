angular.module('app')
.controller('MainController', function($scope, $state, Note){

	window.lalala = Note;

	socket.on('load', function(cmd, data){
		if(cmd == 'refresh'){
			$scope.load();
		} else if(cmd == 'view'){
			$scope.views(data);
		} else if(cmd == 'update'){
			$scope.clear();
			$scope.load();
		} else if(cmd == 'remove'){
			$scope.remove(data);
		}
    });
	$scope.notes = [];
	$scope.page = {
		limit: 10,
		skip: 0
	};
	$scope.load = function (){
		Note
			.find($scope.page)
			.$promise
			.then (function (notes){
				$scope.notes = notes;
			});
	}
	$scope.load();

	$scope.note = {};
	$scope.clear = function (){
		$scope.note = {};
	}
	$scope.create = function (){
		if($scope.note.id){
			Note.update({
				'where': {'id': $scope.note.id}
			}, $scope.note)
			.$promise	
			.then (function (note){
				$scope.clear();
				socket.emit('load', 'update', note);
			});
		} else {
			Note.create($scope.note, function (note){
				$scope.load();
				$scope.clear();
				socket.emit('load', 'refresh', note);
			});
		}
	}
	$scope.views = function (id){
		$scope.note = {};
		Note
			.findOne({'filter': {
				'where': {'id': id}
			}})
			.$promise
			.then (function (note){
				$scope.note = note;
			});
	}
	$scope.remove = function (id){
		Note
			.delete({"id": id})
			.$promise
			.then (function (note){
				$scope.load();
			});
	}
	$scope.view = function (id){
		socket.emit('load', 'view', id);
	}
	$scope.delete = function (id){
		socket.emit('load', 'remove', id);
	}

});