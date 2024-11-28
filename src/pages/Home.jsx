import { Link } from 'react-router-dom'
import './home.css'

const HomePage = () => {

    return(
        <>
            <div className='title-container'>    
                <h1>Graph Algorithm Visualiser</h1>

                <div className='buttons-container'>
                    <Link to='/bfs'><button>Breadth-First Search (BFS)</button></Link>
                    <Link to='/dfs'><button>Depth-First Search (DFS)</button></Link>
                    <Link to='/bfs'><button>Dijkstra's Algorithm</button></Link>
                    <Link to='/bfs'><button>Prim-Jarnik Algorithm</button></Link>
                    <Link to='/kmp'><button>KMP String Search</button></Link>
                </div>
            </div>
        </>

    )

}
export default HomePage;