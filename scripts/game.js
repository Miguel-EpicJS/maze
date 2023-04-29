let maze = []
let vis = []
let player = [0,0] // x y

function generateMaze()
{
    for (let i = 0; i < 5; i++)
    {
	maze.push([])
	for (let j = 0; j < 5; j++)
	{
	    maze[i].push(Math.floor(Math.random() * 2))
	}
    }
    maze[0][0] = 2
    maze[4][4] = 3
    vis = maze.slice()
    vis[0][0] = 0
    vis[4][4] = 0
}

function renderMaze()
{
    for (let i = 0; i < 5; i++)
    {
	for (let j = 0; j < 5; j++)
	{
	    const square = document.getElementById(`square-${i}-${j}`)
	    switch (maze[i][j])
	    {
		case 1:
		    square.classList.add("wall")
		    break;
		case 2:
		    square.classList.add("player")
		    break;
		case 3:
		    square.classList.add("end")
		    break;
		default:
		    square.classList.add("tile")
		    break;

	    }
	}
    }
}

function movePlayer(x, y)
{
    let playerDiv = document.getElementById(`square-${player[0]}-${player[1]}`)
    playerDiv.classList.remove("player")
    player[0] += x
    player[1] += y
    if (player[0] < 0 || player[1] < 0 || player[0] > 4 || player[1] > 4 || maze[player[0]][player[1]] == 1 )
    {
	player[0] -= x
	player[1] -= y
    }
    
    playerDiv = document.getElementById(`square-${player[0]}-${player[1]}`)
    playerDiv.classList.add("player")

    verifyWin()
}

function verifyWin()
{
    if (maze[player[0]][player[1]] == 3)
    {
	alert("You have found the exit!")
    }
}

let path = false
function dfs(x, y)
{
    if (!(x < 0 || y < 0 || x > 4 || y > 4) && !(vis[x][y] == 1))
    {
        if (maze[x][y] == 3)
	{
	    alert("q")
	    path = true
	}

	vis[x][y] = 1
        dfs(x+1, y)
	dfs(x-1, y)
        dfs(x, y+1)
	dfs(x, y-1)
    }
}

generateMaze()
renderMaze()
//dfs(0,0) - not working for now


document.onkeyup = function (e) {
    const key = e.key

    switch (key) {
	case "ArrowLeft":
            movePlayer(0, -1)
	    break;
        case "ArrowRight":
	    movePlayer(0, 1)
	    break;
        case "ArrowUp":
	    movePlayer(-1, 0)
	    break;
	case "ArrowDown":
	    movePlayer(1, 0)
	    break;
    }

}

