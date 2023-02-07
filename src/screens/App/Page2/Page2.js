import categories from "./categories.json";
import { Outlet } from 'react-router-dom';
import {Link} from "react-router-dom";
import {useState, useRef, useEffect} from "react";
import '../../../utils/string-utils';
import {CategoriesContext} from "./catagories_context";
import { useParams } from 'react-router-dom';
import {CategoryWrapper, CategoriesWrapper} from './atom'
import useFetchProducts from "./useFetchProducts";
import useFetchCategories from "./useFetchCategories";
import ProductCard from './Product/Product'



function Page() {
    const [params,setParams] = useState([]);

    const { products, error, loading } = useFetchProducts(params);
    const { categories, categories_error, categories_loading } = useFetchCategories();

     console.log(products,error,loading);


    const searchTerm = useRef('');

    const HandleSearchTerm = event => {
        searchTerm.current = event.target.value;
    }


    const { categoryId } = useParams();
    const isActive = link_id => {
        return Number(link_id) === Number(categoryId) ? 'font-weight-bold' : '';
    };


    return (
        <div className="App d-flex flex-column">
            <div className={'d-flex justify-content-around'}>

                <input name={'category-search'} placeholder={'Search'} onInput= {(event)=>HandleSearchTerm(event)}/>


            </div>
            <CategoriesWrapper className='d-flex text-center justify-content-around mb-2 flex-wrap mb-4'>
                {categories.map(category =>
                    <CategoryWrapper backgroundImage={category.image}>
                        <Link to={`${category.id}`} key={category.id} className={`pl-2 text-dark ${isActive(category.id)}`}>
                            {category.name}
                        </Link>
                    </CategoryWrapper>
                )}
            </CategoriesWrapper>
            <div className={'d-flex flex-wrap justify-content-around px-5'}>
                {products.map(product =>
                    <ProductCard product={product}/>
                )}
            </div>
            <CategoriesContext.Provider value={{categories: categories}}>
                <Outlet />
            </CategoriesContext.Provider>

        </div>
    );
}

export default Page;
