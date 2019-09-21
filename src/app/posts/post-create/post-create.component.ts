import { Component } from "@angular/core";

import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {
  enteredContent = "";
  enteredTitle = "";
  //---------outputs data to parent via the eventemitter of generic type post

  //injecting posts service
  constructor(public postsService: PostsService) {}

  //---Passing in form of type NgForm
  onAddPost(form: NgForm) {
    //--validate form
    if (form.invalid) {
      return; // do nothing
    }

    //---- calling addPost function via the service.
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm(); //resets form inputs and validities
  }
}
