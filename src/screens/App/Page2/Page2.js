import { Outlet } from 'react-router-dom';
import categories from "./categories.json";
import {Link} from "react-router-dom";
import {useState, useRef} from "react";
import '../../../utils/string-utils';
import {CategoriesContext} from "./catagories_context";
import { useParams } from 'react-router-dom';



function Page() {
    const [CategoriesFiltered,setCategoriesFiltered] = useState(categories);

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

        setCategoriesFiltered(filtered_categories);
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
            <p className='d-flex text-center justify-content-around mb-2'>
                {CategoriesFiltered.map(category => <Link to={`${category.id}`} key={category.id} className={`pl-2 text-dark ${isActive(category.id)}`}>{category.pageTitle}</Link>)}
            </p>
            <CategoriesContext.Provider value={{categories: categories}}>
                <Outlet />
            </CategoriesContext.Provider>

        </div>
    );
}

export default Page;
