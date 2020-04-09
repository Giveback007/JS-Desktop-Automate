## Next Tab
```js
runKeySequence([['control', 'alt', 'pagedown']]);
```
---

## Creating Water-Marked Listing Image

##### Step 1
- Copy All gimp.@ files to a separate folder

##### Step 2
* vertical:
```js
runKeySequence([
    'delete',
    ...zoom(30),
    ...mergeLayer(),
    ...resizeLayer(2000),
    8500,
    ...canvasSize(2000, 2588),
    1000,
    ...flattenImage(),
]);
```

* horizontal:
```js
```

##### Step 3
* drop @@@.vert.listing.png || @@@.horz.listing.png
* copy the new layer (ctrl + c)
* don't delete the new layer
* click the next tab
* tabs - 1

##### Step 4
* vertical & horizontal:
```js
runKeySequence([
    PASTE,
    ...flattenImage(),
]);
```
* do the first image manually

##### Step 5
```js
exportImages('listing');
```
---