import React from 'react'

const WinnerGif = (props) => {
  return (
    <div><div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl text-center">
      <h2 className="text-2xl font-bold mb-4"> wins!</h2>
      <img 
        src="image.png" 
        alt="Winner celebration" 
        className="mx-auto mb-4"
      />
      <p className="text-2xl text-red-700 bold">Hooray!,Our winner is {props.e}</p>
      <div>RESULTS</div>
        {
          (props.arr).map((e)=>{
            return <div className='text-rose-600'>{e}</div>
          })
        }
    </div>
  </div></div>
  )
}

export default WinnerGif