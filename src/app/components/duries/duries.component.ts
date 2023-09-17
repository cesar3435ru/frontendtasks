import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-duries',
  templateUrl: './duries.component.html',
  styleUrls: ['./duries.component.css']
})
export class DuriesComponent implements OnInit{
  private taskAddedSubscription: Subscription;
  private taskDeletedSubscription: Subscription;



  constructor(private theForm: FormBuilder, private user: UserService, private rou: Router) {
    this.taskAddedSubscription = this.user.getTasksObservable().subscribe(() => {
      this.showTasks();
    });
    this.taskDeletedSubscription = this.user.getTasksDeletedObservable().subscribe(() => {
      this.showTasks();
    });
   }
  showForm = false;
  p: number = 1; 

  tasks: any[] = [];
  toggleForm() {
    this.showForm = !this.showForm; // Mostrar u ocultar el formulario al hacer clic en el botón
  }
  progress: number = 0;
  showProgressBar = false;

  ngOnInit(): void {
    this.taskForm.valueChanges.subscribe(() => {
      this.showProgressBar = true;
    });

    this.showTasks();
  }

  ngOnDestroy(): void {
    this.taskAddedSubscription.unsubscribe();
    this.taskDeletedSubscription.unsubscribe();

  }

  showTasks() {
    this.user.getAllTasksByUser().subscribe(
      (data) => {
        this.tasks = data.tasks;
        console.log('my data', this.tasks);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateProgress() {
    const totalFields = 2;
    const completedFields = Object.values(this.taskForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Task created successfully!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  goodNoti() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Task deleted successfully!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  badNot() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something is wrong!'
    })
  }

  taskForm: FormGroup = this.theForm.group({
    name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    desc: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],

  });

  validateInput(inputTask: string){
    return this.taskForm.controls[inputTask].errors && this.taskForm.controls[inputTask].touched

  }

  saveTask() {
    const formData = new FormData();
    
    formData.append('name', this.taskForm.get('name')?.value);    
    formData.append('desc', this.taskForm.get('desc')?.value);    

    this.user.addTask(formData).subscribe(
      (response) => {
        console.log('Backend responds:', response);
        this.goodNot();        
      },
      (error) => {
        console.error('Error backend:', error);
      }
    );
    this.taskForm.reset();
    this.updateProgress(); 
  }

  deleteTask(id: number) {
    this.user.deleteTaskByUser(id).subscribe(
      () => {
        this.goodNoti();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  confirmarAlert(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTask(id);
      }
    });
  }


}
