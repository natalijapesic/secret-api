import { Migration } from '@mikro-orm/migrations';

export class Migration20230327050452 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "exam" alter column "contract_id" type int using ("contract_id"::int);');
    this.addSql('alter table "exam" alter column "is_ready" type boolean using ("is_ready"::boolean);');
    this.addSql('alter table "exam" alter column "is_ready" set default true;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "exam" alter column "contract_id" type varchar(255) using ("contract_id"::varchar(255));');
    this.addSql('alter table "exam" alter column "is_ready" type boolean using ("is_ready"::boolean);');
    this.addSql('alter table "exam" alter column "is_ready" set default false;');
  }

}
