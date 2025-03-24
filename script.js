document.addEventListener('DOMContentLoaded', ()=>{
    const storedTask = JSON.parse(localStorage.getItem('tasks'))

    if(storedTask){
        storedTask.forEach((task)=> tasks.push(task));
        updatetasksList();
        updateStats();
    }
})

let tasks = [];

const saveTasks = () =>{
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const addTask = () =>{
    const taskinput = document.getElementById('taskinput');
    const text = taskinput.value.trim();
    

    if(text){
        tasks.push({text: text, completed: false});
        updatetasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed
    updatetasksList();
    updateStats();
    saveTasks();
}

const deleteTask = (index) =>{
    tasks.splice(index, 1);
    updatetasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) =>{
    const taskinput = document.getElementById('taskinput');
    taskinput.value = tasks[index].text;

    tasks.splice(index, 1);
    updatetasksList();
    updateStats();
    saveTasks();
}


const updateStats = () =>{
    const completeTask = tasks.filter(task=> task.completed).length
    const totalTask = tasks.length
    const progress = (completeTask/totalTask)*100;
    const progressBar = document.getElementById('progress');

    const taskover = document.getElementById('numbers');
    
    if(taskover.innerText = "0 / 0"){
        progressBar.style.width = 0;
    }
    taskover.innerText = `${completeTask} / ${totalTask}`;
    progressBar.style.width = `${progress}%`
     
    if(tasks.length && completeTask === totalTask){
        blastconfitti();
    }

}


const updatetasksList = () =>{
    const taskList = document.getElementById('tasklist');
    taskList.innerHTML = "";

    tasks.forEach((task,index) =>{
        const listItem = document.createElement("li");


        listItem.innerHTML = `
          <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked':''}>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <i class="fa fa-file-pen" onClick="editTask(${index})"></i> 
                    <i class="fas fa-times" onClick="deleteTask(${index})"></i>
                </div>
            </div>
        `;


        listItem.addEventListener('change', ()=> toggleTaskComplete(index));
        // console.log(taskList);
        
        taskList.append(listItem);
    });
};

document.getElementById('newtask').addEventListener('click', function(e){
    e.preventDefault();

    addTask();
   taskinput.value = '';
   
});


const blastconfitti = () =>{
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
}