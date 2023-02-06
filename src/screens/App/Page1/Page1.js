

import React from "react";



function App() {

    const [search_text, set_search_text] = React.useState([]);

    const [posts, setPosts] = React.useState([]);

    const controller = new AbortController();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        if(search_text){
            fetch("https://dummyjson.com/posts/search?limit=5&q=" + search_text,{ signal: controller.signal })

                .then((response) => response.json())
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('Fetch Aborted');
                    } else {
                        console.error(err);
                    }
                    setLoading(false);
                })
                .then((data) => {
                    setLoading(true);
                    Promise.all(

                        data.posts.map((post) =>

                            fetch("https://dummyjson.com/users/" + post.userId)

                                .then((response) => response.json())

                                .then((user) => ({

                                    ...post,

                                    user,

                                }))

                        )

                    ).then((data) => {

                        setPosts(data);
                        setLoading(false);
                    });

                })

                .catch((err) => {

                    console.log(err.message);
                    setLoading(false);

                });
        }


        return () => {
            controller.abort();
        };

    }, [search_text]);



    function handleChange(e) {

        set_search_text(e.target.value);

    }



    return (

        <div style={{maxWidth: '300px',position: 'relative'}}>

            <input type="text" onChange={handleChange} style={{width: '100%'}}></input>

            <ul style={{width:'100%',position: 'absolute',padding: 0}}>

                {search_text && posts.map((post) => (

                    <li key={post.id} style={{textDecoration:'none',padding:0,marginBottom:'6px',paddingLeft:'6px', borderBottom:'1px solid black'}}>
                        <p style={{margin:0}}>{post.title}, <em><strong> {post.user.firstName} {post.user.lastName}</strong></em></p>
                    </li>
                ))}
            </ul>

            {loading && search_text && <div className={'loader'} style={{position: 'absolute',right:'2px',top:'4px'}}></div>}

        </div>

    );

}



export default App;