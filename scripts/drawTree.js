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

var tree = [];
// removing soon
// var data = {"data":[
//   {"id":1, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"萧", "lastName":"王", "children":[4,5,6],"father":2,"mother":3, "spouse": 7, "image":imgUrlMen},
//   {"id":2, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"成", "lastName":"王", "children":[1],"father":null,"mother":null, "spouse":3, "image":imgUrlWomen},
//   {"id":3, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"最", "lastName": "王", "children":[1],"father":8,"mother":9, "spouse":2, "image":imgUrlMen},
//   {"id":4, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"后", "lastName": "王", "children":[],"father":7,"mother":1, "spouse":null, "image":imgUrlWomen},
//   {"id":5, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"天", "lastName": "王", "children":[],"father":7,"mother":1, "spouse":null, "image":imgUrlChild},
//   {"id":6, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"气", "lastName": "李", "children":[10,11],"father":7,"mother":1, "spouse":12, "image":imgUrlWomen},
//   {"id":7, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"美", "lastName": "李", "children":[4,5,6],"father":null,"mother":null, "spouse": 1, "image":imgUrlChild},
//   {"id":8, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"好", "lastName": "王", "children":[3, 14],"father":null,"mother":null, "spouse":9, "image":imgUrlMen},
//   {"id":9, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"吃", "lastName": "王", "children":[3, 14],"father":null,"mother":null, "spouse":8, "image":imgUrlWomen},
//   {"id":10, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"午", "lastName": "李", "children":[],"father":6,"mother":null, "spouse":null, "image":imgUrlChild},
//   {"id":11, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"餐", "lastName": "李", "children":[],"father":6,"mother":null, "spouse":13, "image":imgUrlChild},
//   {"id":12, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"啦", "lastName": "王", "children":[10,11],"father":null,"mother":null, "spouse":6, "image":imgUrlMen},
//   {"id":13, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"有", "lastName": "李", "children":[],"father":null,"mother":null, "spouse":11, "image":imgUrlMen},
//   {"id":14, "gender": "1", "status": "1", "birth": "1992-01-01", "birthPlace": "New York City", "death": null, "dealthPlace": null, "email": "2@3.com", "firstName":"没", "lastName": "王", "children":[],"father":8,"mother":9, "spouse":8, "image":imgUrlChild}
// ]};

// var jj = [{"id":1,"gender":"2","status":"1","birth":"1963-01-01","birthPlace":"紐約","death":null,"dealthPlace":null,"email":"2@3.com","firstName":"月櫻","lastName":"王","children":[4,5,6],"father":2,"mother":3,"spouse":7,"image":"http:\/\/thumbs.dreamstime.com\/m\/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg"},{"id":4,"gender":"1","status":"1","birth":"1992-01-01","birthPlace":"New York City","death":null,"dealthPlace":null,"email":"2@3.com","firstName":"熠榮","lastName":"李","children":[],"father":7,"mother":1,"spouse":"null","image":"http:\/\/thumbs.dreamstime.com\/m\/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg"},{"id":5,"gender":"1","status":"1","birth":"1992-01-01","birthPlace":"New York City","death":null,"dealthPlace":null,"email":"2@3.com","firstName":"志榮","lastName":"李","children":[],"father":7,"mother":1,"spouse":"null","image":"https:\/\/thumbsplus.tutsplus.com\/uploads\/users\/135\/posts\/21954\/preview_image\/preview-cartoon-children.jpg?height=300&width=300"},{"id":6,"gender":"1","status":"2","birth":"1992-01-01","birthPlace":"紐約","death":"2016-04-01","dealthPlace":"紐約","email":"2@3.com","firstName":"進榮","lastName":"李","children":[10,11],"father":7,"mother":1,"spouse":12,"image":"http:\/\/thumbs.dreamstime.com\/m\/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg"},{"id":2,"gender":"1","status":"3","birth":"1992-01-01","birthPlace":"台灣","death":null,"dealthPlace":null,"email":"2@3.com","firstName":"増","lastName":"王","children":[1],"father":"null","mother":"null","spouse":3,"image":"http:\/\/thumbs.dreamstime.com\/m\/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg"},{"id":3,"gender":"2","status":"1","birth":"1992-01-01","birthPlace":"紐約","death":null,"dealthPlace":null,"email":"2@3.com","firstName":"柏穎","lastName":"邱","children":[1],"father":8,"mother":9,"spouse":2,"image":"http:\/\/thumbs.dreamstime.com\/m\/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg"},{"id":7,"gender":"1","status":"1","birth":"1992-01-01","birthPlace":"New York City","death":null,"dealthPlace":null,"email":"2@3.com","firstName":"岩松","lastName":"李","children":[4,5,6],"father":"null","mother":"null","spouse":1,"image":"http:\/\/thumbs.dreamstime.com\/m\/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg"},{"id":10,"gender":"1","status":"1","birth":"1992-01-01","birthPlace":"New York City","death":null,"dealthPlace":null,"email":"2@3.com","firstName":"敏長","lastName":"李","children":[],"father":6,"mother":12,"spouse":"null","image":"https:\/\/thumbsplus.tutsplus.com\/uploads\/users\/135\/posts\/21954\/preview_image\/preview-cartoon-children.jpg?height=300&width=300"},{"id":11,"gender":"1","status":"1","birth":"1992-01-01","birthPlace":"New York City","death":null,"dealthPlace":null,"email":"2@3.com","firstName":"敏清","lastName":"李","children":[],"father":6,"mother":12,"spouse":13,"image":"https:\/\/thumbsplus.tutsplus.com\/uploads\/users\/135\/posts\/21954\/preview_image\/preview-cartoon-children.jpg?height=300&width=300"},{"id":12,"gender":"2","status":"1","birth":"1992-01-01","birthPlace":"紐約","death":null,"dealthPlace":null,"email":"2@3.com","firstName":"衍宏","lastName":"王","children":[10,11],"father":"null","mother":"null","spouse":6,"image":"http:\/\/thumbs.dreamstime.com\/m\/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg"},{"id":8,"gender":"1","status":"1","birth":"1766-01-01","birthPlace":"紐約","death":null,"dealthPlace":null,"email":"2@3.com","firstName":"信志","lastName":"邱","children":[3,14],"father":"null","mother":"null","spouse":9,"image":"http:\/\/thumbs.dreamstime.com\/m\/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg"},{"id":9,"gender":"2","status":"2","birth":"1992-01-01","birthPlace":"New York City","death":null,"dealthPlace":null,"email":"2@3.com","firstName":"慶芳","lastName":"林","children":[3,14],"father":"null","mother":"null","spouse":8,"image":"http:\/\/thumbs.dreamstime.com\/m\/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg"}];

var centerX = $(window).width()/2+200,
    centerY = $(window).height()/2+200,
    marginX = 150,
    marginY = 50;

var id = 1;

$("svg").draggable();
// draw(jj);
// lets start from here ...
d3.json("http://192.168.1.220/d3/php/view.php?userid=" + id, draw);

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
          drawTiny(nodeFather.offsetX, nodeFather.offsetY);
        }
        ret.push({'obj':objFather, 'node': nodeFather});
      }
      if (obj.mother == null) {
        objMother = null;
      } else {
        objMother = tree[obj.mother];
        nodeMother = drawNode(objMother, node.offsetX + marginX*ratio, node.offsetY - maxRect.y - marginY);
        if (objMother != undefined && objMother.children != undefined && objMother.children.length>1 && preview == true) {
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
      if (obj != undefined && obj.spouse != undefined && obj.spouse != null) {

        let objSpouse = tree[obj.spouse];

        nodeSpouse = objSpouse.node;
        if (objSpouse.node == null) {
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
    nodeSpouse  = drawNode(objSpouse, nodeMe.offsetX + 1*marginX, nodeMe.offsetY);
  }
  // Layer 1
  let initialArr;
  initialArr = [ {'node':nodeMe, 'obj':objMe}, {'node': nodeSpouse, 'obj': objSpouse}];
  let layer1Arr = drawParentsLayerAndConnect(initialArr, tree, 1, true);

  // Layer 2
  drawParentsLayerAndConnect(layer1Arr, tree, 0.5, true);

  // Layer -1
  let layerN1Arr = drawChildrenLayerAndConnect(initialArr, tree, 1, false);

  // console.log(layerN1Arr);
  // Layer -2
  drawChildrenLayerAndConnect(layerN1Arr, tree, 1, true);
  $(document).trigger('DATA_LOADED');
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

    if (obj.father != null)
        obj.sibling = tree[obj.father].children;
      else if (obj.mother != null)
        obj.sibling = tree[obj.mother].children;
      else
        obj.sibling = [];

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
function drawTiny(offsetX, offsetY){
    let base = maxRect.x;
    let boxOffsetX = offsetX-maxRect.x*0.3;
    let box = svg
         .append("g")
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