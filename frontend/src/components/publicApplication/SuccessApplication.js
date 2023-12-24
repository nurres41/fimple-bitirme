import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SuccessApplication = () => {

  const [id, setId] = useState(null);

  useEffect(() => {
    const lastApplication = async () => {
      try{
        const res = await axios.post('http://localhost:3001/basvuru-basarili')
        console.log(res.data)
        setId(res.data.enSonBasvuruId)
      }catch(err){
        console.log('Basarili Basvuru API hatasi: ', err)
      }
    };
    lastApplication();
  },[]);



  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <h2 className='font-bold text-red-500'>
        {id && `Başvurunuz Alınmıştır. Başvuru ID: ${id}. Dilediğiniz zaman başvurunuzu sistemimizden sorgulayabilirsiniz.`}
      </h2>
    </div>
  )
}

export default SuccessApplication
