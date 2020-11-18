CREATE PROCEDURE EventList() 
SELECT * FROM events;

DELIMITER $$
CREATE TRIGGER log_newEvents AFTER INSERT
ON events
FOR EACH ROW BEGIN
	INSERT INTO logs (Lname, Laction, Ltime) VALUES (NEW.EVname,"Event Created", NOW());
END $$

DELIMITER $$
CREATE TRIGGER log_updateEvents AFTER UPDATE
ON events
FOR EACH ROW BEGIN
	INSERT INTO logs (Lname, Laction, Ltime) VALUES (NEW.EVname,"Event Updated", NOW());
END $$

DELIMITER $$
CREATE TRIGGER log_deleteEvents BEFORE DELETE
ON events
FOR EACH ROW BEGIN
	INSERT INTO logs (Lname, Laction, Ltime) VALUES (OLD.EVname,"Event Deleted", NOW());
END $$


