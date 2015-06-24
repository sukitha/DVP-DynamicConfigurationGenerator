var httpReq = require('request');
var config = require('config');
var util = require('util');
var stringify = require('stringify');
var logger = require('DVP-Common/LogHandler/CommonLogHandler.js').logger;

var RemoteGetSipUserDetailsForUuid = function(reqId, sipUserUuid, securityToken, callback)
{
    try
    {
        logger.debug('[DVP-PBXService.RemoteGetSipUserDetailsForUuid] - [%s] -  Trying to get Sip User Details From Api - Params - sipUserUuid : %s', reqId, sipUserUuid);
        var sipUACIp = config.Services.SipUACApi.Ip;
        var sipUACPort = config.Services.SipUACApi.Port;
        var apiVersion = config.Services.SipUACApi.Version;

        if(sipUACIp && sipUACPort && apiVersion)
        {
            var httpUrl = util.format('http://%s:%d/DVP/%s/UACManagement/SipUserByUuid/%s', sipUACIp, sipUACPort, apiVersion, sipUserUuid);

            var options = {
                url: httpUrl,
                headers: {
                    'authorization': securityToken
                }
            };

            logger.debug('[DVP-PBXService.RemoteGetSipUserDetailsForUuid] - [%s] - Creating Api Url : %s', reqId, httpUrl);


            httpReq(options, function (error, response, body)
            {
                if (!error && response.statusCode == 200)
                {
                    var apiResp = JSON.parse(body);

                    logger.debug('[DVP-PBXService.RemoteGetSipUserDetailsForUuid] - [%s] - Sip UAC Api returned : %s', reqId, body);

                    callback(apiResp.Exception, apiResp.Result);
                }
                else
                {
                    logger.error('[DVP-PBXService.RemoteGetSipUserDetailsForUuid] - [%s] - Sip UAC Api call failed', reqId, error);
                    callback(error, undefined);
                }
            })
        }
        else
        {
            logger.error('[DVP-PBXService.RemoteGetSipUserDetailsForUuid] - [%s] - Sip uac service ip, port or version not set', reqId);
            callback(new Error('Sip uac service ip, port or version not set'), undefined)
        }
    }
    catch(ex)
    {
        logger.error('[DVP-PBXService.RemoteGetSipUserDetailsForUuid] - [%s] - Exception occurred', reqId, ex);
        callback(ex, undefined);
    }
};

var RemoteGetSipUserDetailsForExtension = function(reqId, extension, securityToken, callback)
{
    try
    {
        logger.debug('[DVP-PBXService.RemoteGetSipUserDetailsForExtension] - [%s] -  Trying to get Sip User Details From Api - Params - extension : %s', reqId, extension);
        var sipUACIp = config.Services.SipUACApi.Ip;
        var sipUACPort = config.Services.SipUACApi.Port;
        var apiVersion = config.Services.SipUACApi.Version;

        if(sipUACIp && sipUACPort && apiVersion)
        {
            var httpUrl = util.format('http://%s:%d/DVP/API/%s/ExtensionManagement/FullExtensionDetails/%s', sipUACIp, sipUACPort, apiVersion, extension);

            var options = {
                url: httpUrl,
                headers: {
                    'authorization': securityToken
                }
            };

            logger.debug('[DVP-PBXService.RemoteGetSipUserDetailsForExtension] - [%s] - Creating Api Url : %s', reqId, httpUrl);


            httpReq(options, function (error, response, body)
            {
                if (!error && response.statusCode == 200)
                {
                    var apiResp = JSON.parse(body);

                    logger.debug('[DVP-PBXService.RemoteGetSipUserDetailsForExtension] - [%s] - Sip UAC Api returned : %s', reqId, body);

                    callback(apiResp.Exception, apiResp.Result);
                }
                else
                {
                    logger.error('[DVP-PBXService.RemoteGetSipUserDetailsForExtension] - [%s] - Sip UAC Api call failed', reqId, error);
                    callback(error, undefined);
                }
            })
        }
        else
        {
            logger.error('[DVP-PBXService.RemoteGetSipUserDetailsForExtension] - [%s] - Sip uac service ip, port or version not set', reqId);
            callback(new Error('Sip uac service ip, port or version not set'), undefined)
        }
    }
    catch(ex)
    {
        logger.error('[DVP-PBXService.RemoteGetSipUserDetailsForExtension] - [%s] - Exception occurred', reqId, ex);
        callback(ex, undefined);
    }
};

var RemoteGetDialplanConfig = function(reqId, ani, dnis, context, direction, userUuid, fromUserUuid, opType, extExtraData, url, securityToken, callback)
{
    try
    {
        logger.debug('[DVP-PBXService.RemoteGetPBXDialplanConfig] - [%s] -  Trying to get pbx details from pbx app', reqId);


            var httpUrl = url;

            var jsonObj = { ANI: ani, DNIS: dnis, Context: context, Direction: direction, ExtraData: {UserUuid: userUuid, FromUserUuid: fromUserUuid, OperationType: opType, ExtExtraData: extExtraData} };

            var jsonStr = JSON.stringify(jsonObj);

            var options = {
                url: httpUrl,
                method: 'POST',
                headers: {
                    'authorization': securityToken,
                    'content-type': 'application/json'
                },
                body: jsonStr
            };

            logger.debug('[DVP-PBXService.RemoteGetPBXDialplanConfig] - [%s] - Creating Api Url : %s', reqId, httpUrl);


            httpReq.post(options, function (error, response, body)
            {
                if (!error && response.statusCode == 200)
                {
                    var apiResp = JSON.parse(body);

                    logger.debug('[DVP-PBXService.RemoteGetPBXDialplanConfig] - [%s] - Extended Dialplan Api returned : %s', reqId, body);

                    callback(undefined, apiResp);
                }
                else
                {
                    logger.error('[DVP-PBXService.RemoteGetPBXDialplanConfig] - [%s] - Extended Dialplan Api call failed', reqId, error);
                    callback(error, undefined);
                }
            })
    }
    catch(ex)
    {
        logger.error('[DVP-PBXService.RemoteGetPBXDialplanConfig] - [%s] - Exception occurred', reqId, ex);
        callback(ex, undefined);
    }
};

module.exports.RemoteGetSipUserDetailsForUuid = RemoteGetSipUserDetailsForUuid;
module.exports.RemoteGetSipUserDetailsForExtension =RemoteGetSipUserDetailsForExtension;
module.exports.RemoteGetDialplanConfig = RemoteGetDialplanConfig;