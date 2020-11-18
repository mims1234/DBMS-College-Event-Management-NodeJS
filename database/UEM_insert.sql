INSERT INTO uem.user_credencials(Uusername,Upassword,Urole) VALUES ("batman","mohsin","1");
INSERT INTO uem.user_credencials(Uusername,Upassword,Urole) VALUES ("dhruva","pushpa","1");
INSERT INTO uem.user_credencials(Uusername,Upassword,Urole) VALUES ("mohsin","mims","2");
INSERT INTO uem.user_credencials(Uusername,Upassword,Urole) VALUES ("admin","admin","2");

INSERT INTO uem.student(SUid,Sname,Sdept) VALUES (1,"Bat","ECE");
INSERT INTO uem.student(SUid,Sname,Sdept) VALUES (2,"Dhruva","CSE");
INSERT INTO uem.employee(EUid,Ename,Edept) VALUES (3,"Mohsin","CSE");
INSERT INTO uem.employee(EUid,Ename,Edept) VALUES (4,"Admin Tester","CSE");

INSERT INTO uem.events_organizer(EOname,EOdept,EOeid) VALUES ("Red Hats","CSE",1);
INSERT INTO uem.events_organizer(EOname,EOdept,EOeid) VALUES ("Admin Team","AD",2);

INSERT INTO uem.events(EVname,EVdept,EVtype,EVdate,EVdesc,EVvenue,EVcountMax,EVcount,EVavailability,EVorgid) 
VALUES ("Ethnic Day","CSE","Culture","2019-11-15 10:00:00",
"Welcoming all to RGIT CSE Ethnic Day a showcase of all the cultures of Indian traditions",
"RGIT Hall",10,0,TRUE,2);

INSERT INTO uem.events(EVname,EVdept,EVtype,EVdate,EVdesc,EVvenue,EVcountMax,EVcount,EVavailability,EVorgid) 
VALUES ("Batman Day","CSE","Science","2019-12-20 13:00:00",
"Becuz Am Batman",
"RGIT Network Lab",25,2,TRUE,1);

INSERT INTO uem.events(EVname,EVdept,EVtype,EVdate,EVdesc,EVvenue,EVcountMax,EVcount,EVavailability,EVorgid) 
VALUES ("Event Test","BMS","Medical","2019-01-15 16:50:00",
"EVENT TEST DESC",
"RGIT Hall",5,4,TRUE,2);

INSERT INTO uem.participants(Psid,Peid) VALUES (1,2);
INSERT INTO uem.participants(Psid,Peid) VALUES (2,2);




