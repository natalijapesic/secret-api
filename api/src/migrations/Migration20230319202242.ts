import { Migration } from '@mikro-orm/migrations';

export class Migration20230319202242 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "location_info" add column "time" int not null, add column "classroom" varchar(255) not null, add column "exam_id" uuid not null;');
    this.addSql('alter table "location_info" add constraint "location_info_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "location_info" drop constraint "location_info_exam_id_foreign";');

    this.addSql('alter table "location_info" drop column "time";');
    this.addSql('alter table "location_info" drop column "classroom";');
    this.addSql('alter table "location_info" drop column "exam_id";');
  }

}
