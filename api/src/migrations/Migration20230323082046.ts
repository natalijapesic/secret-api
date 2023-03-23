import { Migration } from '@mikro-orm/migrations';

export class Migration20230323082046 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "exam" alter column "course" type varchar(255) using ("course"::varchar(255));');
    this.addSql('alter table "exam" alter column "course" drop not null;');

    this.addSql('alter table "location_info" drop column "municipality";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "exam" alter column "course" type varchar(255) using ("course"::varchar(255));');
    this.addSql('alter table "exam" alter column "course" set not null;');

    this.addSql('alter table "location_info" add column "municipality" varchar(255) null;');
  }

}
