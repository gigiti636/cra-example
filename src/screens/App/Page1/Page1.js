import logo from '../../../logo.svg';
import '../../../index.scss';

function Page() {
    return (
        <div className="App" style={{background:'red'}}>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    THIS IS PAGE 1
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

export default Page;
