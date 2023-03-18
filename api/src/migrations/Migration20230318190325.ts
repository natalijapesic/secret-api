import { Migration } from '@mikro-orm/migrations';

export class Migration20230318190325 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_locations" ("user_id" uuid not null, "location_info_id" uuid not null, constraint "user_locations_pkey" primary key ("user_id", "location_info_id"));');

    this.addSql('alter table "user_locations" add constraint "user_locations_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_locations" add constraint "user_locations_location_info_id_foreign" foreign key ("location_info_id") references "location_info" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "exam_locations" cascade;');

    this.addSql('alter table "location_info" add column "time" int not null, add column "exam_id" uuid not null;');
    this.addSql('alter table "location_info" add constraint "location_info_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade;');

    this.addSql('alter table "user" drop column "users_location";');
  }

  async down(): Promise<void> {
    this.addSql('create table "exam_locations" ("exam_id" uuid not null, "location_info_id" uuid not null, constraint "exam_locations_pkey" primary key ("exam_id", "location_info_id"));');

    this.addSql('alter table "exam_locations" add constraint "exam_locations_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "exam_locations" add constraint "exam_locations_location_info_id_foreign" foreign key ("location_info_id") references "location_info" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "user_locations" cascade;');

    this.addSql('alter table "location_info" drop constraint "location_info_exam_id_foreign";');

    this.addSql('alter table "location_info" drop column "time";');
    this.addSql('alter table "location_info" drop column "exam_id";');

    this.addSql('alter table "user" add column "users_location" jsonb not null;');
  }

}
