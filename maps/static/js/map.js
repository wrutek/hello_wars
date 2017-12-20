$(function() {

  let wall = 0;
  let isDragging = false;

  const getSizeMap = function () {
    return parseInt($('#mapSize :selected')[0].value);
  };

  const preBuildMap = function(mapSize) {
    $('#map').empty();
    for (let i = 0; i<mapSize; i++) {
      const row = $('<div>')
      row.attr({id: i})

      $('#map').append(row);
      for (let j = 0; j<mapSize; j++) {
        const cell = $('<span>');
        const cellID = String(i) + '.' + String(j);
        cell.attr({id: cellID, class: 'wall_0'});
        row.append(cell);
      }
    }
  }

  const changeMapField = function (ele, val) {
    ele.attr({class: val});
  }

  preBuildMap(parseInt($('#mapSize :selected')[0].value))

  $('#mapSize').change(function (e) {
    const mapSize = getSizeMap();

    preBuildMap(mapSize);
  });
  $('#palette').change(function (e) {
    wall = parseInt($('#palette :selected')[0].value)
  });

  // drawing with mousedown pushed
  $('#map').on('mousedown', 'div span', function (e) {
    $(e.currentTarget).attr({class: 'wall_' + wall});
    isDragging = true;
    e.preventDefault ? e.preventDefault() : e.returnValue = false
  })
  .on('mouseover', 'div span', function(e) {
    if (isDragging) {
      $(e.currentTarget).attr({class: 'wall_' + wall});
    }
  });
  $(document).mouseup({isDragging: isDragging}, function(e) {
    e.data.isDragging = false;
    isDragging = false;
  });

  // export CSV file and download
  $('#export').click(function () {
    let csvContent = "data:text/csv;charset=utf-8,";
    let rows = $('#map div');
    let rowString = '';
    rows.each(function(i, row){
      rowString = '';
      $(row).find('span').each(function(j, cell) {
        rowString = rowString + $(cell).attr('class') + ',';
      });
      rowString = rowString.slice(0, -1);
      csvContent += rowString + "\r\n";
    });

    let link = $("<a>");
    link.attr({"href": encodeURI(csvContent)});
    link.attr({"download": "HelloWars_Map.csv"});
    $('body').append(link);

    link[0].click()
  });
})
