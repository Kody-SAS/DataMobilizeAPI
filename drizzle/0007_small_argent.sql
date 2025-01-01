CREATE TABLE IF NOT EXISTS "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "categories_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roadTypes" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"road_type" text,
	CONSTRAINT "roadTypes_id_unique" UNIQUE("id")
);
