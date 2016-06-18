<?php
// insert user(node) and relationship from received json
    include('func.php');
    include('connectdb.php'); 
    $connection = mysql_select_db($database, $server) or die("Unable to select db");

$query = "drop table if exists ft_relationship,ft_uinfo;";
$result = mysql_query($query) or die(mysql_error()); 

$query = "CREATE TABLE IF NOT EXISTS `ft_uinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `wp_id` bigint(20) unsigned DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `birthPlace` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `death` date DEFAULT NULL,
  `dealthPlace` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `firstName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wp_id` (`wp_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;";

$result = mysql_query($query) or die(mysql_error()); 

$query = "INSERT INTO `ft_uinfo` (`id`, `image`, `wp_id`, `date_created`, `date_modified`, `status`, `birth`, `birthPlace`, `death`, `dealthPlace`, `email`, `firstName`, `lastName`, `gender`) VALUES
(1, 'http://thumbs.dreamstime.com/m/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg', NULL, '2016-05-20 16:45:16', '2016-05-20 20:44:21', 1, '1963-01-01', '紐約', NULL, NULL, '2@3.com', '月櫻', '王', 2),
(2, 'http://thumbs.dreamstime.com/m/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg', NULL, '2016-05-20 16:47:28', '2016-05-20 20:43:34', 3, '1992-01-01', '台灣', NULL, NULL, '2@3.com', '増', '王', 1),
(3, 'http://thumbs.dreamstime.com/m/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg', NULL, '2016-05-20 16:48:36', '2016-05-20 20:43:19', 1, '1992-01-01', '紐約', NULL, NULL, '2@3.com', '柏穎', '邱', 2),
(4, 'http://thumbs.dreamstime.com/m/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg', NULL, '2016-05-20 16:49:55', '2016-05-20 20:36:11', 1, '1992-01-01', 'New York City', NULL, NULL, '2@3.com', '熠榮', '李', 1),
(5, 'https://thumbsplus.tutsplus.com/uploads/users/135/posts/21954/preview_image/preview-cartoon-children.jpg?height=300&width=300', NULL, '2016-05-20 16:50:45', '2016-05-20 20:36:31', 1, '1992-01-01', 'New York City', NULL, NULL, '2@3.com', '志榮', '李', 1),
(6, 'http://thumbs.dreamstime.com/m/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg', NULL, '2016-05-20 16:51:03', '2016-05-20 20:43:28', 2, '1992-01-01', '紐約', '2016-04-01', '紐約', '2@3.com', '進榮', '李', 1),
(7, 'http://thumbs.dreamstime.com/m/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg', NULL, '2016-05-20 16:51:28', '2016-05-20 20:41:36', 1, '1992-01-01', 'New York City', NULL, NULL, '2@3.com', '岩松', '李', 1),
(8, 'http://thumbs.dreamstime.com/m/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg', NULL, '2016-05-20 16:51:56', '2016-05-20 20:44:33', 1, '1766-01-01', '紐約', NULL, NULL, '2@3.com', '信志', '邱', 1),
(9, 'http://thumbs.dreamstime.com/m/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg', NULL, '2016-05-20 16:52:17', '2016-05-20 20:39:19', 2, '1992-01-01', 'New York City', NULL, NULL, '2@3.com', '慶芳', '林', 2),
(10, 'https://thumbsplus.tutsplus.com/uploads/users/135/posts/21954/preview_image/preview-cartoon-children.jpg?height=300&width=300', NULL, '2016-05-20 16:52:35', '2016-05-20 20:53:05', 1, '1992-01-01', 'New York City', NULL, NULL, '2@3.com', '敏長', '李', 1),
(11, 'https://thumbsplus.tutsplus.com/uploads/users/135/posts/21954/preview_image/preview-cartoon-children.jpg?height=300&width=300', NULL, '2016-05-20 16:52:54', '2016-05-20 20:53:13', 1, '1992-01-01', 'New York City', NULL, NULL, '2@3.com', '敏清', '李', 1),
(12, 'http://thumbs.dreamstime.com/m/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg', NULL, '2016-05-20 16:53:13', '2016-05-20 20:53:49', 1, '1992-01-01', '紐約', NULL, NULL, '2@3.com', '衍宏', '王', 2),
(13, 'http://thumbs.dreamstime.com/m/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg', NULL, '2016-05-20 16:53:28', '2016-05-20 20:53:25', 1, '1992-01-01', 'New York City', NULL, NULL, '2@3.com', '敏和', '李', 1),
(14, 'https://thumbsplus.tutsplus.com/uploads/users/135/posts/21954/preview_image/preview-cartoon-children.jpg?height=300&width=300', NULL, '2016-05-20 16:53:45', '2016-05-20 20:54:02', 1, '1992-01-01', 'New York City', NULL, NULL, '2@3.com', '洪森', '王', 1);";

$result = mysql_query($query) or die(mysql_error()); 


$query = "CREATE TABLE IF NOT EXISTS `ft_relationship` (
  `pid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  PRIMARY KEY (`pid`,`cid`),
  FOREIGN KEY (pid) REFERENCES ft_uinfo(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (cid) REFERENCES ft_uinfo(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
$result = mysql_query($query) or die(mysql_error()); 

$query = "INSERT INTO `ft_relationship` (`pid`, `cid`, `rid`) VALUES
(1, 4, 2),
(1, 5, 2),
(1, 6, 2),
(1, 7, 3),
(2, 1, 1),
(2, 3, 3),
(3, 1, 2),
(3, 2, 3),
(6, 10, 1),
(6, 11, 1),
(6, 12, 3),
(7, 1, 3),
(7, 4, 1),
(7, 5, 1),
(7, 6, 1),
(8, 3, 1),
(8, 9, 3),
(8, 14, 1),
(9, 3, 2),
(9, 8, 3),
(9, 14, 2),
(11, 13, 3),
(12, 6, 3),
(12, 10, 2),
(12, 11, 2),
(13, 11, 3),
(1,1,0),
(2,2,0),
(3,3,0),
(4,4,0),
(5,5,0),
(6,6,0),
(7,7,0),
(8,8,0),
(9,9,0),
(10,10,0),
(11,11,0),
(12,12,0),
(13,13,0),
(14,14,0);";
$result = mysql_query($query) or die(mysql_error()); 


$query = "drop view ft_overall_cid;";
$result = mysql_query($query) or die(mysql_error()); 


/*$query = "create view ft_overall_cid as
SELECT * 
FROM ft_uinfo u
INNER JOIN ft_relationship ON u.id = cid
WHERE id = cid
ORDER BY id;";*/

$query = 'create view wp_ft_overall_cid as
SELECT u.id,image,wp_id,date_created,date_modified,status,birth,birthPlace,death,dealthPlace,email,firstName,lastName,gender,rel.id as relid,pid,cid,rid,is_confirmed,creator_id
FROM wp_ft_uinfo u
INNER JOIN wp_ft_relationship rel ON u.id = cid
WHERE u.id = cid
ORDER BY u.id;';
$result = mysql_query($query) or die(mysql_error()); 


echo $result;
      
    mysql_close($server);
?>