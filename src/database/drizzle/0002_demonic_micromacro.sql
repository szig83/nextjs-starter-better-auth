ALTER TABLE "auth"."groups" DROP CONSTRAINT "groups_name_unique";--> statement-breakpoint
ALTER TABLE "auth"."groups" ALTER COLUMN "name" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "auth"."groups" ALTER COLUMN "description" SET DATA TYPE jsonb;