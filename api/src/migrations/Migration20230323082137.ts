import { Migration } from '@mikro-orm/migrations';

export class Migration20230323082137 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "exam" drop column "course";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "exam" add column "course" varchar(255) null;');
  }

}
