USE [master]

IF db_id('GravyTrain') IS NULL
  CREATE DATABASE [GravyTrain]
GO

USE [GravyTrain]
GO


DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Review];
DROP TABLE IF EXISTS [UserReview];
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [Username] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [CreateDate] datetime NOT NULL
)
GO

CREATE TABLE [Review] (
  [Id] int PRIMARY KEY NOT NULL,
  [LocationName] nvarchar(255) NOT NULL,
  [DateReviewed] datetime NOT NULL,
  [ButteryScore] int NOT NULL,
  [FlakeyScore] int NOT NULL,
  [GravyScore] int NOT NULL,
  [FlavorScore] int NOT NULL,
  [DeliveryScore] int NOT NULL,
  [AverageScore] int NOT NULL,
  [Notes] nvarchar(255),
  [UserProfileId] int NOT NULL
)
GO

CREATE TABLE [UserReview] (
  [Id] int PRIMARY KEY NOT NULL,
  [UserId] int NOT NULL,
  [ReviewId] int NOT NULL
)
GO

ALTER TABLE [UserReview] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [UserReview] ADD FOREIGN KEY ([ReviewId]) REFERENCES [Review] ([Id])
GO
