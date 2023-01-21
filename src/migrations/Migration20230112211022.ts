import { Migration } from '@mikro-orm/migrations';

export class Migration20230112211022 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "exam" ("id" uuid not null, "name" varchar(255) not null, "time" int not null, "contract_id" int not null, "locations" jsonb not null, constraint "exam_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" uuid not null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "wallet" varchar(255) not null, "course" varchar(255) not null, "role" text check ("role" in (\'Parlament\', \'Student\', \'Organization\')) not null, constraint "user_pkey" primary key ("id"));');

    this.addSql('create table "exam_students" ("exam_id" uuid not null, "user_id" uuid not null, constraint "exam_students_pkey" primary key ("exam_id", "user_id"));');

    this.addSql('create table "exam_organizations" ("exam_id" uuid not null, "user_id" uuid not null, constraint "exam_organizations_pkey" primary key ("exam_id", "user_id"));');

    this.addSql('alter table "exam_students" add constraint "exam_students_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "exam_students" add constraint "exam_students_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "exam_organizations" add constraint "exam_organizations_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "exam_organizations" add constraint "exam_organizations_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

}
