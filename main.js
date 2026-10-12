const loadTasksBtn=document.getElementById("loadTasksBtn");
const taskList=document.getElementById("taskList");
const statusMessage=document.getElementById("statusMessage");

const taskManager=new TaskManager();

loadTasksBtn.addEventListener("click",async () => {
    statusMessage.textContent = "Loading tasks...";
    loadTasksBtn.disabled = true;

    try {
        const rawTasks=await fetchTasks();

        const tasksJSON=JSON.stringify(rawTasks);
        const parsedTasks=JSON.parse(tasksJSON);

        const tasks=parsedTasks.map(taskData => {
            return new Task(
                taskData.id,
                taskData.title,
                taskData.completed
            );
        });

        taskManager.setTasks(tasks);
        renderTasks();

        statusMessage.textContent="";
    }catch(error){
        statusMessage.textContent="Error. Please try again.";
        console.error("Error fetching tasks:",error);
    }finally{
        loadTasksBtn.disabled=false;
    }
});

function renderTasks(){
    taskList.replaceChildren();

    taskManager.tasks.forEach(task => {
        const taskDiv=document.createElement("div");
        taskDiv.classList.add("task");

        if (task.completed) {
            taskDiv.classList.add("completed");
        }

        const taskTitle=document.createElement("span");
        taskTitle.textContent=task.title;

        const toggleBtn=document.createElement("button");
        toggleBtn.textContent="Toggle";

        toggleBtn.addEventListener("click",() => {
            taskManager.toggleTask(task.id);
            renderTasks();
        });

        const deleteBtn=document.createElement("button");
        deleteBtn.textContent="Delete";

        deleteBtn.addEventListener("click", () => {
            taskManager.removeTask(task.id);
            renderTasks();
        });

        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(toggleBtn);
        taskDiv.appendChild(deleteBtn);

        taskList.appendChild(taskDiv);
    });
}
