ALTER TABLE "reports" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "localisation" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" DROP COLUMN IF EXISTS "location";--> statement-breakpoint
ALTER TABLE "public"."reports" ALTER COLUMN "issueType" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."issue_type";--> statement-breakpoint
CREATE TYPE "public"."issue_type" AS ENUM('Incident', 'Audit', 'Quick Reporting', 'Safety Perception');--> statement-breakpoint
ALTER TABLE "public"."reports" ALTER COLUMN "issueType" SET DATA TYPE "public"."issue_type" USING "issueType"::"public"."issue_type";