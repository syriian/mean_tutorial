import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {
  enteredContent = "";
  enteredTitle = "";
  //---------outputs data to parent via the eventemitter
  @Output() postCreated = new EventEmitter();

  onAddPost() {
    const post = {
      //---setting data when passed from view.
      title: this.enteredTitle,
      content: this.enteredContent
    };
    //------Calling the emit function to emit postCreated variable
    this.postCreated.emit(post);
  }
}
