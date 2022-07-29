USE [master]

IF db_id('GravyTrain') IS NULL
  CREATE DATABASE [GravyTrain]
GO

USE [GravyTrain]
GO


DROP TABLE IF EXISTS [TagReview];
DROP TABLE IF EXISTS [Review];
DROP TABLE IF EXISTS [Tag];
DROP TABLE IF EXISTS [UserProfile];
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [Username] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [CreateDate] datetime NOT NULL
)
GO

CREATE TABLE [Review] (
  [Id] int PRIMARY KEY IDENTITY,
  [LocationName] nvarchar(255) NOT NULL,
  [LocationAddress] nvarchar(255),
  [DateReviewed] datetime NOT NULL,
  [ButteryScore] int NOT NULL,
  [FlakeyScore] int NOT NULL,
  [GravyScore] int NOT NULL,
  [FlavorScore] int NOT NULL,
  [DeliveryScore] int NOT NULL,
  [AverageScore] int NOT NULL,
  [Notes] nvarchar(255),
  [GravyType] nvarchar(255) NOT NULL,
  [UserProfileId] int NOT NULL
)
GO

CREATE TABLE [TagReview] (
  [Id] int PRIMARY KEY IDENTITY,
  [ReviewId] int NOT NULL,
  [TagId] int NOT NULLR
)
GO

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [TagReview]  WITH CHECK ADD  CONSTRAINT [FK_TagReview_Review] FOREIGN KEY([ReviewId])
REFERENCES  [Review] ([ReviewId])
ON DELETE CASCADE
GO

ALTER TABLE [TagReview] ADD FOREIGN KEY ([ReviewId]) REFERENCES [Review] ([Id])
GO

ALTER TABLE [TagReview] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id])
GO
