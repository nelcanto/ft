$(function() {
  $('#node-modal').on('show.bs.modal', function (e) {
    console.log('a wild popup has appear!');
    console.log(e);
    $('#node-options').removeClass('hidden');
    $('#add-node').removeClass('hidden').addClass('hidden');
  });

  $('#node-modal .add-relative').on('click', function(e) {
    console.log('click add relative');
    console.log(e);
    $('#node-options').toggleClass('hidden');
    $('#add-node').toggleClass('hidden');
  });
});