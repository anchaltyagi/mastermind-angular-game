(function(module) {
  function looseModal() {
    var directive = {
      template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">Game over!!!!!!!!</h4>' +
        '</div>' +
        '<div class="modal-body">'+
        '<img data-original-width="245" data-original-height="200" data-padding-top="125" data-id="8ykJ4yAnwgK2I" data-image_url="https://media.giphy.com/media/8ykJ4yAnwgK2I/giphy.gif" data-bitly_gif_url="http://gph.is/16GDq6h" data-mp4_url="https://media.giphy.com/media/8ykJ4yAnwgK2I/giphy.mp4" data-still="https://media.giphy.com/media/8ykJ4yAnwgK2I/giphy_s.gif" data-preview-image-url="https://media.giphy.com/media/8ykJ4yAnwgK2I/100.gif" data-tumblr_share_url="https://media.giphy.com/media/8ykJ4yAnwgK2I/giphy-tumblr.gif" data-gif_id="8ykJ4yAnwgK2I" data-absolute-url="/gifs/sad-baby-crying-8ykJ4yAnwgK2I" data-edit-url="/gifs/sad-baby-crying-8ykJ4yAnwgK2I/edit" id="gif" class="a-gif" src="https://media.giphy.com/media/8ykJ4yAnwgK2I/giphy.gif" alt="baby sad crying the help no" style="width: 551px; height: 450px" width="551" height="450">'+
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
  module.directive('looseModal', looseModal);
})(angular.module('mastermindApp'))