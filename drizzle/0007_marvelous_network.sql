CREATE TABLE IF NOT EXISTS "incidents" (
	"id" text PRIMARY KEY NOT NULL,
	"incident_type" text,
	"severity" text,
	"responder_type" text,
	"description" text,
	"report_id" text,
	CONSTRAINT "incidents_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roadTypes" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"road_type" text,
	CONSTRAINT "roadTypes_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "reports" ALTER COLUMN "road_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ALTER COLUMN "category" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "incidents" ADD CONSTRAINT "incidents_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."reports"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
