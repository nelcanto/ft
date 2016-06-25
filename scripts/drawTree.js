// this file serves to create family tree with D3
// originally written and tested with traceur,
// but should be compatible with native ES6
// please use traceur compiler for safty purposes

// svg is the base for drawing d3 objects
var svg,rect,
    maxRect = { x: 100, y: 130},
    maxIcon = { x: maxRect.x, y: maxRect.x},
    imgUrlMen = "http://thumbs.dreamstime.com/m/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg",
    imgUrlWomen = "http://thumbs.dreamstime.com/m/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg",
    imgUrlChild = "https://thumbsplus.tutsplus.com/uploads/users/135/posts/21954/preview_image/preview-cartoon-children.jpg?height=300&width=300";
var apiUrl = "/wp-content/plugins/family-tree/php";
if(document.location.host=='108.61.159.150')
            apiUrl = 'http://108.61.159.150/~socialmedia'+apiUrl;

var tree = [];

var w = $('.family-tree').width(),
    h = $('.family-tree').height(),
    centerX = w/2+250,
    centerY = 400,
    marginX = 150,
    marginY = 50;

var zoom = d3.behavior.zoom()
    .scaleExtent([0.5, 1])
    .scale(.7)
    .center([centerX, centerY])
    .on("zoom", zoomed);
var margin = {top: 0, right: 0, bottom: 0, left: 0};

// lets start from here ...
var id = 1;
//get current id
$.getJSON(`${apiUrl}/getid.php`, function(e) {
  var wp_id = e.wp_id;
    if (e.id != 0) {
      id = e.id;
      mainDraw(id);
    }
    else{

      $('#content div.family-tree').hide();

      jQuery.post(ajaxurl, {action: 'is_user_logged_in'}, function(response) {
          if(response == 'yes') {
              // user is logged in && no associated ft_id
              $('<div class="ft_assoc_prompt"><button class="btn add_ft_id">Add associated ft_id</button><button class="btn create_ft_id">Create new Family Tree</button></div>').insertAfter('#content div.family-tree');

              $('.add_ft_id').click({wp_id: wp_id},function(e){
                add_ft_id(wp_id); 

              });

              $('.create_ft_id').click({wp_id: wp_id},function(e){
                create_ft_id(wp_id);
                
              });

          } else {
              // user is not logged in
              $('<div class="not_login_msg">Please log in to see you family tree.</div>').insertAfter('#content div.family-tree');
          }
      });






    }

    
    // alert('Result from PHP: ' + e.id);
});
// console.log(id);


function mainDraw(id2) {
  // added a hack to change the global id variable without breaking this code
  // need for drawing a different id tree
  id = id2;
  d3.select("svg").remove();
  let container = ".family-tree .container";
  svg = d3.select(container)
          .append("svg")
          .attr('data-viewed-id', id)
          .attr('height', h)
          .attr('width', w)
          //append zoom
          .call(zoom)

          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.right + ") scale(0.7)");

  d3.json(`${apiUrl}/view.php?userid=${id}`, draw);
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
        return [];

      let objFather,objMother,nodeFather,nodeMother;

      if (obj.father != undefined && obj.father == null) {
        objFather = null;
      } else {
        objFather = tree[obj.father];
        nodeFather = drawNode(objFather, node.offsetX - marginX*ratio, node.offsetY - maxRect.y - marginY);

        if (objFather != undefined && objFather.children != undefined && (objFather.children.length>1 || objFather.father!=null || objFather.mother!=null  || objFather.spouse != null) && preview == true) {
          drawTiny(nodeFather.offsetX, nodeFather.offsetY, objFather.id);
        }
        ret.push({'obj':objFather, 'node': nodeFather});
      }
      if (obj.mother == null) {
        objMother = null;
      } else {
        objMother = tree[obj.mother];
        nodeMother = drawNode(objMother, node.offsetX + marginX*ratio, node.offsetY - maxRect.y - marginY);
        if (objMother != undefined && objMother.children != undefined && (objMother.children.length>1 || objMother.father!=null || objMother.mother!=null || objMother.spouse != null) && preview == true) {
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
      if (node == -1 || visited.indexOf(obj.id) != -1) {
          return -1;
      }

      visited.push(obj.id);

      let spouseOffsetX = node.offsetX;
      if (obj != undefined && obj.spouse != undefined && obj.spouse != null) {

        let objSpouse = tree[obj.spouse];

        nodeSpouse = objSpouse.node;
        if (objSpouse.node == null) {
          nodeSpouse = drawNode(objSpouse, node.offsetX + marginX*ratio, node.offsetY);
          if (objSpouse.father || objSpouse.mother || objSpouse.sibling.length >= 0) {
              drawTiny(nodeSpouse.offsetX, nodeSpouse.offsetY, objSpouse.id);
          }
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
          if (preview == true && childObj.spouse) {
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

  nodeSpouse  = drawNode(objSpouse, nodeMe.offsetX + 1*marginX, nodeMe.offsetY);
  connectSpouse(nodeMe, nodeSpouse);

  if (objSpouse && (objSpouse.sibling.length || objSpouse.father || objSpouse.mother)) {
    drawTiny(nodeSpouse.offsetX, nodeSpouse.offsetY, objSpouse.id);
  }

  drawSibling(nodeMe, -1);

  // Layer 1
  let initialArr;

  initialArr = [ {'node':nodeMe, 'obj':objMe}];
  let layer1Arr = drawParentsLayerAndConnect(initialArr, tree, 1, false);
  let current_direction = 1;
  layer1Arr.forEach(function(x) {
    current_direction = (-1) * current_direction;
    drawSibling(x.node, current_direction);
  });
  // Layer 2
  drawParentsLayerAndConnect(layer1Arr, tree, 0.5, true);

  // Layer -1
  let layerN1Arr = drawChildrenLayerAndConnect(initialArr, tree, 3, false);

  // Layer -2
  drawChildrenLayerAndConnect(layerN1Arr, tree, 1, true);
  $(document).trigger('DATA_LOADED');
}

/**
 * draw line when creating siblings.
 * @param current_node    current sibling node
 * @param base_node       base node of this layer
 * @return
 */
function connectUp(current_node, base_node) {

    let lineFunction = d3.svg.line()
                     .x((d) => { return d.x; })
                     .y((d) => { return d.y; });

    let lineData = [
            { "x": current_node.offsetX + maxRect.x/2,
              "y": current_node.offsetY
            },
            { "x": current_node.offsetX + maxRect.x/2,
              "y": current_node.offsetY - marginY/2
            },
            { "x": base_node.offsetX + maxRect.x/2,
              "y": current_node.offsetY - marginY/2
            }
        ];

    svg.append("path")
       .attr("d", lineFunction(lineData))
       .attr("stroke", "gray")
       .attr("stroke-width", 2)
       .attr("fill", "none");
}

/**
 * Draw sibling of current node.
 * @param node       current node
 * @param direction  left:-1 or right:1
 * @return
 */
function drawSibling(node, direction) {
  if (node == null || node.obj == undefined) {
    return -1;
  }
  var current_node = node;
  var current_spouse_node;
  console.log(node.obj);
  var sibling_arr = node.obj.sibling;

  sibling_arr.forEach(function(x) {
    if (x != node.obj.id) {
      if (tree[x].spouse) {
        var spouseObj = tree[tree[x].spouse];
        current_spouse_node = drawNode(spouseObj, current_node.offsetX + direction * marginX, current_node.offsetY);
        current_node = drawNode(tree[x], current_node.offsetX + direction * marginX * 2, current_node.offsetY);
        if (direction < 0) {
          connectSpouse(current_node, current_spouse_node);
        } else {
          connectSpouse(current_spouse_node, current_node);
        }
        connectUp(current_node, node);
        if (tree[x].children.length > 0) {
          drawTiny(current_node.offsetX, current_node.offsetY, tree[x].id);
        }
        if (spouseObj.children.length > 0 || spouseObj.sibling.length > 0 || spouseObj.father || spouseObj.mother) {
          drawTiny(current_spouse_node.offsetX, current_spouse_node.offsetY, spouseObj.id);
        }
      } else {
        current_node = drawNode(tree[x], current_node.offsetX + direction * marginX, current_node.offsetY);
        connectUp(current_node, node);
        if (tree[x].children.length > 0) {
          drawTiny(current_node.offsetX, current_node.offsetY, tree[x].id);
        }
      }
    }
  });
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
 * @param id
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

/*
 * zoom ft
 */
function zoomed() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}


function create_ft_id(wp_id){
  $.ajax({
      url: `${apiUrl}/insert_uinfo.php`,
      data: {
          wp_id: wp_id
      },
      success: (data, status, jqXHR) => {
          if(data) {
            // id = data;
            mainDraw(data);
            $('div.ft_assoc_prompt').remove();
            $('#content div.family-tree').show();
          }
      },
      error: (data, status, jqXHR) => {
          console.log(`error occured when creating ft_uinfo id`);
      }
  });
}

function add_ft_id(wp_id){
  var ft_id = prompt('Enter family tree user id:');
  if(ft_id){
    $.ajax({
        url: `${apiUrl}/connect_wp_user.php`,
        data: {
            ft_id: ft_id,
            wp_id: wp_id
        },
        success: (data, status, jqXHR) => {
            if(data == 1){
              // id = ft_id;
              mainDraw(ft_id);
              $('div.ft_assoc_prompt').remove();
              $('#content div.family-tree').show();
            }
            else{
              //ft_id is already being used
              alert(data);
            }
        },
        error: (data, status, jqXHR) => {
            console.log(`error occured when connecting wpid to ftid`);
        }
    });

  }
  else{
    alert("no valid ft_id");
  }
}

