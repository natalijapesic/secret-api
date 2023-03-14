import { Migration } from '@mikro-orm/migrations';

export class Migration20230305190348 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "location_info" ("id" uuid not null, "street" varchar(255) not null, "number" varchar(255) not null, "city" varchar(255) not null, "municipality" varchar(255) null, constraint "location_info_pkey" primary key ("id"));');

    this.addSql('create table "exam_locations" ("exam_id" uuid not null, "location_info_id" uuid not null, constraint "exam_locations_pkey" primary key ("exam_id", "location_info_id"));');

    this.addSql('alter table "exam_locations" add constraint "exam_locations_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "exam_locations" add constraint "exam_locations_location_info_id_foreign" foreign key ("location_info_id") references "location_info" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "exam" drop column "locations";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "exam_locations" drop constraint "exam_locations_location_info_id_foreign";');

    this.addSql('drop table if exists "location_info" cascade;');

    this.addSql('drop table if exists "exam_locations" cascade;');

    this.addSql('alter table "exam" add column "locations" jsonb not null;');
  }

}
