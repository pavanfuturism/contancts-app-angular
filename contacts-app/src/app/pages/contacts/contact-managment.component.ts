import { Component, OnInit } from '@angular/core';
import { contact } from '../../shared/models/contact-model';
import { contactService } from '../../shared/services/contact-service'
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/validators/email.validator';

@Component({
//  standalone:true,
  selector: 'app-contact-managment',
  templateUrl: './contact-managment.component.html',
  styleUrls: ['./contact-managment.component.css'],
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;
  isSubmitted: boolean = false;
  inputformControl: FormControl = new FormControl({}, []);

  contacts: contact[] = [];
  
  contactSelected: contact = {} as contact;
  isEditing: boolean = false;

  constructor( private fb: FormBuilder,private contactService: contactService,
    private router: Router) { 
      this.contactForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, emailValidator]],     
      });
    }

  ngOnInit(): void {
    this.getcontacts();
  }

  private getcontacts() {
    this.contactService.getcontactsList().subscribe((res: any) => {
      if (res.isSuccess) {
        this.contacts=res.result;
    }
  })
  }

  createcontact() {
    this.contacts.unshift({
      iContactId: 0,
      strFirstName: '',
      strLastName: '',
      strEmail: ''
    })
    this.contactSelected = this.contacts[0];
  }

  updatecontact(contact: any) {
    if(Object.keys(this.contactSelected).length === 0) {
      this.contactSelected = contact;
      this.isEditing = true;
      
      this.contactForm.patchValue({
        firstName: contact.strFirstName,
        lastName: contact.strLastName,
        email: contact.strEmail
      })
    }
  }
  onSubmit(){
    this.isSubmitted = true;
console.log(this.contactForm.invalid);
    if (this.contactForm.invalid) {
      return;
    }
  }
  savecontact()
  {
    if (this.contactForm.invalid) {
      
    }
    let index =0;
    if(!this.isEditing) {
       this.contacts[0] = {
        iContactId: -1,
        strFirstName: this.contactForm.value.firstName!,
        strLastName: this.contactForm.value.lastName!,
        strEmail: this.contactForm.value.email!
       }
    }   
    else {
     index = this.contacts.map(u => u.iContactId).indexOf(this.contactSelected.iContactId);
    // // updates the user at the index selected
      this.contacts[index] = {
        iContactId: this.contactSelected.iContactId,
        strFirstName: this.contactForm.value.firstName!,
        strLastName: this.contactForm.value.lastName!,
        strEmail: this.contactForm.value.email!
      };
    }
    //api call 
    this.contactService.createupdatecontact(this.contacts[index]).subscribe((res: any) => {
      if (res.isSuccess) {
        this.getcontacts();
    }
  });
 // clean up
  this.contactSelected = {} as contact;
  this.isEditing = false ;
  this.contactForm.reset();  
}

  deletecontact(id: any) {
    this.contactService.deletecontact(id).subscribe((res: any) => {
      if (res.isSuccess) {
        this.getcontacts();
    }
  });  
  }

  cancel() {
    // clears the user selected
    this.contactSelected = {} as contact;
    // resets the form
   this.contactForm.reset();
  }
}
