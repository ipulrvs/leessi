var async = require('async');
module.exports = function (app) {
  var postgre = app.dataSources.postgre;

  migrateTodoUser();
  migrateNote();
  migrateTodo();

  function migrateTodoUser(cb){
  	postgre.automigrate('todoUser', function (err){
  		if(err) return cb(err);
  	});
  }

  function migrateTodo (cb){
  	postgre.automigrate('todo', function (err){
  		if(err) return cb(err);
  	});
  }

  function migrateNote (cb){
  	postgre.automigrate('note', function (err){
  		if(err) return cb(err);
  	});
  }

};
