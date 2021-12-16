import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss']
})
export class AddeventComponent implements OnInit {
 
  nameUser:any;
  getEmailReceiver: any [];
  myEvent: FormGroup;
  newEvent:any = []

  user: any={};

  todayu = new Date();
  yearToday = this.todayu.getFullYear();

  constructor(private namereceiver:HeaderService,
              private event:FormBuilder, 
              private addEvent:HeaderService,
              public rout:Router,) { }

  ngOnInit(): void {
    this.detailSendEmail();
    this.createEventForm();
  }

  detailSendEmail(){
    // this.nameUser=JSON.parse(localStorage.getItem('Users') || '{}');
    this.nameUser = this.namereceiver.getEmail();
    console.log(this.nameUser);

    //get multiple value user email receiver that already display in interface
    this.getEmailReceiver=this.nameUser.map((user: { name: any; }) => user.name);
    console.log(this.getEmailReceiver); 
  }

  //form for input the event
  createEventForm(){
    this.myEvent= this.event.group({
      event: ['',Validators.required],
      // date: [this.todayu,Validators.required],
    })
  };
  
  //get value input event
  inputEvent:any;
  inputDate:any;
  onEvent(){
   this.inputEvent = this.myEvent.controls['event'].value;
  //  this.inputDate = this.myEvent.controls['date'].value;
   console.log(this.inputEvent);
  //  console.log(this.inputDate);
  };
  get myEventFrom():any{
    return this.myEvent.controls;
  }

  //button submit event into calendar
  hantarEvent(){
    this.addEvent.sendDetailEmail(this.nameUser);
    this.addEvent.sendDetailEvent(this.inputEvent);
      this.rout.navigate(['/tarikh']);
      console.log(this.nameUser)
      console.log(this.inputEvent)

      let inputDob = this.inputDate;
      let d = new Date( inputDob );
      console.log(d);

      let month
      let day
    //split the day and month
      if (!!d.valueOf()) 
      { // Valid date
        //capture the formate day and month as well using padStart
          month = (d.getMonth() + 1).toString().padStart(2, "0");
          day = (d.getDate()).toString().padStart(2, "0");
          console.log(month);
          console.log(day);
      } 

      this.newEvent = 
        {
          kad: 0,
          // name: this.nameUser[0].name + ": " + this.inputEvent,
          name: this.inputEvent,
          // date: this.inputDate,
          day: day,
          month: month,
        }
      
        //same local storage simpan newEvent
      this.user= Object.assign(this.user, this.newEvent);
      this.addEvent.addUser(this.user);
  }

}
