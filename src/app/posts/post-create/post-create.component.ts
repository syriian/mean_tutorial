import { Component, OnInit } from "@angular/core";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FnParam } from "@angular/compiler/src/output/output_ast";
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredContent = "";
  enteredTitle = "";
  post: Post;
  isLoading = false;
  form: FormGroup; // groups all parts of a form.
  imagePreview: string;
  private mode = "create";
  private postId: string;
  //---------outputs data to parent via the eventemitter of generic type post

  //injecting posts service
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  //get postId by route
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    //paramMap is a observable, observs for changes in the url
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      //check if paramMap has the postId defined in app-routing module
      if (paramMap.has("postId")) {
        this.mode = "edit";
        // assign the sended Id to local variable
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        //set post to the correct one.
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content
          });
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    //convert data to normal url
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  //---Passing in form of type NgForm
  onSavePost() {
    //--validate form
    if (this.form.invalid) {
      return; // do nothing
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    }
    //---- calling addPost function via the service.

    this.form.reset(); //resets form inputs and validities
  }
}
