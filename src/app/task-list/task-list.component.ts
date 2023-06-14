import { Component, OnInit } from "@angular/core";
import { Task, iTask } from "../models/task.model";
import { TaskService } from "../services/task.service";
import { Router } from "@angular/router";

@Component({
    selector: 'tasks',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
    taskList!: Task[];  
    selectedFilter = "All";  

    constructor(private taskService: TaskService,
        private router: Router){        
    }

    ngOnInit(): void {   
        this.taskService.getTaskData().subscribe((data:any) => {
            console.log(data);
            this.taskList = [...data];
            console.log(this.taskList);
        });
    }

    onClickNewTask(){
        this.router.navigateByUrl('/newtask');
    }

    deleteTask(index: number){
        this.taskService.deleteTask(index).subscribe((data:any) => {
            this.taskList = [...data];
        });
    }

    changeFilter(){
        if(this.selectedFilter == "All"){
            this.taskService.getTaskData().subscribe((data:any) => {               
                this.taskList = [...data];
            });
        }else {
            this.taskService.getFilteredTaskData(this.selectedFilter).subscribe((data:any) => {               
                this.taskList = [...data];
            });
        }
    }
}