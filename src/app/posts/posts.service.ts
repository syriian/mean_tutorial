import { Injectable } from "@angular/core";

import { Post } from "./post.model";

@Injectable({ providedIn: "root" }) //routing, makes service visible
export class PostsService {
  private posts: Post[] = [];

  getPosts() {
    return [...this.posts]; // copy array and assign to new variable
  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.posts.push(post);
  }
}
