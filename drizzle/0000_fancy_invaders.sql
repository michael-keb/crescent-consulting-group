CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`organisation` text,
	`kind` text NOT NULL,
	`message` text NOT NULL,
	`availability` text,
	`created_at` integer NOT NULL,
	`status` text DEFAULT 'new' NOT NULL
);
