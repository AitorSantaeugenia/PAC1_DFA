import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { PostDTO } from 'src/app/Models/post.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { PostService } from 'src/app/Services/post.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  posts!: PostDTO[];
  showButtons: boolean;

  //Para filtrar
  filteredPosts: PostDTO[] = [];
  filterText: string = '';
  filterAlias: string = '';
  
  constructor(
    private postService: PostService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private router: Router,
    private headerMenusService: HeaderMenusService
  ) {
    this.showButtons = false;
    this.loadPosts();
  }

  ngOnInit(): void {
    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showButtons = headerInfo.showAuthSection;
        }
      }
    );
  }
  private async loadPosts(): Promise<void> {
    // TODO 2
    let errorResponse: any;
    
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      try {
        this.posts = await this.postService.getPosts();
        this.filteredPosts = [...this.posts];

      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    }
  }

  async like(postId: string): Promise<void> {
    let errorResponse: any;
    try {
      await this.postService.likePost(postId);
      this.loadPosts();
    } catch (error: any) {
      errorResponse = error.error;
      this.sharedService.errorLog(errorResponse);
    }
  }

  async dislike(postId: string): Promise<void> {
    let errorResponse: any;
    try {
      await this.postService.dislikePost(postId);
      this.loadPosts();
    } catch (error: any) {
      errorResponse = error.error;
      this.sharedService.errorLog(errorResponse);
    }
  }

  filterPosts(): void {
    const filterTextLower = this.filterText ? this.filterText.toLowerCase() : '';
    const filterAliasLower = this.filterAlias ? this.filterAlias.toLowerCase() : '';
  
    this.filteredPosts = this.posts.filter(post => {
      const postTitleLower = post.title.toLowerCase();
      const postDescriptionLower = post.description.toLowerCase();
      const postAliasLower = post.userAlias.toLowerCase();
  
      const matchesText = this.filterText ? postTitleLower.includes(filterTextLower) || postDescriptionLower.includes(filterTextLower) : true;
      const matchesAlias = this.filterAlias ? postAliasLower.includes(filterAliasLower) : true;
  
      return matchesText && matchesAlias;
    });
  
    if (!this.filterText && !this.filterAlias) {
      this.filteredPosts = [...this.posts];
    }
  }
}
