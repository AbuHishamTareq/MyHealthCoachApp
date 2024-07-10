export const processData = (data: {weight: number}[]) => {
    let barData = data.map(() => ({
       value: 0,
       frontColor: '#d1d5db',
       gradientColor: '#d1d5db'
    }) as any);
 
    data.forEach((item, index) => {
        barData[index].label = item.weight;
        barData[index].value = item.weight;
 
        barData[index].fontColor = '#31AD12';
        barData[index].gradientColor = '#31AD12';
      
    });
 
    return barData;
 }