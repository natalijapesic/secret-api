import { Migration } from '@mikro-orm/migrations';

export class Migration20230318193030 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "location_info" add column "classroom" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "location_info" drop column "classroom";');
  }

}
