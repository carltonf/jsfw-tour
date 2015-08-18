angular.module('todoApp', [])
    .controller('TodoListController', function() {
        var todoList = this;
        todoList.todos = [
            {text:'learn angular', done:true},
            {text:'build an angular app', done:false},
            {text:'a basic angular todo', done:false},
        ];

        todoList.addTodo = function() {
            todoList.todos.push({text:todoList.todoText, done:false});
            todoList.todoText = '';
        };

        todoList.remaining = function() {
            var count = 0;
            angular.forEach(todoList.todos, function(todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        // todoList.archive = function() {
        //     var oldTodos = todoList.todos;
        //     todoList.todos = [];
        //     angular.forEach(oldTodos, function(todo) {
        //         if (!todo.done) todoList.todos.push(todo);
        //     });
        // };

        /////////////////
        // implement archive-toggle
        todoList.archive_todos = [];

        todoList.toggle_archive = function() {
            if (todoList.archive_todos.length === 0)
                todoList._show_active_todos();
            else
                todoList._show_all_todos();
        };

        todoList._show_all_todos = function(){
            // TODO preserve the order
            todoList.todos = todoList.todos.concat(todoList.archive_todos);
            todoList.archive_todos = [];
        };

        todoList._show_active_todos = function(){
            var oldTodos = todoList.todos;
            todoList.todos = [];
            angular.forEach(oldTodos, function(todo) {
                if (!todo.done)
                    todoList.todos.push(todo);
                else
                    todoList.archive_todos.push(todo);
            });
        };
        // ends archive-toggle
    });
