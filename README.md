
# ng-textarea-autosize

*** ng-textarea-autosize *** is an directive hat automatically adjusts textarea height to fit content.

It adjusts the textarea height automatically to any text input, or changes to the model bound to the textarea.

## Installation:

```bash
npm install ng-textarea-autosize
```

## Use Example:

Add the declaration to your @NgModule:

```typescript
import {TextAreaAutoSize} from 'ng-textarea-autosize';

...

@NgModule({
  declarations: [
    TextAreaAutoSize
  ]
})
```

Use directly inside your HTML templates by adding the word 'autosize' to any textarea.

```
<textarea autosize>Hello, this is an example of Autosize in Angular8.</textarea>
```

## Extra Configuration Options:

Set a minimum height on your textarea.

```
<textarea autosize [minHeight]="60">Hello, this is an example of Autosize in Angular2 with a Min Height.</textarea>
```

Set a maximum height on your textarea.

```
<textarea autosize [maxHeight]="120">Hello, this is an example of Autosize in Angular2 with a Max Height.</textarea>
```


## Author

[Leonardo Pineda]()

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

## thanks

To Steve Papa for [ng-autosize](https://www.npmjs.com/package/ng-autosize) the implementation that was taken as the basis for this directive