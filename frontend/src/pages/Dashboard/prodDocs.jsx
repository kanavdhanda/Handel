import DashTopNav from '../../components/Navbar/DashTopNav'
import DashSideNav from '../../components/Navbar/DashSideNav'

export default function ProdDocs(){
    return(
        <>
        <DashTopNav className='absolute top-0' />
        <DashSideNav className='absolute top-0' />
        <div className='ml-[22vw] mt-[14vh] absolute top-0'>
            <h1 className='text-4xl text-amber-900 mb-10 font-serif'>Export Compliance Dashboard</h1>
            <h2 className='text-[14px] text-amber-950 font-sans'>We currently provide assistance on Export registration, Product documentation, Shipping documentation, Payment reconciliation and Tax documentation requirements for exporting from India to the United States of America (USA).To start exporting from India, a few basic regulations need to be met. Similarly, USA has a set of import regulations with certifications and labelling requirements for certain products, which are required to be met by you. We provide you with a one-stop solution to get the information in relation to the export requirements and meet them through expert third party service providers. Click below to get more information and assistance with these requirements.</h2>
        </div>
        </>
    )
}
