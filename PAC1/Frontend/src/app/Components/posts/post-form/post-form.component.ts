import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { PostService } from 'src/app/Services/post.service';
import { SharedService } from 'src/app/Services/shared.service';
import { PostDTO } from 'src/app/Models/post.dto';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  post: PostDTO;
  title: FormControl;
  description: FormControl;
  publication_date: FormControl;
  category: FormControl;
  categories: CategoryDTO[] = [];
  postForm: FormGroup;
  isValidForm: boolean | null;
  private isUpdateMode: boolean;
  private validRequest: boolean;
  private postId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private categoryService: CategoryService
  ) {
    this.isValidForm = null;
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.post = new PostDTO('', '', 0, 0, new Date());
    this.isUpdateMode = false;
    this.validRequest = false;

    this.title = new FormControl('', [
      Validators.required,
      Validators.maxLength(55),
    ]);

    this.description = new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.publication_date = new FormControl('', [Validators.required]);

    this.category = new FormControl('', Validators.required);

    this.postForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      publication_date: this.publication_date,
      category: this.category,
    });
  }

  async ngOnInit(): Promise<void> {
    let errorResponse: any;

    const userId = this.localStorageService.get('user_id');
    if (userId) {
      try {
        this.categories = await this.categoryService.getCategoriesByUserId(userId);
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    }

    // Si estás en modo de actualización, cargar el post existente
    if (this.postId) {
      this.isUpdateMode = true;
      try {
        this.post = await this.postService.getPostById(this.postId);

        this.title.setValue(this.post.title);
        this.description.setValue(this.post.description);
        this.publication_date.setValue(
          formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en')
        );

        // Setear la categoría del post
        if (this.post.categories.length > 0) {
          this.category.setValue(this.post.categories[0]?.categoryId);
        }

      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    }
  }

  private async editPost(): Promise<boolean> {
    let errorResponse: any;
    let responseOK: boolean = false;

    if (this.postId) {
      const userId = this.localStorageService.get('user_id');

      if (userId) {
        this.post.userId = userId;
        
        try {
          await this.postService.updatePost(this.postId, this.post);
          responseOK = true;
        } catch (error: any) {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }

        await this.sharedService.managementToast(
          'postFeedback',
          responseOK,
          errorResponse
        );

        if (responseOK) {
          this.router.navigateByUrl('posts');
        }
      }
    }
    return responseOK;
  }

  private async createPost(): Promise<boolean> {
    let errorResponse: any;
    let responseOK: boolean = false;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.post.userId = userId;
      try {
        await this.postService.createPost(this.post);
        responseOK = true;
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }

      await this.sharedService.managementToast(
        'postFeedback',
        responseOK,
        errorResponse
      );

      if (responseOK) {
        this.router.navigateByUrl('posts');
      }
    }

    return responseOK;
  }

  async savePost() {
    this.isValidForm = false;
  
    if (this.postForm.invalid) {
      return;
    }
  
    this.isValidForm = true;
  
    this.post.title = this.title.value;
    this.post.description = this.description.value;
    this.post.publication_date = this.publication_date.value;
  
    const selectedCategories = this.category.value;
  
    this.post.categories = [];
    for (const categoryId of selectedCategories) {
      const category = this.categories.find(c => c.categoryId === categoryId);
      if (category) {
        this.post.categories.push(category);
      }
    }
  
    try {
      if (this.isUpdateMode) {
        await this.editPost();
      } else {
        await this.createPost();
      }

      this.router.navigateByUrl('posts');
    } catch (error) {

      console.error('Error al guardar el post:', error);

    }
  }
}