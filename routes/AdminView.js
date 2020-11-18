

module.exports = {

    getAdminViewPage: (req,res) =>{
        var eventID = req.body.eventID
        if(req.session.loggedin === true && eventID)
        {
            db.query('SELECT * FROM events WHERE EVid = ?', [eventID], function(error, results, fields, rows) {     
                length = results.length
                result = results[0]
                res.render('Adetails.ejs',{
                    title: 'AdminEventsView',
                    userName : req.session.Ename,
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

    getLogPage: (req,res) =>{
        if(req.session.loggedin === true)
        {
            db.query('SELECT * FROM logs', [], function(error, results, fields, rows) { 
                length = results.length    
                res.render('logs.ejs',{
                    title: 'AdminLogPage',
                    userName : req.session.Ename,
                    userOrganizer : req.session.EOname,
                    results,length
                    })
            });
        }
        else
        {
            res.redirect('/login');
        }
    },

    getParticipantPage: (req,res) =>{
        if(req.session.loggedin === true)
        {
            EventID = req.body.eventID
            db.query('SELECT S.Sname AS Sname , S.Sdept AS Sdept , P.Psid AS Psid , P.Peid AS Peid FROM participants P, student S WHERE P.Peid = ? AND P.Psid = S.Sid', [EventID], function(error, results, fields, rows) { 
                length = results.length    
                //return res.send(results[0].)
                res.render('participants.ejs',{
                    title: 'AdminParticipants',
                    userName : req.session.Ename,
                    userOrganizer : req.session.EOname,
                    results,length
                    })
            });
        }
        else
        {
            res.redirect('/login');
        }
    }
}