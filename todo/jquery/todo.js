var todoList = {}

// initial set of data
todoList.todos =  [
    {text:'learn angular', done:true},
    {text:'build an angular app', done:false},
    {text:'a basic angular todo', done:false},
];

// update todo entry count
todoList.remaining = function() {
    var count = 0;
    todoList.todos.forEach(function(todo){
        if (todo.done)
            return;
        count = count + 1;
    })

    return count;
}

todoList.update_todos_count = function(){
    $("#active-todo-count").text(todoList.remaining());
    $("#total-todo-count").text(todoList.todos.length);
}

todoList.update_todos_count();

// Populate todo list
var todo_sample = $(".todo-entry");
todo_sample.hide();
// Q: "input" would not work
todo_sample.children("input").on("change", function(ev){
    var todo_entry = $(this).parent(),
        todo = todoList.todos[todo_entry.data("todo-index")],
        todo_old_done = todo.done;

    // update model
    todo.done = this.checked;

    // update view
    todo_entry.children("span")
        .removeClass("done-" + todo_old_done)
        .addClass("done-" + this.checked);

    todoList.update_todos_count();
});
// remove the sample from DOM, but keep all data and event handlers
todo_sample.detach();

todoList.update_todos_list = function(idx, todo){
    // Pass "true" to make sure that all todo entries get event handler.
    var todo_entry = todo_sample.clone(true);
    todo_entry.children("input").prop("checked", todo.done);
    todo_entry.children("span")
        .addClass("done-" + todo.done)
        .text(todo.text);
    todo_entry.data("todo-index", idx);

    $("#todo-list").append(todo_entry);

    todo_entry.show();

}

todoList.refresh_todos_list = function(){
    $("#todo-list").empty();

    $.each(todoList.todos, todoList.update_todos_list);
}

todoList.refresh_todos_list();

///////////////// New Todo
var new_todo_text = $("#add-new-todo > input:first")
var new_todo_btn = $("#add-new-todo > .btn-primary")
new_todo_btn.click(function(ev){
    ev.preventDefault();

    var new_todo = {
        text: new_todo_text.val(),
        done: false
    };

    // EXT: simple validation
    if (new_todo.text == ""){
        console.log("Error: Empty new todo is not allowed! Abort!")
        return;
    }

    // update modal
    todoList.todos.push(new_todo);

    // update view
    todoList.update_todos_count();
    todoList.update_todos_list(todoList.todos.length - 1, new_todo);

    new_todo_text.val("");
})

///////////////// TODO Archive
todoList.archive = [];
var archive_btn = $('#toggle-archive-btn');
archive_btn.click(function(ev){
    ev.preventDefault();

    if (todoList.archive.length == 0){
        var active_todos = [];
        // enable archive view
        $.each(todoList.todos, function(idx, todo){
            if (todo.done){
                todoList.archive.push(todo);
            }
            else {
                active_todos.push(todo);
            }
        });

        todoList.todos = active_todos;
    }
    else {
        todoList.todos = todoList.todos.concat(todoList.archive);
        todoList.archive = [];
    }

    // update view
    // TODO the archive stuff should be a view-only action.
    todoList.refresh_todos_list();
    todoList.update_todos_count();
})
