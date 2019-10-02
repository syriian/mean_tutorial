import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  //--------Dummy data------------//
  // posts = [
  //   { title: "first post", content: "this is the first post's content" },
  //   { title: "second post", content: "this is the second post's content" },
  //   { title: "third post", content: "this is the third post's content" }
  // ];

  //--------dynamic data - inputs from parent
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {
    //injecting instance of PostsService
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
