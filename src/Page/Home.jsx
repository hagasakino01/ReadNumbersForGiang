import React, { useEffect, useState } from 'react'



function Home() {

  const [input, setInput] = useState({});
  const [output, setOutput] = useState('');
  const handleChange = e => setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));


  const defaultNumbers =' hai ba bốn năm sáu bảy tám chín';

  const chuHangDonVi = ('1 một' + defaultNumbers).split(' ');
  const chuHangChuc = ('linh mười' + defaultNumbers).split(' ');
  const chuHangTram = ('không một' + defaultNumbers).split(' ');

  const convert_block_three=(number)=> {
    if(number == '000') return '';
    var _a = number + ''; //Convert biến 'number' thành kiểu string

    //Kiểm tra độ dài của khối
    switch (_a.length) {
      case 0: return '';
      case 1: return chuHangDonVi[_a];
      case 2: return convert_block_two(_a);
      case 3: 
        var chuc_dv = '';
        if (_a.slice(1,3) != '00') {
          chuc_dv = convert_block_two(_a.slice(1,3));
        }
        var tram = chuHangTram[_a[0]] + ' trăm';
        return tram + ' ' + chuc_dv;
    }
  }

  function convert_block_two(number) {
    var dv = chuHangDonVi[number[1]];
    var chuc = chuHangChuc[number[0]];
    var append = '';

    // Nếu chữ số hàng đơn vị là 5
    if (number[0] > 0 && number[1] == 5) {
      dv = 'lăm'
    }
    // Nếu chữ số hàng đơn vị là 4
    if (number[0] > 1 && number[1] == 4) {
      dv = 'tư'
    }
    // Nếu số hàng chục lớn hơn 1
    if (number[0] > 1) {
      append = ' mươi';
      
      if (number[1] == 1) {
        dv = ' mốt';
      }
    }

    return chuc + '' + append + ' ' + dv; 
  }
  const dvBlock = '1 nghìn triệu tỷ'.split(' ');

  function to_vietnamese(number) {
    var str = parseInt(number) + '';
    var i = 0;
    var arr = [];
    var index = str.length;
    var result = [];
    var rsString = '';

    if (index == 0 || str == 'NaN') {
      return '';
    }

    // Chia chuỗi số thành một mảng từng khối có 3 chữ số
    while (index >= 0) {
      arr.push(str.substring(index, Math.max(index - 3, 0)));
      index -= 3;
    }

    // Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam
    for (i = arr.length - 1; i >= 0; i--) {
      if (arr[i] != '' && arr[i] != '000') {
        result.push(convert_block_three(arr[i]));

        // Thêm đuôi của mỗi khối
        if (dvBlock[i]) {
          result.push(dvBlock[i]);
        }
      }
    }

    // Join mảng kết quả lại thành chuỗi string
    rsString = result.join(' ');

    // Trả về kết quả kèm xóa những ký tự thừa
    return (rsString.replace(/[0-9]/g, '').replace(/ /g,' ').replace(/ $/,'')+' đồng');
  }
  useEffect(() => {
   
    // if(text.length >= 13){
    //   setOutput(kq) 
    //   console.log('them chu nghin')
    // }else{
    //   setOutput(kq)
    // }
    AddValue()
    
  }, [input])
  

  const AddValue=()=>{
    const kq=to_vietnamese(input.number)
    const text=input?.number || ''
    if(text.length >= 15){
        setOutput('Số to quá b khum đọc đc huhu !!😭😭') 
        // console.log('them chu nghin')
        // if(text.slice(0, 1) ==='9'){
        //   setOutput(kq.slice(0, 4 )  + ' nghìn' + kq.slice(4))
        // }
   
    }else if(text.length === 14){
     
      if(text.slice(0, 1) =='1'||text.slice(1, 2) =='0'){
        if(text.slice(0, 2) !=='19'&& text.slice(0, 2) !=='13'&& text.slice(0, 2) !=='90'&& text.slice(0, 2) !=='30'&& text.slice(0, 2) !=='10'){
          if(text.slice(2, 5) !=='000'){
            setOutput(kq.slice(0, 8 )  + ' nghìn' + kq.slice(8))
          }else{
            setOutput(kq.slice(0, 8 )  + ' nghìn tỷ' + kq.slice(8))
          }
        }
        else if(text.slice(0, 2) ==='13'|| text.slice(0, 2) ==='30'){
          if(text.slice(2, 5) !=='000'){
            setOutput(kq.slice(0, 7 )  + ' nghìn' + kq.slice(7))
          }else{
            setOutput(kq.slice(0, 7 )  + ' nghìn tỷ' + kq.slice(7))
          }
        }else if(text.slice(0, 2) ==='10'){
          if(text.slice(2, 5) !=='000'){
            setOutput(kq.slice(0, 4 )  + ' nghìn' + kq.slice(4))
          }else{
            setOutput(kq.slice(0, 4 )  + ' nghìn tỷ' + kq.slice(4))
          }
        }else{
          if(text.slice(2, 5) !=='000'){
            setOutput(kq.slice(0, 9 )  + ' nghìn' + kq.slice(9))
          }else{
            setOutput(kq.slice(0, 9 )  + ' nghìn tỷ' + kq.slice(9))
          }
        }
      }
      else if(text.slice(0, 2) !=='99'&& text.slice(0, 2) !=='33'){
        if((text.slice(0, 1) =='3'&& text.slice(1, 2) !=='9')|| (text.slice(1, 2) =='3'&& text.slice(0, 1) !=='9')){
          if(text.slice(2, 5) !=='000'){
            setOutput(kq.slice(0, 11 )  + ' nghìn' + kq.slice(11))
          }else{
            setOutput(kq.slice(0, 11 )  + ' nghìn tỷ' + kq.slice(11))
          }
        }else if((text.slice(0, 1) =='9'&& text.slice(1, 2) !=='3')||( text.slice(1, 2) =='9'&& text.slice(0, 1) !=='3')){
          if(text.slice(2, 5) !=='000'){
            setOutput(kq.slice(0, 13 )  + ' nghìn' + kq.slice(13))
          }else{
            setOutput(kq.slice(0, 13 )  + ' nghìn tỷ' + kq.slice(13))
          }
        }else{
          if(text.slice(2, 5) !=='000'){
            setOutput(kq.slice(0, 12 )  + ' nghìn' + kq.slice(12))
          }else{
            setOutput(kq.slice(0, 12 )  + ' nghìn tỷ' + kq.slice(12))
          }
        }
      }
      else if(text.slice(0, 2) ==='33'){
        if(text.slice(2, 5) !=='000'){
          setOutput(kq.slice(0, 10 )  + ' nghìn' + kq.slice(10))
        }else{
          setOutput(kq.slice(0, 10 )  + ' nghìn tỷ' + kq.slice(10))
        }
      }else{
        setOutput(kq.slice(0, 14 )  + ' nghìn' + kq.slice(14))
        if(text.slice(2, 5) !=='000'){
          setOutput(kq.slice(0, 14 )  + ' nghìn' + kq.slice(14))
        }else{
          setOutput(kq.slice(0, 14 )  + ' nghìn tỷ' + kq.slice(14))
        }
      }
    }else if(text.length === 13){

      if(text.slice(0, 1) !=='9'&& text.slice(0, 1) !=='3'){
        if(text.slice(1, 4) !=='000'){
          setOutput(kq.slice(0, 3 )  + ' nghìn' + kq.slice(3))
        }else{
          setOutput(kq.slice(0, 3 )  + ' nghìn tỷ' + kq.slice(3))
        }
      }
      else if(text.slice(0, 1) ==='3'){
        if(text.slice(1, 4) !=='000'){
          setOutput(kq.slice(0, 2 )  + ' nghìn' + kq.slice(2))
        }else{
          setOutput(kq.slice(0, 2 )  + ' nghìn tỷ' + kq.slice(2))
        }
      }else{
        setOutput(kq.slice(0, 4 )  + ' nghìn' + kq.slice(4))
        if(text.slice(1, 4) !=='000'){
          setOutput(kq.slice(0, 4 )  + ' nghìn' + kq.slice(4))
        }else{
          setOutput(kq.slice(0, 4 )  + ' nghìn tỷ' + kq.slice(4))
        }
      }
    }else{
        setOutput(kq)
    }
  }
 
  return (
    <div className=''>
      <div className='flex flex-col items-center justify-center mt-[80px]'>
        <div className='max-w-[600px]'>
          <p className='text-[40px] text-amber-400 '>Đổi số thành chữ cho b Giang </p>
          <p className='text-[40px] text-rose-500 '>♡♡♡</p>
        </div>
      </div>
      <input className='w-[580px] h-[50px] px-[24px] rounded-[8px] border-[1px] ' placeholder='nhập số vào đây <3 <3' type="number" 
        name="number" value={input.number || ''} onChange={handleChange} 
      />
      <div className='mt-[20px]'>
        <p className='text-[20px]'>{output}</p>
      </div>
      {/* <Test /> */}
    </div>
  );
 };
export default Home