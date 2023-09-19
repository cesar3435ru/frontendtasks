import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {

  constructor(private rou: ActivatedRoute, private theForm: FormBuilder, private user: UserService, private router: Router) { }

  id_task: any;
  task_data: any = {};

  ngOnInit(): void {
    const id = parseInt(this.rou.snapshot.paramMap.get('id') || '');
    this.id_task = id;
    console.log('This is my id:', this.id_task);
    this.getTaskId(id);
  }

  taskForm: FormGroup = this.theForm.group({
    name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    desc: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],

  });

  validateInput(inputTask: string) {
    return this.taskForm.controls[inputTask].errors && this.taskForm.controls[inputTask].touched

  }


  getTaskId(id: number) {
    this.user.getTaskOnlyId(id).subscribe(
      (task: any) => {
        this.task_data = task;
        this.extractUserData();
        this.taskForm.patchValue(this.task_data);
        console.log('My data', this.task_data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  extractUserData() {
    if (this.task_data && this.task_data.task) {
      this.task_data = this.task_data.task;
    }
  }

  updateTask() {
    if (this.taskForm && this.taskForm.valid) {
      this.user.updateTaskById(this.id_task, this.taskForm.value).subscribe(
        () => {
          console.log('Great Work');
          this.goodNot();
          this.router.navigate(['home/duries']);

        },
        error => {
          console.error('Error:', error);

        }
      );
    }

  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Task updated successfully!!!',
      showConfirmButton: false,
      timer: 1800
    })
  }

}
