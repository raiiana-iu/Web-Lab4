class Task{
    constructor(id,title,completed){
        Object.defineProperty(this,"id",{
            value:id,
            writeble: false,
            enumerable:true,
            configurable: false

        });
        this.title=title;
        this.completed=completed;
    }
    toggle(){
        return new Task(this.id,this.title,!this.completed);
    }
}
class TaskManager {
    constructor(){
        this.tasks= [];
    }
    setTasks(tasks){
        this.tasks=[...tasks];
    }

    addTask(task){
        this.tasks=[...this.tasks, task];
    }

    removeTask(taskId){
        this.tasks=this.tasks.filter(task => task.id !== taskId);
    }
}