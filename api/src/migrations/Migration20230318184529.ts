import { Migration } from '@mikro-orm/migrations';

export class Migration20230318184529 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "user_locations" cascade;');

    this.addSql('alter table "user" add column "users_location" jsonb not null;');
  }

  async down(): Promise<void> {
    this.addSql('create table "user_locations" ("user_id" uuid not null, "location_info_id" uuid not null, constraint "user_locations_pkey" primary key ("user_id", "location_info_id"));');

    this.addSql('alter table "user_locations" add constraint "user_locations_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_locations" add constraint "user_locations_location_info_id_foreign" foreign key ("location_info_id") references "location_info" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user" drop column "users_location";');
  }

}
