ALTER TABLE "reports" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "road_type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "photos" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "userId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reports" ADD CONSTRAINT "reports_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "reports" DROP COLUMN IF EXISTS "issueType";--> statement-breakpoint
ALTER TABLE "reports" DROP COLUMN IF EXISTS "media";--> statement-breakpoint
DROP TYPE "public"."issue_type";