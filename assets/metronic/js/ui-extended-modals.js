var UIExtendedModals = function() {
	return {
		init : function() {
					$.fn.modal.defaults.spinner = $.fn.modalmanager.defaults.spinner = '<div class="loading-spinner" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="progress-bar" style="width: 100%;"></div></div></div>',
					$.fn.modalmanager.defaults.resize = !0,
					$(".dynamic .demo")
							.click(
									function() {
										var a = [
												'<div class="modal hide fade" tabindex="-1">',
												'<div class="modal-header">',
												'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>',
												'<h4 class="modal-title">Modal header</h4>',
												"</div>",
												'<div class="modal-body">',
												"<p>Test</p>",
												"</div>",
												'<div class="modal-footer">',
												'<a href="#" data-dismiss="modal" class="btn btn-default">Close</a>',
												'<a href="#" class="btn btn-primary">Save changes</a>',
												"</div>", "</div>" ].join("");
										$(a).modal()
									});
			var a = $("#ajax-modal");
					$(".ajax-demo").on("click", function() {
						$("body").modalmanager("loading");
						var d = $(this);
						setTimeout(function() {
							a.load(d.attr("data-url"), "", function() {
								a.modal()
							})
						}, 1e3)
					});
					
							a.on(
									"click",
									".update",
									function() {
												a.modal("loading"),
												setTimeout(
														function() {
															a
																	.modal(
																			"loading")
																	.find(
																			".modal-body")
																	.prepend(
																			'<div class="alert alert-info fade in">Updated!<button type="button" class="close" data-dismiss="alert">&times;</button></div>')
														}, 1e3)
									})
		}
	}
}();
jQuery(document).ready(function() {
	UIExtendedModals.init()
});