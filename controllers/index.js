const router = require("express").Router();

//const { Blog, User } = require("../models");
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboradRoutes = require("./dashboard-routes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboradRoutes);

router.use((req, res) => {
  res.status(404).end();
});

// router.get("/", async (req, res) => {
//   try {
//     const blogData = await Blog.findAll({
//       include: [User],
//     });
//     console.log(blogData);
//     res.json(blogData);
//     //res.render blogData to pass to handlebars template
//     // res.json({ message: "success" });
//   } catch (error) {
//     res.json({ message: "failure" });
//   }
// });

module.exports = router;
