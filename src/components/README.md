# Components Module

Used to hold reusable angular components

- [Presentational components](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/)
- [Smart components](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/)

# Module Usage

- Include this module in the imports fo the consuming module

```ts
import { ComponentsModule } from `@dcg-components`;

@NgModule({
  imports: [ComponentsModule],
})

```

- Use the components in the html

```html
<dcg-custom-component></dcg-custom-component>
```
