import { Migration } from '@mikro-orm/migrations';

export class Migration20230122122623 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_role_check";');

    this.addSql('alter table "user" alter column "role" type text using ("role"::text);');
    this.addSql('alter table "user" add constraint "user_role_check" check ("role" in (\'parlament\', \'student\', \'organization\'));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_role_check";');

    this.addSql('alter table "user" alter column "role" type text using ("role"::text);');
    this.addSql('alter table "user" add constraint "user_role_check" check ("role" in (\'Parlament\', \'Student\', \'Organization\'));');
  }

}
