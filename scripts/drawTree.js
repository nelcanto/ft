// this file serves to create family tree with D3
// originally written and tested with traceur,
// but should be compatible with native ES6
// please use traceur compiler for safty purposes


// svg is the base for drawing d3 objects
var svg,
    maxRect = { x: 100, y: 130},
    maxIcon = { x: maxRect.x, y: maxRect.x},
    imgUrlMen = "http://thumbs.dreamstime.com/m/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg",
    imgUrlWomen = "http://thumbs.dreamstime.com/m/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg",
    imgUrlChild = "https://thumbsplus.tutsplus.com/uploads/users/135/posts/21954/preview_image/preview-cartoon-children.jpg?height=300&width=300";

var tree = [];

var centerX = $(window).width()/2+200,
    centerY = $(window).height()/2+200,
    marginX = 150,
    marginY = 50;

// lets start from here ...
var id = 1;
mainDraw(id);

function mainDraw(id2) {
  // added a hack to change the global id variable without breaking this code
  // need for drawing a different id tree
  id = id2;
  d3.select("svg").remove();
  svg = d3.select("body")
          .append("svg")
          .attr('data-viewed-id', id)
          .attr('height', $(window).height()*3)
          .attr('width', $(window).width()*2)
  $("svg").draggable();
  d3.json("http://192.168.1.220/d3/php/view.php?userid=" + id, draw);
}

/*
 * connect one node with its mother node and father node
 * @param arr       should pass in all current layer's nodes
 * @param tree      should pass in global tree variable containing all nodes
 * @param ratio     numberic scale based on layer
 * @param preview   set switch on will enable drawTiny to hide children nodes
 * @return
 */
function connectWithParents(fatherNode, motherNode, nodeX) {
  connectLine(fatherNode, nodeX);
  connectLine(motherNode, nodeX);
}

/*
 * connect childnode with one parent node
 * @param arr       should pass in all current layer's nodes
 * @param tree      should pass in global tree variable containing all nodes
 * @param ratio     numberic scale based on layer
 * @param preview   set switch on will enable drawTiny to hide children nodes
 * @return
 */
function connectLine(parentNode, childNode) {

    if (parentNode == null) {
      return -1;
    }

    let lineFunction = d3.svg.line()
                     .x((d) => { return d.x; })
                     .y((d) => { return d.y; });

    let lineData = [
            { "x": parentNode.offsetX + maxRect.x/2,
              "y": parentNode.offsetY + maxRect.y
            },
            { "x": parentNode.offsetX + maxRect.x/2,
              "y": (parentNode.offsetY + maxRect.y + childNode.offsetY)/2
            },
            { "x": childNode.offsetX + maxRect.x/2,
              "y": (parentNode.offsetY + maxRect.y + childNode.offsetY)/2
            },
            { "x": childNode.offsetX + maxRect.x/2,
              "y": childNode.offsetY
            }
        ];

    svg.append("path")
       .attr("d", lineFunction(lineData))
       .attr("stroke", "gray")
       .attr("stroke-width", 2)
       .attr("fill", "none");
}

/*
 * connect spouse directly
 * @param nodeLeft       should pass in left node
 * @param nodeRight      should pass in right node
 * @return
 */
function connectSpouse(nodeLeft, nodeRight) {

    let lineFunction = d3.svg.line()
                     .x((d) => { return d.x; })
                     .y((d) => { return d.y; });

    let lineData = [
            { "x": nodeLeft.offsetX + maxRect.x,
              "y": nodeLeft.offsetY + maxRect.y/2
            },
            { "x": nodeRight.offsetX,
              "y": nodeLeft.offsetY + maxRect.y/2
            }
        ];

    svg.append("path")
       .attr("d", lineFunction(lineData))
       .attr("stroke", "gray")
       .attr("stroke-width", 2)
       .attr("fill", "none");
}

/**
 * Accept an array of nodes, draw all of their parent nodes
 * @param arr       should pass in all current layer's nodes
 * @param tree      should pass in global tree variable containing all nodes
 * @param ratio     numberic scale based on layer
 * @param preview   set switch on will enable drawTiny to hide children nodes
 * @return array of all higher layer's nodes
 */
function drawParentsLayerAndConnect(arr, tree, ratio, preview = false) {
  let ret = [];
  let obj, node;
  for (let entry of arr) {
      obj = entry.obj;
      node = entry.node;
      if (obj == null)
        return -1;

      let objFather,objMother,nodeFather,nodeMother;

      if (obj.father != undefined && obj.father == null) {
        objFather = null;
      } else {
        objFather = tree[obj.father];
        nodeFather = drawNode(objFather, node.offsetX - marginX*ratio, node.offsetY - maxRect.y - marginY);

        if (objFather != undefined && objFather.children != undefined && objFather.children.length>1 && preview == true) {
          drawTiny(nodeFather.offsetX, nodeFather.offsetY, objFather.id);
        }
        ret.push({'obj':objFather, 'node': nodeFather});
      }
      if (obj.mother == null) {
        objMother = null;
      } else {
        objMother = tree[obj.mother];
        nodeMother = drawNode(objMother, node.offsetX + marginX*ratio, node.offsetY - maxRect.y - marginY);
        if (objMother != undefined && objMother.children != undefined && objMother.children.length>1 && preview == true) {
          drawTiny(nodeMother.offsetX, nodeMother.offsetY, objMother.id);
        }
        ret.push({'obj': objMother, 'node': nodeMother});
      }
      connectWithParents(nodeFather, nodeMother, node);
  }
  return ret;
}

/**
 * Accept an array of nodes, draw all of their children nodes
 * @param arr       should pass in all current layer's nodes
 * @param tree      should pass in global tree variable containing all nodes
 * @param ratio     numberic scale based on layer
 * @param preview   set switch on will enable drawTiny to hide children nodes
 * @return array of all lower layer's nodes
 */
function drawChildrenLayerAndConnect(arr, tree, ratio, preview = false) {

  let ret = [];
  let visited = [];
  let obj,
      node,
      nodeSpouse,
      childObj,
      childNode,
      childrenArrayLength;

  // be sure not to use for ()
  // because arr looks like:
  // 0:Object, 1:Object, length:2, _proto_: []
  arr.forEach((entry) => {
      obj = entry.obj;
      node = entry.node;

      // check if visited
      if (visited.indexOf(obj.id) != -1) {
          return -1;
      }

      visited.push(obj.id);

      let spouseOffsetX = node.offsetX;
      if (obj != undefined && obj.spouse != undefined && obj.spouse != null) {

        let objSpouse = tree[obj.spouse];

        nodeSpouse = objSpouse.node;
        if (objSpouse.node == null) {
          nodeSpouse = drawNode(objSpouse, node.offsetX + marginX*ratio, node.offsetY);
          connectSpouse(node, nodeSpouse);
          spouseOffsetX = nodeSpouse.offsetX;
        }
        visited.push(obj.spouse);
      }
      // first check obj exists
      if (obj == null)
        return -1;

      // the children array is defined and has at least one element
      if (typeof obj.children !== undefined && obj.children.length > 0) {
        childrenArrayLength = obj.children.length;
        let i = childrenArrayLength/2*(-1);
        for (let child_id of obj.children) {
          childObj = tree[child_id];
          childNode = drawNode(childObj, (node.offsetX + spouseOffsetX)/2 + i*marginX*ratio, node.offsetY + maxRect.y + marginY);
          if (preview == true && childObj.spouse != null) {
              drawTiny(childNode.offsetX, childNode.offsetY, childNode.obj.id);
          }
          ret.push({'obj':childObj, 'node': childNode});

          connectWithParents(node, nodeSpouse, childNode);

          i++;
        }
      }

  });
  return ret;
}

/**
 * Draw 2 layers up of current node and 2 layers down of current node.
 * Total: 5 layers
 *    Layer 2: grandpa, grandma, etc
 *    Layer 1: mother, father, etc
 *    Layer 0: sisters, brothers, spouse
 *    Layer -1(N1-negative1): children
 *    Layer -2(N2-negative2): grandchildren
 * @param data     complete json of all nodes
 * @return
 */
function draw(data) {
  let main = data.forEach( (entry) => {
    tree[entry.id] = entry;
    if (entry.id == id){
      return entry;
    }
  });

  // create objects from id=>objMe
  // layer0
  let objMe     = tree[id];
  let objSpouse = tree[objMe.spouse];

  let nodeMe      = drawNode(objMe, centerX, centerY);
  let nodeSpouse;

  if (objMe.children == undefined || objMe.children.length < 1) {
    nodeSpouse  = drawNode(objSpouse, nodeMe.offsetX + 1*marginX, nodeMe.offsetY);
    connectSpouse(nodeMe, nodeSpouse);
  } else {
    nodeSpouse  = drawNode(objSpouse, nodeMe.offsetX + 4*marginX, nodeMe.offsetY);
  }
  // Layer 1
  let initialArr;
  initialArr = [ {'node':nodeMe, 'obj':objMe}, {'node': nodeSpouse, 'obj': objSpouse}];
  let layer1Arr = drawParentsLayerAndConnect(initialArr, tree, 1, true);

  // Layer 2
  drawParentsLayerAndConnect(layer1Arr, tree, 0.5, true);

  // Layer -1
  let layerN1Arr = drawChildrenLayerAndConnect(initialArr, tree, 3, false);

  // Layer -2
  drawChildrenLayerAndConnect(layerN1Arr, tree, 1, true);
  $(document).trigger('DATA_LOADED');
}

/**
 * based on obj and pre-defined offsetX, offsetY, draw and return node
 * @param obj
 * @param offsetX
 * @param offsetY
 * @return node
 */
function drawNode(obj, offsetX, offsetY) {
    if (obj == null) {
      return -1;
    }
    let name = obj.lastName + ' ' + obj.firstName;
    let imgUrl = obj.image;
    let box = svg
         .append("g")
         .attr("transform",
            function(d, i) { return "translate(" + offsetX + "," + offsetY + ")"; }
          )
         .attr('id', `node-${obj.id}`);

    box.attr("class", "node")
        .attr("style", "cursor:pointer;")
        .attr("data-target", "#node-modal")
        .attr("data-toggle", "modal")
        .attr("data-name", name);
    if (obj.father != null) {
        obj.sibling = tree[obj.father].children;
    } else if (obj.mother != null)
        obj.sibling = tree[obj.mother].children;
      else
        obj.sibling = [obj.id];

    $(`#node-${obj.id}`).data(obj);

    box.offsetX = offsetX;
    box.offsetY = offsetY;
    box.name = name;
    box.imgUrl = imgUrl;
    box.obj = obj;

    box.append("rect")
        .attr("x", "0")
        .attr("y", "0")
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", "white")
        .attr("style", "stroke:black;stroke-width:2;opacity:0.3;")
        .attr("width", maxRect.x)
        .attr("height", maxRect.y);

    box.append("line")
        .attr("x1", 0)
        .attr("x2", maxRect.x)
        .attr("y1", maxIcon.y)
        .attr("y2", maxIcon.y)
        .attr("stroke", "gray")
        .attr("stroke-width", 2);

    box.append("image")
        .attr("x", "1")
        .attr("y", "1")
        .attr("preserveAspectRatio", "none")
        .attr("height", maxRect.x-2)
        .attr("width", maxRect.x-2)
        .attr("xlink:href", imgUrl);

    box.append('text')
        .attr("text-anchor", "middle")
        .attr("x", maxRect.x/2)
        .attr("y", maxRect.y)
        .attr("dy", "-.35em")
        .attr("fill", "black")
        .attr("font-size", 22)
        .attr("opacity", "1")
        .attr("font-family", "sans-serif")
        .text(name);

    box.on("mouseover", function(d) {
      d3.select(this).transition()
                     .delay("100")
                     .style("opacity", .5);

    })
    .on("mouseout", function(d) {
      d3.select(this).transition()
                     .delay("100")
                     .style("opacity", 1);
    });
    obj.node = box;
    return box;
}

/**
 * draw tiny nodes on left side for hiding infomation
 * @param offsetX
 * @param offsetY
 * @return
 */
function drawTiny(offsetX, offsetY, id){
    let base = maxRect.x;
    let boxOffsetX = offsetX-maxRect.x*0.3;
    let box = svg
         .append("g")
         .attr('class', 'tiny-node')
         .attr("data-id", id)
         .attr("transform",
            function(d, i) { return "translate(" + boxOffsetX + "," + offsetY + ")"; }
          );

    box.attr("style", "cursor:pointer;");

    box.append("rect")
        .attr("x", "0")
        .attr("y", 0.35*base)
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("fill", "white")
        .attr("style", "stroke:black;stroke-width:0.5;opacity:0.3;")
        .attr("width", 0.2*base)
        .attr("height", 0.2*base);

    box.append("image")
        .attr("preserveAspectRatio", "none")
        .attr("x", "0")
        .attr("y", 0.35*base)
        .attr("height", 0.2*base)
        .attr("width", 0.2*base)
        .attr("xlink:href", imgUrlMen);

    box.append("rect")
        .attr("x", "0")
        .attr("y", "0")
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("fill", "white")
        .attr("style", "stroke:black;stroke-width:0.5;opacity:0.3;")
        .attr("width", 0.2*base)
        .attr("height", 0.2*base);

    box.append("image")
        .attr("preserveAspectRatio", "none")
        .attr("height", 0.2*base)
        .attr("width", 0.2*base)
        .attr("xlink:href", imgUrlWomen);

    // connect with line
    let lineFunction = d3.svg.line()
                     .x(function(d) { return offsetX - 0.3*base + d.x; })
                     .y(function(d) { return offsetY + d.y; });

    // adjustable to rect size
    let lineData1 = [
            { "x": 0.2*base,
              "y": 0.1*base
            },
            { "x": 0.25*base,
              "y": 0.1*base
            },
            { "x": 0.25*base,
              "y": 0.275*base
            },
            { "x": 0.3*base,
              "y": 0.275*base
            }
        ];

    svg.append("path")
       .attr("d", lineFunction(lineData1))
       .attr("stroke", "gray")
       .attr("stroke-width", 2)
       .attr("fill", "none");

    let lineData2 = [
            { "x": 0.2*base,
              "y": 0.45*base
            },
            { "x": 0.25*base,
              "y": 0.45*base
            },
            { "x": 0.25*base,
              "y": 0.275*base
            },
            { "x": 0.3*base,
              "y": 0.275*base
            }
        ];

    svg.append("path")
       .attr("d", lineFunction(lineData2))
       .attr("stroke", "gray")
       .attr("stroke-width", 2)
       .attr("fill", "none");
}