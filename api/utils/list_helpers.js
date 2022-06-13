const dummy = (blogs = []) => blogs.length === 0 ? 1 : 0;

const totalLikes = (blogs = []) => {
  const resp = blogs.reduce(
    (sum, value) => sum + value.likes,
    0
  );
  return resp;
};

const favoriteBlog = (blogs = []) => {
  const mayor = Math.max(...blogs.map(blog => blog.likes));
  const { author, likes, title } = blogs.find(blog => blog.likes === mayor);
  return {
    author, likes, title
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
