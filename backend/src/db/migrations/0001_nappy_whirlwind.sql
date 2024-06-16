CREATE TABLE IF NOT EXISTS "devicesData" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"deviceId" uuid,
	"current" varchar(255) NOT NULL,
	"power" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "devices" ADD COLUMN "current" varchar(255);--> statement-breakpoint
ALTER TABLE "devices" ADD COLUMN "power" varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "devicesData" ADD CONSTRAINT "devicesData_deviceId_devices_id_fk" FOREIGN KEY ("deviceId") REFERENCES "public"."devices"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
