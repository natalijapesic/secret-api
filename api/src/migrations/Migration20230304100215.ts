import { Migration } from '@mikro-orm/migrations';

export class Migration20230304100215 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "exam_users" ("exam_id" uuid not null, "user_id" uuid not null, constraint "exam_users_pkey" primary key ("exam_id", "user_id"));');

    this.addSql('alter table "exam_users" add constraint "exam_users_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "exam_users" add constraint "exam_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "exam_students" cascade;');

    this.addSql('drop table if exists "exam_organizations" cascade;');

    this.addSql('alter table "user" drop constraint if exists "user_role_check";');

    this.addSql('alter table "exam" alter column "contract_id" type int using ("contract_id"::int);');
    this.addSql('alter table "exam" alter column "contract_id" drop not null;');

    this.addSql('alter table "user" alter column "role" type text using ("role"::text);');
    this.addSql('alter table "user" add constraint "user_role_check" check ("role" in (\'profesor\', \'student\', \'organization\'));');
    this.addSql('alter table "user" drop column "name";');
  }

  async down(): Promise<void> {
    this.addSql('create table "exam_students" ("exam_id" uuid not null, "user_id" uuid not null, constraint "exam_students_pkey" primary key ("exam_id", "user_id"));');

    this.addSql('create table "exam_organizations" ("exam_id" uuid not null, "user_id" uuid not null, constraint "exam_organizations_pkey" primary key ("exam_id", "user_id"));');

    this.addSql('alter table "exam_students" add constraint "exam_students_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "exam_students" add constraint "exam_students_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "exam_organizations" add constraint "exam_organizations_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "exam_organizations" add constraint "exam_organizations_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "exam_users" cascade;');

    this.addSql('alter table "user" drop constraint if exists "user_role_check";');

    this.addSql('alter table "exam" alter column "contract_id" type int using ("contract_id"::int);');
    this.addSql('alter table "exam" alter column "contract_id" set not null;');

    this.addSql('alter table "user" add column "name" varchar(255) not null;');
    this.addSql('alter table "user" alter column "role" type text using ("role"::text);');
    this.addSql('alter table "user" add constraint "user_role_check" check ("role" in (\'parlament\', \'student\', \'organization\'));');
  }

}
