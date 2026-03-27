CREATE TABLE `contact_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`message` text NOT NULL,
	`preferCall` int NOT NULL DEFAULT 0,
	`status` enum('new','contacted','resolved') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`cpfCnpj` varchar(20) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`email` varchar(320) NOT NULL,
	`companyName` varchar(255),
	`planId` varchar(50) NOT NULL,
	`planName` varchar(100) NOT NULL,
	`planPrice` decimal(10,2) NOT NULL,
	`status` enum('pending','paid','cancelled','refunded') NOT NULL DEFAULT 'pending',
	`stripeSessionId` varchar(255),
	`stripePaymentIntentId` varchar(255),
	`paymentMethod` varchar(50),
	`mailboxNumber` varchar(20),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`paidAt` timestamp,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
