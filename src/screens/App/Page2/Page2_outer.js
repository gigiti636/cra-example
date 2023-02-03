import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import {CategoriesContext} from "./catagories_context";

function Page() {
    const { categoryId } = useParams(); // Unpacking and retrieve id
    const {categories} = useContext(CategoriesContext);

    const categorySelected = categories.find(category => Number(categoryId) === category.id)
    console.log(categoryId);
    console.log(categories);
    console.log(categorySelected);
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
//https://dev.to/junko911/how-to-implement-nested-routes-with-react-router-59oe
export default Page;
