import { Migration } from '@mikro-orm/migrations';

export class Migration20230319202624 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "location_info" drop constraint "location_info_exam_id_foreign";');

    this.addSql('alter table "location_info" alter column "exam_id" drop default;');
    this.addSql('alter table "location_info" alter column "exam_id" type uuid using ("exam_id"::text::uuid);');
    this.addSql('alter table "location_info" alter column "exam_id" drop not null;');
    this.addSql('alter table "location_info" add constraint "location_info_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "location_info" drop constraint "location_info_exam_id_foreign";');

    this.addSql('alter table "location_info" alter column "exam_id" drop default;');
    this.addSql('alter table "location_info" alter column "exam_id" type uuid using ("exam_id"::text::uuid);');
    this.addSql('alter table "location_info" alter column "exam_id" set not null;');
    this.addSql('alter table "location_info" add constraint "location_info_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade;');
  }

}
