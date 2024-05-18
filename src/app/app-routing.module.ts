import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMangaComponent } from './add-manga/add-manga.component';
import { EditMangaComponent } from './edit-manga/edit-manga.component';
import { HomeComponent } from './home/home.component';
import { ListMangaComponent } from './list-manga/list-manga.component';
import { environment } from 'environments/environment';


const routes: Routes = [
  {
    path:'',component:HomeComponent},
  { path: 'add-manga',component:AddMangaComponent},
  { path: 'list-manga',component:ListMangaComponent},
  { path: 'edit-manga/:id',component:EditMangaComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
