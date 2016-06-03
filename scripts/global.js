var nodeModal = new NodeModal('#node-modal');
$(() => {
    $(".family-tree .profile-image-container").click(() => {
        $("#fileToUpload").click();
    });
    $('#fileToUpload').fileupload({
        url: '/wp-content/plugins/family-tree/php/upload.php',
        type: 'POST',
        dataType: 'json',
        paramName: 'fileToUpload',
        singleFileUploads: true,
        multipart: true
    }).bind('fileuploaddone', (e, data) => {
        if (data.result.success) {
            $('.family-tree .modal-body .alert').css('display', 'none');
            $(".family-tree .profile-image-container img").prop('src', data.result.message);
        } else {
            $('.family-tree .modal-body .alert').css('display', 'block').text(data.result.message);
        }
    }).bind('fileuploadfail', (e, data) => {
        $('.family-tree .modal-body .alert').css('display', 'block').text('An unexpected error occured while uploading the image.');
    });
});