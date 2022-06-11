const router = require("express").Router();
const { User, Blog } = require("../../models");

router.get("/", (req, res) => {
  Blog.findAll({
    attributes: ["id", "body", "title", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBlogData) => res.json(dbBlogData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "body", "title", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBlogData) => res.json(dbBlogData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Blog.create({
    ...req.body,
    user_id: req.session.user_id,
  })
    .then((dbBlogData) => res.json(dbBlogData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Blog.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbBlogData) => res.json(dbBlogData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbBlogData) => res.json(dbBlogData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
