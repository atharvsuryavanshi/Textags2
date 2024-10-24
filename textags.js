let strOfInputAddText = '#input-add-text';

let ulItemList = $('#ul-item-list');
let inputAddText = $(strOfInputAddText);
let divPillBoard = $('#div-pill-board');
let italic = $('#italic');
let underline = $('#underline');
let buttonAddText = $('#button-add-text');

$(document).ready(function () {
    let html = returnPillTextInput();
    ulItemList.html(html);
    prepareInputAddText();
});

function returnPillTextInput() {
    pillTextInput = `
    <li class="list-group-item">
        <div class="input-group p-3">
            <input type="text" class="form-control" name="input-add-text" id="input-add-text" autocomplete="off">
            <button type="button" class="btn btn-dark" onclick="addListItem()" id="button-add-text"><i class="bi bi-plus-circle-fill"></i></button>
        </div>
    </li>
    `;
    return pillTextInput;
}

function returnPillTextListItem(text, index) {
    pillTextListItem = `
    <li class="list-group-item list-group-item-action d-flex">
        <span class="fw-semibold">${text}</span>
        <i class="bi bi-trash-fill text-danger ms-auto c-canclick" onclick="removeListItem(${index})"></i>
    </li>
    `;
    return pillTextListItem;
}

function returnPill(text, pillStyle, pillSize, textStyle) {
    let pill = `
    <button type="button" class="btn btn-dark ${pillStyle} ${pillSize} ${textStyle}">${text}</button>
    `;
    return pill;
}

const pillStyles = {
    'rectangular': 'rounded-0',
    'rounded': '',
    'curved': 'rounded-5'
}

let pills = 0;
let listItems = [];

function addListItem() {
    let text = inputAddText.val();
    listItems.push(text);
    reloadListItems();
}

function removeListItem(index) {
    listItems.splice(index, 1);
    reloadListItems();
}

function reloadListItems() {
    let html = '';
    for (let item in listItems) {
        html += returnPillTextListItem(listItems[item], item);
    }
    html += returnPillTextInput();
    ulItemList.html(html);
    prepareInputAddText();
}

function generateTextPills() {
    let pillStyle = getPillStyle();
    let pillSize = getPillSize();
    let textStyle = getTextStyle();
    let html = '';
    for (let item of listItems) {
        html += returnPill(item, pillStyle, pillSize, textStyle);
    }
    divPillBoard.html(html);
    pills = listItems.length;
}

function getPillStyle() {
    // *
    let selectedStyle = $('input[name="radio-pill-style"]:checked').val();
    // **
    return pillStyles[selectedStyle];
}

function getTextStyle() {
    let textWeight = $('input[name="radio-font-weight"]:checked').val();
    let textItalic = italic.is(':checked') ? 'fst-italic' : '';
    let textUnderline = underline.is(':checked') ? 'text-decoration-underline' : '';
    return [textWeight, textItalic, textUnderline].join(' ');
}

function saveAsImage() {
    if (pills == 0) {
        alert('There are no pills on the pill board to save!');
    }
    else {
        // *
        html2canvas(divPillBoard[0]).then(function (canvas) {
            let imgData = canvas.toDataURL("image/png");
            let link = document.createElement('a');
            link.href = imgData;
            link.download = 'pills.png';
            $('body').append(link);
            link.click()
            $(link).remove();
        });
        // **
    }
}

function prepareInputAddText() {
    inputAddText = $(strOfInputAddText);
    inputAddText.on('keypress', function (event) {
        if (event.which === 13) {
            event.preventDefault();
            addListItem();
            inputAddText.trigger('focus');
        }
    });
}

function getPillSize(){
    let selectedSize = $('input[name="radio-pill-size"]:checked').val();
    return selectedSize;
}