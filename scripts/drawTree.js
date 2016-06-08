"use strict";
var svg,
    rect,
    maxRect = {
      x: 100,
      y: 130
    },
    maxIcon = {
      x: maxRect.x,
      y: maxRect.x
    },
    imgUrlMen = "http://thumbs.dreamstime.com/m/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg",
    imgUrlWomen = "http://thumbs.dreamstime.com/m/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg",
    imgUrlChild = "https://thumbsplus.tutsplus.com/uploads/users/135/posts/21954/preview_image/preview-cartoon-children.jpg?height=300&width=300";
var apiUrl = "http://homestead.app/wp-content/plugins/family-tree/php/";
var tree = [];
var w = $('.family-tree').width(),
    h = $('.family-tree').height(),
    centerX = w / 2 + 250,
    centerY = 400,
    marginX = 150,
    marginY = 50;
var zoom = d3.behavior.zoom().scaleExtent([0.5, 1]).scale(.7).center([centerX, centerY]).on("zoom", zoomed);
var margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
var id = 1;
$.getJSON((apiUrl + "/getid.php"), function(e) {
  if (e.id) {
    id = e.id;
  }
  mainDraw(id);
});
function mainDraw(id2) {
  id = id2;
  d3.select("svg").remove();
  var container = ".family-tree .container";
  svg = d3.select(container).append("svg").attr('data-viewed-id', id).attr('height', h).attr('width', w).call(zoom).append("g").attr("transform", "translate(" + margin.left + "," + margin.right + ") scale(0.7)");
  d3.json((apiUrl + "/view.php?userid=" + id), draw);
}
function connectWithParents(fatherNode, motherNode, nodeX) {
  connectLine(fatherNode, nodeX);
  connectLine(motherNode, nodeX);
}
function connectLine(parentNode, childNode) {
  if (parentNode == null) {
    return -1;
  }
  var lineFunction = d3.svg.line().x(function(d) {
    return d.x;
  }).y(function(d) {
    return d.y;
  });
  var lineData = [{
    "x": parentNode.offsetX + maxRect.x / 2,
    "y": parentNode.offsetY + maxRect.y
  }, {
    "x": parentNode.offsetX + maxRect.x / 2,
    "y": (parentNode.offsetY + maxRect.y + childNode.offsetY) / 2
  }, {
    "x": childNode.offsetX + maxRect.x / 2,
    "y": (parentNode.offsetY + maxRect.y + childNode.offsetY) / 2
  }, {
    "x": childNode.offsetX + maxRect.x / 2,
    "y": childNode.offsetY
  }];
  svg.append("path").attr("d", lineFunction(lineData)).attr("stroke", "gray").attr("stroke-width", 2).attr("fill", "none");
}
function connectSpouse(nodeLeft, nodeRight) {
  var lineFunction = d3.svg.line().x(function(d) {
    return d.x;
  }).y(function(d) {
    return d.y;
  });
  var lineData = [{
    "x": nodeLeft.offsetX + maxRect.x,
    "y": nodeLeft.offsetY + maxRect.y / 2
  }, {
    "x": nodeRight.offsetX,
    "y": nodeLeft.offsetY + maxRect.y / 2
  }];
  svg.append("path").attr("d", lineFunction(lineData)).attr("stroke", "gray").attr("stroke-width", 2).attr("fill", "none");
}
function drawParentsLayerAndConnect(arr, tree, ratio) {
  var preview = arguments[3] !== (void 0) ? arguments[3] : false;
  var ret = [];
  var obj,
      node;
  var $__4 = true;
  var $__5 = false;
  var $__6 = undefined;
  try {
    for (var $__2 = void 0,
        $__1 = (arr)[Symbol.iterator](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
      var entry = $__2.value;
      {
        obj = entry.obj;
        node = entry.node;
        if (obj == null)
          return [];
        var objFather = void 0,
            objMother = void 0,
            nodeFather = void 0,
            nodeMother = void 0;
        if (obj.father != undefined && obj.father == null) {
          objFather = null;
        } else {
          objFather = tree[obj.father];
          nodeFather = drawNode(objFather, node.offsetX - marginX * ratio, node.offsetY - maxRect.y - marginY);
          if (objFather != undefined && objFather.children != undefined && (objFather.children.length > 1 || objFather.father != null || objFather.mother != null || objFather.spouse != null) && preview == true) {
            drawTiny(nodeFather.offsetX, nodeFather.offsetY, objFather.id);
          }
          ret.push({
            'obj': objFather,
            'node': nodeFather
          });
        }
        if (obj.mother == null) {
          objMother = null;
        } else {
          objMother = tree[obj.mother];
          nodeMother = drawNode(objMother, node.offsetX + marginX * ratio, node.offsetY - maxRect.y - marginY);
          if (objMother != undefined && objMother.children != undefined && (objMother.children.length > 1 || objMother.father != null || objMother.mother != null || objMother.spouse != null) && preview == true) {
            drawTiny(nodeMother.offsetX, nodeMother.offsetY, objMother.id);
          }
          ret.push({
            'obj': objMother,
            'node': nodeMother
          });
        }
        connectWithParents(nodeFather, nodeMother, node);
      }
    }
  } catch ($__7) {
    $__5 = true;
    $__6 = $__7;
  } finally {
    try {
      if (!$__4 && $__1.return != null) {
        $__1.return();
      }
    } finally {
      if ($__5) {
        throw $__6;
      }
    }
  }
  return ret;
}
function drawChildrenLayerAndConnect(arr, tree, ratio) {
  var preview = arguments[3] !== (void 0) ? arguments[3] : false;
  var ret = [];
  var visited = [];
  var obj,
      node,
      nodeSpouse,
      childObj,
      childNode,
      childrenArrayLength;
  arr.forEach(function(entry) {
    obj = entry.obj;
    node = entry.node;
    if (node == -1 || visited.indexOf(obj.id) != -1) {
      return -1;
    }
    visited.push(obj.id);
    var spouseOffsetX = node.offsetX;
    if (obj != undefined && obj.spouse != undefined && obj.spouse != null) {
      var objSpouse = tree[obj.spouse];
      nodeSpouse = objSpouse.node;
      if (objSpouse.node == null) {
        nodeSpouse = drawNode(objSpouse, node.offsetX + marginX * ratio, node.offsetY);
        if (objSpouse.father || objSpouse.mother || objSpouse.sibling.length >= 0) {
          drawTiny(nodeSpouse.offsetX, nodeSpouse.offsetY, objSpouse.id);
        }
        connectSpouse(node, nodeSpouse);
        spouseOffsetX = nodeSpouse.offsetX;
      }
      visited.push(obj.spouse);
    }
    if (obj == null)
      return -1;
    if ($traceurRuntime.typeof(obj.children) !== undefined && obj.children.length > 0) {
      childrenArrayLength = obj.children.length;
      var i = childrenArrayLength / 2 * (-1);
      var $__4 = true;
      var $__5 = false;
      var $__6 = undefined;
      try {
        for (var $__2 = void 0,
            $__1 = (obj.children)[Symbol.iterator](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
          var child_id = $__2.value;
          {
            childObj = tree[child_id];
            childNode = drawNode(childObj, (node.offsetX + spouseOffsetX) / 2 + i * marginX * ratio, node.offsetY + maxRect.y + marginY);
            if (preview == true && childObj.spouse) {
              drawTiny(childNode.offsetX, childNode.offsetY, childNode.obj.id);
            }
            ret.push({
              'obj': childObj,
              'node': childNode
            });
            connectWithParents(node, nodeSpouse, childNode);
            i++;
          }
        }
      } catch ($__7) {
        $__5 = true;
        $__6 = $__7;
      } finally {
        try {
          if (!$__4 && $__1.return != null) {
            $__1.return();
          }
        } finally {
          if ($__5) {
            throw $__6;
          }
        }
      }
    }
  });
  return ret;
}
function draw(data) {
  var main = data.forEach(function(entry) {
    tree[entry.id] = entry;
    if (entry.id == id) {
      return entry;
    }
  });
  var objMe = tree[id];
  var objSpouse = tree[objMe.spouse];
  var nodeMe = drawNode(objMe, centerX, centerY);
  var nodeSpouse;
  nodeSpouse = drawNode(objSpouse, nodeMe.offsetX + 1 * marginX, nodeMe.offsetY);
  connectSpouse(nodeMe, nodeSpouse);
  if (objSpouse && (objSpouse.sibling.length>1 || objSpouse.father || objSpouse.mother)) {
    drawTiny(nodeSpouse.offsetX, nodeSpouse.offsetY, objSpouse.id);
  }

  drawSibling(nodeMe, -1);

  var initialArr;
  initialArr = [{
    'node': nodeMe,
    'obj': objMe
  }];
  var layer1Arr = drawParentsLayerAndConnect(initialArr, tree, 1, false);

  var current_direction = 1;
  layer1Arr.forEach(function(x) {
    current_direction = (-1) * current_direction;
    drawSibling(x.node, current_direction);
  });

  drawParentsLayerAndConnect(layer1Arr, tree, 0.5, true);
  var layerN1Arr = drawChildrenLayerAndConnect(initialArr, tree, 3, false);
  drawChildrenLayerAndConnect(layerN1Arr, tree, 1, true);
  $(document).trigger('DATA_LOADED');
}
function connectUp(current_node, base_node) {
  var lineFunction = d3.svg.line().x(function(d) {
    return d.x;
  }).y(function(d) {
    return d.y;
  });
  var lineData = [{
    "x": current_node.offsetX + maxRect.x / 2,
    "y": current_node.offsetY
  }, {
    "x": current_node.offsetX + maxRect.x / 2,
    "y": current_node.offsetY - marginY / 2
  }, {
    "x": base_node.offsetX + maxRect.x / 2,
    "y": current_node.offsetY - marginY / 2
  }];
  svg.append("path").attr("d", lineFunction(lineData)).attr("stroke", "gray").attr("stroke-width", 2).attr("fill", "none");
}
function drawSibling(node, direction) {
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
function drawNode(obj, offsetX, offsetY) {
  if (obj == null) {
    return -1;
  }
  var name = obj.lastName + ' ' + obj.firstName;
  var imgUrl = obj.image;
  var box = svg.append("g").attr("transform", function(d, i) {
    return "translate(" + offsetX + "," + offsetY + ")";
  }).attr('id', ("node-" + obj.id));
  box.attr("class", "node").attr("style", "cursor:pointer;").attr("data-target", "#node-modal").attr("data-toggle", "modal").attr("data-name", name);
  if (obj.father != null) {
    obj.sibling = tree[obj.father].children;
  } else if (obj.mother != null)
    obj.sibling = tree[obj.mother].children;
  else
    obj.sibling = [obj.id];
  $(("#node-" + obj.id)).data(obj);
  box.offsetX = offsetX;
  box.offsetY = offsetY;
  box.name = name;
  box.imgUrl = imgUrl;
  box.obj = obj;
  box.append("rect").attr("x", "0").attr("y", "0").attr("rx", 5).attr("ry", 5).attr("fill", "white").attr("style", "stroke:black;stroke-width:2;opacity:0.3;").attr("width", maxRect.x).attr("height", maxRect.y);
  box.append("line").attr("x1", 0).attr("x2", maxRect.x).attr("y1", maxIcon.y).attr("y2", maxIcon.y).attr("stroke", "gray").attr("stroke-width", 2);
  box.append("image").attr("x", "1").attr("y", "1").attr("preserveAspectRatio", "none").attr("height", maxRect.x - 2).attr("width", maxRect.x - 2).attr("xlink:href", imgUrl);
  box.append('text').attr("text-anchor", "middle").attr("x", maxRect.x / 2).attr("y", maxRect.y).attr("dy", "-.35em").attr("fill", "black").attr("font-size", 22).attr("opacity", "1").attr("font-family", "sans-serif").text(name);
  box.on("mouseover", function(d) {
    d3.select(this).transition().delay("100").style("opacity", .5);
  }).on("mouseout", function(d) {
    d3.select(this).transition().delay("100").style("opacity", 1);
  });
  obj.node = box;
  return box;
}
function drawTiny(offsetX, offsetY, id) {
  var base = maxRect.x;
  var boxOffsetX = offsetX - maxRect.x * 0.3;
  var box = svg.append("g").attr('class', 'tiny-node').attr("data-id", id).attr("transform", function(d, i) {
    return "translate(" + boxOffsetX + "," + offsetY + ")";
  });
  box.attr("style", "cursor:pointer;");
  box.append("rect").attr("x", "0").attr("y", 0.35 * base).attr("rx", 1).attr("ry", 1).attr("fill", "white").attr("style", "stroke:black;stroke-width:0.5;opacity:0.3;").attr("width", 0.2 * base).attr("height", 0.2 * base);
  box.append("image").attr("preserveAspectRatio", "none").attr("x", "0").attr("y", 0.35 * base).attr("height", 0.2 * base).attr("width", 0.2 * base).attr("xlink:href", imgUrlMen);
  box.append("rect").attr("x", "0").attr("y", "0").attr("rx", 1).attr("ry", 1).attr("fill", "white").attr("style", "stroke:black;stroke-width:0.5;opacity:0.3;").attr("width", 0.2 * base).attr("height", 0.2 * base);
  box.append("image").attr("preserveAspectRatio", "none").attr("height", 0.2 * base).attr("width", 0.2 * base).attr("xlink:href", imgUrlWomen);
  var lineFunction = d3.svg.line().x(function(d) {
    return offsetX - 0.3 * base + d.x;
  }).y(function(d) {
    return offsetY + d.y;
  });
  var lineData1 = [{
    "x": 0.2 * base,
    "y": 0.1 * base
  }, {
    "x": 0.25 * base,
    "y": 0.1 * base
  }, {
    "x": 0.25 * base,
    "y": 0.275 * base
  }, {
    "x": 0.3 * base,
    "y": 0.275 * base
  }];
  svg.append("path").attr("d", lineFunction(lineData1)).attr("stroke", "gray").attr("stroke-width", 2).attr("fill", "none");
  var lineData2 = [{
    "x": 0.2 * base,
    "y": 0.45 * base
  }, {
    "x": 0.25 * base,
    "y": 0.45 * base
  }, {
    "x": 0.25 * base,
    "y": 0.275 * base
  }, {
    "x": 0.3 * base,
    "y": 0.275 * base
  }];
  svg.append("path").attr("d", lineFunction(lineData2)).attr("stroke", "gray").attr("stroke-width", 2).attr("fill", "none");
}
function zoomed() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
