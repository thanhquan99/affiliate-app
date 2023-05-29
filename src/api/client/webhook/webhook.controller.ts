import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HandleEventDTO } from './webhook.dto';
import { WebhookService } from './webhook.service';

@UsePipes(ValidationPipe)
@Controller('webhook')
export class WebhookController {
  private service = new WebhookService();

  @Post('/events')
  handleEvents(@Body() payload: HandleEventDTO): Promise<void> {
    this.service.handleEvents(payload);
    return;
  }
}
