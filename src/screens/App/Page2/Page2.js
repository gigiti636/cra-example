import { Outlet } from 'react-router-dom';
import categories from "./categories.json";
import {Link} from "react-router-dom";
import {useState, useRef, useEffect} from "react";
import '../../../utils/string-utils';
import {CategoriesContext} from "./catagories_context";
import { useParams } from 'react-router-dom';
import client from "../../../api-client";
import {CategoryWrapper} from './atom'



function Page() {
    const [Categories,setCategories] = useState([]);
    const [Products,setProducts] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            client("/categories").then( response =>{
                const categories = response.data;
                setCategories(categories)
            });

        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            client("/products").then( response =>{
                const products = response.data;
                setProducts(Products)
                console.log(products)
            });

        };
        fetchData();
    }, [Products]);

    const searchTerm = useRef('');
    let activeToggle = useRef(false);

    const HandleSearchTerm = event => {
        searchTerm.current = event.target.value;
        FilterCategories();
    }

    const HandleFilterActive = event => {
        activeToggle.current = event.target.checked;
        FilterCategories();
    }

    const { categoryId } = useParams();
    const isActive = link_id => {
        return Number(link_id) === Number(categoryId) ? 'font-weight-bold' : '';
    };

    const FilterCategories = () => {
        let filtered_categories = [];
        categories.forEach(category => {
            //search term and filter
            if((searchTerm.current.length && category.pageTitle.includesCaseInsensitive(searchTerm.current)) && (activeToggle.current && category.isActive)){
                filtered_categories.push(category);
            //search term and not filter
            }else if(searchTerm.current.length && category.pageTitle.includesCaseInsensitive(searchTerm.current) && !activeToggle.current){
                filtered_categories.push(category);
            //no search term and  filter
            }else if(activeToggle.current && category.isActive && !searchTerm.current.length){
                filtered_categories.push(category);
            //no search term and  no filter
            }else if(!searchTerm.current.length && !activeToggle.current){
                filtered_categories.push(category);
            }
        })

    }
    return (
        <div className="App d-flex flex-column">
            <header className="App-header py-3 mb-2">
                THIS IS PAGE to used for search and filter on mock api categories
            </header>
            <div className={'d-flex justify-content-around'}>

                <input name={'category-search'} placeholder={'Search'} onInput= {(event)=>HandleSearchTerm(event)}/>

                <div>
                    <label>FIlter Active Categories</label>
                    <input name={'category-filter-active'} type={'checkbox'} onInput= {(event)=>HandleFilterActive(event)} />
                </div>

            </div>
            <div className='d-flex text-center justify-content-around mb-2 flex-wrap'>
                {Categories.map(category =>
                    <CategoryWrapper backgroundImage={category.image}>
                        <Link to={`${category.id}`} key={category.id} className={`pl-2 text-dark ${isActive(category.id)}`}>
                            {category.name}
                        </Link>
                    </CategoryWrapper>
                )}
            </div>
            <div>
                {Products.map(product =>
                    <div key={product.id}>
                        <img src={product.images[0]}/>
                        <Link to={`${product.id}`} className={`pl-2 text-dark`}>
                            {product.title}
                        </Link>
                    </div>
                )}
            </div>
            <CategoriesContext.Provider value={{categories: Categories}}>
                <Outlet />
            </CategoriesContext.Provider>

        </div>
    );
}

export default Page;
