

//time
let countDownDate = new Date("Oct 10, 2020 17:00:00").getTime();


//оновлення щосекунди

let countDownFunction = setInterval(function(){
    //час зараз
    
    var now = new Date().getTime();
    
    var distance = countDownDate - now;
    
    var days = Math.floor(distance/(1000*60*60*24));
    var hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    var minutes = Math.floor((distance %(1000*60*60))/(1000*60));
    var seconds = Math.floor((distance % (1000*60))/1000);
    
    document.getElementById("timer").innerHTML = days + "д " + hours + "г "+ minutes + "х "+ seconds + "с ";
    
    if(distance<0){
        clearInterval(countDownFunction);
        document.getElementById("timer").innerHTML = "Урра, ми успішно відгуляли весілля!"
    }
},1000);


//comments
let comments = [];
loadComments();
document.getElementById('comment-add').onclick = function(){
    event.preventDefault();
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');
    let comment = {
        name : commentName.value,
        body: commentBody.value,
        time : Math.floor(Date.now()/1000)
    };
    
    if(commentName.value == ''){
        alert("Напишіть ваше ім'я")
    } else if(commentBody.value == ''){
        alert("Напишіть ваше запитання")
    } else{
        comments.push(comment);
        console.log(comment)
        saveComments();
        showComments();
    };
             
};

function saveComments(){
    localStorage.setItem('comments', JSON.stringify(comments));
};
function loadComments(){
    if(localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}
function showComments(){
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function(item){
        out +=`<p class="text-right small"><em> ${timeConverter(item.time)}</em></p>`;
        out +=`<p class="alert alert-primary"> ${item.name}</p>`;
        out +=`<p class="alert alert-success"> ${item.body}</p>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp *1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date+ ' '+ month + ' ' + year+ ' '+ hour+ ':' + min+ ':'+ sec;
    return time;
}