import DashTopNav from '../../components/Navbar/DashTopNav';
import DashSideNav from '../../components/Navbar/DashSideNav';

export default function ProdDocs() {
  return (
    <>
      <DashTopNav className="absolute top-0" />
      <DashSideNav className="absolute top-0" />
      <div className="ml-[22vw] mt-[14vh] absolute top-0 p-4">
        <h1 className="text-4xl text-amber-900 mb-10 font-serif">Product Documentation</h1>
        <h2 className="text-[14px] text-amber-950 font-sans">
          Certain products and categories are regulated and have specific requirements to be imported into USA. Choose
          the product below to find out the certification and regulations applicable to them.
        </h2>
        <br />
        <h2 className="text-[14px] text-amber-950 font-sans">What product do you plan to sell globally?</h2>
        <br />
        {/* Replace static HTML with a styled search input */}
        <div className="kat-col-md-12">
          <div className="search-bar-product">
            <div className="relative flex justify-center items-center w-full mt-10">
              <input
                type="text"
                placeholder="Search your product"
                className="w-[50%] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-900"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  height="20"
                  width="20"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  focusable="false"
                  className="text-gray-500"
                >
                  <path
                    d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}