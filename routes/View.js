

module.exports = {

    getViewPage: (req,res) =>{
        var userID = req.session.userid
        var eventID = req.body.eventID
        if(req.session.loggedin === true && eventID)
        {
            db.query('SELECT * FROM student WHERE SUid = ?', [userID], function(error, results, fields, rows) {  
                req.session.userPartID = results[0].Sid 
                userPartID = req.session.userPartID   
                db.query('SELECT * FROM participants WHERE Psid = ? AND Peid = ?', [userPartID,eventID], function(error, results, fields, rows) {              
                    if(results.length === 0) UserPartFlag = 0;
                    else UserPartFlag = 1;
                    db.query('SELECT * FROM events WHERE EVid = ?', [eventID], function(error, results, fields, rows) {     
                        length = results.length
                        result = results[0]
                        db.query('SELECT * FROM participants WHERE Peid = ?', [eventID], function(error, resultsPart, fields, rows) {     
                            lengthPart = resultsPart.length
                            res.render('details.ejs',{
                                title: 'EventsView',
                                userName: req.session.username,
                                result,length,eventID,UserPartFlag,lengthPart
                                })
                        });
                    });
                });
            });
        }
        else
        {
            res.redirect('/login');
        }
    },

    getJoinCheck: (req,res) =>{
        if(req.session.loggedin === true)
        {
            var userPartID = req.session.userPartID;
            var userID = req.session.userid;
            var eventID = req.body.eventID;
            db.query('SELECT * FROM participants WHERE Psid = ? AND Peid = ?', [userPartID,eventID], function(error, results, fields) {     
                if(results.length<1){
                    db.query('INSERT INTO participants (Psid, Peid) VALUES (?,?)', [userPartID,eventID], function(error, results, fields) {     
                        if (error) {
                            return res.status(500).send(error);
                        }
                        db.query('SELECT EVcount FROM events WHERE EVid = ?', [eventID], function(error, results, fields) {     

                            db.query('UPDATE events SET EVcount = EVcount + 1 WHERE EVid = ?', [eventID], function(error, results, fields) {     
                                res.redirect('/events');
                            });
                        });
                    });
                }else{
                    res.redirect('/login');
                }

            });
        }
        else
        {
            res.redirect('/login');
        }
    },
}