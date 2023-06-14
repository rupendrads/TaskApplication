import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from "../../assets/data/tasks";
import { of } from 'rxjs';
import { iTask } from '../models/task.model';

@Injectable({
  	providedIn: 'root',
})
export class TaskService {
	tasksData: any;

  	constructor(private http: HttpClient) {
	}

	getTaskData(){
		return of(Tasks);
	}

	getFilteredTaskData(status: string){
		return of(Tasks.filter(t => t.status == status));
	}

	getTask(id: number){
		const task = Tasks.find(t => t.id == id);
		return of(task);
	}

	addTask(task: iTask){
		const maxTask = Tasks.reduce((accumulator, current) => {
			return accumulator?.id > current?.id ? accumulator : current;
		  });
		  task.id = maxTask.id + 1;
		Tasks.push(task);
	}

	editTask(task: iTask){
		const taskDB = Tasks.find(t => t.id == task.id);
		if(taskDB!== undefined){
			taskDB.status = task.status;
			taskDB.title = task.title;
		}
		return of(taskDB);		
	}

	deleteTask(index: number){
		Tasks.splice(index, 1);
		return of(Tasks);
	}
}