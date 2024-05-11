import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {PaginationComponent} from "./pagination/pagination.component";
import {FilterSearchComponent} from "./filter-search/filter-search.component";
import {CharacterCardComponent} from "./character-card/character-card.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {CoreModule} from "../core/core.module";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    PaginationComponent,
    FilterSearchComponent,
    CharacterCardComponent,
  ],
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    NgOptimizedImage,
    CoreModule,
    MatIcon,
    MatButton,
    MatPaginator,
    MatFormField,
    MatSelect,
    MatOption,
    MatInputModule,
    ReactiveFormsModule,
    MatMiniFabButton,
    FlexLayoutModule,
  ],
  exports: [
    PaginationComponent,
    FilterSearchComponent,
    CharacterCardComponent,
  ]
})
export class ComponentsModule {
}
