function myOrderCard() {
  return (
    <>
        <div tabindex="0" className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow transform hover:scale-[1.02] ring-1 ring-transparent focus:outline-none focus:ring-blue-400 focus:ring-opacity-50 p-6 cursor-pointer">
              <header className="mb-3">
                <h2 className="text-xl font-semibold text-gray-900">Order #123456</h2>
                <p className="text-gray-600 font-medium">Wireless Bluetooth Headphones</p>
                <time datetime="2024-06-01" className="text-sm text-gray-400">June 1, 2024</time>
              </header>
              <div className="flex justify-between items-center">
                <span className="inline-block rounded-full bg-green-100 text-green-800 text-sm font-semibold px-3 py-1">Delivered</span>
                <span className="text-lg font-semibold text-gray-900">Rs. 129.99</span>
              </div>
        </div>
    </>
  )
}
export default myOrderCard