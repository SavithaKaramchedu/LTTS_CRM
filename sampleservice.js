
var db = require('./db');


exports.RouteGetSomething = function (req, res) {
    res.status(200).json({ "value": "hello world", "params": req.params });
}
exports.RoutePostSomething = function (req, res) {
    res.status(200).json({ "params=": req.params, "body": req.body });
}
exports.getLoginPage = function (req, res) {
console.log("IN Sample service");
    res.render('login.ejs', {
        
        title: "Welcome to CRM Application"
        , message: ''

    });
};
exports.validateLogin = function (req, res) {


    let psno = req.body.psno;
    let pwd = req.body.pwd;

    var ldap = require('ldapjs');
    let usernameQuery = "call procUserAuthentication( '" + psno + "');";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

       else{

        let email=result[0][0].EMAIL;
       
           var client = ldap.createClient({
       
            url: 'ldap://BRDIESMSDC01.lnties.com/DC=lnties,DC=com'
            
          });
         
          var opts = {
            filter: '(objectclass=user)',
            scope: 'sub',
            attributes: ['objectGUID']
          };

          console.log("down");
          client.bind(email, pwd, function (err) {
             
              if (err) {
                message = 'Incorrect Credentials';
                console.log(message);
                return res.status(500).send(err);
               }
            else {
                res.redirect('/home');
                }
          });
       }

    });
   
};
exports.getHomePage = function (req, res) {

    res.render('home.ejs', {
        title: "Welcome to CRM Application"


    });

};
exports.getLeadPage = function (req, res) {

    let query = "SELECT * FROM `lead` ORDER BY id ASC";

    db.query(query, (err, result) => {

        if (err) {
            res.redirect('/');
            console.log("errorrr");
        }
        res.status(200).json(result);

    });
};
exports.getEmpPage = function (req, res) {


    let query = "SELECT * FROM `employee` ORDER BY empid ASC"; // query database to get all the players

    db.query(query, (err, result) => {

        if (err) {
            res.redirect('/');
            console.log("errorrr");
        }
        res.status(200).json(result);


    });
};
exports.addLead = function (req, res) {

    let message = '';
    let title = req.body.title;
    let company = req.body.company;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let status = req.body.status;
    let qul = req.body.qul;
    let source = req.body.source;
    let category = req.body.category;
    let priority = req.body.priority;
    let owner = req.body.owner;

             let query = "INSERT INTO `lead` (title,company,firstname,lastname,status,qualificationlevel,source,category,priority,owner) VALUES ('" +
            title + "', '" + company + "', '" + firstname + "', '" + lastname + "','" + status + "','" + qul +
             "',  '" + source + "',  '" + category + "',  '" + priority + "',  '" + owner + "')";

       
    db.query(query, (err, result) => {
        if (err) {
            console.log("error contact");
            return res.status(500).send(err);
        }

        res.redirect('/home');

    });
};
exports.editLeadPage = function (req, res) {
    let playerId = req.params.id;
    let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('edit-player.ejs', {
            title: "Edit Lead"
            , player: result[0]
            , message: ''
        });
    });
},
    exports.editLead = function (req, res) {
        let playerId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;

        let query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/home');
        });
    };
exports.deleteLead = function (req, res) {

    let playerId = req.params.id;
    let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/home');
    });


}
exports.getBackPage = function (req, res) {
    res.render('login.ejs', {
        title: "Welcome to Crm Application"
        , message: ''
    });
};
exports.addContactPage = function (req, res) {

let fname = req.body.firstname;
    let lname = req.body.lastname;
    let account = req.body.accountname;
    let title = req.body.jobtitle;
    let function1 = req.body.functionname;
    let department = req.body.department;
    let phone = req.body.phone;
    let city = req.body.city;
    let fax = req.body.fax;
    let mobile = req.body.mobile;
    let email = req.body.email;
    let query = "INSERT INTO `contact` (firstname,lastname,accountname,jobtitle,functionname,department,phone,city,fax,mobile,email) VALUES ('" +
    fname + "', '" + lname + "', '" + account + "', '" + title + "','" + function1 + "','" +
        department + "','" + phone + "','" + city + "','" + fax + "','" + mobile + "','" +
        email + "')";


    db.query(query, (err, result) => {
        if (err) {
            console.log("error contact");
            return res.status(500).send(err);
        }

        res.redirect('/home');

    });
};
exports.ContactPage = function (req, res) {

    let query = " SELECT * FROM `contact` ORDER BY mobile ASC;";

    db.query(query, (err, result) => {

        if (err) {
            res.redirect('/');
            console.log("errorrr");
        }
        res.status(200).json(result);


    });
};
exports.addAccountPage = function (req, res) {
    let message = '';
    let name = req.body.name;

    let status = req.body.prospect;

    let parentaccount = req.body.parentaccount;

    let website = req.body.website;

    let accountcategory = req.body.accountcategory;

    let vertical = req.body.vertical;

    let cont = req.body.country;

    let cit = req.body.city;

    let stat = req.body.state;

    let own = req.body.owner;

    let query = "INSERT INTO `account` (name,prospect, parentaccount,website,accountcategory,vertical,country,city,state,owner) VALUES ('" +
        name + "', '" + status + "','" + parentaccount + "', '" + website + "','" + accountcategory + "','" + vertical + "','" + cont + "','" + cit + "','" + stat + "','" + own + "')";



    db.query(query, (err, result2) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('/home');
    });

};
exports.getAccountPage = function (req, res) {


    let query = "SELECT * FROM `account`";



    db.query(query, (err, result) => {

        if (err) {
            res.redirect('/');
            console.log("errorrr");
        }
        res.json(result);


    });
};
exports.getOpportunityPage = function (req, res) {
    let query1 = "select * from opportunities order by id ASC";



    db.query(query1, (err, result2) => {
        if (err) {
            res.redirect('/');
        }
        res.status(200).json(result2);
    });
},
    exports.addOpportunity = function (req, res) {

       
        let message = '';
        let Name = req.body.oppName;
        let Account = req.body.Accountopp;
        let PrimaryContact = req.body.PrimaryContact;
        let Source = req.body.Source;
        let Exceptedvalue = req.body.Exceptedvalue;
        let StartDate = req.body.StartDate;

        let ClosingDate = req.body.ClosingDate;
        let SalesCycle = req.body.SalesCycle;
        let Salesphase = req.body.Salesphase;

        let Probability = req.body.Probability;
        let ForecastCategory = req.body.ForecastCategory;
        let Category = req.body.convertcategory;
        let Owner = req.body.Owneropp



        let query = "INSERT INTO `opportunities` (name,account,primarycontact,source,exceptedvalue,startdate,closedate,salescycle,salesphase,probability,forecastcategory,category,owner) VALUES ('" +
            Name + "', '" + Account + "','" + PrimaryContact + "', '" + Source + "','" + Exceptedvalue +
            "','" + StartDate + "','" + ClosingDate + "','" + SalesCycle + "','" + Salesphase + "','" +
            Probability + "','" + ForecastCategory + "','" + Category + "','" + Owner + "')";
			
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect("/home")
        });

    };