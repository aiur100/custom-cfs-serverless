const { npmRunBuild } = require("../utils/npmRunBuild.js");

npmRunBuild().then((r) => {
    console.log(r);
});