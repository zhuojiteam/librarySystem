module.exports = {
    paginate: function(pageSize, count, pageNumber) {
        var pages = [];
        var totalPageNumber = Math.floor(parseInt(count - 1) / parseInt(pageSize)) + 1;
        if (pageNumber > pageSize) pageNumber = pageSize;
        if (pageNumber < 1) pageNumber = 1;
        var i, j
        console.log('pushing!', pageNumber, totalPageNumber);
        for (
            i = (pageNumber - 2 >= 1) ? pageNumber - 2 : 1, j = 0;
            i <= totalPageNumber && j < 5;
            ++i, ++j
        ) {
            pages.push({
                active: (i == pageNumber),
                number: i
            })
        }
        if (pages.length > 0) {
            return {
                prev: {
                    if: (pages[0].number - 1 >= 1),
                    number: pages[0].number - 1
                },
                current: pages,
                next: {
                    if: (pages[pages.length - 1].number + 1 <= totalPageNumber),
                    number: pages[pages.length - 1].number + 1
                }
            }
        }
    }
}