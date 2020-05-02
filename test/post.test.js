'use strict';
const chai = require('chai');

const should = chai.should();
const pathFn = require('path');
const fs = require('hexo-fs');
const Promise = require('bluebird');


describe('Hexo-Directory-Category', () => {
  const Hexo = require('hexo');
  let baseDir = pathFn.join(__dirname, 'post_test');
  let hexo = new Hexo(baseDir);
  let post = require('../lib/processor/post')(hexo);
  let process = Promise.method(post.process.bind(hexo));
  let source = hexo.source;
  let File = source.File;
  let Post = hexo.model('Post');
  
  hexo.config.auto_dir_categorize = {
    enable: true,
    force: false
  };
  
  beforeAll(() => {
    return fs.mkdirs(baseDir).then(function() {
      return hexo.init();
    });
  });

  afterAll(() => {
    return fs.rmdir(baseDir);
  });
  
  const fileDefaults = () => ({
    path: 'Linux/Vim/note/Vim-note.html',
    published: true,
    type: 'create',
    renderable: true
  });
  
  function newFile(options) {
    let path = options.path;

    options.path = (options.published ? '_posts' : '_drafts') + '/' + path;
    options.source = pathFn.join(source.base, options.path);

    options.params = {
      published: options.published,
      path: path,
      renderable: options.renderable
    };

    return new File(options);
  }
  
  function postWritePromise(file, body, categoriesShould) {
    return fs.writeFile(file.source, body).then(
      () => process(file)
    ).then(() => {
      let post = Post.findOne({source: file.path});

      should.not.exist(post.category);
      post.categories.map(
        (item) => item.name
      ).should.eql(categoriesShould);
      
      return post.remove();
    }).finally(() => fs.unlink(file.source));
  }

  it('post - categories exist, plugin disable, should not change', () => {
    let defaultEnable = hexo.config.auto_dir_categorize.enable;
    hexo.config.auto_dir_categorize.enable = false;
    
    let body = [
      'title: "Vim note"',
      'categories: [CS, Usage]',
      '---'
    ].join('\n');

    let file = newFile(fileDefaults());
    
    return new postWritePromise(file, body, ['CS', 'Usage'])
      .finally(() => {
        hexo.config.auto_dir_categorize.enable = defaultEnable;
      });
  });

  it(
    'post - categories not exist, plugin disable, should not change',
    () => {
      let defaultEnable = hexo.config.auto_dir_categorize.enable;
      hexo.config.auto_dir_categorize.enable = false;
      
      let body = [
        'title: "Vim note"',
        '---'
      ].join('\n');

      let file = newFile(fileDefaults());
      
      return new postWritePromise(file, body, [])
        .finally(() => {
          hexo.config.auto_dir_categorize.enable = defaultEnable;
        });
    }
  );
  
  it(
    'post - categories exist, but empty, plugin disable, should be empty',
    () => {
      let defaultEnable = hexo.config.auto_dir_categorize.enable;
      hexo.config.auto_dir_categorize.enable = false;
      
      let body = [
        'title: "Vim note"',
        'categories: []',
        '---'
      ].join('\n');

      let file = newFile(fileDefaults());
      
      return new postWritePromise(file, body, [])
        .finally(() => {
          hexo.config.auto_dir_categorize.enable = defaultEnable;
        });
    }
  );
  
  it(
    'post - categories exist, but empty, should added categories with directories',
    () => {
      
      let body = [
        'title: "Vim note"',
        'categories: []',
        '---'
      ].join('\n');

      let file = newFile(fileDefaults());
      
      return new postWritePromise(file, body, ['Linux', 'Vim', 'note']);
    }
  );

  it('post - categories exist, should not change', () => {
    let body = [
      'title: "Vim note"',
      'categories: [CS, Usage]',
      '---'
    ].join('\n');

    let file = newFile(fileDefaults());
    
    return new postWritePromise(file, body, ['CS', 'Usage']);
  });

  it(
    'post - category not exist, should added categories with directories',
    () => {
      let body = [
        'title: "Vim note"',
        '---'
      ].join('\n');

      let file = newFile(fileDefaults());

      return postWritePromise(file, body, ['Linux', 'Vim', 'note']);
    }
  );

  it(
    'post - categories exist, but enable force, should overwrite with directories',
    () => {
      let defaultForce = hexo.config.auto_dir_categorize.force;
      hexo.config.auto_dir_categorize.force = true;
      
      let body = [
        'title: "Vim note"',
        'categories: [CS, Usage]',
        '---'
      ].join('\n');

      let file = newFile(fileDefaults());
      return postWritePromise(file, body, ['Linux', 'Vim', 'note'])
        .finally(() => {
          hexo.config.auto_dir_categorize.force = defaultForce;
        });
    }
  );
  
});
