import { Outlet } from 'react-router-dom';
import categories from "./categories.json";
import {Link} from "react-router-dom";

function Page() {
    return (
        <div className="App d-flex flex-column">
            <header className="App-header py-3 mb-2">
                THIS IS PAGE to use for mock api categories
            </header>
            <p className='d-flex text-center justify-content-around mb-2'>
                {categories.map(category => <Link to={`${category.id}`} key={category.id} className="pl-2 text-dark">{category.pageTitle}</Link>)}
            </p>
            <Outlet />
        </div>
    );
}

export default Page;
