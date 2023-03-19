import { Migration } from '@mikro-orm/migrations';

export class Migration20230319202558 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "location_info" alter column "classroom" type varchar(255) using ("classroom"::varchar(255));');
    this.addSql('alter table "location_info" alter column "classroom" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "location_info" alter column "classroom" type varchar(255) using ("classroom"::varchar(255));');
    this.addSql('alter table "location_info" alter column "classroom" set not null;');
  }

}
