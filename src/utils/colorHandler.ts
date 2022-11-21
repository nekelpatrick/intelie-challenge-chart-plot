export const addColor = (dataArray:any) => {
 const steps = dataArray.length;
 const colors = rainbow(steps);
 const newArray = dataArray.map((obj:any, index:any) => {
   return { ...obj, color: colors[index] };
 });
 return newArray;
};


function rainbow(steps:any) {
 var s = [];
 for (var i = 0; i < steps; i++) {
   var c = i / steps;
   s.push(rainbowStop(c));
 }
 return s;
}

function rainbowStop(h: number) {
 let f = (n: number, k = (n + h * 12) % 12) =>
   0.5 - 0.5 * Math.max(Math.min(k - 3, 9 - k, 1), -1);
 let rgb2hex = (r:any, g:any, b:any) =>
   '#' +
   [r, g, b]
     .map((x) =>
       Math.round(x * 255)
         .toString(16)
         .padStart(2, "0")
     )
     .join('');
 return rgb2hex(f(0), f(8), f(4));
}
