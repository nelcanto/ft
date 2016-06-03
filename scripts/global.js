var nodeModal = new NodeModal('#node-modal');
$(() => {
    $(".family-tree .profile-image-container").click(() => {
        if ($('.add-relative-form-pane:visible').length) {
            $("[name=image]").click();
        }
    });
    $('[name=image]').fileupload({
        url: '/wp-content/plugins/family-tree/php/upload.php',
        type: 'POST',
        dataType: 'json',
        paramName: 'image',
        singleFileUploads: true,
        multipart: true,
    }).bind('fileuploaddone', (e, data) => {
        if (data.result.success) {
            $('.family-tree .modal-body .alert').css('display', 'none');
            $(".family-tree .profile-image-container img").prop('src', data.result.message);
            $(".family-tree .profile-image-container img").prop('src', data.result.message);
        } else {
            $('.family-tree .modal-body .alert').css('display', 'block').text(data.result.message);
        }
    }).bind('fileuploadfail', (e, data) => {
        $('.family-tree .modal-body .alert').css('display', 'block').text('An unexpected error occured while uploading the image.');
    });
});