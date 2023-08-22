
// #section-start find-owersized-elements

    function talkOffset(e) {
        let docWidth = document.documentElement.offsetWidth;
        console.log('Document width: ' + docWidth);
        [].forEach.call(
            document.querySelectorAll('*'),
            function(el) {
            if (el.offsetWidth > docWidth || el.getBoundingClientRect().right > docWidth) {
                console.log(el);
            }
        }
    )};

    const findOffsetWidth = document.querySelector('.find-offset-width');
    if(findOffsetWidth === null) console.error(`Not fount selector find-offset-width`);
        else findOffsetWidth.addEventListener('click', talkOffset);

// #section-end find-owersized-elements
