import { Migration } from '@mikro-orm/migrations';

export class Migration20230417195407 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "exam" ("id" uuid not null, "name" varchar(255) not null, "time" int not null, "contract_id" int null, "is_ready" boolean not null default true, constraint "exam_pkey" primary key ("id"));');

    this.addSql('create table "location_info" ("id" uuid not null, "street" varchar(255) not null, "number" varchar(255) not null, "city" varchar(255) not null, "time" int null, "classroom" varchar(255) null, "exam_id" uuid null, constraint "location_info_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" uuid not null, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "wallet_address" varchar(255) not null, "jmbg" varchar(255) not null, "role" text check ("role" in (\'admin\', \'parlament\', \'profesor\', \'student\', \'organization\')) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "exam_users" ("exam_id" uuid not null, "user_id" uuid not null, constraint "exam_users_pkey" primary key ("exam_id", "user_id"));');

    this.addSql('create table "user_locations" ("user_id" uuid not null, "location_info_id" uuid not null, constraint "user_locations_pkey" primary key ("user_id", "location_info_id"));');

    this.addSql('alter table "location_info" add constraint "location_info_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade on delete set null;');

    this.addSql('alter table "exam_users" add constraint "exam_users_exam_id_foreign" foreign key ("exam_id") references "exam" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "exam_users" add constraint "exam_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_locations" add constraint "user_locations_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_locations" add constraint "user_locations_location_info_id_foreign" foreign key ("location_info_id") references "location_info" ("id") on update cascade on delete cascade;');
  }

}
