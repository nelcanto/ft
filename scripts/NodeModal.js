class NodeModal {
    constructor(targetModal) {
        this.targetModal = $(targetModal);
        this.bindEvents();
    }

    bindEvents() {
        // using arrow function to lexically bind this context to the callback event handler function
        $('.node').on('click', (e) => {
            this.onNodeClicked(e);
        });
        this.targetModal.on('show.bs.modal', (e) => {
            this.onShowModal(e);
        });
        $('.btn-edit', this.targetModal).on('click', (e) => {
            this.onClickEditBtn(e);
        });
        $('.btn-add-relative', this.targetModal).on('click', (e) => {
            this.onClickAddRelativeBtn(e);
        });
        $('.add-relative-pane', this.targetModal).on('click', (e) => {
            this.onClickAddRelative(e);
        });
        $('.add-relative-form-pane [name=status]', this.targetModal).on('change', (e) => {
            this.onStatusChanged(e);
        });
        $('.add-relative-form-pane', this.targetModal).on('submit', (e) => {
            this.onFormSubmit(e);
        });
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
                break;
            default:
            break;
        }
    }

    onFormSubmit(e) {
        console.log('submit form');
        let url = "http://192.168.1.220/d3/php/mysql_to_json.php";
        /*$.ajax({
            url: url,
            method: 'POST', // PUT for update
            data: {
                'some': 'data'
            },
            success: (data, status, jqXHR) => {

            }.
            error: (data, status, jqXHR) => {

            }
        });*/
    }

    onStatusChanged(e) {
        console.log(`status changed to ${$(e.currentTarget).val()}`);
        if ($(e.currentTarget).val() == 2) {
            $('.add-relative-form-pane [name=birth]', this.targetModal).parents('.row').hide();
            $('.add-relative-form-pane [name=death]', this.targetModal).parents('.row').show();
        } else {
            $('.add-relative-form-pane [name=birth]', this.targetModal).parents('.row').show();
            $('.add-relative-form-pane [name=death]', this.targetModal).parents('.row').hide();
        }
    }

    onNodeClicked(e) {
        //console.log('box clicked');
        //console.log($(e.currentTarget));
        //console.log($(e.currentTarget).data());
        this.node = $(e.currentTarget).data();

        $('.profile-img', this.targetModal).attr('src', this.node['image']);
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
        let relativeFormPane = $('.add-relative-form-pane', this.targetModal);
        // Hide create new node H4 title
        $('h4', relativeFormPane).hide();
        this.prefillForm(relativeFormPane, this.node);
    }

    prefillForm(form, values) {
        let prefill = {
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
                $(`[name=${key}][type=radio][value=${value}]`, form).trigger('change');
                //console.log('check radio');
            } else {
                $(`[name=${key}]`, form).val(value);
                $(`[name=${key}]`, form).trigger('change');
                //console.log('set value');
            }
        });
        
    }

    onClickAddRelativeBtn(e) {
        //console.log('click add relative');
        //console.log(e);
        this.showView('add-relative');

        let addRelativePane = $('.add-relative-pane', this.targetModal);
        console.log(this.node['father']);
        let relationships = [
            'father',
            'mother',
            'spouse'
        ];

        // show all relationships
        $('.list-group-item', addRelativePane).show();

        // hide the relationships the current node already has
        relationships.forEach((value, key) => {
            if (this.node[value]) {
                $(`.${value}`, addRelativePane).hide();
            }
        });
    }

    onClickAddRelative(e) {
        //console.log('add relative');
        //console.log(e);
        let target = $(e.target);

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
        let relativeFormPane = $('.add-relative-form-pane', this.targetModal);
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