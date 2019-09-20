import { Component, Input } from "@angular/core";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent {
  //--------Dummy data------------//
  // posts = [
  //   { title: "first post", content: "this is the first post's content" },
  //   { title: "second post", content: "this is the second post's content" },
  //   { title: "third post", content: "this is the third post's content" }
  // ];

  //--------dynamic data - inputs from parent
  @Input() posts = [];
  postsService: PostsService; // create variable

  constructor(postsService: PostsService) {
    //injecting instance of PostsService
    this.postsService = postsService; //assigning the injected instance to local variable
  }
}
