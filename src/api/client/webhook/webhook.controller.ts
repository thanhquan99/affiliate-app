import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HandleEventDTO } from './webhook.dto';
import { WebhookService } from './webhook.service';

@ApiTags('Webhook')
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
