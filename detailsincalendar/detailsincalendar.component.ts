import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-detailsincalendar',
  templateUrl: './detailsincalendar.component.html',
  styleUrls: ['./detailsincalendar.component.scss']
})
export class DetailsincalendarComponent implements OnInit {

  constructor(private route:ActivatedRoute, 
              public rout:Router, 
              private emailService:HeaderService, 
              private eventService:HeaderService) { }

   //declaration
   displayDetail: any [];
   kadpengenalan:any;
   getEmailReceiver: any [];

  ngOnInit(): void {
    this.createPassValueRouter();
  }

  createPassValueRouter(){
    let monthDate:any;
    let dayDate:any;

    //store json in variable an array
    this.displayDetail=JSON.parse(localStorage.getItem('Users') || '{}');
    console.log(this.displayDetail); 
    
    //variable from router that passed the value of IC and Date
    this.route.params.subscribe(params => {this.kadpengenalan=params['kadpengenalan']});
    console.log(this.kadpengenalan);//ths
    
    //display details user more than 1
    if(this.kadpengenalan > 0) {
      this.displayDetail = this.displayDetail.filter((userDob:any) => { 
        return (userDob.kad === this.kadpengenalan)});
    }
    
    // //display event when click event
    // else if(this.kadpengenalan == 0) {
    // this.displayDetail = this.displayDetail.filter((userDob:any) => { 
    // return (userDob.kad==0 === this.kadpengenalan)});
    // }

    //no need to display event yg ade dekat calendar di page display details user only 1 user
    else {

    //split the day and month from param
    let dateValue = new Date(this.kadpengenalan );
    if (!!dateValue.valueOf()) 
      { 
        monthDate = (dateValue.getMonth() + 1).toString().padStart(2, "0");
        dayDate = (dateValue.getDate()).toString().padStart(2, "0");

        console.log(monthDate);
        console.log(dayDate);
      }

    //filter by (day and month) or IC from json and router param 
    this.displayDetail = this.displayDetail.filter((userDob:any) => { 
    return (userDob.month === monthDate  &&  userDob.day === dayDate && userDob.kad !=0)});

    }//end else

    //get multiple value user email receiver that already display in interface
    this.getEmailReceiver=this.displayDetail.map(user => user.email);
    console.log(this.getEmailReceiver);

  };

  //button link untuk user hantar email
  keSendMail() {
      this.emailService.sendDetailEmail(this.displayDetail);
      this.rout.navigate(['/sendEmail']);
      console.log(this.displayDetail)
  }

  //button link untuk user create event
  keEvent(){
    this.eventService.sendDetailEmail(this.displayDetail);
      this.rout.navigate(['/addevent']);
      console.log(this.displayDetail)
  }
  
}
