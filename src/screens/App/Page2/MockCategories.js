//import categories from "./categories.json";
import { Outlet } from 'react-router-dom';
import {Link} from "react-router-dom";
import React, {useState} from "react";
import '../../../utils/string-utils';
import {CategoriesContext} from "./catagories_context";
import { useParams } from 'react-router-dom';
import {formatUrlParams} from '../../../utils/string-utils'
import {CategoryWrapper, CategoriesWrapper} from './atom'
import useFetchProducts from "./useFetchProducts";
import useFetchCategories from "./useFetchCategories";
import ProductCard from './Product/Product'
import Spinner from "react-bootstrap/Spinner";



function Page() {
    const { categoryId } = useParams();
    //const searchTerm = useRef('');

    const [searchTerm,setSearchTerm] = useState('')


    let params = {};
    if(searchTerm)
        params.title = searchTerm;
    if(categoryId)
        params.categoryId = categoryId;

    const { categories, categories_error, categories_loading } = useFetchCategories();
    const { products, error, loading } = useFetchProducts(formatUrlParams(params));

    const HandleSearchTerm = event => {
        setSearchTerm(event.target.value);
    }

    const isActive = link_id => {
        return Number(link_id) === Number(categoryId) ? 'font-weight-bold' : '';
    };


    return (
        <div className="App d-flex flex-column">
            <div className={'d-flex justify-content-around'}>

                <input name={'category-search'} placeholder={'Search'} onInput= {(event)=>HandleSearchTerm(event)}/>


            </div>
            <CategoriesWrapper className='d-flex text-center justify-content-around mb-2 flex-wrap mb-4'>
                {categories_error}
                {categories_loading &&    <Spinner animation="border" className="ml-2"   size="sm"/>}
                {!categoryId && categories.map(category =>
                    <CategoryWrapper backgroundImage={category.image}>
                        <Link to={`${category.id}`} key={category.id} className={`pl-2 text-dark ${isActive(category.id)}`}>
                            {category.name}
                        </Link>
                    </CategoryWrapper>

                )}
                <CategoriesContext.Provider value={{categories: categories}}>
                    <Outlet />
                </CategoriesContext.Provider>
            </CategoriesWrapper>

            <div className={'d-flex flex-wrap justify-content-around px-5'}>
                {products.map(product =>
                    <ProductCard product={product}/>
                )}
                {products.length === 0 && <h4 className={'text-center h-100'}>No Products for this category</h4>}
                {error}
                {loading &&    <Spinner animation="border" className="ml-2"   size="sm"/>}
            </div>
        </div>
    );
}

export default Page;
