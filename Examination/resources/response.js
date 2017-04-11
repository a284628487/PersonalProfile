var subjects = [];
var subjectIndex = -1;
var answerMap = {'1': 'A', '2': 'B', '3': 'C', '4': 'D', '5': 'E', '6': 'F', '7': 'G'};
var subjectModule = 'group-indexes1';
var timeLeft = 0;
var totalTime = 60 * 60;
var intervalStub = 0;

$(function () {

    timeLeft = localStorage.getItem('timeleft') ? parseInt(localStorage.getItem('timeleft')) : totalTime;

    intervalStub = setInterval(function () {
        timeLeft--;
        var minutes = parseInt(timeLeft / 60);
        var seconds = timeLeft % 60;
        $('#tl-minute').text(minutes);
        $('#tl-second').text(seconds);
        if (timeLeft <= 0) {
            clearInterval(intervalStub);
            alert('考试时间到');
            localStorage.clear();
            window.location.reload();
            return;
        }
        localStorage.setItem('timeleft', timeLeft);
    }, 1000);

    $('#switch').click(function () {
        showLeftMenu();
    });

    $.ajax({
        url: './data/data.json',
        data: {type: 1},
        type: 'get',
        crossDomain: true,
        success: function (data) {
            var indexGroupIndex = 1;
            var completedCount = 0;
            for (var i = 0; i < data.data.length; i++) {
                indexGroupIndex = Math.floor(i / 24) + 1;
                var clazz = 'notCompleted';
                if (localStorage.getItem(data.data[i].id)) {
                    clazz = 'completed';
                    completedCount++;
                } else { // umCompleted
                    if (subjectIndex == -1) {
                        subjectIndex = i;
                    }
                }
                $('#group-indexes' + indexGroupIndex).append('<div id="indexes' + i + '" class="' + clazz + '">' + (i + 1) + '</div>');
                subjects.push(data.data[i]);
            }
            $('#completed-count').text(completedCount);

            $('.group-indexes div').click(function (event) {
                var index = parseInt($(event.target).text());
                $('#indexes' + subjectIndex).removeClass('current');
                subjectIndex = index - 1;
                setQuestion();
            });
            $('.group-name').click(function (event) {
                var target = $(event.target);
                var groupIndexes = target.parent().find('.group-indexes');
                if (groupIndexes.hasClass('group-indexes-hidden')) {
                    $('#' + subjectModule).addClass('group-indexes-hidden');
                    groupIndexes.removeClass('group-indexes-hidden');
                    subjectModule = groupIndexes.attr('id');
                    stopPropagation(event);
                } else {

                }
            });
            $($('.group-name').get(parseInt(subjectIndex / 24))).click();
            setQuestion();
        }
    });

    $('#goPre').click(function () {
        if (subjectIndex == 0) {
            return;
        }
        $('#indexes' + (subjectIndex - 1)).click();
    });

    $('#goNext').click(function () {
        if (subjectIndex == 119) {
            return;
        }
        $('#indexes' + (subjectIndex + 1)).click();
    });

    $('#post-exam').click(function (event) {
        var r = confirm("确认要交卷吗?");
        if (r == true) {
            clearInterval(intervalStub);
            localStorage.clear();
            window.location.reload();
        }
    });
});

function setQuestion() {
    var subject = subjects[subjectIndex];
    if (subjectIndex == 0) {
        $('#goPre').removeClass('goPre-hl').addClass('goPre');
        if (!$('#goNext').hasClass('goNext-hl')) {
            $('#goNext').addClass('goNext-hl');
        }
    } else if (subjectIndex == 95) {
        $('#goNext').removeClass('goNext-hl').addClass('goNext');
        if (!$('#goPre').hasClass('goPre-hl')) {
            $('#goPre').addClass('goPre-hl');
        }
    } else {
        if (!$('#goNext').hasClass('goNext-hl')) {
            $('#goNext').addClass('goNext-hl');
        }
        if (!$('#goPre').hasClass('goPre-hl')) {
            $('#goPre').addClass('goPre-hl');
        }
    }
    // console.log(subject);
    $('#question-title').text((subjectIndex + 1) + ". " + subject.Question);
    $('#question-answers').html('');
    for (var i = 1; i <= 7; i++) {
        var key = "quesoption" + i;
        if (!subject[key]) {
            break;
        }
        $('#question-answers').append('<li quesid="' + subject.id + '"><input type="radio" value="' + i + '" name="answers" id="'
        + subject.id + i + '">' + '<div><label for="' + subject.id + i + '">'
        + answerMap[i] + '.' + subject[key] + '</label></div></li>');
    }
    var preSelectId = localStorage.getItem(subject.id);
    if (preSelectId) {
        $('#' + subject.id + preSelectId).attr('checked', true);
    }
    $('#question-answers input').on('change', function (event) {
        var tarInput = $(event.target);
        var tarLi = tarInput.parent();
        localStorage.setItem(tarLi.attr('quesid'), tarInput.attr('value'));
        $('#indexes' + subjectIndex).removeClass('notCompleted').addClass('completed');
        // update status
        var completedCount = $('.completed').length;
        $('#completed-count').text(completedCount);
    });
    $('#indexes' + subjectIndex).addClass('current');
}
