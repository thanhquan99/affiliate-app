import { ModelFields } from 'src/db/models/BaseModel';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DEFAULT_EMAIL } from '../constant';
import { Schedule, Transaction } from '../db/models';

@Injectable()
export class CronJobsService {
  constructor(public readonly mailService: MailerService) {}

  @Cron('0 */30 * * * *')
  async handleCron() {
    const now = new Date();
    const lastSunday = new Date(now.setDate(now.getDate() - now.getDay()));
    const lastSundayMidNight = lastSunday.setHours(0, 0, 0, 0);
    const sundayInDB = new Date('2022/01/09').getTime();
    const distance = lastSundayMidNight - sundayInDB;

    const compareDate = new Date(Date.now() - distance + 1000 * 60 * 30);
    const schedulePlans = await Schedule.query()
      .whereNotNull('tutorStudentId')
      .andWhere('startTime', '<=', compareDate.toISOString())
      .andWhere(
        'startTime',
        '>=',
        new Date(new Date().getTime() - distance).toISOString(),
      )
      .modify('defaultSelect');

    const sendMailFuncs = schedulePlans.map((schedule) => {
      let content: string;
      const startTime = new Date(schedule.startTime);
      const endTime = new Date(schedule.endTime);

      if (schedule.tutorStudent?.student?.userId === schedule.userId) {
        content = `You have a <b>${
          schedule.tutorStudent?.subject?.name
        }</b> class schedule with teacher <b>${
          schedule.tutorStudent.tutor?.profile?.name
        }</b> from <b>${startTime.toLocaleTimeString(
          'vi-VN',
        )}</b> to <b>${endTime.toLocaleTimeString('vi-VN')}</b> `;
      }

      if (schedule.tutorStudent?.tutor?.userId === schedule.userId) {
        content = `You have a <b>${
          schedule.tutorStudent?.subject?.name
        }</b> lesson schedule for student <b>${
          schedule.tutorStudent.student?.profile?.name
        }</b> from <b>${startTime.toLocaleTimeString(
          'vi-VN',
        )}</b> to <b>${endTime.toLocaleTimeString('vi-VN')}</b>`;
      }

      return this.mailService.sendMail({
        to: DEFAULT_EMAIL,
        subject: 'Schedule Announcement',
        html: content, // HTML body content
      });
    });
    await Promise.all(sendMailFuncs);

    const transactions = schedulePlans
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.tutorStudentId === value.tutorStudentId),
      ) //Remove duplicate tutorStudentId
      .map(
        (e): ModelFields<Transaction> => ({
          price: e.tutorStudent?.salary,
          isPaid: false,
          tutorUserId: e.tutorStudent.tutor?.userId,
          studentUserId: e.tutorStudent?.student?.userId,
          subjectId: e.tutorStudent?.subjectId,
        }),
      );
    await Transaction.query().insert(transactions);
  }
}
