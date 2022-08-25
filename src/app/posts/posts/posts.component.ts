import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts:Post[]=[];
  
  constructor(private activatedRoute:ActivatedRoute) {
    this.posts=this.activatedRoute.snapshot.data['posts'];
    console.log(this.posts);
   }

  ngOnInit(): void {
  }

}
