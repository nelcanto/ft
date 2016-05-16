var svg = d3.select("body").append("svg"),
    maxRect = { x: 100, y: 130},
    maxIcon = { x: maxRect.x, y: maxRect.x},
    imgUrlMen = "http://thumbs.dreamstime.com/m/profile-icon-male-avatar-man-hipster-style-fashion-cartoon-guy-beard-glasses-portrait-casual-person-silhouette-face-flat-design-62449823.jpg",
    imgUrlWomen = "http://thumbs.dreamstime.com/m/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-illustration-58249368.jpg",
    imgUrlChild = "https://thumbsplus.tutsplus.com/uploads/users/135/posts/21954/preview_image/preview-cartoon-children.jpg?height=300&width=300";
var svg = d3.select('svg')
            .attr('height', 1280)
            .attr('width', 860);

$("svg").draggable();

function drawNode(name, imgUrl, offsetX, offsetY) {
    var box = svg
         .append("g")
         .attr("transform",
            function(d, i) { return "translate(" + offsetX + "," + offsetY + ")"; }
          );

    box.attr("data-target", "#node-modal")
       .attr("data-toggle", "modal");


    box.offsetX = offsetX;
    box.offsetY = offsetY;
    box.name = name;
    box.imgUrl = imgUrl;

    box.append("rect")
        .attr("x", "0")
        .attr("y", "0")
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", "white")
        .attr("style", "stroke:black;stroke-width:2;opacity:0.3")
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
        .attr("preserveAspectRatio", "none")
        .attr("height", maxRect.x)
        .attr("width", maxRect.x)
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
      d3.select(this).style("opacity", .5);
    })
    .on("mouseout", function(d) {
      d3.select(this).style("opacity", 1);
    }) ;

    var nodeModal = new NodeModal(box);

    return box;
}

function connectLine(parent, child) {

    var lineFunction = d3.svg.line()
                     .x(function(d) { return d.x; })
                     .y(function(d) { return d.y; });

    var lineData = [
            { "x": parent.offsetX + maxRect.x/2,
              "y": parent.offsetY + maxRect.y
            },
            { "x": parent.offsetX + maxRect.x/2,
              "y": (parent.offsetY + maxRect.y + child.offsetY)/2
            },
            { "x": child.offsetX + maxRect.x/2,
              "y": (parent.offsetY + maxRect.y + child.offsetY)/2
            },
            { "x": child.offsetX + maxRect.x/2,
              "y": child.offsetY
            }
        ];

    var lineGraph = svg.append("path")
                       .attr("d", lineFunction(lineData))
                       .attr("stroke", "gray")
                       .attr("stroke-width", 2)
                       .attr("fill", "none");
}

var node1 = drawNode('Tom', imgUrlMen, 100, 100);
var node2 = drawNode('Lucy', imgUrlWomen, 250, 100);
var node3 = drawNode('Lauren', imgUrlWomen, 175, 300);
var node4 = drawNode('James', imgUrlMen, 340, 300);
var node5 = drawNode('Daniel', imgUrlChild, 100, 500);
var node6 = drawNode('Judy', imgUrlChild, 250, 500);
var node7 = drawNode('Alex', imgUrlChild, 400, 500);

connectLine(node1, node3);
connectLine(node2, node3);

connectLine(node3, node5);
connectLine(node4, node5);

connectLine(node3, node6);
connectLine(node4, node6);

connectLine(node3, node7);
connectLine(node4, node7);

