import { Component, OnInit, ViewChild } from "@angular/core";
import { Task } from "../models/task.model";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { TaskService } from "../services/task.service";

@Component({
    selector: 'new-task',
    templateUrl: './new-task.component.html',
    styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
    @ViewChild('taskForm') form!: NgForm;

    constructor(private taskService: TaskService, 
        private router: Router){        
    }

    ngOnInit(): void {        
    }

    onSubmit(){
        if(this.form.valid){
            this.taskService.addTask(
                new Task(-1, this.form.value.title, "Incomplete"));
            this.router.navigateByUrl('/');
        }
    }
}