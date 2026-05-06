import { AfterViewInit, Component, ElementRef, viewChild, ViewChild, output } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
}) 
export class NewTicketComponent implements AfterViewInit {
  enteredTitle="";
  enteredRequest="";
  //@ViewChild('form') form?: ElementRef<HTMLFormElement>;
  private form= viewChild<ElementRef<HTMLFormElement>>('form');
  add=output<{title: string, text: string}>();

  onSubmit(){
    this.add.emit({title: this.enteredTitle, text: this.enteredRequest});
    //this.form()?.nativeElement.reset();
    this.enteredTitle="";
    this.enteredRequest="";
  }
  ngAfterViewInit(){
    console.log('After View Init');
  }
}
