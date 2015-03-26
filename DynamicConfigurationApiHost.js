var restify = require('restify');
var fsMediaFormatter = require('./FreeSwitchMediaFormatter.js');
var extBackendHandler = require('./SipExtBackendOperations.js');
var xmlGen = require('./XmlResponseGenerator.js');
var logHandler = require('./LogHandler.js');
var jsonFormatter = require('./DVP-Common/CommonMessageGenerator/ClientMessageJsonFormatter.js');

var server = restify.createServer({
    name: 'localhost',
    version: '1.0.0',
    formatters : {
        'application/x-www-form-urlencoded' : function(req, res, body)
        {
            return body;
        }
    }
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


server.post('/DirectoryProfile', function(req, res, next)
{
    try
    {
        logHandler.WriteLog("info", "Start");


        var data = fsMediaFormatter.convertUrlEncoded(req.body);

        var hostname = data["hostname"];
        var user = data["user"];
        var domain = data["domain"];
        var action = data["action"];
        var purpose = data["purpose"];
        var group = data["group"];
        var sipAuthRealm = data["sip_auth_realm"];
        var profile = data["profile"];

        if(action && user && hostname && domain && (action === 'sip_auth' || action === 'message-count'))
        {
            var tempAuthRealm = domain;
            if(sipAuthRealm != undefined)
            {
                tempAuthRealm = sipAuthRealm;
            }

            extBackendHandler.GetUserBy_Name_Domain(user, tempAuthRealm, function(err, usr){
                if(usr != undefined)
                {
                    //create xml
                    var xml = xmlGen.createDirectoryProfile(usr.SipUsername, usr.SipExtension, usr.Domain, usr.EmailAddress, usr.Password, usr.Context);

                    res.end(xml);

                }
                else
                {
                    logHandler.WriteLog("error", jsonFormatter.FormatMessage(new Error('user undefined'), 'ERROR', false, undefined));
                    var xml = xmlGen.createNotFoundResponse();

                    res.end(xml);
                }
            })
        }
        else if(action && user && hostname && domain && (action === 'user_call' || action === 'voicemail-lookup'))
        {
            var tempAuthRealm = domain;
            if(sipAuthRealm != undefined)
            {
                tempAuthRealm = sipAuthRealm;
            }

            extBackendHandler.GetUserBy_Ext_Domain(user, tempAuthRealm, function(err, usr){
                if(usr != undefined)
                {
                    //create xml
                    var xml = xmlGen.createDirectoryProfile(usr.SipUsername, usr.SipExtension, usr.Domain, usr.EmailAddress, usr.Password, usr.Context);

                    res.end(xml);

                }
                else
                {
                    logHandler.WriteLog("error", jsonFormatter.FormatMessage(new Error('user undefined'), 'ERROR', false, undefined));

                    var xml = xmlGen.createNotFoundResponse();

                    res.end(xml);
                }
            })
        }
        else
        {
            logHandler.WriteLog("error", jsonFormatter.FormatMessage(new Error('Invalid Parameters Passed'), 'ERROR', false, undefined));
            res.end(xmlGen.createNotFoundResponse());
        }

    }
    catch(ex)
    {
        logHandler.WriteLog("error", jsonFormatter.FormatMessage(ex, 'EXCEPTION', false, undefined));
        res.end(xmlGen.createNotFoundResponse());
    }

    return next();

});


server.listen(9093, 'localhost', function () {
    console.log('%s listening at %s', server.name, server.url);
});