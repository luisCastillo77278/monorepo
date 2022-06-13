const BlogModel = require('../models/Blog');

const UserModel = require('../models/User');


const blogControllers = {
  getBlogs: async (_req, res) => {
    const blogs = await BlogModel.find({ state: true })
      .populate('user', {
        blogs: 0,
        notes: 0
      });
    return res.status(200).json(blogs);
  },
  getBlog: async (req, res) => {
    const { id } = req.params;
    const blog = await BlogModel.findById(id)
      .populate('user', {
        notes: 0,
        blogs: 0
      });
    return res.status(200).json(blog);
  },
  create: async (req, res) => {
    const { id } = req;
    const { author, likes, title, url } = req.body;

    const user = await UserModel.findById(id);

    const blog = new BlogModel({
      author,
      likes,
      title,
      url,
      user: user._id
    });
    const blogNew = await blog.save();
    user.blogs = user.blogs.concat(blogNew._id);
    await user.save();
    return res.status(200).json(blogNew);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { likes } = req.body;
    const blog = await BlogModel.findByIdAndUpdate(id, { likes }, { new: true });
    return res.status(200).json(blog);

  },
  delete: async (req, res) => {
    const { id: userId } = req;
    const { id } = req.params;

    const searchBlog = await BlogModel.findById(id);
    if (searchBlog.user.toString() !== userId.toString()) {
      return res.status(401).json({
        error: 'Usted no es el usuario creador por lo tanto no se puede eliminar este registro'
      });
    }

    const blog = await BlogModel.findByIdAndUpdate(id, { state: false }, { new: true });
    return res.status(200).json(blog);
  }

};

module.exports = blogControllers;