import { useParams } from 'react-router-dom';

function Page() {
    let { categoryId } = useParams(); // Unpacking and retrieve id

    console.log(categoryId);
    return (
        <div className={'d-flex h-100'}>
            <header className="App-header h-100 w-100">
                <p>
                    THIS IS sub PAGE route
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}
//https://dev.to/junko911/how-to-implement-nested-routes-with-react-router-59oe
export default Page;
