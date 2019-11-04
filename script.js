const input0 = `2
newark
16
nyc
boston
washington dc
miami
atlanta
niagara falls
cape cod
philadelphia
orlando
wildwood
florida keys
hilton head
newark
virginia beach
maine coast
green mountains
16 32
0 10
0 15
1 2
1 3
2 1
2 3
3 1
3 2
3 7
4 5
4 6
5 4
5 13
6 4
7 14
7 3
7 12
8 15
9 10
10 0
10 11
10 9
11 10
11 12
12 11
12 13
12 7
13 12
13 5
14 7
15 0
15 8`;

let input1 = `3
newark
16
nyc
boston
washington dc
miami
atlanta
niagara falls
cape cod
philadelphia
orlando
wildwood
florida keys
hilton head
newark
virginia beach
maine coast
green mountains
16 32
0 10
0 15
1 2
1 3
2 1
2 3
3 1
3 2
3 7
4 5
4 6
5 4
5 13
6 4
7 14
7 3
7 12
8 15
9 10
10 0
10 11
10 9
11 10
11 12
12 11
12 13
12 7
13 12
13 5
14 7
15 0
15 8`;

let input2 = `1
newark
16
nyc
boston
washington dc
miami
atlanta
niagara falls
cape cod
philadelphia
orlando
wildwood
florida keys
hilton head
newark
virginia beach
maine coast
green mountains
16 32
0 10
0 15
1 2
1 3
2 1
2 3
3 1
3 2
3 7
4 5
4 6
5 4
5 13
6 4
7 14
7 3
7 12
8 15
9 10
10 0
10 11
10 9
11 10
11 12
12 11
12 13
12 7
13 12
13 5
14 7
15 0
15 8`;

let input3 = `3
1
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

    var time = data[0];
    var start = data[1];

    data = data.slice(2);

    var vertices_count = Number(data[0]) + 1;
    var edges_count = Number(data[vertices_count].split(" ")[1]);
    var edges_index = vertices_count + 1;
    var vertices = data.slice(1, vertices_count);
    var edges = data.slice(edges_index, edges_index + edges_count).map(x => x.split(" ").map(y => Number(y)));

    var trip = new RoadTrip(start, time, vertices, edges);

    trip.print_targets();
}


class RoadTrip {
    constructor(start, time, vertices, edges) {
        this.targets = [];
        this.targets_named = [];

        this.places = copy_array_1d(vertices);
        this.edges = copy_array_2d(edges);

        this.start = start;
        this.start_index = this.places.indexOf(start);
        this.time = time;

        this.places_count = this.places.length;

        this.roads = this.places.map(function(element, i) {
            element = [];

            this.edges.forEach(function(edge) {
                if (edge[0] == i) {
                    element.push(edge[1]);
                }
            });

            return element;
        }.bind(this));

        this.farthest_target();
    }

    add_target(place_index) {
        this.targets.push(place_index);
        this.targets_named.push(this.places[place_index]);
    }

    find_farthest_target(place_index, current_time, visited) {
        visited.push(place_index);

        if (current_time == this.time) {
            this.add_target(place_index);

            visited.splice(visited.indexOf(place_index), 1);

            current_time--;
            return;
        }

        current_time++;

        this.roads[place_index].forEach(function(place_index, i) {
            if (visited.indexOf(place_index) == -1) {
                this.find_farthest_target(place_index, current_time, visited);
            }
        }.bind(this));

        this.add_target(place_index);

        visited.splice(visited.indexOf(place_index), 1);
        current_time--;
    }

    farthest_target() {
        var visited = [];

        this.find_farthest_target(this.start_index, 0, visited);

        this.targets_named.sort();
    }

    print_targets() {
        this.targets_named.forEach(function(element) {
            console.log(element);
        });
    }
}

function copy_array_1d(arr1) {
    return arr1.slice();
}

function copy_array_2d(arr1) {
    return arr1.map(x => x.slice()).slice();
}

processData(input2);