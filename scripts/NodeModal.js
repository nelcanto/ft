class NodeModal {
    constructor(targetModal) {
        this.targetModal = $(targetModal);
        this.apiEndpoint = "http://192.168.1.220/d3/php";
        this.bindEvents();
    }

    bindEvents() {
        // using arrow function to lexically bind this context to the callback event handler function
        $(document).one('DATA_LOADED', e => {
            $('.node').one('click', e => {
                this.onNodeClicked(e);
            });
        });

        this.targetModal.on('show.bs.modal', e => {
            this.onShowModal(e);
        });
        $('.btn-edit', this.targetModal).on('click', e => {
            this.onClickEditBtn(e);
        });
        $('.btn-add-relative', this.targetModal).on('click', e => {
            this.onClickAddRelativeBtn(e);
        });
        $('.add-relative-pane .relationship-list', this.targetModal).on('click', e => {
            this.onClickAddRelative(e);
        });
        $('.add-relative-form-pane [name=status]', this.targetModal).on('change', e => {
            this.onStatusChanged(e);
        });
        $('.add-relative-form-pane', this.targetModal).on('submit', e => {
            this.onFormSubmit(e);
        });
        $('.btn-delete', this.targetModal).on('click', e => {
            this.onClickDeleteBtn(e);
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
        let type = 'edit';
        let formData = this.getFormData();
        let actionEndpoint = '';

        let addRelativeForm = $('.add-relative-form-pane form', this.targetModal);

        if (addRelativeForm.data('action') == 'edit') {
            actionEndpoint = 'update.php';
            //console.log('before edit form data');
            //console.log(formData);
            //console.log('before edit node data');
            //console.log(this.node);
            formData = _.defaults(formData, this.node);
            //console.log('after edit form data');
            //console.log(formData);
        } else {
            actionEndpoint = 'insert.php';
            //console.log('insert');
            let relationshipType = $('.add-relationship-type', addRelativeForm).text().trim();
            formData['father'] = null;
            formData['mother'] = null;
            formData['spouse'] = null;
            formData['children'] = [];
            
            switch(true) {
                case relationshipType == '父亲':
                    formData['spouse'] = this.node.mother;
                    formData['children'] = this.node.sibling;
                    break;
                case relationshipType == '母亲':
                    formData['spouse'] = this.node.father;
                    formData['children'] = this.node.sibling;
                    break;
                case relationshipType == '兄弟、姐妹':
                    formData['mother'] = this.node.mother;
                    formData['father'] = this.node.father;
                    break;
                case relationshipType == '儿女':
                    if (this.node.gender == 1) {
                        formData['father'] = this.node.id;
                        formData['mother'] = this.node.spouse;
                    } else if (this.node.gender == 2) {
                        formData['father'] = this.node.spuse;
                        formData['mother'] = this.node.id;
                    } else {
                        // unknown gender
                        formData['father'] = this.node.id;
                        formData['mother'] = this.node.spouse;
                    }
                    break;
                case relationshipType == '配偶':
                    formData['spouse'] = this.node.id;
                    formData['children'] = this.node.children;
                    break;
                default:
                break;
            }
        }

        $.ajax({
            url: `${this.apiEndpoint}/${actionEndpoint}`,
            data: formData,
            method: 'POST',
            success: (data, status, jqXHR) => {
                console.log(`success.`);
            },
            error: (data, status, jqXHR) => {
                console.log(`error.`);
            }
        });
    }

    getFormData() {
        let form = $('.add-relative-form-pane form', this.targetModal);
        let formFields = [
            'firstName',
            'lastName',
            'gender',
            'status',
            'birth',
            'birthPlace',
            'death',
            'dealthPlace',
            'email'
        ];
        
        let formData = {};
        formFields.forEach((value, key) => {
            //console.log(value + " " + $(`[name=${value}]`, form).val())
            formData[value] = $(`[name=${value}]`, form).val()
        });
        //console.log(formData);
            
        return formData;
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
        console.log($(e));
        this.node = $(e.currentTarget).data();

        $('.profile-img', this.targetModal).attr('src', this.node['image']);
        $('.node-name', this.targetModal).text(this.node['name']);
    }

    onShowModal(e) {
        //console.log('a wild popup has appear!');
        //console.log(e);
        this.showView('node-options');
    }

    onClickDeleteBtn(e) {
        console.log('delete btn clicked');
        $.ajax({
            url: `${this.apiEndpoint}/delete.php`,
            data: {
                userid: this.node['id']
            },
            success: (data, status, jqXHR) => {
                console.log(`user ${this.node['id']} deleted.`);
            },
            error: (data, status, jqXHR) => {
                console.log(`error occured when deleting user ${this.node['id']}.`);
            }
        });
    }

    onClickEditBtn(e) {
        //console.log('click edit');
        //console.log(e);
        this.showView('add-relative-form');
        let relativeFormPane = $('.add-relative-form-pane', this.targetModal);
        // Hide create new node H4 title
        $('h4', relativeFormPane).hide();
        $('form', relativeFormPane).data('action', 'edit');

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
            'dealthPlace': '',
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

        // hide add sibling if node does not have parent
        if (!this.node.father && !this.node.mother) {
            $('.sibling', addRelativePane).hide();
        }

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
        $('h4', relativeFormPane).show();
        $('form', relativeFormPane).data('action', 'add');

        let relativeFormPane = $('.add-relative-form-pane', this.targetModal);
        $('.add-relationship-type', relativeFormPane).text(target.text().trim());
        
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