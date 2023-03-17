import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { CommentService } from 'src/app/services/comment.service';

import { Moment } from 'src/app/Moments';
import { Comment } from 'src/app/Comment';

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

  commentForm!: FormGroup;

  constructor(
    private momentsService: MomentService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentsService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async handleRemoveMoment(id: number) {
    await this.momentsService.removeMomentService(id).subscribe();

    this.messagesService.add('Momento excluído com sucesso!');

    this.router.navigate(['/']);
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.commentService
      .handleCreateComment(data)
      .subscribe((comment) => this.moment!.comments?.push(comment.data));

    this.messagesService.add('Comentário adicionado!');

    this.commentForm.reset();

    formDirective.resetForm();
  }
}
