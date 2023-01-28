import { Migration } from '@mikro-orm/migrations';

export class Migration20230122120723 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "user_exams" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "user_exams" ("user_id" uuid not null, "exam_id" uuid not null, constraint "user_exams_pkey" primary key ("user_id", "exam_id"));');

    this.addSql('alter table "user_exams" add constraint "user_exams_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_exams" add constraint "user_exams_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade on delete cascade;');
  }

}
