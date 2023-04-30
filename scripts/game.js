let maze = []
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

function bfs(start, end) {
    const ROW = 5;
    const COL = 5;

    const visited = Array(ROW)
	.fill(false)
	.map(() => Array(COL).fill(false));
    const queue = [];

    visited[start[0]][start[1]] = true;

    for (let i = 0; i < ROW; i+=1)
    {
	for (let j = 0; j < COL; j+=1)
	{
	    if (maze[i][j] == 1)
	    {
		visited[i][j] = true;
	    }
	}
    }

    queue.push(start);

    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];

    while (queue.length > 0) {
	const [x, y] = queue.shift();

	if (x === end[0] && y === end[1]) {
	    return true;
	}

	for (let i = 0; i < 4; i++) {
	    const nextX = x + dx[i];
	    const nextY = y + dy[i];

	    if (nextX >= 0 && nextX < ROW && nextY >= 0 && nextY < COL && !visited[nextX][nextY]) {
		visited[nextX][nextY] = true;
		queue.push([nextX, nextY]);
	    }
	}
    }

    return false;
}


generateMaze()
renderMaze()

let path = bfs([0,0], [4,4])

if (path == false)
{
    alert("No path found, reload page")
}

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

