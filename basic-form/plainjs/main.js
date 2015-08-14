// 'change' will only be triggerd after the user has committed the results
document.getElementById('name').addEventListener('input', function(){
    var name = document.getElementById('name').value;
    document.getElementById('user-input-name').innerHTML = name;
})
