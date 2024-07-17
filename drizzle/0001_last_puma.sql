CREATE TABLE IF NOT EXISTS "page" (
	"id" uuid PRIMARY KEY NOT NULL,
	"creator" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"image" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "page" ADD CONSTRAINT "page_creator_user_id_fk" FOREIGN KEY ("creator") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
