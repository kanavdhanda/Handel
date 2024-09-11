import React from 'react'
import DashTopNav from '../../components/Navbar/DashTopNav'
import DashSideNav from '../../components/Navbar/DashSideNav'

const PaymentRec = () => {
  return (
    <div className=''>
        
        <div className="relative">
        <DashTopNav className='absolute top-0' />
        <DashSideNav className='absolute top-0' />
        <div className="ml-[23vw] mt-[20vh] absolute top-0"><div>
            <img src="./payment.webp" className='grayscale' alt="" />
            <h4 className='text-[13px]'>Export in India is subject to several compliances as stipulated under the Foreign Exchange Management Act 1999, Foreign Exchange Management (Current Account Transactions) Rules, 2000, and the Foreign Exchange Management (Export of Goods and Services) Regulations, 2015. Such compliances are required to be adhered by every exporter in India.</h4>
            <h2 className='my-5 font-semibold text-[15px]'>Repatriation and Realization of Export proceeds:</h2>
            <h4 className='text-[13px]'>Exporters are required to declare the value of the goods to be exported. In case it is not possible to determine the full value of the goods at the time of export, then the fair market value of the goods to be exported (at the time of export) should be ascertained by the exporter.</h4>
            <h4 className='text-[13px] mt-4'>Exporters are required to adhere to the following time limits for realization and repatriation of goods and services:</h4>
            <p className='text-[10px]'>Timeline for repatriation and realization of goods is typically 9 months from the date of exports.
However, the above timeline would be decided by RBI on a case to case basis. The RBI stipulates these timelines:
When goods are exported to a warehouse established outside India (with the permission of RBI), the value of the exported goods should be paid as soon as it is realized to the authorized dealer bank, which should not be more that 15 months from the date of shipment (unless otherwise specified by RBI in consultation with the Government of India).
If the period is extended, then an application must be made to the AD Bank for a sufficient and reasonable cause shown.</p>
            <h2 className='my-5 font-semibold text-[15px]'>Proof of payment received:</h2>
            <h4 className='text-[13px]'>After receiving all payments of a shipping bill, exporters need to submit their export documents, eFIRC to their bank for closing their open entries in EDPMS and obtaining their eBRC.</h4>
          </div>
          </div>
        </div>
        
    </div>
  )
}

export default PaymentRec