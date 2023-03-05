import { Component } from '@angular/core';

import { Moment } from 'src/app/Moments';

import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent {
  btnText = 'Compartilhar';

  constructor(private momentService: MomentService) {}

  // aqui recebo os dados do filho e vou enviar a API
  async handleCreateMoment(moment: Moment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.description);
    }

    // enviar para o service
    await this.momentService.createMomentService(formData).subscribe();
    // exibir msg
    // redirect
  }
}
