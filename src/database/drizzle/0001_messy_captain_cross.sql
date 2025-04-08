CREATE TABLE "auth"."group_permissions" (
	"group_id" serial NOT NULL,
	"permission_id" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "group_permissions_group_id_permission_id_pk" PRIMARY KEY("group_id","permission_id")
);
--> statement-breakpoint
ALTER TABLE "auth"."sessions" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "auth"."sessions" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "auth"."group_permissions" ADD CONSTRAINT "group_permissions_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "auth"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth"."group_permissions" ADD CONSTRAINT "group_permissions_permission_id_permissions_id_fk" FOREIGN KEY ("permission_id") REFERENCES "auth"."permissions"("id") ON DELETE no action ON UPDATE no action;