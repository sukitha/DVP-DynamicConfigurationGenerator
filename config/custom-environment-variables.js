/**
 * Created by dinusha on 4/22/2015.
 */

module.exports = {

    "DB": {
        "Type":"SYS_DATABASE_TYPE",
        "User":"SYS_DATABASE_POSTGRES_USER",
        "Password":"SYS_DATABASE_POSTGRES_PASSWORD",
        "Port":"SYS_SQL_PORT",
        "Host":"SYS_DATABASE_HOST",
        "Database":"SYS_DATABASE_POSTGRES_USER"
    },

    "Host":{
        "Port":"HOST_DYNAMICCONFIGGEN_PORT",
        "Version":"HOST_VERSION"
    },

    "Redis":
    {
        "IpAddress": "SYS_REDIS_HOST",
        "Port": "SYS_REDIS_PORT",
        "Password": "SYS_REDIS_PASSWORD"
    },

    "Services":
    {

        "fileServiceHost": "SYS_FILESERVICE_HOST",
        "fileServicePort": "SYS_FILESERVICE_PORT",
        "fileServiceVersion":"SYS_FILESERVICE_VERSION"

    },

    "Token": "SYS_DYNAMICCONFIGGEN_TOKEN"
};