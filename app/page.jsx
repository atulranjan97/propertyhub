const HomePage = () => {
    // return ( <div className="text-2xl font-sans">HomePage </div> );
    return ( <div className="text-2xl">HomePage </div> );
}
 
export default HomePage;

// Remember each page is a component and these are all actually rendered on the server by default, we will later see how we can change it to a client as we can create client components as we want, but by default these are rendered on the server and then the html and css and all that is sent to the client