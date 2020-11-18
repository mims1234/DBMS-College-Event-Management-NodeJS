

module.exports = {

    getEventPage: (req,res) =>{
        if(req.session.loggedin === true)
        {
            var userID = req.session.userid
            db.query('SELECT * FROM student WHERE SUid = ?', [userID], function(error, results, fields, rows) {     
                userName = results[0].Sname
                userDept = results[0].Sdept
                req.session.name = userName;
                lengthP = results.length
                db.query('SELECT * FROM events', [], function(error, results, fields, rows) {   
                    length = results.length
                    db.query('SELECT * FROM student', [], function(error, resultsP, fields, rows) {   
                        lengthPP = resultsP.length
                        res.render('events.ejs',{
                            title: 'Events',
                            userName : userName,
                            userDept : userDept,
                            totalParticipants: req.session.participants,
                            results,length,resultsP,lengthPP
                            })
                    });
                });
            });
        }
        else
        {
            res.redirect('/login');
        }
    },
}