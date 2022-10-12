import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    this.get('/categories', () => {
      // flatmap to put all the categories into a flat array
      var allCategories = data.posts.map(post => post.categories).flatMap(post => post);
      // extract only the names, as the ids are unique even with the same category
      allCategories = allCategories.map(category => category.name);
      // filter the duplicate category names
      allCategories = allCategories.filter(function (value, index) { return allCategories.indexOf(value) === index });
      return allCategories;
    });

    // retrieving specific post
    this.get('/post/:id', (schema, request) => {
      const id = request.params.id;
      var post = data.posts.filter(post => post.id.match(id))[0];
      console.log(post);
      return post;
    });
  },
});
