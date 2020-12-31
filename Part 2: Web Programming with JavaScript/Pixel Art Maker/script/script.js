const htmlBody = $('body')
const sizePicker = $('#sizePicker')
const pixelCanvas = $('#pixel_canvas')
const cPicker = $('#colorPicker')
let pickedColor = cPicker.val

// grid creation
function makeGrid(event) {
  const inputHeight = $('#input_height').val()
  const inputWidth = $('#input_width').val()
  const trTotal = $('tr').length
  while (trTotal >= 1) {
    pixelCanvas.empty()
    break
  }
  event.preventDefault()
  for (let i = 1; i <= inputHeight; i++) {
    pixelCanvas.append('<tr></tr>')
  }
  for (let j = 1; j <= inputWidth; j++) {
    pixelCanvas.children().append('<td></td>')
  }

  colorCells()
  eraseCells()
}

$(document).ready(function () {
  cPicker.attr('value', '#000')
  pickedColor = cPicker.val()
})
cPicker.change(function () {
  pickedColor = $(this).val()
})

function colorCells() {
  $('td').mousedown(function () {
    $(this).css({ 'background-color': pickedColor })
    $('td').mouseenter(function () {
      $(this).css({ 'background-color': pickedColor })
    })
    return false
  })
  pixelCanvas.mouseup(function () {
    $('td').off('mouseenter')
  })
  htmlBody.mouseup(function () {
    $('td').off('mouseenter')
  })
}

function eraseCells() {
  $('td').mousedown(function (event) {
    if (event.which === 3) {
      pixelCanvas.addClass('crosshair_cursor')
      $(this).attr('style', '')
      $('td').mouseenter(function () {
        $(this).attr('style', '')
      })
      pixelCanvas.contextmenu(function (event) {
        event.preventDefault()
      })
    }
  })
  pixelCanvas.mouseup(function (event) {
    if (event.which === 3) {
      pixelCanvas.removeClass('crosshair_cursor')
    }
  })
  htmlBody.mouseup(function (event) {
    if (event.which === 3) {
      pixelCanvas.removeClass('crosshair_cursor')
    }
  })
}
sizePicker.submit(makeGrid)

$('btn-clear').click(function () {
  $('table tr').remove()
})
var content = document.querySelector('.content')
var height = content.scrollHeight
content.style.setProperty('--max-height', height + 'px')
