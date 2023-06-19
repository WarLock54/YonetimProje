
$(document).ready(function () {
    document.getElementById(".tweet").click(function () {
        debugger;
        var tweetid = $(this).data('tweet-id');
        var replytext = prompt('Yanıtınızı girin:');
        if (replytext !== null) {
            debugger;
            var data = { tweetId: tweetid, replyText: replytext };
            $.ajax({
                url: '@Url.Action("YorumYaz","LokBelirle")',
                type: "post",
                data: { tweetId: tweetid, replyText: replytext },
            })
            debugger;
        }
    });
});
