USE [master]
GO
/****** Object:  Database [UssdDb]    Script Date: 07/15/2016 19:34:58 ******/
CREATE DATABASE [UssdDb] ON  PRIMARY 
( NAME = N'UssdDb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\UssdDb.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'UssdDb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\UssdDb_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [UssdDb] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [UssdDb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [UssdDb] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [UssdDb] SET ANSI_NULLS OFF
GO
ALTER DATABASE [UssdDb] SET ANSI_PADDING OFF
GO
ALTER DATABASE [UssdDb] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [UssdDb] SET ARITHABORT OFF
GO
ALTER DATABASE [UssdDb] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [UssdDb] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [UssdDb] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [UssdDb] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [UssdDb] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [UssdDb] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [UssdDb] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [UssdDb] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [UssdDb] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [UssdDb] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [UssdDb] SET  DISABLE_BROKER
GO
ALTER DATABASE [UssdDb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [UssdDb] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [UssdDb] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [UssdDb] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [UssdDb] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [UssdDb] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [UssdDb] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [UssdDb] SET  READ_WRITE
GO
ALTER DATABASE [UssdDb] SET RECOVERY FULL
GO
ALTER DATABASE [UssdDb] SET  MULTI_USER
GO
ALTER DATABASE [UssdDb] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [UssdDb] SET DB_CHAINING OFF
GO
EXEC sys.sp_db_vardecimal_storage_format N'UssdDb', N'ON'
GO
USE [UssdDb]
GO
/****** Object:  Table [dbo].[UssdSessions]    Script Date: 07/15/2016 19:35:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UssdSessions](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[appId] [nvarchar](255) NULL,
	[sessionId] [nvarchar](255) NULL,
	[startTime] [datetime2](7) NULL,
	[actionId] [nvarchar](255) NULL,
	[terminate] [bit] NULL,
	[mobile] [nvarchar](255) NULL,
	[network] [nvarchar](255) NULL,
	[sequence] [int] NULL,
	[input] [nvarchar](255) NULL,
	[inputHolder] [nvarchar](255) NULL,
	[returnValue] [nvarchar](255) NULL,
	[requestType] [nvarchar](255) NULL,
	[expired] [bit] NULL,
	[createdAt] [datetime2](7) NOT NULL,
	[updatedAt] [datetime2](7) NOT NULL,
	[flowId] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[UssdSessions] ON
INSERT [dbo].[UssdSessions] ([id], [appId], [sessionId], [startTime], [actionId], [terminate], [mobile], [network], [sequence], [input], [inputHolder], [returnValue], [requestType], [expired], [createdAt], [updatedAt], [flowId]) VALUES (355, N'zenith-ussd', N's82567890179', CAST(0x07F0B2CBB9C29D3B0B AS DateTime2), NULL, NULL, N'233256583910', N'07/07/2016', 1, N'*710#', NULL, N'0', N'Initiation', 0, CAST(0x0700A5BFB9C29D3B0B AS DateTime2), CAST(0x0700A5BFB9C29D3B0B AS DateTime2), N'0')
INSERT [dbo].[UssdSessions] ([id], [appId], [sessionId], [startTime], [actionId], [terminate], [mobile], [network], [sequence], [input], [inputHolder], [returnValue], [requestType], [expired], [createdAt], [updatedAt], [flowId]) VALUES (356, N'zenith-ussd', N's82567890179', CAST(0x07301256BDC29D3B0B AS DateTime2), NULL, NULL, N'233256583910', N'07/07/2016', 3, N'1', N'airtimetopup', N'1', N'Response', 0, CAST(0x07002C53BDC29D3B0B AS DateTime2), CAST(0x07002C53BDC29D3B0B AS DateTime2), N'0-1')
INSERT [dbo].[UssdSessions] ([id], [appId], [sessionId], [startTime], [actionId], [terminate], [mobile], [network], [sequence], [input], [inputHolder], [returnValue], [requestType], [expired], [createdAt], [updatedAt], [flowId]) VALUES (357, N'zenith-ussd', N's82567890179', CAST(0x07F06079C2C29D3B0B AS DateTime2), NULL, NULL, N'233256583910', N'07/07/2016', 3, N'1', N'airtimeNetwork', N'1', N'Response', 0, CAST(0x0700E017C2C29D3B0B AS DateTime2), CAST(0x0700E017C2C29D3B0B AS DateTime2), N'0-1-1')
INSERT [dbo].[UssdSessions] ([id], [appId], [sessionId], [startTime], [actionId], [terminate], [mobile], [network], [sequence], [input], [inputHolder], [returnValue], [requestType], [expired], [createdAt], [updatedAt], [flowId]) VALUES (358, N'zenith-ussd', N's82567890179', CAST(0x07A0AFCDDDC29D3B0B AS DateTime2), NULL, NULL, N'233256583910', N'07/07/2016', 3, N'233', NULL, N'2', N'Response', 0, CAST(0x0700EB82DDC29D3B0B AS DateTime2), CAST(0x0700EB82DDC29D3B0B AS DateTime2), N'0-1-1-2')
INSERT [dbo].[UssdSessions] ([id], [appId], [sessionId], [startTime], [actionId], [terminate], [mobile], [network], [sequence], [input], [inputHolder], [returnValue], [requestType], [expired], [createdAt], [updatedAt], [flowId]) VALUES (359, N'zenith-ussd', N's82567890179', CAST(0x07C01BE0EEC29D3B0B AS DateTime2), NULL, NULL, N'233256583910', N'07/07/2016', 3, N'234', NULL, N'4', N'Response', 0, CAST(0x0780F7CBEEC29D3B0B AS DateTime2), CAST(0x0780F7CBEEC29D3B0B AS DateTime2), N'0-1-1-2-4')
INSERT [dbo].[UssdSessions] ([id], [appId], [sessionId], [startTime], [actionId], [terminate], [mobile], [network], [sequence], [input], [inputHolder], [returnValue], [requestType], [expired], [createdAt], [updatedAt], [flowId]) VALUES (360, N'zenith-ussd', N's82567890179', CAST(0x0790F2FCEEC29D3B0B AS DateTime2), NULL, NULL, N'233256583910', N'07/07/2016', 3, N'234', NULL, N'3', N'Response', 0, CAST(0x0780F7CBEEC29D3B0B AS DateTime2), CAST(0x0780F7CBEEC29D3B0B AS DateTime2), N'0-1-1-2-4-3')
INSERT [dbo].[UssdSessions] ([id], [appId], [sessionId], [startTime], [actionId], [terminate], [mobile], [network], [sequence], [input], [inputHolder], [returnValue], [requestType], [expired], [createdAt], [updatedAt], [flowId]) VALUES (361, N'zenith-ussd', N's82567890179', CAST(0x07A0165FFEC29D3B0B AS DateTime2), NULL, NULL, N'233256583910', N'07/07/2016', 3, N'1234', NULL, N'1234', N'Response', 0, CAST(0x0780404BFEC29D3B0B AS DateTime2), CAST(0x0780404BFEC29D3B0B AS DateTime2), NULL)
INSERT [dbo].[UssdSessions] ([id], [appId], [sessionId], [startTime], [actionId], [terminate], [mobile], [network], [sequence], [input], [inputHolder], [returnValue], [requestType], [expired], [createdAt], [updatedAt], [flowId]) VALUES (362, N'zenith-ussd', N's82567890179', CAST(0x0770838A36C39D3B0B AS DateTime2), NULL, NULL, N'233256583910', N'07/07/2016', 3, N'1234', NULL, N'1234', N'Response', 0, CAST(0x0780835236C39D3B0B AS DateTime2), CAST(0x0780835236C39D3B0B AS DateTime2), NULL)
SET IDENTITY_INSERT [dbo].[UssdSessions] OFF
/****** Object:  Table [dbo].[UssdMenus]    Script Date: 07/15/2016 19:35:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UssdMenus](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[appId] [nvarchar](255) NULL,
	[uniqueId] [nvarchar](255) NULL,
	[parentFlowId] [nvarchar](255) NULL,
	[flowId] [nvarchar](255) NULL,
	[position] [int] NULL,
	[displayText] [nvarchar](255) NULL,
	[actionName] [nvarchar](255) NULL,
	[returnValue] [nvarchar](255) NULL,
	[inputHolder] [nvarchar](255) NULL,
	[actionId] [nvarchar](255) NULL,
	[terminateOnActionFail] [bit] NULL,
	[forceTerminate] [bit] NULL,
	[displayType] [nvarchar](255) NULL,
	[terminate] [bit] NULL,
	[createdAt] [datetime2](7) NOT NULL,
	[updatedAt] [datetime2](7) NOT NULL,
	[headerText] [nvarchar](100) NULL,
	[footerText] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[UssdMenus] ON
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (2, N'ussdbank', N'07a078c5-6283-97f6-680c-066c688e3a20', N'0', N'0-1', NULL, N'Item 1-level1', NULL, N'1', N'item1level1', NULL, NULL, NULL, NULL, NULL, CAST(0x07808C13059E943B0B AS DateTime2), CAST(0x07808C13059E943B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (3, N'ussdbank', N'a9489bf4-7ec5-6831-6780-d427b593fb6d', N'0-1', N'0-1-2', NULL, N'item1 - level 2', NULL, N'2', N'item1level2', NULL, NULL, NULL, NULL, NULL, CAST(0x07808C13059E943B0B AS DateTime2), CAST(0x07808C13059E943B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (4, N'ussdbank', N'4ce62b5f-027c-2393-3418-7da5ad9477a1', N'0-1-2', N'0-1-2-3', NULL, N'item1-level 3', NULL, N'3', N'item1level3', NULL, NULL, NULL, NULL, NULL, CAST(0x07808C13059E943B0B AS DateTime2), CAST(0x07808C13059E943B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (5, N'ussdbank', N'96e87907-0f0e-a11e-3e10-359c0930e9a1', N'0-1-2-3', N'0-1-2-3-4', NULL, N'Item1-level4', NULL, N'4', N'item1level4', NULL, NULL, NULL, NULL, NULL, CAST(0x07808C13059E943B0B AS DateTime2), CAST(0x07808C13059E943B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (6, N'ussdbank', N'4e6ca44f-1a24-de26-b261-c03ac5a0d45c', N'0', N'0-2', NULL, N'item2-leve2-1', NULL, N'2', N'item2level2', NULL, NULL, NULL, NULL, NULL, CAST(0x07808C13059E943B0B AS DateTime2), CAST(0x07808C13059E943B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (7, N'ussdbank', N'e671a94a-9b93-a75b-71b5-5dcd6bf40c9e', N'0-1-2-3-4', N'0-1-2-3-4-2', NULL, N'item2level2-2', NULL, N'2', N'item2level22', NULL, NULL, NULL, NULL, NULL, CAST(0x07808C13059E943B0B AS DateTime2), CAST(0x07808C13059E943B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (8, N'ussdbank', N'2590eb26-d76d-c4bd-a51f-1d89e4736ec8', N'0-2', N'0-2-2', NULL, N'Item 2 - level 1', NULL, N'2', N'item2 - level 1', NULL, NULL, NULL, NULL, NULL, CAST(0x07808C13059E943B0B AS DateTime2), CAST(0x07808C13059E943B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (9, N'ussdbank', N'da58e023-b94e-9a8f-e0ee-355443955352', N'0-2', N'0-2-3', NULL, N'item2level23', NULL, N'3', N'item2leve23', NULL, NULL, NULL, NULL, NULL, CAST(0x07808C13059E943B0B AS DateTime2), CAST(0x07808C13059E943B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (10, N'ussdbank', N'77ef0a13-04c2-4bad-5da0-4c78f890ef8b', N'0-1-2-3-4', N'0-1-2-3-4-3', NULL, N'Item 3 - level 1', NULL, N'3', N'Item3level1', NULL, NULL, NULL, NULL, NULL, CAST(0x07808C13059E943B0B AS DateTime2), CAST(0x07808C13059E943B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (11, N'ussdbank', N'f43666dc-43c2-72b7-d777-7c088f82790a', N'0', N'0-4', NULL, N'Item4-level1', NULL, N'4', N'item4-levl1', NULL, NULL, NULL, NULL, NULL, CAST(0x07808C13059E943B0B AS DateTime2), CAST(0x07808C13059E943B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (12, N'ussdbank', N'aee5f188-9c96-79ec-8027-dfe7f6a9be3c', N'0', N'0-5', NULL, N'item5- level 1', NULL, N'5', N'item5level1', NULL, NULL, NULL, NULL, NULL, CAST(0x07808C13059E943B0B AS DateTime2), CAST(0x07808C13059E943B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (346, N'zenith-ussd', N'45d4cc43-b0de-e8a9-898d-fc7189dc3ed2', N'0', N'0-1', NULL, N'AIRTIME TOPUP', NULL, N'1', N'airtimetopup', NULL, NULL, NULL, NULL, NULL, CAST(0x0780A1B0E399983B0B AS DateTime2), CAST(0x0780A1B0E399983B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (347, N'zenith-ussd', N'f5e84fd7-9ad6-55ab-8a30-b4d133202a89', N'0-1', N'0-1-1', NULL, N'1. MTN
2. AIRTEL
3. VODAFONE
4. TIGO
5. GLO', NULL, N'1', N'network', NULL, NULL, NULL, N'display-list', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), N'Select Network', NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (348, N'zenith-ussd', N'6254cda3-f54e-8f91-a6da-d5a3ca428c88', N'0-1-1', N'0-1-1-2', NULL, N'Enter Mobile', NULL, N'2', N'mobile', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (349, N'zenith-ussd', N'c401db20-489f-7819-257b-be94caffd3c0', N'0-1-1-2', N'0-1-1-2-4', NULL, N'Enter Amount', NULL, N'4', N'amount', NULL, NULL, NULL, N'display-text', NULL, CAST(0x0780E1B2B08A9C3B0B AS DateTime2), CAST(0x0780E1B2B08A9C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (350, N'zenith-ussd', N'07533721-4501-9f81-2b12-277f1c636be8', N'0-1-1-2-4', N'0-1-1-2-4-3', NULL, N'Enter Pin', NULL, N'3', N'pin', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (351, N'zenith-ussd', N'2318ae22-fef9-d001-1782-a24f1c9e65f8', N'0', N'0-4', NULL, N'BILL PAYMENT', NULL, N'4', N'billpayment', NULL, NULL, NULL, N'display-text', NULL, CAST(0x0780A1B0E399983B0B AS DateTime2), CAST(0x0780A1B0E399983B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (352, N'zenith-ussd', N'49a98d34-940c-a58b-a8cf-ea9cdd616ec3', N'0-4', N'0-4-1', NULL, N'1. DSTV
2. GOTV
3. ECG', NULL, N'1', N'network', NULL, NULL, NULL, N'display-list', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), N'Select Service', NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (353, N'zenith-ussd', N'aa3a6962-1b3c-4beb-888e-efd701c2eb07', N'0-4-1', N'0-4-1-2', NULL, N'Bill Account No.', NULL, N'2', N'billAccount', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (354, N'zenith-ussd', N'4b928fa7-2f1c-3b66-be5e-de0fb284212c', N'0-4-1-2', N'0-4-1-2-3', NULL, N'Enter Amount', NULL, N'3', N'amount', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (355, N'zenith-ussd', N'75e20c0f-391d-a9b4-33e0-ad2f5c9eb807', N'0-4-1-2-3', N'0-4-1-2-3-4', NULL, N'Enter Pin', NULL, N'4', N'pin', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (356, N'zenith-ussd', N'ea22f4aa-71db-61ea-d265-1c2a50f1771d', N'0', N'0-2', NULL, N'FUNDS TRANSFER ZENITH TO ZENITH', NULL, N'2', N'transfer-zenith-zenith', NULL, NULL, NULL, NULL, NULL, CAST(0x0780A1B0E399983B0B AS DateTime2), CAST(0x0780A1B0E399983B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (357, N'zenith-ussd', N'94aad9a3-0b05-89ae-3dbb-cb0ad3b783cd', N'0-2', N'0-2-1', NULL, N'Zenith Account Number', NULL, N'1', N'account', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (358, N'zenith-ussd', N'b19f75ac-20ce-995e-fb2a-5b783bd52a73', N'0-2-1', N'0-2-1-2', NULL, N'Enter Amount', NULL, N'2', N'amount', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (359, N'zenith-ussd', N'8fa3eea9-4da8-d289-52ab-362f3a9cd4d0', N'0-2-1-2', N'0-2-1-2-3', NULL, N'Enter Pin', NULL, N'3', N'pin', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (360, N'zenith-ussd', N'f83794cf-1319-4202-ffd4-ecb357c301cd', N'0', N'0-3', NULL, N'FUNDS TRANSFER ZENITH TO MOBILE', NULL, N'3', N'transferMobileWallet', NULL, NULL, NULL, N'display-text', NULL, CAST(0x0780A1B0E399983B0B AS DateTime2), CAST(0x0780A1B0E399983B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (361, N'zenith-ussd', N'93d6b80d-46be-e873-8ced-20f4d846120c', N'0-3', N'0-3-1', NULL, N'MTN MONEY
VODAFONE CASH
AIRTEL MONEY
TIGO CASH', NULL, N'1', N'network', NULL, NULL, NULL, N'display-list', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), N'Select Network', NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (362, N'zenith-ussd', N'4f6aaf3f-2b6d-b8fb-0be6-64dd8d37f8a5', N'0-3-1', N'0-3-1-2', NULL, N'Enter Mobile Number', NULL, N'2', N'mobile', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (363, N'zenith-ussd', N'7cdc9633-6e52-5dea-9e1f-442a184f5377', N'0-3-1-2', N'0-3-1-2-3', NULL, N'Enter Amount', NULL, N'3', N'amount', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (364, N'zenith-ussd', N'52e49f3d-ea7e-9b15-7ceb-4d891feb95cb', N'0-3-1-2-3', N'0-3-1-2-3-4', NULL, N'Enter pin', NULL, N'4', N'pin', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (365, N'zenith-ussd', N'46f84bb8-3202-3bf4-f6ae-f284abb58761', N'0', N'0-5', NULL, N'BALANCE ENQUIRY', NULL, N'5', N'balance-enquiry', NULL, NULL, NULL, NULL, NULL, CAST(0x0780A1B0E399983B0B AS DateTime2), CAST(0x0780A1B0E399983B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (366, N'zenith-ussd', N'dce404ad-d086-f5a5-bd54-09af60f08038', N'0-5', N'0-5-1', NULL, N'Enter Pin', NULL, N'1', N'pin', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (367, N'zenith-ussd', N'cf89730f-ff1a-89fb-d662-f527924ba07a', N'0', N'0-6', NULL, N'OTHER SERVICES', NULL, N'6', N'other-services', NULL, NULL, NULL, NULL, NULL, CAST(0x0780A1B0E399983B0B AS DateTime2), CAST(0x0780A1B0E399983B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (368, N'zenith-ussd', N'd5da4d7c-2e86-dc72-c40d-2dfd4a505282', N'0-6', N'0-6-1', NULL, N'STATEMENT', NULL, N'1', N'statement', NULL, NULL, NULL, NULL, NULL, CAST(0x0780A1B0E399983B0B AS DateTime2), CAST(0x0780A1B0E399983B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (369, N'zenith-ussd', N'1e9529ec-3e44-955d-35e4-b5f534151c6f', N'0-6-1', N'0-6-1-1', NULL, N'Enter Pin', NULL, N'1', N'pin', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (370, N'zenith-ussd', N'128bbc8b-7af4-66c1-b6f0-f1f4d78547c3', N'0-6', N'0-6-2', NULL, N'CHANGE PIN', NULL, N'2', N'change-pin', NULL, NULL, NULL, NULL, NULL, CAST(0x0780A1B0E399983B0B AS DateTime2), CAST(0x0780A1B0E399983B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (371, N'zenith-ussd', N'10a3ea54-751f-a260-3283-d88ec8ba2021', N'0-6-2', N'0-6-2-1', NULL, N'Enter Old Pin', NULL, N'1', N'oldpin', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (372, N'zenith-ussd', N'ae2ec178-6fbe-6799-bc54-54d8dd4ffa6f', N'0-6-2-1', N'0-6-2-1-2', NULL, N'Enter New Pin', NULL, N'2', N'newpin1', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (373, N'zenith-ussd', N'c2c1923a-30f9-ab86-afe3-768390f3e8ff', N'0-6-2-1-2', N'0-6-2-1-2-3', NULL, N'Confirm New Pin', NULL, N'3', N'newpin2', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (374, N'zenith-ussd', N'1e9c3c3b-3421-477b-aa53-9ca7b8e1b1b0', N'0-6', N'0-6-3', NULL, N'STOP PAYMENT', NULL, N'3', N'stop-payment', NULL, NULL, NULL, NULL, NULL, CAST(0x0780A1B0E399983B0B AS DateTime2), CAST(0x0780A1B0E399983B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (375, N'zenith-ussd', N'f10d6aaf-d736-26ba-fe57-b85f2d4f963f', N'0-6-3', N'0-6-3-1', NULL, N'Enter Cheque Number', NULL, N'1', N'chequeNo', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (376, N'zenith-ussd', N'fe799cc6-97ea-7bf7-91ef-a75da5a04779', N'0-6', N'0-6-4', NULL, N'OPEN ACCOUNT', NULL, N'4', N'open_account', NULL, NULL, NULL, NULL, NULL, CAST(0x0780A1B0E399983B0B AS DateTime2), CAST(0x0780A1B0E399983B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (377, N'zenith-ussd', N'cfb69bf4-993c-9089-2ff4-b69bcaef9c0f', N'0-6', N'0-6-5', NULL, N'ATM CARD REQUEST', NULL, N'5', N'atmCardRequest', NULL, NULL, NULL, NULL, NULL, CAST(0x0780A1B0E399983B0B AS DateTime2), CAST(0x0780A1B0E399983B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (378, N'zenith-ussd', N'9837da55-372a-ed92-14f3-20f22ae5327c', N'0-6-5', N'0-6-5-1', NULL, N'Enter Account Number', NULL, N'1', N'account', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (379, N'zenith-ussd', N'29ec7baa-fe2c-e1cd-d72b-e650c8b5e64f', N'0-6-5-1', N'0-6-5-1-2', NULL, N'1. EazyPay Card
2. Visa Classic Credit Card
3. Visa Platinum Card
4. Visa Debit
5. Visa Prepaid', NULL, N'2', N'cardType', NULL, NULL, NULL, N'display-list', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), N'Select Card Type', NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (380, N'zenith-ussd', N'b83365fc-01e2-30bd-5560-1a67dbb5c148', N'0-6', N'0-6-6', NULL, N'CHEQUE BOOK REQUEST', NULL, N'6', N'chequeBookRequest', NULL, NULL, NULL, NULL, NULL, CAST(0x0780A1B0E399983B0B AS DateTime2), CAST(0x0780A1B0E399983B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (381, N'zenith-ussd', N'9362d067-6556-165a-7a96-d5f0310d274c', N'0-6-6', N'0-6-6-1', NULL, N'Enter Account Number', NULL, N'1', N'account', NULL, NULL, NULL, N'display-text', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdMenus] ([id], [appId], [uniqueId], [parentFlowId], [flowId], [position], [displayText], [actionName], [returnValue], [inputHolder], [actionId], [terminateOnActionFail], [forceTerminate], [displayType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (382, N'zenith-ussd', N'e043b91f-76ae-0fcb-5ad7-3663af885872', N'0-6-6-1', N'0-6-6-1-2', NULL, N'1. 50
2. 150', NULL, N'2', N'leaflets', NULL, NULL, NULL, N'display-list', NULL, CAST(0x070025D8F2829C3B0B AS DateTime2), CAST(0x070025D8F2829C3B0B AS DateTime2), N'Numer of Leaflets', NULL)
SET IDENTITY_INSERT [dbo].[UssdMenus] OFF
/****** Object:  Table [dbo].[UssdBankingUsers]    Script Date: 07/15/2016 19:35:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UssdBankingUsers](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[mobile] [nvarchar](255) NULL,
	[accountNumber] [nvarchar](255) NULL,
	[accountName] [nvarchar](255) NULL,
	[pin] [nvarchar](255) NULL,
	[createdAt] [datetime2](7) NOT NULL,
	[updatedAt] [datetime2](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UssdBankingTransactions]    Script Date: 07/15/2016 19:35:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UssdBankingTransactions](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[actionName] [nvarchar](255) NULL,
	[accountNumber] [nvarchar](255) NULL,
	[mobile] [nvarchar](255) NULL,
	[inputValues] [nvarchar](255) NULL,
	[returnMessage] [nvarchar](255) NULL,
	[responseMessage] [nvarchar](255) NULL,
	[status] [nvarchar](255) NULL,
	[createdAt] [datetime2](7) NOT NULL,
	[updatedAt] [datetime2](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UssdApps]    Script Date: 07/15/2016 19:35:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UssdApps](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[appId] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
	[shortCode] [nvarchar](255) NULL,
	[listId] [nvarchar](255) NULL,
	[actionId] [nvarchar](255) NULL,
	[actionType] [nvarchar](255) NULL,
	[terminate] [bit] NULL,
	[createdAt] [datetime2](7) NOT NULL,
	[updatedAt] [datetime2](7) NOT NULL,
	[headerText] [nvarchar](255) NULL,
	[footerText] [nchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[UssdApps] ON
INSERT [dbo].[UssdApps] ([id], [appId], [description], [shortCode], [listId], [actionId], [actionType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (3, N'ussdbank', N'Ussd Banking App', N'*701#', NULL, NULL, NULL, NULL, CAST(0x070022D9FF4A803B0B AS DateTime2), CAST(0x070022D9FF4A803B0B AS DateTime2), NULL, NULL)
INSERT [dbo].[UssdApps] ([id], [appId], [description], [shortCode], [listId], [actionId], [actionType], [terminate], [createdAt], [updatedAt], [headerText], [footerText]) VALUES (4, N'zenith-ussd', N'Zenith Ussd Banking', N'*710#', NULL, NULL, NULL, NULL, CAST(0x0700078B289F943B0B AS DateTime2), CAST(0x0700078B289F943B0B AS DateTime2), NULL, NULL)
SET IDENTITY_INSERT [dbo].[UssdApps] OFF
/****** Object:  Table [dbo].[Users]    Script Date: 07/15/2016 19:35:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [nvarchar](255) NULL,
	[first_name] [nvarchar](255) NULL,
	[last_name] [nvarchar](255) NULL,
	[password] [nvarchar](255) NULL,
	[createdAt] [datetime2](7) NOT NULL,
	[updatedAt] [datetime2](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
