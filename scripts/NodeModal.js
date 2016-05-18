class NodeModal {
constructor(targetModal) {
    this.targetModal = $(targetModal);
    this.bindEvents();
}

bindEvents() {
    // using arrow function to lexically bind this context to the callback event handler function
    $('.node').on('click', (e) => {this.onNodeClicked(e);});
    this.targetModal.on('show.bs.modal', (e) => {this.onShowModal(e);});
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
    //console.log('box clicked');
    //console.log($(e.currentTarget));
    //console.log($(e.currentTarget).data());
    this.node = $(e.currentTarget).data();

    $('.profile-img', this.targetModal).attr('src', this.node['img']);
    $('.node-name', this.targetModal).text(this.node['name']);
    $('.modal-body', this.targetModal).data('userId', this.node['userId']);
}

onShowModal(e) {
    //console.log('a wild popup has appear!');
    //console.log(e);
    this.showView('node-options');
}

onClickEditBtn(e) {
    //console.log('click edit');
    //console.log(e);
    this.showView('add-relative-form');
    var relativeFormPane = $('.add-relative-form-pane', this.targetModal);
    // Hide create new node H4 title
    $('h4', relativeFormPane).hide();
    this.prefillForm(relativeFormPane, this.node);
}

prefillForm(form, values) {
    var prefill = {
        'firstName': '',
        'lastName': '',
        'gender': 1,
        'status': 1,
        'birth': '',
        'birthPlace': '',
        'death': '',
        'deathPlace': '',
        'email': ''
    };

    let formValues = _.defaults(values, prefill);
    //console.log(formValues);

    _.forOwn(formValues, (value, key) => {
        //console.log(`element: ${key} value: ${value}`)
        if ($(`[name=${key}][type=radio]`, form).length) {
            $(`[name=${key}][type=radio][value=${value}]`, form).prop('checked', true);
            //console.log('check radio');
        } else {
            $(`[name=${key}]`, form).val(value);
            //console.log('set value');
        }
    });
    
}

onClickAddRelativeBtn(e) {
    //console.log('click add relative');
    //console.log(e);
    this.showView('add-relative');
}

onClickAddRelative(e) {
    //console.log('add relative');
    //console.log(e);
    var target = $(e.target);

    if (target.hasClass('list-group-item')) {
        //console.log('target is a');
    } else if(target.parent('a.list-group-item')) {
        //console.log('target parent is a');
        target = target.parent('a.list-group-item')
    } else {
        //console.log('target is not a');
    }

    //console.log(`value: ${$(target).data('value')}`);
    this.showView('add-relative-form');
    var relativeFormPane = $('.add-relative-form-pane', this.targetModal);
    $('.relationship', relativeFormPane).text(target.text().trim());
  
    switch(true) {
      case target.hasClass('father'):
      //console.log('father');
      this.prefillForm(relativeFormPane, {
        // not working
        'lastName': this.node['lastName'],
        'gender': 1,
        'status': 1
      });
      break;
      case target.hasClass('mother'):
      //console.log('mother');
      this.prefillForm(relativeFormPane, {
        'gender': 2,
        'status': 1
      });
      break;
      case target.hasClass('spouse'):
      //console.log('spouse');
      this.prefillForm(relativeFormPane, {
        'gender': (this.node['gender'] == 1 ? 2 : 1),
        'status': 1
      });
      break;
      case target.hasClass('sibling'):
      //console.log('sibling');
      this.prefillForm(relativeFormPane, {
        'lastName': this.node['lastName'],
        'gender': 1,
        'status': 1
      });
      break;
      case target.hasClass('child'):
      //console.log('child');
      this.prefillForm(relativeFormPane, {
        'lastName': this.node['lastName'],
        'gender': 1,
        'status': 1
      });
      break;
      default:
      console.log('something abnormal has happened');
      break;
    }
}
}