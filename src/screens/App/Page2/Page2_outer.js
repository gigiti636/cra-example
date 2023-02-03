import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import {CategoriesContext} from "./catagories_context";

function Page() {
    const { categoryId } = useParams(); // Unpacking and retrieve id
    const {categories} = useContext(CategoriesContext);

    const categorySelected = categories.find(category => Number(categoryId) === category.id)

    return (
        <div className={'d-flex h-100'}>
            <header className="App-header h-100 w-100">
                <h3>
                    {categorySelected ? categorySelected['pageTitle'] : 'Non existent category'}
                </h3>
                <p>
                    {categorySelected ? categorySelected['content'] : ''}
                </p>
            </header>
        </div>
    );
}

export default Page;
