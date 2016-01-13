(function(module) {
  function winModal() {
    var directive = {
      template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">Winner!!!!!!</h4>' +
        '</div>' +
        '<div class="modal-body">'+
        '<img data-original-width="480" data-original-height="360" data-padding-top="45" data-id="YTbZzCkRQCEJa" data-image_url="https://media.giphy.com/media/YTbZzCkRQCEJa/giphy.gif" data-bitly_gif_url="http://gph.is/18Bev0r" data-mp4_url="https://media.giphy.com/media/YTbZzCkRQCEJa/giphy.mp4" data-still="https://media.giphy.com/media/YTbZzCkRQCEJa/giphy_s.gif" data-preview-image-url="https://media.giphy.com/media/YTbZzCkRQCEJa/100.gif" data-tumblr_share_url="https://media.giphy.com/media/YTbZzCkRQCEJa/giphy-tumblr.gif" data-gif_id="YTbZzCkRQCEJa" data-absolute-url="/gifs/party-excited-birthday-YTbZzCkRQCEJa" data-edit-url="/gifs/party-excited-birthday-YTbZzCkRQCEJa/edit" id="gif" class="a-gif" src="https://media.giphy.com/media/YTbZzCkRQCEJa/giphy.gif" alt="happy party birthday excited celebration" style="width: 570px; height: 450px" width="570" height="450">'+
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
      restrict: 'E',
      transclude: false,
      replace: true,
      scope: true,
      link: linkFunc
    };
    return directive;

    function linkFunc($scope, element, attrs) {
      $scope.$watch(attrs.visible, function(value) {
        if (value == true)
          $(element).modal('show');
        else
          $(element).modal('hide');
      });
    }
  }
  module.directive('winModal', winModal);
})(angular.module('mastermindApp'))