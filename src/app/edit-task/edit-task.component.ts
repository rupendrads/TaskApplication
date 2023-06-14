import { Component, OnInit, ViewChild } from "@angular/core";
import { Task } from "../models/task.model";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../services/task.service";

@Component({
    selector: 'edit-task',
    templateUrl: './edit-task.component.html',
    styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {    
    @ViewChild('taskForm') form!: NgForm;
    task:Task;
    statusOptions:string[]=[];

    constructor(private taskService: TaskService, 
        private router: Router,
        private route: ActivatedRoute){ 
            this.task = new Task(-1, "", "Incomplete");  
        this.statusOptions = ["Incomplete", "Complete"];
    }

    ngOnInit(): void {  
        
        const id = this.route.snapshot.paramMap.get('id'); 
        console.log(id);
        if(id!== null){
            this.taskService.getTask(+id).subscribe((data:any) => {
                this.task = data;
                console.log(this.task);
            });
        }
    }

    onSubmit(){
        console.log(this.form.value);
        console.log(this.task);
        this.taskService.editTask(this.task).subscribe((data: any) => {
        });
        this.router.navigateByUrl('/');
    }

    onChangeStatus(event: any) {
        this.task.status = event.target.value;
    }

}