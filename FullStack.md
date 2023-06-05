### List five or more ways you could optimize a website to be as efficient and scalable as possible.

- Optimize all assets
- Place all assets on a separate, cookie-free domain. Using a CDN is best
- Avoid inline JavaScript and CSS
- Enable gzipping
- Ensure all code is minified
- Defer parsing of JavaScript
- Use srcset for responsive images
- Leverage browser caching
- Reduce DNS lookups
- Avoid duplicate code
- Avoid URL redirects
- Enable HTTP keep-alive
- Serve scaled images
- Use image sprites where appropriate
- Prefer asynchronous resources
- Specify the character set at server level
- Avoid CSS @import
- Specify a cache validator
- Minimize request size
- Avoid bad requests and 404s
- Specify image dimensions
- Reduce cookie size
- Make fewer HTTP requests, i.e., load as few external resources as possible
- Avoid unnecessary images; where possible, use CSS
- Ensure no validation errors with W3C


### List the ways to improve your website load time and performance

- Minimize HTTP requests.
- Utilize CDNs and remove unused files/scripts.
- Optimize files and compress images.
- Browser caching. 
- Apply CSS3 and HTML5.
- Minify JavaScript & Style Sheets. 
- Optimize caches.

### Database
```sql
CREATE TABLE `posts` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`text` TEXT,
	`user_id` INT unsigned NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `post_likes` (
	`post_id` INT unsigned NOT NULL,
	`user_id` INT unsigned NOT NULL,
	`created_at` TIMESTAMP NOT NULL
);
```
#### Write a query to retrieve all data from the posts table for a given user_id. In addition to this, the returned recordset should also include a count of post_likes for each post.

```sql
SELECT
   posts.*,
   COUNT(post_likes.user_id) AS likes 
FROM
   posts 
   LEFT JOIN
      post_likes 
      ON posts.id = post_likes.post_id
WHERE posts.user_id = 'XXX'
GROUP BY posts.id
```

### Search Engine Optimization

- Should have proper `<title>` and `<meta>` tags for description, keywords
- Generate a `sitemap.xml` to tell crawlers the available pages of the website
- Use semantic markup for elements on the page, which also helps accessibility
- Ensure fast loading times to help the website rank better in Google search
- Use SSR for better SEO

### i18n

- Have pages translated in the supported languages.
- Set the lang attribute on the html tag (e.g. `<html lang="zh-cn"`>) to tell browsers and search engines the language of the page which helps browsers offer a translation of the page.

### Accessibility

- Use semantic elements where possible: headings, buttons, links, inputs instead of styled `<div>`.
- `<img>` tags should have the `alt` attribute specified or left empty if the merchant did not provide a description for them.

Building an accessible form:
1. `<input>` should have associated `<label>`
2. `<input>` are linked to their error messages via `aria-describedby` and error messages are announced with `aria-live="assertive"`
3. Use `<input>` of the correct types and appropriate validation-related attributes like `pattern`, `minlength`, `maxlength`
4. Visual order matches DOM order
5. Make the currently focused form control obvious.

### Performance
- Defer loading of images that aren't on-screen
- [Preloading of Images](https://www.greatfrontend.com/questions/system-design/image-carousel#preloading-of-images)
- Device-specific Images - `srcset` attribute on `<img>` tags
- Virtualized Lists


### Client Side Data Store
IndexedDB

https://www.toptal.com/full-stack/interview-questions