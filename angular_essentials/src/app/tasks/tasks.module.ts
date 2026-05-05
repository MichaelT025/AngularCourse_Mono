import{ NgModule } from "@angular/core";
import { Tasks } from "./tasks";
import { Task } from "./task/task";
import { NewTask } from "./new-task/new-task";
import { SharedModule } from "../shared/shared.module";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        Tasks,
        Task,
        NewTask,
    ],
    exports:[
        Tasks
    ],
    imports:[
        SharedModule,
        CommonModule,
        FormsModule
    ]
})
export class TasksModule {}
