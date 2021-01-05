const { npmRunBuild } = require("../utils/npmRunBuild.js");

npmRunBuild("test").then((r) => {
    console.log(r);
});