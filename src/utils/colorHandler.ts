/**Add a color property to every data object in a the array */
export const addColor = (dataArray) => {
 const steps = dataArray.length;
 const colors = rainbow(steps);
 const newArray = dataArray.map((obj, index) => {
   return { ...obj, color: colors[index] };
 });
 return newArray;
};

//The functions below were modified based on Adam Cole's orignal code: https://codepen.io/mradamcole/pen/yWXyPz
// It basically generates an array with hex color codes equally divided on the rainbow colors spectrum,
//considering a given number of steps

function rainbow(steps) {
 var s = [];
 for (var i = 0; i < steps; i++) {
   var c = i / steps;
   s.push(rainbowStop(c));
 }
 return s;
}

function rainbowStop(h) {
 let f = (n, k = (n + h * 12) % 12) =>
   0.5 - 0.5 * Math.max(Math.min(k - 3, 9 - k, 1), -1);
 let rgb2hex = (r, g, b) =>
   '#' +
   [r, g, b]
     .map((x) =>
       Math.round(x * 255)
         .toString(16)
         .padStart(2, 0)
     )
     .join('');
 return rgb2hex(f(0), f(8), f(4));
}
