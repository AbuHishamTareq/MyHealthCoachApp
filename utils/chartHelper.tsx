export const processData = (data: {rbs: number}[]) => {
   let barData = data.map(() => ({
      value: 0,
      frontColor: '#d1d5db',
      gradientColor: '#d1d5db'
   }) as any);

   data.forEach((item, index) => {
      barData[index].label = item.rbs;
      barData[index].value = item.rbs;

      if(item.rbs <= 125) {
         barData[index].fontColor = '#31AD12';
         barData[index].gradientColor = '#31AD12';
      } else {
         barData[index].fontColor = '#ff0000';
         barData[index].gradientColor = '#ff0000';
      }
   });

   return barData;
}
