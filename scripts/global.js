var nodeModal = new NodeModal('#node-modal');
$(() => {
    $(".family-tree .profile-image-container").click(() => {
        if ($('.add-relative-form-pane:visible').length) {
            $("[name=fileToUpload]").click();
        }
    });

    var apiEndpoint = '/wp-content/plugins/family-tree/php/upload.php';
    if(document.location.host=='108.61.159.150')
        apiEndpoint = 'http://108.61.159.150/~socialmedia'+apiEndpoint;

    $('[name=fileToUpload]').fileupload({
        url: apiEndpoint,
        type: 'POST',
        dataType: 'json',
        paramName: 'fileToUpload',
        singleFileUploads: true,
        multipart: true,
    }).bind('fileuploaddone', (e, data) => {
        if (data.result.success) {
            $('.family-tree .modal-body .alert').css('display', 'none');
            $(".family-tree .profile-image-container img").prop('src', data.result.message);
            $(".family-tree .add-relative-form-pane [name=image]").val(data.result.message);
        } else {
            $('.family-tree .modal-body .alert').css('display', 'block').text(data.result.message);
        }
    }).bind('fileuploadfail', (e, data) => {
        $('.family-tree .modal-body .alert').css('display', 'block').text('An unexpected error occured while uploading the image.');
    });
});