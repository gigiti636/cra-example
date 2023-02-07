import { useParams } from 'react-router-dom';
import React, { useContext } from 'react';
import {CategoriesContext} from "./catagories_context";
import {Link} from "react-router-dom";

function Page() {
    const { categoryId } = useParams(); // Unpacking and retrieve id
    const {categories} = useContext(CategoriesContext);

    const categorySelected = categories.find(category => Number(categoryId) === category.id)


    return (
        <div className={'d-flex mb-2 w-100'}>
            <header className="h-100 w-100 d-flex bg-dark text-white align-items-center justify-content-around py-3">
                <h3 className={'m-0'}>
                    <small>on</small> {categorySelected.name}
                </h3>
                <h6 className={'m-0'}>
                    <Link to={'../'} className={`pl-2 text-white`}>
                        back to Categories
                    </Link>
                </h6>
            </header>
        </div>
    );
}

export default Page;
