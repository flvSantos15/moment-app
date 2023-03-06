import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Moment } from 'src/app/Moments';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent {
  btnText = 'Compartilhar';

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  // aqui recebo os dados do filho e vou enviar a API
  async handleCreateMoment(moment: Moment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    // enviar os dados para o service
    await this.momentService.createMomentService(formData).subscribe();

    // aqui é como se fosse um contexto de alerta
    // aqui passo uma mensagem para o que seria um contexto
    this.messagesService.add('Momento adicionando com sucesso !');

    // dessa forma redireciono o user para a página home
    this.router.navigate(['/']);
  }
}
