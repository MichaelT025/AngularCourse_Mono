import { type NewTaskData } from "./task/task.model"
import { Injectable } from "@angular/core"

@Injectable({providedIn: 'root'})
export class TasksService{
    private tasks = [{
        id: 't1',
        userId: 'u1',
        title: 'Master Angular',
        summary:
          'Learn all the basic and advanced features of Angular & how to apply them.',
        dueDate: '2025-12-31',
      },
      {
        id: 't2',
        userId: 'u3',
        title: 'Build first prototype',
        summary: 'Build a first prototype of the online shop website',
        dueDate: '2024-05-31',
      },
      {
        id: 't3',
        userId: 'u3',
        title: 'Prepare issue template',
        summary:
          'Prepare and describe an issue template which will help with project management',
        dueDate: '2024-06-15',
      },
      {
        id: 't4',
        userId: 'u1',
        title: 'Refactor authentication module',
        summary: 'Simplify the login flow and remove duplicate validation logic across the auth service.',
        dueDate: '2025-03-10',
      },
      {
        id: 't5',
        userId: 'u2',
        title: 'Write unit tests for user service',
        summary: 'Achieve at least 80% code coverage on all public methods in the user service layer.',
        dueDate: '2025-04-01',
      },
      {
        id: 't6',
        userId: 'u4',
        title: 'Design dashboard mockups',
        summary: 'Create high-fidelity Figma mockups for the new analytics dashboard including mobile views.',
        dueDate: '2025-05-20',
      },
      {
        id: 't7',
        userId: 'u5',
        title: 'Set up CI/CD pipeline',
        summary: 'Configure GitHub Actions to run linting, tests, and deploy previews on every pull request.',
        dueDate: '2025-02-28',
      },
      {
        id: 't8',
        userId: 'u2',
        title: 'Update API documentation',
        summary: 'Document all new endpoints added in the last sprint using Swagger and OpenAPI 3.0.',
        dueDate: '2025-06-10',
      },
      {
        id: 't9',
        userId: 'u6',
        title: 'Optimize database queries',
        summary: 'Profile slow queries in the reporting module and add indexes where needed.',
        dueDate: '2025-07-15',
      },
      {
        id: 't10',
        userId: 'u4',
        title: 'Implement dark mode toggle',
        summary: 'Add a theme switcher that persists user preference and applies CSS variables globally.',
        dueDate: '2025-08-05',
      },
      {
        id: 't11',
        userId: 'u1',
        title: 'Review dependency vulnerabilities',
        summary: 'Run npm audit, triage findings, and upgrade or replace packages with known CVEs.',
        dueDate: '2025-03-22',
      },
      {
        id: 't12',
        userId: 'u5',
        title: 'Conduct user interviews',
        summary: 'Interview five customers to gather feedback on the new checkout experience.',
        dueDate: '2025-04-18',
      }]

      constructor(){
        const tasks=localStorage.getItem('tasks');
        if(tasks){
          this.tasks=JSON.parse(tasks);
        }
      }

    getUserTasks(userId:string){
        return this.tasks.filter((task) => task.userId === userId)
    }

    addTask(taskData: NewTaskData, userId:string){
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.dueDate
    })
    this.saveTasks();
    }
    removeTask(id:string){
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.saveTasks();
    }
    private saveTasks(){
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}