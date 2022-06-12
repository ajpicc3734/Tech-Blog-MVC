const router = require("express").Router();
const sequelize = require("../config/connection");
const { Blog, User, Comment } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);
  Blog.findAll({
    attributes: ["id", "body", "title", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBlogData) => {
      const blogs = dbBlogData.map((blogs) => blogs.get({ plain: true }));
      res.render("homepage", { blogs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/blogs/:id", (req, res) => {
//   Blog.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id", "body", "title", "created_at"],
//     include: [
//       {
//         model: Comment,
//         attributes: ["id", "comment_text", "user_id", "created_at"],
//         include: {
//           model: User,
//           attributes: ["username"],
//         },
//       },
//       {
//         model: User,
//         attributes: ["username"],
//       },
//     ],
//   })
//     .then((dbBlogData) => {
//       if (!dbBlogData) {
//         res.status(404).json({ message: "No post found with this id" });
//         return;
//       }
//       const blog = dbBlogData.get({ plain: true });
//       res.render("single-post", { blog });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get("/api/blogs/:id", (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "body", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBlogData) => {
      const blog = dbBlogData.get({ plain: true });
      res.render("single-post", { blog });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// router.get("/blogs/:id", (req, res) => {
//   const post = {
//     id: 1,
//     post_url: "https://handlebarsjs.com/guide/",
//     title: "Handlebars Docs",
//     created_at: new Date(),
//     vote_count: 10,
//     comments: [{}, {}],
//     user: {
//       username: "test_user",
//     },
//   };
//   console.log(post);
//   res.render("single-post", { post });
// });

// router.get("/blogs/:id", (req, res) => {
//   console.log(res.render("single-post"));
//   res.render("single-post");
// });

module.exports = router;
