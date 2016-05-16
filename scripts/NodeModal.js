class NodeModal {
    constructor(node) {
        var self = this
        node.on('click', () => {
          self.onBoxClicked(node);
        });
    }

    onBoxClicked(node) {
        console.log('box clicked');
        console.log(node);
        $('#node-modal .profile-img').attr('src', node['imgUrl']);
        $('#node-modal .node-name').text(node['name']);
        $('#modal-body').data('userId', 1);
    }
}