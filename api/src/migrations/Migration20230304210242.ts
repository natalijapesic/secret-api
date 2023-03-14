import { Migration } from '@mikro-orm/migrations';

export class Migration20230304210242 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" rename column "wallet" to "wallet_address";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" rename column "wallet_address" to "wallet";');
  }

}
