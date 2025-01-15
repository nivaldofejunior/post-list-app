import { Route } from '@angular/router';
import { PostListComponent } from './pages/post-list/post-list.component';

export const routes: Route[] = [

  {
    path: 'list',
    component: PostListComponent
  },

  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  }
];
