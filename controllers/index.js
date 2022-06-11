const router = require("express").Router();

const { Blog, User } = require("../models");
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");

router.use("/api", apiRoutes);
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

router.use("/", homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
