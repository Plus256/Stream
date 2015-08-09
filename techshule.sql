-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2015 at 07:46 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `techshule`
--

-- --------------------------------------------------------

--
-- Table structure for table `ad`
--

CREATE TABLE IF NOT EXISTS `ad` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `pic` int(10) unsigned NOT NULL,
  `descr` text NOT NULL,
  `exl` varchar(150) NOT NULL,
  `type` tinyint(1) unsigned NOT NULL,
  `status` tinyint(1) unsigned NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `title` (`title`),
  KEY `pic` (`pic`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `ad`
--

INSERT INTO `ad` (`id`, `title`, `pic`, `descr`, `exl`, `type`, `status`, `created`) VALUES
(1, 'Rafiki Adventures', 68, 'Much more than a safari', 'www.rafikiadventuretours.com', 1, 1, '2015-03-23 15:37:49');

-- --------------------------------------------------------

--
-- Table structure for table `cat`
--

CREATE TABLE IF NOT EXISTS `cat` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `cat`
--

INSERT INTO `cat` (`id`, `name`) VALUES
(1, 'Apps'),
(6, 'Code'),
(2, 'Gadgets'),
(7, 'Internet'),
(5, 'Multimedia'),
(4, 'Social'),
(3, 'Startups');

-- --------------------------------------------------------

--
-- Table structure for table `ctype`
--

CREATE TABLE IF NOT EXISTS `ctype` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `ctype`
--

INSERT INTO `ctype` (`id`, `name`) VALUES
(3, 'Review'),
(4, 'Sponsored'),
(1, 'Tip'),
(2, 'Update'),
(5, 'Video');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `descr` text,
  `venu` varchar(150) NOT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  `fee` varchar(150) DEFAULT NULL,
  `other` varchar(150) DEFAULT NULL,
  `status` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `feed_b`
--

CREATE TABLE IF NOT EXISTS `feed_b` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sbj` varchar(150) NOT NULL,
  `msg` text NOT NULL,
  `frm` int(10) unsigned NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `author` (`frm`),
  KEY `title` (`sbj`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `feed_b`
--

INSERT INTO `feed_b` (`id`, `sbj`, `msg`, `frm`, `created`) VALUES
(3, 'Hey', 'Tsup Collins? Thanks for this!<br>', 2, '2015-03-22 10:15:50'),
(4, 'Check', 'Looking for script', 2, '2015-04-30 14:59:08');

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE IF NOT EXISTS `job` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `pic` int(10) unsigned NOT NULL,
  `descr` text NOT NULL,
  `emp` varchar(150) NOT NULL,
  `cnt` varchar(150) NOT NULL,
  `qual` varchar(150) NOT NULL,
  `sal` bigint(25) unsigned NOT NULL,
  `ap` int(10) unsigned NOT NULL,
  `status` tinyint(1) unsigned NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `published` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `title` (`title`),
  KEY `pic` (`pic`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `news_l`
--

CREATE TABLE IF NOT EXISTS `news_l` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) unsigned DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=48 ;

--
-- Dumping data for table `news_l`
--

INSERT INTO `news_l` (`id`, `email`, `date`, `status`) VALUES
(2, 'wagabaplus256@gmail.com', '2015-01-14 10:26:28', 1),
(3, 'mkibuuka@cns.mak.ac.ug', '2015-01-21 17:01:19', 1),
(4, 'sales@infocom.co.ug', '2015-01-28 07:35:12', 1),
(5, 'info@utl.co.ug', '2015-01-28 07:35:36', 1),
(6, 'customerservice@mtn.co.ug', '2015-01-28 07:36:03', 1),
(7, 'info@ninainteriors.co.ug', '2015-01-28 08:01:15', 1),
(8, 'educhizi@gmail.com', '2015-01-28 08:04:28', 1),
(9, 'rafikiadventures@gmail.com', '2015-01-28 08:05:39', 1),
(10, 'mlnangalama@yahoo.com', '2015-01-28 08:06:47', 1),
(11, 'fjogoo@gmail.com', '2015-01-28 08:08:07', 1),
(12, 'isales_jv2726mgj@members.ebay.co.uk', '2015-01-28 08:20:06', 1),
(13, 'kookie_eui6195rdt@members.ebay.com', '2015-01-28 08:20:29', 1),
(14, 'nakagawa@kaiho.co.jp', '2015-01-28 08:21:22', 1),
(15, 'barbara.bashabe@roofings.co.ug', '2015-01-28 08:37:31', 1),
(16, 'saul.wanywa@roofings.co.ug', '2015-01-28 08:37:39', 1),
(17, 'doreennyaburu@yahoo.com', '2015-01-28 08:43:30', 1),
(18, 'batwalafaith@ymail.com', '2015-01-28 08:43:50', 1),
(19, 'marty.lwanga@gmail.com', '2015-01-28 08:44:35', 1),
(20, 'kiyesteps@gmail.com', '2015-01-28 08:44:54', 1),
(21, 'kizitobryanbiz@gmail.com', '2015-01-28 08:45:38', 1),
(22, 'enock@salabed.co.uk', '2015-01-28 08:46:09', 1),
(23, 'joshua@thetaoofbadass.com', '2015-01-28 08:48:48', 1),
(24, 'henrylubanga@gmail.com', '2015-01-28 08:50:06', 1),
(25, 'annette@gospeltabernacle.ws', '2015-01-28 08:50:40', 1),
(26, 'bernard@gospeltabernacle.ws', '2015-01-28 08:51:28', 1),
(27, 'clutanga@gmail.com', '2015-01-28 08:52:30', 1),
(28, 'jemimah_semakadde@hotmail.com', '2015-01-28 08:53:04', 1),
(29, 'sarainafrica@yahoo.com', '2015-01-28 08:53:27', 1),
(30, 'anita@roofings.co.ug', '2015-01-28 08:54:08', 1),
(31, 'ckaakyo@gmail.com', '2015-01-28 08:54:42', 1),
(32, 'joseph@rafikiministries.org', '2015-01-28 08:55:18', 1),
(33, 'info@cleanwaterkits.com', '2015-01-28 08:55:50', 1),
(34, 'jeanettekillgore@aol.com', '2015-01-28 08:56:12', 1),
(35, 'ceasar.job@gmail.com', '2015-01-28 08:57:12', 1),
(36, 'alex@zapvidyo.com', '2015-01-28 08:57:29', 1),
(37, 'niksahoo@ubnsoft.com', '2015-01-28 08:58:04', 1),
(38, 'mukasairene333@gmail.com', '2015-01-28 08:58:30', 1),
(39, 'hassiesas@gmail.com', '2015-01-28 08:59:05', 1),
(40, 'joanansy@gmail.com', '2015-01-28 08:59:27', 1),
(41, 'lwamanya@newvision.co.ug', '2015-01-28 09:00:30', 1),
(42, 'michealnashowen@yahoo.com', '2015-02-03 07:03:56', 1),
(43, 'collins@plus256.com', '2015-02-04 09:08:36', 1),
(44, 'kirarobert12@gmail.com', '2015-03-20 11:09:10', 1),
(45, 'ssubifred@gmail.com', '2015-03-27 08:34:51', 1),
(46, 'spat148@gmail.com', '2015-05-12 22:01:01', 1),
(47, 'info@minzani.com', '2015-05-28 13:27:42', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pic`
--

CREATE TABLE IF NOT EXISTS `pic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `src` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `src` (`src`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=108 ;

--
-- Dumping data for table `pic`
--

INSERT INTO `pic` (`id`, `src`) VALUES
(105, 'apple-1.jpg'),
(106, 'apple-1.jpg'),
(107, 'apple-1.jpg'),
(100, 'besigye.jpg'),
(77, 'Build2015_Satya-Nadella_FINAL.jpg'),
(92, 'Build2015_Satya-Nadella_FINAL.jpg'),
(80, 'delhi-rickshaw.jpg'),
(89, 'delhi-rickshaw.jpg'),
(81, 'Facebook-111.jpg'),
(88, 'Facebook-111.jpg'),
(101, 'gashumba.jpg'),
(83, 'internet-comm.jpg'),
(86, 'internet-comm.jpg'),
(79, 'lg-g4-comparison.jpg'),
(90, 'lg-g4-comparison.jpg'),
(27, 'logo.png'),
(93, 'MacBook-Hands-On-18.jpg'),
(94, 'MacBook-Hands-On-18.jpg'),
(95, 'MacBook-Hands-On-18.jpg'),
(96, 'MacBook-Hands-On-18.jpg'),
(97, 'MacBook-Hands-On-18.jpg'),
(98, 'MacBook-Hands-On-18.jpg'),
(99, 'MacBook-Hands-On-18.jpg'),
(102, 'mayiga.jpg'),
(103, 'mbabazi.jpg'),
(104, 'museveni.jpg'),
(78, 'ProjectSpartan.jpg'),
(91, 'ProjectSpartan.jpg'),
(68, 'rafiki.png'),
(82, 'Rutherford-Test-Cell-Fire.jpg'),
(87, 'Rutherford-Test-Cell-Fire.jpg'),
(84, 'TAG-Heuer-Carrera.jpg'),
(85, 'TAG-Heuer-Carrera.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `poll`
--

CREATE TABLE IF NOT EXISTS `poll` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `topic` varchar(150) NOT NULL,
  `status` tinyint(1) unsigned NOT NULL,
  `category` tinyint(1) unsigned NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `title` (`topic`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `poll`
--

INSERT INTO `poll` (`id`, `topic`, `status`, `category`, `created`) VALUES
(1, 'Who makes the Perfect President of Uganda?', 1, 1, '2015-05-28 13:45:55');

-- --------------------------------------------------------

--
-- Table structure for table `p_cand`
--

CREATE TABLE IF NOT EXISTS `p_cand` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descr` varchar(150) NOT NULL,
  `votes` bigint(25) unsigned NOT NULL,
  `poll` int(10) unsigned NOT NULL,
  `cover` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `title` (`descr`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `p_cand`
--

INSERT INTO `p_cand` (`id`, `descr`, `votes`, `poll`, `cover`) VALUES
(1, 'Warren Kizza Besigye', 1, 1, 100),
(2, 'Frank Gashumba', 4, 1, 101),
(3, 'Charles Peter Mayiga', 6, 1, 102),
(4, 'Patrick Amama Mbabazi', 3, 1, 103),
(5, 'Yoweri Kaguta Museveni', 2, 1, 104);

-- --------------------------------------------------------

--
-- Table structure for table `shule`
--

CREATE TABLE IF NOT EXISTS `shule` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `cover` int(10) unsigned NOT NULL,
  `body` text NOT NULL,
  `author` int(10) unsigned NOT NULL,
  `views` bigint(25) NOT NULL,
  `status` tinyint(1) unsigned NOT NULL,
  `category` tinyint(1) unsigned NOT NULL,
  `ctype` tinyint(1) unsigned NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cover` (`cover`),
  KEY `author` (`author`),
  KEY `title` (`title`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=56 ;

--
-- Dumping data for table `shule`
--

INSERT INTO `shule` (`id`, `title`, `cover`, `body`, `author`, `views`, `status`, `category`, `ctype`, `created`) VALUES
(48, 'Microsoft unveils Visual Studio Code for Windows, Mac and Linux', 92, 'Hell has officially frozen over. Microsoft is bringing some of its developer tools to the Mac and Linux.\r\n<br><br>\r\nAt the tech giant''s Build 2015 conference on Wednesday, Scott Guthrie, Microsoft''s executive vice-president of cloud and enterprise, introduced Visual Studio Code to the audience.\r\n<br><br>\r\nVisual Studio Code is a code-optimized editor with built-in support for dozens of different languages. It also has support for debugging, the version control tool Git and Microsoft Intellisense.In other words, its a solid code editor, along the lines of something like Sublime Text or TextMate 2.\r\n<br><br>\r\nThe big news, though, is that it is cross-platform: Visual Studio Code will be available for Windows, Mac and Linux.\r\n<br><br>\r\n(As developer Grant Warren-Robertson (who is my husband and a reformed enterprise software developer) said to me, "When was the last time you saw Microsoft offer any dev tools on anything other than Win32?")\r\n<br><br>\r\nVisual Studio Code will be available for free, and can be downloaded later on Wednesday from <a>VisualStudio.com</a>.', 15, 4, 1, 6, 2, '2015-04-30 12:38:15'),
(49, 'So long, Spartan: Windows 10''s new web browser is called Microsoft Edge', 91, '<p>\r\nProject Spartan, Windows 10''s new web browser, has a new name: Microsoft Edge.\r\n</p>\r\nMicrosoft made the announcement on Wednesday at Build 2015, its annual developers conference.\r\n<p>\r\nMicrosoft Edge is Internet Explorer''s replacement. The minimalistic "chrome-free" web browser is designed to put websites up front and dispense of everything else â€” including icons and menus that could potentially slow page loads.\r\n</p>\r\n<p>\r\nMicrosoft Edge is "a browser built for doing" with "built-in note taking and sharing" a slide stated. As proof, Edge will support extensions that are designed for Firefox and Chrome with just a few modifications.\r\n</p>\r\n<p>\r\nMicrosoft Edge is also Microsoft''s first web browser to have its voice assistant Cortana directly integrated.\r\n</p>\r\n<p>\r\nWhile Cortana will be baked into Windows 10 at a system-wide level, it will work a little differently in Microsoft Edge. For starters, Cortana in Microsoft Edge doesn''t talk to you at all. When you type certain keywords into the address bar or select topics on a website, it''ll spring into action, serving up relevant information such as the weather, maps and other nuggets in a window pane.\r\n</p>', 15, 5, 1, 1, 2, '2015-04-30 12:45:34'),
(50, 'The LG G4 vs. its biggest Android competition', 90, '<p>\r\nJust about every major smartphone company has stepped up its game in terms of bold premium designs and high-speed performance. We''re also seeing some of the biggest leaps in camera picture quality, which makes us so happy.\r\n</p>\r\n<p>\r\nUp until now, Samsung''s Galaxy S6 has been the undisputed top-of-the-line Android smartphone you could buy. But on Tuesday, LG came out in full force. Its G4 smartphone running Android 5.1 "Lollipop" is the strongest punch-for-punch device out there.\r\n</p>\r\n<p>\r\nThe G4 has a stunning 5.5-inch QuadHD display with what LG calls an "IPS Quantum display" â€” a screen with colors as accurate as the monitors used for by professional color graders. The phone simply flies with the Snapdragon 808 processor and 3GB of RAM.\r\n</p>\r\n<p>\r\nThe 16-megapixel camera is unbelievably fast to launch and image quality is impressive. LG says it can rival DSLR photos. And the 8-megapixel selfie cam â€” well, it''s sublime.\r\n</p>\r\n<p>\r\nAnd we still haven''t mentioned the removable 3,000 milliamp-hour battery, microSD card slot and leather cover options.\r\n</p>', 15, 7, 1, 2, 3, '2015-04-30 12:50:31'),
(51, 'Uber now offers auto rickshaw service in India', 89, '<p>\r\nUber is offering a new type of vehicle as part of its service: auto rickshaws.\r\n</p>\r\n<p>\r\nThe ride-hailing company announced on Thursday that it is rolling out UberAuto, a new service that allows New Delhi-based users to hail auto rickshaws from their phone.\r\n</p>\r\n<p>\r\nUberAuto works much like the company''s other offerings: Users simply select it from the app''s menu to request a ride. Notably, the new service marks the first time Uber has allowed cash payments. Those who request rides via UberAuto pay their driver in cash after arriving at a destination, and fares for the service will be based on metered rates set by the local government, according to Uber.\r\n</p>\r\n<p>\r\n"Autos are an iconic and ubiquitous part of the Delhi landscape, and we are excited to have them as another option on the Uber platform," Uber wrote in a blog post announcing the new service. "We recognise the history and value of autos to the transportation landscape."\r\n</p>\r\n<p>\r\nCurrently, UberAuto is only available in Delhi, and it''s not clear if the company plans to expand the auto rickshaw service to other cities in India where it operates.\r\n</p>', 15, 10, 1, 3, 2, '2015-04-30 12:55:54'),
(52, 'Don''t get fired: This app will delete your embarrassing posts on social media', 88, '<p>\r\nf you''ve ever worried about old tweets or Facebook posts coming back to haunt you â€” but don''t have time to sift through years of posts to manually delete them â€” a new app may be able to help.\r\n</p>\r\n<p>\r\nClear connects with your Facebook, Instagram and Twitter accounts and analyzes your history, flagging posts with potentially inappropriate content. To guess what that is, Clear uses a combination of algorithms and IBM''s supercomputer Watson to filter material.\r\n</p>\r\n<p>\r\nThe app was created by Ethan Czahor, who made headlines earlier this year when he abruptly resigned â€” less than 48 hours after landing the job â€” from Jeb Bush''s campaign after a series of years-old offensive tweets surfaced â€” some of which included descriptions of women as "sluts" and complaints about being eyed up by gay men at a San Francisco gym.\r\n</p>\r\n<p>\r\nCzahor says those tweets were "harmless" jokes, relics of his time with an improv comedy group, that were taken out of context.\r\n</p>\r\n<p>\r\n"I was very well aware going in, [politics] was a one-strike-and-you''re-out business," Czahor told Mashable. "I just didn''t think i would strike out so soon, and in that way."\r\n</p>', 15, 9, 1, 4, 3, '2015-04-30 13:00:11'),
(53, 'The next space race will be 3D printed', 87, '<p>\r\nThe private sector space industry took another step toward revolutionizing the way satellites are constructed and launched on Tuesday, when the U.S. and New Zealand-based company Rocket Lab unveiled a novel rocket engine that will power its Electron Rocket system.\r\n</p>\r\n<p>\r\nThe company bills the Rutherford Engine as the first battery-powered rocket engine.\r\n</p>\r\n<p>\r\nRocket Lab is positioning itself as providing the launch vehicle of choice for companies like Google''s SkyBox, PlanetIQ and others who are looking to send large constellations of small, relatively low-cost satellites into space in the next decade.\r\n</p>\r\n<p>\r\nThese satellite fleets may be able to improve the accuracy of weather forecasts and climate data, boost compliance with environmental treaties, and bring Internet connections to third world nations that currently lack that connectivity.\r\n</p>\r\n<p>\r\nSmall satellites known as cubesats may even help change the way traditional satellite manufacturers and the U.S. government develop new satellite systems. The satellite procurement process has been plagued by budget overruns and delays. For example, a new weather satellite is so overdue that it may not be faunched before the current satellite exceeds its design lifetime, raising the possibility of a satellite coverage gap that could reduce the accuracy of medium-range weather forecasts.\r\n</p>', 15, 9, 1, 5, 2, '2015-04-30 13:03:56'),
(54, 'The way the Internet has changed the way we communicate', 86, '<p>\r\nOh Internet, where would we be without you? We certainly wouldn''t be instant messaging someone we met at Machu Picchu six years ago. Or trawling through an album of a girl we went to primary school with entitled ''OMG! It''s a Boy!'' We wouldn''t be able to craft a sentence using only emojis, or replace IRL laughs with a message thread of LOL''s. Before the Internet, literally only meant in the ''literal manner or sense'' and not also ''used for emphasis while not being literally true''. And there was no such thing as ''unfriending'' someone.\r\n</p>\r\n<p>\r\nWe no longer require homes, bars, offices or cafes to keep in touch with people. We can do it literally anywhere we happen to be. This begs the question: when we connect to our devices, are we disconnecting from the people around us? Are we hiding behind a screen from the physical world and becoming antisocial in turn? While there is a sense of panic about how the Internet is detrimental to communication, there are also lots of people who believe that it is actually enhancing our relationships. For better or worse, here are a few of the ways the Internet is changing the way we communicate, and how you can keep abreast of tech advances thanks to eBay:\r\n</p>\r\n<h3>Online Relationships</h3>\r\n<p>\r\nTinder popularized online dating among the youthz. The dating-hookup hybrid made online dating cool -â€“ it removed the stigma of forever-alones sitting at home crafting profiles about their love of long walks on the beach and candlelit dinners. According to The New York Times, an estimated 50 million people use Tinder every month.\r\n</p>\r\n<p>\r\nOutside of Tinder, online dating has skyrocketed on platforms like RSVP and OKCupid. Once the playground of the desperate and the dateless, dating online is as commonplace as meeting someone at a bar these days.\r\n</p>\r\n<h3>Everyone is an expert</h3>\r\n<p>\r\nThe blogger vs. journalist debate has reached fever pitch lately. While bloggers are seen by their readership as an authentic channel of communication, their credibility and expertise are often called into question by those who have taken a more traditional route to get where they are. By a journalist or a nutritionist, for example.\r\n</p>\r\n<p>\r\nThanks to the Internet, anyone with a keyboard can say anything they want and it can sometimes be taken as gospel. An unfortunate example of this is Belle Gibson, who was recently vilified by the media after allegations surfaced that she may never have had cancer â€“- the premise behind her wholefood app/book ''The Whole Pantry'' â€“- and that contrary to her claims, never donated $300,000 to charity. Her alternate method to beating cancer -â€“ by eating well, essentially -â€“ was scientifically unfounded at best, and life threatening at worse.\r\n</p>\r\n<p>\r\nOn the other hand however, online blogs have given rise to credible voices that may never have been heard otherwise.\r\n</p>\r\n<h3>Social Media</h3>\r\n<p>\r\nSocial media has enabled us to communicate with a much greater number of people on a global scale that used to only be viable on a local level (outside of pen pals, amirite?) While this is great when it comes to keeping friendships alive over great distances, it also increases the demands on people to keep a much larger number of relationships going simultaneously. Do you really have 1,500 friends?\r\n</p>\r\n<p>\r\nSocial media is a great tool when it supplements IRL relationships. But if you find yourself trawling Facebook or scrolling through Instagram while you''re at a dinner party or hanging out with your significant other, it may be time to reconsider your relationship with the Internet.\r\n</p>\r\n<p>\r\nNo matter your stance on whether the Internet has changed communication for worse or better, thereâ€™s no denying it plays a major role in our lives today. And to make sure you keep abreast of the latest technologies, head to eBay for your next tech purchase. From 29th March to the 2nd April, eBay is holding a 20% off Tech sale on new products from selected retailers!\r\n</p>', 15, 13, 1, 7, 3, '2015-04-30 13:11:54'),
(55, 'TAG Heuer''s luxury smartwatch to cost $1,400, have a 40-hour battery', 85, '<p>\r\nSwiss luxury watch maker TAG Heuer''s smartwatch will have a price tag of $1,400 when it hits the market in October or November this year, company CEO Jean-Claude Biver said during the opening of a Hublot boutique in Dubai Mall.\r\n</p>\r\n<p>\r\nAccording to Bloomberg, Biver also said the smartwatch will have a 40-hour battery. For comparison, the 38mm version of Apple Watch has an 18-hour battery.\r\n</p>\r\n<p>\r\nNo other details about the as yet unnamed luxury smartwatch were revealed. TAG Heuer announced in March it will be powered by an Intel chip and will run Google''s Android Wear, while Reuters reported it would be based on the TAG Heuer Carrera, a sporty, luxury timepiece with a motor racing pedigree.\r\n</p>\r\n<p>\r\nAnd though the price is steep, much higher than that of the entry-level, $349 Apple Watch Sport, Biver is not worried about Apple Watch.\r\n</p>\r\n<p>\r\nâ€œI hope they sell millions and millions and millions of them. The more they sell the more a few people will want something different and come to TAG Heuer,â€ he said.\r\n</p>\r\n<p>\r\nTAG Heuer is not the only luxury watch maker to jump into the smartwatch race. Swiss brand Breitling has already launched the B55, a Bluetooth-powered smartwatch that connects with your phone, and Bulgari (which is a sister brand to TAG Heuer, as both are part of the luxury group LVMH) has unveiled an NFC-enabled, connected timepiece in March.\r\n</p>', 15, 20, 1, 2, 2, '2015-04-30 13:18:40');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fname` varchar(150) NOT NULL,
  `lname` varchar(150) NOT NULL,
  `pic` int(10) unsigned NOT NULL,
  `uname` varchar(50) NOT NULL,
  `hash` char(64) NOT NULL,
  `level` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `pic` (`pic`),
  KEY `fname` (`fname`,`lname`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fname`, `lname`, `pic`, `uname`, `hash`, `level`) VALUES
(15, 'Collins', 'Wagaba', 27, 'Wagaba', '288a38f95eb7889329ebc879c48ecb94f8bfa5539da766e3d6460e255a69ef13', 1);

-- --------------------------------------------------------

--
-- Table structure for table `voter`
--

CREATE TABLE IF NOT EXISTS `voter` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `poll` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ad`
--
ALTER TABLE `ad`
  ADD CONSTRAINT `ad_ibfk_1` FOREIGN KEY (`pic`) REFERENCES `pic` (`id`);

--
-- Constraints for table `shule`
--
ALTER TABLE `shule`
  ADD CONSTRAINT `shule_ibfk_1` FOREIGN KEY (`cover`) REFERENCES `pic` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `shule_ibfk_2` FOREIGN KEY (`author`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`pic`) REFERENCES `pic` (`id`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
