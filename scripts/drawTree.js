// this file serves to create family tree with D3
// originally written and tested with traceur,
// but should be compatible with native ES6
// please use traceur compiler for safty purposes


// svg is the base for drawing d3 objects
var svg = d3.select("body").append("svg"),
    maxRect = { x: 100, y: 130},
    maxIcon = { x: maxRect.x, y: maxRect.x},
    imgUrlMen = "http://thumbs.dreamstime.com/m/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg",
    imgUrlWomen = "http://thumbs.dreamstime.com/m/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg",
    imgUrlChild = "https://thumbsplus.tutsplus.com/uploads/users/135/posts/21954/preview_image/preview-cartoon-children.jpg?height=300&width=300";

var svg = d3.select('svg')
            .attr('height', $(window).height()*3)
            .attr('width', $(window).width()*2);

// removing soon
var data = {"data":[
  {"id":1, "gender": "male", "status": "none", "birth": "1992-1-1", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"萧", "lastName":"王", "children":[4,5,6],"father":2,"mother":3, "spouse": 7, "image":imgUrlMen},
  {"id":2, "gender": "male", "status": "none", "birth": "1992-1-1", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"成", "lastName":"王", "children":[1],"father":null,"mother":null, "spouse":3, "image":imgUrlWomen},
  {"id":3, "gender": "male", "status": "none", "birth": "1992-1-1", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"最", "lastName": "王", "children":[1],"father":8,"mother":9, "spouse":2, "image":imgUrlMen},
  {"id":4, "gender": "male", "status": "none", "birth": "1992-1-1", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"后", "lastName": "王", "children":[],"father":7,"mother":1, "spouse":null, "image":imgUrlWomen},
  {"id":5, "gender": "male", "status": "none", "birth": "1992-1-1", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"天", "lastName": "王", "children":[],"father":7,"mother":1, "spouse":null, "image":imgUrlChild},
  {"id":6, "gender": "male", "status": "none", "birth": "1992-1-1", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"气", "lastName": "李", "children":[10,11],"father":7,"mother":1, "spouse":12, "image":imgUrlWomen},
  {"id":7, "gender": "male", "status": "none", "birth": "1992-1-1", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"美", "lastName": "李", "children":[4,5,6],"father":null,"mother":null, "spouse": 1, "image":imgUrlChild},
  {"id":8, "gender": "male", "status": "none", "birth": "1992-1-1", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"好", "lastName": "王", "children":[3, 14],"father":null,"mother":null, "spouse":9, "image":imgUrlMen},
  {"id":9, "gender": "male", "status": "none", "birth": "1992-1-1", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"吃", "lastName": "王", "children":[3, 14],"father":null,"mother":null, "spouse":8, "image":imgUrlWomen},
  {"id":10, "gender": "male", "status": "none", "birth": "1992-1-1", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"午", "lastName": "李", "children":[],"father":6,"mother":null, "spouse":null, "image":imgUrlChild},
  {"id":11, "gender": "male", "status": "none", "birth": "1992-1-1", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"餐", "lastName": "李", "children":[],"father":6,"mother":null, "spouse":13, "image":imgUrlChild},
  {"id":12, "gender": "male", "status": "none", "birth": "1992-1-1", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"啦", "lastName": "王", "children":[10,11],"father":null,"mother":null, "spouse":6, "image":imgUrlMen},
  {"id":13, "gender": "male", "status": "none", "birth": "1992-1-1", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"有", "lastName": "李", "children":[],"father":null,"mother":null, "spouse":11, "image":imgUrlMen},
  {"id":14, "gender": "male", "status": "none", "birth": "1992-1-1", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"没", "lastName": "王", "children":[],"father":8,"mother":9, "spouse":8, "image":imgUrlChild}
]};

var centerX = $(window).width()/2+200,
    centerY = $(window).height()/2+200,
    marginX = 150,
    marginY = 50;

var id = 1;
$("svg").draggable();

// lets start from here ...
draw(1, data.data);

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

      if (obj.father == null) {
        objFather = null;
      } else {
        objFather = tree[obj.father];
        nodeFather = drawNode(objFather, node.offsetX - marginX*ratio, node.offsetY - maxRect.y - marginY);

        if (objFather.children.length>1 && preview == true) {
          drawTiny(nodeFather.offsetX, nodeFather.offsetY);
        }
        ret.push({'obj':objFather, 'node': nodeFather});
      }
      if (obj.mother == null) {
        objMother = null;
      } else {
        objMother = tree[obj.mother];
        nodeMother = drawNode(objMother, node.offsetX + marginX*ratio, node.offsetY - maxRect.y - marginY);
        if (objMother.children.length>1 && preview == true) {
          drawTiny(nodeMother.offsetX, nodeMother.offsetY);
        }
        ret.push({'obj': objMother, 'node': nodeMother});
      }
      connectWithParents(nodeFather, nodeMother, node);
  }
  // console.log(ret);
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
          // console.log('visited: ');
          // console.log(visited);
          return -1;
      }

      visited.push(obj.id);

      let spouseOffsetX = node.offsetX;
      if (obj.spouse != null) {
        let objSpouse = tree[obj.spouse];
        nodeSpouse = objSpouse.node;
        if (obj.spouse != null && objSpouse.node == null) {
          nodeSpouse = drawNode(objSpouse, node.offsetX + marginX*ratio, node.offsetY);
          spouseOffsetX = nodeSpouse.offsetX;
        }
        visited.push(obj.spouse);
      }
      // first check obj exists
      if (obj == null)
        return -1;

      // the children array is defined and has at least one element
      if (typeof obj.children !== 'undefined' && obj.children.length > 0) {
        childrenArrayLength = obj.children.length;
        let i = childrenArrayLength/2*(-1);
        for (let child_id of obj.children) {
          childObj = tree[child_id];
          childNode = drawNode(childObj, (node.offsetX + spouseOffsetX)/2 + i*marginX*ratio, node.offsetY + maxRect.y + marginY);
          if (preview == true && childObj.spouse != null) {
              drawTiny(childNode.offsetX, childNode.offsetY);
          }
          ret.push({'obj':childObj, 'node': childNode});

          connectWithParents(node, nodeSpouse, childNode);

          i++;
        }
      }

  });
  // console.log(ret);
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
 * @param id       main node's id
 * @param data     complete json of all nodes
 * @return
 */
function draw(id, data) {
  let tree = [];
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
  let nodeSpouse  = drawNode(objSpouse, nodeMe.offsetX + 4*marginX, nodeMe.offsetY);

  // Layer 1
  let initialArr;
  initialArr = [ {'node':nodeMe, 'obj':objMe}, {'node': nodeSpouse, 'obj': objSpouse}];
  let layer1Arr = drawParentsLayerAndConnect(initialArr, tree, 1, true);

  // Layer 2
  drawParentsLayerAndConnect(layer1Arr, tree, 0.5, true);

  // Layer -1
  let layerN1Arr = drawChildrenLayerAndConnect(initialArr, tree, 2, true);

  // console.log(layerN1Arr);
  // Layer -2
  drawChildrenLayerAndConnect(layerN1Arr, tree, 1, true);
}


$("myClickBox").on("click", function(){


});

/**
 * based on obj and pre-defined offsetX, offsetY, draw and return node
 * @param obj
 * @param offsetX
 * @param offsetY
 * @return node
 */
function drawNode(obj, offsetX, offsetY) {
    if (obj == null) {
      // console.log("inside drawNode:" + obj);
      return -1;
    }
    let name = obj.firstName + ' ' + obj.lastName;
    let imgUrl = obj.image;
    let box = svg
         .append("g")
         .attr("transform",
            function(d, i) { return "translate(" + offsetX + "," + offsetY + ")"; }
          );

    box.attr("class", "node")
        .attr("style", "cursor:pointer;")
        .attr("data-target", "#node-modal")
        .attr("data-toggle", "modal")
        .attr("data-name", name)
        .attr("data-img", imgUrl)
        .attr("data-firstName", obj.firstName)
        .attr("data-lastName", obj.lastName)
        .attr("data-gender", obj.gender)
        .attr("data-status", obj.status)
        .attr("data-birth", obj.birth)
        .attr("data-birthPlace", obj.birthPlace)
        .attr("data-death", obj.death)
        .attr("data-deathPlace", obj.deathPlace)
        .attr("data-email", obj.email);

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
function drawTiny(offsetX, offsetY){
    let base = maxRect.x;
    let boxOffsetX = offsetX-maxRect.x*0.3;
    let box = svg
         .append("g")
         .attr("transform",
            function(d, i) { return "translate(" + boxOffsetX + "," + offsetY + ")"; }
          );

    box.attr("data-target", ".bs-example-modal-sm")
       .attr("class", "myClickBox")
       .attr("style", "cursor:pointer;")
       .attr("data-toggle", "modal");

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