import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FilterModel, GenderEnum, StatusEnum} from "../../core/models/other.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrl: './filter-search.component.css'
})
export class FilterSearchComponent implements OnInit {
  @Output()
  filter: EventEmitter<FilterModel> = new EventEmitter();

  GenderEnum = GenderEnum;
  StatusEnum = StatusEnum;

  searchFilterForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.minLength(3)),
    gender: new FormControl(null),
    species: new FormControl(null, Validators.minLength(3)),
    status: new FormControl(null),
    type: new FormControl(null, Validators.minLength(3)),
  });

  protected readonly Object = Object;

  ngOnInit(): void {
    this.searchFilterForm.valueChanges.subscribe((change) => {
      if (this.searchFilterForm.valid) {
        this.filter.emit(change);
      }
    });
  }

  clearForm() {
    this.searchFilterForm.reset();
  }
}
