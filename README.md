# hexo-directory-category
Automatically add front-matter `categories` to Hexo article according to the article file directory.

Directory is means relative form article file path to Hexo source `_posts` folder.


## Features
* See the hexo-theme-Wikitten [issues#4](https://github.com/zthxxx/hexo-theme-Wikitten/issues/4)
* Automatically add category to article according to the file directory, if article front-matter haven't option categories. 
* Easy to categorize articles, or change the categories.





## Install

``` bash
$ cd <your-hexo-site>
$ npm install --save hexo-directory-category
```



## Options

You can configure this plugin in site `_config.yml`.
```
auto_dir_categorize:
	enable: true  # options:true, false; default is true
	force: false # options:true, false; default is false
```

- **enable** - Enable the plugin. Defaults to **true**.
- **force** - Overwrite article front-matter categories, even if it has option categories.Defaults to **false**.





## Example

### enable: true, force: false

```yaml
# file: ./_posts/Linux/Vim/note/test.md
...
categories: [CS, Usage]
tags: [...]

# It will nothing Conversion. categories: [CS, Usage]
```



```yaml
# file: ./_posts/Linux/Vim/note/test.md
...
# categories: [...]
tags: [...]

# It will convert to categories: [Linux, Vim, note]
```



### enable: true, force: true

```yaml
# file: ./_posts/Linux/Vim/note/test.md
...
categories: [CS, Usage]
tags: [...]

# It also will convert to categories: [Linux, Vim, note]
```


## License

[MIT LICENSE](./LICENSE)