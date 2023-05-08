import React, {Suspense} from 'react';
import RoutesPage from "../components/routers/RoutesPage";
import Loading from "../components/loading/Loading";


function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading/>}>
        <RoutesPage/>
      </Suspense>
    </div>
  );
}

export default App;
