import { Migration } from '@mikro-orm/migrations';

export class Migration20230305104018 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "exam" add column "is_ready" boolean not null default false;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "exam" drop column "is_ready";');
  }

}
