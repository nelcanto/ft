class NodeModal {
constructor(targetModal) {
    this.targetModal = $(targetModal);
    this.bindEvents();
}

bindEvents() {
    $('.node').on('click', this.onNodeClicked);

    // using arrow function to lexically bind this context to the callback event handler function
    this.targetModal.on('show.bs.modal', (e) => {this.onShowModal(e)});
    $('.btn-edit', this.targetModal).on('click', (e) => {this.onClickEditBtn(e);});
    $('.btn-add-relative', this.targetModal).on('click', (e) => {this.onClickAddRelativeBtn(e);});
    $('.add-relative-pane', this.targetModal).on('click', (e) => {this.onClickAddRelative(e);});
}

showView(view) {
    $('.node-options-pane', this.targetModal).addClass('hidden');
    $('.add-relative-pane', this.targetModal).addClass('hidden');
    $('.add-relative-form-pane', this.targetModal).addClass('hidden');

    switch(view) {
        case 'node-options':
        case 'add-relative':
        case 'add-relative-form':
            $(`.${view}-pane`, this.targetModal).removeClass('hidden');
        default:
        break;
    }
}

onNodeClicked(e) {
    console.log('box clicked');
    console.log($(e.currentTarget));
    console.log($(e.currentTarget).data());
    this.node = $(e.currentTarget).data();

    $('.profile-img', this.targetModal).attr('src', this.node['img']);
    $('.node-name', this.targetModal).text(this.node['name']);
    $('.modal-body', this.targetModal).data('userId', this.node['userId']);
}

onShowModal(e) {
    console.log('a wild popup has appear!');
    console.log(e);
    this.showView('node-options');
}

onClickEditBtn(e) {
    console.log('click edit');
    console.log(e);
    this.showView('add-relative-form');
    
    // Hide create new node H4 title
    $('.add-relative-form-pane h4', this.targetModal).hide();
    
    // Prefill with user info
    /*$('.add-relative-form-pane input[name=firstName]', this.targetModal).text();
    $('.add-relative-form-pane input[name=lastName]', this.targetModal).text();
    $('.add-relative-form-pane input[name=firstName]', this.targetModal).text();
    $('.add-relative-form-pane input[name=firstName]', this.targetModal).text();
    $('.add-relative-form-pane input[name=firstName]', this.targetModal).text();*/
}

onClickAddRelativeBtn(e) {
    console.log('click add relative');
    console.log(e);
    this.showView('add-relative');
}

onClickAddRelative(e) {
    console.log('add relative');
    console.log(e);
    var target = $(e.target);

    if (target.hasClass('list-group-item')) {
        console.log('target is a');
    } else if(target.parent('a.list-group-item')) {
        console.log('target parent is a');
        target = target.parent('a.list-group-item')
    } else {
        console.log('target is not a');
    }

    console.log(`value: ${$(target).data('value')}`);
    this.showView('add-relative-form');
    $('.add-relative-form-pane .relationship', this.targetModal).text(target.text().trim());
  
    switch(true) {
      case target.hasClass('father'):
      console.log('father');
      break;
      case target.hasClass('mother'):
      console.log('mother');
      break;
      case target.hasClass('spouse'):
      console.log('spouse');
      break;
      case target.hasClass('sibling'):
      console.log('sibling');
      break;
      case target.hasClass('child'):
      console.log('child');
      break;
      default:
      console.log('something abnormal has happened');
      break;
    }
}
}