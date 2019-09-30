const app = require("cirruswave");
const initoptions={
"aclconfig":"aclconfig.json",
"secret":"undefined",
"appserviceconfig":"./appserviceconfig.json",
"appdir":"./node_modules/cirruswave/examples",
"persistence":{
  "type": "s3",
  "bucketname": "isvbucket",
  "acckey": "AKIARM3QVQGQGQNS4JGW",
  "secret": "Go3EMoMEIMzlz3FOlku7ZwuOM0QUgSPIXZ6iWWC6",
  "region": "ap-south-1"
}
};
console.log(JSON.stringify(initoptions, 0, 2));
app.startsystemservice("keymgr",initoptions);
