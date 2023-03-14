import { Migration } from '@mikro-orm/migrations';

export class Migration20230304213949 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "exam" alter column "contract_id" type varchar(255) using ("contract_id"::varchar(255));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "exam" alter column "contract_id" type int using ("contract_id"::int);');
  }

}
