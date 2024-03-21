import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showAuthSection: boolean;
  showNoAuthSection: boolean;
  lang:string = '';

  constructor(
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService
  ) {
    this.showAuthSection = false;
    this.showNoAuthSection = true;
  }

  ngOnInit(): void {
    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showAuthSection = headerInfo.showAuthSection;
          this.showNoAuthSection = headerInfo.showNoAuthSection;
        }
      }
    );

    this.lang = localStorage.getItem('lang') || 'en';
  }

  home(): void {
    this.router.navigateByUrl('home');
  }

  login(): void {
    this.router.navigateByUrl('login');
  }

  register(): void {
    this.router.navigateByUrl('register');
  }

  adminPosts(): void {
    this.router.navigateByUrl('posts');
  }

  adminCategories(): void {
    this.router.navigateByUrl('categories');
  }

  profile(): void {
    this.router.navigateByUrl('profile');
  }

  logout(): void {
    // TODO 15
    // Eliminamos el user_id del localStorage
    this.localStorageService.remove('user_id');

    // Eliminamos el token del localStorage
    this.localStorageService.remove('access_token');

    // Constante headerInfo con las propiedades necesarias
    const headerInfo: HeaderMenus = {
      showAuthSection: false,
      showNoAuthSection: true
    };

    // Actualizamos puntos del menu
    this.headerMenusService.headerManagement.next(headerInfo);

    // Redireccionamos
    this.router.navigateByUrl('home');
  }

  dashboard(){
    this.router.navigateByUrl('dashboard')
  }

  ChangeLang(lang:any){
    const selectedLanguage = lang.target.value;
    localStorage.setItem('lang', selectedLanguage)

    this.translateService.use(selectedLanguage)
  }
}
