import React, {useState, useEffect} from 'react'

const Home = () => {
  
  const [helloWorld, setHelloWorld] = useState();


  useEffect(() => {
    // runs 1 time because it's in a `useEffect`
    fetchHelloWorld();
  }, []);

  const fetchHelloWorld = () => {
    fetch('http://localhost:8080/')
      .then((response) => {
        // If an object is returned from API you could do
        // return response.json()
        return response.text();
      })
      .then((text) => {
        setHelloWorld(text);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      This is the Home Page.
      { helloWorld } 
    </div>
  )
}

export default Home;