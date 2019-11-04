const input0 = `Tiernan
CC
9
GITC
Library
Cullimore
Tiernan
CKB
FMH
CC
Fenster
Campbell
9 22
0 2
0 4
1 3
1 4
2 0
2 8
3 4
3 1
3 8
3 5
4 3
4 1
4 0
5 8
5 3
6 7
7 6
7 8
8 5
8 3
8 2
8 7`;

let input1 = `Cullimore
Tiernan
8
GITC
Library
Cullimore
Tiernan
CKB
FMH
CC
Fenster
8 16
0 2
1 3
2 0
2 5
3 1
3 5
3 4
4 5
4 3
6 7
7 6
7 5
5 4
5 3
5 2
5 7`;

let input2 = `CC
Fenster
9
GITC
Library
Cullimore
Tiernan
CKB
FMH
CC
Fenster
Campbell
9 22
0 2
0 4
1 3
1 4
2 0
2 8
3 4
3 1
3 8
3 5
4 3
4 1
4 0
5 8
5 3
6 7
7 6
7 8
8 5
8 3
8 2
8 7`;

let input3 = `GITC
FMH
8
GITC
Library
Cullimore
Tiernan
CKB
FMH
CC
Fenster
8 9
0 1
0 2
2 3
3 4
4 1
1 5
1 6
6 7
7 5`;

let input4 = `1
8
9
0
1
2
3
4
5
6
7
8
9 24
0 2
1 2
1 3
1 4
1 5
2 0
2 1
2 3
3 1
3 2
3 6
3 7
4 1
4 5
4 8
5 1
5 4
6 3
6 7
7 3
7 6
7 8
8 4
8 7`;

function processData(input) {
    var data = input.split("\n");

    var start = data[0];
    var finish = data[1];

    data = data.slice(2);

    var vertices_count = Number(data[0]) + 1;
    var edges_count = Number(data[vertices_count].split(" ")[1]);
    var edges_index = vertices_count + 1;
    var vertices = data.slice(1, vertices_count);
    var edges = data.slice(edges_index, edges_index + edges_count).map(x => x.split(" ").map(y => Number(y)));

    var walk = new Campus_Walk(start, finish, vertices, edges);

    console.log(walk.max_length);
}


class Campus_Walk {
    constructor(start, finish, vertices, edges) {
        this.directions = [];
        this.directions_named = [];

        this.places = copy_array_1d(vertices);
        this.edges = copy_array_2d(edges);

        this.start = start;
        this.start_index = this.places.indexOf(start);
        this.finish = finish;
        this.finish_index = this.places.indexOf(finish);

        this.max_length = 0;

        this.places_count = this.places.length;

        this.campus = this.places.map(function(element, i) {
            element = [];

            this.edges.forEach(function(edge) {
                if (edge[0] == i) {
                    element.push(edge[1]);
                }
            });

            return element;
        }.bind(this));

        this.longest_path();
    }

    find_path(place_index, max_length, current_length, visited) {
        visited.push(place_index);

        if (place_index == this.finish_index) {
            visited.splice(visited.indexOf(place_index), 1);

            if (current_length > this.max_length) {
                this.max_length = current_length;
            }

            current_length--;
            return;
        }

        current_length++;

        this.campus[place_index].forEach(function(place_index, i) {
            if (visited.indexOf(place_index) == -1) {
                this.find_path(place_index, max_length, current_length, visited);
            }
        }.bind(this));

        visited.splice(visited.indexOf(place_index), 1);
        current_length--;
    }

    longest_path() {
        var visited = [];

        this.find_path(this.start_index, this.max_length, 0, visited);
    }
}

function copy_array_1d(arr1) {
    return arr1.slice();
}

function copy_array_2d(arr1) {
    return arr1.map(x => x.slice()).slice();
}

processData(input2);