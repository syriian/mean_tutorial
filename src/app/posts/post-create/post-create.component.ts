import { Component, EventEmitter, Output } from "@angular/core";

import { Post } from "../post.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {
  enteredContent = "";
  enteredTitle = "";
  //---------outputs data to parent via the eventemitter of generic type post
  @Output() postCreated = new EventEmitter<Post>();

  //---Passing in form of type NgForm
  onAddPost(form: NgForm) {
    //--validate form
    if (form.invalid) {
      return; // do nothing
    }
    const post: Post = {
      //---setting data when passed from view via the form object parameter.
      title: form.value.title,
      content: form.value.content
    };
    //----Calling the emit function with param of type post
    this.postCreated.emit(post);
  }
}
