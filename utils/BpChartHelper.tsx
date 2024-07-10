export const processData = (data: {bp_systolic: number, bp_distolic: number}[]) => {
    let systolicBarData = data.map(() => ({
       value: 0,
       spacing: 2,
       frontColor: '#d1d5db',
       gradientColor: '#d1d5db',
       labelTextStyle: { fontSize: 10}
    }) as any);

    let distolicBarData = data.map(() => ({
        value: 0,
        frontColor: '#000',
        gradientColor: '#000',
        labelTextStyle: { fontSize: 10, TextAlign: 'center'}
     }) as any);
 
    data.forEach((item, index) => {
        systolicBarData[index].value = item.bp_systolic;
 
        systolicBarData[index].fontColor = '#31AD12';
        systolicBarData[index].gradientColor = '#31AD12';
    });

     data.forEach((item, index) => {
        distolicBarData[index].label = item.bp_systolic + ' / ' + item.bp_distolic;
        distolicBarData[index].value = item.bp_distolic;
  
        distolicBarData[index].fontColor = '#31AD12';
        distolicBarData[index].gradientColor = '#31AD12';
     });

    // Rearrange the objects in the concatenated array based on the index
    const barData = systolicBarData.map((_, index) => {
        return [systolicBarData[index], distolicBarData[index]];
      }).flatMap(arr => arr);
     
    return barData;
 }