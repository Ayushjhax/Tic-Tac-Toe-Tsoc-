const board = ["-", "-", "-",
         "-", "-", "-",
         "-", "-", "-"];

let game_still_going = true;

let winner = null;

let current_player = "X";

const rooms = {};

function create_room() {
    const room_code = Math.floor(Math.random() * 90000) + 10000;
    rooms[room_code] = { board: [...board] };
    console.log("Room created with code:", room_code);
}

function join_room() {
    const room_code = prompt("Enter the room code: ");
    if (room_code in rooms) {
        console.log("Joined room with code:", room_code);
    } else {
        console.log("Invalid room code. Exiting the game.");
        return;
    }
}

function play_game() {
    display_board();
    while (game_still_going) {
        handle_turn(current_player);
        check_if_game_over();
        flip_player();
    }
    if (winner === "X" || winner === "O") {
        console.log(winner + " won.");
    } else if (winner === null) {
        console.log("Tie.");
    }
}

function display_board() {
    console.log("\n");
    console.log(board[0] + " | " + board[1] + " | " + board[2] + "     1 | 2 | 3");
    console.log(board[3] + " | " + board[4] + " | " + board[5] + "     4 | 5 | 6");
    console.log(board[6] + " | " + board[7] + " | " + board[8] + "     7 | 8 | 9");
    console.log("\n");
}

function handle_turn(player) {
    console.log(player + "'s turn.");
    let position = prompt("Choose a position from 1-9: ");
    let valid = false;
    while (!valid) {
        while (!["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(position)) {
            position = prompt("Choose a position from 1-9: ");
        }
        position = parseInt(position) - 1;
        if (board[position] === "-") {
            valid = true;
        } else {
            console.log("You can't go there. Go again.");
        }
    }
    board[position] = player;
    display_board();
    rooms[room_code].board[position] = player;
}

function check_if_game_over() {
    check_for_winner();
    check_for_tie();
}

function check_for_winner() {
    let row_winner = check_rows();
    let column_winner = check_columns();
    let diagonal_winner = check_diagonals();
    if (row_winner) {
        winner = row_winner;
    } else if (column_winner) {
        winner = column_winner;
    } else if (diagonal_winner) {
        winner = diagonal_winner;
    } else {
        winner = null;
    }
}

function check_rows() {
    if (board[0] === board[1] && board[1] === board[2] && board[0] !== "-") {
        game_still_going = false;
        return board[0];
    } else if (board[3] === board[4] && board[4] === board[5] && board[3] !== "-") {
        game_still_going = false;
        return board[3];
    } else if (board[6] === board[7] && board[7] === board[8] && board[6] !== "-") {
        game_still_going = false;
        return board[6];
    }
    return null;
}

function check_columns() {
    if (board[0] === board[3] && board[3] === board[6] && board[0] !== "-") {
        game_still_going = false;
        return board[0];
    } else if (board[1] === board[4] && board[4] === board[7] && board[1] !== "-") {
        game_still_going = false;
        return board[1];
    } else if (board[2] === board[5] && board[5] === board[8] && board[2] !== "-") {
        game_still_going = false;
        return board[2];
    }
    return null;
}

function check_diagonals() {
    if (board[0] === board[4] && board[4] === board[8] && board[0] !== "-") {
        game_still_going = false;
        return board[0];
    } else if (board[2] === board[4] && board[4] === board[6] && board[2] !== "-") {
        game_still_going = false;
        return board[2];
    }
    return null;
}

function check_for_tie() {
    if (!board.includes("-")) {
        game_still_going = false;
        return true;
    } else {
        return false;
    }
}

function flip_player() {
    if (current_player === "X") {
        current_player = "O";
    } else if (current_player === "O") {
        current_player = "X";
    }
}

console.log("Welcome to Tic Tac Toe!");
const choice = prompt("Enter '1' to create a room or '2' to join a room: ");
if (choice === "1") {
    create_room();
} else if (choice === "2") {
    join_room();
} else {
    console.log("Invalid choice. Exiting the game.");
    return;
}
play_game();