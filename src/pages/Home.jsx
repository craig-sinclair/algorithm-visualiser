import { Link } from 'react-router-dom'
import './home.css'

const HomePage = () => {

    return(
        <>
            <div className='title-container'>
                <h1>Algorithm Visualiser</h1>

                <div className="algorithm-section main-section">
                    <h3>Graph Algorithms:</h3>
                    <div className='buttons-container'>
                        <Link to='/bfs'><button>Breadth-First Search (BFS)</button></Link>
                        <Link to='/dfs'><button>Depth-First Search (DFS)</button></Link>
                        <Link to='/djk'><button>Dijkstra's Algorithm</button></Link>
                        <Link to='/bfs'><button>Prim-Jarnik Algorithm</button></Link>
                    </div>
                </div>

                <div className="algorithm-section">
                    <h3>Text Algorithms:</h3>
                    <div className='buttons-container'>
                        <Link to='/kmp'><button>KMP String Search</button></Link>
                    </div>
                </div>
            </div>
        </>
    )

}
export default HomePage;