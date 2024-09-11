import React from 'react'
import DashTopNav from '../../components/Navbar/DashTopNav'
import DashSideNav from '../../components/Navbar/DashSideNav'

const ExportRegistration = () => {
  return (
    <div className=''>
        
        <div className="relative">
        <DashTopNav className='absolute top-0' />
        <DashSideNav className='absolute top-0' />
        <div className="ml-[23vw] mt-[12vh] absolute top-0"><div>
            <h1 className='text-4xl font-serif text-amber-950'>Exports Registration</h1>
            <p className='mt-10 text-sm'>Go to each section to learn more about the compliance requirements, view registration steps or request for assistance.</p>
            <div className="grid grid-cols-2 gap-x-10 gap-y-10 mx-32 mt-10">
                <a href='https://www.dgft.gov.in/CP/' className="card flex bg-gray-100 border-2 border-gray-200 p-10 justify-center items-center gap-10">
                    <h1 className='text-7xl text-gray-300 font-bold font-mono'>1</h1>
                    <div className="">
                        <h1 className='text-xl font-semibold text-amber-900 mb-3'>IEC CODE</h1>
                        <p className='text-xs text-gray-600'>The Importer-Exporter Code (IEC) is a key business identification number and is mandatory for exporting or importing in India.</p>
                    </div>
                </a>
                <a href='#' className="card flex bg-gray-100 border-2 border-gray-200 p-10 justify-center items-center gap-10">
                    <h1 className='text-7xl text-gray-300 font-bold'>2</h1>
                    <div className="">
                        <h1 className='text-xl font-semibold text-amber-900 mb-3'>AD CODE</h1>
                        <p className='text-xs text-gray-600'>Authorized dealer (AD) code is a 14 digit unique code allotted to banks dealing in foreign currency by RBI.</p>
                    </div>
                </a>
                <a href='#' className="card flex bg-gray-100 border-2 border-gray-200 p-10 justify-center items-center gap-10">
                    <h1 className='text-7xl text-gray-300 font-bold'>3</h1>
                    <div className="">
                        <h1 className='text-xl font-semibold text-amber-900 mb-3'>GST LUT</h1>
                        <p className='text-xs text-gray-600'>Letter of Undertaking (LUT) is a document that exporters can file to export goods or services without having to pay IGST.</p>
                    </div>
                </a>
                <a href='#' className="card flex bg-gray-100 border-2 border-gray-200 p-10 justify-center items-center gap-10">
                    <h1 className='text-7xl text-gray-300 font-bold'>4</h1>
                    <div className="">
                        <h1 className='text-xl font-semibold text-amber-900 mb-3'>IOR</h1>
                        <p className='text-xs text-gray-600'>An Importer on Record (IOR) is needed for importing products (under certain conditions) into USA.</p>
                    </div>
                </a>
            </div>
          </div>
          </div>
        </div>
        
    </div>
  )
}

export default ExportRegistration