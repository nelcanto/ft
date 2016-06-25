class NodeModal {
    constructor(targetModal) {
        this.targetModal = $(targetModal);
        this.apiEndpoint = "/wp-content/plugins/family-tree/php/";
        if(document.location.host=='108.61.159.150')
            this.apiEndpoint = 'http://108.61.159.150/~socialmedia'+this.apiEndpoint;
        this.bindEvents();
    }

    bindEvents() {
        // using arrow function to lexically bind this context to the callback event handler function
        $(document).on('DATA_LOADED', e => {
            $('.node').on('click', e => {
                this.onNodeClicked(e);
            });
            $('.tiny-node').on('click', e => {
                this.onTinyNodeClicked(e);
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
        $('.btn-view-tree', this.targetModal).on('click', e => {
            this.onClickViewTreeBtn(e);
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
                $(`.${view}-pane`, this.targetModal).removeClass('hidden');
                $('.profile-image-container', this.targetModal).removeClass('editable');
                break;
            case 'add-relative-form':
                $(`.${view}-pane`, this.targetModal).removeClass('hidden');
                $('.profile-image-container', this.targetModal).addClass('editable');
                break;
            default:
            break;
        }
    }

    onFormSubmit(e) {
        let type = 'edit';
        let formData = this.getFormData();
        let actionEndpoint = '';

        let addRelativeForm = $('.add-relative-form-pane form', this.targetModal);

        if (addRelativeForm.data('action') == 'edit') {
            actionEndpoint = 'update.php';
            formData = _.defaults(formData, this.node);
        } else {
            actionEndpoint = 'insert.php';
            let relationshipType = $('.add-relative-form-pane .add-relationship-type', this.targetModal).text().trim();
            formData['father'] = null;
            formData['mother'] = null;
            formData['spouse'] = null;
            formData['children'] = [];
            switch(true) {
                case relationshipType == '父亲':
                    formData['spouse'] = this.node.mother;
                    formData['children'] = _.union(this.node.sibling, [this.node.id]);
                    break;
                case relationshipType == '母亲':
                    formData['spouse'] = this.node.father;
                    formData['children'] = _.union(this.node.sibling, [this.node.id]);
                    break;
                case relationshipType == '兄弟、姐妹':
                    formData['mother'] = this.node.mother;
                    formData['father'] = this.node.father;
                    break;
                case relationshipType == '儿女':
                    if (this.node.gender == 1) {
                        formData['father'] = this.node.id;
                        formData['mother'] = (this.node.spouse ? this.node.spouse : null);
                    } else if (this.node.gender == 2) {
                        formData['father'] = (this.node.spouse ? this.node.spouse : null);
                        formData['mother'] = this.node.id;
                    } else {
                        // unknown gender
                        formData['father'] = this.node.id;
                        formData['mother'] = (this.node.spouse ? this.node.spouse : null);
                    }
                    break;
                case relationshipType == '配偶':
                    formData['spouse'] = this.node.id;
                    formData['children'] = this.node.children;
                    break;
                default:
                console.log('WRONG');
                break;
            }
        }
        $.ajax({
            url: `${this.apiEndpoint}/${actionEndpoint}`,
            data: formData,
            method: 'POST',
            success: (data, status, jqXHR) => {
                mainDraw($('svg').data('viewed-id'));
                this.targetModal.modal('hide');
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
            'email',
            'image'
        ];

        let formData = {};
        formFields.forEach((value, key) => {
            //console.log(value + " " + $(`[name=${value}]`, form).val())
            if ($(`[name=${value}]:checked`, form).length) {
                formData[value] = $(`[name=${value}]:checked`, form).val()
            } else {
                formData[value] = $(`[name=${value}]`, form).val()
            }
        });

        return formData;
    }

    onStatusChanged(e) {
        //console.log(`status changed to ${$(e.currentTarget).val()}`);
        if ($(e.currentTarget).val() == 2) {
            $('.add-relative-form-pane [name=birth]', this.targetModal).parents('.row').hide();
            $('.add-relative-form-pane [name=death]', this.targetModal).parents('.row').show();
        } else {
            $('.add-relative-form-pane [name=birth]', this.targetModal).parents('.row').show();
            $('.add-relative-form-pane [name=death]', this.targetModal).parents('.row').hide();
        }
    }

    onNodeClicked(e) {
        this.node = $(e.currentTarget).data();

        $('[name=uid]', this.targetModal).val(this.node['id']);
        $('.profile-img', this.targetModal).attr('src', this.node['image']);
        $('.node-name', this.targetModal).text(this.node['name']);
    }

    onTinyNodeClicked(e) {
        this.node = $(e.currentTarget).data();
        mainDraw(this.node.id);
    }

    onShowModal(e) {
        this.showView('node-options');
    }

    onClickViewTreeBtn(e) {
        mainDraw(this.node.id);
    }

    onClickDeleteBtn(e) {
                $.ajax({
            url: `${this.apiEndpoint}/delete.php`,
            data: {
                userid: this.node['id']
            },
            success: (data, status, jqXHR) => {
                mainDraw($('svg').data('viewed-id'));
            },
            error: (data, status, jqXHR) => {
                console.log(`error occured when deleting user ${this.node['id']}.`);
            }
        });
    }

    onClickEditBtn(e) {
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

        _.forOwn(formValues, (value, key) => {
            if ($(`[name=${key}][type=radio]`, form).length) {
                $(`[name=${key}][type=radio][value=${value}]`, form).prop('checked', true);
                $(`[name=${key}][type=radio][value=${value}]`, form).trigger('change');
            } else {
                $(`[name=${key}]`, form).val(value);
                $(`[name=${key}]`, form).trigger('change');
            }
        });

    }

    onClickAddRelativeBtn(e) {
        this.showView('add-relative');

        let addRelativePane = $('.add-relative-pane', this.targetModal);

        let relationships = [
            'father',
            'mother',
            'spouse'
        ];

        // show all relationships
        $('.list-group-item', addRelativePane).show();
        //
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
        let target = $(e.target);

        if (target.hasClass('list-group-item')) {
        } else if(target.parent('a.list-group-item')) {
            target = target.parent('a.list-group-item')
        } else {
        }

        this.showView('add-relative-form');
        $('h4', relativeFormPane).show();
        $('form', relativeFormPane).data('action', 'add');

        let relativeFormPane = $('.add-relative-form-pane', this.targetModal);
        $('.add-relationship-type', relativeFormPane).text(target.text().trim());
        $('.node-name', this.targetModal).text(target.text().trim());
        $('.profile-image-container img', this.targetModal).prop('src', 'http://gurucul.com/wp-content/uploads/2015/01/default-user-icon-profile.png');
        $('[name=image]', relativeFormPane).val('http://gurucul.com/wp-content/uploads/2015/01/default-user-icon-profile.png');
        $('.node-dob', this.targetModal).text('');

        switch(true) {
          case target.hasClass('father'):
          this.prefillForm(relativeFormPane, {
            // not working
            'lastName': this.node['lastName'],
            'gender': 1,
            'status': 1
          });
          break;
          case target.hasClass('mother'):
          this.prefillForm(relativeFormPane, {
            'gender': 2,
            'status': 1
          });
          break;
          case target.hasClass('spouse'):
          this.prefillForm(relativeFormPane, {
            'gender': (this.node['gender'] == 1 ? 2 : 1),
            'status': 1
          });
          break;
          case target.hasClass('sibling'):
          this.prefillForm(relativeFormPane, {
            'lastName': this.node['lastName'],
            'gender': 1,
            'status': 1
          });
          break;
          case target.hasClass('child'):
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