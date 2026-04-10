//grab all element into variable where functionality need to be ddded
const inputTask = document.getElementById("input");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");


//whenevr the site loads it loads task from local storage
document.addEventListener("DOMContentLoaded", loadTasks());
inputTask.focus()


//save task to local storage 
function saveTasks(task, timestamp){

    //calling getTask() function into tasks variable where we're getting tasks from local storage
    const tasks = getTasks()
    
    //pushing argumneted task into tasks variable via getTask as an object with task and timestamp
    tasks.push({ text: task, time: timestamp });

    //setting item into local storage in form of JSON
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

//get task from local storage
function getTasks(){

    //getting task from local storage 
    const tasks = localStorage.getItem('tasks')

    //clearing the input field. Making it blank
    inputTask.value='';
    
    //returning json tasks if Tasks has a value
    return tasks ? JSON.parse(tasks) : [];
}



//load task function for loading task from local storage 
function loadTasks() {

    //getting all the tasks before loading into tasks variable
    const tasks = getTasks();

    // loooping each task and styling it as per the listelement after loading
    tasks.forEach(task => {
        //creating the list item
        const listItem = document.createElement("li");

        // inputText / inputTask is not available inside this function so the task element is used where all the tasks are loaded  
        listItem.innerHTML = `<span> •  ${task.text}</span><span class="time">${task.time}</span>`;

        //adding event listener to the list item to check the completion and pending activity
        listItem.addEventListener("click", function() {
            if (listItem.style.textDecoration === "line-through") {
                //if the list item is pending
                listItem.style.textDecoration = "none";
                listItem.style.color = "black"
            } else {
                //if the list item is completed
                listItem.style.textDecoration = "line-through";
                listItem.style.color = "black"
            }
        });

        //appending the child element we created the innerhtml of the list item to the task list
        taskList.appendChild(listItem);
    });
}


//adding task function
function addTask(){

    //grabbing the entered value into a variable 
    const inputText = inputTask.value.trim();

    //checking the input value existance and alerting the user
    if (inputText){
        
        //creating the list item
        const listItem = document.createElement("li");

        //creating the current time event - capture once when task is added
        const currentTime = new Date().toLocaleTimeString();

        //creating innerhtml of element created in name of listItem to append on the task list 
        listItem.innerHTML = `<span> •  ${inputText}</span><span class="time">${currentTime}</span>`;

        //adding event listener to the list item to check the completion and pending activity
        listItem.addEventListener("click", function() {
            if (listItem.style.textDecoration === "line-through") {
                //if the list item is pending
                listItem.style.textDecoration = "none";
                listItem.style.color = "black"
            } else {
                //if the list item is completed
                listItem.style.textDecoration = "line-through";
                listItem.style.color = "#black"
            }
        });


        //appending the child element we created the innerhtml of the list item to the task list
        taskList.appendChild(listItem);

        //saving task with timestamp into local storage
        saveTasks(inputText, currentTime);

        //scrolls to the bottom
        scrollBottom()

        //clearing the input field. Making it blank
        inputTask.value='';

    //if the input field is empty
    } else {
        //alerting the user
        alert("Please add a Task first");
    }
}


//function for scrolling the task list to the bottom
function scrollBottom(){
    taskList.scrollTop = taskList.scrollHeight;
}


//reset function
function reset(){
    if (taskList.childElementCount === 0){
        //alerts user when no task is there
        alert("Please enter a Task first before resetting")
    }else{
        //resets all tasks
        taskList.innerHTML = "";
        // resets all tasks in storage
        localStorage.removeItem('tasks')
    }
}




//KEY EVENTS

//adding event listener to the add button as we click on enter key the addTask() function executes
inputTask.addEventListener('keypress',function(e){
    if (e.key === 'Enter') {
        addTask();
    }
})


//whenever we click on insert key it focuses on the input
document.addEventListener("keydown", (e) => {
    if (e.key === "Insert" || "TAB" || "Enter" || "Shift") {
        inputTask.focus(); // Set focus to the input field
    }
  });


//when we click on delete-key it clears all the tasks
document.addEventListener('keydown',function(e){
    if (e.key === 'Delete') {
        reset();
    }
})



//popup toggles
//opens sidebar toggle
document.getElementById("hamburger").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
  if (sidebar.style.display === "flex") {
    sidebar.style.display = "none";
  } else {
    sidebar.style.display = "flex";
  }
});

//close sidebar toggles
document.getElementById("closeSidebar").addEventListener("click", () => {
    document.getElementById("sidebar").style.display = "none";
});

//click anywhere to close the sidebar
document.getElementById("container").addEventListener("click", () => {
    if (document.getElementById("sidebar").style.display === "flex"){
        document.getElementById("sidebar").style.display = "none";
    }else{
        document.getElementById("sidebar").style.display = "none";
    }
    
});

//opens Guide toggle
document.getElementById("guideButton").addEventListener("click", () => {
    const guidepopup = document.getElementById("guidepopup");
  if (guidepopup.style.display === "block") {
    guidepopup.style.display = "none";
  } else {
    guidepopup.style.display = "block";
  }
});

//close Guide toggles
document.getElementById("guideCloseButton").addEventListener("click", () => {
    document.getElementById("guidepopup").style.display = "none";
});


//opens Guide toggle
document.getElementById("guideButton").addEventListener("touchstart", () => {
  if (guidepopup.style.display === "block") {
    guidepopup.style.display = "none";
  } else {
    guidepopup.style.display = "block";
  }
});

//close Guide toggles for mobile
document.getElementById("guideCloseButton").addEventListener("touchstart", () => {
    document.getElementById("guidepopup").style.display = "none";
});


//opens Creator toggle
document.getElementById("creatorButton").addEventListener("click", () => {
    const creatorpopup = document.getElementById("creatorpopup");
  if (creatorpopup.style.display === "block") {
    creatorpopup.style.display = "none";
  } else {
    creatorpopup.style.display = "block";
  }
});

//close Creator toggles
document.getElementById("creatorCloseButton").addEventListener("click", () => {
    document.getElementById("creatorpopup").style.display = "none";
});

//universal click for closing guide toggle and creator toggle
document.querySelector(".container").addEventListener("click", () => {
    document.getElementById("creatorpopup").style.display = "none";
    document.getElementById("guidepopup").style.display = "none";
});








