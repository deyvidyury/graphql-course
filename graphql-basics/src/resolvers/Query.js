const Query = {
    me() {
      return {
        id: "12345",
        name: "Deyvid",
        email: "deyvidyury@gmail.com"
      };
    },
    post() {
      return {
        id: "1234556",
        title: "Post one",
        body: "This is the post one",
        published: true
      };
    },
    users(parent, args, {db}, info) {
      if (!args.query) {
        return db.users;
      }

      return db.users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, {db}, info) {
      if (!args.query) {
        return db.posts;
      }

      return db.posts.filter(post => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },
    comments(parent, args, {db}, info) {
      return cd.comments;
    }
  }

export {Query as default}