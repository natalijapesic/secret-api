import { Migration } from '@mikro-orm/migrations';

export class Migration20230304220758 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "exam_users" ("exam_id" uuid not null, "user_id" uuid not null, constraint "exam_users_pkey" primary key ("exam_id", "user_id"));');

    this.addSql('alter table "exam_users" add constraint "exam_users_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "exam_users" add constraint "exam_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "exam_students" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "exam_students" ("exam_id" uuid not null, "user_id" uuid not null, constraint "exam_students_pkey" primary key ("exam_id", "user_id"));');

    this.addSql('alter table "exam_students" add constraint "exam_students_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "exam_students" add constraint "exam_students_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "exam_users" cascade;');
  }

}
