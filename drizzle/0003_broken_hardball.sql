ALTER TABLE "reports" DROP CONSTRAINT "reports_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "reports" DROP COLUMN IF EXISTS "userId";