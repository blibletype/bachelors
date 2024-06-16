ALTER TABLE "devices" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "devices" ALTER COLUMN "updatedAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "devicesData" ALTER COLUMN "timestamp" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP DEFAULT;