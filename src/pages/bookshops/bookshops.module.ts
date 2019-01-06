import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookshopsPage } from './bookshops';

@NgModule({
  declarations: [
    BookshopsPage,
  ],
  imports: [
    IonicPageModule.forChild(BookshopsPage),
  ],
})
export class BookshopsPageModule {}
