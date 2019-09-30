const app = require('cirruswave');
const initoptions={
 "aclconfig":"aclconfig.json",
 "secret":"helloworld",
 "appserviceconfig":"appserviceconfig.json",
 "appdir":__dirname
} 
app.startsystemservice("keymgr",initoptions);
