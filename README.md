# vue-gradient-component

## Library setup
```
npm i vue-gradient-component
```

## Import in main
```
import ColorPicker from 'vue-gradient-component';

const app = createApp(App);
app.use(ColorPicker);
```


## Using in components
```
<template>
  <div>
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    />
    <color-picker></color-picker>
  </div>
</template>
```

## Properties

<tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
</tr>

<table>
    <thead>
        <th>Name</th>
        <th>Value type</th>
        <th>Descriprion</th>
        <th>Default</th>
    </thead>
    <tbody>
        <tr>
            <td>width</td>
            <td>[String, Number]</td>
            <td>Width of component</td>
            <td>300</td>
        </tr>
        <tr>
            <td>pickerBodyHeight</td>
            <td>[String, Number]</td>
            <td>Height of picker part component</td>
            <td>300</td>
        </tr>
        <tr>
            <td>pickerBodyPointSize</td>
            <td>[String, Number]</td>
            <td>Diameter of picker point</td>
            <td>10</td>
        </tr>
        <tr>
            <td>pickerBodyPointColor</td>
            <td>String</td>
            <td>Color of picker point</td>
            <td>'orange'</td>
        </tr>
        <tr>
            <td>optionBlockHeight</td>
            <td>[String, Number]</td>
            <td>Height of property lines (alpha, select color)</td>
            <td>15</td>
        </tr>
        <tr>
            <td>pickerOptionPointSize</td>
            <td>[String, Number]</td>
            <td>Diameter of point on property lines </td>
            <td>12</td>
        </tr>
        <tr>
            <td>pickerOptionPointColor</td>
            <td>String</td>
            <td>Color of point on property lines </td>
            <td>'white'</td>
        </tr>
        <tr>
            <td>pickerGradientPointSize</td>
            <td>[String, Number]</td>
            <td>Diameter  of point on gradient line </td>
            <td>12</td>
        </tr>
        <tr>
            <td>previewWidth</td>
            <td>[String, Number]</td>
            <td>Width of preview block</td>
            <td>50</td>
        </tr>
        <tr>
            <td>previewHeight</td>
            <td>[String, Number]</td>
            <td>Height of preview block</td>
            <td>50</td>
        </tr>
        <tr>
            <td>anglePointColor</td>
            <td>String</td>
            <td>Color of angle select point</td>
            <td>'orange'</td>
        </tr>
        <tr>
            <td>angleCircleColor</td>
            <td>String</td>
            <td>Color of angle select circle</td>
            <td>'orange'</td>
        </tr>
        <tr>
            <td>outputTextType</td>
            <td> ['hex-alpha', 'rgba']</td>
            <td>Type of output color</td>
            <td>'hex-alpha'</td>
        </tr>
        <tr>
            <td>outputValueType</td>
            <td> ['string/rgba', 'object', 'string/svg']</td>
            <td>Type of returning value:
                <br>
                <ul>
                    <li>'string/rgba': 'rgba(0,0,0,0)'</li>
                    <li>'object': '{ angle: 0, points: [{}{}{}]}' (only gradient)</li>
                    <li>'string/svg': Gradient layout for svg https://developer.mozilla.org/ru/docs/Web/SVG/Tutorial/Gradients</li>
                </ul>
            </td>
            <td>'string/rgba'</td>
        </tr>
        <tr>
            <td>mode</td>
            <td> ['normal', 'gradient']</td>
            <td>Single color mode(normal) or gradient</td>
            <td>'normal'</td>
        </tr>
        <tr>
            <td>gradientType</td>
            <td> ['linear','radial']</td>
            <td>Type of gradient value</td>
            <td>'linear'</td>
        </tr>
    </tbody>
</tavle>