CREATE DATABASE UEM;

CREATE TABLE UEM.user_credencials (
  `Uid` int NOT NULL AUTO_INCREMENT,
  `Uusername` varchar(255) NOT NULL,
  `Upassword` varchar(255) NOT NULL,
  `URole` int NOT NULL,
  PRIMARY KEY (`Uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE UEM.student (
  `Sid` int NOT NULL AUTO_INCREMENT,
  `SUid` int NOT NULL,
  `Sname` varchar(255) NOT NULL,
  `Sdept` varchar(255) NOT NULL,
  PRIMARY KEY (`Sid`),
  FOREIGN KEY (`SUid`) REFERENCES UEM.user_credencials (`Uid`) ON DELETE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE UEM.employee (
  `Eid` int NOT NULL AUTO_INCREMENT,
  `EUid` int NOT NULL,
  `Ename` varchar(255) NOT NULL,
  `Edept` varchar(255) NOT NULL,
  PRIMARY KEY (`Eid`),
  FOREIGN KEY (`EUid`) REFERENCES UEM.user_credencials (`Uid`) ON DELETE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE UEM.events_organizer (
  `EOid` int NOT NULL AUTO_INCREMENT,
  `EOname` varchar(255) NOT NULL,
  `EOdept` varchar(255) NOT NULL,
  `EOeid` int NOT NULL,
  PRIMARY KEY (`EOid`),
  FOREIGN KEY (`EOeid`) REFERENCES UEM.employee (`Eid`) ON DELETE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE UEM.events (
  `EVid` int NOT NULL AUTO_INCREMENT,
  `EVname` varchar(255) NOT NULL,
  `EVdept` varchar(255) NOT NULL,
  `EVtype` varchar(255) NOT NULL,
  `EVdate` varchar(255) NOT NULL,
  `EVdesc` varchar(255) NOT NULL,
  `EVvenue` varchar(255) NOT NULL,
  `EVcountMax` int NOT NULL,
  `EVcount` int NOT NULL,
  `EVavailability` boolean NOT NULL,
  `EVorgid` int NOT NULL,
  PRIMARY KEY (`EVid`),
  FOREIGN KEY (`EVorgid`) REFERENCES UEM.events_organizer (`EOid`) ON DELETE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE UEM.participants (
  `Psid` int NOT NULL,
  `Peid` int NOT NULL,
  FOREIGN KEY (`Psid`) REFERENCES UEM.student (`Sid`) ON DELETE CASCADE,
  FOREIGN KEY (`Peid`) REFERENCES UEM.events (`EVid`) ON DELETE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE UEM.logs (
  `Lid` int NOT NULL AUTO_INCREMENT,
  `Lname` varchar(255) NOT NULL,
  `Laction` varchar(255) NOT NULL,
  `Ltime` datetime NOT NULL,
   PRIMARY KEY (`Lid`)
) AUTO_INCREMENT=1;







