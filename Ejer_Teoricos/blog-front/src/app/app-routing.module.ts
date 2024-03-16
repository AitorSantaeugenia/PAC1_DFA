import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageFormComponent } from './message/Components/message-form/message-form.component';
import { MessageListComponent } from './message/Components/message-list/message-list.component';

const routes: Routes = [
  {
    path: '',
    component: MessageListComponent,
  },
  {
    path: 'message/:id',
    component: MessageFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
