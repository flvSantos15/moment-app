import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Moment } from 'src/app/Moments';

@Component({
  selector: 'app-momemt-form',
  templateUrl: './momemt-form.component.html',
  styleUrls: ['./momemt-form.component.css'],
})
export class MomemtFormComponent {
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string;
  @Input() momentData: Moment | null = null;

  momentForm!: FormGroup;

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id : ``),
      title: new FormControl(this.momentData ? this.momentData.title : ``, [
        Validators.required,
      ]),
      description: new FormControl(
        this.momentData ? this.momentData.description : ``,
        [Validators.required]
      ),
      image: new FormControl(``),
    });
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.momentForm.patchValue({ image: file });
  }

  submit() {
    if (this.momentForm.invalid) {
      return;
    }

    // estou passando os dados para o componente pai.
    // estou jogando as informações para fora.
    this.onSubmit.emit(this.momentForm.value);
  }
}
