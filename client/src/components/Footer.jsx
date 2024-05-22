import { BsLinkedin, BsInstagram, BsTwitter } from 'react-icons/bs';

function Footer() {
  return (
    <div className="">
      <div className="main w-full bg-[#110725] h-76 p-10 flex">
      <div className="w-2/4 align-center p-10">
        <img src="public/logo.svg" alt=""/>
        <div className="flex justify-self-start mt-5 gap-5">
            <a href="https://www.linkedin.com/company/synkerr/" target="_blank" rel="noopener noreferrer" className="mr-4 flex flex-col">
              <BsLinkedin size={48} />
            </a>
            <a href="https://www.instagram.com/synkerrofficial?igsh=MXExNzNhaDIxbGF5dA==" rel="noopener noreferrer" target="_blank" className="mr-4 flex flex-col">
              <BsInstagram size={48} />
            </a>
            <a href="https://twitter.com/Kakashi8654" target="_blank" rel="noopener noreferrer" className='flex flex-col mr-4'>
              <BsTwitter size={48} />
            </a>
          </div>
      </div>
      <div className="w-1/4 p-5 text-2xl ">
        <div className="capitalize ">Our Aim</div>
        <div className="capitalize mt-5">Our Team</div>
        <div className="capitalize mt-5">What we do?</div>
      </div>
      <div className="w-1/4 p-5 text-2xl ">
        <div className="capitalize">Join the wishlist</div>
      </div>
    </div>
    <div className="flex justify-center text-center capitalize h-10 w-full p-3 text-lg">©All rights reserved synker pvt lid.</div>
    </div>
    
  )
}

export default Footer