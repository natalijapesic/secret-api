import { Migration } from '@mikro-orm/migrations';

export class Migration20230319202512 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "location_info" alter column "time" type int using ("time"::int);');
    this.addSql('alter table "location_info" alter column "time" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "location_info" alter column "time" type int using ("time"::int);');
    this.addSql('alter table "location_info" alter column "time" set not null;');
  }

}
