const router = require("express").Router();
const UsersRoutes = require("./User");

router.use("/User", UsersRoutes);

module.exports = router;
