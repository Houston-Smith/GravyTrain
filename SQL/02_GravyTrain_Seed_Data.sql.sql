USE [GravyTrain]
GO

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile] (
	[Id], [FirebaseUserId], [Username], [FirstName], [LastName], [Email], [CreateDate])
VALUES (1, 'umxJ5PnWoiZBFTrNolYC97m749p1', 'HSmith', 'Houston', 'Smith', 'H@Smith.com', SYSDATETIME()),
(2, 'ffhCN0kr3GUv2fWcBdoocbvpj8B2', 'CCarter', 'Chapel', 'Carter', 'C@Carter.com', SYSDATETIME());
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Review] ON
INSERT INTO [Review] ([Id], [LocationName], [DateReviewed], [ButteryScore], [FlakeyScore], [GravyScore], [FlavorScore], [DeliveryScore], [AverageScore], [Notes], [UserProfileId])
VALUES (1, 'Nashville Biscuit House', SYSDATETIME(), 8, 6, 7, 7, 8, 7, 'No Notes', 1),
(2, 'Nashville Biscuit House', SYSDATETIME(), 9, 6, 8, 9, 8, 8, 'No Notes', 2);
SET IDENTITY_INSERT [Review] OFF


SET IDENTITY_INSERT [UserReview] ON
INSERT INTO [UserReview] (
	[Id], [UserId], [ReviewId])
VALUES (1, 1, 1),
(2, 2, 2);
SET IDENTITY_INSERT [UserReview] OFF


