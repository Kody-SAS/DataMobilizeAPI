ALTER TABLE "public"."reports" ALTER COLUMN "issueType" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."issue_type";--> statement-breakpoint
CREATE TYPE "public"."issue_type" AS ENUM('CAR', 'MOTO');--> statement-breakpoint
ALTER TABLE "public"."reports" ALTER COLUMN "issueType" SET DATA TYPE "public"."issue_type" USING "issueType"::"public"."issue_type";