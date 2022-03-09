import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TimeagoIntl } from 'ngx-timeago';
import {strings as spanishStrings} from 'ngx-timeago/language-strings/es';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {
  @Input() date: Date = new Date();
  isLoggedIn = false; 
  posts: any;
  editMode = false; 
  itemToEdit:String | null = null;
  token = localStorage.getItem('token');
  constructor(intl: TimeagoIntl) {
    intl.strings = spanishStrings;
    intl.changes.next();
   }
  refreshPost(){
    this.editMode = false; 
    fetch('http://localhost:5000/p/all/' + this.token, { method: "post" })
    .then(res => res.json())
    .then(data => { this.posts = data; console.log(this.posts) });
    
  }
  deleteItem(id: String) {
   if(!window.confirm("¿Estas seguro que quieres borrar este post?")) return;
    fetch('http://localhost:5000/p/'+ id, {
      method: "delete",
    })
      .then(res => {
        this.refreshPost()
       });
  }
  openModal(id: String) {
    this.editMode = !this.editMode; 
    this.itemToEdit = id
  }
  editItem(fd: NgForm, id:String){

    const {title, content} = fd.form.value;
    fetch('http://localhost:5000/p/'+ id, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: 'put',
      body: JSON.stringify({
        title,
        content
      })
      }).then(res => {
        this.refreshPost()
      })
  }
  onSubmit(f: NgForm) {
    const { title, content } = f.form.value;
    
    fetch('http://localhost:5000/p/add', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: "post",
      body: JSON.stringify({ title, content, userId: this.token }),
    })
      .then(res => {
        console.log(res)
        fetch('http://localhost:5000/p/all/' + this.token, { method: "post" })
        .then(res => res.json())
        .then(data => { this.posts = data; console.log(this.posts) });
       });
  }

  ngOnInit(): void {
      
      if(this.token){
      this.isLoggedIn = true; 
      fetch('http://localhost:5000/p/all/' + this.token, { method: "post" })
        .then(res => res.json())
        .then(data => { this.posts = data; console.log(this.posts) });
      }
      else{
          fetch('http://localhost:5000/p/all/', { method: "post" })
          .then(res => res.json())
          .then(data => { this.posts = data; console.log(this.posts) });
      }
  }

  }
