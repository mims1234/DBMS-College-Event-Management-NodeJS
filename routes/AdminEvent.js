module.exports = {

    getAdminEventPage: (req,res) =>{
        if(req.session.loggedin === true)
        {
            var userID = req.session.userid
            db.query('SELECT E.Ename AS Ename,E.Edept AS Edept, EO.EOname AS EOname FROM employee E , events_organizer EO WHERE E.EUid = ? AND E.Eid = EO.EOid', [userID], function(error, results, fields, rows) {     
                req.session.Ename = results[0].Ename
                req.session.EOname  = results[0].EOname
                db.query('SELECT E.EVname AS EVname, E.EVdate AS EVdate, E.EVdept AS EVdept, E.EVtype AS EVtype , E.EVid AS EVid , EO.EOname AS EOname , EO.EOeid AS EOeid FROM events E, events_organizer EO WHERE E.EVorgid = EO.EOid', [userID], function(error, results, fields, rows) {   
                    length = results.length
                    console.log(`AdmineEvent ID = ${results[0].EOeid}`)
                    res.render('Aevents.ejs',{
                        title: 'AdminEvents',
                        totalParticipants: req.session.participants,
                        userName : req.session.Ename,
                        userOrganizer : req.session.EOname,
                        employeeID : req.session.employeeID,
                        results,length
                        })
                });
            });
        }
        else
        {
            res.redirect('/login');
        }
    },

    getLogoutCheck: (req,res) =>{
        req.session.loggedin = false;
        res.redirect('/login');
    }
}