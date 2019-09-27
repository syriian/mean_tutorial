import { Component, OnInit } from "@angular/core";

import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FnParam } from "@angular/compiler/src/output/output_ast";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredContent = "";
  enteredTitle = "";
  private mode = "create";
  private postId: string;
  private post: Post;
  //---------outputs data to parent via the eventemitter of generic type post

  //injecting posts service
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  //get postId by route
  ngOnInit(): void {
    //paramMap is a observable, observs for changes in the url
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      //check if paramMap has the postId defined in app-routing module
      if (paramMap.has("postId")) {
        this.mode = "edit";
        // assign the sended Id to local variable
        this.postId = paramMap.get("postId");
        //set post to the correct one.
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

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
