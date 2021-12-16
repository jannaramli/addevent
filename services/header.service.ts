import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class HeaderService {

  //DECLARE OBJ
   myGroup: any;
   images: any;
   user:any;

  public inputWedding = new BehaviorSubject<any>([]);
  ImageMessage$= this.inputWedding.asObservable();

  constructor(private http: HttpClient){}

  //send data IMAGE
  sendImage(images:any){
    this.images=(images);
    console.log(this.images);

    this.inputWedding.next(images)
    console.log(this.sendImage)
  }

  //send data INPUT FORM
  send(myGroup: any ){
    this.myGroup=myGroup;
    console.log(this.myGroup)
  }

  //send data from display details user in calendar 
  displayDetail:any;
  sendDetailEmail(displayDetail:any){
    this.displayDetail=displayDetail;
    console.log(this.displayDetail)
  }

  //send data event from add event
  inputEvent:any;
  sendDetailEvent(inputEvent:any){
    this.inputEvent=inputEvent;
    console.log(this.inputEvent)
  }
 
  //get data and return to display page
  getHead(){return this.myGroup;}
  getGamba(){return this.images;}
  getEmail(){return this.displayDetail;}
  getEvent(){return this.inputEvent;}


  //localstorage
  addUser(user: any)  {
    let users: any=[];

    if(localStorage.getItem('Users')){
      users=JSON.parse(localStorage.getItem('Users') || '{}');
      users= [user, ...users];
    }
    
    else{users=[user];}
    localStorage.setItem('Users', JSON.stringify(users));
  }

  //http email
  httpGet(url:any) {
    return this.http.get(url);
  }

  httpPost(url:any, {}) {
    return this.http.post(url, { name: "janna ceo of digitech" });
  }

  sendEmail(url:any, data:any) {
    return this.http.post(url, data);
  }
  
}

