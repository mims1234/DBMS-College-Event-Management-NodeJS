

module.exports = {

    getAdminEditPage: (req,res) =>{
        var eventID = req.body.eventID
        if(req.session.loggedin === true && eventID)
        {
            db.query('SELECT * FROM events WHERE EVid = ?', [eventID], function(error, results, fields, rows) {     
                length = results.length
                result = results[0]
                res.render('Aedit.ejs',{
                    title: 'AdminEventEdit',
                    userName: req.session.Ename,
                    userOrganizer : req.session.EOname,
                    result,length,eventID
                    })
            });
        }
        else
        {
            res.redirect('/login');
        }
    },

    getAdminAddPage: (req,res) =>{
        if(req.session.loggedin === true)
        {
            result = [
                EVname = "Enter Name",
                EVtype = "Select Type",
                EVvenue = "Enter Venue",
                EVdept = "Select Department",
                EVdesc = "Enter Description under 200 characters",
                EVcountMax = "Enter amount of participants allowed",
                EVdate = "Enter Date of event"
            ]
            res.render('Aadd.ejs',{
                title: 'AdminEventAdd',
                userName: req.session.Ename,
                userOrganizer : req.session.EOname,
                result
                })
        }
        else
        {
            res.redirect('/login');
        }
    },

    getAdminDeleteCheck: (req,res) =>{
        if(req.session.loggedin === true)
        {
            var eventID = req.body.eventID
            db.query('DELETE FROM events WHERE EVid = ?', [eventID], function(error, results, fields) {     
                if (error) {
                    return res.status(500).send(error);
                }
                res.redirect('/adminevents');
            });
        }
        else
        {
            res.redirect('/login');
        }
    },

    getAdminEditCheck: (req,res) =>{
        if(req.session.loggedin === true)
        {
            var eventID = req.body.eventID
            var eventName = req.body.eventname;
            var eventDesc = req.body.eventdesc;
            var eventVenue = req.body.eventvenue;
            var eventCountMax = req.body.eventcountmax;
            var eventType = req.body.eventtype;
            if(req.body.eventdateY) eventDate = req.body.eventdateY;
            else eventDate = req.body.eventdateN;
            db.query('UPDATE events SET EVname = ? ,EVdesc = ? , EVvenue = ? , EVcountMax = ? , EVtype = ? , EVdate = ? WHERE EVid = ?', [eventName,eventDesc,eventVenue,eventCountMax,eventType,eventDate,eventID], function(error, results, fields) {     
                //console.log(results)
                if (error) {
                    return res.status(500).send(error);
                }
                res.redirect('/adminevents');
            });
        }
        else
        {
            res.redirect('/login');
        }
    },

    getAdminAddCheck: (req,res) =>{
        if(req.session.loggedin === true)
        {
            var userID = req.session.userid
            var eventName = req.body.eventname;
            var eventDesc = req.body.eventdesc;
            var eventVenue = req.body.eventvenue;
            var eventCountMax = parseInt(req.body.eventcountmax);
            var eventDept = req.body.eventdept;
            var eventType = req.body.eventtype;
            var eventDate = req.body.eventdate;
            var eventAvailability = 1;
            db.query('SELECT * FROM user_credencials , employee , events_organizer WHERE EUid = ? AND Eid = EOeid ', [userID], function(error, results, fields) {     
                var eventOid = results[0].EOid
                db.query('INSERT INTO events (EVname, EVdesc, EVvenue, EVdept, EVcount, EVcountMax, EVtype, EVdate, EVavailability, EVorgid) VALUES (?,?,?,?,?,?,?,?,?,?)', [eventName,eventDesc,eventVenue,eventDept,0,eventCountMax,eventType,eventDate,eventAvailability,eventOid], function(error, results, fields) {     
                    if (error) {
                        return res.status(500).send(error);
                    }
                    res.redirect('/adminevents');
                });
                //res.send('Debugging');
            });
        }
        else
        {
            res.redirect('/login');
        }
    },
}