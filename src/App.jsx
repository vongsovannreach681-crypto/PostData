import { useEffect, useState } from 'react'
import './App.css'
import ListAllProducts from './components/Products/ListAllProducts'
import { NavLink } from 'react-router-dom';


function App() {

  // using state for fetching data
  const [products, setProducts] = useState([]);

  // tracking state 
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
      const data = await response.json();
      setProducts(data);
    }
    fetchData();

  }, [])
  return (
    <>
    <NavLink to="/Post">
      <button className="bg-blue-700 my-10 hover:bg-orange-500 text-white font-semibold text-center text-xl p-2 rounded-xl border-white border-2">Add New Product</button>
    </NavLink>
      <section className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 p-8 m-8'>
        {
          products?.map((pro) => (
            <ListAllProducts
              id={pro?.id || undefined}
              key={pro?.id}
              title={pro?.title}
              price={pro?.price}
              description={pro?.description}
              image={pro?.images[0] || ''}
            />
          ))
        }
      </section>

    </>
  )
}

export default App


