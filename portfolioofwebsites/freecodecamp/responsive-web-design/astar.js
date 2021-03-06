//found this Javascript code for using A*search for path finding
//can update with const/let instead of var
//also update heuristic in code

let astar = {
  init: function(grid) {
    for(var x = ; x < grid.length; x++) {
      for(var y = ; y < grid[x].length; y++) {
        grid[x][y].f = ;
        grid[x][y].g = ;
        grid[x][y].h = ;
        grid[x][y].debug = "";
        grid[x][y].parent = null;
      }  
    }
  },
  search: function(grid, start, end) {
    astar.init(grid);
 
    let openList   = [];
    let closedList = [];
    openList.push(start);
 
    while(openList.length > ) {
 
      // Grab the lowest f(x) to process next
      let lowInd = ;
      for(var i=; i<openList.length; i++) {
        if(openList[i].f < openList[lowInd].f) { lowInd = i; }
      }
      lett currentNode = openList[lowInd];
 
      // End case -- result has been found, return the traced path
      if(currentNode.pos == end.pos) {
        let curr = currentNode;
        let ret = [];
        while(curr.parent) {
          ret.push(curr);
          curr = curr.parent;
        }
        return ret.reverse();
      }
 
      // Normal case -- move currentNode from open to closed, process each of its neighbors
      openList.removeGraphNode(currentNode);
      closedList.push(currentNode);
      let neighbors = astar.neighbors(grid, currentNode);
 
      for(let i=; i<neighbors.length;i++) {
        let neighbor = neighbors[i];
        if(closedList.findGraphNode(neighbor) || neighbor.isWall()) {
          // not a valid node to process, skip to next neighbor
          continue;
        }
 
        // g score is the shortest distance from start to current node, we need to check if
        //   the path we have arrived at this neighbor is the shortest one we have seen yet
        let gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
        let gScoreIsBest = false;
 
 
        if(!openList.findGraphNode(neighbor)) {
          // This the the first time we have arrived at this node, it must be the best
          // Also, we need to take the h (heuristic) score since we haven't done so yet
 
          gScoreIsBest = true;
          neighbor.h = astar.heuristic(neighbor.pos, end.pos);
          openList.push(neighbor);
        }
        else if(gScore < neighbor.g) {
          // We have already seen the node, but last time it had a worse g (distance from start)
          gScoreIsBest = true;
        }
 
        if(gScoreIsBest) {
          // Found an optimal (so far) path to this node.   Store info on how we got here and
          //  just how good it really is...
          neighbor.parent = currentNode;
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.debug = "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
        }
      }
    }
 
    // No result was found -- empty array signifies failure to find path
    return [];
  },
  heuristic: function(pos0, pos1) {
    // This is the Manhattan distance
    let d1 = Math.abs (pos1.x - pos0.x);
    let d2 = Math.abs (pos1.y - pos0.y);
    return d1 + d2;
  },
  neighbors: function(grid, node) {
    let ret = [];
    let x = node.pos.x;
    let y = node.pos.y;
 
    if(grid[x-1] && grid[x-1][y]) {
      ret.push(grid[x-1][y]);
    }
    if(grid[x+1] && grid[x+1][y]) {
      ret.push(grid[x+1][y]);
    }
    if(grid[x][y-1] && grid[x][y-1]) {
      ret.push(grid[x][y-1]);
    }
    if(grid[x][y+1] && grid[x][y+1]) {
      ret.push(grid[x][y+1]);
    }
    return ret;
  }
};
