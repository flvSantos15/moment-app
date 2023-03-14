import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

import { Moment } from 'src/app/Moments';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent {
  moment?: Moment;
  baseApiUrl = 'http://localhost:3333/';

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentsService: MomentService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentsService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));
  }

  async handleRemoveMoment(id: number) {
    await this.momentsService.removeMomentService(id).subscribe();

    this.messagesService.add('Momento excluído com sucesso!');

    this.router.navigate(['/']);
  }
}
